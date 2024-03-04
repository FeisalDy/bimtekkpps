import Link from 'next/link'

export default async function Page () {
  return (
    <>
      <section className='w-full px-5 mt-2 sm:px-10 md:px-24 sxl:px-32'>
        {/* <div className='flex justify-end w-full'>
          <Link href='https://drive.usercontent.google.com/download?id=1ZvbhuQP_AS9keATLNLaIPijT93dq5Tp2&export=download&authuser=0'>
            <p className='py-2 text-blue-500 pointer-events-auto hover:underline'>
              Download
            </p>
          </Link>
        </div> */}

        <div
          className='relative h-0 pt-4 overflow-hidden'
          style={{
            paddingTop: '56.25%',
            border: '2px solid #ccc'
          }}
        >
          <iframe
            width='100%'
            height='100%'
            src='https://www.youtube.com/embed/-9ev34Gi_Ls?si=wv73XNzI_so1btQO'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%'
            }}
          />
          {/* <iframe
            src='https://drive.google.com/file/d/1ZvbhuQP_AS9keATLNLaIPijT93dq5Tp2/preview'
            width='100%'
            height='100%'
            allowFullScreen='true'
            mozAllowFullScreen='true'
            webkitAllowFullScreen='true'
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%'
            }}
          /> */}
        </div>
      </section>
    </>
  )
}
