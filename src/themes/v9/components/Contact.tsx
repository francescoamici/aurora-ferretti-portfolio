import { motion } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <div className="grid grid-cols-12 gap-[24px]">
          {/* Left label — 4 cols */}
          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-[12px]"
            >
              <span className="red-square" />
              <span className="section-label">{t('sections.contact')}</span>
            </motion.div>
          </div>

          {/* Right content — 8 cols */}
          <div className="col-span-12 md:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-[32px]"
            >
              {/* Email */}
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-sans text-[16px] text-black no-underline hover:text-red transition-colors duration-200"
                >
                  {profile.email}
                </a>
              </div>

              {/* Social links as simple list */}
              <div className="space-y-[16px]">
                {profile.links.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[12px] group no-underline"
                  >
                    <span className="red-square-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="font-mono text-[12px] text-gray group-hover:text-black transition-colors duration-200 uppercase tracking-[1px]">
                      {link.label}
                    </span>
                    <span className="font-mono text-[11px] text-light-gray group-hover:text-gray transition-colors duration-200">
                      {link.url.replace('https://', '')}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
