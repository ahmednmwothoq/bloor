<template>
    <!-- <link rel="stylesheet" href="/assets/css/user/profile_details.css"> -->

    <profile-nav-vue :sideList="sideList" />

    <main class="profile_detail_content">
        <div class="person__details">
            <div class="form mt-5" v-if="profile">
                <div class="form__field input_sm">
                    <label class="label">First Name</label>
                    <input class="input" type="text" v-model="profile.f_name" placeholder="First Name" disabled>
                </div><div class="offset_input"></div>
                <div class="form__field input_sm">
                    <label class="label">Last Name</label>
                    <input class="input" type="text" v-model="profile.l_name" placeholder="Last Name"  disabled>
                </div>

                <div class="form__field input_sm">
                    <label class="label">Phone</label>
                    <input class="input" type="number" v-model="profile.phone" placeholder="Phone"  disabled>
                </div><div class="offset_input"></div>
                <div class="form__field input_sm">
                    <label class="label">E-mail</label>
                    <input class="input" type="text" v-model="profile.email" placeholder="E-mail"  disabled>
                </div>

                <div class="form__field">
                    <label class="label">User Name</label>
                    <input class="input" type="text" v-model="profile.username" placeholder="User Name"  disabled>
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
                    <input class="input" type="text" v-model="profile.gender" placeholder="Gender" disabled>
                </div><div class="offset_input"></div>
                <div class="form__field input_sm">
                    <label class="label">Marital status</label>
                    <input class="input" type="text" v-model="profile.matrial_status" placeholder="Marital status" disabled>
                </div>
                
                <div class="form__field mb-5">
                    <span class="optional">(Optional)</span>
                    <label class="label">Date Of Birth</label>
                    <input class="input" type="text" v-model="dateB" placeholder="Date Of Birth"  disabled>
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
// import "$$/assets/css/user/profile_details.css"
import Api from "@/api"
import ProfileNavVue from '@/components/ProfileNav.vue';
import FooterVue from '@/components/Footer.vue';
    export default {
        name: "ProfileDetails",
        components:{
            ProfileNavVue,
            FooterVue
        },
        data(){
            return {
                profile: null,
                dateB: '',
                error: null,
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
                    
                ]
            }
        },
        mounted() {
            this.getDataUser()
            // console.log(cookie.get("userData"));
            // console.log(this.profile);
        },
        methods: {
            async getDataUser(){
                await Api.user.getUser().then((res)=>{
                    if(res.data.status){
                        // this.addUser()
                        this.$store.dispatch("user/addUser", res.data.userData)
                        // console.log("user",this.$store.getters["user/getUser"])
                        this.profile = res.data.userData;
                        this.CreateAtDate(this.profile.date_of_birth)
                    }
                })
            },
            CreateAtDate(create_at){
                const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                // const date = create_at.split('.')[0].split('T')[0]
                const date = create_at
                const d = new Date(`${date}`);
                const month = months[d.getMonth()];
                const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
                this.dateB = last
            }
        },
    }
    // src="$$/assets/css/user/profile_details.css"
</script>


<style  scoped >

</style>