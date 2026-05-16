import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import samyaProfile from '../assets/images/samya_profile.png'

const profiles = [
  { id: 1, name: 'Samya', photo: samyaProfile, real: true },
  { id: 2, name: 'Best Friend', color: '#E50914', emoji: '🎉', real: false },
  { id: 3, name: 'The Gang', color: '#2563EB', emoji: '🎂', real: false },
  { id: 4, name: 'Add Profile', isAdd: true, real: false },
]

export default function ProfileSelection({ onProfileClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-40"
      id="profile-selection-view"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(229,9,20,0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-white text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center relative z-10"
      >
        Who's watching?
      </motion.h1>

      {/* Profile Cards Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-start justify-center gap-4 sm:gap-6 flex-wrap relative z-10 px-4"
      >
        {profiles.map((profile) => (
          <motion.button
            key={profile.id}
            onClick={profile.real ? onProfileClick : undefined}
            className={`flex flex-col items-center gap-2 group ${profile.real ? 'cursor-pointer' : 'cursor-default'}`}
            whileHover={profile.real ? { scale: 1.08 } : {}}
            whileTap={profile.real ? { scale: 0.98 } : {}}
          >
            <div
              className={`w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-md overflow-hidden transition-all duration-200 ${
                profile.real
                  ? 'group-hover:ring-2 group-hover:ring-white'
                  : 'group-hover:ring-2 group-hover:ring-white/30'
              }`}
            >
              {profile.isAdd ? (
                /* Add Profile Card */
                <div className="w-full h-full bg-[#2d2d2d] flex items-center justify-center">
                  <Plus className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
                </div>
              ) : profile.photo ? (
                /* Samya's real photo */
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-300"
                />
              ) : (
                /* Dummy colored avatar with emoji */
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: profile.color }}
                >
                  <span className="text-4xl sm:text-5xl">{profile.emoji}</span>
                </div>
              )}
            </div>
            <span className={`text-sm text-center transition-colors duration-200 ${
              profile.real
                ? 'text-[var(--color-text-secondary)] group-hover:text-white font-medium'
                : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'
            }`}>
              {profile.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Manage Profiles button (decorative) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-10 sm:mt-12 px-6 py-2 border border-[var(--color-text-muted)] text-[var(--color-text-muted)] hover:text-white hover:border-white text-sm font-medium tracking-wider uppercase transition-all duration-200 relative z-10 cursor-pointer rounded"
      >
        Manage Profiles
      </motion.button>
    </motion.div>
  )
}
