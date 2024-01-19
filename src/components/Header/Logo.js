import Image from 'next/image'
import Link from 'next/link'
import profileImg from '@/public/PPK.png'

const Logo = () => {
  return (
    <Link href='/' className='flex items-center text-dark dark:text-light'>
      <div className='w-12 mr-2 overflow-hidden md:w-16 md:mr-4'>
        <Image
          src={profileImg}
          alt='CodeBucks logo'
          className='w-full h-auto'
          sizes='20vw'
          priority
        />
      </div>
      <span className='text-lg font-bold dark:font-semibold md:text-xl'>
        PPK SEYEGAN
      </span>
    </Link>
  )
}

export default Logo
