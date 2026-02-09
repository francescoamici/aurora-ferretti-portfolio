import { profile } from '@auror/data';

export default function Footer() {
  return (
    <footer className="border-t border-black">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <div className="flex items-center justify-between h-[48px]">
          <span className="font-sans text-[12px] text-black">
            &copy; 2025 {profile.name}
          </span>
          <span className="font-sans text-[12px] text-gray">
            Roma, Italia
          </span>
        </div>
      </div>
    </footer>
  );
}
