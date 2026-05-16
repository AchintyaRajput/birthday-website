import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'

export default function ContentRow({ row, rowIndex, onPlayClick }) {
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const [isHovered, setIsHovered] = useState(false)
  
  // Responsive cards count
  const [visibleCount, setVisibleCount] = useState(6)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(2)
      else if (window.innerWidth < 1024) setVisibleCount(4)
      else setVisibleCount(6)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cards = row.cards
  
  const handleNext = () => {
    setDirection('next')
    setStartIndex((prev) => (prev + 1) % cards.length)
  }
  
  const handlePrev = () => {
    setDirection('prev')
    setStartIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  // Circular slicing
  const getVisibleCards = () => {
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      result.push(cards[(startIndex + i) % cards.length])
    }
    return result
  }

  const visibleCards = getVisibleCards()

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mb-8 sm:mb-12 relative group/row w-full overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Row Header */}
      <div className="flex items-center justify-between px-4 sm:px-12 lg:px-16 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
          {row.title}
          <span className="text-[var(--color-red)] text-sm font-medium opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center gap-1 cursor-pointer">
            Explore All <ChevronRight className="w-4 h-4" />
          </span>
        </h2>
        
        {/* Row Position Indicators (Dots) - Change 3d */}
        <div className="flex gap-1">
          {Array.from({ length: Math.ceil(cards.length / 1) }).map((_, i) => (
            <div 
              key={i} 
              className={`h-[2px] w-4 transition-all duration-300 ${
                startIndex === i ? 'bg-red-600 w-6' : 'bg-zinc-600'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-visible">
        {/* Left Arrow - Change 3c */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 sm:w-16 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Right Arrow - Change 3c */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 sm:w-16 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Cards Wrapper */}
        <div className="px-4 sm:px-12 lg:px-16">
          <div className="flex gap-4 md:gap-6 overflow-visible">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCards.map((card, i) => (
                <motion.div
                  key={`${card.id}-${startIndex}-${i}`}
                  layout
                  initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    opacity: { duration: 0.2 }
                  }}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / visibleCount}% - ${( (visibleCount - 1) * (window.innerWidth < 768 ? 16 : 24) ) / visibleCount}px)` }}
                >
                  <MovieCard card={card} index={i} onClick={onPlayClick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
