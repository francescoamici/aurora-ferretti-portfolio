import { profile } from '@auror/data';

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan/10 py-8 px-6">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent shadow-[0_0_8px_rgba(0,240,255,0.3)]" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-cyan/40">
          <span className="text-white/20">{'// '}</span>
          {profile.location} — {new Date().getFullYear()}
        </div>

        <div className="font-mono text-xs text-cyan/40">
          <span className="text-white/20">{'// '}</span>
          {profile.name}
        </div>

        <div className="font-mono text-[10px] text-white/15">
          v5.neon_roma
        </div>
      </div>
    </footer>
  );
}
