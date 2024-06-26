import { useDropzone } from 'react-dropzone'
import { createMateri, updateMateri } from '@/src/lib/materi'
import { useCallback } from 'react'

export const ItemsModal = ({
  showModal,
  onClose,
  state,
  setState,
  handleFile,
  session,
  handleStatus,
  mutate
}) => {
  //   const handleFileCallback = useCallback(
  //     acceptedFile => {
  //       handleFile(acceptedFile)
  //     },
  //     [handleFile]
  //   )

  const { getRootProps, getInputProps } = useDropzone({
    // accept:
    //   'application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.ms-excel',
    onDrop: acceptedFiles => {
      handleFile(acceptedFiles[0])
    }
    // onDrop: handleFileCallback
  })

  const handleSubmission = async e => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', state.title)
      formData.append('file', state.file)
      formData.append('accessToken', session?.accessToken)
      const res = await createMateri(formData)
      if (res.status === 201) {
        mutate(`pptx?type=materi`)
        mutate(`pptx?type=modul`)
        handleStatus(200)
      } else {
        handleStatus(500)
      }
    } catch (error) {
      handleStatus(500)
    } finally {
      setState(prev => ({ ...prev, loading: false }))
      onClose()
    }
  }

  const handleEdit = async (e, state) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', state.title)
      formData.append('file', state.file)
      formData.append('accessToken', session?.accessToken)
      const res = await updateMateri(state, formData)
      if (res.status === 200) {
        mutate(`pptx?type=materi`)
        mutate(`pptx?type=modul`)
        handleStatus(200)
      } else {
        handleStatus(500)
      }
    } catch (error) {
      handleStatus(500)
    } finally {
      setState(prev => ({ ...prev, loading: false }))
      onClose()
    }
  }

  return (
    showModal && (
      <div
        className={`fixed top-0 my-16 left-0 right-0 flex  items-center justify-center mx-auto  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(85%-1rem)] max-h-full`}
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
                {`${
                  state.type.charAt(0).toUpperCase() + state.type.slice(1)
                }  materi`}
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                onClick={onClose}
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
                    defaultValue={state.title}
                  />
                </div>

                <div className='mb-4'>
                  <div className='mb-4'>
                    <label
                      htmlFor='dropzone'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      {state.type === 'edit'
                        ? 'Upload file if would like to replace the existing file'
                        : 'File (Drag and drop or select)'}
                    </label>
                    <div
                      {...getRootProps({
                        className:
                          'border rounded-md min-h-[100px] border-dashed border-gray-300 p-4 dark:border-gray-600'
                      })}
                    >
                      <input {...getInputProps()} />
                      <p className='text-gray-500'>
                        Drag and drop an image here, or click to select.
                      </p>
                    </div>
                    {state.file && (
                      <p className='mt-2 text-sm text-gray-500'>
                        Selected: {state.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            {!state.loading ? (
              <button
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={e => {
                  if (state.type === 'edit') {
                    handleEdit(e, state)
                  } else if (state.type === 'add') {
                    handleSubmission(e)
                  }
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
        </div>
      </div>
    )
  )
}
