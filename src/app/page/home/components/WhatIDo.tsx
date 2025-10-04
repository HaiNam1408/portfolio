import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border border-white/20 rounded-lg overflow-hidden transition-all hover:border-primary/50"
    >
      <div
        onClick={onToggle}
        className="cursor-pointer flex justify-between items-center px-4 py-3 bg-white/10 hover:bg-white/15 transition-colors text-left"
      >
        <span className="font-semibold">{item.question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="px-4 py-3 text-sm bg-white/5 text-gray-200 text-left">
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
    },
    {
      question: t("common.whatIDo.qa2.question"),
      answer: t("common.whatIDo.qa2.answer"),
    },
    {
      question: t("common.whatIDo.qa3.question"),
      answer: t("common.whatIDo.qa3.answer"),
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left: Q&A */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-left"
          >
            {t("common.whatIDo.title")}
          </motion.h1>
          {qaList.map((item, index) => (
            <QAItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Right: Animated tech badges */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <ScrollingTech technologies={technologies[0]} />
          <ScrollingTech technologies={technologies[1]} direction="right" />
          <ScrollingTech technologies={technologies[2]} />
        </motion.div>
      </div>
    </section>
  );
}
