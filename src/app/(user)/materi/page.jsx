'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMateri } from '@/src/hooks/useMateri'

export default function Materi () {
  const { materi, materiLoading, isError } = useMateri()

  const [pptx, setPptx] = useState([])
  const [pdf, setPdf] = useState([])

  useEffect(() => {
    if (materi && materi.data) {
      const pdfItems = materi.data.filter(
        item => item.type === 'pdf' || item.type === 'application/pdf'
      )

      const pptxItems = materi.data.filter(
        item =>
          item.type === 'pptx' ||
          item.type ===
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      )

      pptxItems.sort((a, b) => a.title.localeCompare(b.title))
      pdfItems.sort((a, b) => a.title.localeCompare(b.title))

      setPptx(pptxItems)
      setPdf(pdfItems)
    }
  }, [materi])

  return (
    <section className='w-full px-5 mt-2 sm:px-10 md:px-24 sxl:px-32'>
      <div className='gap-4 md:grid-cols-2 md:grid'>
        <div>
          <h2 className='mb-1 text-2xl font-bold dark:text-light'>Modul</h2>
          {pdf.map((ppt, index) => (
            <div key={index}>
              <Link href={`/materi/${ppt.title}`}>
                <p className='mb-1 font-medium md:text-xl dark:text-light hover:underline'>
                  {index + 1}. {ppt.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <h2 className='mb-1 text-2xl font-bold dark:text-light'>Materi</h2>
          {pptx.map((ppt, index) => (
            <div key={index}>
              <Link href={`/materi/${ppt.title}`}>
                <p className='mb-1 font-medium md:text-xl dark:text-light hover:underline'>
                  {index + 1}. {ppt.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
