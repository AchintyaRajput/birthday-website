import { motion } from 'framer-motion'
import samyaProfile from '../assets/images/samya_profile.png'

export default function ProfileCard({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-3 group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      id="profile-card-samya"
    >
      <div className="relative">
        <motion.div
          className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-lg overflow-hidden border-[3px] border-transparent group-hover:border-white transition-all duration-200"
        >
          <img
            src={samyaProfile}
            alt="Samya's Profile"
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-300"
          />
        </motion.div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: '0 0 30px rgba(229, 9, 20, 0.3), 0 0 60px rgba(229, 9, 20, 0.1)',
          }}
        />
      </div>

      <span className="text-[var(--color-text-secondary)] group-hover:text-white text-[1rem] font-medium transition-colors duration-200">
        Samya
      </span>
    </motion.button>
  )
}
