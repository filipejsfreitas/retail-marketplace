import Image from 'next/image'

import LogoReversedSvg from './LogoReversed.svg'

export default function LogoReversed({width,height}) {
  return (
    <Image
      src={LogoReversedSvg}
      alt=""
      width={width || 274}
      height={height || 84}
      layout="fixed"
    />
  );
}