<template>
    <div>
        {{ project.name }}
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "Project",
    data: () => ({

    }),
    methods: {
        ...mapActions("ProjectStore", ["getProjectStack"]),

    },
    computed: {
        ...mapState("ProjectStore", {
            project: state => state.projectStack
        })
    },
    watch: {
        $route(to, from) {
            const uuid = to.params.uuid;
            this.getProjectStack({ uuid });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>