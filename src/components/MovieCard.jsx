import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function MovieCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="flex-shrink-0 w-[180px] md:w-[260px] h-[270px] md:h-[390px] rounded-md overflow-hidden relative group cursor-pointer"
      id={`movie-card-${card.id}`}
    >
      {/* Card Image */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-300"
      />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 card-gradient pointer-events-none" />

      {/* Hover Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/60 rounded-md transition-all duration-250 pointer-events-none" />

      {/* Play Icon Overlay (on hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250">
        <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Card Title */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
        <p className="text-white text-xs sm:text-sm font-bold leading-tight text-shadow-md">
          {card.title}
        </p>
      </div>
    </motion.div>
  )
}
