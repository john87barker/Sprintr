import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItem = new Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    isOpen: { type: Boolean, required: true },
    color: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
