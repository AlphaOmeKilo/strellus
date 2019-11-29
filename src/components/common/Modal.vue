<template>
    <div class="modal">
        <div class="inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
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
    width: 100%;
    background-color: white;
    max-width: 800px;
    position: relative;
    border-radius: 4px;
    padding: 10px;
}
</style>