<template>
    <div class="single-card-page st-vh-center">
        <div class="card">
            <div class="st-text-r">
                <button @click="toDashboard" class="button button-light">X</button>
            </div>
            <ProfileImageUploader></ProfileImageUploader>
        </div>
    </div>
</template>

<script>
import ProfileImageUploader from '../components/user/ProfileImageUploader.vue';

export default {
    name: "Profile",
    data: () => ({
        selectedFile: null
    }),
    components: {
        ProfileImageUploader
    },
    methods: {
        toDashboard() {
            this.$router.push({ name: 'dashboard' });
        },
    }
}
</script>

<style lang="scss" scoped>
.button {
    margin: 20px;
}
</style>