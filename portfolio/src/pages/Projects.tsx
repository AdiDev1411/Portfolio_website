import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Project Type
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
};

// Project Data
const projectsData: Project[] = [
  {
    id: 1,
    title: "Stock Price Prediction",
    description: "Developed a stock price prediction model using LSTM (Long Short-Term Memory) neural networks to forecast future stock prices based on historical data with high accuracy.",
    image: "/assets/images/stock-prediction.png",
    tags: ["Python", "TensorFlow", "LSTM", "Machine Learning", "Data Science", "Pandas"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/AdiDev1411/ML-Projects/tree/main/Stock_Price_Prediction",
  },
  {
    id: 2,
    title: "Crop Yield Prediction",
    description: "Created a machine learning model to predict crop yields based on weather patterns, soil conditions, and historical data to help farmers optimize their growing strategies.",
    image: "/assets/images/crop-yield.jpeg",
    tags: ["Python", "Machine Learning", "Data Analysis", "Scikit-learn", "Regression"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/AdiDev1411/ML-Projects/tree/main/Crop-yield-prediction",
  },
  {
    id: 3,
    title: "House Price Prediction",
    description: "Built a predictive model using various machine learning algorithms to estimate house prices based on features like location, size, amenities, and market trends.",
    image: "/assets/images/house-price.jpeg",
    tags: ["Python", "Machine Learning", "Data Visualization", "Random Forest", "Regression"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/AdiDev1411/ML-Projects/tree/main/House-Price-Pridiction",
  },
  {
    id: 4,
    title: "Currency converter",
    description: "Effortlessly convert currencies with real-time exchange rates, ensuring accurate and up-to-date conversions for all your global transactions.",
    image: "/assets/images/currency.png",
    tags: ["React", "Chart.js", "Firebase", "Material UI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 5,
    title: "TO-DO list",
    description: "A social platform where users can share posts, follow other users, like and comment on content, and receive real-time notifications.",
    image: "/assets/images/todo.png",
    tags: ["React", "Redux", "Socket.io", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 6,
    title: "Hostel Management System",
    description: "A Kanban-style project management tool with drag and drop functionality, task assignments, due dates, and progress tracking.",
    image: "/assets/images/hostel.png",
    tags: ["React", "TypeScript", "Redux", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 7,
    title: "Weather Application",
    description: "A weather forecast app that provides current conditions and 7-day forecasts for any location, with beautiful visualizations and animations.",
    image: "/assets/images/weather.png",
    tags: ["React", "JavaScript", "OpenWeather API", "CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 8,
    title: "Portfolio Website",
    description: "A personal portfolio website (this one!) built with modern web technologies to showcase my projects and skills.",
    image: "/assets/images/portfolio.png",
    tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  }
];

// Filter categories
const categories = ["All", "React", "TypeScript", "Node.js", "MongoDB", "Firebase", "Machine Learning", "Python", "LSTM", "Data Science"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [ref, inView] = useInView({
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

  // Filter projects
  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.tags.includes(activeCategory));

  return (
    <section id="projects" className="py-20 min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-5 blur-3xl glow" style={{ background: 'var(--primary)' }}></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full opacity-5 blur-3xl glow" style={{ background: 'var(--accent)' }}></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-blue glow-text tracking-tight">My Projects</h2>
            <div className="w-20 h-1 bg-gradient-blue mx-auto mb-4"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Check out some of my recent work
            </p>
          </motion.div>

          {/* Filter Categories */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(108, 99, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 glass ${
                  activeCategory === category 
                    ? 'bg-gradient-blue text-white glow' 
                    : 'bg-dark text-gray-300'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, y: 20 }}
                  layout
                  className="rounded-xl overflow-hidden bg-dark glass glow-border h-full"
                >
                  <div className="relative overflow-hidden group h-48">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-blue bg-opacity-30 backdrop-blur-sm">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2 bg-dark text-white rounded-full font-medium glass"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 rounded-full bg-dark"
                          style={{ color: 'var(--accent)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-dark text-gray-400">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">

                      <a 
                        href={project.githubUrl} 
                        target="https://github.com/AdiDev1411" 
                        rel="noopener noreferrer"
                        className="text-sm px-4 py-2 rounded-full border border-primary text-white glass"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-300">
                No projects found with the selected filter.
              </p>
              <motion.button
                onClick={() => setActiveCategory("All")}
                className="mt-4 px-6 py-2 bg-gradient-blue text-white rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show All Projects
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-darker bg-opacity-80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-dark rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto glass glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gradient-blue">{selectedProject.title}</h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="rounded-lg overflow-hidden mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-white">Description</h4>
                <p className="text-gray-300">{selectedProject.description}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-white">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-sm px-3 py-1 rounded-full bg-dark"
                      style={{ color: 'var(--accent)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full bg-gradient-blue text-white glass glow"
                >
                  Live Demo
                </a>
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full border border-primary text-white glass"
                >
                  GitHub Repository
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(108, 99, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Projects; 