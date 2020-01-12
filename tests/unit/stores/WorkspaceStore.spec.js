import WorkspaceStore from '@/stores/WorkspaceStore.js';

describe('Workspace Store', () => {

    const state = {
        workspaces: [{
            id: 123456789,
            name: "Strellus",
            new: true,
            admin: false,
            private: true
        }]
    }

    it('getWorkspaceNameById', () => {
        const name = WorkspaceStore.getters.getWorkspaceNameById(state)(state.workspaces[0].id);
        expect(name).toEqual(state.workspaces[0].name);
    });
});