import Image from 'next/image'
import { useEffect } from 'react'

const DisplayImage = ({ state }) => {
  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <>
      {state.editImage && (
        <Image
          src={state.editImage.replace('../../public', '')}
          alt='Uploaded Image'
          width={200}
          height={200}
          className='object-cover object-center w-20 h-20 rounded-lg'
        />
      )}
      {state.image.filePath && !state.editImage && (
        <Image
          src={state.image.filePath.replace('../public', '')}
          alt='Uploaded Image'
          width={200}
          height={200}
          className='object-cover object-center w-20 h-20 rounded-lg'
        />
      )}
    </>
  )
}

export default DisplayImage
