import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'
// import Project from '../models/Project'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
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
      const projects = await projectsService.getAll(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.getOne(req.params.id)
      res.send(project)
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
      const project = await projectsService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const project = await projectsService.edit(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await projectsService.destroy(req.params.id)
      res.send({ message: 'You deleted that ****!' })
    } catch (error) {
      next(error, 'could not delete')
    }
  }
}
