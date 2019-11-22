<template>
    <div id="app">
        <transition name="slide-rl" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
}

#platform {
    height: 100vh;
    background-color: #ebf0ff;
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

.slide-rl-enter-active,
.slide-rl-leave-active,
.slide-lr-enter-active,
.slide-lr-leave-active {
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
</style>
