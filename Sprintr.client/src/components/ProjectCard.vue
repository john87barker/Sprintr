<template>
  <div class="col-md-12 procard shadow">
    <div class="row my-4">
      <div class="col-md-4 text-left" v-if="project">
        <b>{{ project.name }}</b>
        <p>{{ project.description }}</p>
      </div>
      <div class="text-center col-md-4">
        {{ project.creator.name }}
      </div>
      <div class="col-md-4 text-right">
        {{ project.createdAt }}
      </div>
    </div>
  </div>
  <!-- <hr class="bg-primary"> -->
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account)

    }
  }
}
</script>
<style scoped>
hr {width: 98% ;margin-left: auto;margin-right: auto;height: 1px; opacity: 0.1;}
.procard:hover{
  color: #003566;
  transform: scale(1.02);
  cursor: pointer;
}
</style>
