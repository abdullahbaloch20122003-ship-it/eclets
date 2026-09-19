import Link from "next/link";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import WhatWouldYouWear from "./components/home/WhatWouldYouWear";

const categories = [
  {
    name: "Trousers",
    image: "/images/products/trouser.png",
    description: "Structured silhouettes",
  },
  {
    name: "Shirts",
    image: "/images/products/shirt-black.png",
    description: "Refined everyday pieces",
  },
  {
    name: "Outerwear",
    image: "/images/styles/sharp.png",
    description: "Contemporary layers",
  },
];

export default function Home() {
  return (
    <main className="bg-[#080808] text-[#f2eee7]">
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* WHAT WOULD YOU WEAR */}
      <WhatWouldYouWear />

      {/* CATEGORY COLLECTION */}
      <section className="border-t border-white/10 bg-[#080808] px-6 py-16 md:px-12 lg:px-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eclets-label text-white/35">
              ECLETS / COLLECTIONS
            </p>

            <h2 className="eclets-premium-title mt-3 text-4xl md:text-5xl">
              Explore.
            </h2>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.25em] text-white/25 md:block">
            SELECT A CATEGORY
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative block overflow-hidden bg-[#0b0b0b]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-[1.035]
                  "
                />

                <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-black/25" />

                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-7 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="eclets-product-name text-3xl text-white md:text-4xl">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/45">
                        {category.description}
                      </p>
                    </div>

                    <span className="mb-1 flex h-9 w-9 items-center justify-center border border-white/25 text-sm text-white/70 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}