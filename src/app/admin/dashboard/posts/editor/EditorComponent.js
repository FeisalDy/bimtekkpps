'use client'
import '../../../../../../node_modules/@mdxeditor/editor/dist/style.css'
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

const Editor = ({ markdown, editorRef, state, setState }) => {
  const ref = useRef(null)
  const [mdx, setMdx] = useState('')
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  //   const [state, setState] = useState({
  //     title: '',
  //     publishedAt: getFormattedDate(),
  //     updatedAt: getFormattedDate(),
  //     description: '',
  //     image: '',
  //     author: 'Anonymous',
  //     tags: '',
  //     content: ''
  //   })

  const handleImageUpload = async selectedFile => {
    try {
      setLoading(true)

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
    } finally {
      setLoading(false)
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
      <div className='p-6'>
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
              setState(prev => ({
                ...prev,
                content: ref.current?.getMarkdown()
              }))
            }
          />
        </div>
      </div>

      <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
        {!loading ? (
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={() => {
              setMdx(convertStateToMDX(state))
              saveToFolder(state.title, convertStateToMDX(state))
            }}
          >
            Save
          </button>
        ) : (
          <button
            disabled
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
          >
            <svg
              aria-hidden='true'
              role='status'
              className='inline w-4 h-4 mr-3 text-white animate-spin'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='#E5E7EB'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentColor'
              />
            </svg>
            Saving...
          </button>
        )}
      </div>
    </>
  )
}

export default Editor
