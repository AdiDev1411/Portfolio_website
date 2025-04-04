import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 min-h-screen flex items-center bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-5 blur-3xl glow" style={{ background: 'var(--primary)' }}></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full opacity-5 blur-3xl glow" style={{ background: 'var(--accent)' }}></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 z-0"></div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-blue glow-text tracking-tight">About Me</h2>
            <div className="w-20 h-1 bg-gradient-blue mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square relative z-10 overflow-hidden rounded-xl glow">
                <img 
                  src="/placeholder-profile.png" 
                  alt="Aditya Avlani" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-blue opacity-10"></div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border-2 rounded-xl z-0 border-primary"></div>
              
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full glass" style={{ background: 'var(--primary)', opacity: 0.1 }}></div>
              <div className="absolute -bottom-10 left-10 w-16 h-16 rounded-full glass" style={{ background: 'var(--accent)', opacity: 0.1 }}></div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-white">
                I'm a <span className="text-gradient-blue">Developer</span> with expertise in <span className="text-gradient-blue">Machine Learning</span> and a passion for creating intelligent applications
              </h3>
              
              <div className="space-y-6 text-gray-300 text-lg">
                <p>
                  I specialize in building modern web applications using React, Tailwind CSS, and TypeScript,
                  while also developing machine learning models using Python, TensorFlow, and scikit-learn.
                </p>
                
                <p>
                  My journey began with web development during my college years, and I've since expanded into the fascinating world of machine learning and data science. 
                  I've worked on various ML projects including stock price prediction using LSTM networks, crop yield prediction, and house price estimation models.
                </p>
                
                <p>
                  I'm passionate about combining web technologies with machine learning to create intelligent applications that solve real-world problems.
                  My goal is to leverage data-driven insights to build software that's not only visually appealing but also functionally powerful.
                </p>
                
                <p>
                  When I'm not coding, you can find me exploring new AI research papers, experimenting with datasets, or enjoying outdoor activities.
                  I believe in continuous learning and staying updated with the latest trends in both web development and machine learning.
                </p>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-8 flex flex-wrap gap-4"
              >
                
                
                <div className="py-2 px-4 bg-dark rounded-lg glass glow-sm">
                  <span className="text-gradient-blue">3+ projects</span>
                  <p className="text-sm text-gray-300">Completed</p>
                </div>
                
                <div className="py-2 px-4 bg-dark rounded-lg glass glow-sm">
                  <span className="text-gradient-blue">5+ technologies</span>
                  <p className="text-sm text-gray-300">Mastered</p>
                </div>
                
                <div className="py-2 px-4 bg-dark rounded-lg glass glow-sm">
                  <span className="text-gradient-blue">3+ ML models</span>
                  <p className="text-sm text-gray-300">Developed</p>
                </div>
              </motion.div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-white mb-3">Download My Resume</h4>
                <div className="flex flex-wrap gap-4">
                  <motion.a 
                    href="/assets/resumes/web-dev-resume.pdf" 
                    download
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full font-medium text-white bg-gradient-blue glass glow flex items-center"
                  >
                    <i className="fa-solid fa-code mr-2"></i>
                    Web Development
                  </motion.a>
                  
                  <motion.a 
                    href="/assets/resumes/ml-resume.pdf" 
                    download
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 180, 216, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full font-medium text-white glass glow flex items-center"
                    style={{ background: 'linear-gradient(to right, #3a86ff, #00b4d8)' }}
                  >
                    <i className="fa-solid fa-brain mr-2"></i>
                    Machine Learning
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
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

export default About; 