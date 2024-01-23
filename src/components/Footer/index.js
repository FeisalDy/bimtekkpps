'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon
} from '../Icons'
import Link from 'next/link'
import siteMetadata from '@/src/utils/siteMetaData'

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = data => console.log(data)
  console.log(errors)

  return (
    <footer className='flex flex-col items-center m-2 mt-8 rounded-2xl bg-dark dark:bg-accentDark/90 sm:m-10 text-light dark:text-dark'>
      <div className='relative flex flex-col items-center justify-between w-full px-8 py-6 font-medium border-light md:flex-row'>
        <span className='hidden text-center md:flex'>&copy;2023</span>
        <div className='flex items-center'>
          <span className='text-center'>Follow Us &nbsp;</span>
          <a
            href={siteMetadata.instagram}
            className='inline-block w-6 h-6 mr-4'
            aria-label='Reach out to me via LinkedIn'
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
            className='inline-block w-6 h-6 mr-4 fill-light'
            aria-label='Check my profile on Github'
            target='_blank'
          >
            <GithubIcon className='transition-all duration-200 fill-light dark:fill-dark hover:scale-125 ease' />
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
      </div>
    </footer>
  )
}

export default Footer
