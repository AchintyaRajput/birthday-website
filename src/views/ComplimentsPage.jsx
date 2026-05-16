import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReviewCard from '../components/ReviewCard'
import { compliments } from '../data/compliments'

const Toast = ({ message, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm z-[10000] shadow-2xl border border-zinc-700 flex items-center gap-2"
      >
        <span className="text-red-500">❤️</span> {message}
      </motion.div>
    )}
  </AnimatePresence>
)

export default function ComplimentsPage({ likedCards, onToggleLike }) {
  const [showToast, setShowToast] = useState(false)

  const handleToggleLike = (id) => {
    onToggleLike(id)
    if (!likedCards.has(id)) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#141414] overflow-x-hidden"
    >
      <Toast message="Marked as helpful!" visible={showToast} />

      {/* Page Header */}
      <div 
        className="pb-12"
        style={{ paddingTop: '280px', paddingLeft: '8%', paddingRight: '8%' }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="w-12 h-1 bg-red-600 rounded-full" />
             <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Critic Reviews</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            COMPLIMENTS & WISHES
          </h1>
          <p className="text-zinc-400 text-xl font-medium max-w-2xl italic">
            "A masterpiece of a person." — What the global critics are saying about Samya's latest season.
          </p>
        </motion.div>
      </div>

      {/* Card Grid */}
      <div 
        className="pb-24"
        style={{ paddingLeft: '8%', paddingRight: '8%' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {compliments.map((compliment, index) => (
            <motion.div
              key={compliment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <ReviewCard
                compliment={compliment}
                isLiked={likedCards.has(compliment.id)}
                onToggleLike={handleToggleLike}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pb-24 text-center"
        style={{ paddingLeft: '8%', paddingRight: '8%' }}
      >
        <div className="inline-flex items-center gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(229,9,20,0.4)]">
             🏆
          </div>
          <div className="text-left">
            <p className="text-white font-black text-xl tracking-tight">
              100% FRESH ON TOMATOES
            </p>
            <p className="text-zinc-400 font-medium">
              Samya is officially the highest-rated friend of 2024.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
