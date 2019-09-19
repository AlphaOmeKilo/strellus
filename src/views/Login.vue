<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Sign In</button>
        <p>Don't have an account? <router-link to="/signup">Sign Up!</router-link></p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
  data: () => {
      return {
          email: '',
          password: '',
      };
  },
  methods: {
      login(): void {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
              (user) => {
                alert('Login Succesfull');
                this.$router.replace('dashboard');
              },
              (err) => alert('Oops. ' + err),
          );
      },
  },
});
</script>