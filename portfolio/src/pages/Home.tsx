import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [cursorGlow, setCursorGlow] = useState(false);
  
  const textOptions = ["Developer", "Machine Learning Engineer", "Data Scientist", "UI/UX Enthusiast", "Creative Thinker"];
  const _ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cursor glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorGlow(prevGlow => !prevGlow);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = loopNum % textOptions.length;
    const fullText = textOptions[current];

    const handleTyping = () => {
      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        
        if (text.length === fullText.length) {
          // Pause at the end of typing
          setTypingSpeed(1500);
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(80);
          }, 1500);
        }
      } else {
        setText(fullText.substring(0, text.length - 1));
        
        if (text.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(150);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, textOptions]);

  // Generate floating particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section id="home" ref={_ref} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 bg-gradient-dark">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            background: `radial-gradient(circle at 50% 50%, 
                       rgba(58, 134, 255, 0.2) 0%, 
                       transparent 35%)`
          }}
        />
        
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl glow" 
          style={{ background: 'var(--primary)' }} 
        ></motion.div>
        
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 right-20 w-72 h-72 rounded-full blur-3xl glow" 
          style={{ background: 'var(--accent)' }} 
        ></motion.div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-blue"
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0.2
            }}
            animate={{
              x: [
                Math.random() * 100 - 50, 
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              y: [
                Math.random() * 100 - 50, 
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Grid Pattern */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern opacity-3 z-0"
        animate={{ 
          backgroundSize: ['30px 30px', '32px 32px', '30px 30px'],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Content */}
      <div className="max-w-5xl text-center relative" ref={containerRef} style={{ zIndex: 10 }}>
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 overflow-hidden"
          >
            <motion.span
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-block text-lg sm:text-xl font-medium"
              style={{ color: 'var(--accent)' }}
            >
              Hello there, I'm
            </motion.span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight glow-text relative"
          >
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 15px rgba(58, 134, 255, 0.4)",
                  "0 0 30px rgba(58, 134, 255, 0.6)",
                  "0 0 15px rgba(58, 134, 255, 0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-white"
            >
              Aditya
            </motion.span>{" "}
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 15px rgba(0, 180, 216, 0.4)",
                  "0 0 30px rgba(0, 180, 216, 0.6)",
                  "0 0 15px rgba(0, 180, 216, 0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="text-gradient-blue"
            >
              Avlani
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-16 mb-8 flex items-center justify-center"
          >
            <div className="typewriter text-2xl md:text-3xl font-medium text-gray-300">
              <span>{text}</span>
              <motion.span 
                animate={{ opacity: cursorGlow ? 0.4 : 1 }}
                transition={{ duration: 0.8 }}
                className="cursor"
              >|</motion.span>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            I craft responsive websites and develop intelligent machine learning solutions
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(58, 134, 255, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="relative px-8 py-4 rounded-full font-medium text-lg bg-gradient-blue text-white glass glow group overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-80"
                initial={{ scale: 0, x: "-100%" }}
                whileHover={{ scale: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 180, 216, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="#about" 
              className="relative px-8 py-4 rounded-full font-medium text-lg border-2 text-white glass overflow-hidden group"
              style={{ borderColor: 'var(--accent)' }}
            >
              <span className="relative z-10">Explore Portfolio</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </motion.div>
        </div>
        
        
          
         
      </div>
      
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(58, 134, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .typewriter .cursor {
          display: inline-block;
          margin-left: 3px;
        }
        .glow-text {
          text-shadow: 0 0 15px rgba(58, 134, 255, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Home; 