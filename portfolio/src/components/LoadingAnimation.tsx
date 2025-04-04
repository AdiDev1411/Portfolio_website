import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  // Generate random particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  }, []);

  // Progress timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1 
      }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-dark flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-blue opacity-20"
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.8, 0.2],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: 3 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {/* Logo animation */}
      <motion.div 
        className="mb-8 relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "backOut" }}
      >
        <div className="w-32 h-32 rounded-full bg-dark flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-blue opacity-10"></div>
          <div className="relative">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 5L5 55H30H55L30 5Z" fill="url(#paint0_linear)" />
              <path d="M30 20L17.5 45H30H42.5L30 20Z" fill="url(#paint1_linear)" />
              <defs>
                <linearGradient id="paint0_linear" x1="5" y1="5" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a86ff" />
                  <stop offset="1" stopColor="#00b4d8" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="17.5" y1="20" x2="42.5" y2="45" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a86ff" />
                  <stop offset="1" stopColor="#00b4d8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <motion.div 
            className="absolute inset-0 border-2 border-primary rounded-full"
            animate={{ 
              rotate: 360,
              borderColor: ['#3a86ff', '#00b4d8', '#3a86ff']
            }}
            transition={{ 
              duration: 8, 
              ease: "linear", 
              repeat: Infinity,
              times: [0, 0.5, 1] 
            }}
          />
        </div>
      </motion.div>

      {/* Text animation */}
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {/* Animate each letter separately */}
          {Array.from("Aditya Avlani").map((letter, index) => (
            <motion.span 
              key={index}
              variants={letterVariants}
              className={letter !== " " ? "text-gradient-blue inline-block" : "inline-block w-2"}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.p 
          variants={letterVariants}
          className="text-xl text-gray-300"
        >
          Front-end Developer
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <div className="w-64 h-2 bg-dark rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-blue"
        />
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 mt-2 text-sm"
      >
        {progress}% completed
      </motion.p>
    </div>
  );
};

export default LoadingAnimation; 