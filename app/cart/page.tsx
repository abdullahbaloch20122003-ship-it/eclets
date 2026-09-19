"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f2eee7] text-[#080808]">
        <header className="border-b border-black/10 px-6 py-6">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between">
            <Link
              href="/"
              className="eclets-serif text-2xl tracking-[-0.04em]"
            >
              ECLETS
            </Link>

            <Link
              href="/shop"
              className="text-[9px] uppercase tracking-[0.25em] text-black/50"
            >
              Continue Shopping
            </Link>
          </div>
        </header>

        <section className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-black/35">
              ECLETS / Your Bag
            </p>

            <h1 className="eclets-serif text-6xl tracking-[-0.04em] md:text-8xl">
              YOUR BAG
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-black/45">
              Your ECLETS bag is currently empty.
            </p>

            <Link
              href="/shop"
              className="mt-10 inline-flex border border-black bg-black px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-[#f2eee7]"
            >
              Explore Collection
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f2eee7] text-[#080808]">
      <header className="border-b border-black/10 px-6 py-6 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link
            href="/"
            className="eclets-serif text-2xl tracking-[-0.04em]"
          >
            ECLETS
          </Link>

          <Link
            href="/shop"
            className="text-[9px] uppercase tracking-[0.25em] text-black/50"
          >
            Continue Shopping
          </Link>
        </div>
      </header>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">

          {/* PAGE TITLE */}
          <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-10 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-black/40">
                ECLETS / Shopping Bag
              </p>

              <h1 className="eclets-serif text-6xl tracking-[-0.04em] md:text-8xl">
                YOUR BAG.
              </h1>
            </div>

            <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">
              {cart.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}{" "}
              Items
            </span>
          </div>

          <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_380px]">

            {/* PRODUCTS */}
            <div>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="border-b border-black/10 py-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row">

                    {/* IMAGE */}
                    <div className="h-48 w-36 shrink-0 overflow-hidden bg-[#dedbd4]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="flex flex-1 flex-col justify-between">

                      <div>
                        <p className="mb-2 text-[8px] uppercase tracking-[0.25em] text-black/35">
                          ECLETS
                        </p>

                        <h2 className="eclets-serif text-2xl">
                          {item.name}
                        </h2>

                        <p className="mt-3 text-xs text-black/50">
                          Size: {item.size}
                        </p>

                        <p className="mt-2 text-sm">
                          Rs. {item.price.toLocaleString("en-PK")}
                        </p>
                      </div>

                      {/* QUANTITY AREA */}
                      <div className="mt-8 flex flex-wrap items-center gap-6">

                        <div>
                          <p className="mb-2 text-[8px] uppercase tracking-[0.25em] text-black/40">
                            Quantity
                          </p>

                          <div className="flex h-12 items-center border border-black">
                            
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id,
                                  item.size
                                )
                              }
                              className="flex h-full w-12 items-center justify-center text-xl hover:bg-black hover:text-white"
                            >
                              −
                            </button>

                            <span className="flex h-full w-14 items-center justify-center border-x border-black text-sm">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id,
                                  item.size
                                )
                              }
                              className="flex h-full w-12 items-center justify-center text-xl hover:bg-black hover:text-white"
                            >
                              +
                            </button>

                          </div>
                        </div>

                        <div className="ml-auto">
                          <p className="mb-2 text-[8px] uppercase tracking-[0.25em] text-black/40">
                            Total
                          </p>

                          <span className="text-sm">
                            Rs.{" "}
                            {(item.price * item.quantity).toLocaleString(
                              "en-PK"
                            )}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.size
                            )
                          }
                          className="text-[8px] uppercase tracking-[0.25em] text-black/40 hover:text-black"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="mt-8 text-[8px] uppercase tracking-[0.25em] text-black/35 hover:text-black"
              >
                Clear Bag
              </button>
            </div>

            {/* ORDER SUMMARY */}
            <aside className="h-fit border border-black/10 p-7 md:p-9">

              <p className="mb-8 text-[9px] uppercase tracking-[0.28em] text-black/40">
                Order Summary
              </p>

              <div className="flex justify-between border-b border-black/10 pb-5">
                <span className="text-xs text-black/50">
                  Subtotal
                </span>

                <span className="text-sm">
                  Rs. {total.toLocaleString("en-PK")}
                </span>
              </div>

              <div className="flex justify-between border-b border-black/10 py-5">
                <span className="text-xs text-black/50">
                  Delivery
                </span>

                <span className="text-xs">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex justify-between pt-6">
                <span className="text-[9px] uppercase tracking-[0.25em]">
                  Total
                </span>

                <span className="text-lg">
                  Rs. {total.toLocaleString("en-PK")}
                </span>
              </div>

              <button
                type="button"
                className="mt-8 w-full border border-black bg-black py-5 text-[9px] uppercase tracking-[0.3em] text-[#f2eee7] hover:bg-transparent hover:text-black"
              >
                Proceed To Checkout
              </button>

              <p className="mt-5 text-center text-[8px] uppercase tracking-[0.2em] text-black/30">
                Secure ECLETS Checkout
              </p>

            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}