<template>
    <link rel="stylesheet" href="/assets/css/user/reset.css">
    <Header />

        <main class="__content">
            <img class="content__img" src="/assets/images/icon/forgot_passowd.png" alt="">
            <h2 class="content__title">{{ $t('verify_reset_title') }}</h2>
            <p class="content__text">{{ $t('verify_reset_subtitle') }}</p>
            <form @click.prevent action="" class="content__form">
                <div class="form__feild">
                    <label class="form__label" id="email_label" for="email">{{ $t('verify_code') }}</label>
                    <input :placeholder="$t('code_place')" v-model="code" type="text" class="form__input" />
                    <span class="feedback_error" v-if="v$.code.$error">{{ v$.code.$errors[0].$message }}</span>
                </div>
                <div class="">
                    <button @click="verfiyPassCodeForm()" class="form__btn" type="submit">{{ $t('next') }}</button>
                </div>
            </form>
        </main>

</template>

<script>
    import Api from "@/api"
    import { mapActions } from 'vuex'
    import useValidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators'
    import { useToast } from 'vue-toastification'
    // components
    import Header from "../../../components/Header.vue"
    export default {
        name: "VerifyEmail",
        components: {
            Header
        },
        data(){
            return {
                v$: useValidate(),
                code: "",
            }

        },
        validations () {
            return {
                code: {
                    required,
                }
            }
        },
        setup() {
        },
        mounted(){
            // let Remail = this.$route.query.email
            // // let user = localStorage.getItem("token")
            // if(!Remail){
            //     this.redirectTo({ val: "userLogin" })
            // }
        },
        methods:{
            ...mapActions(['redirectTo']),
            ...mapActions(['redirectToPath']),
            // ...mapActions('authUser' , {
            //     verifyEmailApi:"verifyEmailApi",
            //     userProfile:"userProfile",
            // }),
            async verfiyPassCodeForm(){
                this.v$.$validate();
                const toast = useToast()
                if(!this.v$.$error){
                    // console.log("Success")
                    // console.log(this.code , this.$route.query.email)
                    const payload ={
                        code: this.code,
                        email: this.$route.query.email
                    }
                    try {
                        await Api.authUser.verifyRestPassCode(payload).then((res) => {
                            // console.log("success fetch", res)
                            if(res?.data?.status){
                                // console.log(res.data)
                                this.$store.dispatch("user/addToken", res.data.body.token)
                                this.$store.dispatch("user/switchStatus", true)
                                this.$router.push({ path: '/user-reset-password', query: { email: this.$route.query.email } })
                            }
                            
                        })
                    } catch (error) {
                        // console.log(error);
                    }

                }else{
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
        }


    }
</script>

<style scoped>

</style>