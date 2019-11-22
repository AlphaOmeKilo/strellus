<template>
    <div class="sign-up">
        <h3>Create an account</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signup">Sign up</button>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        signup() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => this.$router.replace('/dashboard'),
                (err) => alert('Oops. ' + err.message),
            );
        },
    },
};
</script>