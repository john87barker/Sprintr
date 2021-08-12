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
    <div class="row bg-secondary-dark mx-5 pb-5 d-flex justify-content-start">
      <div class="col-md-6 py-2 ">
        Backlog Items for:
        <br>
        <h4>
          {{ project.name }}
        </h4>
        {{ project.description }}
      </div>
      <div class="col-md-6 text-right p-4">
        <button class="btn btn-outline" type="button" data-target="#createBacklogItem" data-toggle="modal">
          Add Items
        </button>
      </div>
      <CreateBacklogItem />
    </div>
    <div class="row bg-secondary-dark mx-5" :backlog="b">
      <!-- VFOR here component link to modal popup-->
      <div class="col-md-10 offset-1 card " v-for="b in backlogs" :key="b.id">
        <div class="row">
          <div class="col-md-6">
            🐢 {{ b.name }}
          </div>
          <div class="col-md-6 d-flex justify-content-end">
            <button class="btn btn-outline-primary btn-sm">
              Add Task
            </button>
            <p class="pl-2">
              0/0 Tasks Completed
            </p>
          </div>
        </div>
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
import CreateBacklogItem from '../components/CreateBacklogItem.vue'
import { backlogItemsService } from '../services/BacklogItemsService'

export default {
  props: {
    backlog: {
      type: Object,
      required: true
    }
  },
  name: 'Component',
  setup() {
    const route = useRoute()
    // const router = useRouter()
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
        await backlogItemsService.getAllBacklogItems(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.activeProject)
    }
  },
  components: {
    CreateBacklogItem
  }
}
</script>

<style lang="scss" scoped>
.bar{
  height: 3rem;
}

</style>
