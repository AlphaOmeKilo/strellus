<template>
    <div id="platform">
        <Header :title="title"></Header>
        <PlatformLeftMenu></PlatformLeftMenu>
        <router-view></router-view>
    
        <transition name="fade" mode="out-in">
            <Modal v-if="invitations.length > 0">
                <div 
                    v-for="(invitation, index) in invitations"
                    :key="`invitations-${index}`"
                >
                    <div class="st-vh-center">
                        <h2>You Have been added to the {{ invitation.name }} workspace!</h2>
                        <button @click="goToProject(`${invitation.id}`)" class="button button-light">View Project</button>
                    </div>
                </div>
                <!-- <div>
                    <h2>You Have been added to the {{}}</h2>
                </div>
                You Have been added to a project!
                <button @click="goToProject()" class="button button-light">View Project</button>
                <div class="st-text-r">
                    <button @click="closeModal" class="button button-light">Cancel</button>
                </div> -->
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
        title: "strellus"
    }),
    components: {
        Header,
        PlatformLeftMenu,
        Modal
    },
    methods: {
        ...mapActions("ProjectStore", ["getProjectInvitations"]),

        closeModal() {
            this.$router.push({ name: "dashboard" });
        },
        goToProject( uuid ) {
            this.$router.push({ name: "project", params: { uuid: uuid } });
            this.$store.dispatch("ProjectStore/clearInvitation", { uuid } );
        }

    },
    computed: {
        ...mapState("ProjectStore", {
            invitations: state => state.invitations
        })
    },
    mounted() {
        this.getProjectInvitations();
    }
};
</script>

<style lang="scss" scoped>

</style>