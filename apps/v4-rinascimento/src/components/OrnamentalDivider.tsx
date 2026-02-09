import { motion } from 'framer-motion';

interface OrnamentalDividerProps {
  className?: string;
  symbol?: string;
}

export default function OrnamentalDivider({ className = '', symbol = '\u25C6' }: OrnamentalDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`flex items-center justify-center gap-4 max-w-5xl mx-auto px-6 ${className}`}
    >
      <span className="flex-1 h-px bg-brown/15" />
      <span className="text-brown/25 text-[0.6rem]">{symbol}</span>
      <span className="flex-1 h-px bg-brown/15" />
    </motion.div>
  );
}
