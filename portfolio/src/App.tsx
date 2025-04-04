import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import LoadingAnimation from './components/LoadingAnimation'
import WelcomePopup from './components/WelcomePopup'
import CustomCursor from './components/CustomCursor'
import Admin from './pages/Admin'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function MainContent() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia('(hover: hover)').matches)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
      // After loading, show welcome popup
      if (!localStorage.getItem('welcomeShown')) {
        setShowWelcome(true)
        localStorage.setItem('welcomeShown', 'true')
      }
      
      // Remove loading class from body
      document.body.classList.remove('loading')
    }, 2000)
    
    // Add loading class to body
    document.body.classList.add('loading')

    return () => clearTimeout(timer)
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
  }

  return (
    <BrowserRouter>
      {!isMobile && <CustomCursor />}
      <Routes>
        <Route path="/" element={
          loading ? (
            <LoadingAnimation />
          ) : (
            <div className="relative">
              {showWelcome && <WelcomePopup onClose={handleCloseWelcome} />}
              <MainContent />
            </div>
          )
        } />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
