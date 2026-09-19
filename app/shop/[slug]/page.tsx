"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductFromDatabase } from "../../lib/products-db";
import { useCartStore } from "../../../store/cartStore";

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

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductFromDatabase(slug);

      setProduct(data);

      if (data && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }

      setLoading(false);
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-[#f2eee7]">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
          Loading Product...
        </p>
      </main>
    );
  }

  if (product === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-[#f2eee7]">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
          ECLETS / Product
        </p>

        <h1 className="eclets-serif mt-5 text-4xl">
          Product Not Found
        </h1>

        <Link
          href="/shop"
          className="mt-8 border border-white/20 px-6 py-4 text-[9px] uppercase tracking-[0.22em] transition hover:bg-white hover:text-black"
        >
          ← Back To Shop
        </Link>
      </main>
    );
  }

  // From this point onward TypeScript knows this is a real Product.
  const currentProduct: Product = product;

  function increaseQuantity() {
    if (quantity < currentProduct.stock) {
      setQuantity((current) => current + 1);
    }
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function handleAddToBag() {
    if (!selectedSize) {
      return;
    }

    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: Number(currentProduct.price),
      image: currentProduct.image || "",
      size: selectedSize,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2500);
  }

  const soldOut = currentProduct.stock <= 0;

  return (
    <main className="min-h-screen bg-[#080808] text-[#f2eee7]">
      {/* HEADER */}
      <header className="border-b border-white/10 px-6 py-5 md:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link
            href="/shop"
            className="text-[9px] uppercase tracking-[0.25em] text-white/45 transition hover:text-white"
          >
            ← Shop
          </Link>

          <Link
            href="/"
            className="eclets-serif text-xl tracking-[-0.04em]"
          >
            ECLETS
          </Link>

          <Link
            href="/cart"
            className="text-[9px] uppercase tracking-[0.25em] text-white/45 transition hover:text-white"
          >
            Bag
          </Link>
        </div>
      </header>

      {/* PRODUCT */}
      <section className="grid min-h-[calc(100vh-73px)] lg:grid-cols-2">
        {/* IMAGE */}
        <div className="relative min-h-[65vh] bg-[#111] lg:min-h-[calc(100vh-73px)]">
          {currentProduct.image ? (
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[65vh] items-center justify-center text-[9px] uppercase tracking-[0.25em] text-white/25">
              No Product Image
            </div>
          )}

          <div className="absolute left-6 top-6 flex flex-col gap-2 md:left-10 md:top-10">
            {currentProduct.new_arrival && (
              <span className="bg-[#f2eee7] px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-black">
                New Arrival
              </span>
            )}

            {currentProduct.featured && (
              <span className="border border-white/20 bg-black/60 px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* INFORMATION */}
        <div className="flex items-center border-l border-white/10">
          <div className="w-full px-6 py-12 md:px-12 lg:px-16 xl:px-24">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              {currentProduct.category}
            </p>

            <h1 className="eclets-serif mt-5 max-w-xl text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
              {currentProduct.name}
            </h1>

            <p className="mt-7 text-xl">
              Rs.{" "}
              {Number(currentProduct.price).toLocaleString("en-PK")}
            </p>

            <div className="my-10 h-px bg-white/10" />

            <p className="max-w-xl text-sm leading-7 text-white/50">
              {currentProduct.description ||
                "A refined contemporary piece designed with the ECLETS approach to proportion, detail and quiet confidence."}
            </p>

            {/* COLORS */}
            {currentProduct.colors.length > 0 && (
              <div className="mt-10">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Color
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {currentProduct.colors.map((color) => (
                    <span
                      key={color}
                      className="border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.15em]"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}
            {currentProduct.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                    Select Size
                  </p>

                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Required
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`border px-4 py-4 text-[9px] uppercase tracking-[0.15em] transition ${
                        selectedSize === size
                          ? "border-white bg-white text-black"
                          : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-8">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                Quantity
              </p>

              <div className="mt-4 flex w-fit items-center border border-white/15">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="px-5 py-4 text-sm text-white/50 transition hover:text-white"
                >
                  −
                </button>

                <span className="min-w-12 text-center text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= currentProduct.stock}
                  className="px-5 py-4 text-sm text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <p className="mt-3 text-[8px] uppercase tracking-[0.18em] text-white/25">
                {currentProduct.stock > 0
                  ? `${currentProduct.stock} units available`
                  : "Currently sold out"}
              </p>
            </div>

            {/* ADD TO BAG */}
            <button
              type="button"
              onClick={handleAddToBag}
              disabled={soldOut || !selectedSize}
              className="mt-10 w-full border border-white/20 bg-white px-6 py-5 text-[9px] uppercase tracking-[0.28em] text-black transition hover:bg-[#f2eee7] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
            >
              {soldOut
                ? "Sold Out"
                : added
                  ? "Added To Bag ✓"
                  : "Add To Bag"}
            </button>

            {/* PRODUCT INFORMATION */}
            <div className="mt-10 grid border-y border-white/10">
              <div className="border-b border-white/10 py-5">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                  Product
                </p>

                <p className="mt-2 text-xs text-white/55">
                  Contemporary menswear / ECLETS
                </p>
              </div>

              <div className="py-5">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                  Availability
                </p>

                <p className="mt-2 text-xs text-white/55">
                  {currentProduct.stock > 0 ? "In Stock" : "Sold Out"}
                </p>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-7 block text-center text-[8px] uppercase tracking-[0.25em] text-white/35 transition hover:text-white"
            >
              View Shopping Bag →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}