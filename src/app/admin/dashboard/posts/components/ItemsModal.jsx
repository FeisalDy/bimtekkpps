import { lazy, Suspense } from 'react'

const EditorComp = lazy(() => import('../editor/EditorComponent'))

export const ItemsModal = ({
  showModal,
  onClose,
  state,
  setState,
  imageChanged,
  handleStatus
}) => {
  return (
    showModal && (
      <div
        className={`fixed top-0 my-16 left-0 right-0 flex items-center justify-center mx-auto w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(85%-1rem)] max-h-full`}
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
                }  post`}
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
              <Suspense fallback={null}>
                <EditorComp
                  markdown={''}
                  state={state}
                  setState={setState}
                  imageChanged={imageChanged}
                  onClose={onClose}
                  handleStatus={handleStatus}
                />
              </Suspense>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
