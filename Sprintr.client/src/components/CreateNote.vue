<template>
  <div class="modal fade" id="createNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create Note
          </h5>
          <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close">
            X
          </button>
        </div>
        <div class="modal-body">
          <!-- VModel -->
          <input
            class="form-control"
            type="text"
            v-model="state.newNote.name"
            id="name"
            placeholder="Name Note..."
          >
          <br>
          <textarea
            class="form-control"
            id="description"
            v-model="state.newNote.description"
            rows="5"
            placeholder="Description..."
          >
          </textarea>
        </div>
        <div class="modal-footer">
          <button type="submit" @click="createNote" class="btn btn-primary" data-toggle="modal" data-target="#createNote">
            Submit Note
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'

export default {
  name: 'Component',
  setup() {
    const router = useRouter()
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      async createNote() {
        try {
          const newNote = await notesService.createNote(state.newNote)
          state.newNote = {}
          Pop.toast('Note Created', 'success')
          router.push({ name: 'NotePage', params: { id: newNote.id } })
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
