import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/src/models/User'
import connect from '@/src/utils/db'

const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code'
  })

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file'
]
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   authorization: GOOGLE_AUTHORIZATION_URL,
      //   scope: 'https://www.googleapis.com/auth/drive.file'
      //   scope: 'https://www.googleapis.com/auth/drive'
      authorization: {
        params: {
          //   scope: [openid, 'https://www.googleapis.com/auth/drive.file'].join(
          //     ''
          //   ),
          scope: scopes.join(' '),
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt ({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async signIn ({ user, account, profile }) {
      try {
        await connect()

        //check if user is already exist
        const UserExist = await User.findOne({ email: user.email })

        //if not, create new user
        // if (!UserExist) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name.replace(/\s/g, '').toLowerCase(),
        //     image: profile.picture
        //   })
        // }

        // return true

        if (!UserExist) {
          return Promise.resolve(false)
        }

        return Promise.resolve(true)
        // return Promise.resolve(account.accessToken)
      } catch (error) {
        console.log(error)
        return false
      }
    },

    async session ({ session, token, user }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      //   session.user = token
      session.user.id = sessionUser._id.toString()
      session.accessToken = token.accessToken

      return session
    }
  }
})

export { handler as GET, handler as POST }
