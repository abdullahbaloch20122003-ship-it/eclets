const navigation = [
  "New In",
  "Men",
  "Collections",
  "About",
];

const customer = [
  "Contact",
  "Size Guide",
  "Shipping & Returns",
  "Track Order",
];

const social = ["Instagram", "Facebook", "Pinterest"];

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-[#f2eee7]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">

        {/* Top Line */}
        <div className="h-px w-full bg-white/15" />

        {/* Main Footer */}
        <div className="grid gap-16 py-20 md:py-28 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">

          {/* Brand */}
          <div>
            <p className="eclets-serif text-5xl tracking-[-0.04em] md:text-6xl">
              ECLETS
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.32em] text-white/40">
              By Abdullah Baloch
            </p>

            <p className="mt-10 max-w-xs text-xs leading-6 text-white/40">
              Contemporary menswear for those who define their own presence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.28em] text-white/30">
              Explore
            </p>

            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="w-fit text-xs text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Customer */}
          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.28em] text-white/30">
              Customer
            </p>

            <nav className="flex flex-col gap-4">
              {customer.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="w-fit text-xs text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.28em] text-white/30">
              Follow ECLETS
            </p>

            <nav className="flex flex-col gap-4">
              {social.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group flex w-fit items-center gap-4 text-xs text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {item}
                  <span className="text-white/30 transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">
              © 2026 ECLETS. All Rights Reserved.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-[9px] uppercase tracking-[0.22em] text-white/25 transition-colors hover:text-white/60"
              >
                Privacy
              </a>

              <a
                href="#"
                className="text-[9px] uppercase tracking-[0.22em] text-white/25 transition-colors hover:text-white/60"
              >
                Terms
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}