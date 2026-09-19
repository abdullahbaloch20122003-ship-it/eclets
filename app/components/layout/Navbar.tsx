"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../../../store/cartStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed left-0 top-0 z-[1000] w-full border-b transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-black/85 backdrop-blur-xl"
            : "border-white/10 bg-black/35 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[76px] items-center justify-between px-6 md:px-10 lg:px-14">

          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMobile}
            className="group flex flex-col leading-none"
          >
            <span className="eclets-premium-title text-[22px] tracking-[-0.04em] transition-transform duration-500 group-hover:scale-[1.02]">
              ECLETS
            </span>

            <span className="mt-1 text-[7px] uppercase tracking-[0.28em] text-white/35">
              BY ABDULLAH BALOCH
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/shop"
              className="eclets-nav-text text-[11px] text-white/65 transition hover:text-white"
            >
              New In
            </Link>

            <Link
              href="/shop"
              className="eclets-nav-text text-[11px] text-white/65 transition hover:text-white"
            >
              Men
            </Link>

            <Link
              href="/shop"
              className="eclets-nav-text text-[11px] text-white/65 transition hover:text-white"
            >
              Collections
            </Link>

            <Link
              href="/#about"
              className="eclets-nav-text text-[11px] text-white/65 transition hover:text-white"
            >
              About
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-7 lg:flex">

            <Link
              href="/shop"
              className="eclets-nav-text text-[10px] text-white/50 transition hover:text-white"
            >
              Search
            </Link>

            <button
              type="button"
              className="eclets-nav-text text-[10px] text-white/50 transition hover:text-white"
            >
              Wishlist
            </button>

            <Link
              href="/admin"
              className="eclets-nav-text text-[10px] text-white/50 transition hover:text-white"
            >
              Account
            </Link>

            <Link
              href="/cart"
              className="eclets-nav-text group relative flex items-center gap-2 text-[10px] text-white/65 transition hover:text-white"
            >
              Bag

              <span
                className="
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  border
                  border-white/20
                  px-1
                  text-[8px]
                  text-white/70
                  transition
                  group-hover:border-white/50
                "
              >
                {cartCount}
              </span>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 flex-col items-end justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px bg-white transition-all duration-300 ${
                mobileOpen ? "w-6 rotate-45 translate-y-[3px]" : "w-6"
              }`}
            />

            <span
              className={`h-px bg-white transition-all duration-300 ${
                mobileOpen ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4"
              }`}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[999] bg-[#080808] transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex min-h-screen flex-col px-8 pb-10 pt-32">

          <p className="eclets-label mb-10 text-white/25">
            ECLETS / MENU
          </p>

          <nav className="flex flex-col">
            <Link
              href="/shop"
              onClick={closeMobile}
              className="eclets-product-name border-b border-white/10 py-5 text-4xl text-white/85"
            >
              New In
            </Link>

            <Link
              href="/shop"
              onClick={closeMobile}
              className="eclets-product-name border-b border-white/10 py-5 text-4xl text-white/85"
            >
              Men
            </Link>

            <Link
              href="/shop"
              onClick={closeMobile}
              className="eclets-product-name border-b border-white/10 py-5 text-4xl text-white/85"
            >
              Collections
            </Link>

            <Link
              href="/#about"
              onClick={closeMobile}
              className="eclets-product-name border-b border-white/10 py-5 text-4xl text-white/85"
            >
              About
            </Link>
          </nav>

          <div className="mt-auto grid grid-cols-2 gap-px bg-white/10">
            <Link
              href="/shop"
              onClick={closeMobile}
              className="bg-[#0b0b0b] p-5 text-[10px] uppercase tracking-[0.2em] text-white/50"
            >
              Search
            </Link>

            <Link
              href="/cart"
              onClick={closeMobile}
              className="bg-[#0b0b0b] p-5 text-[10px] uppercase tracking-[0.2em] text-white/50"
            >
              Bag / {cartCount}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}