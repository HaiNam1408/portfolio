type ButtonProps = {
  title: string;
  subtitle: string;
  onClick?: () => void;
};

const AppButton = ({ title, subtitle, onClick }: ButtonProps) => {
  return (
    <div
      className={`rounded-full relative inline-block group cursor-pointer overflow-hidden`}
    >
      <div
        onClick={onClick}
        className="rounded-full relative px-8 py-3 text-sm font-medium text-white bg-black dark:text-black dark:bg-white cursor-pointer border-[1.2px] border-white dark:border-black"
      >
        <span className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:opacity-0 group-hover:translate-y-[50%]">
          {title}
        </span>
        <span className="absolute top-1/2 left-1/2 text-black dark:text-white opacity-0 translate-x-[-50%] translate-y-[225%] group-hover:translate-y-[-50%] group-hover:opacity-100 transition-all duration-[900ms] ease-[cubic-bezier(0.48,0,0.12,1)] z-20">
          {subtitle ?? title}
        </span>
      </div>
      <div
        className="absolute inset-0 z-0 bg-white dark:bg-black origin-bottom scale-y-0 group-hover:scale-y-150 transition-transform duration-[800ms] ease-[cubic-bezier(0.48,0,0.12,1)]"
        style={{
          clipPath: "ellipse(100% 100% at 50% 100%)",
        }}
      />
    </div>
  );
};

export default AppButton;
