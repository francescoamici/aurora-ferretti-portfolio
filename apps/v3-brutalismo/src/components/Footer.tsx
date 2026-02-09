import { profile } from '@auror/data';

export default function Footer() {
  return (
    <footer className="bg-harsh-black border-t-[4px] border-blue">
      <div className="px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* ANTI-CORPORATE COPYRIGHT */}
          <div className="font-mono text-raw-white">
            <div className="text-sm md:text-base font-bold">
              NO &copy; &mdash; ROMA 2025
            </div>
            <div className="text-xs opacity-50 mt-1 uppercase tracking-[0.2em]">
              {profile.name}
            </div>
          </div>

          {/* RAW LINKS */}
          <div className="flex flex-wrap gap-4">
            {profile.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-raw-white uppercase tracking-[0.15em] underline underline-offset-4 decoration-blue decoration-2 hover:text-yellow transition-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* BRUTAL DIVIDER */}
        <div className="h-[2px] bg-blue my-6" />

        {/* TAGLINE */}
        <div className="font-mono text-xs text-raw-white opacity-30 uppercase tracking-[0.3em]">
          DESIGN IS NOT A DECORATION &mdash; IT IS A WEAPON
        </div>
      </div>
    </footer>
  );
}
