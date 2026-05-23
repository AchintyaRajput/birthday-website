import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { media } from '../media/mediaConfig'

const profiles = [
  { id: 1, name: 'Basanti', photo: media.profile.samya, real: true },
  { id: 2, name: 'Best Friend', color: '#E50914', emoji: '🎉', real: false },
  { id: 3, name: 'The Gang', color: '#2563EB', emoji: '🎂', real: false },
  { id: 4, name: 'Add Profile', isAdd: true, real: false },
]

export default function ProfileSelection({ onProfileClick }) {
  return (
    <div className="fixed inset-0 bg-black z-[1000] overflow-hidden">

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full w-full flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white text-3xl sm:text-5xl font-bold mb-12 tracking-tight text-center"
        >
          Who's watching?
        </motion.h1>

        <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 px-4">
          {profiles.map((profile, i) => (
            <motion.button
              key={profile.id}
              onClick={profile.real ? onProfileClick : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + (i * 0.1), duration: 0.5 }}
              className={`flex flex-col items-center gap-3 group ${profile.real ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div
                className={`w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] rounded-md overflow-hidden relative transition-all duration-300 border-2 border-transparent ${
                  profile.real
                    ? 'group-hover:border-white group-hover:scale-105 shadow-2xl'
                    : 'opacity-50 group-hover:opacity-70'
                }`}
              >
                {profile.isAdd ? (
                  <div className="w-full h-full bg-[#18181b] flex items-center justify-center">
                    <Plus className="w-16 h-16 text-zinc-600 group-hover:text-zinc-200 transition-colors" />
                  </div>
                ) : profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: profile.color }}
                  >
                    <span className="text-5xl">{profile.emoji}</span>
                  </div>
                )}
                
                {/* Overlay on hover */}
                {profile.real && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <span className={`text-sm sm:text-base transition-colors duration-300 ${
                profile.real
                  ? 'text-zinc-400 group-hover:text-white font-medium'
                  : 'text-zinc-500'
              }`}>
                {profile.name}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-16 px-8 py-2.5 border border-zinc-600 text-zinc-500 hover:text-white hover:border-white text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer"
        >
          Manage Profiles
        </motion.button>
      </motion.div>
    </div>
  )
}
