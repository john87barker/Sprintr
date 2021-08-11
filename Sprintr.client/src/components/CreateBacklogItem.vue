<template>
  <div class="modal fade" id="createBacklogItem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Modal title
          </h5>
          <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close">
            X
          </button>
        </div>
        <div class="modal-body">
          <!-- VModel -->
          <input class="form-control" type="text" id="name" placeholder="Name Project..."><br>
          <textarea class="form-control" id="description" rows="3" placeholder="Description..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="submit" @click="createBacklogItem" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
// import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Notifier'

export default {
  name: 'Component',
  setup() {
    const state = reactive({
      newProject: {}
    })
    return {
      async createBacklogItem() {
        try {
          // TODO create backlogItem service
          // await backlogItemsService.createBacklogItem(state.newBacklogItem)
          console.log('creating backlogItem in component')
          state.newBacklogItem = {}
          Pop.toast('BacklogItem Created', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },

  components: {}
}
</script>

<style lang="scss" scoped>

</style>
