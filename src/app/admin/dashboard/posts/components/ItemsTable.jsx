import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

export const ItemsTable = ({ items, onOpen }) => {
  const deleteItemHandler = fileName => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const formData = new FormData()
              formData.append('fileName', fileName)

              const response = await fetch('/api/delete', {
                method: 'DELETE',
                body: formData
              })

              const data = await response.json()
              if (data.status === 200) {
                toast.success('Item successfully deleted!', {
                  position: 'bottom-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light'
                })
              } else {
                toast.error('Failed to delete item. Please try again later.', {
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
            } catch (error) {
              console.error('Error deleting item:', error)
              toast.error('Failed to delete item. Please try again later.', {
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
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  const handleOpen = item => {
    onOpen(item)
  }

  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope='col' className='p-4'>
            No
          </th>
          <th scope='col' className='px-6 py-3'>
            Title
          </th>
          <th scope='col' className='px-6 py-3'>
            Status
          </th>
          <th scope='col' className='px-6 py-3'>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={`${item.id}`}
            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
          >
            <td className='w-4 p-4'>
              <div className='flex items-center'>{index + 1}</div>
            </td>
            <th
              scope='row'
              className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
            >
              <div className='pl-3'>
                <div className='text-base font-semibold'>{item.title}</div>
              </div>
            </th>
            <td className='px-6 py-4'>
              <div className='flex items-center'>
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.isPublished ? 'bg-green-500' : 'bg-red-500'
                  } mr-2`}
                ></div>
                {item.isPublished ? 'Published' : 'Unpublished'}
              </div>
            </td>
            <td className='flex items-center px-6 py-4'>
              <button
                type='button'
                className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                // onClick={onOpen}
                onClick={() => handleOpen(item)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </button>
              <button
                className='ml-4 font-medium text-red-600 dark:text-red-500 hover:underline'
                onClick={() => deleteItemHandler(item.title)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
