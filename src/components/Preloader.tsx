import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/Container.module.css";

const slideUp = {
  initial: { top: 0 },
  enter: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olá",
  "こんにちは",
  "Guten Tag",
  "Hallo",
  "Hola",
];

const getOpacityVariants = (index: number) => ({
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: {
      duration: index === 0 ? 1 : 0.12, 
      delay: index === 0 ? 0.2 : 0, 
    },
  },
});

export default function Preloader() {
  const [index, setIndex] = useState<number>(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;

    const delay = index === 0 ? 1000 : 150;
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            key={index}
            variants={getOpacityVariants(index)} 
            initial="initial"
            animate="enter"
            className="absolute z-50 flex items-center gap-3 text-4xl font-medium text-white"
          >
            <span className="block h-2 w-2 shrink-0 rounded-full bg-white"></span>
            {words[index]}
          </motion.p>

          <svg className="absolute top-0 h-[calc(100%+300px)] w-full fill-neutral-950">
            <motion.path variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
}
