const pillars = [
  {
    number: "01",
    title: "PREMIUM FABRIC",
    text: "Selected materials with a focus on comfort, texture and lasting quality.",
  },
  {
    number: "02",
    title: "PRECISION FIT",
    text: "Modern silhouettes designed around movement, proportion and presence.",
  },
  {
    number: "03",
    title: "QUALITY CHECKED",
    text: "Every piece is reviewed before it becomes part of your wardrobe.",
  },
  {
    number: "04",
    title: "SIGNATURE PACKAGING",
    text: "Your ECLETS experience begins before you even wear the piece.",
  },
];

export default function QualityPillars() {
  return (
    <section className="bg-[#f2eee7] px-6 py-24 text-[#080808] md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 border-t border-black/15 pt-8 md:flex-row md:items-end">

          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
              The ECLETS Standard
            </p>

            <h2 className="eclets-serif mt-6 max-w-3xl text-5xl leading-[0.9] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              DETAILS
              <br />
              MATTER.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-black/45">
            From the first stitch to the final package, every part of the
            experience is considered.
          </p>

        </div>

        {/* Pillars */}
        <div className="mt-20 grid border-t border-black/15 md:grid-cols-2 lg:grid-cols-4">

          {pillars.map((pillar) => (
            <article
              key={pillar.number}
              className="group border-b border-black/15 py-8 md:border-r md:px-7 md:last:border-r-0 lg:border-b-0"
            >
              {/* Number */}
              <span className="text-[9px] tracking-[0.25em] text-black/35">
                {pillar.number}
              </span>

              {/* Title */}
              <h3 className="mt-20 text-xs font-medium uppercase tracking-[0.16em]">
                {pillar.title}
              </h3>

              {/* Line */}
              <div className="mt-5 h-px w-8 bg-black/30 transition-all duration-500 group-hover:w-full" />

              {/* Description */}
              <p className="mt-5 max-w-xs text-xs leading-6 text-black/45">
                {pillar.text}
              </p>

              {/* Arrow */}
              <span className="mt-10 block text-sm transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}