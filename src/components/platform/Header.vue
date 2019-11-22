<template>
    <header>
        <div class="st-v-center">
            <Menu></Menu>
            <h1 id="platform-logo"><router-link to="/">{{ title }}</router-link></h1>
        </div>
    
        <UserMenu></UserMenu>
    </header>
</template>

<script>
import Menu from './Menu.vue';
import UserMenu from './UserMenu.vue';

export default {
    name: "Header",
    props: {
      title: String
    },
    components: {
        Menu,
        UserMenu
    }
}
</script>

<style lang="scss" scoped>

header {
    position: relative;
    height: 40px;
    padding: 20px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
}
</style>