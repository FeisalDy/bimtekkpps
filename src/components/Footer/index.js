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
    <footer className='flex flex-col items-center m-2 mt-16 rounded-2xl bg-dark dark:bg-accentDark/90 sm:m-10 text-light dark:text-dark'>
      <h3 className='px-4 mt-16 text-2xl font-medium text-center capitalize dark:font-bold sm:text-3xl lg:text-4xl'>
        Interesting Stories | Updates | Guides
      </h3>
      <p className='w-full px-4 mt-5 text-sm font-light text-center sm:w-3/5 dark:font-medium sm:text-base'>
        Subscribe to learn about new technology and updates. Join over 5000+
        members community to stay up to date with latest news.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04'
      >
        <input
          type='email'
          placeholder='Enter your email'
          {...register('email', { required: true, maxLength: 80 })}
          className='w-full pb-1 pl-2 mr-2 bg-transparent border-0 border-b sm:pl-0 text-dark focus:border-dark focus:ring-0'
        />

        <input
          type='submit'
          className='px-3 py-1 font-medium rounded cursor-pointer bg-dark text-light dark:text-dark dark:bg-light sm:px-5'
        />
      </form>
      <div className='flex items-center mt-8'>
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

      <div className='relative flex flex-col items-center justify-between w-full px-8 py-6 mt-16 font-medium border-t border-solid md:mt-24 border-light md:flex-row'>
        {/* <span className='text-center'>&copy;2023</span>
        <Link
          href='/sitemap.xml'
          className='my-4 text-center underline md:my-0'
        >
          sitemap.xml
        </Link>
        <div className='text-center'>
          Made with &hearts; by{' '}
          <a
            href='https://devdreaming.com'
            className='underline'
            target='_blank'
          >
            CodeBucks
          </a>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
