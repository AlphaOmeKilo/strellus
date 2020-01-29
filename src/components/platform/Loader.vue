<template>
    <div class="loader st-vh-center" :class="$mq">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style lang="scss" scoped>
.loader {
    height: calc(100% - 80px);
    width: calc(100% - 80px);
    margin-left: 80px;

    &.mobile,
    &.tablet {
    width: calc(100%);
    margin-left: 0;
    }

    .dot {
        width: 50px;
        height: 50px;
        background-color: #533875;
        border-radius: 50%;
        animation-name: pulse_animation;
        animation-duration: 1000ms;
        transform-origin: center center;
        animation-iteration-count: infinite;
        animation-timing-function: ease;

        &:nth-of-type(2) {
            animation-delay: 0.25s;
        }

        &:nth-of-type(3) {
            animation-delay: 0.5s;
        }
    }

}

@keyframes pulse_animation {
    0% { transform: scale(1); }
    50% { transform: scale(0.2); }
    100% { transform: scale(1); }
}
</style>