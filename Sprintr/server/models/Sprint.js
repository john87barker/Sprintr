import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Sprint = new Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isOpen: { type: Boolean, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
