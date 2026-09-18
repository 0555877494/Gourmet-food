import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { Product, categories } from "../../data/products";

const defaultImages = [
  "https://image.qwenlm.ai/generated-images/f4390f1e-bd84-4802-adff-5a5d77db0bfb/_result.png",
  "https://image.qwenlm.ai/generated-images/8046cf83-ba56-41c6-a3e2-1af42da36c9f/_result.png",
  "https://image.qwenlm.ai/generated-images/d6f7751c-fcc2-4d2e-aa75-4be8b27d9fe8/_result.png",
  "https://image.qwenlm.ai/generated-images/0a7ed82d-7be5-4e3d-9751-b54c26a7/_result.png",
  "https://image.qwenlm.ai/generated-images/98e0f85c-4f80-4841-88cc-13ed253578df/_result.png",
  "https://image.qwenlm.ai/generated-images/b14ab4de-f5b5-47e1-ba52-78b5bfe8d57a/_result.png",
];

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Product Management</h3>
          <p className="text-sm text-gray-500">{products.length} products in catalog</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3 hidden sm:table-cell">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3 hidden md:table-cell">Rating</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                          {product.origin}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs font-medium px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-700">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSave={(product) => {
            if (editingProduct) {
              updateProduct(product as Product);
            } else {
              addProduct(product as Omit<Product, "id">);
            }
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product | Omit<Product, "id">) => void;
}

function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    longDescription: product?.longDescription || "",
    price: product?.price || 0,
    category: product?.category || categories[1],
    origin: product?.origin || "",
    weight: product?.weight || "",
    image: product?.image || defaultImages[0],
    rating: product?.rating || 4.5,
    reviews: product?.reviews || 0,
    tags: product?.tags.join(", ") || "",
  });

  const [selectedImage, setSelectedImage] = useState(product?.image || defaultImages[0]);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...(product ? { id: product.id } : {}),
      name: form.name,
      description: form.description,
      longDescription: form.longDescription,
      price: form.price,
      category: form.category,
      origin: form.origin,
      weight: form.weight,
      image: selectedImage,
      rating: form.rating,
      reviews: form.reviews,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    onSave(productData as Product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="text-lg font-serif font-bold text-gray-900">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                {selectedImage ? (
                  <img src={selectedImage} alt="Product" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <p className="text-xs text-gray-500 mt-1">Paste an image URL or leave as default</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                placeholder="e.g., Truffle Olive Oil"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
              >
                {categories.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description *</label>
            <input
              type="text"
              required
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Brief product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description</label>
            <textarea
              rows={3}
              value={form.longDescription}
              onChange={(e) => handleChange("longDescription", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
              placeholder="Detailed product description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($) *</label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Origin</label>
              <input
                type="text"
                value={form.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                placeholder="e.g., Tuscany, Italy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight/Size</label>
              <input
                type="text"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                placeholder="e.g., 250ml"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="e.g., organic, artisan, premium"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-all shadow-md"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
