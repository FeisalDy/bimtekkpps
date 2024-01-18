import React from 'react'

const AutoMdxInputForm = () => {
  return (
    <div>
      <form className='mx-auto'>
        <div className='mb-5'>
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
          />
        </div>
        <label
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          htmlFor='user_avatar'
        >
          Upload file
        </label>
        <input
          className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
          aria-describedby='user_avatar_help'
          id='user_avatar'
          type='file'
        />
        <label
          htmlFor='message'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Description
        </label>
        <textarea
          id='message'
          rows='4'
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Leave a comment...'
        ></textarea>
      </form>
    </div>
  )
}

export default AutoMdxInputForm
