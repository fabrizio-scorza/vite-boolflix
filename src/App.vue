<script>
  import AppHeader from './components/AppHeader.vue';
  import AppContent from './components/AppContent.vue';

  export default{
    components:{
      AppHeader,
      AppContent
    }
  }
</script>

<template>
  <AppHeader/>
  <AppContent/> 
</template>

<style lang="scss">
  body{
    background-color: rgb(30, 41, 53);
    color: white;
  }
</style>
