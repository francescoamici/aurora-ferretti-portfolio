import { createContext, useContext } from 'react';

export const ThemePathContext = createContext<string>('');

export function useThemeBasePath() {
  return useContext(ThemePathContext);
}
