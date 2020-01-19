<template>
    <div class="signup st-flex">
        <div class="st-vh-center signup-img-container">
            <img class="signup-img" src="@/assets/max-bender-unsplash.jpg">
        </div>
        <div class="signup-form st-vh-center">
            <h1 id="platform-logo">
                <router-link to="/">strellus</router-link>
            </h1>
            <div class="signup-form__fields">
                <h3>You've been invited to Join your team on Strellus! <br/> Sign up below!</h3>
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
    name: 'Invite',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        signup(e) {
            e.preventDefault();
            e.stopPropagation();

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
    &-img-container {
        width: 50%;
    }
    &-form {
        text-align: left;

        &__fields {
            max-width: 75%;
            width: 320px;
        }
    }
    &-img {
        flex-grow: 1;
        object-fit: cover;

        &-container {
            overflow: hidden;
        }
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