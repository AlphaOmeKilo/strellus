<template>
    <div>
        {{ workspace.name }}
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "Workspace",
    data: () => ({

    }),
    methods: {
        ...mapActions("WorkspaceStore", ["getWorkspaceStack"]),

    },
    computed: {
        ...mapState("WorkspaceStore", {
            workspace: state => state.workspaceStack
        })
    },
    watch: {
        $route(to, from) {
            const uuid = to.params.uuid;
            this.getWorkspaceStack({ uuid });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>