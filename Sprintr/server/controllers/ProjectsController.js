import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'
import { sprintsService } from '../services/SprintsService'
import { backlogItemsService } from '../services/BacklogItemsService'
// import Project from '../models/Project'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/sprints', this.getSprintById)
      .get('/:id/backlogiditems', this.getBacklogItemById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
      // TODO move the auth back to the top
      .use(Auth0Provider.getAuthorizedUserInfo)
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

  async getSprintById(req, res, next) {
    try {
      const sprint = await sprintsService.getSprintById({ sprintId: req.params.id })
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  // NOTE not sure why getting linter error on line 53
  async getBacklogItemById(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemById({ backlogItemId: req.params.id })
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

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
