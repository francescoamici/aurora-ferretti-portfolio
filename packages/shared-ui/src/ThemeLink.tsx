import { Link, type LinkProps } from 'react-router-dom';
import { useThemeBasePath } from './ThemePathContext';

export function ThemeLink({ to, ...props }: LinkProps) {
  const basePath = useThemeBasePath();

  const resolvedTo =
    typeof to === 'string' && to.startsWith('/')
      ? `${basePath}${to}`
      : to;

  return <Link to={resolvedTo} {...props} />;
}
