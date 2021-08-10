<template>
  <div class="component col-md-12">
    <div class="ml-5">
      {{ project.name }}
    </div>
    <div class="text-center">
      {{ project.members }}
    </div>
    <div class="mr-5">
      {{ project.createdAt }}
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { projectsService } from '../services/ProjectsService'

import Pop from '../utils/Notifier'
export default {
  name: 'Component',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
