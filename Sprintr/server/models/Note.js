import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItem = new Schema(
  {

    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
