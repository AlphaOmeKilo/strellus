<template>
    <div class="login st-flex">
        <div class="login-form st-vh-center">
            <div>
                <h1 id="platform-logo">
                    <router-link to="/">strellus</router-link>
                </h1>
                <h3>Sign In to Strellus</h3>
                <p>Please enter your credentials to proceed</p>
                <form @submit="login">
                    <label for="email">Email Address</label>
                    <input name="email" type="text" v-model="email"><br>
                    <label for="password">Password</label>
                    <input name="password" type="password" v-model="password"><br>
                    <input class="button" type="submit" value="Sign In">
                </form>

                <p class="st-text-c">Don't have an account?
                    <router-link to="/signup">Sign Up!</router-link>
                </p>
            </div>
        </div>
        <div class="login-img">
    
        </div>
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
        login(e) {
            e.preventDefault();
            
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('dashboard');
                },
                (err) => {
                    alert('Oops. ' + err)
                },
            );
        },
    },
};
</script>

<style lang="scss" scoped>
#platform-logo {
    position: absolute;
    top: 0;
    left: 0;
}

.login {
    height: 100vh;
    &-form,
    &-img {
        width: 50%;
    }
    &-form {
        text-align: left;
        p {
            margin-bottom: 40px;
        }
    }
    &-img {
        background-image: url('../assets/max-bender-unsplash.jpg');
        background-size: cover;
        background-position: center;
    }
}

input:not(.button) {
    width: 300px;
    height: 40px;
}

.button {
    margin-top: 30px;
}
</style>