import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Play, Pause, RotateCcw, RotateCw, 
  Volume2, VolumeX, LayoutGrid, MessageSquare, 
  Gauge, Maximize, Minus, Plus 
} from 'lucide-react'
import { media } from '../media/mediaConfig'

export default function VideoModal({ onClose }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef(null)

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 3000)
  }

  const togglePlay = useCallback(() => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const skip = useCallback((amount) => {
    videoRef.current.currentTime += amount
  }, [])

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    videoRef.current.muted = newMuted
  }, [isMuted])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  const handleKeyDown = useCallback((e) => {
    switch(e.key.toLowerCase()) {
      case ' ': 
        e.preventDefault()
        togglePlay()
        break
      case 'arrowleft': skip(-10); break
      case 'arrowright': skip(10); break
      case 'escape': onClose(); break
      case 'f': toggleFullscreen(); break
      case 'm': toggleMute(); break
      case 'arrowup': 
        e.preventDefault()
        setVolume(prev => Math.min(prev + 0.1, 1))
        break
      case 'arrowdown': 
        e.preventDefault()
        setVolume(prev => Math.max(prev - 0.1, 0))
        break
      default: break
    }
  }, [togglePlay, skip, onClose, toggleFullscreen, toggleMute])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const onLoadedMetadata = () => {
    setDuration(videoRef.current.duration)
  }

  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * duration
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progress = (currentTime / duration) * 100 || 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src={media.video.birthdayReel}
        className="w-full h-full object-contain"
        autoPlay
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onClick={togglePlay}
      />

      {/* Back Arrow - Always Visible (Change 2d) */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-[10000] p-3 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all cursor-pointer backdrop-blur-sm"
      >
        <ArrowLeft size={28} />
      </button>

      {/* Controls Overlay (Change 2e) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Play/Pause Large Center Icon - Optional but nice */}
        <div className="absolute inset-0 flex items-center justify-center">
           {!isPlaying && (
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="p-8 rounded-full bg-black/40 text-white"
             >
               <Play size={64} fill="white" />
             </motion.div>
           )}
        </div>

        {/* Bottom Controls Bar (Change 2b, 2c) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-auto">
          
          {/* Progress Bar (Change 2c) */}
          <div 
            className="w-full h-1.5 bg-zinc-600 relative cursor-pointer group mb-6 transition-all hover:h-2"
            onClick={handleScrub}
          >
            <div 
              className="h-full bg-red-600 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          {/* Controls row (Change 2b) */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6 sm:gap-8">
              <button onClick={togglePlay} className="hover:scale-110 transition cursor-pointer">
                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
              </button>
              
              <button onClick={() => skip(-10)} className="relative hover:scale-110 transition cursor-pointer">
                <RotateCcw size={28} />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold mt-0.5">10</span>
              </button>
              
              <button onClick={() => skip(10)} className="relative hover:scale-110 transition cursor-pointer">
                <RotateCw size={28} />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold mt-0.5">10</span>
              </button>

              <div className="flex items-center gap-2 group/volume">
                <button onClick={toggleMute} className="hover:scale-110 transition cursor-pointer">
                  {isMuted || volume === 0 ? <VolumeX size={28} /> : <Volume2 size={28} />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-0 group-hover/volume:w-20 transition-all duration-300 opacity-0 group-hover/volume:opacity-100 cursor-pointer accent-red-600"
                />
              </div>
            </div>

            <div className="hidden md:block text-lg font-medium opacity-90 tracking-wide">
               🎂 Samya's Birthday Reel — Happy Birthday
            </div>

            <div className="flex items-center gap-6 sm:gap-8">
              <button className="opacity-60 hover:opacity-100 transition cursor-pointer"><LayoutGrid size={24} /></button>
              <button className="opacity-60 hover:opacity-100 transition cursor-pointer"><MessageSquare size={24} /></button>
              <button className="opacity-60 hover:opacity-100 transition cursor-pointer"><Gauge size={24} /></button>
              <button onClick={toggleFullscreen} className="hover:scale-110 transition cursor-pointer"><Maximize size={28} /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
