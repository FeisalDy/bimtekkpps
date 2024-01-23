import mongoose from 'mongoose'

const { Schema } = mongoose

const PptxSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    download: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

export default mongoose.models.Pptx || mongoose.model('Pptx', PptxSchema)
