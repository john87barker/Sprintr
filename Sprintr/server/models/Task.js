import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Task = new Schema(
  {

    sprintId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    backlogItemId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], default: 'pending' },
    weight: { type: Number, required: true },
    assignedTo: { type: [Schema.Types.ObjectId] }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)
