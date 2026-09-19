export default function BrandStory() {
  return (
    <section
      id="about"
      className="bg-[#080808] px-6 py-28 text-[#f2eee7] md:px-10 md:py-40 lg:px-14"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* Top Line */}
        <div className="mb-16 h-px w-full bg-white/15" />

        {/* Main Story */}
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">

          {/* Left Label */}
          <div>
            <p className="eclets-label text-white/40">
              The ECLETS Philosophy
            </p>

            <p className="mt-8 max-w-xs text-xs uppercase leading-6 tracking-[0.12em] text-white/35">
              Designed with intention.
              <br />
              Built without compromise.
            </p>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="eclets-serif max-w-5xl text-5xl leading-[0.9] tracking-[-0.035em] md:text-7xl lg:text-8xl">
              MORE THAN
              <br />
              JUST CLOTHES.
            </h2>

            <p className="mt-10 max-w-2xl text-sm leading-8 text-white/50 md:text-base">
              ECLETS was created for the modern man who understands that style
              is not about following the moment. It is about defining your own
              presence.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/50 md:text-base">
              Every silhouette is considered. Every material is selected with
              purpose. Every detail exists for a reason.
            </p>

            {/* Statement */}
            <div className="mt-16 border-l border-white/25 pl-6 md:mt-20 md:pl-10">
              <p className="eclets-serif max-w-3xl text-3xl leading-tight text-white/85 md:text-5xl">
                “Quiet design.
                <br />
                Strong identity.”
              </p>
            </div>

            {/* Link */}
            <a
              href="#collections"
              className="group mt-14 inline-flex items-center gap-7 border-b border-white/30 pb-3 text-[9px] uppercase tracking-[0.28em] text-white/70 transition-all duration-500 hover:border-white hover:text-white"
            >
              Discover ECLETS

              <span className="text-sm transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>

        </div>

        {/* Bottom Statement */}
        <div className="mt-28 border-t border-white/10 pt-8 md:mt-40">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/30">
              ECLETS / By Abdullah Baloch
            </span>

            <span className="text-[9px] uppercase tracking-[0.28em] text-white/30">
              Contemporary Menswear / 2026
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}