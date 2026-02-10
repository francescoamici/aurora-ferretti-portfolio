import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const BRANDS = ['Arkage', 'Lufthansa', 'Oreo', 'UPS', 'Quasar'];

function highlightBrands(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedBrand = '';

    for (const brand of BRANDS) {
      const idx = remaining.indexOf(brand);
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        matchedBrand = brand;
      }
    }

    if (matchedBrand && earliestIndex < remaining.length) {
      if (earliestIndex > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, earliestIndex)}</span>);
      }
      parts.push(
        <span key={key++} className="text-sienna font-semibold">
          {matchedBrand}
        </span>
      );
      remaining = remaining.slice(earliestIndex + matchedBrand.length);
    } else {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
  }

  return parts;
}

export default function About() {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation();

  const bio = t('bio');
  const bioExtended = t('bioExtended');

  return (
    <section id="about" className="py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section heading with gold line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-5 mb-16 md:mb-20"
        >
          <h2 className="font-display text-2xl md:text-3xl text-espresso tracking-wide">
            {tc('sections.about')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column - bio text (wider) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="font-accent text-espresso/85 text-lg md:text-xl leading-relaxed md:leading-[1.9]">
              {highlightBrands(bio)}
            </p>

            <p className="font-accent text-espresso/70 text-base md:text-lg leading-relaxed md:leading-[1.85]">
              {highlightBrands(bioExtended)}
            </p>

            {/* Social links row */}
            <div className="flex flex-wrap gap-4 pt-4">
              {profile.links.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-taupe hover:text-sienna transition-colors duration-400 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/50" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column - decorative area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Portrait */}
            <div className="mb-6 flex justify-center">
              <div className="w-full relative overflow-hidden rounded-2xl">
                <img
                  src={profile.portraitCutout}
                  alt={profile.name}
                  className="w-full h-auto object-cover object-top"
                  style={{ filter: 'sepia(0.15)' }}
                />
              </div>
            </div>

            <div className="glass-warm rounded-2xl p-8 shadow-warm relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(184,150,62,0.06) 0%, rgba(194,105,61,0.04) 50%, transparent 100%)',
                }}
              />

              <div className="relative z-10 space-y-6">
                {/* Location card */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sienna-light flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-sienna" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs text-taupe uppercase tracking-wider">Location</p>
                    <p className="font-display text-sm text-espresso">{profile.location}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-taupe/15" />

                {/* Titles */}
                <div className="space-y-3">
                  {profile.title.map((title, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                      <span className="font-accent italic text-sm text-espresso/70">{title}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-taupe/15" />

                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="block font-body text-sm text-sienna hover:text-burgundy transition-colors duration-400"
                >
                  {profile.email}
                </a>
              </div>

              {/* Warm decorative corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/20 rounded-tl-sm" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/20 rounded-br-sm" />
            </div>

            {/* Decorative warm pattern below card */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="w-1.5 h-1.5 rounded-full bg-gold/25"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
