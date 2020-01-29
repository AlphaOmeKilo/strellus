<template>
    <div id="platform">
        <Header :title="title"></Header>
    
        <transition name="slide-lr" mode="out-in">
            <mq-layout v-if="leftMenuActive" mq="laptop+" :class="$mq">
                <PlatformLeftMenu></PlatformLeftMenu>
            </mq-layout>  
        </transition>
    
        <transition-group name="fade" mode="out-in">
            <loader v-if="loading" key="loader" />
            <router-view key="platform-view" v-else></router-view>
        </transition-group>
    
    
        <transition name="fade" mode="out-in">
            <Modal v-if="invitations.length > 0" @close="closeModal">
                <div v-for="(invitation, index) in invitations" :key="`invitations-${index}`">
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
import Loader from "../components/platform/Loader.vue";
import PlatformLeftMenu from "../components/platform/PlatformLeftMenu.vue";

import Modal from "../components/common/Modal.vue";

export default {
    name: "Platform",
    data: () => ({
        title: "strellus",
        leftMenuActive: true,
    }),
    components: {
        Header,
        PlatformLeftMenu,
        Modal,
        Loader
    },
    methods: {
        ...mapActions("InvitationStore", ["getWorkspaceInvitations"]),
        ...mapActions("WorkspaceStore", ["getWorkspaces"]),

        closeModal() {
            this.$store.dispatch("InvitationStore/clearInvitations");
            this.$router.push({ name: "dashboard" });
        },
        goToWorkspace(uuid) {
            this.getWorkspaces();
            this.$router.push({ name: "workspace", params: { uuid: uuid } });
            this.$store.dispatch("InvitationStore/clearInvitation", { uuid });
        }

    },
    computed: {
        ...mapState("InvitationStore", {
            invitations: state => state.invitations
        }),
        ...mapState({
            loading: state => state.loading
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