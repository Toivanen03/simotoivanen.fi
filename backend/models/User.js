import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true },
  passwordHash: { 
    type: String, 
    required: true },
  admin: {
    type: Boolean,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  resetToken: String,
  resetTokenExpiry: Date,
  emailConsent:{
    type: Boolean,
    required: true
  }
})

export default mongoose.model('User', userSchema)
