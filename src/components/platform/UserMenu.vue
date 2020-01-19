<template>
    <div>
        <transition name="slide-rl" mode="out-in">
            <img v-show="profileImageLoaded" ref="profileImage" id="avatar" @click="toggleUserMenu" @load="loaded" :src="profileImageUrl">
        </transition>
        
    
        <transition name="slide-rl" mode="out-in">
            <div v-show="showMenu" id="userMenu">
                <div class="st-text-r st-border-b">
                    <button @click="signout" class="button button-light">Sign Out</button>
                </div>
                <div class="st-text-r">
                    <button @click="goToMyProfile" class="button button-flat">My Profile</button>
                    <button @click="inviteUser" class="button button-flat">Invite Users</button>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <invite v-if="showInviteModal" @close="showInviteModal = false" :sharedWorkspaces="sharedWorkspaces" :activeWorkspace="activeWorkspace"></invite>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

import Invite from '../../components/user/Invite.vue';

export default {
    name: "UserMenu",
    data: () => ({
        showInviteModal: false,
        selected: "",
        profileImageLoaded: false
    }),
    props: {
        showMenu: Boolean
    },
    components: {
        Invite
    },
    methods: {
        loaded() {
           this.profileImageLoaded = true
        },
        signout() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('/login');
            }).catch((error) => {
                // An error occurred
            });
        },
        inviteUser() {
            this.showInviteModal = !this.showInviteModal;
        },

        goToMyProfile() {
            this.$emit('toggle');
            this.$router.push({ name: 'profile' });
        },

        toggleUserMenu() {
            this.$emit('toggle');
        },

        updateSelected(value) {
            this.selected = value;
        }
    },
    computed: {
        ...mapState("WorkspaceStore", {
            workspaces: state => state.workspaces,
            activeWorkspace: state => state.activeWorkspace
        }),

        ...mapState("UserStore", {
            profileImageUrl: state => state.profileImageUrl
        }),

        sharedWorkspaces() {
            return this.workspaces.filter(workspace => {
                return !workspace.private;
            })
        }
    },

}
</script>

<style lang="scss" scoped>
#avatar {
    display: block;
    cursor: pointer;
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
    background-color: #FFFFFF;
    button {
        margin: 20px 20px 20px 0;
        &.button-flat {
            margin: 20px 0 0 0;
        }
    }
}
</style>