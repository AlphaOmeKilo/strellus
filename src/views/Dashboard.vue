<template>
  <div class="home">
    <h2>This is the dashboard</h2>

    <!-- <transition name="fade" mode="out-in">
      <router-view v-if="showModal" name="addLink" />
    </transition> -->
  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data: () => ({
    showModal: false
  }),
  mounted() {
    this.showModal = this.$route.meta.showModal;
  },
  watch: {
    "$route.meta"({ showModal }) {
      this.showModal = showModal;
    }
  }
};
</script>
