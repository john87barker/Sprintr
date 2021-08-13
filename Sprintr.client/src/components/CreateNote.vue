<template>
  <div class="modal fade" id="createNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Notes
          </h5>
          <button type="button" class="btn-close btn btn-outline-danger" data-dismiss="modal" aria-label="Close">
            X
          </button>
        </div>
        {{ task.id }}
        <div class="modal-body">
          <textarea
            class="form-control"
            v-model="state.newNote.body"
            id="note"
            rows="3"
            placeholder="Note..."
          >
          </textarea>
        </div>
        <div v-for="n in notes" :key="n.id">
          <div class="m-4 p-3 border">
            {{ n.body }}
            <br>
            - {{ n.creatorId }}
            <br>
            {{ n.createdAt }}
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" @click="createNote" class="btn btn-primary" data-toggle="modal" data-target="#createNote">
            Save Note
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
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'

export default {
  name: 'Component',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      newNote: {}
    })
    onMounted(async() => {
      try {
        console.log(props.task.id)
        await notesService.getAllNotesByTaskId(props.task.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      async createNote() {
        try {
          state.newNote.taskId = props.task.id
          const newNote = await notesService.createNote(state.newNote)
          state.newNote = {}
          Pop.toast('Note Created', 'success')
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
