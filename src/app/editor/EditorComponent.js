'use client'
import '../../../node_modules/@mdxeditor/editor/dist/style.css'
import React, { useRef, useState } from 'react'
import { getFormattedDate } from '@/src/utils/getDate'
import { convertStateToMDX } from '@/src/utils/mdx'

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
  const [mdx, setMdx] = useState('')
  const [file, setFile] = useState()
  const [state, setState] = useState({
    title: '',
    publishedAt: getFormattedDate(),
    updatedAt: getFormattedDate(),
    description: '',
    image: '',
    author: 'Anonymous',
    tags: '',
    content: ''
  })

  const handleImageUpload = async selectedFile => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const json = await response.json()

      setState(prev => ({
        ...prev,
        image: `../../public${json.imagePath}`
      }))

      console.log('Image uploaded:', json.imagePath)
    } catch (error) {
      console.error('Image upload failed:', error)
    }
  }

  const saveToFolder = async (folderName, mdxContent) => {
    try {
      const formData = new FormData()
      formData.append('folderName', folderName)
      formData.append('mdxContent', mdxContent)

      const response = await fetch('/api/saveMdx', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        console.log('MDX content saved successfully.')
      } else {
        console.error('Error saving MDX content:', result.error)
      }
    } catch (error) {
      console.error('Error saving MDX content:', error)
    }
  }

  return (
    <>
      <div>
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            onClick={() => {
              setMdx(convertStateToMDX(state))
              saveToFolder(state.title, convertStateToMDX(state))
            }}
          >
            Publish
          </button>
        </div>
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
            //   onChange={e => setFile(e.target.files?.[0])}
            onChange={e => {
              setFile(e.target.files?.[0])
              handleImageUpload(e.target.files?.[0]) // Upload image as soon as it's selected
            }}
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
      </div>

      <div className='border rounded-md min-h-[70vh] border-dark dark:border-white'>
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
            setState(prev => ({ ...prev, content: ref.current?.getMarkdown() }))
          }
        />
      </div>
    </>
  )
}

export default Editor
