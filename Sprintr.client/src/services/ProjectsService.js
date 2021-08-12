import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAllProjects() {
    const res = await api.get('api/projects')

    AppState.projects = res.data
  }

  async getProjectById(id) {
    const res = await api.get(`api/projects/${id}`)
    AppState.activeProject = res.data
  }

  // Is this in the right place?
  async getBacklogItemById(id) {
    const res = await api.get(`api/backlogitem/${id}`)
    console.log('BL Service 1')
    AppState.activeBacklog = res.data
  }

  async createProject(newProject) {
    try {
      const res = await api.post('api/projects', newProject)

      logger.log(res.data)
      // AppState.projects = AppState.projects.push(res.data)

      AppState.projects = [...AppState.projects, res.data]
      // await this.getAllProjects()
    } catch (error) {
      logger.error(error)
    }
  }

  async editProject(id, body) {
    const res = await api.put('api/projects' + id, body)
    AppState.projects = res.data
  }

  async destroyProject(id) {
    console.log(id)
    await api.delete('api/projects/' + id)
    const allProjects = AppState.projects
    AppState.projects = allProjects.filter(p => p.id !== id)
  }
}
export const projectsService = new ProjectsService()
