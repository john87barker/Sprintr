import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
// import Task from '../models/Task'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      // .get('/:id/sprint', this.getBySprint)
      // .get('/:id/backlogid', this.getByBacklogId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await tasksService.getAll(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.getOne(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  // async getBySprint(req, res, next) {
  //   try {

  //   } catch (error) {

  //   }
  // }

  // async getByBacklogId(req, res, next) {
  //   try {

  //   } catch (error) {

  //   }
  // }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.edit(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await tasksService.destroy(req.params.id)
      res.send({ message: 'You deleted that ****!' })
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
