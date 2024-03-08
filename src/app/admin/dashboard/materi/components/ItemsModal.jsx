import { useDropzone } from 'react-dropzone'
import { createMateri } from '@/src/lib/materi'

export const ItemsModal = ({
  showModal,
  onClose,
  state,
  setState,
  handleFile
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept:
      'application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.ms-excel',
    onDrop: acceptedFiles => {
      handleFile(acceptedFiles[0])
    }
  })

  const handleSubmission = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', state.title)
    formData.append('file', state.file)
    createMateri(formData)
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
                  state.action.charAt(0).toUpperCase() + state.type.slice(1)
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
                      File (Drag and drop or select)
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
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={e => {
                handleSubmission(e)
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  )
}
