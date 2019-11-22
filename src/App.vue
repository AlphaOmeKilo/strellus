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

p {
  margin: 8px 0;
}

h3 {
  font-size: 32px;
  margin-bottom: 0;
}

label {
  display: block;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  margin: 20px 0 8px;
}

input {
  background-color: #ebf0ff;
  border: 1px solid rgba(83, 56, 117, 1);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 18px;
}

button,
.button {
  border-radius: 4px;
  background-color: #2368d9;
  height: 50px;
  width: 100%;
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
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

.st-text-c {
  text-align: center;
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
