import { useTranslation } from '@auror/i18n';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gold-dim bg-nero px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <p className="text-xs tracking-wider text-ivory/30">
          &copy; {new Date().getFullYear()} Aurora Ferretti.{' '}
          {t('footer.rights')}.
        </p>
        <p className="text-xs tracking-wider text-ivory/20">
          {t('footer.madeWith')}{' '}
          <span className="text-burgundy">&hearts;</span>{' '}
          {t('footer.inRome')}
        </p>
      </div>
    </footer>
  );
}
