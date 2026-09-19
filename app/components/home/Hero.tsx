export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] text-[#f2eee7]">
      {/* HERO IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-main.png"
          alt="ECLETS Menswear"
          className="h-full w-full object-cover object-center"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Left text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

        {/* Bottom cinematic fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-[680px] pt-10 md:pt-16">

          {/* Small label */}
          <p className="mb-6 text-[8px] uppercase tracking-[0.38em] text-white/55 md:text-[9px]">
            Contemporary Menswear
          </p>

          {/* Main statement */}
          <h1 className="leading-[0.95]">
            <span className="block font-sans text-[clamp(1.4rem,3vw,2.5rem)] font-light tracking-[0.08em] text-white">
              YOU DON&apos;T SHOP ECLETS.
            </span>

            <span className="eclets-premium-title mt-2 block text-[clamp(3rem,6.5vw,6.8rem)] leading-[0.88]">
              YOU EXPERIENCE IT.
            </span>
          </h1>

          {/* CTA */}
          <a
            href="/shop"
            className="
              mt-8 inline-flex items-center gap-5
              border border-white/45
              px-5 py-3.5
              text-[8px] uppercase tracking-[0.28em]
              text-white/85
              transition-all duration-500
              hover:border-white
              hover:bg-white
              hover:text-black
              md:px-6 md:py-4
            "
          >
            Enter ECLETS
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>

      {/* BOTTOM LEFT */}
      <div className="absolute bottom-8 left-6 z-10 md:bottom-10 md:left-12">
        <div className="flex flex-col gap-2">
          <span className="text-[8px] uppercase tracking-[0.32em] text-white/55">
            Scroll to Explore
          </span>

          <span className="text-lg font-light leading-none text-white/70">
            ↓
          </span>
        </div>
      </div>

      {/* BOTTOM RIGHT SLIDER INDICATOR */}
      <div className="absolute bottom-9 right-6 z-10 md:right-12">
        <div className="flex items-center gap-5">
          <span className="text-[8px] tracking-[0.2em] text-white/60">
            01 / 03
          </span>

          <div className="flex items-center gap-3 text-white/65">
            <span className="text-lg font-light">←</span>
            <span className="text-lg font-light">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}