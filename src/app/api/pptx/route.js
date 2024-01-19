import Pptx from '@/src/models/Pptx'
import connect from '@/src/utils/db'

export const GET = async req => {
  try {
    await connect()

    const pptx = await Pptx.find({})

    return new Response(JSON.stringify(pptx), { status: 200 })
  } catch (error) {
    return new Response('Error getting articles', { status: 500 })
  }
}
