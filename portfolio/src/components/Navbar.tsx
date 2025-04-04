import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to update active section and navbar styles
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar transparency based on scroll
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionId = section.getAttribute('id') || '';
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < 100 && sectionTop > -300) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure mobile menu closes when clicking a link
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Navbar links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-dark bg-opacity-80 backdrop-blur-lg' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center" onClick={() => handleNavClick('home')}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-3"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* New minimalist "A" logo */}
                <path d="M10 30L20 10L30 30" stroke="url(#navLogoStroke)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 24H26" stroke="url(#navLogoStroke)" strokeWidth="4" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="navLogoStroke" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3a86ff" />
                    <stop offset="100%" stopColor="#00b4d8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <span className="text-xl font-bold text-gradient-blue">Aditya Avlani</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative text-md font-medium transition-colors ${
                  activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                } pb-1`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-blue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-7 h-5 flex flex-col justify-between overflow-hidden">
              <motion.span 
                className="w-full h-0.5 bg-white block rounded-sm"
                animate={{ 
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white block rounded-sm"
                animate={{ 
                  opacity: isOpen ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white block rounded-sm"
                animate={{ 
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark bg-opacity-95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-5">
              <nav className="flex flex-col space-y-5">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`text-lg font-medium ${
                      activeSection === link.id ? 'text-white' : 'text-gray-400'
                    } transition-colors`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="activeMobileSection"
                        className="h-0.5 w-12 mt-1 bg-gradient-blue"
                      />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 