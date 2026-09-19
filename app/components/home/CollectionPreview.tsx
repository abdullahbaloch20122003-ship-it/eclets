export default function CollectionPreview() {
  return (
    <section className="bg-[#f2eee7] px-6 py-24 text-[#080808] md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1600px]">

        <div className="mb-10 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.3em] text-black/35">
            ECLETS / Collection 01
          </span>

          <span className="text-[9px] uppercase tracking-[0.3em] text-black/35">
            2026
          </span>
        </div>

        <div className="relative overflow-hidden bg-[#d9d5cd]">
          <div className="relative aspect-[16/9] min-h-[520px] md:min-h-[650px]">

            <img
              src="/images/styles/shop-look.png"
              alt="ECLETS Collection 01 contemporary menswear"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-12 lg:p-16">

              <div className="flex justify-between">
                <span className="text-[9px] uppercase tracking-[0.28em] text-white/65">
                  Contemporary Menswear
                </span>

                <span className="text-[9px] uppercase tracking-[0.28em] text-white/65">
                  01 — 03
                </span>
              </div>

              <div>
                <p className="mb-5 text-[9px] uppercase tracking-[0.28em] text-white/55">
                  The First Chapter
                </p>

                <h2 className="eclets-serif max-w-4xl text-5xl leading-[0.88] tracking-[-0.04em] text-white md:text-7xl lg:text-[7rem]">
                  THE MODERN
                  <br />
                  <span className="italic text-white/75">
                    UNIFORM.
                  </span>
                </h2>

                <div className="mt-9">
                  <a
                    href="#new-in"
                    className="inline-flex items-center gap-8 border border-white/50 px-6 py-4 text-[9px] uppercase tracking-[0.28em] text-white transition-all duration-500 hover:bg-white hover:text-black"
                  >
                    Explore Collection
                    <span>→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-black/15 pt-5 md:flex-row">
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/30">
            Designed for the modern man
          </span>

          <span className="text-[9px] uppercase tracking-[0.25em] text-black/30">
            ECLETS / By Abdullah Baloch
          </span>
        </div>

      </div>
    </section>
  );
}