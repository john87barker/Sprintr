<template>
  <div class="component col-md-12">
    <div class="ml-5">
      name
      <!-- <span>{{ project.name }}</span>
      <p>{{ project.description }}</p> -->
    </div>
    <div class="text-center">
      name
      <!-- {{ account.name }} -->
    </div>
    <div class="mr-5">
      date
      <!-- {{ project.createdAt }} -->
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'

export default {
  name: 'ProjectsComponent',

  setup() {
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
