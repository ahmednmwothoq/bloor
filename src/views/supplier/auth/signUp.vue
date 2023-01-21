<template>
    <link rel="stylesheet" href="/assets/css/user/sign.css">

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
            <div @click="this.$router.push('/')">
                <img class="left__img" src="/assets/images/logo/logo_blue.png" alt="Logo Bloor">
                <p class="left__text">{{ $t('login_subLogo') }}</p>
            </div>
            <div class="content_bottom">
                <p class="left__help" @click="this.$router.push('/faqs')">{{ $t('help') }}</p>
                <span class="icon__text">{{ $t('a_provider') }} <a class="cursor_pointer" @click="redirectTo({ val: 'supplierLogin' })">{{ $t('login_nav') }}</a></span>
            </div>
        </div>     
        <div class="content__right">
            <div class="header__nav">
                <a class="nav__item " @click="redirectTo({ val: 'supplierLogin' })">{{ $t('login_nav') }}</a>
                <a @click="redirectTo({ val: 'supplierSignUp' })" class="nav__item item__active">{{ $t('sign_up_nav') }}</a>
                <!-- <RouterLink to="/user-signup" class="nav__item">Sign up</RouterLink> -->
            </div>
            <div class="form">
                <div class="form__up">
                    <h2 class="right__title">{{ $t('sign_up_title') }}</h2>
                    <p class="right__text">{{ $t('sign_up_subtitle') }}</p>
                </div>
                <form @click.prevent action="" class="right__down form__down">
                    <div class="form__inputs">
                        <div class="form__field input_sm">
                            <label class="label">{{ $t('first_name') }}</label>
                            <input class="input" type="text" v-model="f_name" :placeholder="$t('first_name_place')">
                            <span class="feedback_error" v-if="v$.f_name.$error">{{ v$.f_name.$errors[0].$message }}</span>
                        </div>
                        <div class="offset_input"></div>
                        <div class="form__field input_sm">
                            <label class="label">{{ $t('last_name') }}</label>
                            <input class="input" type="text" v-model="l_name" :placeholder="$t('last_name_place')">
                            <span class="feedback_error" v-if="v$.l_name.$error">{{ v$.l_name.$errors[0].$message }}</span>
                        </div>
                        <!-- <div class="form_check_field">
                            <input type="checkbox" class="check__field">
                            <span class="check__text">Hide!</span>
                        </div> -->

                        <div class="form__field input_sm">
                            <label class="label">{{ $t('phone') }}</label>
                            <input class="input" type="text" v-model="phone" :placeholder="$t('Phone_place')">
                            <span class="feedback_error" v-if="v$.phone.$error">{{ v$.phone.$errors[0].$message }}</span>
                        </div><div class="offset_input"></div>
                        <div class="form__field input_sm">
                            <label class="label">{{ $t('e_mail') }}</label>
                            <input class="input" type="email" v-model="email" :placeholder="$t('email_place')">
                            <span class="feedback_error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                        </div>

                        <div class="form__field">
                            <label class="label">{{ $t('user_name') }}</label>
                            <input class="input" type="text" v-model="username" :placeholder="$t('user_name_place')">
                            <span class="feedback_error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
                        </div>

                        <!-- <div class="form__field">
                            <label class="label">Country</label>
                            <select class="input">
                                <option value="saudi-arabia">Saudi Arabia</option>
                                <option value="egypt">Egypt</option>
                                <option value="us">US</option>
                                <option value="uk">UK</option>
                            </select>
                        </div> -->

                        <div class="form__field input_sm">
                            <label class="label">{{ $t('gender') }}</label>
                            <!-- <input class="input" type="text" v-model="gender" placeholder="Gender" value="Female" > -->
                            <select class="input" v-model="gender">
                                <option selected disabled>{{ $t('gender_place') }}</option>
                                <option value="female">{{ $t('female') }}</option>
                                <option value="male">{{ $t('male') }}</option>
                            </select>
                            <span class="feedback_error" v-if="v$.gender.$error">{{ v$.gender.$errors[0].$message }}</span>
                        </div>
                        <div class="offset_input"></div>
                        <div class="form__field input_sm">
                            <label class="label">{{ $t('matrial_status') }}</label>
                            <!-- <input class="input" type="text" v-model="marital" placeholder="Marital status" value="Single" > -->
                            <select class="input" v-model="matrial_status">
                                <option selected disabled>{{ $t('matrial_status_place') }}</option>
                                <option value="single">{{ $t('single') }}</option>
                                <option value="married">{{ $t('married') }}</option>
                            </select>
                            <span class="feedback_error" v-if="v$.matrial_status.$error">{{ v$.matrial_status.$errors[0].$message }}</span>
                        </div>
                        
                        <div class="form__field">
                            <div>
                                <label class="label">{{ $t('date_of_birth') }}</label>
                                <span class="optional">( {{ $t('optional') }} )</span>
                            </div>
                            
                            <input class="input" type="date" v-model="date_of_birth" placeholder="Date Of Birth">
                            <!-- <span class="feedback_error" v-if="v$.date_of_birth.$error">{{ v$.date_of_birth.$errors[0].$message }}</span> -->
                        </div>
                        <!-- <div class="form_check_field">
                            <input type="checkbox" class="check__field">
                            <span class="check__text">Hide!</span>
                        </div> -->

                        <div class="form__field input_sm">
                            <label class="label">{{ $t('password_item') }}</label>
                            <input id="txtPassword_profile" class="input" type="password" v-model="password" :placeholder="$t('password_place')">
                            <span class="feedback_error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                            <!-- <span id="toggle_pwd_profile" class="fa fa-fw fa-eye field_icon"></span> -->
                        </div>
                        <div class="offset_input"></div>
                        <div class="form__field input_sm">
                            <label class="label">{{ $t('password_confirmation') }}</label>
                            <input class="input" type="password" v-model="password_confirmation" :placeholder="$t('password_confirmation_place')">
                            <span class="feedback_error" v-if="v$.password_confirmation.$error">{{ v$.password_confirmation.$errors[0].$message }}</span>
                            <!-- <span id="toggle_pwd_profile" class="fa fa-fw fa-eye field_icon"></span> -->
                        </div>
                    </div>
                    <div class="form__submit">
                        <button class="submit__btn" @click="signUpForm()" type="submit">{{ $t('sign_up_nav') }}</button>
                        <a class="btn__forgot cursor_pointer" @click="redirectTo({ val: 'supplierSignUp' })">{{ $t('forgot_password') }}</a>
                    </div>
                </form>
            </div>
        </div>
        
    </main>
    
    
