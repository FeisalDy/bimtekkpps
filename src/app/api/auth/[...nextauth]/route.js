import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/src/models/User'
import connect from '@/src/utils/db'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session ({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString()

      return session
    },

    async signIn ({ profile }) {
      try {
        await connect()

        //check if user is already exist
        const UserExist = await User.findOne({ email: profile.email })

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
          return Promise.resolve(false) // User not authorized
        }

        return Promise.resolve(true)
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
