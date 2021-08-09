import mongoose from 'mongoose'
import { Project } from './Project'
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
BacklogItem.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Project.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
