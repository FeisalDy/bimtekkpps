'use client'
import React, { useState } from 'react'
import { LoadingTable } from './components/LoadingTable'
import { ItemsTableContainer } from './components/ItemsTableContainer'
import { ItemsModal } from './components/ItemsModal'
import { useMateri } from '@/src/hooks/useMateri'

export default function Page () {
  const { materi, materiLoading } = useMateri()
  const [showModal, setShowModal] = useState(false)
  const [state, setState] = useState({
    title: '',
    url: '',
    download: '',
    type: '',
    file: null,
    action: ''
  })

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleFileChange = file => {
    setState(prevState => ({ ...prevState, file }))
  }

  return (
    <section className='p-2'>
      <div>
        {state && (
          <div>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        )}
      </div>

      <div
        className={`mx-auto max-w-screen-xl px-2 lg:px-12 ${
          showModal ? 'blur-lg' : ''
        }`}
      >
        {materi && !materiLoading && (
          <ItemsTableContainer
            materi={materi}
            onOpen={handleOpenModal}
            state={state}
            setState={setState}
            // isEdit={handleEditItem}
            // clearState={clearState}
          />
        )}
        {materiLoading && <LoadingTable />}
      </div>
      <ItemsModal
        showModal={showModal}
        onClose={handleCloseModal}
        state={state}
        setState={setState}
        handleFile={handleFileChange}
      />
    </section>
  )
}
