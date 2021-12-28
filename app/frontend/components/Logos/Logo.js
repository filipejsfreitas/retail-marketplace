import Image from 'next/image'

import LogoSvg from './logo.svg'


const Logo = () => {
    return (
        <div style={{display: "block"}}>
            <Image
              src={LogoSvg}
              alt=""
              width={450}
              height={138}
              layout="responsive"
              />
        </div>
    )
  }

  export default Logo