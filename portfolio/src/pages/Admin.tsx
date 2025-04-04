import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ContactMessage } from './Contact';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadMessages();
    }
  }, []);

  const loadMessages = () => {
    try {
      const storedMessages = localStorage.getItem('contactMessages');
      if (storedMessages) {
        const parsedMessages: ContactMessage[] = JSON.parse(storedMessages);
        // Sort messages by date (newest first)
        parsedMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - in a real app, use a proper auth system
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      loadMessages();
    } else {
      setLoginError('Invalid username or password');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setUsername('');
    setPassword('');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = (id: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all messages? This cannot be undone.')) {
      setMessages([]);
      setSelectedMessage(null);
      localStorage.setItem('contactMessages', JSON.stringify([]));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-dark rounded-xl glass glow-border"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter your credentials to access the admin panel</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {loginError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500 bg-opacity-20 text-red-200 p-3 rounded-lg mb-4"
              >
                {loginError}
              </motion.div>
            )}
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass bg-dark border border-gray-700 text-white focus:border-primary focus:outline-none"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass bg-dark border border-gray-700 text-white focus:border-primary focus:outline-none"
                required
              />
            </div>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-blue text-white rounded-lg font-medium"
              >
                Login
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoBack}
                className="w-full py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg font-medium"
              >
                Back to Site
              </motion.button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">Demo credentials: admin / admin123</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark text-white pb-10">
      {/* Header */}
      <header className="border-b border-gray-800 bg-dark bg-opacity-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient-blue">Admin Dashboard</h1>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoBack}
              className="px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-sm"
            >
              Back to Site
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 bg-opacity-80 rounded-lg text-sm"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Messages list */}
          <div className="w-full lg:w-2/5">
            <div className="bg-dark bg-opacity-50 rounded-xl p-4 glass mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Messages ({messages.length})</h2>
                {messages.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDeleteAll}
                    className="text-xs px-3 py-1 bg-red-500 bg-opacity-20 text-red-300 rounded-md"
                  >
                    Delete All
                  </motion.button>
                )}
              </div>
              
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <i className="fas fa-inbox text-4xl mb-3 block"></i>
                  <p>No messages received yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedMessage?.id === message.id 
                          ? 'bg-primary bg-opacity-20 border border-primary border-opacity-40' 
                          : 'bg-dark bg-opacity-70 border border-gray-800'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium truncate mr-2">{message.name}</h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(message.date)}</span>
                      </div>
                      <p className="text-gray-300 text-sm truncate">{message.subject}</p>
                      <p className="text-gray-400 text-xs truncate">{message.email}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Message detail */}
          <div className="w-full lg:w-3/5">
            <div className="bg-dark bg-opacity-50 rounded-xl p-6 glass min-h-[60vh]">
              {selectedMessage ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Message Detail</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="text-sm px-3 py-1 bg-red-500 bg-opacity-20 text-red-300 rounded-md"
                    >
                      Delete
                    </motion.button>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">From</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-blue flex items-center justify-center text-white font-bold mr-3">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{selectedMessage.name}</p>
                        <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Subject</p>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <p>{formatDate(selectedMessage.date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Message</p>
                    <div className="p-4 bg-dark bg-opacity-70 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <i className="far fa-envelope-open text-5xl mb-4"></i>
                  <p>Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 