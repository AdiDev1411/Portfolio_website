import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with email:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  
  const socialLinks = [
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com/in/aditya-avlani' },
    { name: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/AdiDev1411' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', url: 'https://twitter.com/aditya_avlani' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://instagram.com/aditya_avlani' }
  ];

  const footerLinks = [
    { heading: 'Quick Links', links: [
      { label: 'Home', url: '#home' },
      { label: 'About', url: '#about' },
      { label: 'Skills', url: '#skills' },
      { label: 'Projects', url: '#projects' },
      { label: 'Contact', url: '#contact' }
    ]},
    { heading: 'Services', links: [
      { label: 'Web Development', url: '#services' },
      { label: 'Machine Learning', url: '#services' },
      { label: 'Data Analysis', url: '#services' },
      { label: 'UI/UX Design', url: '#services' },
      { label: 'Predictive Models', url: '#services' }
    ]}
  ];

  return (
    <footer className="w-full pt-16 pb-8 bg-gradient-dark relative">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <a href="#home" className="flex items-center">
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  {/* New minimalist "A" logo */}
                  <path d="M10 30L20 10L30 30" stroke="url(#footerLogoStroke)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 24H26" stroke="url(#footerLogoStroke)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="footerLogoStroke" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#3a86ff" />
                      <stop offset="100%" stopColor="#00b4d8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-xl font-bold text-gradient-blue">Aditya Avlani</span>
              </a>
              <p className="mt-3 text-sm text-gray-400">
                Developer specializing in responsive web applications and machine learning solutions. Based in Rajkot, Gujarat, India.
              </p>
              
              <div className="mt-4">
                <a href="mailto:adiforpro@gmail.com" className="text-sm text-gray-400 hover:text-gradient-blue transition-colors">
                  <i className="fa-solid fa-envelope mr-2"></i>adiforpro@gmail.com
                </a>
              </div>
              
              <div className="mt-2">
                <a href="tel:7016157670" className="text-sm text-gray-400 hover:text-gradient-blue transition-colors">
                  <i className="fa-solid fa-phone mr-2"></i>+91 7016157670
                </a>
              </div>
            </div>
            
            {/* Quick Links Columns */}
            {footerLinks.map((group, index) => (
              <div key={index} className="col-span-1">
                <h3 className="text-white font-semibold mb-4">{group.heading}</h3>
                <ul className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.url} 
                        className="text-gray-400 hover:text-gradient-blue transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Newsletter Signup */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-3">Subscribe to my newsletter for latest updates on web development and machine learning projects.</p>
              
              <form onSubmit={handleSubscribe}>
                <div className="flex">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email" 
                    className="bg-dark border border-gray-700 text-gray-200 px-3 py-2 w-full rounded-l-md focus:outline-none focus:border-primary" 
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-gradient-blue text-white px-3 py-2 rounded-r-md hover:opacity-90 transition-opacity"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
                
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-xs mt-2"
                  >
                    Thanks for subscribing!
                  </motion.p>
                )}
              </form>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-800 pt-8 mt-8"></div>
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400 text-sm">
                &copy; {year} Aditya Avlani. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed and developed with ❤️
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-3 mb-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass bg-dark text-white hover:bg-gradient-blue transition-all duration-300"
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(108, 99, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;