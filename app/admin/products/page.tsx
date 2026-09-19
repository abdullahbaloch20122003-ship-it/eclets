"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string | null;
  image: string | null;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  new_arrival: boolean;
  stock: number;
};

const emptyForm = {
  name: "",
  slug: "",
  price: "",
  category: "Shirts",
  description: "",
  image: "",
  images: "",
  sizes: "S,M,L,XL",
  colors: "Black",
  featured: false,
  newArrival: true,
  stock: "10",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("Could not load products.");
    } else {
      setProducts((data || []) as Product[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setImagePreview("");
    setMessage("");
  }

  function startEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      name: product.name,
      slug: product.slug,
      price: String(product.price),
      category: product.category,
      description: product.description || "",
      image: product.image || "",
      images: (product.images || []).join(","),
      sizes: (product.sizes || []).join(","),
      colors: (product.colors || []).join(","),
      featured: product.featured,
      newArrival: product.new_arrival,
      stock: String(product.stock ?? 0),
    });

    setImagePreview(product.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please select JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5MB.");
      return;
    }

    setUploadingImage(true);
    setMessage("");

    const fileExtension = file.name.split(".").pop() || "jpg";

    const safeFileName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const fileName = `${Date.now()}-${safeFileName}.${fileExtension}`;

    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      setMessage(`Image upload failed: ${uploadError.message}`);
      setUploadingImage(false);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    updateField("image", publicUrl);
    setImagePreview(publicUrl);

    setMessage("Image uploaded successfully.");

    setUploadingImage(false);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.name.trim()) {
      setMessage("Product name is required.");
      return;
    }

    if (!form.slug.trim()) {
      setMessage("Product slug is required.");
      return;
    }

    if (!form.price.trim()) {
      setMessage("Price is required.");
      return;
    }

    if (!form.image.trim()) {
      setMessage("Please select a product image.");
      return;
    }

    setSaving(true);
    setMessage("");

    const productData = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim(),

      images: form.images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      sizes: form.sizes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      colors: form.colors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      featured: form.featured,
      new_arrival: form.newArrival,
      stock: Number(form.stock) || 0,
    };

    if (editingId !== null) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingId);

      if (error) {
        console.error(error);
        setMessage(`Update failed: ${error.message}`);
      } else {
        setMessage("Product updated successfully.");
        resetForm();
        await loadProducts();
      }
    } else {
      const { error } = await supabase
        .from("products")
        .insert(productData);

      if (error) {
        console.error(error);
        setMessage(
          `Product could not be added: ${error.message}`
        );
      } else {
        setMessage("Product added successfully.");
        resetForm();
        await loadProducts();
      }
    }

    setSaving(false);
  }

  async function deleteProduct(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage(`Delete failed: ${error.message}`);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage("Product deleted successfully.");
    await loadProducts();
  }

  return (
    <main className="min-h-screen bg-[#080808] text-[#f2eee7]">
      <header className="border-b border-white/10 px-6 py-7 md:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              ECLETS / Admin
            </p>

            <h1 className="eclets-serif mt-3 text-4xl tracking-[-0.04em] md:text-5xl">
              Products
            </h1>
          </div>

          <a
            href="/admin"
            className="text-[9px] uppercase tracking-[0.25em] text-white/40 transition hover:text-white"
          >
            ← Dashboard
          </a>
        </div>
      </header>

      <section className="px-6 py-10 md:px-10 lg:px-14">
        <div className="border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-white/30">
                {editingId !== null
                  ? "Edit Existing Product"
                  : "Create New Product"}
              </p>

              <h2 className="eclets-serif mt-3 text-3xl">
                {editingId !== null
                  ? "Update Product"
                  : "Add New Product"}
              </h2>
            </div>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="w-fit border border-white/15 px-5 py-3 text-[8px] uppercase tracking-[0.2em] text-white/50 transition hover:border-white/40 hover:text-white"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Product Name
                </span>

                <input
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="ECLETS Black Coat"
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
              </label>

              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Slug
                </span>

                <input
                  value={form.slug}
                  onChange={(event) =>
                    updateField("slug", event.target.value)
                  }
                  placeholder="eclets-black-coat"
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
              </label>

              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Price / PKR
                </span>

                <input
                  type="number"
                  value={form.price}
                  onChange={(event) =>
                    updateField("price", event.target.value)
                  }
                  placeholder="24999"
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
              </label>

              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Category
                </span>

                <input
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  placeholder="Coats"
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
              </label>

              {/* IMAGE UPLOAD */}
              <div className="md:col-span-2">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Product Image
                </span>

                <div className="mt-2 border border-white/10 bg-black p-5">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    {imagePreview ? (
                      <div className="h-48 w-40 shrink-0 overflow-hidden bg-[#111]">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-48 w-40 shrink-0 items-center justify-center border border-dashed border-white/15 bg-[#111]">
                        <span className="px-4 text-center text-[8px] uppercase tracking-[0.15em] text-white/25">
                          No Image
                        </span>
                      </div>
                    )}

                    <div>
                      <label className="inline-flex cursor-pointer border border-white/20 px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white/70 transition hover:border-white hover:text-white">
                        {uploadingImage
                          ? "Uploading..."
                          : editingId !== null
                            ? "Change Image"
                            : "Choose Image"}

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>

                      <p className="mt-4 max-w-md text-[8px] leading-5 tracking-[0.08em] text-white/25">
                        JPG, PNG or WEBP. Maximum size 5MB.
                        The image will be uploaded automatically
                        to ECLETS Storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <label className="block md:col-span-2">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Description
                </span>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Product description..."
                  className="mt-2 w-full resize-none border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
              </label>

              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Sizes
                </span>

                <input
                  value={form.sizes}
                  onChange={(event) =>
                    updateField("sizes", event.target.value)
                  }
                  placeholder="S,M,L,XL"
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />

                <p className="mt-2 text-[8px] text-white/20">
                  Example: S,M,L,XL
                </p>
              </label>

              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Colors
                </span>

                <input
                  value={form.colors}
                  onChange={(event) =>
                    updateField("colors", event.target.value)
                  }
                  placeholder="Black,White"
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />

                <p className="mt-2 text-[8px] text-white/20">
                  Separate colors with commas.
                </p>
              </label>

              <label className="block">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Stock
                </span>

                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(event) =>
                    updateField("stock", event.target.value)
                  }
                  className="mt-2 w-full border border-white/10 bg-black px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:gap-8">
              <label className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/55">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    updateField(
                      "featured",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
                Featured Product
              </label>

              <label className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/55">
                <input
                  type="checkbox"
                  checked={form.newArrival}
                  onChange={(event) =>
                    updateField(
                      "newArrival",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4"
                />
                New Arrival
              </label>
            </div>

            {message && (
              <div className="mt-6 border border-white/10 px-4 py-4 text-[9px] uppercase tracking-[0.15em] text-white/60">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="mt-7 w-full bg-white px-6 py-5 text-[9px] uppercase tracking-[0.25em] text-black transition hover:bg-[#f2eee7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </form>
        </div>

        {/* ALL PRODUCTS */}
        <div className="mt-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-white/30">
                Database
              </p>

              <h2 className="eclets-serif mt-2 text-3xl">
                All Products
              </h2>
            </div>

            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
              {products.length} Products
            </p>
          </div>

          {loading ? (
            <div className="border border-white/10 px-6 py-16 text-center">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                Loading Products...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="border border-white/10 px-6 py-16 text-center">
              <p className="eclets-serif text-3xl">
                No Products
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-5 border border-white/10 bg-[#0d0d0d] p-5 md:flex-row md:items-center"
                >
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#111]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[7px] uppercase tracking-[0.15em] text-white/20">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[8px] uppercase tracking-[0.22em] text-white/30">
                        {product.category}
                      </p>

                      {product.featured && (
                        <span className="border border-white/15 px-2 py-1 text-[7px] uppercase tracking-[0.15em] text-white/45">
                          Featured
                        </span>
                      )}

                      {product.new_arrival && (
                        <span className="bg-white px-2 py-1 text-[7px] uppercase tracking-[0.15em] text-black">
                          New
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-base">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[8px] uppercase tracking-[0.15em] text-white/35">
                      <span>
                        Rs.{" "}
                        {Number(product.price).toLocaleString(
                          "en-PK"
                        )}
                      </span>

                      <span>
                        Stock: {product.stock}
                      </span>

                      <span>
                        Sizes:{" "}
                        {(product.sizes || []).join(", ") ||
                          "None"}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="border border-white/15 px-5 py-3 text-[8px] uppercase tracking-[0.2em] text-white/55 transition hover:border-white/40 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                      className="border border-white/15 px-5 py-3 text-[8px] uppercase tracking-[0.2em] text-white/35 transition hover:border-white hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}