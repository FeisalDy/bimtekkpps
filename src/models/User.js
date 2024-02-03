import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required!']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!']
  },
  //   password: {
  //     type: String,
  //     required: true
  //   }
  image: {
    type: String
  }
})

const User = mongoose.models.user || mongoose.model('user', schema)

export default User
