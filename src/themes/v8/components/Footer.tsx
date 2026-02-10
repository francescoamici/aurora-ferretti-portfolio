import { motion } from 'framer-motion';

const stripeColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];

export default function Footer() {
  return (
    <footer className="relative bg-white pt-8 pb-12 overflow-hidden">
      {/* Colorful stripe bar */}
      <div className="flex h-3">
        {stripeColors.map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Geometric decorations */}
      <motion.div
        className="absolute top-16 left-[10%] w-6 h-6 rounded-full bg-pink opacity-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-[15%] w-5 h-5 bg-yellow opacity-30 rotate-45"
        animate={{ rotate: [45, 90, 45] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div
        className="absolute bottom-8 left-[25%] opacity-20"
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '17px solid #4361EE',
        }}
      />
      <div className="absolute bottom-10 right-[20%] w-4 h-4 rounded-full bg-mint opacity-30" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Made with JOY */}
          <motion.p
            className="font-fun text-lg md:text-xl text-dark/70"
            whileHover={{ scale: 1.05 }}
          >
            Made with{' '}
            <motion.span
              className="inline-block text-coral"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              JOY
            </motion.span>{' '}
            in Roma!
          </motion.p>

          {/* Fun colored dots separator */}
          <div className="flex items-center gap-1.5">
            {stripeColors.map((c, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* Copyright */}
          <p className="font-body text-sm text-dark/50">
            &copy; {new Date().getFullYear()} Aurora Ferretti
          </p>
        </div>

        {/* Squiggly line */}
        <div className="mt-6">
          <svg width="100%" height="8" viewBox="0 0 400 8" preserveAspectRatio="none">
            <path
              d="M0 4 Q10 0 20 4 Q30 8 40 4 Q50 0 60 4 Q70 8 80 4 Q90 0 100 4 Q110 8 120 4 Q130 0 140 4 Q150 8 160 4 Q170 0 180 4 Q190 8 200 4 Q210 0 220 4 Q230 8 240 4 Q250 0 260 4 Q270 8 280 4 Q290 0 300 4 Q310 8 320 4 Q330 0 340 4 Q350 8 360 4 Q370 0 380 4 Q390 8 400 4"
              stroke="#FFB4C8"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="flex h-2 mt-8">
        {[...stripeColors].reverse().map((color, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
    </footer>
  );
}
