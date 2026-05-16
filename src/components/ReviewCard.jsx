import { motion } from 'framer-motion'
import { Star, ThumbsUp } from 'lucide-react'

export default function ReviewCard({ compliment, index, isLiked, onToggleLike }) {
  return (
    <div
      className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] hover:border-white/20 p-6 flex flex-col gap-3 transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
      id={`review-card-${compliment.id}`}
    >
      {/* Star Rating */}
      <div className="flex gap-1">
        {Array.from({ length: compliment.stars }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill="#E50914"
            color="#E50914"
          />
        ))}
      </div>

      {/* Friend Name */}
      <p className="text-white font-bold text-base">
        {compliment.friendName}
      </p>

      {/* Compliment Text */}
      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1">
        "{compliment.text}"
      </p>

      {/* Thumbs Up */}
      <div className="flex justify-end pt-2 border-t border-[var(--color-border)]">
        <motion.button
          onClick={() => onToggleLike(compliment.id)}
          whileTap={{ scale: 1.3 }}
          className="cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors"
          id={`thumbs-up-${compliment.id}`}
        >
          <ThumbsUp
            size={18}
            className={`transition-colors duration-150 ${
              isLiked
                ? 'text-[var(--color-red)] fill-[var(--color-red)]'
                : 'text-[var(--color-text-muted)] hover:text-white'
            }`}
          />
        </motion.button>
      </div>
    </div>
  )
}
