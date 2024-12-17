import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/react-logo.png", alt: "React Logo" },
  { src: "/images/nextjs.png", alt: "Next.js Logo" },
  { src: "/images/tailwind.png", alt: "Tailwind CSS Logo" },
  { src: "/images/shadcn.png", alt: "shadcn/ui Logo" },
  { src: "/images/typescript-logo.png", alt: "TypeScript Logo" },
];

const AnimatedLogos = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative h-[300px] w-[300px]"
        >
          {logos.map((logo, index) => {
            const angle = (index / logos.length) * Math.PI * 2;
            const x = Math.cos(angle) * 300;
            const y = Math.sin(angle) * 300;
            return (
              <motion.div
                key={logo.alt}
                className="absolute left-1/2 top-1/2"
                initial={{ x, y, opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: [0.5, 1.2, 1],
                  transition: { duration: 2, delay: index * 0.2 },
                }}
                style={{ x, y }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={40}
                  height={40}
                  className="w-12 object-contain"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedLogos;
