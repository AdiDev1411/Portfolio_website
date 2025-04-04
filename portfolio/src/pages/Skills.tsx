import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    // Load Devicon
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const frontendSkills = [
    { name: 'HTML', icon: 'devicon-html5-plain colored' },
    { name: 'CSS', icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Next.js', icon: 'devicon-nextjs-original' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
  ];

  const mlDataSkills = [
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'TensorFlow', icon: 'devicon-tensorflow-original colored' },
    { name: 'Scikit-learn', icon: 'devicon-sklearn-plain colored' },
    { name: 'Pandas', icon: 'devicon-pandas-original colored' },
    { name: 'NumPy', icon: 'devicon-numpy-original colored' },
    { name: 'Jupyter', icon: 'devicon-jupyter-plain colored' },
  ];

  const toolsSkills = [
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
    { name: 'Figma', icon: 'devicon-figma-plain colored' },
    { name: 'npm', icon: 'devicon-npm-original-wordmark colored' },
  ];

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // New floating animation for skill items
 

  return (
    <section id="skills" className="py-20 min-h-screen flex items-center bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 blur-3xl glow" 
          style={{ background: 'var(--primary)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-40 left-20 w-72 h-72 rounded-full opacity-5 blur-3xl glow" 
          style={{ background: 'var(--accent)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.07, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        ></motion.div>
      </div>
      
      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern opacity-3 z-0"
        animate={{ 
          backgroundSize: ['30px 30px', '35px 35px', '30px 30px'],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          ref={skillsRef}
          variants={containerVariants}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-gradient-blue glow-text tracking-tight"
              animate={{ 
                textShadow: [
                  "0 0 8px rgba(108, 99, 255, 0.5)", 
                  "0 0 16px rgba(108, 99, 255, 0.8)", 
                  "0 0 8px rgba(108, 99, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              My Skills
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-blue mx-auto mb-4"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are the technologies and tools I'm proficient with
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Frontend Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-white">
                <span className="text-gradient-blue">Frontend</span> Development
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {frontendSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    animate={activeSkill === skill.name ? "floating" : {}}
                    onHoverStart={() => setActiveSkill(skill.name)}
                    onHoverEnd={() => setActiveSkill(null)}
                    className="bg-dark p-4 rounded-xl glass glow-sm flex flex-col items-center text-center transform transition-all duration-300"
                  >
                    <i className={`${skill.icon} text-5xl mb-3 transition-all duration-300`}></i>
                    <span className="font-medium text-gray-200">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Machine Learning and Data Science Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-white">
                <span className="text-gradient-blue">Machine Learning</span> & Data Science
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {mlDataSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    animate={activeSkill === skill.name ? "floating" : {}}
                    
                    onHoverStart={() => setActiveSkill(skill.name)}
                    onHoverEnd={() => setActiveSkill(null)}
                    className="bg-dark p-4 rounded-xl glass glow-sm flex flex-col items-center text-center transform transition-all duration-300"
                  >
                    <i className={`${skill.icon} text-5xl mb-3 transition-all duration-300`}></i>
                    <span className="font-medium text-gray-200">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools and Other Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-white">
                <span className="text-gradient-blue">Tools</span> & Workflows
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {toolsSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    animate={activeSkill === skill.name ? "floating" : {}}
                    onHoverStart={() => setActiveSkill(skill.name)}
                    onHoverEnd={() => setActiveSkill(null)}
                    className="bg-dark p-4 rounded-xl glass glow-sm flex flex-col items-center text-center transform transition-all duration-300"
                  >
                    <i className={`${skill.icon} text-5xl mb-3 transition-all duration-300`}></i>
                    <span className="font-medium text-gray-200">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 p-6 border rounded-xl glass glow-border"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              <span className="text-gradient-blue">Additional</span> Skills & Interests
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {['UI/UX', 'Performance Optimization','LSTM Networks', 'Time Series Analysis', 'Data Visualization', 'Predictive Modeling', 'Regression Analysis', 'Feature Engineering', 'Data Preprocessing', 'Model Deployment'].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, y: -3, backgroundColor: 'rgba(108, 99, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-white bg-dark glass glow-sm transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(108, 99, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default Skills; 