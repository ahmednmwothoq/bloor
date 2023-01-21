<template>
    <!-- <link rel="stylesheet" href="/assets/css/user/profile_reviews.css"> -->

    <profile-nav-vue :sideList="sideList" />

    <div class="contentStander w-100" style="margin-top: 15vw;">
        <div v-for="item in paginatedData" :key="item.id" v-if="paginatedData.length > 0">
            <item-review :itemProduct="item.product[0]" :itemReview="item.review[0]"  />
        </div>
        <div v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                {{ $t('no_data_here') }}
            </div>
        </div>

        <div class="m-auto w-90" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
            <pagination 
                v-if="reviews.length > 0" 
                v-model="page_index" 
                :records="reviews.length" 
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
    import ItemReview from "@/components/ItemReview.vue"
    import Pagination from 'v-pagination-3';
    export default {
        name: "ProfileReview",
        components:{
            ProfileNavVue,
            FooterVue,
            Pagination,
            ItemReview,
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
                        active: 'active',
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
                        active: '',
                        url:'/user-experiment'
                    }
                    
                ],
                reviews: [],
                user: JSON.parse(cookie.get('userData')),
                page_index: 1,
                page_size: 2
            }
        },
        mounted() {
            this.getDataReviews()
            // console.log()
        },
        computed: {
            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.reviews.slice(start, end);
            }
        },
        methods: {
            async getDataReviews(){
                await Api.user.userGetAllReviews().then((res)=>{
                    if(res.data.status){
                        console.log("userGetAllReviews",res.data)
                        this.reviews = res.data.body;
                    }
                })
            },
            myCallback(event){
                // console.log(event);
                this.page_index = event
            },
        },
    }
</script>

<style  scoped>

</style>