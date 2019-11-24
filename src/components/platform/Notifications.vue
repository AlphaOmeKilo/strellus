<template>
    <div>
        <div id="notification-icon" @click="toggleNotificationMenu">
        </div>
        <transition name="slide-rl" mode="out-in">
            <div v-show="showMenu" id="notificationMenu">
                <div class="st-text-r st-border-b">
                    <button @click="clearAllNotifications" class="button button-light">Clear</button>
                </div>
                <transition-group name="slide-rl">
                    <div v-show="showMenu" v-for="(notification, index) in notifications" :key="`notification_${index}`" class="st-border-b st-v-center">
                        <div :class="`notification-icon notification-${notification.icon_class}`">
                            image
                        </div>
                        <div class="st-text-l">
                            <p class="label st-text-grey">{{notification.project}} / {{notification.doctype}}</p>
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
import { mapState, mapActions } from 'vuex';

export default {
    name: "Notifications",
    data: () => ({

    }),
    props: {
        showMenu: Boolean
    },
    computed: {
        ...mapState("NotificationStore", ["notifications"]),
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
    background-color: #533875;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    transition: 0.25s all;
    margin-left: 12px;
    &:hover {
        transform: scale(1.1);
    }
}

.notification-icon {
    margin: 12px;
    &.notification-default {}
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
</style>