import { motion } from 'framer-motion'
import { Play, Info, Sparkles } from 'lucide-react'
import heroBackground from '../assets/images/hero_background.png'

export default function HeroSection({ onPlayClick }) {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden" id="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Birthday celebration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-bottom-gradient" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10px',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#E50914' : i % 3 === 1 ? '#FFD700' : '#ffffff',
              borderRadius: '50%',
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div 
        className="relative z-10 h-full w-full flex items-center"
        style={{ paddingLeft: '4%', paddingRight: '4%' }}
      >
        <div className="max-w-[800px]">
          {/* Subtitle Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-red)]" />
            <span className="text-[var(--color-text-secondary)] text-sm font-semibold tracking-widest uppercase">
              A Netflix Original Birthday
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mb-6 text-shadow-lg glow-red"
          >
            Happy Birthday
            <br />
            <span className="bg-gradient-to-r from-[var(--color-red)] via-[#ff6b6b] to-[#FFD700] bg-clip-text text-transparent">
              Samya
            </span>
          </motion.h1>

          {/* Synopsis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[var(--color-text-secondary)] text-lg sm:text-xl leading-relaxed mb-6 max-w-2xl"
          >
            Today, we celebrate someone who makes every room brighter just by walking in. 
            This is your story — the laughs, the memories, the unforgettable moments that 
            make you the most incredible person we know. Welcome to your birthday universe. ✨
          </motion.p>

          {/* Metadata Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-8"
          >
            <span className="text-green-400 font-semibold">98% Match</span>
            <span>•</span>
            <span>2004</span>
            <span>•</span>
            <span>Heartwarming</span>
            <span>•</span>
            <span>Unforgettable</span>
            <span>•</span>
            <span className="border border-white/30 px-1.5 py-0.5 text-xs">U/A</span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onPlayClick}
              id="hero-play-button"
              className="flex items-center gap-2 bg-white text-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-base sm:text-lg hover:bg-white/80 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-black" />
              Play
            </button>

            <button
              id="hero-more-info-button"
              className="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-base sm:text-lg hover:bg-[rgba(109,109,110,0.5)] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
