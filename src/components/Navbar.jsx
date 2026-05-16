import { motion } from 'framer-motion'
import { Gift, Search, Bell } from 'lucide-react'
import samyaProfile from '../assets/images/samya_profile.png'

export default function Navbar({ currentView, onNavigate }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 h-[68px]">
        {/* Left Section */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 group cursor-pointer"
            id="nav-logo"
          >
            <Gift className="w-7 h-7 text-[var(--color-red)] group-hover:scale-110 transition-transform" />
            <span className="text-[var(--color-red)] font-black text-2xl tracking-tight hidden sm:block">
              SAMYAFLIX
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('home')}
              id="nav-home"
              className={`text-[0.9rem] font-medium transition-colors duration-200 cursor-pointer ${
                currentView === 'home'
                  ? 'text-white'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('compliments')}
              id="nav-compliments"
              className={`text-[0.9rem] font-medium transition-colors duration-200 cursor-pointer ${
                currentView === 'compliments'
                  ? 'text-white'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              Compliments
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button className="text-white/70 hover:text-white transition-colors cursor-pointer" id="nav-search">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white/70 hover:text-white transition-colors relative cursor-pointer" id="nav-bell">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-red)] rounded-full" />
          </button>
          <button onClick={() => onNavigate('profile')} className="cursor-pointer" id="nav-avatar">
            <img
              src={samyaProfile}
              alt="Samya"
              className="w-8 h-8 rounded object-cover border border-transparent hover:ring-2 hover:ring-white transition-all"
            />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
