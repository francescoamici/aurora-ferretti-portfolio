import type { Profile } from './types';

export const profile: Profile = {
  name: 'Aurora Ferretti',
  firstName: 'Aurora',
  lastName: 'Ferretti',
  title: ['Art Director', 'Visual Designer', 'Illustrator'],
  location: 'Roma, Italia',
  email: 'aurora@auroraferretti.com',
  website: 'auroraferretti.com',
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
