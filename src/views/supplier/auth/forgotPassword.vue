<template>
    <link rel="stylesheet" href="/assets/css/user/reset.css">
    <Header />

        <main class="__content">
            <img class="content__img" src="/assets/images/icon/forgot_passowd.png" alt="">
            <h2 class="content__title">{{ $t('forgot_password') }}</h2>
            <p class="content__text">{{ $t('email_place') }}</p>
            <form @click.prevent action="" class="content__form">
                <div class="form__feild">
                    <label class="form__label" id="email_label" for="email">{{ $t('e_mail') }}</label>
                    <input :placeholder="$t('email_place')" v-model="email" type="email" class="form__input" />
                    <span class="feedback_error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                </div>
                <div class="">
                    <button @click="forgetPassForm()" class="form__btn" type="submit">{{ $t('next') }}</button>
                </div>
            </form>
        </main>

</template>

<script>
    import Api from "@/api"
    import { mapActions } from 'vuex'
    import useValidate from '@vuelidate/core'
    import { required , email } from '@vuelidate/validators'
    import { useToast } from 'vue-toastification'
    // components
    import Header from "@/components/Header.vue"
    export default {
        name: "ForgetPassword",
        components: {
            Header
        },
        data(){
            return {
                v$: useValidate(),
                email: "",
            }

        },
        validations () {
            return {
                email: {
                    required,
                    email
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
            async forgetPassForm(){
                this.v$.$validate();
                const toast = useToast()
                if(!this.v$.$error){
                    const payload ={
                        email: this.email,
                    }
                    try {
                        await Api.authSupplier.forgotPassword(payload).then((res) => {
                            // console.log("success fetch", res)
                            if(res?.data?.status){
                                this.$router.push({ path: '/supplier-verify-code', query: { email: this.email } })
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