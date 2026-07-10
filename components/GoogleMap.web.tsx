import React from 'react';

interface Props {
  height?: number;
}

export default function GoogleMap({ height = 200 }: Props) {
  return React.createElement('iframe', {
    src: 'https://maps.google.com/maps?q=Jalan+Besar,Singapore&z=16&output=embed&hl=en',
    width: '100%',
    height,
    style: { border: 'none', display: 'block' },
    allowFullScreen: true,
    loading: 'lazy',
    referrerPolicy: 'no-referrer-when-downgrade',
  });
}
