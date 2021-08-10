import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAllProjects() {
    const res = await api.get('api/projects')
    logger.log(res.data)
    AppState.projects = res.data
  }

  async getByProjectId(id) {
    const res = await api.get(`api/projects/${id}`)
    logger.log(res.data)
  }

  async createProject(newProject) {
    console.log('Created in service ')
    const res = await api.post('api/projects', newProject)
    console.log('Created in service 2')
    logger.log(res.data)
    // From Johns previous stuff
    // ProxyState.projects = [...ProxyState.stories, new Project(res.data)]
    AppState.projects = AppState.projects.push(res.data)
    await this.getAllProjects()
  }

  async editProject(id, body) {
    const res = await api.put('api/projects' + id, body)
    AppState.projects = res.data
  }

  async destroyProject(id) {
    await api.delete('api/projects/' + id)
    const allProjects = AppState.projects
    AppState.projects = allProjects.filter(p => p.id !== id)
  }
}
export const projectsService = new ProjectsService()
