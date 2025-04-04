import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Create a contact message type
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

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
      transition: { duration: 0.5 },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    try {
      // Create a new message object
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        name: formData.user_name,
        email: formData.user_email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toISOString()
      };
      
      // Get existing messages from localStorage
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      
      // Add new message and save back to localStorage
      localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));
      
      console.log('Message saved:', newMessage);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to save message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  useEffect(() => {
    // Load Font Awesome icons
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/1f5ccdbc5a.js';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const contactInfo = [
    {
      icon: 'fa-solid fa-envelope',
      title: 'Email',
      value: 'adiforpro@gmail.com',
      link: 'mailto:adiforpro@gmail.com'
    },
    {
      icon: 'fa-solid fa-phone',
      title: 'Phone',
      value: '7016157670',
      link: 'tel:7016157670'
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Location',
      value: 'Rajkot, Gujarat, India',
      link: 'https://maps.google.com/?q=Rajkot,Gujarat,India'
    }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: 'fa-brands fa-linkedin-in',
      url: 'https://linkedin.com/in/aditya-avlani' 
    },
    { 
      name: 'GitHub', 
      icon: 'fa-brands fa-github',
      url: 'https://github.com/AdiDev1411' 
    },
    { 
      name: 'Twitter', 
      icon: 'fa-brands fa-twitter',
      url: 'https://twitter.com/aditya_avlani' 
    },
    { 
      name: 'Instagram', 
      icon: 'fa-brands fa-instagram',
      url: 'https://instagram.com/aditya_avlani' 
    }
  ];

  return (
    <section id="contact" className="py-20 min-h-screen flex flex-col items-center justify-between bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 blur-3xl glow" style={{ background: 'var(--primary)' }}></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full opacity-5 blur-3xl glow" style={{ background: 'var(--accent)' }}></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 relative flex-grow w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-blue glow-text tracking-tight">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-blue mx-auto mb-4"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a question or want to work together on web or machine learning projects? Feel free to contact me!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-white">
                Let's <span className="text-gradient-blue">Connect</span>
              </h3>
              
              <p className="text-gray-300 mb-8">
                I'm currently open for freelance work and collaborations. If you have a project that you want to get started, think you need my help with something, or just want to say hi, don't hesitate to reach out.
              </p>
              
              <div className="bg-dark p-6 rounded-xl glass glow-border mb-8">
                <h4 className="text-xl font-semibold mb-3 text-gradient-blue">Collaboration Opportunities</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-code mt-1 text-accent"></i>
                    <span>Web & Mobile App Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-robot mt-1 text-accent"></i>
                    <span>Machine Learning Model Development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-chart-line mt-1 text-accent"></i>
                    <span>Data Analysis & Visualization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-brain mt-1 text-accent"></i>
                    <span>AI Integration in Web Applications</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full glass bg-dark glow-sm group-hover:bg-gradient-blue transition-all duration-300">
                      <i className={info.icon}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 flex">{info.title}</h4>
                      <p className="text-lg text-white group-hover:text-gradient-blue transition-all duration-300">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Follow me on social media</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 flex items-center justify-center rounded-full glass bg-dark text-white glow-sm hover:bg-gradient-blue transition-all duration-300"
                    >
                      <i className={social.icon}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="rounded-xl p-6 glass glow-border">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Send me a <span className="text-gradient-blue">Message</span>
                </h3>
                
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass bg-dark border border-gray-700 text-white focus:border-primary focus:outline-none focus:glow-sm transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass bg-dark border border-gray-700 text-white focus:border-primary focus:outline-none focus:glow-sm transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass bg-dark border border-gray-700 text-white focus:border-primary focus:outline-none focus:glow-sm transition-all duration-300"
                      placeholder="Subject of your message"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg glass bg-dark border border-gray-700 text-white focus:border-primary focus:outline-none focus:glow-sm transition-all duration-300"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 px-6 rounded-lg bg-gradient-blue text-white font-medium glass glow transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                  
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-3 rounded-lg bg-green-500 bg-opacity-20 text-green-200 text-center"
                    >
                      Your message has been sent successfully. I'll get back to you soon!
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-3 rounded-lg bg-red-500 bg-opacity-20 text-red-200 text-center"
                    >
                      There was an error sending your message. Please try again later.
                    </motion.div>
                  )}
                </form>
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

export default Contact; 