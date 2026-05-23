import { motion } from 'framer-motion'
import { Play, Info, Sparkles } from 'lucide-react'
import { media } from '../media/mediaConfig'

export default function HeroSection({ onPlayClick }) {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black" id="hero-section">
      {/* Background Image with Ken Burns Effect (Change 1b) */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "alternate", ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img
            src={media.hero.background}
            alt="Birthday celebration"
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>
      </div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-1" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-1" />

      {/* Floating Particles/Confetti (Change 1b) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.6, 0],
              x: `${(Math.random() * 100) + (Math.sin(i) * 5)}%` 
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ 
              backgroundColor: i % 3 === 0 ? '#E50914' : i % 3 === 1 ? '#FFD700' : '#ffffff',
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div 
        className="relative z-10 h-full w-full flex items-center"
        style={{ paddingLeft: '5%', paddingRight: '5%' }}
      >
        <div className="max-w-[850px]">
          {/* Subtitle Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-[2px] bg-red-600" />
            <span className="text-zinc-200 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              A Netflix Original Birthday
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tighter"
          >
            HAPPY
            <br />
            BIRTHDAY
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-yellow-500">
              SAMYA
            </span>
          </motion.h1>

          {/* Synopsis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-zinc-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl drop-shadow-md"
          >
            Witness the extraordinary life of the main character herself. From chaotic comedy to heartwarming drama, this is the story of someone who makes the world a lot more vibrant. Streaming only on her special day.
          </motion.p>

          {/* Metadata Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-3 text-zinc-400 text-sm mb-10 font-medium"
          >
            <span className="text-green-500 font-bold">99% Match</span>
            <span className="w-1 h-1 bg-zinc-600 rounded-full" />
            <span>2006</span>
            <span className="w-1 h-1 bg-zinc-600 rounded-full" />
            <span className="border border-zinc-700 px-2 py-0.5 rounded-sm text-[10px] text-white">U/A 16+</span>
            <span className="w-1 h-1 bg-zinc-600 rounded-full" />
            <span>2 Seasons</span>
            <span className="w-1 h-1 bg-zinc-600 rounded-full" />
            <span className="flex items-center gap-1"><Sparkles size={14} className="text-yellow-500" /> Must Watch</span>
          </motion.div>

          {/* Buttons (Change 1b) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onPlayClick}
              className="flex items-center gap-3 bg-white text-black font-bold px-8 py-3 rounded-md text-xl hover:bg-zinc-200 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <Play size={24} fill="black" />
              Play
            </button>

            <button
              className="flex items-center gap-3 bg-zinc-500/40 text-white font-bold px-8 py-3 rounded-md text-xl backdrop-blur-md hover:bg-zinc-500/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Info size={24} />
              More Info
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
