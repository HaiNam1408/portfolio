import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollingTech from "../../../components/ui/ScrollingTech";

const qaList = [
  {
    question: "What technologies do you use?",
    answer: "React, Node.js, TailwindCSS, Next.js, and more.",
  },
  {
    question: "Do you do fullstack?",
    answer: "Yes, I can handle both frontend and backend tasks.",
  },
  {
    question: "Do you love coding?",
    answer: "Absolutely. Coding is not just work, it's a passion.",
  },
];

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
    <div className="border border-white/20 rounded-lg overflow-hidden transition-all">
      <div
        onClick={onToggle}
        className="cursor-pointer flex justify-between items-center px-4 py-3 bg-white/10 transition-colors text-left"
      >
        <span className="font-semibold">{item.question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
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
        <div className="px-4 py-3 text-sm bg-white/10 text-gray-200 text-left">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function WhatIDo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-12 py-10">
      {/* Left: Q&A */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold mb-4 text-left">What I Do?</h1>
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
      <div>
        <ScrollingTech technologies={technologies[0]} />
        <ScrollingTech technologies={technologies[1]} direction="right" />
        <ScrollingTech technologies={technologies[2]} />
      </div>
    </div>
  );
}
