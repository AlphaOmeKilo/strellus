<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Sign In</button>
        <p>Don't have an account? <router-link to="/signup">Sign Up!</router-link></p>
    </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data: () => {
      return {
          email: '',
          password: '',
      };
  },
  methods: {
      login() {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
              (user) => {
                this.$router.replace('dashboard');
              },
              (err) => alert('Oops. ' + err),
          );
      },
  },
};
</script>