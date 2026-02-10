import { ThemePathContext } from '@auror/shared-ui';

interface ThemeShellProps {
  theme: string;
  basePath: string;
  children: React.ReactNode;
}

export function ThemeShell({ theme, basePath, children }: ThemeShellProps) {
  return (
    <ThemePathContext.Provider value={basePath}>
      <div data-theme={theme} className="min-h-screen">
        {children}
      </div>
    </ThemePathContext.Provider>
  );
}
