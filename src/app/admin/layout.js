'use client'
import { initFlowbite } from 'flowbite'
import { useEffect } from 'react'
import Script from 'next/script'

export default function AdminLayout ({ children }) {
  useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <>
      {children}
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js'></Script>
    </>
  )
}
