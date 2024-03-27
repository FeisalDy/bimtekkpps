'use client'
import React, { useState } from 'react'
import { LoadingTable } from './components/LoadingTable'
import { ItemsTableContainer } from './components/ItemsTableContainer'
import { ItemsModal } from './components/ItemsModal'
import { useMateri } from '@/src/hooks/useMateri'
import { useSession } from 'next-auth/react'
import useSWR, { useSWRConfig } from 'swr'

export default function Page () {
  const { mutate } = useSWRConfig()
  const { data: session, status } = useSession()

  const { materi, materiLoading, isError } = useMateri()
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
            mutate={mutate}
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
        session={session}
      />
    </section>
  )
}
