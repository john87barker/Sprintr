import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getAllTasksByProjectId(id) {
    const res = await api.get(`api/projects/${id}/tasks`)
    console.log(res.data)
    AppState.tasks = res.data
  }

  async getAllTasksByBacklogId(id) {
    const res = await api.get(`api/backlogitem/${id}/tasks`)
    console.log(res.data)
    AppState.tasks = res.data
  }

  async getTaskById(id) {
    console.log(id)
    const res = await api.get(`api/tasks/${id}`)
    AppState.activeTask = res.data
  }

  // async getTaskBySprintId(id) {
  //   const res = await api.get(`api/tasks/${id}`)
  //   AppState.activeTask = res.data
  // }

  async createTask(newTask) {
    try {
      const res = await api.post('api/tasks', newTask)
      logger.log(res.data)
      AppState.tasks = [...AppState.tasks, res.data]
    } catch (error) {
      logger.error(error)
    }
  }

  async editTask(id, editedTask) {
    console.log(editedTask, 'in the service')
    const res = await api.put('api/tasks/' + id, editedTask)

    AppState.tasks = res.data
  }

  async destroyTask(id) {
    console.log(id)
    await api.delete('api/tasks/' + id)
    const allTasks = AppState.tasks
    AppState.tasks = allTasks.filter(p => p.id !== id)
  }
}
export const tasksService = new TasksService()
