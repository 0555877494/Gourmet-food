import { categories } from "../data/products";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? "bg-amber-800 text-white shadow-md"
              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:border-amber-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
