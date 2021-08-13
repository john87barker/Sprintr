<template>
  <div class="component container-fluid">
    <div class="row bg-secondary-dark mx-5 pb-5 d-flex justify-content-start mt-2 shadow">
      <div class="col-md-6 py-2 ">
        Sprints for:
        <br>
        <h4>
          <em>
            {{ project.name }}</em>
        </h4>
        {{ project.description }}
      </div>
      <div class="col-md-6 text-right p-4">
        <button class="btn btn-outline-primary" type="button" data-target="#createSprint" data-toggle="modal">
          Create Sprint
        </button>
      </div>
      <CreateSprint />
    </div>
    <div class="row bg-secondary-dark mx-5">
      <!-- NOTE Creating Sprint v-model here -->
      <div class="col-md-10 offset-1 card mb-3 shadow py-2" v-for="s in sprints" :key="s.id">
        <!-- I want the following idea here v-if="projectId === b.projectId" -->
        <div class="row">
          <div class="col-md-1">
            <button class="btn btn-outline-primary" @click.prevent="destroySprint(s.id)">
              X
            </button>
          </div>
          <div class="col-md-5 text-uppercase ">
            🐢 {{ s.name }}<br>
            {{ s.projectName }}
          </div>
          <div>
            It is {{ s.isOpen }} that this sprint is open
          </div>

          <!-- <div class="col-md-6 d-flex justify-content-end">
            <button class="btn btn-outline-primary btn-sm m-2">
              Add Task +
            </button>

          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import CreateSprint from '../components/CreateSprint.vue'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import { sprintsService } from '../services/SprintsService'

export default {
  // props: {
  //   backlog: {
  //     type: Object,
  //     required: true
  //   }
  // },
  name: 'Sprint',
  setup() {
    const route = useRoute()
    const state = reactive({
      // selectedTask: ''
    })
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
        await sprintsService.getAllSprintsByProjectId(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      state,
      task: {},

      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.activeProject),
      activeProject: computed(() => AppState.activeProject),
      activeSprint: computed(() => AppState.activeSprint),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),

      async destroySprint(id) {
        console.log(id)
        try {
          await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              await sprintsService.destroySprint(id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {
    CreateSprint
  }
}
</script>

<style lang="scss" scoped>
.bar{
  height: 3rem;
}

</style>
