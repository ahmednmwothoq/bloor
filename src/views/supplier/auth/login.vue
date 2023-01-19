
<template>
    <link rel="stylesheet" href="/assets/css/user/login.css">
    <!-- Start Content -->
    <div class="lang_change">
        <div v-for="(locale, index) in availableLocales">
          <a class="header__item" @click="changeLocale(locale)" v-if="locale !== this.$i18n.locale">
            <i class="item__icon far fa-globe"></i>
            <span class="item__text custom_lang">{{ locale }}</span>
          </a>
        </div>
    </div>
    <main class="__content">
        <div class="content__left">
            <div>
                <img class="left__img" src="/assets/images/logo/logo_blue.png" alt="Logo Bloor">
                <p class="left__text">{{ $t('login_subLogo') }}</p>
            </div>
                
            <div class="content_bottom">
                <p class="left__help">{{ $t('help') }}</p>
                <span class="icon__text">{{ $t('a_new_provider') }} <a class="cursor_pointer" @click="redirectTo({ val: 'supplierSignUp' })">{{ $t('sign_up_nav') }}</a></span>
            </div>
        </div>       
        <div class="content__right">
            <div class="header__nav">
                <a class="nav__item item__active" @click="redirectTo({ val: 'supplierLogin' })">{{ $t('login_nav') }}</a>
                <a @click="redirectTo({ val: 'supplierSignUp' })" class="nav__item">{{ $t('sign_up_nav') }}</a>
                <!-- <RouterLink to="/user-signup" class="nav__item">Sign up</RouterLink> -->
            </div>
            <div class="form">
                <div class="form__up">
                    <h2 class="right__title">{{ $t('login_title') }}</h2>
                    <p class="right__text">{{ $t('login_subtitle') }}</p>
                </div>
                <form @click.prevent class="right__down" action="" >
                    <div class="form__inputs">
                        <div class="form__input">
                            <label class="label__field">{{ $t('email_item') }}</label>
                            <input type="email" v-model="email" class="input__field" :placeholder="$t('email_place')" required>
                            <span class="feedback_error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                        </div>
                        <div class="form__input password">
                            <label class="label__field">{{ $t('password_item') }}</label>
                            <input type="password" v-model="password" class="input__field" :placeholder="$t('password_place')">
                        <span class="feedback_error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                        </div>
                        <!-- <div class="form__check">
                            <input type="checkbox" class="check__field">
                            <span class="check__text">Remember Me</span>
                        </div> -->
                    </div>
                    <div class="form__submit">
                        <button class="submit__btn" @click="loginForm()" type="submit">{{ $t('login_nav') }}</button>
                        <a class="btn__forgot" @click="this.$router.push('/supplier-forget-pass')" >{{ $t('forgot_password') }}</a>
                    </div>
                </form>
            </div>
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
import cookie from "vue-cookie";

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
        availableLocales () {
        if(cookie.get("lang") == null){
          return ['ar']
        }else{
          return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
        }
        
      },
    },
    methods:{
        ...mapActions(['redirectTo']),
        ...mapActions(['redirectToPath']),
        changeLocale(locale) {
        // i18nn.locale = locale;
            this.$store.dispatch("user/switchLang", locale)
            this.$i18n.locale = locale;
            this.$router.go()
        },
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