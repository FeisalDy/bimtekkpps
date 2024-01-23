'use client'
import React, { useState } from 'react'

const PptxUploader = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState('')
  const [download, setDownload] = useState('')

  const handleUpload = async () => {
    console.log('Type state:', type)
    try {
      const response = await fetch('/api/pptx/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          url: url,
          download: download,
          type: type
        })
      })

      if (response.status === 200) {
        console.log('Pptx uploaded successfully')
      } else {
        console.error('Failed to upload Pptx:', await response.text())
      }
    } catch (error) {
      console.error('Error uploading Pptx:', error.message)
    }
  }

  return (
    <section className='w-full px-5 mt-2 sm:px-10 md:px-24 sxl:px-32'>
      <div class='relative z-0 w-full mb-5 group'>
        <input
          type='text'
          name='title'
          id='title'
          class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer'
          placeholder=''
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label
          for='title'
          class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
        >
          Title
        </label>
      </div>
      <div class='relative z-0 w-full mb-5 group'>
        <input
          type='text'
          name='url'
          id='url'
          class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer'
          placeholder=' '
          required
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <label
          for='url'
          class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
        >
          URL
        </label>
      </div>
      <div class='relative z-0 w-full mb-5 group'>
        <input
          type='text'
          name='download'
          id='download'
          class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer'
          placeholder=' '
          required
          value={download}
          onChange={e => setDownload(e.target.value)}
        />
        <label
          for='download'
          class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
        >
          Link Download
        </label>
      </div>
      <div class='relative z-0 w-full mb-5 group'>
        <input
          type='text'
          name='type'
          id='type'
          class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer'
          placeholder=' '
          required
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <label
          for='type'
          class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
        >
          Type
        </label>
      </div>
      <button
        type='button'
        className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
        onClick={handleUpload}
      >
        Submit
      </button>
    </section>
  )
}

export default PptxUploader
