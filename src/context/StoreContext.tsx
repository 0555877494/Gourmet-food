import { createContext, useContext, useState, ReactNode } from "react";
import { products as initialProducts, Product } from "../data/products";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  address: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
  avatar: string;
}

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  customers: Customer[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const mockOrders: Order[] = [
  {
    id: "SV-A8K3M2",
    customerName: "Eleanor Whitfield",
    customerEmail: "eleanor.w@email.com",
    items: [
      { product: initialProducts[0], quantity: 1 },
      { product: initialProducts[2], quantity: 1 },
    ],
    total: 167.98,
    status: "delivered",
    date: "2026-01-15",
    address: "245 Park Avenue, New York, NY 10167",
  },
  {
    id: "SV-B9L4N3",
    customerName: "James Harrington",
    customerEmail: "j.harrington@email.com",
    items: [{ product: initialProducts[1], quantity: 2 }],
    total: 179.98,
    status: "shipped",
    date: "2026-01-18",
    address: "88 Colin P Kelly Jr St, San Francisco, CA 94107",
  },
  {
    id: "SV-C1M5P4",
    customerName: "Sophia Chen",
    customerEmail: "sophia.chen@email.com",
    items: [
      { product: initialProducts[3], quantity: 3 },
      { product: initialProducts[4], quantity: 1 },
    ],
    total: 91.96,
    status: "processing",
    date: "2026-01-20",
    address: "1000 E Pine St, Seattle, WA 98122",
  },
  {
    id: "SV-D2N6Q5",
    customerName: "Marcus Bellamy",
    customerEmail: "m.bellamy@email.com",
    items: [{ product: initialProducts[5], quantity: 2 }],
    total: 45.98,
    status: "pending",
    date: "2026-01-21",
    address: "500 S Goodwood Blvd, Memphis, TN 38104",
  },
  {
    id: "SV-E3P7R6",
    customerName: "Isabella Romano",
    customerEmail: "i.romano@email.com",
    items: [
      { product: initialProducts[0], quantity: 1 },
      { product: initialProducts[1], quantity: 1 },
      { product: initialProducts[4], quantity: 1 },
    ],
    total: 167.97,
    status: "delivered",
    date: "2026-01-10",
    address: "700 N Michigan Ave, Chicago, IL 60611",
  },
  {
    id: "SV-F4Q8S7",
    customerName: "Oliver Ashworth",
    customerEmail: "o.ashworth@email.com",
    items: [{ product: initialProducts[2], quantity: 1 }],
    total: 124.99,
    status: "cancelled",
    date: "2026-01-19",
    address: "350 Fifth Avenue, New York, NY 10118",
  },
];

const mockCustomers: Customer[] = [
  { id: 1, name: "Eleanor Whitfield", email: "eleanor.w@email.com", orders: 5, totalSpent: 487.50, joinDate: "2025-03-12", avatar: "👩‍💼" },
  { id: 2, name: "James Harrington", email: "j.harrington@email.com", orders: 3, totalSpent: 312.00, joinDate: "2025-06-22", avatar: "👨‍💻" },
  { id: 3, name: "Sophia Chen", email: "sophia.chen@email.com", orders: 8, totalSpent: 645.80, joinDate: "2024-11-05", avatar: "👩‍🎨" },
  { id: 4, name: "Marcus Bellamy", email: "m.bellamy@email.com", orders: 2, totalSpent: 89.96, joinDate: "2025-09-18", avatar: "👨‍🍳" },
  { id: 5, name: "Isabella Romano", email: "i.romano@email.com", orders: 12, totalSpent: 1243.75, joinDate: "2024-08-01", avatar: "👩‍🔬" },
  { id: 6, name: "Oliver Ashworth", email: "o.ashworth@email.com", orders: 4, totalSpent: 267.30, joinDate: "2025-01-14", avatar: "👨‍🎓" },
  { id: 7, name: "Charlotte Dubois", email: "c.dubois@email.com", orders: 6, totalSpent: 534.20, joinDate: "2025-04-28", avatar: "👩‍🏫" },
  { id: 8, name: "William Thornton", email: "w.thornton@email.com", orders: 1, totalSpent: 42.99, joinDate: "2025-12-30", avatar: "👨‍⚕️" },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers] = useState<Customer[]>(mockCustomers);

  const addProduct = (product: Omit<Product, "id">) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts((prev) => [...prev, { ...product, id: newId }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        customers,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
