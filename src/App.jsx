import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import ProfileSelection from './views/ProfileSelection'
import HomeDashboard from './views/HomeDashboard'
import ComplimentsPage from './views/ComplimentsPage'
import VideoModal from './components/VideoModal'

function App() {
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
    <div className="min-h-screen w-full bg-[var(--color-surface)] overflow-x-hidden relative">
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
    </div>
  )
}

export default App
