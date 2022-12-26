<template>
    <link rel="stylesheet" href="/assets/css/user/edit_profile.css">

    <profile-nav-vue :sideList="sideList" />

    <main class="profile_edit_content">
        <div class="person__info mt-5">
            <div class="btns mt-2">
                <a @click="redirectToPath({ val: '/user-profile' })" class="btn_form btn_cancel">Cancel</a>
                <a @click.prevent="updateDataUser" class="btn_form btn_save">Save</a>
            </div>
        </div>
        <div class="person__details mt-5">
            <div class="form " v-if="profile">
                <div class="form__field input_sm">
                    <label class="label">First Name</label>
                    <input class="input" type="text" v-model="profile.f_name" placeholder="First Name">
                    <span class="feedback_error" v-if="v$.profile.f_name.$error">{{ v$.profile.f_name.$errors[0].$message }}</span>
                </div><div class="offset_input"></div>
                <div class="form__field input_sm">
                    <label class="label">Last Name</label>
                    <input class="input" type="text" v-model="profile.l_name" placeholder="Last Name">
                    <span class="feedback_error" v-if="v$.profile.l_name.$error">{{ v$.profile.l_name.$errors[0].$message }}</span>
                </div>

                <div class="form__field input_sm">
                    <label class="label">Phone</label>
                    <input class="input" type="text" v-model="profile.phone" placeholder="Phone">
                    <span class="feedback_error" v-if="v$.profile.phone.$error">{{ v$.profile.phone.$errors[0].$message }}</span>
                </div><div class="offset_input"></div>
                <div class="form__field input_sm">
                    <label class="label">E-mail</label>
                    <input class="input" type="text" v-model="profile.email" placeholder="E-mail">
                    <span class="feedback_error" v-if="v$.profile.email.$error">{{ v$.profile.email.$errors[0].$message }}</span>
                </div>

                <div class="form__field">
                    <label class="label">User Name</label>
                    <input class="input" type="text" v-model="profile.username" placeholder="User Name">
                    <span class="feedback_error" v-if="v$.profile.username.$error">{{ v$.profile.username.$errors[0].$message }}</span>
                </div>

                <!-- <div class="form__field">
                    <label class="label">Bio</label>
                    <input id="input_pro_file" class="input" type="file" name="bio" placeholder="Bio">
                    <span onclick="document.getElementById('input_pro_file').click()" class="files"></span>
                </div> -->

                <!-- <div class="form__field">
                    <label class="label">Country</label>
                    <input class="input" type="text" name="country" placeholder="Country" value="Saudi Arabia" disabled>
                </div> -->

                <div class="form__field input_sm">
                    <label class="label">Gender</label>
                    <select class="input" v-model="profile.gender">
                        <option value="female" :selected="profile.gender =='female'">Female</option>
                        <option value="male" :selected="profile.gender =='male'">Male</option>
                    </select>
                    <span class="feedback_error" v-if="v$.profile.gender.$error">{{ v$.profile.gender.$errors[0].$message }}</span>
                </div><div class="offset_input"></div>
                <div class="form__field input_sm">
                    <label class="label">Marital status</label>
                    <select class="input" v-model="profile.matrial_status">
                        <option value="single" :selected="profile.matrial_status =='single'">Single</option>
                        <option value="married" :selected="profile.matrial_status =='married'">Married</option>
                    </select>
                    <span class="feedback_error" v-if="v$.profile.matrial_status.$error">{{ v$.profile.matrial_status.$errors[0].$message }}</span>
                </div>
                
                <div class="form__field mb-5">
                    <span class="optional">(Optional)</span>
                    <label class="label">Date Of Birth</label>
                    <input class="input" type="date" v-model="profile.date_of_birth" placeholder="Date Of Birth" >
                </div>

                <!-- <div class="form__field">
                    <label class="label">Password</label>
                    <input class="input border_none" type="password" name="password" placeholder="Password" value="September" disabled>
                </div> -->
            </div>
        </div>
    </main>

    <FooterVue />
</template>

<script>
import cookie from "vue-cookie";
import Api from "@/api"
// import router from '@/router'
import { mapActions } from 'vuex'
import ProfileNavVue from '@/components/ProfileNav.vue';
import FooterVue from '@/components/Footer.vue';
import useValidate from '@vuelidate/core'
import { required , minLength , maxLength , numeric , email , sameAs  } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
    export default {
        name: "editProfilePage",
        components:{
            ProfileNavVue,
            FooterVue
        },
        data(){
            return {
                v$: useValidate(),
                // profile: null,
                profile:{
                    f_name: '',
                    l_name: '',
                    email: '',
                    phone: '',
                    gender: '',
                    matrial_status: '',
                    username: '',
                    sideList: [
                    {
                        id:1,
                        name: "details",
                        active: 'active',
                        url:'/user-profile'
                    },
                    // {
                    //     id:2,
                    //     name: "reviews",
                    //     active: '',
                    //     url:'/user-review'
                    // },
                    {
                        id:3,
                        name: "chats",
                        active: '',
                        url:'/user-chat'
                    },
                    {
                        id:4,
                        name: "experiments",
                        active: '',
                        url:'/user-experiment'
                    }
                    
                ],
                    
                }
            }
        },
    validations () {
        return {
            profile:{
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
                }
            }
        }

    },
    mounted() {
        this.getDataUser()
    },
    methods: {
        ...mapActions(['redirectToPath']),
        async getDataUser(){
            await Api.user.getUser().then((res)=>{
                if(res.data.status){
                    // this.addUser()
                    // JSON.parse(json)
                    this.$store.dispatch("user/addUser", res.data.userData)
                    // console.log("user",this.$store.getters["user/getUser"])
                    this.profile = res.data.userData;
                }
            })
        },
        async updateDataUser(){
            const toast = useToast()
            this.v$.$validate();
            if(!this.v$.$error){
                const payload = {
                    f_name: this.profile.f_name,
                    l_name: this.profile.l_name,
                    username: this.profile.username,
                    email: this.profile.email,
                    phone: this.profile.phone,
                    gender: this.profile.gender,
                    matrial_status: this.profile.matrial_status,
                    date_of_birth: this.profile.date_of_birth,
                }
                const fromData = new FormData();
                fromData.append('f_name', this.profile.f_name);
                fromData.append('l_name',this.profile.l_name);
                fromData.append('username',this.profile.username);
                fromData.append('email',this.profile.email);
                fromData.append('phone',this.profile.phone);
                fromData.append('gender',this.profile.gender);
                fromData.append('matrial_status',this.profile.matrial_status);
                fromData.append('date_of_birth',this.profile.date_of_birth);
                
                // console.log(payload)
                await Api.user.updateUser(payload).then((res) => {
                    // console.log("success fetch", res)
                    if(res?.data?.status){
                        this.redirectToPath({ val: '/user-profile' })
                    }
                })

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
    },
    }
</script>

<style  scoped>

</style>