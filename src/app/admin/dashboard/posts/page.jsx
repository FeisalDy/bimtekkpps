'use client'
import React, { useState } from 'react'
import { allBlogs } from 'contentlayer/generated'
import { LoadingTable } from './components/LoadingTable'
import { ItemsModal } from './components/ItemsModal'
import { ItemsTableContainer } from './components/ItemsTableContainer'
import { getFormattedDate } from '@/src/utils/getDate'

export default function Page () {
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
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
  const products = allBlogs

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
  return (
    <section className='p-2'>
      <div
        className={`mx-auto max-w-screen-xl px-2 lg:px-12 ${
          showModal ? 'blur-lg' : ''
        }`}
      >
        {products ? (
          <ItemsTableContainer products={products} onOpen={handleOpenModal} />
        ) : (
          <LoadingTable />
        )}
      </div>
      <ItemsModal
        showModal={showModal}
        onClose={handleCloseModal}
        state={state}
        setState={setState}
      />
    </section>
  )
}
