"use client";

import { useState } from "react";

const heights = ["Under 5'6\"", "5'6\" – 5'10\"", "5'10\" – 6'1\"", "6'1\"+"];

const bodyTypes = ["Slim", "Regular", "Athletic", "Broad"];

const fits = ["Slim", "Regular", "Relaxed"];

export default function FitExperience() {
  const [height, setHeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [preferredFit, setPreferredFit] = useState("");

  const showResult = height && bodyType && preferredFit;

  return (
    <section
      id="fit"
      className="bg-[#f2eee7] px-6 py-24 text-[#080808] md:px-10 md:py-32 lg:px-14"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">

          <div>
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-black/40">
              The Fit Experience
            </p>

            <h2 className="eclets-serif max-w-3xl text-5xl leading-[0.9] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              FIND YOUR
              <br />
              ECLETS FIT.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-black/50">
            Tell us a little about yourself. We&apos;ll help you find the
            silhouette that feels right.
          </p>

        </div>

        {/* Fit Panel */}
        <div className="mt-20 grid border-t border-black/15 lg:grid-cols-[1fr_1.2fr]">

          {/* Left Intro */}
          <div className="border-b border-black/15 py-10 lg:border-b-0 lg:border-r lg:pr-14">
            <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">
              01 — 03
            </span>

            <h3 className="eclets-serif mt-8 max-w-sm text-4xl leading-[0.95] md:text-5xl">
              Built around
              <br />
              your proportions.
            </h3>

            <p className="mt-6 max-w-sm text-xs leading-6 text-black/45">
              A better fit starts with understanding how you move, how you
              dress and how you want your clothes to feel.
            </p>
          </div>

          {/* Form */}
          <div className="py-10 lg:pl-14">

            {/* Height */}
            <div className="border-b border-black/15 pb-10">

              <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-black/40">
                01 — Height
              </p>

              <div className="flex flex-wrap gap-2">
                {heights.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setHeight(item)}
                    className={`border px-4 py-3 text-[9px] uppercase tracking-[0.12em] transition-all duration-300 ${
                      height === item
                        ? "border-black bg-black text-[#f2eee7]"
                        : "border-black/20 hover:border-black/60"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>

            {/* Body Type */}
            <div className="border-b border-black/15 py-10">

              <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-black/40">
                02 — Body Type
              </p>

              <div className="flex flex-wrap gap-2">
                {bodyTypes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setBodyType(item)}
                    className={`border px-5 py-3 text-[9px] uppercase tracking-[0.12em] transition-all duration-300 ${
                      bodyType === item
                        ? "border-black bg-black text-[#f2eee7]"
                        : "border-black/20 hover:border-black/60"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>

            {/* Preferred Fit */}
            <div className="border-b border-black/15 py-10">

              <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-black/40">
                03 — Preferred Fit
              </p>

              <div className="flex flex-wrap gap-2">
                {fits.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPreferredFit(item)}
                    className={`border px-5 py-3 text-[9px] uppercase tracking-[0.12em] transition-all duration-300 ${
                      preferredFit === item
                        ? "border-black bg-black text-[#f2eee7]"
                        : "border-black/20 hover:border-black/60"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>

            {/* Result */}
            <div className="pt-10">

              {showResult ? (
                <div className="border border-black/20 p-7 md:p-10">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                    Your ECLETS Fit
                  </p>

                  <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">

                    <div>
                      <p className="eclets-serif text-5xl md:text-6xl">
                        {preferredFit}
                      </p>

                      <p className="mt-3 text-xs text-black/45">
                        Based on your selected proportions and preference.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="border border-black bg-black px-7 py-4 text-[9px] uppercase tracking-[0.25em] text-[#f2eee7] transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                      Confirm Fit →
                    </button>

                  </div>

                </div>
              ) : (
                <div className="border border-dashed border-black/20 p-7 md:p-10">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-black/35">
                    Your ECLETS Fit
                  </p>

                  <p className="eclets-serif mt-4 text-3xl text-black/25">
                    Complete the three steps
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}