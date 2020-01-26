<template>
    <div class="signup st-flex">
        <mq-layout  v-show="!loading" mq="laptop+" class="st-vh-center signup-img-container" :class="$mq">
            <img class="signup-img" src="@/assets/max-bender-unsplash.jpg" @load="loaded">
        </mq-layout>
        <div class="signup-form st-vh-center" :class="$mq">
            <h1 id="platform-logo"><router-link to="/">strellus</router-link></h1>
            <div>
                <h3>Create an account</h3>
                <transition name="slide-lr" mode="out-in">
                    <p key="error" v-if="error" class="error">{{ errorMessage }}</p>
                </transition>
                <form @submit="signup">
                    <label for="email">Email Address</label>
                    <input name="email" type="text" v-model="email"><br>
                    <label for="password">Password</label>
                    <input name="password" type="password" v-model="password"><br>
                    <input :disabled="disabled" class="button" type="submit" value="Sign Up">
                </form>
                <p class="st-text-c">Already have an account?
                    <router-link to="/login">Sign In</router-link>
                </p>
            </div>
        </div>
    
    </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: false,
            errorMessage: '',
            disabled: false
        };
    },
    methods: {
        ...mapMutations(["setLoading"]),

        signup(e) {
            this.disabled = true;
            this.error = false;
            e.preventDefault();
            e.stopPropagation();
            
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(
                (user) => {
                    this.$router.replace('/dashboard');
                },
                (err) => {
                    this.errorMessage = err.message;
                    this.error = true;
                    this.disabled = false;
                },
            );
        },
        loaded() {
            this.setLoading(false);
        }
    },
    computed: {
        ...mapState({
            loading: state => state.loading
        })
    },
    mounted() {
        this.setLoading(true);
    }
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
        width: 100%;
        &.laptop,
        &.desktop {
            width: 50%;
        }
    }
    &-form {
        text-align: left;
        p {
            width: 300px;
            height: 44px;
            margin-bottom: 40px;
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