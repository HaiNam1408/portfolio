import { Hand, Code2, Rocket, Sparkles } from "lucide-react";
import { TiltedCard } from "../../../components/ui";
import AppButton from "../../../components/ui/AppButton";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Introduce() {
  const { t } = useTranslation();

  const stats = [
    { icon: <Code2 size={24} />, value: "1+", label: t("common.intro.stats.experience") },
    { icon: <Rocket size={24} />, value: "5+", label: t("common.intro.stats.projects") },
    { icon: <Sparkles size={24} />, value: "5+", label: t("common.intro.stats.clients") },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 min-h-[80vh] md:h-[100vh] w-full mt-8 md:px-6 lg:px-20 py-8 md:py-0 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      {/* Avatar Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/3 flex justify-center md:justify-start"
      >
        <TiltedCard
          imageSrc="/images/avatar.jpg"
          altText="Phạm Hải Nam - Developer"
          captionText="Phạm Hải Nam - Developer"
          rotateAmplitude={12}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="flex items-center gap-2 px-4 py-2 m-4 rounded-full bg-green-700/20 backdrop-blur-lg border border-white/30 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                Available for work
              </span>
            </div>
          }
        />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-2/3 flex flex-col text-left space-y-6 items-center md:items-start"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <Hand className="text-amber-600 dark:text-primary animate-[wave_3s_infinite]" size={24} />
          <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
            {t("common.intro.hello")}{" "}
            <span className="text-amber-600 dark:text-primary">Phạm Hải Nam</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-gray-800 dark:text-white">
            {t("common.intro.a")}{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-yellow-400 dark:to-amber-500 bg-clip-text text-transparent">
              {t("common.intro.creative")}
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-yellow-400 dark:to-amber-500 bg-clip-text text-transparent">
              {t("common.intro.passionate")}
            </span>
            <br />
            {t("common.intro.fullstack")}
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm sm:text-base text-center md:text-left md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl"
        >
          {t("common.intro.introduce")}
        </motion.p>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex flex-wrap gap-6 py-4 justify-center md:justify-start"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-300 dark:border-white/10 backdrop-blur-sm"
            >
              <div className="text-amber-600 dark:text-primary">{stat.icon}</div>
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-700 dark:text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-2 self-center md:self-start"
        >
          <AppButton
            title={t("common.intro.resume")}
            subtitle={t("common.intro.download")}
            onClick={() => {
              window.open('/files/CV_Software_Engineer.pdf', '_blank');
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Introduce;
