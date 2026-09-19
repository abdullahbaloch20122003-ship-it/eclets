"use client";

import { useEffect, useState } from "react";

export default function Opening() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`eclets-opening ${done ? "eclets-opening-done" : ""}`}>
      {/* BLACK */}
      <div className="absolute inset-0 bg-black" />

      {/* Atmospheric light */}
      <div className="eclets-opening-glow eclets-blue" />
      <div className="eclets-opening-glow eclets-gold" />

      {/* Circular light */}
      <div className="eclets-opening-ring">
        <div className="eclets-opening-ring-blur" />
      </div>

      {/* Logo */}
      <div className="eclets-opening-logo">

        {/* Symbol */}
        <div className="eclets-opening-symbol">
          <span className="symbol-circle" />
          <span className="symbol-line" />
          <span className="symbol-cut" />
        </div>

        {/* Wordmark */}
        <div className="eclets-opening-word">
          ECLETS
        </div>

        <div className="eclets-opening-sub">
          BY ABDULLAH BALOCH
        </div>
      </div>

      {/* Shine */}
      <div className="eclets-opening-shine" />

      <style jsx>{`
        .eclets-opening {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
          opacity: 1;
          visibility: visible;
          transition:
            opacity 600ms ease,
            visibility 600ms ease;
        }

        .eclets-opening-done {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* LIGHT */

        .eclets-opening-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0;
          animation: glow 1.2s ease-out forwards;
        }

        .eclets-blue {
          background: rgba(30, 100, 190, 0.18);
          transform: translateX(-80px);
        }

        .eclets-gold {
          background: rgba(210, 145, 65, 0.16);
          transform: translateX(80px);
          animation-delay: 0.2s;
        }

        @keyframes glow {
          0% {
            opacity: 0;
            transform: scale(0.25);
          }

          60% {
            opacity: 0.9;
          }

          100% {
            opacity: 0.45;
            transform: scale(1);
          }
        }

        /* RING */

        .eclets-opening-ring {
          position: absolute;
          width: 215px;
          height: 215px;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.2) rotate(-80deg);
          animation: ring 1.5s
            cubic-bezier(0.16, 1, 0.3, 1)
            0.2s forwards;
        }

        .eclets-opening-ring::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;

          background:
            conic-gradient(
              from 10deg,
              transparent,
              rgba(60, 135, 225, 0.95),
              transparent 30%,
              transparent 50%,
              rgba(225, 155, 70, 1),
              transparent 75%,
              rgba(255, 255, 255, 0.7),
              transparent
            );

          -webkit-mask:
            radial-gradient(
              farthest-side,
              transparent calc(100% - 2px),
              #000 calc(100% - 1px)
            );

          mask:
            radial-gradient(
              farthest-side,
              transparent calc(100% - 2px),
              #000 calc(100% - 1px)
            );
        }

        .eclets-opening-ring-blur {
          position: absolute;
          inset: -30px;
          border-radius: 50%;

          background:
            conic-gradient(
              from 180deg,
              transparent,
              rgba(50, 130, 220, 0.15),
              transparent,
              rgba(220, 145, 65, 0.18),
              transparent
            );

          filter: blur(20px);
        }

        @keyframes ring {
          0% {
            opacity: 0;
            transform: scale(0.15) rotate(-100deg);
          }

          35% {
            opacity: 1;
          }

          100% {
            opacity: 0.95;
            transform: scale(1.05) rotate(0deg);
          }
        }

        /* LOGO */

        .eclets-opening-logo {
          position: relative;
          z-index: 10;

          display: flex;
          flex-direction: column;
          align-items: center;

          opacity: 0;
          transform: scale(0.78) translateY(12px);

          animation:
            logoReveal
            1s
            cubic-bezier(0.16, 1, 0.3, 1)
            0.8s
            forwards;
        }

        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: scale(0.78) translateY(12px);
          }

          55% {
            opacity: 1;
          }

          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* SYMBOL */

        .eclets-opening-symbol {
          position: relative;
          width: 58px;
          height: 58px;
          margin-bottom: 16px;

          filter:
            drop-shadow(0 0 8px rgba(225, 155, 70, 0.4))
            drop-shadow(0 0 20px rgba(50, 125, 215, 0.25));
        }

        .symbol-circle {
          position: absolute;
          inset: 4px;
          border: 1.5px solid rgba(245, 241, 233, 0.95);
          border-radius: 50%;

          box-shadow:
            inset 0 0 5px rgba(255,255,255,0.4),
            0 0 10px rgba(220,160,80,0.3);
        }

        .symbol-line {
          position: absolute;
          left: 50%;
          top: -5px;
          width: 2px;
          height: 68px;
          transform: translateX(-50%);

          background:
            linear-gradient(
              to bottom,
              transparent,
              white 20%,
              #c99a61 50%,
              white 80%,
              transparent
            );

          box-shadow:
            0 0 10px rgba(255,200,120,0.6);
        }

        .symbol-cut {
          position: absolute;
          left: 20px;
          top: 27px;
          width: 28px;
          height: 2px;
          transform: rotate(-42deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              white,
              #c7975d,
              transparent
            );

          box-shadow:
            0 0 8px rgba(255,190,105,0.7);
        }

        /* WORDMARK */

        .eclets-opening-word {
          position: relative;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(40px, 5.5vw, 72px);

          font-weight: 500;

          letter-spacing: 0.28em;
          padding-left: 0.28em;

          color: transparent;

          background:
            linear-gradient(
              180deg,
              #ffffff,
              #aaa7a0 18%,
              #ffffff 32%,
              #77736d 50%,
              #f5f1e9 64%,
              #a98b69 80%,
              #ffffff
            );

          -webkit-background-clip: text;
          background-clip: text;

          text-shadow:
            0 1px 0 rgba(255,255,255,0.8),
            0 2px 0 rgba(145,140,132,0.8),
            0 4px 0 rgba(55,50,45,0.9),
            0 10px 25px rgba(0,0,0,0.9);

          animation:
            metallicGlow
            1.4s
            ease-in-out
            1.2s
            forwards;
        }

        @keyframes metallicGlow {
          0% {
            filter: brightness(0.65);
          }

          45% {
            filter: brightness(1.5);
          }

          100% {
            filter: brightness(1);
          }
        }

        .eclets-opening-sub {
          margin-top: 10px;

          font-family: Arial, Helvetica, sans-serif;
          font-size: 7px;
          letter-spacing: 0.42em;
          padding-left: 0.42em;

          color: rgba(242,238,231,0.38);
        }

        /* SHINE */

        .eclets-opening-shine {
          position: absolute;
          z-index: 20;

          width: 8%;
          height: 130%;

          left: -20%;

          transform: skewX(-20deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.75),
              transparent
            );

          filter: blur(7px);

          opacity: 0;

          animation:
            shine
            900ms
            ease-out
            1.45s
            forwards;
        }

        @keyframes shine {
          0% {
            left: -20%;
            opacity: 0;
          }

          20% {
            opacity: 0.8;
          }

          100% {
            left: 120%;
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .eclets-opening-ring {
            width: 180px;
            height: 180px;
          }

          .eclets-opening-word {
            font-size: 32px;
            letter-spacing: 0.23em;
          }
        }
      `}</style>
    </div>
  );
}