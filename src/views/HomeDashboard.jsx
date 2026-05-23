import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ContentRow from '../components/ContentRow'
import { media } from '../media/mediaConfig'

export default function HomeDashboard({ onPlayClick }) {
  // Map mediaConfig rows to the format ContentRow expects
  const rows = [
    { title: 'Sweet Memories', cards: media.rows.sweetMemories },
    { title: 'Better Together', cards: media.rows.drama },
    { title: 'Samya Special', cards: media.rows.comedy },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#141414] overflow-x-hidden"
    >
      {/* Hero Section */}
      <HeroSection onPlayClick={onPlayClick} />

      {/* Content Rows */}
      <div className="relative z-10 -mt-20 sm:-mt-32 pb-24">
        {rows.map((row, i) => (
          <ContentRow key={row.title} row={row} rowIndex={i} onPlayClick={onPlayClick} />
        ))}
      </div>

      {/* Footer */}
      <footer className="py-20 px-4 sm:px-12 lg:px-16 border-t border-zinc-900 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-zinc-500">
           <div className="flex gap-8 text-sm font-medium">
             <span className="hover:text-zinc-300 cursor-pointer">Audio Description</span>
             <span className="hover:text-zinc-300 cursor-pointer">Help Centre</span>
             <span className="hover:text-zinc-300 cursor-pointer">Gift Cards</span>
             <span className="hover:text-zinc-300 cursor-pointer">Terms of Use</span>
           </div>
           
           <div className="text-center">
             <p className="text-sm font-bold text-zinc-400">
               MADE WITH LOVE FOR SAMYA ❤️
             </p>
             <p className="text-xs mt-2 opacity-50 tracking-widest uppercase">
               © {new Date().getFullYear()} Samyaflix Entertainment Inc.
             </p>
           </div>

           <div className="text-[10px] border border-zinc-700 px-2 py-1 uppercase tracking-tighter">
             Service Code
           </div>
        </div>
      </footer>
    </motion.div>
  )
}
