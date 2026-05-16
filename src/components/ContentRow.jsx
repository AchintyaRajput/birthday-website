import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'

export default function ContentRow({ row, rowIndex }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const scrollAmount = 400
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + rowIndex * 0.15, duration: 0.5 }}
      className="mb-8 sm:mb-10 relative group/row w-full"
      id={`content-row-${rowIndex}`}
    >
      {/* Row Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white px-4 sm:px-12 lg:px-16 mb-4 flex items-center gap-3">
        {row.title}
        <span className="text-[var(--color-red)] text-sm font-medium opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center gap-1 cursor-pointer">
          Explore All <ChevronRight className="w-4 h-4" />
        </span>
      </h2>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 sm:w-14 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer"
          id={`scroll-left-${rowIndex}`}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 sm:w-14 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer"
          id={`scroll-right-${rowIndex}`}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-4 md:gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-12 lg:px-16 py-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {row.cards.map((card, i) => (
            <MovieCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
