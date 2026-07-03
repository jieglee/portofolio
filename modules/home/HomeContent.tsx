"use client";

import { motion, Variants } from "framer-motion";
import MarqueeBrandsDemo from "@/common/components/shadcn-space/marquee/marquee-02";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

interface HomeContentProps {
  greeting: string;
  location: string;
  bio1: string;
  bio2: string;
  skillsTitle: string;
  skillsSubtitle: string;
}

export default function HomeContent({
  greeting,
  location,
  bio1,
  bio2,
  skillsTitle,
  skillsSubtitle,
}: HomeContentProps) {
  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-12 gap-12 bg-[#FFF6FB] dark:bg-[#0D0D12] text-[#31313F] dark:text-[#E9D5FF] overflow-hidden transition-colors duration-300"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Background Halftone / Dots Pattern (Digabung Inline) */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #FF4DA6 2px, transparent 2.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative Blur Ornaments */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#60A5FA] rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20 animate-pulse z-0"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#FF4DA6] rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20 animate-pulse z-0"></div>

      {/* KOLOM KIRI: Teks & Informasi */}
      <div className="relative z-10 flex flex-col items-start gap-6 max-w-2xl w-full">
        {/* Meta info / Location Badge */}
        <motion.div
          variants={item}
          className="inline-block bg-black dark:bg-[#22D3EE] text-white dark:text-black px-4 py-1 text-sm font-bold uppercase tracking-widest transform -skew-x-12 border-2 border-black dark:border-transparent"
        >
          {location}
        </motion.div>

        {/* Greeting / Main Title (Chromatic Aberration Effect) */}
        <motion.h1
          variants={item}
          className="font-marker text-5xl md:text-7xl font-black uppercase tracking-wider leading-none"
          style={{
            textShadow: "3px 3px 0px #FF4DA6, -3px -3px 0px #60A5FA",
          }}
        >
          {greeting}
        </motion.h1>

        {/* Bio / Origin Story Panel */}
        <motion.div
          variants={item}
          className="relative w-full bg-[#FF4DA6] dark:bg-[#C77DFF] text-white px-6 py-5 transform skew-x-3 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
        >
          <div className="transform -skew-x-3 flex flex-col gap-2">
            <p className="font-bold text-lg md:text-xl leading-relaxed">
              {bio1}
            </p>
            {bio2 && (
              <p className="text-sm md:text-base font-medium opacity-90">
                {bio2}
              </p>
            )}
          </div>
        </motion.div>

        {/* Skills & Marquee Area */}
        <motion.div variants={item} className="w-full mt-4">
          <h2 className="text-xl font-bold uppercase border-b-4 border-black dark:border-[#E9D5FF] pb-1 mb-2 inline-block transform -skew-x-6">
            {skillsTitle}
          </h2>
          <p className="text-sm font-medium mb-4 italic dark:text-[#A6AAB5]">
            {skillsSubtitle}
          </p>

          {/* Wrapper Marquee dengan gaya komik */}
          <div className="relative border-4 border-black dark:border-[#E9D5FF] bg-white dark:bg-[#31313F] shadow-[8px_8px_0px_0px_#60A5FA] dark:shadow-[8px_8px_0px_0px_#22D3EE] p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <MarqueeBrandsDemo />
            
            {/* Ornamen Tempelan */}
            <div className="absolute -top-3 -right-3 bg-[#FF4DA6] text-white border-2 border-black px-2 py-1 transform rotate-12 font-bold text-xs">
              POWERS
            </div>
          </div>
        </motion.div>
      </div>

      {/* KOLOM KANAN: Visual Profile */}
      <motion.div 
        variants={item}
        className="relative z-10 w-full lg:w-5/12 flex justify-center mt-10 lg:mt-0"
      >
        <div className="relative w-64 h-80 md:w-80 md:h-[420px] border-8 border-black dark:border-[#E9D5FF] bg-white dark:bg-[#31313F] transform rotate-3 hover:rotate-0 transition-all duration-300 shadow-[12px_12px_0px_0px_#FF4DA6] dark:shadow-[12px_12px_0px_0px_#22D3EE] overflow-hidden group">
          
          <img
            src="/images/runa gemoy.jpeg"
            alt="Profile Visual"
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
          />
          
          {/* Overlay Halftone Dots pada Foto */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, black 1px, transparent 1.5px)",
              backgroundSize: "8px 8px",
            }}
          ></div>
        </div>

        {/* Ornamen Label */}
        <div className="absolute -bottom-6 right-10 lg:-right-6 bg-white dark:bg-black border-4 border-black dark:border-[#60A5FA] px-3 py-2 transform -rotate-12 font-bold text-sm z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#60A5FA]">
          J//01
        </div>
      </motion.div>
    </motion.div>
  );
}