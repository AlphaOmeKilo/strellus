<template>
    <Modal @close="closeInvite">
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
</template>

<script>
import Modal from "../common/Modal.vue";
import { mapActions } from 'vuex';

export default {
    name: 'Invite',
    data: () => ({
        selected: "",
        email: "",
    }),
    props: {
        sharedWorkspaces: {
            required: true,
            type: Array
        },
        activeWorkspace: {
            required: true,
            type: String
        }
    },
    components: {
        Modal
    },
    methods: {
        ...mapActions("InvitationStore", ["inviteUserToWorkspace"]),
        ...mapActions("MailStore", ["sendInviteEmail"]),

        closeInvite() {
            this.$emit('close');
        },

        sendInvite(e) {
            e.preventDefault();
            e.stopPropagation();

            const userInvite = {
                email: this.email,
                workspace_id: this.selected
            }

            this.inviteUserToWorkspace(userInvite);
            this.sendInviteEmail(userInvite);

            this.closeInvite();
        },
    },
    mounted() {
        this.selected = this.activeWorkspace !== 0 ? this.activeWorkspace : this.sharedWorkspaces[0].id;
    }
}
</script>

<style lang="scss" scoped>

</style>