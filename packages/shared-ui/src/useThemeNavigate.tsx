import { useNavigate, type NavigateOptions, type To } from 'react-router-dom';
import { useThemeBasePath } from './ThemePathContext';

export function useThemeNavigate() {
  const navigate = useNavigate();
  const basePath = useThemeBasePath();

  return (to: To | number, options?: NavigateOptions) => {
    if (typeof to === 'number') {
      navigate(to);
    } else if (typeof to === 'string' && to.startsWith('/')) {
      navigate(`${basePath}${to}`, options);
    } else {
      navigate(to, options);
    }
  };
}
