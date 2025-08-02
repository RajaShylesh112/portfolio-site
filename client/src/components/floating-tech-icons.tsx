import { motion } from "framer-motion";
import { 
  SiNodedotjs, 
  SiDocker, 
  SiPostgresql, 
  SiExpress, 
  SiTypescript, 
  SiReact,
  SiMongodb,
  SiRedis
} from "react-icons/si";

const techIcons = [
  { Icon: SiNodedotjs, color: "#339933", delay: 0 },
  { Icon: SiDocker, color: "#2496ED", delay: 0.2 },
  { Icon: SiPostgresql, color: "#336791", delay: 0.4 },
  { Icon: SiExpress, color: "#000000", delay: 0.6 },
  { Icon: SiTypescript, color: "#3178C6", delay: 0.8 },
  { Icon: SiReact, color: "#61DAFB", delay: 1.0 },
  { Icon: SiMongodb, color: "#47A248", delay: 1.2 },
  { Icon: SiRedis, color: "#DC382D", delay: 1.4 }
];

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {techIcons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: -180 
          }}
          animate={{ 
            opacity: 0.1,
            scale: 1,
            rotate: 0,
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Icon 
            size={40} 
            style={{ color: color }}
            className="filter blur-[0.5px] opacity-60"
          />
        </motion.div>
      ))}
    </div>
  );
}