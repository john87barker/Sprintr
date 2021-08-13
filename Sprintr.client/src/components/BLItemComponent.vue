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
              <select v-model="state.selectedStatus" @change="logStatus" class="pb-1">
                <!-- inline object literal -->
                <option v-for="s in status" :value="s.id" :key="s.id">
                  {{ s.name }}
                </option>
              </select>
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

export default {
  name: 'Component',
  props: {
    btask: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const state = reactive({
      selectedStatus: ''
    })
    return {
      state,
      status: [
        { name: 'pending' },
        { name: 'in-progrss' },
        { name: 'review' },
        { name: 'done' }
      ],
      logStatus() {
        logger.log(state.selectedStatus)
      },
      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.btask.id)),

      // async totalWeight() {
      //   const tWeights = AppState.tasks.filter(t => t.backlogItemId === props.btask).weight
      //   const totalWeight = tWeights => tWeights.reduce((a, b) => a + b, 0)
      //   return totalWeight
      // },
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
