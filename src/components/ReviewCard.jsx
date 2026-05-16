import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, Star, Quote } from 'lucide-react'

export default function ReviewCard({ compliment, isLiked, onToggleLike }) {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10)
  const [localLiked, setLocalLiked] = useState(isLiked)

  const handleLike = () => {
    if (!localLiked) {
      setLikes(prev => prev + 1)
      setLocalLiked(true)
      onToggleLike(compliment.id)
    } else {
      setLikes(prev => prev - 1)
      setLocalLiked(false)
      onToggleLike(compliment.id)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-6 text-zinc-800 group-hover:text-red-600/20 transition-colors">
        <Quote size={40} fill="currentColor" />
      </div>

      {/* Shimmer Effect (Change 1d) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {compliment.friendName.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-bold tracking-wide">{compliment.friendName}</h4>
          <div className="flex gap-0.5 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <p className="text-zinc-300 text-[0.95rem] leading-relaxed mb-6 italic relative z-10">
        "{compliment.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50 relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
          Verified Critic
        </span>
        
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            localLiked 
              ? 'bg-red-600/10 text-red-500 border border-red-600/20' 
              : 'bg-zinc-800 text-zinc-400 hover:text-white border border-transparent'
          }`}
        >
          <ThumbsUp size={16} className={localLiked ? 'fill-current' : ''} />
          <span className="text-xs font-bold">{likes}</span>
        </button>
      </div>
    </motion.div>
  )
}
