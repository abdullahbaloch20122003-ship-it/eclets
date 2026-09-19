const looks = [
  {
    label: "THE SHIRT",
    price: "Rs. 8,999",
    position: "left-[45%] top-[32%]",
  },
  {
    label: "THE TROUSER",
    price: "Rs. 10,999",
    position: "left-[48%] top-[68%]",
  },
  {
    label: "THE OVERSHIRT",
    price: "Rs. 12,999",
    position: "left-[56%] top-[25%]",
  },
];

export default function ShopTheLook() {
  return (
    <section
      id="collections"
      className="bg-[#080808] px-6 py-28 text-[#f2eee7] md:px-10 md:py-40 lg:px-14"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eclets-label mb-5 text-white/40">
              Complete The Expression
            </p>

            <h2 className="eclets-serif max-w-4xl text-5xl leading-[0.9] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              SHOP
              <br />
              THE LOOK.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45">
            One silhouette. Multiple statements. Explore the pieces that
            complete the ECLETS look.
          </p>
        </div>

        {/* Landscape Editorial Image */}
        <div className="relative aspect-[16/9] min-h-[500px] overflow-hidden bg-[#151515] md:min-h-[700px]">

          <img
            src="/images/styles/shop-look.png"
            alt="ECLETS modern menswear look"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Product Hotspots */}
          {looks.map((look) => (
            <button
              key={look.label}
              type="button"
              aria-label={`View ${look.label}`}
              className={`absolute ${look.position} z-10 group`}
            >
              {/* Hotspot */}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/10 text-lg font-light text-white backdrop-blur-md transition-all duration-500 group-hover:scale-125 group-hover:bg-white group-hover:text-black">
                +
              </span>

              {/* Product Information */}
              <span className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap border border-white/20 bg-black/75 px-5 py-3 text-left backdrop-blur-md md:block md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/50">
                  {look.label}
                </span>

                <span className="mt-1 block text-xs tracking-[0.1em] text-white">
                  {look.price}
                </span>
              </span>
            </button>
          ))}

          {/* Bottom Editorial Caption */}
          <div className="absolute bottom-7 left-7 right-7 z-10 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/50">
                ECLETS / 01
              </p>

              <p className="eclets-serif mt-2 text-3xl text-white md:text-5xl">
                The Modern Uniform
              </p>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.25em] text-white/50 md:block">
              Explore Pieces →
            </span>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
            Contemporary Menswear
          </span>

          <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
            Collection 2026
          </span>
        </div>

      </div>
    </section>
  );
}