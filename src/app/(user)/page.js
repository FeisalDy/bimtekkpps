import { allBlogs } from 'contentlayer/generated'
import HomeCoverSection from '@/src/components/Home/HomeCoverSection'
import FeaturedPosts from '@/src/components/Home/FeaturedPosts'
import RecentPosts from '@/src/components/Home/RecentPosts'
import Video from '@/src/components/Home/Video'

export default function Home () {
  return (
    <main className='flex flex-col items-center justify-center'>
      <Video />
      {/* <HomeCoverSection blogs={allBlogs} /> */}
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />
    </main>
  )
}
