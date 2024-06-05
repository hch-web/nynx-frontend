import gallery1 from '../../../../assets/Gallery-image-1.png';
import gallery2 from '../../../../assets/Gallery-image-2.png';
import gallery3 from '../../../../assets/Gallery-image-3.png';

export const revisionsOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: 'Unlimited', value: 'unlimited' },
];

export const galleryTabData = [
  { image: gallery1, id: Math.random().toString() },
  { image: gallery2, id: Math.random().toString() },
  { image: gallery3, id: Math.random().toString() },
];
