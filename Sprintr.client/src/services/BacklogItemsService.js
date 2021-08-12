import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BacklogItemsService {
  async getAllBacklogItems() {
    const res = await api.get('api/backlogitem')

    AppState.backlogs = res.data
    console.log(AppState.backlogs)
  }

  // Is this in the right place?
  async getBacklogItemByProjectId(id) {
    const res = await api.get(`api/projects/${id}/backlogitem`)
    console.log(res.data)
    AppState.activeBacklog = res.data
  }

  async createBacklogItem(newBacklogs) {
    try {
      const res = await api.post('api/backlogitem', newBacklogs)
      logger.log(res.data)
      AppState.activeBacklog = [...AppState.activeBacklog, res.data]
    } catch (error) {
      logger.error(error)
    }
  }

  async editBacklogItem(id, body) {
    const res = await api.put('api/backlogitem' + id, body)
    AppState.backlogItems = res.data
  }

  async destroyBacklogItem(id) {
    console.log(id)
    await api.delete('api/backlogitem/' + id)
    const allBacklogItems = AppState.activeBacklog
    AppState.activeBacklog = allBacklogItems.filter(p => p.id !== id)
  }
}
export const backlogItemsService = new BacklogItemsService()
