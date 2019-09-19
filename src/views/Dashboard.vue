<template>
  <div class="home">
    <button @click="signout">Sign Out</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Strellus</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
  methods: {
    signout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/login');
      }).catch((error) => {
        // An error occurred
      });
    },
  },
});
</script>
