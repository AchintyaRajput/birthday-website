import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import ProfileSelection from './views/ProfileSelection'
import HomeDashboard from './views/HomeDashboard'
import ComplimentsPage from './views/ComplimentsPage'
import VideoModal from './components/VideoModal'
import NetflixIntro from './components/NetflixIntro'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentView, setCurrentView] = useState('profile')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likedCards, setLikedCards] = useState(new Set())

  const handleProfileClick = useCallback(() => {
    setCurrentView('home')
  }, [])

  const handleNavigate = useCallback((view) => {
    setCurrentView(view)
  }, [])

  const handlePlayClick = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleToggleLike = useCallback((cardId) => {
    setLikedCards((prev) => {
      const next = new Set(prev)
      if (next.has(cardId)) {
        next.delete(cardId)
      } else {
        next.add(cardId)
      }
      return next
    })
  }, [])

  return (
    <div className="bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {/* INTRO — shows first, then disappears */}
        {showIntro && (
          <NetflixIntro
            key="intro"
            onComplete={() => setShowIntro(false)}
          />
        )}

        {/* MAIN APP — fades in after intro */}
        {!showIntro && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-[var(--color-surface)] overflow-x-hidden relative"
          >
            {/* Navbar - only visible on home and compliments views */}
            {currentView !== 'profile' && (
              <Navbar currentView={currentView} onNavigate={handleNavigate} />
            )}

            {/* View Transitions */}
            <AnimatePresence mode="wait">
              {currentView === 'profile' && (
                <ProfileSelection key="profile" onProfileClick={handleProfileClick} />
              )}
              {currentView === 'home' && (
                <HomeDashboard key="home" onPlayClick={handlePlayClick} />
              )}
              {currentView === 'compliments' && (
                <ComplimentsPage
                  key="compliments"
                  likedCards={likedCards}
                  onToggleLike={handleToggleLike}
                />
              )}
            </AnimatePresence>

            {/* Video Modal Overlay */}
            <AnimatePresence>
              {isModalOpen && <VideoModal onClose={handleCloseModal} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
