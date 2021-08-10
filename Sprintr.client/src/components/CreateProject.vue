<template>
  <div class="modal fade" id="createProject" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <input class="form-control" type="text" id="name" placeholder="Name Project..."><br>
          <textarea class="form-control" id="description" rows="3" placeholder="Description..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="submit" @click="createProject" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'

export default {
  name: 'Component',
  setup() {
    const state = reactive({
      newProject: {}
    })
    return {
      async createProject() {
        try {
          console.log('creating post', state.newProject)
          await projectsService.createProject(state.newProject)
          state.newProject = {}
          Pop.toast('Project Created', 'success')
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
