<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-secondary-dark justify-content-center bg-turtle">
    <router-view />
  </main>
  <footer class="mt-2">
    <div class="bg-dark text-light text-center p-4">
      Made with 🍔 by CJ/John
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.action:hover{
  cursor: pointer;
}
.bg-turtle{
  background: url("turtle.gif");
  background-size: cover;
  background-position: center;
}

</style>
