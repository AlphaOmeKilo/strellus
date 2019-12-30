<template>
    <div id="platform">
        <Header :title="title"></Header>
        <transition name="slide-lr" mode="out-in">
            <PlatformLeftMenu v-if="leftMenuActive"></PlatformLeftMenu>
        </transition>

        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    
        <transition name="fade" mode="out-in">
            <Modal v-if="invitations.length > 0">
                <div 
                    v-for="(invitation, index) in invitations"
                    :key="`invitations-${index}`"
                >
                    <div class="st-vh-center">
                        <h2>You Have been added to the {{ invitation.name }} workspace!</h2>
                        <button @click="goToWorkspace(`${invitation.id}`)" class="button button-light">View Workspace</button>
                    </div>
                </div>
            </Modal>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Header from "../components/platform/Header.vue";
import PlatformLeftMenu from "../components/platform/PlatformLeftMenu.vue";

import Modal from "../components/common/Modal.vue";

export default {
    name: "Platform",
    data: () => ({
        title: "strellus",
        leftMenuActive: true
    }),
    components: {
        Header,
        PlatformLeftMenu,
        Modal
    },
    methods: {
        ...mapActions("InvitationStore", ["getWorkspaceInvitations"]),
        ...mapActions("WorkspaceStore", ["getWorkspaces"]),

        closeModal() {
            this.$router.push({ name: "dashboard" });
        },
        goToWorkspace( uuid ) {
            this.getWorkspaces();
            this.$router.push({ name: "workspace", params: { uuid: uuid } });
            this.$store.dispatch("InvitationStore/clearInvitation", { uuid } );
        }

    },
    computed: {
        ...mapState("InvitationStore", {
            invitations: state => state.invitations
        })
    },
    watch: {
        $route(to, from) {
            this.leftMenuActive = !to.meta.leftMenuDisable;
        }
    },
    mounted() {
        this.leftMenuActive = !this.$route.meta.leftMenuDisable;
        this.getWorkspaceInvitations();
    }
};
</script>

<style lang="scss" scoped>

</style>