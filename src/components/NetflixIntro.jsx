import { useEffect } from 'react'
import { motion } from 'framer-motion'

const NetflixIntro = ({ onComplete }) => {
  // Auto-advance to profile page after animation finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2600) // 2.6 seconds total
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] cursor-pointer"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.1 }} // fade out at the end
      onClick={onComplete} // clicking anywhere skips the intro
    >
      {/* Red cinematic glow behind the N */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.6) 0%, rgba(229,9,20,0.2) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 8], opacity: [0, 1, 0] }}
        transition={{ duration: 2, ease: [0.2, 0, 0.8, 1], delay: 0.3 }}
      />

      {/* The N — zooms toward viewer */}
      <motion.div
        initial={{ scale: 0.08, opacity: 0 }}
        animate={{
          scale: [0.08, 0.15, 1, 8],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.2,
          ease: [0.12, 0, 0.39, 0],
          times: [0, 0.15, 0.7, 1],
        }}
        className="relative z-10 select-none"
      >
        {/* The iconic N — match Netflix's exact letterform with SVG */}
        <svg
          viewBox="0 0 111 190"
          className="w-24 h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L0 190 L30 190 L30 0 Z"
            fill="#E50914"
          />
          <path
            d="M0 0 L81 190 L111 190 L30 0 Z"
            fill="#E50914"
          />
          <path
            d="M81 0 L81 190 L111 190 L111 0 Z"
            fill="#E50914"
          />
        </svg>

        {/* Light streak / swoosh effect over the N */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, delay: 1.0, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Skip hint text */}
      <motion.p
        className="absolute bottom-12 text-zinc-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Click anywhere to skip
      </motion.p>
    </motion.div>
  )
}

export default NetflixIntro
