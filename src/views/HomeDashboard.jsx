import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ContentRow from '../components/ContentRow'
import { contentRows } from '../data/memoryCards'

export default function HomeDashboard({ onPlayClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-[var(--color-surface)] overflow-x-hidden"
      id="home-dashboard-view"
    >
      {/* Hero Section */}
      <HeroSection onPlayClick={onPlayClick} />

      {/* Content Rows */}
      <div className="relative z-10 -mt-16 sm:-mt-24 pb-16">
        {contentRows.map((row, i) => (
          <ContentRow key={row.title} row={row} rowIndex={i} />
        ))}
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-12 lg:px-16 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            Built with love ❤️ — <span className="text-[var(--color-red)] font-semibold">Samyaflix</span>
          </p>
          <p className="text-[var(--color-text-muted)] text-xs mt-1">
            A Samyaflix Original Birthday Experience • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </motion.div>
  )
}
