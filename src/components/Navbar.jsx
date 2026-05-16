import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gift, Search, Bell } from 'lucide-react'
import { media } from '../media/mediaConfig'

export default function Navbar({ currentView, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavLink = ({ view, label }) => {
    const isActive = currentView === view
    return (
      <button
        onClick={() => onNavigate(view)}
        className={`relative text-[0.85rem] sm:text-[0.9rem] font-medium transition-colors duration-300 cursor-pointer pb-1 group
          ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}
        `}
      >
        {label}
        {/* Active Underline (Change 1a) */}
        {isActive && (
          <motion.div 
            layoutId="activeNav"
            className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-red-600 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        {/* Hover Animation (Change 1a) */}
        <span className="absolute -bottom-[2px] left-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full opacity-50" />
      </button>
    )
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 h-[68px]">
        {/* Left Section */}
        <div className="flex items-center gap-6 sm:gap-10">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 group cursor-pointer"
            id="nav-logo"
          >
            <Gift className="w-7 h-7 text-red-600 group-hover:scale-110 transition-transform" />
            <span className="text-red-600 font-black text-2xl tracking-tighter hidden sm:block">
              SAMYAFLIX
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-4 sm:gap-8">
            <NavLink view="home" label="Home" />
            <NavLink view="compliments" label="Compliments" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 sm:gap-7">
          <button className="text-white/80 hover:text-white transition-colors cursor-pointer" id="nav-search">
            <Search size={20} />
          </button>
          
          <button className="text-white/80 hover:text-white transition-colors relative cursor-pointer" id="nav-bell">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full ring-2 ring-black" />
          </button>

          <button 
            onClick={() => onNavigate('profile')} 
            className="group cursor-pointer flex items-center gap-2" 
            id="nav-avatar"
          >
            <div className="w-8 h-8 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all">
              <img
                src={media.profile.samya}
                alt="Samya"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden lg:block text-sm font-medium text-white/70 group-hover:text-white transition-colors">
              Samya
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
