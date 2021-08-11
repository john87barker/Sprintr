<template>
  <div class="component container-fluid">
    <div class="row  bg-info bar ">
      <div class="col-md-2 ">
        Project:
        <br>
        <em> {{ project.name }}</em>
      </div>
      <div class="col-md-2 action">
        <!-- {{ project.name }} -->
        Backlog
      </div>
      <div class="col-md-2 action">
        <!-- {{ project.name }} -->
        Sprints
      </div>
    </div>
    <div class="row bg-secondary-dark">
      <div class="col-md-6 border border-outline">
        Backlog Items for:
        <br>
        <h4>
          {{ project.name }}
        </h4>
        {{ project.description }}
      </div>
      <div class="col-md-6 text-center p-3">
        <button>Add Items</button>
      </div>
    </div>
    <div class="row bg-secondary-dark">
      <div class="col-md-12">
        <!-- VFOR here component link to modal popup-->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'

export default {
  name: 'Component',
  setup() {
    const route = useRoute()
    // const router = useRouter()
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      project: computed(() => AppState.activeProject)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.bar{
  height: 3rem;
}
</style>
