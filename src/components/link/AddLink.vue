<template>
    <div class="modal">
        <div class="inner">
            <!-- <button class="close-button" @click="handleClose"><close-icon/></button> -->
            hello
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddLink"
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: fade-out(black, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.inner {
    background-color: white;
    width: 800px;
    position: relative;
}
</style>