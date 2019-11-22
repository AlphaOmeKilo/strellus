<template>
    <div id="platform">
        <Header :title="title"></Header>
        <PlatformLeftMenu></PlatformLeftMenu>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '../components/platform/Header.vue';
import PlatformLeftMenu from '../components/platform/PlatformLeftMenu';

export default {
    name: "Platform",
    data: () => ({
      title: "strellus"
    }),
    components: {
        Header,
        PlatformLeftMenu
    }
}
</script>

<style lang="scss" scoped>

</style>