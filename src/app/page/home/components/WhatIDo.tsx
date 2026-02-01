import { useRef, useState } from "react";
import { ChevronDown, Lightbulb, Code, Zap, User } from "lucide-react";
import ScrollingTech from "../../../components/ui/ScrollingTech";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const technologies = [
  ["React", "TypeScript", "TailwindCSS", "Nodejs", "Nextjs", "Nestjs"],
  ["HTML5", "CSS3", "JavaScript", "Git", "Docker", "MySQL", "PostgreSQL"],
  ["Flutter", "Firebase", "Python", "MongoDB", "Redis", "Laravel"],
];

function QAItem({
  item,
  isOpen,
  onToggle,
  icon,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group border-2 border-gray-300 dark:border-white/20 rounded-xl overflow-hidden transition-all hover:border-amber-500 dark:hover:border-primary/50 hover:shadow-lg bg-white dark:bg-white/5"
    >
      <div
        onClick={onToggle}
        className="cursor-pointer flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-gray-50 to-white dark:from-white/10 dark:to-transparent hover:from-amber-50 hover:to-amber-100 dark:hover:from-primary/10 dark:hover:to-transparent transition-all text-left"
      >
        <div className="p-2 rounded-lg bg-amber-100 dark:bg-primary/10 text-amber-700 dark:text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="font-bold text-gray-800 dark:text-white pr-2 flex-1">
          {item.question}
        </span>
        <ChevronDown
          className={`transform transition-all duration-300 flex-shrink-0 text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-primary ${
            isOpen ? "rotate-180 scale-110" : ""
          }`}
          size={20}
        />
      </div>

      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="px-5 py-4 text-sm bg-gradient-to-br from-gray-50 to-amber-50/30 dark:from-white/5 dark:to-transparent text-gray-800 dark:text-gray-300 text-left border-t border-gray-200 dark:border-white/5">
          {item.answer}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatIDo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const qaList = [
    {
      question: t("common.whatIDo.qa1.question"),
      answer: t("common.whatIDo.qa1.answer"),
      icon: <Code size={20} />,
    },
    {
      question: t("common.whatIDo.qa2.question"),
      answer: t("common.whatIDo.qa2.answer"),
      icon: <Zap size={20} />,
    },
    {
      question: t("common.whatIDo.qa3.question"),
      answer: t("common.whatIDo.qa3.answer"),
      icon: <Lightbulb size={20} />,
    },
  ];

  return (
    <section className="py-0 md:py-20 md:px-4 relative">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-start">
        {/* Left: Q&A */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 flex flex-col items-center md:items-start"
          >
            <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-primary/10 border border-amber-300 dark:border-primary/30 text-amber-800 dark:text-primary font-semibold text-sm flex items-center gap-2 w-fit">
              <User size={16} />
              {t("common.whatIDo.aboutMe")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-left text-gray-800 dark:text-white">
              {t("common.whatIDo.title")}
            </h1>
            <p className="text-gray-700 dark:text-gray-400 text-left">
              {t("common.whatIDo.subtitle")}
            </p>
          </motion.div>

          <div className="space-y-4">
            {qaList.map((item, index) => (
              <QAItem
                key={index}
                item={item}
                icon={item.icon}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Right: Animated tech badges */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl py-8 border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tech Stack</h3>
              <ScrollingTech technologies={technologies[0]} />
              <ScrollingTech technologies={technologies[1]} direction="right" />
              <ScrollingTech technologies={technologies[2]} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
