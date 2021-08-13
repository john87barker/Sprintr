<template>
  <div class="col-md-12 d-flex flex-row">
    <div v-for="t in tasks" :key="t.id">
      <ol>
        <li class="card shadow p-3 mt-3 bg-warning">
          <div>
            Tasks:
            <div>
              <button class="btn btn-info text-light">
                +Deets
              </button>
              <button class="btn btn-success" @click.prevent="destroyTask(t.id)">
                Delete
              </button>
            </div>
            {{ t.weight }}
            <br>
            {{ t.description }}
            <br>
            {{ t.status }}
          </div>
        </li>
      </ol>
    </div>
    <div> Total Weight</div>
    <NoteModal />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import Pop from '../utils/Notifier'
export default {

  props: {
    btask: {
      type: Object,
      required: true
    }
  },

  name: 'Component',
  setup(props) {
    return {

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
