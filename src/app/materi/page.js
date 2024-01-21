'use client'
import React, { useState, useEffect } from 'react'
import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link'
import Axios from '@/src/utils/axios'

export default function Materi () {
  const [blogs, setBlogs] = useState(allBlogs)
  const [pptx, setPptx] = useState([])

  const getPptx = async () => {
    try {
      const res = await Axios.get('/pptx')
      setPptx(res.data)
    } catch (error) {
      console.error('Error fetching pptx data:', error)
    }
  }

  useEffect(() => {
    getPptx()
  }, [])

  return (
    <section className='w-full px-5 mt-2 sm:px-10 md:px-24 sxl:px-32'>
      <div>
        <h2 className='mb-1 text-2xl font-bold dark:text-light'> PPTX </h2>
        {pptx.map((ppt, index) => (
          <div key={index}>
            <Link href={`/pptx/${ppt.title}`}>
              <p className='mb-1 font-medium md:text-xl dark:text-light hover:underline'>
                {index + 1}. {ppt.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
