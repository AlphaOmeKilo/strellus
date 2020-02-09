<template>
    <div>
        <div class="st-relative">
            <transition name="fade" mode="out-in">
                <div v-if="getNotificationCount > 0" class="notification-count st-vh-center" @click="toggleNotificationMenu">{{ getNotificationCount }}</div>
            </transition>   
            <font-awesome-icon icon="bell" class="fa-2x" :class="{loading: loading}" id="notification-icon" @click="toggleNotificationMenu"/>
        </div>
        
        <transition name="slide-rl" mode="out-in">
            <div v-show="showMenu" id="notificationMenu">
                <div class="st-text-r st-border-b">
                    <button @click="clearAllNotifications" class="button button-light">Clear</button>
                </div>
                <transition-group name="slide-rl">
                    <div v-show="showMenu" v-for="(notification, index) in notifications" :key="`notification_${index}`" class="notification st-border-b st-v-center">
                        <div :class="`notification-icon notification-${notification.icon_class}`">
                            <img :src="notification.avatar" class="avatar" />
                        </div>
                        <div class="st-text-l">
                            <p class="label st-text-grey">{{ getWorkspaceNameById(notification.workspace_id) }} / {{notification.doctype}}</p>
                            <p>{{notification.message}}</p>
                            <p class="label st-text-grey">{{notification.timestamp}}</p>
                        </div>
    
                    </div>
                </transition-group>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: "Notifications",
    data: () => ({

    }),
    props: {
        showMenu: Boolean
    },
    computed: {
        ...mapState("NotificationStore", ["notifications", "loading"]),
        ...mapGetters("WorkspaceStore", ["getWorkspaceNameById"]),
        ...mapGetters("NotificationStore", ["getNotificationCount"])
    },
    methods: {
        ...mapActions("NotificationStore", ["clearNotifications"]),

        toggleNotificationMenu() {
            this.$emit('toggle');
        },
        clearAllNotifications() {
            this.clearNotifications();
        },
    }
}
</script>

<style lang="scss" scoped>
#notification-icon {
    cursor: pointer;
    margin-left: 12px;
}

.notification-count {
    position: absolute;
    top: -12px;
    right: -6px;
    font-size: 14px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #FF0000;
    font-weight: bold;
    cursor: pointer;
}

.notification {
    cursor: pointer;
    &-icon {
        margin: 12px;
        &.notification-default {}
    }
}

#notificationMenu {
    position: absolute;
    top: 80px;
    right: 0;
    width: 300px;
    height: calc(100vh - 80px);
    background-color: #FFFFFF;
    button {
        margin: 20px 20px 20px 0;
    }
}

.avatar {
    position: relative;
    background-color: #533875;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    .temp-icon {
        position: absolute;
        bottom: -4px;
        right: -4px;
        background-color: green;
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }
}
</style>