<template>
    <div id="platformLeftMenu">
        <ul class="project-list">
            <li :class="{ active: activeProject === project.id}" v-for="(project) in projectList" :key="project.name">
    
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PlatformLeftMenu",
    data: () => ({
        projectList: [
            {
                id: 1,
                name: "Dashboard",
                icon: "dashboard"
            }
            
        ],
        activeProject: 1
    })
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
    .project-list {
        list-style: none;
        padding: 0;
        margin: 80px 0;
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
</style>