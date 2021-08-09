import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async getAll(query) {
    return await dbContext.Note.find(query).populate('creator', 'name')
  }

  async getOne(id) {
    const note = await dbContext.Note.findById(id).populate('creator', 'name')
    if (!note) {
      throw new BadRequest('invalid id')
    }
    // if (!note.creatorId.toString() !== userId) {
    //   throw new Forbidden('This is not your note')
    // }
    // NOTE can we use userId or accountId?
    return note
  }

  async create(body) {
    const note = await dbContext.Note.create(body)
    return await this.getOne(note.id)
  }

  async edit(body) {
    await this.getOne(body.id)
    const note = await dbContext.Note.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return note
  }

  async destroy(id) {
    await this.getOne(id)
    return await dbContext.Note.findByIdAndDelete(id)
  }
}
export const notesService = new NotesService()
