<template>
    <profile-nav-vue :sideList="sideList" @search="search" />

    <div class="contentStander">
        <div v-for="item in paginatedData" :key="item.id" v-if="paginatedData.length > 0">
            <item-experience-third :item="item" :user="user" />
        </div>
        <div v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                {{ $t('no_data_here') }}
            </div>
        </div>

        <div class="m-auto w-90" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
            <pagination 
                v-if="experiments.length > 0" 
                v-model="page_index" 
                :records="experiments.length" 
                :per-page="page_size" 
                @paginate="myCallback"
            />
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
import Pagination from 'v-pagination-3';
    export default {
        components:{
            ProfileNavVue,
            FooterVue,
            ItemExperienceThird,
            Pagination,
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
                    {
                        id:2,
                        name: "reviews",
                        active: '',
                        url:'/user-review'
                    },
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
                experiments: [],
                user: JSON.parse(cookie.get('userData')),
                noData:false,
                searchValue: '',
                page_index: 1,
                page_size: 4
            }
        },
        mounted() {
            this.getDataExperiments()
            // console.log()
        },
        computed: {
            filteredList() {
                return this.experiments.filter(post => {
                    return post.body.toLowerCase().includes(this.searchValue.toLowerCase())
                })
            },
            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.filteredList.slice(start, end);
            }
        },
        methods: {
            async getDataExperiments(){
                await Api.user.userGetAllExperiments().then((res)=>{
                    if(res.data.status){
                        // console.log("user",res.data)
                        this.experiments = res.data.body;
                        if(res.data.body.length > 0){
                            this.noData = true
                        }else{
                            this.noData = false
                        }
                    }
                })
            },
            search(event){
                this.searchValue = event
                // console.log(this.rateValue)
            },
            myCallback(event){
                // console.log(event);
                this.page_index = event
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>