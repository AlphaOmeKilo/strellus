<template>
    <div class="signup st-flex" :class="$mq">
        <mq-layout  v-show="!loading" mq="laptop+" class="st-vh-center signup-img-container" :class="$mq">
            <img class="signup-img" src="@/assets/max-bender-unsplash.jpg" @load="loaded">
        </mq-layout>
        <div class="signup-form st-vh-center" :class="$mq"> 
            <div class="signup-form__fields" :class="$mq">
                <h1 id="platform-logo">
                    <router-link to="/">strellus</router-link>
                </h1>
                <div class="form-title" :class="$mq">
                    <h3>Create an account</h3>
                    <transition name="slide-lr" mode="out-in">
                        <p key="error" v-if="error" class="error">{{ errorMessage }}</p>
                    </transition>
                </div>
                
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


.form-title.mobile {
    width: 80%;
    margin: 0 auto;
}

.signup {
    height: 100vh;

    #platform-logo {
        position: absolute;
        top: 0;
        right: 100px;
    }

    &.mobile {
        height: auto;

        #platform-logo {
            position: relative;
            display: block;
            right: 0;
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