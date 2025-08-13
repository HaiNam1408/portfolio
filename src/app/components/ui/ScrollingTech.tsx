import React from "react";

type ScrollingTechProps = {
  technologies: string[];
  direction?: "left" | "right";
};

const ScrollingTech: React.FC<ScrollingTechProps> = ({
  technologies,
  direction = "left",
}) => {
  const repeatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative overflow-x-hidden py-8">
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20" />

      {/* Scrolling wrapper */}
      <div
        className={`flex w-max gap-12 md:gap-20 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        } hover:[animation-play-state:paused]`}
      >
        {repeatedTechs.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <img
              src={`/svg/${tech}.svg`}
              alt={tech}
              className="h-7 w-auto object-contain transition-transform group-hover:scale-110 opacity-80"
              width={30}
              height={30}
              loading="lazy"
            />
            <span className="text-lg font-medium text-[var(--white-icon)] drop-shadow-md">
              {tech}
            </span>
          </div>
        ))}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        @media (min-width: 768px) {
          .animate-scroll-left,
          .animate-scroll-right {
            animation-duration: 50s;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollingTech;
