<template>
  <div class="component container-fluid">
    <div class="row  bg-info bar ">
      <div class="col-md-2 pr-0">
        Project:
        <br>
        <em> {{ project.name }}</em>
      </div>
      <div class="col-md-1 action text-left">
        <button type="button" data-target="#createBacklog" data-toggle="modal" class="btn btn-outline-dark pb-3 ">
          Backlog
        </button>
      </div>
      <div class="col-md-1 action ">
        <button type="button" data-target="#createSprint" data-toggle="modal" class="btn btn-outline-dark pb-3 ml-3">
          +Sprint
        </button>
      </div>
    </div>
    <div class="row bg-secondary-dark mx-5 pb-5 d-flex justify-content-start mt-2 shadow">
      <div class="col-md-6 py-2 ">
        Backlog Items for:
        <br>
        <h4>
          <em>
            {{ project.name }}</em>
        </h4>
        {{ project.description }}
      </div>
      <div class="col-md-6 text-right p-4">
        <button class="btn btn-outline-primary" type="button" data-target="#createBacklogItem" data-toggle="modal">
          Add Item
        </button>
      </div>
      <CreateBacklogItem />
    </div>
    <div class="row bg-secondary-dark mx-5">
      <div class="col-md-10 offset-1 card mb-3 shadow py-2" v-for="b in backlogs" :key="b.id">
        <!-- I want the following idea here v-if="projectId === b.projectId" -->
        <div class="row">
          <div class="col-md-6 text-uppercase  ">
            🐢 {{ b.name }}
            {{ b.projectId }}
          </div>
          <div class="col-md-6 d-flex justify-content-end">
            <button class="btn btn-outline-primary btn-sm m-2">
              Add Task +
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
  // props: {
  //   backlog: {
  //     type: Object,
  //     required: true
  //   }
  // },
  name: 'Component',
  setup() {
    const route = useRoute()
    // const router = useRouter()
    onMounted(async() => {
      try {
        await projectsService.getProjectById(route.params.id)
        console.log('PD on mounted')
        await backlogItemsService.getAllBacklogItems(route.params.id)
        // NOTE the following is what we need I think
        await backlogItemsService.getBacklogItemById(route.params.id)
      } catch (error) {
        Pop.toast('You failed' + error, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs),
      project: computed(() => AppState.activeProject),
      // activeproject added to help get only the BL we want. Needs more work.
      activeProject: computed(() => AppState.activeProject)
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
