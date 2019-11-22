<template>
    <div id="app">
        <router-view/>
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

.slide-rl-enter-active,
.slide-rl-leave-active {
  transition: all .3s ease;
}
.slide-rl-enter, .slide-rl-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
