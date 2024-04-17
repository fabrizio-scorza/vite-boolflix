<script>
import AppHeader from './components/AppHeader.vue';
import AppContent from './components/AppContent.vue';

export default {
  components: {
    AppHeader,
    AppContent
  }
}
</script>

<template>
  <AppHeader />
  <AppContent />
</template>

<style lang="scss">
body {
  background-color: black;
  color: white;
}
</style>
