<template>
    <div id="platformLeftMenu" :class="leftMenuSize">
        <ul class="workspace-list">
            <li :class="[{ active: activeWorkspace === '0'}, 'st-text-l st-v-center dashboard']" @click="goToDashboard()">
                <font-awesome-icon icon="th-large" class="fa-2x" :style="{ color: '#533875' }"/>
                <transition name="slide-lr" mode="out-in">
                    <span v-if="leftMenuSize === 'large'" class="st-m-h-1 st-no-wrap">Dashboard</span>
                </transition>
            </li>
            <transition-group name="slide-lr">
                <template v-for="(workspace) in privateWorkspaces">
                    <li :class="[{ active: activeWorkspace === workspace.id}, 'st-text-l st-v-center']" :key="workspace.id" @click="goToWorkspace(workspace.id)">
                        <div class="workspace-icon"></div>
                        <transition name="slide-lr" mode="out-in">
                            <span v-if="leftMenuSize === 'large'" class="st-m-h-1 st-no-wrap">{{ workspace.name }}</span>
                        </transition>
                    </li>
                </template>
            </transition-group>
            <transition-group name="slide-lr">
                <template v-for="(workspace) in sharedWorkspaces">
                    <li :class="[{ active: activeWorkspace === workspace.id}, 'st-text-l st-v-center']" :key="workspace.id" @click="goToWorkspace(workspace.id)">
                        <div class="workspace-icon"></div>
                        <transition name="slide-lr" mode="out-in">
                            <span v-if="leftMenuSize === 'large'" class="st-m-h-1 st-no-wrap">{{ workspace.name }}</span>
                        </transition>
                    </li>
                </template>
            </transition-group>
        </ul>
        <div id="createWorkspace" class="st-text-l st-v-center">
            <font-awesome-icon icon="plus" class="fa-2x" :style="{ color: '#533875' }"/>
            <transition name="slide-lr" mode="out-in">
                <span v-if="leftMenuSize === 'large'" class="st-m-h-1 st-no-wrap">Add Workspace</span>
            </transition>
        </div>
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
        ...mapState("WorkspaceStore", {
            workspaces: state => state.workspaces,
            activeWorkspace: state => state.activeWorkspace
        }),

        ...mapState("MenuStore", {
            leftMenuSize: state => state.leftMenuSize
        }),
        

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
    transition: all 0.25s;

    &.large {
        width: auto;
    }

    &.small {
        width: 80px;
    }
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
            margin: 80px 0 40px;

            .dashboard {
                margin-bottom: 80px;
            }

            li {
                height: 80px;
                width: calc(100% - 20px);
                transition: all 0.25s;
                cursor: pointer;
                position: relative;
                padding-left: 20px;
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

    #createWorkspace {
        cursor: pointer;
        width: calc(100% - 26px);
        margin-left: 26px;

        svg {
            margin-right: 6px;
        }
    }
}
</style>