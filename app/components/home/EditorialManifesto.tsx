export default function EditorialManifesto() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-32 text-[#f2eee7] md:px-10 md:py-44 lg:px-14">
      <div className="mx-auto max-w-[1600px]">

        <div className="mb-10 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            ECLETS / Philosophy
          </span>

          <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            02 / 04
          </span>
        </div>

        <div className="border-t border-white/15 pt-12 md:pt-16">

          <p className="mb-10 max-w-xs text-[9px] uppercase leading-5 tracking-[0.28em] text-white/35">
            Fashion is not about being seen.
            <br />
            It is about being remembered.
          </p>

          <h2 className="eclets-serif max-w-[1250px] text-5xl leading-[0.9] tracking-[-0.045em] md:text-7xl lg:text-[8.5rem]">
            DRESS
            <br />
            WITH
            <br />
            <span className="italic text-white/45">INTENTION.</span>
          </h2>

          <div className="mt-16 flex flex-col justify-between gap-10 border-t border-white/10 pt-8 md:flex-row md:items-end">

            <p className="max-w-md text-sm leading-7 text-white/40">
              We believe the strongest style does not ask for attention.
              It creates presence through proportion, material and restraint.
            </p>

            <div className="flex items-center gap-5">
              <span className="h-px w-16 bg-white/30" />

              <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
                The ECLETS Perspective
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}