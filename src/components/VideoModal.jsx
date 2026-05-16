import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Play, Volume2 } from 'lucide-react'

export default function VideoModal({ onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      id="video-modal"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full p-2 sm:px-4 sm:py-2 cursor-pointer"
        id="video-modal-close"
      >
        <X className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-medium">Back</span>
      </button>

      {/* Video Player Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-[900px] mx-4 aspect-video relative rounded-lg overflow-hidden"
      >
        {/* Placeholder Video Area — since we don't have a real video, we show a cinematic placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex flex-col items-center justify-center relative">
          {/* Animated circles background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${60 + i * 40}px`,
                  height: `${60 + i * 40}px`,
                  left: `${20 + i * 12}%`,
                  top: `${15 + i * 10}%`,
                  background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(229,9,20,0.15)' : 'rgba(255,215,0,0.1)'}, transparent)`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Center play area */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-6"
          >
            <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white ml-1" />
          </motion.div>

          <p className="relative z-10 text-white/90 text-lg sm:text-2xl font-bold text-center mb-2">
            🎂 Samya's Birthday Reel
          </p>
          <p className="relative z-10 text-white/50 text-sm sm:text-base text-center">
            A compilation of the most beautiful moments
          </p>

          {/* Bottom controls bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 flex items-center gap-4">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-red)] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '35%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>
            <Volume2 className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
