import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BacklogItemsService {
  async getAllBacklogItems() {
    const res = await api.get('api/backlogitem')

    AppState.backlogs = res.data
    console.log(AppState.backlogs)
  }

  async getBacklogItemById(id) {
    const res = await api.get(`api/backlogitem/${id}`)
    console.log('BL Service 1')
    AppState.activeBacklog = res.data
  }

  async createBacklogItem(newBacklogs) {
    try {
      const res = await api.post('api/backlogitem', newBacklogs)

      logger.log(res.data)
      // AppState.backlogItems = AppState.backlogItems.push(res.data)

      AppState.backlogs = [...AppState.backlogs, res.data]
      // await this.getAllBacklogItems()
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
    const allBacklogItems = AppState.backlogItems
    AppState.backlogItems = allBacklogItems.filter(p => p.id !== id)
  }
}
export const backlogItemsService = new BacklogItemsService()
