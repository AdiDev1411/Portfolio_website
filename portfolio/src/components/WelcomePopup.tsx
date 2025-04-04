import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomePopup = ({ onClose }: { onClose: () => void }) => {
  const [section, setSection] = useState(0);
  const [typing, setTyping] = useState('');
  const welcomeText = "Welcome to my digital portfolio";
  
  // Typewriter effect for welcome text
  useEffect(() => {
    if (section === 0) {
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < welcomeText.length) {
          setTyping(welcomeText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          setTimeout(() => setSection(1), 1000);
        }
      }, 100);
      
      return () => clearInterval(typeTimer);
    }
  }, [section]);

  const features = [
    { icon: "✨", title: "Modern Design", description: "Sleek and intuitive user interfaces" },
    { icon: "📱", title: "Responsive", description: "Works seamlessly across all devices" },
    { icon: "⚡", title: "Fast Performance", description: "Optimized for quick loading times" },
    { icon: "🌟", title: "Animations", description: "Smooth animated interactions" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const nextSection = () => {
    if (section < 2) {
      setSection(section + 1);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(5, 5, 5, 0.8)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div 
        className="w-full max-w-lg relative bg-dark border border-gray-800 rounded-2xl overflow-hidden glow-border"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500 opacity-10 blur-2xl"></div>
        
        <div className="p-6 md:p-8">
          {/* Header with animated dots and logo */}
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M30 5L5 55H30H55L30 5Z" fill="url(#welcomeLogo)" />
                <defs>
                  <linearGradient id="welcomeLogo" x1="5" y1="5" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3a86ff" />
                    <stop offset="1" stopColor="#00b4d8" />
                  </linearGradient>
                </defs>
              </svg>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="w-3 h-3 rounded-full bg-gradient-blue"
                ></motion.div>
              ))}
            </div>
            <div className="ml-auto">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {section === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-blue">
                  {typing}<span className="inline-block ml-1 animate-pulse">|</span>
                </h2>
                <p className="text-gray-300 mb-8">
                  I'm excited to show you what I've been working on
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSection}
                  className="px-8 py-3 rounded-full bg-gradient-blue text-white font-medium"
                >
                  Let's Start
                </motion.button>
              </motion.div>
            )}
            
            {section === 1 && (
              <motion.div
                key="features"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="py-4"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-xl font-bold mb-6 text-center text-gradient-blue"
                >
                  What I Offer
                </motion.h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-darker p-4 rounded-xl border border-gray-800"
                    >
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div variants={itemVariants} className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSection}
                    className="px-8 py-3 rounded-full bg-gradient-blue text-white font-medium"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {section === 2 && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-blue flex items-center justify-center"
                >
                  <span className="text-2xl">👋</span>
                </motion.div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Ready to <span className="text-gradient-blue">Explore</span>
                </h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Feel free to browse through my projects and reach out if you're interested in working together!
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gradient-blue text-white font-medium"
                >
                  Let's Go!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePopup; 