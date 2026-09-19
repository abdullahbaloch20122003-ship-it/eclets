import { getProductsFromDatabase } from "../lib/products-db";

export default async function TestDatabasePage() {
  const products = await getProductsFromDatabase();

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-16 text-[#f2eee7]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
          ECLETS / Database Test
        </p>

        <h1 className="eclets-serif text-5xl">
          Supabase Products
        </h1>

        <p className="mt-4 text-sm text-white/50">
          Products found: {products.length}
        </p>

        <div className="mt-10 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border border-white/10 p-5"
            >
              <div>
                <h2 className="text-lg">{product.name}</h2>

                <p className="mt-1 text-xs text-white/40">
                  {product.category}
                </p>
              </div>

              <p className="text-sm">
                Rs. {Number(product.price).toLocaleString("en-PK")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}