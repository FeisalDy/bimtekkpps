'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Axios from '@/src/utils/axios'

export default function Materi () {
  const aturan = [
    {
      title: 'UU No.7 Tahun 2017',
      download:
        'https://www.mkri.id/public/content/pemilu/UU/UU%20No.7%20Tahun%202017.pdf'
    },
    {
      title: 'PKPU 3 Tahun 2022',
      download: 'https://jdih.kpu.go.id/data/data_pkpu/2022pkpu003.pdf'
    },
    {
      title: 'PKPU Nomor 25 Tahun 2023',
      download: 'https://jdih.kpu.go.id/data/data_pkpu/2023pkpu025.pdf'
    },
    {
      title: 'Keputusan Komisi Pemilihan Umum No 66 Tahun 2024',
      download:
        'https://drive.usercontent.google.com/u/0/uc?id=1fcudTLJTPMeoYJn7KhyzHPcemAMtvRvC&export=download'
    }
  ]

  return (
    <section className='w-full px-5 mt-2 sm:px-10 md:px-24 sxl:px-32'>
      <div>
        <h2 className='mb-1 text-2xl font-bold dark:text-light'>
          Download Aturan
        </h2>
        {aturan.map((aturan, index) => (
          <div key={index}>
            <Link href={`${aturan.download}`}>
              <p className='mb-1 font-medium md:text-xl dark:text-light hover:underline'>
                {index + 1}. {aturan.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
