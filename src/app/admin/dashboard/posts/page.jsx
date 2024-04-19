'use client'
import React, { useState, useEffect } from 'react'
import { allBlogs } from 'contentlayer/generated'
import { LoadingTable } from './components/LoadingTable'
import { ItemsModal } from './components/ItemsModal'
import { ItemsTableContainer } from './components/ItemsTableContainer'
import { getFormattedDate } from '@/src/utils/getDate'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer } from 'react-toastify'

// export const revalidate = 5

// async function getBlogs () {
//   //   const res = await fetch(`https://...`, { cache: 'no-store' })
//   const projects = allBlogs

//   return projects
// }

export default function Page () {
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(0)
  const [state, setState] = useState({
    oldTitle: '',
    type: '',
    title: '',
    publishedAt: getFormattedDate(),
    updatedAt: getFormattedDate(),
    description: '',
    image: '',
    author: 'Anonymous',
    tags: '',
    content: '',
    editImage: ''
  })
  const products = allBlogs
  //   const products = getBlogs()

  const saveItemHandler = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setShowModal(false)
    }, 2000)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleStatus = status => {
    setStatus(status)
  }

  const handleEditItem = item => {
    setState({
      ...state,
      oldTitle: item.title,
      type: 'edit',
      title: item.title,
      publishedAt: getFormattedDate(),
      updatedAt: getFormattedDate(),
      description: item.description,
      image: item.image,
      author: 'Anonymous',
      tags: item.tags,
      content: item.body.raw
    })
  }

  const clearState = () => {
    setState({
      ...state,
      type: 'add',
      title: '',
      publishedAt: getFormattedDate(),
      updatedAt: getFormattedDate(),
      description: '',
      image: '',
      author: 'Anonymous',
      tags: '',
      content: '',
      editImage: ''
    })
  }

  const handleImage = image => {
    setState({ ...state, editImage: image })
  }

  useEffect(() => {
    if (status === 200) {
      toast.success('Action succeed!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    } else if (status === 500) {
      toast.error('Action failed!. Please try again later.', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    } else if (status === 501) {
      toast.error('Action failed!. Please upload image.', {
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
    setTimeout(() => {
      setStatus(0)
    }, 3000)
  }, [status])

  return (
    <section className='p-2'>
      <div
        className={`mx-auto max-w-screen-xl px-2 lg:px-12 ${
          showModal ? 'blur-lg' : ''
        }`}
      >
        {products ? (
          <ItemsTableContainer
            products={products}
            onOpen={handleOpenModal}
            state={state}
            setState={setState}
            isEdit={handleEditItem}
            clearState={clearState}
          />
        ) : (
          <LoadingTable />
        )}
      </div>
      <ItemsModal
        showModal={showModal}
        onClose={handleCloseModal}
        state={state}
        setState={setState}
        imageChanged={handleImage}
        handleStatus={handleStatus}
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
        style={{ zIndex: 50 }}
      />
    </section>
  )
}
