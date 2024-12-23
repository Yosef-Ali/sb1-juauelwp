import { ProductForm } from "@/components/products/product-form";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <ProductForm />
    </div>
  );
}