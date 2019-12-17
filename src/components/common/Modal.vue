<template>
    <div class="modal">
        <div class="inner">
            <div class="st-text-r">
                <button @click="closeModal" class="button button-light">X</button>
            </div>
    
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
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