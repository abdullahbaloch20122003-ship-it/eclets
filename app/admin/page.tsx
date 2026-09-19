import Link from "next/link";

const stats = [
  {
    label: "Total Products",
    value: "6",
    note: "Live in catalogue",
  },
  {
    label: "Orders",
    value: "0",
    note: "No orders yet",
  },
  {
    label: "Customers",
    value: "0",
    note: "No customers yet",
  },
  {
    label: "Revenue",
    value: "Rs. 0",
    note: "Total sales",
  },
];

const quickActions = [
  {
    title: "Products",
    description: "Add, edit and manage your ECLETS catalogue.",
    href: "/admin/products",
  },
  {
    title: "Orders",
    description: "View and manage customer orders.",
    href: "/admin/orders",
  },
  {
    title: "Customers",
    description: "View customer information and activity.",
    href: "/admin/customers",
  },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f2eee7]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-white/10 p-8 md:block">
          <Link
            href="/"
            className="eclets-serif text-2xl tracking-[-0.04em]"
          >
            ECLETS
          </Link>

          <p className="mt-2 text-[8px] uppercase tracking-[0.28em] text-white/30">
            Admin / Control
          </p>

          <nav className="mt-16 space-y-2">
            <Link
              href="/admin"
              className="block border border-white/15 bg-white/5 px-4 py-4 text-[9px] uppercase tracking-[0.22em]"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              className="block px-4 py-4 text-[9px] uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
            >
              Products
            </Link>

            <Link
              href="/admin/orders"
              className="block px-4 py-4 text-[9px] uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
            >
              Orders
            </Link>

            <Link
              href="/admin/customers"
              className="block px-4 py-4 text-[9px] uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
            >
              Customers
            </Link>
          </nav>

          <div className="mt-auto pt-20">
            <Link
              href="/"
              className="text-[8px] uppercase tracking-[0.22em] text-white/30 hover:text-white"
            >
              ← Back To Store
            </Link>
          </div>
        </aside>

        <section className="flex-1">
          <header className="border-b border-white/10 px-6 py-6 md:px-10 lg:px-14">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                  ECLETS / Control Centre
                </p>

                <h1 className="eclets-serif mt-3 text-4xl tracking-[-0.03em] md:text-5xl">
                  Dashboard
                </h1>
              </div>

              <Link
                href="/"
                className="border border-white/15 px-4 py-3 text-[8px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                View Store
              </Link>
            </div>
          </header>

          <div className="px-6 py-10 md:px-10 lg:px-14">
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#080808] p-7">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                    {stat.label}
                  </p>

                  <p className="eclets-serif mt-5 text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-3 text-xs text-white/35">
                    {stat.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="mb-7">
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                  Management
                </p>

                <h2 className="eclets-serif mt-2 text-3xl">
                  Quick Access
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group border border-white/10 p-7 transition duration-300 hover:border-white/30 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="eclets-serif text-2xl">
                        {action.title}
                      </h3>

                      <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-white">
                        →
                      </span>
                    </div>

                    <p className="mt-6 max-w-sm text-sm leading-6 text-white/40">
                      {action.description}
                    </p>

                    <p className="mt-8 text-[8px] uppercase tracking-[0.25em] text-white/30">
                      Open Section
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                ECLETS / by Abdullah Baloch
              </p>

              <p className="mt-3 text-xs text-white/35">
                Manage the store from one place.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}