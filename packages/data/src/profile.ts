import type { Profile } from './types';

export const profile: Profile = {
  name: 'Aurora Ferretti',
  firstName: 'Aurora',
  lastName: 'Ferretti',
  title: ['Art Director', 'Visual Designer', 'Illustrator'],
  location: 'Roma, Italia',
  email: 'aurora@auroraferretti.com',
  website: 'auroraferretti.com',
  avatar:
    'https://media.licdn.com/dms/image/v2/C4D22AQGe8G2cRYSR-g/feedshare-shrink_800/feedshare-shrink_800/0/1662544816666?e=2147483647&v=beta&t=uwdQUVAR8p-tS3TPiAa7Ej_G95pMGm-E-BSv1XgFsUY',
  portraitCutout: '/images/portrait.png',
  links: [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/auroraferretti',
      label: 'LinkedIn',
    },
    {
      platform: 'behance',
      url: 'https://behance.net/auroraferretti',
      label: 'Behance',
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/auroraferretti',
      label: 'Instagram',
    },
    {
      platform: 'dribbble',
      url: 'https://dribbble.com/auroraferretti',
      label: 'Dribbble',
    },
  ],
};
