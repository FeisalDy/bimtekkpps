import User from '@/src/models/User'
import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST (req) {
  const body = await req.json()
  const { email, password } = body
  if (!email || !password) {
    return NextResponse.json({ msg: 'invalid fields' }, { status: 400 })
  }

  await connect()

  try {
    const isUserPresent = await User.findOne({ email })
    if (!isUserPresent) {
      return NextResponse.json(
        { msg: 'User is not available' },
        { status: 409 }
      )
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserPresent.password
    )

    if (!isPasswordMatch) {
      return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 409 })
    }

    const tokenData = {
      id: isUserPresent._id,
      email: isUserPresent.email
    }

    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '1d'
    })

    const response = NextResponse.json({
      message: 'Logged in successfully',
      success: true
    })

    response.cookies.set('token', token, { httpOnly: true })

    return response
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err, success: false }, { status: 500 })
  }
}
