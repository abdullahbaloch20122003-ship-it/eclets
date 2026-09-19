import Link from "next/link";
import { getProductsFromDatabase } from "../../lib/products-db";

export default async function FeaturedProducts() {
  const products = await getProductsFromDatabase();

  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="border-t border-white/10 bg-[#080808] px-6 py-20 text-[#f2eee7] md:px-10 md:py-28 lg:px-14">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            ECLETS / Selected
          </p>

          <h2 className="eclets-serif mt-5 text-5xl tracking-[-0.04em] md:text-7xl">
            Featured Products
          </h2>
        </div>

        <Link
          href="/shop"
          className="w-fit border-b border-white/30 pb-2 text-[9px] uppercase tracking-[0.25em] text-white/55 transition hover:border-white hover:text-white"
        >
          View All Products →
        </Link>
      </div>

      {/* PRODUCTS */}
      <div className="mt-14">
        {featuredProducts.length === 0 ? (
          <div className="border border-white/10 px-6 py-20 text-center">
            <p className="eclets-serif text-3xl">
              No Featured Products
            </p>

            <p className="mt-4 text-sm text-white/40">
              Featured products will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group block"
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

                  {/* BADGES */}
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {product.new_arrival && (
                      <span className="bg-[#f2eee7] px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-black">
                        New
                      </span>
                    )}

                    {product.stock <= 0 && (
                      <span className="border border-white/20 bg-black/70 px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-white">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>

                {/* INFO */}
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
                      View Product →
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