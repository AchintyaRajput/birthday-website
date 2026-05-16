import { motion } from 'framer-motion'
import { Play, Plus, ThumbsUp, ChevronDown, Star } from 'lucide-react'

export default function MovieCard({ card, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={onClick}
      className="relative w-[160px] md:w-[240px] h-[240px] md:h-[360px] cursor-pointer group"
    >
      {/* Base Card */}
      <div className="w-full h-full rounded-md overflow-hidden bg-zinc-900 transition-all duration-300 group-hover:scale-110 group-hover:z-50 group-hover:shadow-2xl">
        <img
          src={card.src}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        
        {/* Simple Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

        {/* Mini Info Popup (Change 1c) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-white rounded-full text-black hover:bg-zinc-200 transition">
              <Play size={12} fill="black" />
            </div>
            <div className="p-1.5 border border-zinc-600 rounded-full text-white hover:border-white transition">
              <Plus size={12} />
            </div>
            <div className="p-1.5 border border-zinc-600 rounded-full text-white hover:border-white transition ml-auto">
              <ThumbsUp size={12} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
             <span className="text-green-500 text-[10px] font-bold">98% Match</span>
             <span className="text-zinc-400 text-[10px] border border-zinc-700 px-1">U/A 16+</span>
          </div>
          
          <p className="text-white text-xs font-bold truncate mb-1">
            {card.title}
          </p>
          
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] text-zinc-400 font-medium">Top Rated</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
