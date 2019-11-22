<template>
    <div class="signup st-flex">
        <div class="signup-img">
    
        </div>
        <div class="signup-form st-vh-center">
            <h1 id="platform-logo"><router-link to="/">strellus</router-link></h1>
            <div>
                <h3>Create an account</h3>
                <form @submit="signup">
                    <label for="email">Email Address</label>
                    <input name="email" type="text" v-model="email"><br>
                    <label for="password">Password</label>
                    <input name="password" type="password" v-model="password"><br>
                    <input class="button" type="submit" value="Sign In">
                </form>
                <p class="st-text-c">Already have an account?
                    <router-link to="/login">Login</router-link>
                </p>
            </div>
        </div>
    
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
        signup(e) {
            e.preventDefault();
            
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => this.$router.replace('/dashboard'),
                (err) => alert('Oops. ' + err.message),
            );
        },
    },
};
</script>


<style lang="scss" scoped>
#platform-logo {
    position: absolute;
    top: 0;
    right: 100px;
}

.signup {
    height: 100vh;
    &-form,
    &-img {
        width: 50%;
    }
    &-form {
        text-align: left;
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