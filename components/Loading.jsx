// components/ui/LoadingSpinner.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900/95 via-blue-900/50 to-emerald-900/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl max-w-sm"
      >
        {/* Animated Spinner */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full relative"
        >
          <motion.div
            className="absolute inset-0 w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full -mt-1 -mr-1"
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Pulsing Dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent mb-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading 
          </motion.h2>
          <p className="text-slate-300 text-sm">Please wait while we prepare your spiritual journey...</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-1 bg-white/20 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.8 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
