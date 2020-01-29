<template>
    <div id="app" :class="$mq">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
}

#app {
    overflow: hidden;

    &.mobile,
    &.tablet {
        overflow: scroll;
        #platform-logo {
            margin-left: 0;
            text-align: center;
        }
    }


    #platform {
        height: 100vh;
        background-color: #ebf0ff;
        &-logo {
            margin-left: 100px;
            font-size: 20px;
            a {
                text-decoration: none;
                color: #000000;
            }
        }
    }
}

.single-card-page {
    height: calc(100vh - 80px);
    width: 100vw;
    .card {
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        background-color: white;
    }
}

p {
    margin: 8px 0;
}

h3 {
    font-size: 32px;
    margin-bottom: 0;

    &.mobile {
        font-size: 24px;
    }
}

.error {
    color: #F20000
}

label,
.label {
    display: block;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    margin: 20px 0 8px;
}

input {
    background-color: #ebf0ff;
    border: 1px solid #533875;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 18px;
}

button,
.button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 4px;
    background-color: #2368d9;
    height: 50px;
    width: 100%;
    color: #FFFFFF;
    font-size: 16px;
    cursor: pointer;
    &-light {
        background-color: #ebf0ff;
        border: none;
        height: 40px;
        width: unset;
        padding: 0 30px;
        color: #000000;
    }

    &-flat {
        background-color: transparent;
        border: none;
        height: 40px;
        width: unset;
        padding: 0 30px;
        color: #000000;
    }
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.st-text-grey {
    color: #BCBCBC;
}

.st-p-0 {
    padding: 0;
}

.st-m-0 {
    margin: 0;
}

.st-flex {
    display: flex;
}

.st-v-center {
    display: flex;
    align-items: center;
}

.st-vh-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.st-text-l {
    text-align: left;
}

.st-text-c {
    text-align: center;
}

.st-text-r {
    text-align: right;
}

.st-border-b {
    border-bottom: 1px solid #ebf0ff;
}

.slide-rl-enter-active,
.slide-rl-leave-active,
.slide-lr-enter-active,
.slide-lr-leave-active,
.fade-enter-active,
.fade-leave-active {
    transition: all .3s ease;
}

.slide-rl-enter,
.slide-rl-leave-to {
    transform: translateX(200px);
    opacity: 0;
}

.slide-lr-enter,
.slide-lr-leave-to {
    transform: translateX(-200px);
    opacity: 0;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
