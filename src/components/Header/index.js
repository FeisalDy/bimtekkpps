'use client'
import Link from 'next/link'
import Logo from './Logo'
import {
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
  TwitterIcon,
  InstagramIcon
} from '../Icons'
import siteMetadata from '@/src/utils/siteMetaData'
import { useThemeSwitch } from '../Hooks/useThemeSwitch'
import { useState } from 'react'
import { cx } from '@/src/utils'

const Header = () => {
  const [mode, setMode] = useThemeSwitch()
  const [click, setClick] = useState(false)

  const toggle = () => {
    setClick(!click)
  }
  return (
    <header className='flex items-center justify-between w-full p-4 px-5 sm:px-10'>
      <Logo />

      <button
        className='z-50 inline-block sm:hidden'
        onClick={toggle}
        aria-label='Hamburger Menu'
      >
        <div className='w-6 transition-all duration-300 cursor-pointer ease'>
          <div className='relative'>
            <span
              className='absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200'
              style={{
                transform: click
                  ? 'rotate(-45deg) translateY(0)'
                  : 'rotate(0deg) translateY(6px)'
              }}
            >
              &nbsp;
            </span>
            <span
              className='absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200'
              style={{
                opacity: click ? 0 : 1
              }}
            >
              &nbsp;
            </span>
            <span
              className='absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200'
              style={{
                transform: click
                  ? 'rotate(45deg) translateY(0)'
                  : 'rotate(0deg) translateY(-6px)'
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      <nav
        className='fixed z-50 flex items-center px-6 py-3 font-medium capitalize transition-all duration-300 translate-x-1/2 border border-solid rounded-full w-max sm:px-8 border-dark sm:hidden top-6 right-1/2 bg-light/80 backdrop-blur-sm ease'
        style={{
          top: click ? '1rem' : '-5rem'
        }}
      >
        <Link href='/' className='mr-2'>
          Home
        </Link>
        <Link href='/materi' className='mx-2'>
          Materi
        </Link>
        <Link href='/contact' className='mx-2'>
          Contact
        </Link>
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={cx(
            'w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1',
            mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
          )}
          aria-label='theme-switcher'
        >
          {mode === 'light' ? (
            <MoonIcon className={'fill-dark'} />
          ) : (
            <SunIcon className={'fill-dark'} />
          )}
        </button>
      </nav>

      <nav className='items-center hidden px-8 py-3 font-medium capitalize border border-solid rounded-full w-max border-dark sm:flex top-6 bg-light/80 backdrop-blur-sm'>
        <Link href='/' className='mr-2'>
          Home
        </Link>
        <Link href='/materi' className='mx-2'>
          Materi
        </Link>
        <Link href='/contact' className='mx-2'>
          Contact
        </Link>
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={cx(
            'w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1',
            mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
          )}
          aria-label='theme-switcher'
        >
          {mode === 'light' ? (
            <MoonIcon className={'fill-dark'} />
          ) : (
            <SunIcon className={'fill-dark'} />
          )}
        </button>
      </nav>
      <div className='items-center hidden sm:flex'>
        <a
          href={siteMetadata.instagram}
          className='inline-block w-6 h-6 mr-4'
          aria-label='Reach out to me via instagram'
          target='_blank'
        >
          <InstagramIcon className='transition-all duration-200 hover:scale-125 ease' />
        </a>
        <a
          href={siteMetadata.twitter}
          className='inline-block w-6 h-6 mr-4'
          aria-label='Reach out to me via Twitter'
          target='_blank'
        >
          <TwitterIcon className='transition-all duration-200 hover:scale-125 ease' />
        </a>
        <a
          href={siteMetadata.github}
          className='inline-block w-6 h-6 mr-4'
          aria-label='Check my profile on Github'
          target='_blank'
        >
          <GithubIcon className='transition-all duration-200 hover:scale-125 ease dark:fill-light' />
        </a>
        <a
          href={siteMetadata.dribbble}
          className='inline-block w-6 h-6 mr-4'
          aria-label='Check my profile on Dribbble'
          target='_blank'
        >
          <DribbbleIcon className='transition-all duration-200 hover:scale-125 ease' />
        </a>
      </div>
    </header>
  )
}

export default Header
