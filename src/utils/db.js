// import mongoose from 'mongoose'

// const connect = async () => {
//   if (mongoose.connections[0].readyState) return

//   try {
//     await mongoose.connect(process.env.MONGODB_URL ?? '', {
//       dbName: 'codebuck',
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     console.log('Mongo Connection successfully established.')
//   } catch (error) {
//     throw new Error('Error connecting to Mongoose')
//   }
// }

// export default connect

import mongoose from 'mongoose'

let isConnected = false

const connect = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'codebuck',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB connection error:', error)
  }
}

export default connect
