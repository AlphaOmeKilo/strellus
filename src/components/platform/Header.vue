<template>
    <header>
        <div class="st-v-center">
            <Menu @toggle="toggleLeftMenuSize()"></Menu>
            <h1 id="platform-logo">
                <router-link to="/">{{ title }}</router-link>
            </h1>
        </div>
        <div class="st-v-center">
            <Notifications :showMenu="notificationMenu" @toggle="toggleNotificationMenu(!notificationMenu)"></Notifications>
            <UserMenu :showMenu="userMenu" @toggle="toggleUserMenu(!userMenu)"></UserMenu>
        </div>
    </header>
</template>

<script>
import Menu from './Menu.vue';
import UserMenu from './UserMenu.vue';
import Notifications from './Notifications.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    name: "Header",
    props: {
        title: String
    },
    components: {
        Menu,
        UserMenu,
        Notifications
    },
    methods: {
        ...mapMutations("MenuStore", [
            "toggleNotificationMenu",
            "toggleUserMenu",
            "toggleLeftMenuSize"
        ]),
    },
    computed: {
        ...mapState("MenuStore", {
            notificationMenu: state => state.notificationMenu,
            userMenu: state => state.userMenu,
        }),
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

#addLink {
    cursor: pointer;
    background-color: #533875;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    transition: 0.25s all;
    margin-left: 12px;
    &:hover {
        transform: scale(1.1);
    }
}
</style>