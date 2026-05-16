import { motion } from 'framer-motion'
import ReviewCard from '../components/ReviewCard'
import { compliments } from '../data/compliments'

export default function ComplimentsPage({ likedCards, onToggleLike }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-[var(--color-surface)] overflow-x-hidden"
      id="compliments-page-view"
    >
      {/* Page Header */}
      <div 
        className="pb-6 border-b border-[var(--color-border)]"
        style={{ paddingTop: '140px', paddingLeft: '8%', paddingRight: '8%' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Compliments &amp; Wishes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[var(--color-text-secondary)] italic mt-2 text-lg"
        >
          What the critics are saying about Samya
        </motion.p>
      </div>

      {/* Card Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10"
        style={{ paddingLeft: '8%', paddingRight: '8%' }}
      >
        {compliments.map((compliment, index) => (
          <motion.div
            key={compliment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <ReviewCard
              compliment={compliment}
              index={index}
              isLiked={likedCards.has(compliment.id)}
              onToggleLike={onToggleLike}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="pb-20 text-center"
        style={{ paddingLeft: '8%', paddingRight: '8%' }}
      >
        <div className="inline-flex items-center gap-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-6 py-4">
          <span className="text-3xl">🎂</span>
          <div className="text-left">
            <p className="text-white font-semibold text-sm sm:text-base">
              You're loved by everyone, Samya.
            </p>
            <p className="text-[var(--color-text-muted)] text-xs sm:text-sm">
              Unanimously rated 10/10 by all critics
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
