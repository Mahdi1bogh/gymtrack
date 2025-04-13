"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  vendorId: string;
}

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function VendorDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<Product[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      // TODO: Implement API call to create product
      console.log("Creating product:", data);
      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 ">Add New Product</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium ">
                Product Name
              </label>
              <Input
                type="text"
                {...register("name")}
                className="mt-1 block w-full rounded-md borderborder shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium "
              >
                Description
              </label>
              <Textarea
                {...register("description")}
                rows={3}
                className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium ">
                Price
              </label>
              <Input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium ">
                Stock
              </label>
              <Input
                type="number"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      <div className="bg-card shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 ">Your Products</h3>
          <div className="mt-5">
            {products.length === 0 ? (
              <p className="text-gray-500">No products added yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-gray-500">{product.description}</p>
                    <p className="mt-2">Price: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
