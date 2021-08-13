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
          <div class="col-md-11 pb-2 text-uppercase ">
            🐢 {{ s.name }}<br>
            {{ s.projectName }} It is {{ s.isOpen }} that this sprint is open
          </div>

          <div v-for="t in tasks" :key="t.id" :task="t">
            <ol>
              <li class="card p-2">
                <div>
                  Tasks:
                  {{ t.description }}
                  <div>
                    <button type="button" data-target="#createNote" data-toggle="modal" class="mx-2 my-1">
                      Notes
                    </button>
                    <CreateNote :task="t" />
                    <button @click.prevent="destroyTask(t.id)">
                      Delete
                    </button>
                  </div>
                  <div class="p-1">
                    <p>task weight: {{ t.weight }} </p>
                    <br>
                    Status:{{ t.status }}
                  </div>
                </div>
              </li>
            </ol>
          </div>
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
import { tasksService } from '../services/TasksService'

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
        // await tasksService.getAllTasksBySprintId(route.params.id)
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
