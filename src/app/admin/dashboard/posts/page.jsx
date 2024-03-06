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
    type: '',
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

  const handleType = type => {
    setState({ ...state, type })
  }

  const handleEditItem = item => {
    setState({
      ...state,
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
      title: '',
      publishedAt: getFormattedDate(),
      updatedAt: getFormattedDate(),
      description: '',
      image: '',
      author: 'Anonymous',
      tags: '',
      content: ''
    })
  }

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
            isType={handleType}
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
      />
    </section>
  )
}
