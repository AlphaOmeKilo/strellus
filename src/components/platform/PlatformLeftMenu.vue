<template>
    <div id="platformLeftMenu">
        <ul class="project-list">
            <li :class="[{ active: activeProject === 0}, 'st-vh-center dashboard']" @click="goToDashboard()">
                <div class="project-icon"></div>
            </li>
            <template v-for="(project) in projects">
                <li :class="[{ active: activeProject === project.id}, 'st-vh-center']" :key="project.name" @click="goToProject(project.id)">
                    <div class="project-icon"></div>
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
        goToProject(uuid) {
            if(uuid !== this.activeProject) {
                this.$router.push({ name: 'project', params: { uuid: uuid}});
            }
        }
    },
    computed: {
        ...mapState("ProjectStore", ["projects", "activeProject"]),
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
    .project {
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