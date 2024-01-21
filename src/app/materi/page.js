'use client'
import React, { useState, useEffect } from 'react'
import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link'
import Axios from '@/src/utils/axios'

// async function getPptx () {
//   const res = await Axios.get('/pptx')

//   return res.data
// }

export default function Materi () {
  //   const pptx = await getPptx()

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
      <div className='grid grid-cols-2'>
        <div>
          <h2 className='mb-1 text-2xl font-bold'> Materi </h2>
          {blogs.map((blog, index) => {
            const blogIdWithoutIndex = blog._id.replace('/index.mdx', '')

            return (
              <div key={index}>
                <Link href={`/blogs/${blogIdWithoutIndex}`}>
                  <p className='mb-1 text-xl font-medium hover:underline'>
                    {index + 1}. {blog.title}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
        <div>
          <h2 className='mb-1 text-2xl font-bold'> PPTX </h2>
          {pptx.map((ppt, index) => {
            return (
              <div key={index}>
                <Link href={`/pptx/${ppt.title}`}>
                  <p className='mb-1 text-xl font-medium hover:underline'>
                    {index + 1}. {ppt.title}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
