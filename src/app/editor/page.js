'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import AutoMdxInputForm from '@/src/components/Input/AutoMdxInputForm'

const EditorComp = dynamic(() => import('./EditorComponent'), { ssr: false })

const markdown = `
`

export default function Home () {
  const handleMdxSubmit = mdxData => {
    // Handle the submitted MDX data, e.g., send it to an API or process it.
    console.log('Submitted MDX Data:', mdxData)
  }

  return (
    <div className='mx-auto max-w-screen-2xl '>
      {/* <AutoMdxInputForm /> */}
      <Suspense fallback={null}>
        <EditorComp markdown={markdown} />
      </Suspense>
    </div>
  )
}
