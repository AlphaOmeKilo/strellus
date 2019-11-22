<template>
    <div>
        <div id="avatar" @click="showMenu = !showMenu">
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
    data: () => ({
        showMenu: false
    }),
    methods: {
        signout() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('/login');
            }).catch((error) => {
                // An error occurred
            });
        },
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
}

#userMenu {
    position: absolute;
    top: 80px;
    right: 0;
    width: 200px;
    height: calc(100vh - 80px);
    background-color: #533875;
}
</style>