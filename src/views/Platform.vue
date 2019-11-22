<template>
  <div>
      <Header></Header>
      <router-view></router-view>
  </div>
</template>

<script>
  import Header from '../components/platform/Header.vue';

  export default {
    name: "Platform",
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped>

</style>