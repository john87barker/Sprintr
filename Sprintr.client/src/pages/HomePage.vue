<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center row">
    <div class="col-md-12 bg-secondary shadow">
      <div class="row mt-3 pb-3 border-bottom border-primary">
        <div class="col-md-6 pl-5 text-left">
          <h3> Projects</h3>
          <p>a list of all your projects</p>
        </div>
        <div class="col-md-6">
          <button type="button" class="btn btn-primary">
            Create Project
          </button>
        </div>
      </div>
      <div class="row  p-5">
        <div class="col-md-12 d-flex justify-content-between">
          <div>
            <ProjectsComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import ProjectsComponent from '../components/ProjectsComponent.vue'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getAllProjects()
        console.log('In mounted at home page')
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account)
    }
  },
  components: {
    ProjectsComponent
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
