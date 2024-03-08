'use client'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { TableActions } from './tableaction'
import { ItemsTable } from './itemstable'
import { TableFooter } from './tablefooter'

export const ItemsTableContainer = ({
  materi,
  onOpen,
  state,
  setState,
  isEdit,
  clearState
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const handleChangePage = page => {
    setCurrentPage(page)
  }
  let pageSize = 10
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const totalPages = Math.ceil(materi.length / pageSize)
  //const  currentData = materi.slice(startIndex, endIndex);

  //search filter
  const handleSearch = event => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const filteredData = materi.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const currentData = filteredData.slice(startIndex, endIndex)

  return (
    <div className='relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
      <TableActions
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onOpen={onOpen}
        state={state}
        setState={setState}
        // clearState={clearState}
      />
      <div className='overflow-x-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          {/* <ItemsTable items={currentData} onOpen={onOpen} isEdit={isEdit} /> */}
          <ItemsTable items={currentData} onOpen={onOpen} />
        </div>
      </div>
      <TableFooter
        totalPages={Math.ceil(filteredData.length / pageSize)}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
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
