const MenuStore = {
    namespaced: true,
    state: {
        notificationMenu: false,
        userMenu: false,
        leftMenu: true,
        leftMenuSize: 'small'
    },
    mutations: {
        toggleNotificationMenu(state, payload) {
            state.notificationMenu = payload;
            state.userMenu = false;
        },
        toggleUserMenu(state, payload) {
            state.userMenu = payload;
            state.notificationMenu = false;
        },
        toggleLeftMenu(state, payload) {
            state.leftMenu = payload;
        },
        toggleLeftMenuSize(state, payload) {
            state.leftMenuSize = payload ? payload : state.leftMenuSize === "small" ? "large" : "small";
        }
    }
};

export default MenuStore;