"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "ECLETS Black Shirt",
    price: 4999,
    image: "/images/products/shirt-black.png",
    slug: "eclets-black-shirt",
    category: "Shirts",
  },
  {
    id: "2",
    name: "ECLETS White Shirt",
    price: 4499,
    image: "/images/products/shirt-white.png",
    slug: "eclets-white-shirt",
    category: "Shirts",
  },
  {
    id: "3",
    name: "ECLETS Trouser",
    price: 5999,
    image: "/images/products/trouser.png",
    slug: "eclets-trouser",
    category: "Trousers",
  },
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("search");

    if (searchValue) {
      setSearch(searchValue);
    }
  }, []);

  const categories = ["All", "Shirts", "Trousers"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-[#080808] text-[#f2eee7]">
      {/* Header */}
      <section className="border-b border-white/10 px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
            ECLETS Collection
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="text-5xl font-light tracking-tight md:text-7xl">
                Shop
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                Refined menswear designed for a modern wardrobe.
              </p>
            </div>

            <Link
              href="/"
              className="text-xs uppercase tracking-[0.25em] text-white/60 transition hover:text-white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-20 border-b border-white/10 bg-[#080808]/95 px-6 py-5 backdrop-blur md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`border px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  category === item
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/60 hover:border-white/60 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/50"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              {filteredProducts.length} Products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="border border-white/10 py-24 text-center">
              <h2 className="text-2xl font-light">No products found</h2>

              <p className="mt-3 text-sm text-white/40">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link
                  href={`/shop/${product.slug}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 px-5 py-4 text-center text-xs uppercase tracking-[0.2em] transition duration-300 group-hover:translate-y-0">
                      View Product
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <h2 className="text-sm uppercase tracking-[0.12em]">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">
                        {product.category}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}