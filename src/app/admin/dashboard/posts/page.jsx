'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { allBlogs } from 'contentlayer/generated'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Button } from './editor/EditorComponent'

const EditorComp = dynamic(() => import('./editor/EditorComponent'), {
  ssr: false
})
const markdown = `
`

export default function Page () {
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const loadingRowsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //   const fetcher = (...args) => fetch(...args).then(res => res.json())
  //   const { data: products, error } = useSWR(
  //     'https://api.escuelajs.co/api/v1/products',
  //     fetcher
  //   )
  const products = allBlogs

  const deleteItemHandler = () => {
    toast.success('Item successfully deleted!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }
  const saveItemHandler = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setShowModal(false)
    }, 2000)
  }
  const ItemsTable = ({ items }) => {
    return (
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
              No
            </th>
            <th scope='col' className='px-6 py-3'>
              Title
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={`${item.id}`}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='w-4 p-4'>
                <div className='flex items-center'>{index + 1}</div>
              </td>
              <th
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
              >
                <div className='pl-3'>
                  <div className='text-base font-semibold'>{item.title}</div>
                </div>
              </th>
              <td className='px-6 py-4'>
                <div className='flex items-center'>
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      item.isPublished ? 'bg-green-500' : 'bg-red-500'
                    } mr-2`}
                  ></div>
                  {item.isPublished ? 'Published' : 'Unpublished'}
                </div>
              </td>
              <td className='flex items-center px-6 py-4'>
                <button
                  type='button'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  onClick={() => setShowModal(true)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                    />
                  </svg>
                </button>
                <button
                  className='ml-4 font-medium text-red-600 dark:text-red-500 hover:underline'
                  onClick={deleteItemHandler}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  const ItemsModal = () => {
    return (
      showModal && (
        <div
          className={`fixed top-0 left-0 right-0 z-40 flex  items-center justify-center mx-auto  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div
            className={`${
              showModal ? 'drop-shadow-sm' : ''
            }  relative w-full max-w-3xl mx-auto max-h-full `}
          >
            <form
              action='#'
              className='relative bg-white rounded-lg shadow dark:bg-gray-700'
            >
              <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  Add post
                </h3>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              <div className='space-y-6'>
                <Suspense fallback={null}>
                  <EditorComp markdown={markdown} />
                </Suspense>
              </div>
            </form>
          </div>
        </div>
      )
    )
  }
  const TableActions = ({ searchTerm, handleSearch }) => {
    return (
      <div className='flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4'>
        <div className='w-full md:w-1/2'>
          <form className='flex items-center'>
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <input
                type='text'
                value={searchTerm}
                onChange={handleSearch}
                id='simple-search'
                className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Search'
                required=''
              />
            </div>
          </form>
        </div>
        <div className='flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3'>
          <button
            type='button'
            className='flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
            onClick={() => setShowModal(true)}
          >
            <svg
              className='h-3.5 w-3.5 mr-2'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                clipRule='evenodd'
                fillRule='evenodd'
                d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
              />
            </svg>
            Add post
          </button>
          <div className='flex items-center w-full space-x-3 md:w-auto'></div>
        </div>
      </div>
    )
  }
  const TableFooter = ({ totalPages, handleChangePage, currentPage }) => {
    return (
      <nav
        className='flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0'
        aria-label='Table navigation'
      >
        <span className='space-x-2 text-sm font-normal text-gray-500 dark:text-gray-400'>
          Showing&nbsp;
          <span className='font-semibold text-gray-900 dark:text-white'>
            {currentPage}
          </span>
          &nbsp;of
          <span className='font-semibold text-gray-900 dark:text-white'>
            {totalPages}
          </span>
        </span>
        <ul className='inline-flex items-stretch -space-x-px'>
          <li>
            <a
              href='#'
              className='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handleChangePage(index + 1)}
                disabled={currentPage === index + 1}
                type='button'
                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                  currentPage === index + 1
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-gray-500'
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <a
              href='#'
              className='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Next</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
  const ItemsTableContainer = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const handleChangePage = page => {
      setCurrentPage(page)
    }
    let pageSize = 10
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const totalPages = Math.ceil(products.length / pageSize)
    //const  currentData = products.slice(startIndex, endIndex);

    //search filter
    const handleSearch = event => {
      setSearchTerm(event.target.value)
      setCurrentPage(1)
    }

    const filteredData = products.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const currentData = filteredData.slice(startIndex, endIndex)

    return (
      <div className='relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
        <TableActions searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className='overflow-x-auto'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <ItemsTable items={currentData} />
          </div>
        </div>
        <TableFooter
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          currentPage={currentPage}
        />
        {/* <DeleteToast /> */}
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    )
  }
  const LoadingTable = () => {
    return (
      <div className='relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
        <div className='overflow-x-auto'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='p-4'>
                    <div className='flex items-center'>
                      <input
                        id='checkbox-all-search'
                        type='checkbox'
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label htmlFor='checkbox-all-search' className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Position
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingRowsCount.map(product => (
                  <tr
                    key={`${product.id}`}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  >
                    <td className='w-4 p-4'>
                      <div className='flex items-center'>
                        <input
                          id='checkbox-table-search-1'
                          type='checkbox'
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label
                          htmlFor='checkbox-table-search-1'
                          className='sr-only'
                        >
                          <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                        </label>
                      </div>
                    </td>
                    <th
                      scope='row'
                      className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      <div className='pl-3'>
                        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                      </div>
                    </th>
                    <td className='px-6 py-4'>
                      {' '}
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  //main
  return (
    <section className='p-2'>
      <div
        className={`mx-auto max-w-screen-xl px-2 lg:px-12 ${
          showModal ? 'blur-lg' : ''
        }`}
      >
        {products ? <ItemsTableContainer /> : <LoadingTable />}
      </div>
      <ItemsModal />
    </section>
  )
}
