'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { initFlowbite } from 'flowbite'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import profileImg from '@/public/PPK.png'
import { LuNewspaper } from 'react-icons/lu'
import { RiPresentationLine } from 'react-icons/ri'

export default function DashboardSidebarLayout ({ children }) {
  const [activeLink, setActiveLink] = useState('')
  const { data: session, status } = useSession()

  const pathname = usePathname()
  useEffect(() => {
    setActiveLink(pathname)
    initFlowbite()
  }, [pathname])

  return (
    <div>
      <nav className='fixed top-0 z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 '>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button
                data-drawer-target='logo-sidebar'
                data-drawer-toggle='logo-sidebar'
                aria-controls='logo-sidebar'
                type='button'
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  ></path>
                </svg>
              </button>
              <Link
                href='/'
                className='flex items-center text-dark dark:text-light'
              >
                <div className='w-12 mr-2 overflow-hidden md:w-12 md:mr-4'>
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
            </div>
            <div className='flex items-center'>
              <div className='flex items-center ml-3'>
                <div>
                  <button
                    type='button'
                    className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                    aria-expanded='false'
                    data-dropdown-toggle='dropdown-user'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      className='w-8 h-8 rounded-full'
                      src={session?.user?.image}
                      sizes={32}
                      width={32}
                      height={32}
                      alt='user photo'
                    />
                  </button>
                </div>
                <div
                  className='z-30 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
                  id='dropdown-user'
                >
                  <div className='px-4 py-3' role='none'>
                    <p
                      className='text-sm text-gray-900 dark:text-white'
                      role='none'
                    >
                      {session?.user?.name}
                    </p>
                    <p
                      className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'
                      role='none'
                    >
                      {session?.user?.email}
                    </p>
                  </div>
                  <ul className='py-1' role='none'>
                    <li>
                      <button
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        role='menuitem'
                        onClick={signOut}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id='logo-sidebar'
        className='fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li
              className={`py-1 ${
                activeLink === '/admin/dashboard/posts'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <Link
                href='/admin/dashboard/posts'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700'
              >
                <span
                  className={`py-1 flex items-center ml-4 gap-2 ${
                    activeLink === '/admin/dashboard/posts' ? 'text-white ' : ''
                  }`}
                >
                  <LuNewspaper />
                  Posts
                </span>
              </Link>
            </li>
            <li
              className={`py-1 ${
                activeLink === '/admin/dashboard/materi'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <Link
                href='/admin/dashboard/materi'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700'
              >
                <span
                  className={`py-1 flex items-center ml-4 gap-2 ${
                    activeLink === '/admin/dashboard/materi' ? 'text-white' : ''
                  }`}
                >
                  <RiPresentationLine />
                  Materi
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className='p-2 sm:ml-64 mt-14'>{children}</div>
    </div>
  )
}
