
<template>
    <link rel="stylesheet" href="/assets/css/user/login.css">
    <!-- Start Content -->
    <main class="__content">
        <div class="content__left">
            <img class="left__img" src="/assets/images/logo/logo_blue.png" alt="Logo Bloor">
            <p class="left__text">The Best place to find reviews...</p>
        </div>       
        <div class="content__right">
            <div class="header__nav">
                <a class="nav__item item__active" @click="redirectTo({ val: 'supplierLogin' })">Login</a>
                <a @click="redirectTo({ val: 'supplierSignUp' })" class="nav__item">Sign up</a>
                <!-- <RouterLink to="/user-signup" class="nav__item">Sign up</RouterLink> -->
            </div>
            <div class="form">
                <div class="form__up">
                    <h2 class="right__title">Welcome Back...</h2>
                    <p class="right__text">Please login to your Account to Keep in touch</p>
                </div>
                <form @click.prevent class="right__down" action="" >
                    <div class="form__inputs">
                        <div class="form__input">
                            <label class="label__field">Email</label>
                            <input type="email" v-model="email" class="input__field" placeholder="Enter Your Email...">
                            <span class="feedback_error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                        </div>
                        <div class="form__input password">
                            <label class="label__field">Password</label>
                            <input type="password" v-model="password" class="input__field" placeholder="Enter Your Password">
                        <span class="feedback_error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                        </div>
                        <div class="form__check">
                            <input type="checkbox" class="check__field">
                            <span class="check__text">Remember Me</span>
                        </div>
                    </div>
                    <div class="form__submit">
                        <button class="submit__btn" @click="loginForm()" type="submit">Login</button>
                        <a class="btn__forgot" @click="this.$router.push('/user-forget-pass')" target="_blank">Forgot Password</a>
                    </div>
                </form>
            </div>
        </div>



        <div class="content_bottom">
            <p class="left__help">help!</p>
            <span class="icon__text">A New Member? <a href="">Sign up</a></span>
        </div>
    </main>

</template>

<script>
// import { RouterLink, RouterView } from 'vue-router'
// import axios from "axios"
import Api from "@/api"
// import router from '@/router'
import { mapActions, mapGetters } from 'vuex'
import useValidate from '@vuelidate/core'
import { required , email  } from '@vuelidate/validators'


export default {
    name: "Login",
    components: {
    },
    // compostion API 
    setup(){
        
    },
    data(){
        return {
            v$: useValidate(),
            email: "",
            password: "",
            errors: "",
            alert: "",
        }

    },
    validations () {
        return {
            password: {
                required,
            },
            email: {
                required,
                email
            },
        }
    },
    mounted(){
        // let user = localStorage.getItem("userToken")
        // let user = localStorage.getItem("token")
        // if(user){
        //     this.redirectTo({ val: "Home" })
        // }
    },
    computed:{
        // ...mapGetters("authUser",{
        //     getLoginApiStatus:"getLoginApiStatus",
        //     getAuthenticated:"getAuthenticated",
        //     getToken:"getToken",
        //     getUserData:"getUserData",
        // })
    },
    methods:{
        ...mapActions(['redirectTo']),
        ...mapActions(['redirectToPath']),
        // ...mapActions('authUser' , {
        //     loginApi:"loginApi",
        //     userProfile:"userProfile",
        // }),
        // ...mapActions('user' , {
        //     addUser:"addUser",
        //     addToken:"addToken",
        //     switchStatus:"switchStatus",
        //     addRole:"addRole",
        // }),
        async loginForm(){
            this.v$.$validate();
            if(!this.v$.$error){
                console.log("Success")
                const payload = {
                    email: this.email,
                    password: this.password,
                } 
                await Api.authSupplier.signIn(payload).then((res) => {
                    if(res.data.status){
                        // this.addToken(res.data.token)
                        // this.switchStatus(true)
                        // this.addRole(1)
                        this.$store.dispatch("user/addToken", res.data.token)
                        this.$store.dispatch("user/switchStatus", true)
                        this.$store.dispatch("user/addRole",2)
                        Api.supplier.getUser().then((response)=>{
                            if(response.data.status){
                                this.$store.dispatch("user/addSupplier", response.data.userData)
                            }
                        })
                        this.$router.push('/supplier')
                    }
                    // console.log("success fetch", res)
                })
                
            }else{
                console.log("fail validate")
            }
        }
    }
}


</script>

<style scoped>

</style>