import Link from "next/link";
import { getProductsFromDatabase } from "../../lib/products-db";

export default async function NewStandard() {
  const products = await getProductsFromDatabase();

  const newArrivals = products.filter(
    (product) => product.new_arrival
  );

  return (
    <section className="border-t border-white/10 bg-[#080808] px-6 py-20 text-[#f2eee7] md:px-10 md:py-28 lg:px-14">
      {/* SECTION INTRO */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            ECLETS / The New Standard
          </p>

          <h2 className="eclets-serif mt-5 max-w-xl text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            The New
            <br />
            Standard.
          </h2>
        </div>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <p className="max-w-lg text-sm leading-7 text-white/45">
            A considered selection of contemporary menswear.
            Precise proportions, refined materials and a point of
            view designed for the modern wardrobe.
          </p>

          <Link
            href="/shop"
            className="w-fit border-b border-white/30 pb-2 text-[9px] uppercase tracking-[0.25em] text-white/55 transition hover:border-white hover:text-white"
          >
            Explore Collection →
          </Link>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="mt-16">
        {newArrivals.length === 0 ? (
          <div className="border border-white/10 px-6 py-20 text-center">
            <p className="eclets-serif text-3xl">
              New Arrivals Coming Soon
            </p>

            <p className="mt-4 text-sm text-white/40">
              New products will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {newArrivals.slice(0, 3).map((product, index) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className={`group block ${
                  index === 1 ? "lg:mt-20" : ""
                }`}
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.25em] text-white/25">
                      No Image
                    </div>
                  )}

                  {/* NEW LABEL */}
                  <div className="absolute left-4 top-4">
                    <span className="bg-[#f2eee7] px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-black">
                      New Arrival
                    </span>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="pt-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                        {product.category}
                      </p>

                      <h3 className="mt-2 text-sm tracking-wide">
                        {product.name}
                      </h3>
                    </div>

                    <p className="whitespace-nowrap text-sm">
                      Rs.{" "}
                      {Number(product.price).toLocaleString("en-PK")}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      {product.stock > 0
                        ? `${product.stock} In Stock`
                        : "Sold Out"}
                    </p>

                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/40 transition group-hover:text-white">
                      Discover →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}