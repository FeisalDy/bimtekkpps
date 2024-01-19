'use client'
import '../../../node_modules/@mdxeditor/editor/dist/style.css'
import React, { useRef, useState } from 'react'
import { getFormattedDate } from '@/src/utils/getDate'

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  InsertImage,
  imagePlugin,
  InsertThematicBreak,
  ListsToggle,
  Separator
} from '@mdxeditor/editor'

async function imageUploadHandler (image) {
  const formData = new FormData()
  formData.append('file', image)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })

  const json = await response.json()
  return json.imagePath
}

const Editor = ({ markdown, editorRef }) => {
  const ref = useRef(null)
  const [file, setFile] = useState()
  const [state, setState] = useState({
    title: '',
    publishedAt: getFormattedDate(),
    updatedAt: getFormattedDate(),
    description: '',
    image: '',
    author: 'Anonymous',
    tags: '',
    mdx: ''
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
      <div>
        {state.mdx}
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
      </div>
      {/* <button onClick={() => ref.current?.setMarkdown('new markdown')}>
        Set new markdown
      </button> */}
      <div className='border rounded-md min-h-[70vh] border-dark '>
        <MDXEditor
          className='min-w-full col-span-12 prose font-in sm:prose-base md:prose-lg max-w-max prose-blockquote:bg-accent/20 prose-blockquote:p-2 prose-blockquote:px-6 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-li:marker:text-accent dark:prose-invert dark:prose-blockquote:border-accentDark dark:prose-blockquote:bg-accentDark/20 dark:prose-li:marker:text-accentDark'
          ref={ref}
          markdown={markdown}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            imagePlugin({ imageUploadHandler }),
            thematicBreakPlugin(),
            listsPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <BlockTypeSelect />
                  <InsertImage />
                  <InsertThematicBreak />
                  <ListsToggle />
                </>
              )
            })
          ]}
          onChange={() =>
            setState(prev => ({ ...prev, mdx: ref.current?.getMarkdown() }))
          }
        />
      </div>
    </>
  )
}

export default Editor
