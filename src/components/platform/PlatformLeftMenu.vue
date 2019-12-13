<template>
    <div id="platformLeftMenu">
        <ul class="workspace-list">
            <li :class="[{ active: activeWorkspace === 0}, 'st-vh-center dashboard']" @click="goToDashboard()">
                <div class="workspace-icon"></div>
            </li>
            <template v-for="(workspace) in privateWorkspaces">
                <li :class="[{ active: activeWorkspace === workspace.id}, 'st-vh-center']" :key="workspace.id" @click="goToWorkspace(workspace.id)">
                    <div class="workspace-icon"></div>
                </li>
            </template>
            <template v-for="(workspace) in sharedWorkspaces">
                <li :class="[{ active: activeWorkspace === workspace.id}, 'st-vh-center']" :key="workspace.id" @click="goToWorkspace(workspace.id)">
                    <div class="workspace-icon"></div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "PlatformLeftMenu",
    data: () => ({
    }),
    methods: {

        goToDashboard() {
            this.$router.push({ name: 'dashboard' });
        },
        goToWorkspace(uuid) {
            if(uuid !== this.activeWorkspace) {
                this.$router.push({ name: 'workspace', params: { uuid: uuid}});
                this.$store.dispatch("InvitationStore/clearInvitation", { uuid })
            }
        }
    },
    computed: {
        ...mapState("WorkspaceStore", ["workspaces", "activeWorkspace"]),

        sharedWorkspaces() {
            return this.workspaces.filter( workspace => {
                return !workspace.private;
            })
        },
        privateWorkspaces() {
            return this.workspaces.filter( workspace => {
                return workspace.private;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#platformLeftMenu {
    position: fixed;
    background-color: #FFFFFF;
    top: 80px;
    left: 0;
    width: 80px;
    height: calc(100vh - 80px);
    .workspace {
        &-icon {
            cursor: pointer;
            background-color: #533875;
            border-radius: 50%;
            height: 40px;
            width: 40px;
        }
        &-list {
            list-style: none;
            padding: 0;
            margin: 80px 0;

            .dashboard {
                margin-bottom: 80px;
            }

            li {
                height: 80px;
                width: 80px;
                transition: all 0.25s;
                cursor: pointer;
                position: relative;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 80px;
                    width: 4px;
                    transition: 0.25s all;
                }
                &:hover,
                &.active {
                    background-color: #ebf0ff;
                    &:after {
                        background-color: rgba(83, 56, 117, 1);
                    }
                }
            }
        }
    }
}
</style>