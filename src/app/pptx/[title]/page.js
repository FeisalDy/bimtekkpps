import Axios from '@/src/utils/axios'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function getData (title) {
  const lower_title = title.toLowerCase()
  const res = await Axios.get(`/pptx/${lower_title}`)
  return res.data
}
export default async function Page ({ params, searchParams }) {
  const data = await getData(params.title)
  if (!data) {
    redirect('/not-found')
  }

  return (
    <>
      <section className='w-full px-5 mt-2 sm:px-10 md:px-24 sxl:px-32'>
        {data && data.download && (
          <div className='flex justify-end w-full'>
            <Link href={data.download}>
              <p className='py-2 text-blue-500 pointer-events-auto hover:underline'>
                Download
              </p>
            </Link>
          </div>
        )}

        <div
          className='relative h-0 pt-4 overflow-hidden'
          style={{
            paddingTop: '56.25%'
          }}
        >
          <iframe
            src={data.url}
            frameBorder='0'
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
          />
        </div>
      </section>
    </>
  )
}
