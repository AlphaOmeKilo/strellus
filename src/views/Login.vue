<template>
    <div class="login st-flex" :class="$mq">
        <div class="login-form st-vh-center" :class="$mq">
            <div class="login-form__fields" :class="$mq">
                <h1 id="platform-logo">
                    <router-link to="/">strellus</router-link>
                </h1>
                <div class="form-title" :class="$mq">
                    <h3>Sign In to Strellus</h3>
                    <transition name="slide-lr" mode="out-in">
                        <p key="no-error" v-if="!error">Please enter your credentials to proceed</p>
                        <p key="error" v-else class="error">{{ errorMessage }}</p>
                    </transition>
                </div>
                <form @submit="login">
                    <label for="email">Email Address</label>
                    <input name="email" type="text" v-model="email"><br>
                    <label for="password">Password</label>
                    <input name="password" type="password" v-model="password"><br>
                    <input :disabled="disabled" class="button" type="submit" value="Sign In">
                </form>
    
                <p class="st-text-c">Don't have an account?
                    <router-link to="/signup">Sign Up!</router-link>
                </p>
            </div>
        </div>
        <mq-layout v-show="!loading" mq="laptop+" class="st-vh-center login-img-container" :class="$mq">
            <img class="login-img" src="@/assets/max-bender-unsplash.jpg" @load="loaded">
        </mq-layout>
    </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapMutations, mapState } from 'vuex';

export default {
    data: () => {
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

        login(e) {
            this.disabled = true;
            this.error = false;
            e.preventDefault();
            e.stopPropagation();

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('dashboard');
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

.form-title.mobile {
    width: 80%;
    margin: 0 auto;
}

.login {
    height: 100vh;

    #platform-logo {
        position: absolute;
        top: 0;
        left: 0;
    }

    &.mobile {
        height: auto;

        #platform-logo {
            position: relative;
            display: block;
        }
    }

    &-form,
    &-img-container {
        width: 100%;
        padding: 12px;
        &.laptop,
        &.desktop {
            width: 50%;
            padding: 0;
        }
    }
    &-form {
        text-align: left;
        margin-bottom: 50px;

        &__fields {
            max-width: 75%;
            width: 320px;

            &.mobile {
                width: 100%;
                max-width: unset;

                input:not(.button) {
                    width: 80%;
                    margin: 0 auto;
                    height: 30px;
                }

                .button {
                    width: 84%;
                    height: 40px;
                }

                form {
                    text-align: center;
                }
            }

            input:not(.button) {
                width: 300px;
                height: 40px;
            }
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

.button {
    margin-top: 30px;
}
</style>