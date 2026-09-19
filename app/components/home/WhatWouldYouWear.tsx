const styles = [
  {
    number: "01",
    title: "SHARP",
    description: "Precision tailoring. Strong presence.",
    image: "/images/styles/sharp.png",
  },
  {
    number: "02",
    title: "MINIMAL",
    description: "Quiet design. Effortless confidence.",
    image: "/images/styles/minimal.png",
  },
  {
    number: "03",
    title: "BOLD",
    description: "Distinct silhouettes. No compromise.",
    image: "/images/styles/bold.png",
  },
];

export default function WhatWouldYouWear() {
  return (
    <section className="bg-[#f2eee7] px-6 py-14 text-[#080808] md:px-10 md:py-20 lg:px-14">
      <div className="mx-auto max-w-[1600px]">

        <div className="grid items-center gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">

          {/* Left Editorial Heading */}
          <div className="lg:pr-4">
            <p className="mb-5 text-[9px] uppercase tracking-[0.28em] text-black/45">
              Discover Your Direction
            </p>

            <h2 className="max-w-xs text-4xl font-medium leading-[1.02] tracking-[0.08em] md:text-5xl lg:text-[3.2rem]">
              WHAT WOULD
              <br />
              YOU WEAR?
            </h2>

            <p className="mt-6 max-w-[230px] text-xs leading-6 text-black/50">
              Choose the attitude. We&apos;ll handle the details.
            </p>
          </div>

          {/* Style Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {styles.map((style) => (
              <a
                key={style.number}
                href="#new-in"
                className="group relative aspect-[4/5] overflow-hidden bg-[#d9d5cd]"
              >
                {/* Image */}
                <img
                  src={style.image}
                  alt={`${style.title} ECLETS style`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/15 transition-colors duration-700 group-hover:bg-black/35" />

                {/* Number */}
                <div className="absolute left-5 top-5 z-10">
                  <span className="text-[9px] tracking-[0.25em] text-white/75">
                    {style.number}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <h3 className="text-3xl font-light tracking-[0.12em] text-white md:text-2xl lg:text-3xl">
                    {style.title}
                  </h3>

                  <div className="mt-3 h-px w-8 bg-white/70 transition-all duration-500 group-hover:w-full" />

                  <p className="mt-3 translate-y-2 text-[8px] uppercase tracking-[0.18em] text-white/75 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {style.description}
                  </p>

                  <span className="mt-3 block text-[8px] uppercase tracking-[0.2em] text-white/70">
                    Explore Look →
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}