const loadingRowsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const LoadingTable = () => {
  return (
    <div className='relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
      <div className='overflow-x-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
              {loadingRowsCount.map(products => (
                <tr
                  key={`${products.id}`}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <th
                    scope='row'
                    className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    <div className='pl-3'>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                    </div>
                  </th>
                  <td className='px-6 py-4'>
                    {' '}
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
