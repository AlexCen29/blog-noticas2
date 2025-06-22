<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="side">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>