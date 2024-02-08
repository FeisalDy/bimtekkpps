import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import Link from 'next/link'

export default function NotFound () {
  return (
    <>
      <Header />
      <main className='flex justify-center w-full my-32 dark:bg-dark font-mr'>
        <div className='relative flex flex-col items-center justify-center'>
          <h1
            className={`inline-block text-dark dark:text-light
      text-6xl font-bold w-full capitalize xl:text-8xl text-center`}
          >
            404
          </h1>
          <h2
            className={`inline-block text-dark dark:text-light
      text-5xl font-bold w-full capitalize xl:text-6xl text-center mt-4 tracking-wide leading-snug`}
          >
            Page Not Found!
          </h2>
          <Link
            href='/'
            className='self-center inline-block px-4 py-2 mt-8 font-semibold border-2 border-solid rounded-lg bg-dark text-light hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light '
          >
            Go To Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
