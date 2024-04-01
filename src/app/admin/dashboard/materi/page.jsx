'use client'
import React, { useState, useEffect } from 'react'
import { LoadingTable } from './components/LoadingTable'
import { ItemsTableContainer } from './components/ItemsTableContainer'
import { ItemsModal } from './components/ItemsModal'
import { useMateri } from '@/src/hooks/useMateri'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function Page () {
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()
  const [status, setStatus] = useState(0)
  const [activeButton, setActiveButton] = useState('materi')
  const { materi, materiLoading, isError } = useMateri(activeButton)
  const [showModal, setShowModal] = useState(false)
  const [state, setState] = useState({
    title: '',
    oldtitle: '',
    url: '',
    download: '',
    type: '',
    file: null,
    action: '',
    loading: false
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

  const handleEditItem = item => {
    setState({
      ...state,
      type: 'edit',
      title: item.title,
      oldtitle: item.title,
      file: null
    })
  }

  const handleStatus = status => {
    setStatus(status)
  }

  const clearState = () => {
    setState({
      ...state,
      type: 'add',
      title: '',
      url: '',
      download: '',
      file: null,
      action: ''
    })
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
        <div className='flex gap-2 my-4'>
          <button
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${
              activeButton === 'materi'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200'
            }`}
            onClick={() => setActiveButton('materi')}
          >
            Materi
          </button>
          <button
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${
              activeButton === 'modul'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200'
            }`}
            onClick={() => setActiveButton('modul')}
          >
            Modul
          </button>
        </div>

        {materi && !materiLoading && (
          <ItemsTableContainer
            materi={materi}
            onOpen={handleOpenModal}
            state={state}
            setState={setState}
            mutate={mutate}
            isEdit={handleEditItem}
            clearState={clearState}
            session={session}
            activeButton={activeButton}
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
        handleStatus={handleStatus}
        mutate={mutate}
      />
    </section>
  )
}
