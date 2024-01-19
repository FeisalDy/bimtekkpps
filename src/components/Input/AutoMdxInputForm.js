'use client'
import React, { useState } from 'react'
import { getFormattedDate } from '@/src/utils/getDate'

const AutoMdxInputForm = mdxData => {
  const [file, setFile] = useState()
  const [state, setState] = useState({
    title: '',
    publishedAt: getFormattedDate(),
    updatedAt: getFormattedDate(),
    description: '',
    image: '',
    author: 'Anonymous',
    tags: ''
  })

  const onSubmit = async e => {
    e.preventDefault()
    if (!file) return console.error('No file selected')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const json = await response.json()

      setState(prev => ({
        ...prev,
        image: json.imagePath
      }))

      return json.imagePath
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='base-input'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Title
          </label>
          <input
            type='text'
            id='base-input'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={e =>
              setState(prev => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className='mb-4'>
          <input
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            aria-describedby='user_avatar_help'
            onChange={e => setFile(e.target.files?.[0])}
            type='file'
            name='file'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Desciption
          </label>
          <textarea
            id='description'
            rows='4'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Leave a comment...'
            onChange={e =>
              setState(prev => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='tags'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Tag
          </label>
          <input
            type='text'
            id='tags'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={e =>
              setState(prev => ({ ...prev, tags: e.target.value }))
            }
          />
        </div>

        <input type='submit' value='Submit' />
      </form>
    </>
  )
}

export default AutoMdxInputForm
