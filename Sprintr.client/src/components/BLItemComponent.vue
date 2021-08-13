<template>
  <div class="col-md-12 d-flex flex-row">
    <div v-for="t in tasks" :key="t.id">
      <ol>
        <li class="card border border-primary p-2">
          <div>
            Tasks:
            {{ t.description }}
            <div>
              <button class="mx-2 my-1">
                Notes
              </button>
              <button @click.prevent="destroyTask(t.id)">
                Delete
              </button>
            </div>
            <div class="p-1">
              <p>task weight:{{ t.weight }} </p>
              <br>
              Status:
              <select v-model="state.selectedStatus" @change="logStatus" class="pb-1 action">
                <!-- inline object literal -->
                <option v-for="s in status" :value="s.id" :key="s.id">
                  {{ s.name }}
                </option>
              </select>
              <div class="mt-1">
                Sprint:
                <select v-model="state.selectedSprint" @change="updateSprint(t.description)" :value="sprint.name" class="pb-1 action">
                  <!-- inline object literal -->
                  <option v-for="sprint in sprints" :value="sprint.id" :key="sprint.id">
                    {{ sprint.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
    <!-- <div> Total Weight</div> -->
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import Pop from '../utils/Notifier'
import { logger } from '../utils/Logger'
import { sprintsService } from '../services/SprintsService'

export default {
  name: 'Component',
  props: {
    btask: {
      type: Object,
      required: true
    }
    // sprint: {
    //   type: Object,
    //   required: true
    // }
  },

  setup(props) {
    const state = reactive({
      selectedStatus: '',
      selectedSprint: ''
    })
    return {
      state,
      status: [
        { name: 'pending', value: 1 },
        { name: 'in-progrss', value: 2 },
        { name: 'review', value: 3 },
        { name: 'done', value: 4 }
      ],
      sprint: {},

      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.btask.id)),
      sprints: computed(() => AppState.sprints),

      // async totalWeight() {
      //   const tWeights = AppState.tasks.filter(t => t.backlogItemId === props.btask).weight
      //   const totalWeight = tWeights => tWeights.reduce((a, b) => a + b, 0)
      //   return totalWeight
      // },
      async updateSprint(id) {
        try {
          await sprintsService.updateSprint(id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async destroyTask(id) {
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
              await tasksService.destroyTask(id)
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
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
