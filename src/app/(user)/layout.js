import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

export default function UserLayout ({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
