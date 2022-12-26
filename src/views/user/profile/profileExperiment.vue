<template>
    <profile-nav-vue :sideList="sideList" />

    <div class="contentStander">
        <div v-for="item in experiments" :key="item.id" v-if="noData">
            <item-experience-third :item="item" :user="user" />
        </div>
        <div v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                No Data Here
            </div>
        </div>
    </div>

    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import ProfileNavVue from '@/components/ProfileNav.vue';
import FooterVue from '@/components/Footer.vue';
import ItemExperienceThird from "@/components/ItemExperienceThird.vue"
    export default {
        components:{
            ProfileNavVue,
            FooterVue,
            ItemExperienceThird,
        },
        data(){
            return {
                sideList: [
                    {
                        id:1,
                        name: "details",
                        active: '',
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
                        active: 'active',
                        url:'/user-experiment'
                    }
                    
                ],
                experiments: null,
                user: JSON.parse(cookie.get('userData')),
                noData:false,
            }
        },
        mounted() {
            this.getDataExperiments()
            console.log(this.user)
        },
        methods: {
            async getDataExperiments(){
                await Api.user.userGetAllExperiments().then((res)=>{
                    if(res.data.status){
                        console.log("user",res.data)
                        this.experiments = res.data.body;
                        if(res.data.body.length > 0){
                            this.noData = true
                        }else{
                            this.noData = false
                        }
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>