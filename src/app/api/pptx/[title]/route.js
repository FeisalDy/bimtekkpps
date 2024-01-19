import Pptx from '@/src/models/Pptx'
import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export const GET = async (req, { params }) => {
  try {
    await connect()
    const pptx = await Pptx.where({ title: params.title }).findOne()

    return new NextResponse(JSON.stringify(pptx), { status: 200 })
  } catch (error) {
    return new NextResponse('Error getting articles', { status: 500 })
  }
}
