"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  new_arrival?: boolean;
  stock?: number;
};

const categories = ["All", "Shirts", "Trousers", "Outerwear"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFromUrl, setCategoryFromUrl] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategoryFromUrl(params.get("category") || "All");
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Products error:", error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const activeCategory =
    categories.find(
      (category) =>
        category.toLowerCase() === categoryFromUrl.toLowerCase(),
    ) || "All";

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category?.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [products, activeCategory]);

  const formatPrice = (price: number) => {
    return `Rs ${Number(price).toLocaleString("en-PK")}`;
  };

  return (
    <main className="min-h-screen bg-[#080808] text-[#f2eee7]">
      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-12 pt-32 md:px-12 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eclets-label text-white/35">
              ECLETS / COLLECTION
            </p>

            <h1 className="eclets-premium-title mt-4 text-5xl md:text-7xl lg:text-8xl">
              {activeCategory}
            </h1>

            <p className="mt-5 max-w-md text-xs uppercase leading-6 tracking-[0.2em] text-white/35">
              Contemporary menswear
              <br />
              by Abdullah Baloch.
            </p>
          </div>

          <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
            {filteredProducts.length} Products
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-white/10 px-6 md:px-12 lg:px-16">
        <div className="flex overflow-x-auto">
          {categories.map((category) => {
            const isActive =
              activeCategory.toLowerCase() === category.toLowerCase();

            const href =
              category === "All"
                ? "/shop"
                : `/shop?category=${encodeURIComponent(category)}`;

            return (
              <Link
                key={category}
                href={href}
                className={`relative mr-8 py-6 text-[10px] uppercase tracking-[0.25em] transition ${
                  isActive
                    ? "text-white"
                    : "text-white/30 hover:text-white/70"
                }`}
              >
                {category}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-px w-full bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-12 md:px-12 md:py-16 lg:px-16">
        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="eclets-label text-white/30">
              Loading collection...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <p className="eclets-label text-white/25">
              No products yet
            </p>

            <p className="eclets-serif mt-4 text-3xl text-white/70">
              This collection is coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {filteredProducts.map((product) => {
              const image =
                product.image ||
                product.images?.[0] ||
                "/images/products/placeholder.png";

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group block"
                >
                  {/* Product image */}
                  <div className="eclets-product-frame relative aspect-[4/5] overflow-hidden border border-white/10">
                    {product.new_arrival && (
                      <span className="absolute left-3 top-3 z-10 text-[8px] uppercase tracking-[0.2em] text-white/45">
                        New
                      </span>
                    )}

                    <img
                      src={image}
                      alt={product.name}
                      className="eclets-product-image"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Product information */}
                  <div className="mt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="eclets-product-name text-base text-white/85 transition group-hover:text-white md:text-lg">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/25">
                          {product.category}
                        </p>
                      </div>

                      <span className="eclets-price whitespace-nowrap text-[9px] text-white/55">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="mt-3 h-px w-0 bg-white/50 transition-all duration-500 group-hover:w-full" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}