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
    console.log('Submitted MDX Data:', mdxData)
  }

  return (
    <div className='px-4 mx-auto md:px-12 '>
      <Suspense fallback={null}>
        <EditorComp markdown={markdown} />
      </Suspense>
    </div>
  )
}
