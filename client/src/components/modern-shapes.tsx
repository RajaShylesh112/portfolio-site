import { motion } from "framer-motion";

export default function ModernShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Blobs */}
      <motion.div
        className="absolute w-96 h-96 opacity-5"
        style={{
          background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          left: "10%",
          top: "20%"
        }}
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute w-80 h-80 opacity-3"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          right: "15%",
          bottom: "25%"
        }}
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 70% 30% 60%",
            "70% 30% 40% 60% / 60% 40% 60% 30%",
            "40% 60% 70% 30% / 40% 70% 30% 60%"
          ],
          rotate: [360, 180, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 3D Grid Lines */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(1000px) rotateX(30deg)"
        }}
        animate={{
          backgroundPosition: ["0 0", "60px 60px", "0 0"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Low-poly triangles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "0",
            height: "0",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "26px solid rgba(99, 102, 241, 0.05)"
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2
          }}
        />
      ))}
    </div>
  );
}