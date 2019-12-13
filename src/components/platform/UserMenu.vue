<template>
    <div>
        <div id="avatar" @click="toggleUserMenu">
        </div>
        <transition name="slide-rl" mode="out-in">
            <div v-show="showMenu" id="userMenu">
                <div class="st-text-r st-border-b">
                    <button @click="signout" class="button button-light">Sign Out</button>
                </div>
                <div class="st-text-r">
                    <button @click="inviteUser" class="button button-light">Invite Users</button>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <Modal v-if="showInviteModal">
                <div>
                    <h2>Invite a user to join a workspace.</h2>
    
                    <form @submit="sendInvite">
                        <div class="st-vh-center">
                            <label class="st-m-0">Select the Workspace:</label>
                            <select v-model="selected">
                        <option v-for="(workspace) in sharedWorkspaces" :key="`invite_${workspace.id}`" :value="workspace.id">{{ workspace.name }}</option>
                    </select>
    
                        </div>
    
                        <label for="email">Email Address</label>
                        <input name="email" type="text" v-model="email"><br/><br/>
                        <input class="button" type="submit" value="Send Invite">
                    </form>
    
                </div>
            </Modal>
        </transition>
    </div>
</template>

<script>
import firebase from 'firebase/app';

import Modal from "../common/Modal.vue";
import { mapState, mapActions } from 'vuex';

export default {
    name: "UserMenu",
    data: () => ({
        showInviteModal: false,
        selected: "",
        email: "",
    }),
    props: {
        showMenu: Boolean
    },
    components: {
        Modal
    },
    methods: {
        ...mapActions("InvitationStore", ["inviteUserToWorkspace"]),

        signout() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('/login');
            }).catch((error) => {
                // An error occurred
            });
        },
        inviteUser() {
            this.showInviteModal = !this.showInviteModal;
            this.selected = this.activeWorkspace !== 0 ? this.activeWorkspace : this.sharedWorkspaces[0].id;
        },
        sendInvite(e) {
            e.preventDefault();
            e.stopPropagation();

            const userInvite = {
                email: this.email,
                workspace_id: this.selected
            }

            this.inviteUserToWorkspace(userInvite);

            this.showInviteModal = false;
        },
        toggleUserMenu() {
            this.$emit('toggle');
        }
    },
    computed: {
        ...mapState("WorkspaceStore", {
            workspaces: state => state.workspaces,
            activeWorkspace: state => state.activeWorkspace
        }),

        sharedWorkspaces() {
            return this.workspaces.filter(workspace => {
                return !workspace.private;
            })
        }
    }

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
    background-color: #FFFFFF;
    button {
        margin: 20px 20px 20px 0;
    }
}
</style>