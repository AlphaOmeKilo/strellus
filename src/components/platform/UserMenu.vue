<template>
    <div>
        <div id="avatar" @click="toggleUserMenu">
        </div>
        <transition name="slide-rl" mode="out-in">
            <div v-show="showMenu" id="userMenu">
                <button @click="signout">Sign Out</button>
            </div>
        </transition>
    
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: "UserMenu",
    props: {
        showMenu: Boolean
    },
    methods: {
        signout() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('/login');
            }).catch((error) => {
                // An error occurred
            });
        },
        toggleUserMenu() {
            this.$emit('toggle');
        }
    },
    
}
</script>

<style lang="scss" scoped>
#avatar {
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

#userMenu {
    position: absolute;
    top: 80px;
    right: 0;
    width: 240px;
    height: calc(100vh - 80px);
    background-color: #533875;
}
</style>