</template>

<script>
import axios from "axios"
import Api from "@/api"
import router from '@/router'
import { mapActions } from 'vuex'
import useValidate from '@vuelidate/core'
import { required , minLength , maxLength , numeric , email , sameAs  } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
import cookie from "vue-cookie";


export default {
    name: "SignUp",
    data(){
        return {
            v$: useValidate(),
            f_name: "",
            l_name: "",
            email: "",
            phone: "",
            date_of_birth: "",
            gender: "",
            matrial_status: "",
            username: "",
            password: "",
            password_confirmation: "",
            step: 1
        }

    },
    validations () {
        return {
            f_name: {
                required,
            },
            l_name: {
                required,
            },
            email: {
                required,
                email
            },
            phone: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10),
            },
            gender: {
                required,
            },
            matrial_status: {
                required,
            },
            username: {
                required,
            },
            password: {
                required,
                minLength: minLength(8),
            },
            password_confirmation: {
                required,
                sameAsPassword: sameAs(this.password),
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
        // ...mapActions('authUser' , {
        //     signUpApi:"signUpApi",
        // }),
        changeLocale(locale) {
        // i18nn.locale = locale;
            this.$store.dispatch("user/switchLang", locale)
            this.$i18n.locale = locale;
            this.$router.go()
        },
        async signUpForm(){
            // console.log("sign now")
            const toast = useToast()
            this.v$.$validate();
            if(!this.v$.$error){
                // console.log("Success");
                const payload = {
                    f_name: this.f_name,
                    l_name: this.l_name,
                    username: this.username,
                    email: this.email,
                    phone: this.phone,
                    gender: this.gender,
                    matrial_status: this.matrial_status,
                    date_of_birth: this.date_of_birth,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                }
                await Api.authSupplier.register(payload).then((res) => {
                    // console.log("success fetch", res)
                    if(res?.data?.status){
                        router.push({ path: '/supplier-verify-email', query: { email: this.email } })
                    }
                    
                })
                // const res = await axios.post("https://klm.cdy.mybluehost.me/bloor-backend/api/register", payload ,{
                //     'Content-Language': 'en',
                // });
                // console.log(res)
                // await this.signUpApi(payload)

            }else{
                // console.log("fail validate")
                toast.error(`fail validate`,{
                    position: "top-right",
                    timeout: 3048,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                })
            }
        }
    },

}
</script>

<style scoped>

</style>