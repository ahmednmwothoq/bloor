<template>
    <Header />
    <logo-search/>
    <div class="contentStander mt-1 w-100">
        <div class="item_review" v-if="review">
            <div class="review__up">
                <div class="contan">
                    <img class="up__img" src="/assets/images/avatar/user-img.jpg" alt="">
                    <div class="up__info">
                        <span class="name">Supplier Name #{{ review.username }}</span>
                        <!-- <span class="follow">Follow</span> -->
                    </div>
                </div>
                <div class="up__time">
                    <span>
                        <CreateAt :create="review.created_at" />
                    </span>
                </div>
            </div>
            <div class="review_mid">
                <div class="mid__left">
                    <span class="car">{{ getLocales ? review.product_ar : review.product_en }}</span>
                    <a :href="review.link" class="edit">{{ review.link }}</a>
                </div>
                <div class="mid__rigth">
                    <img :src="review.media[0].original_url" alt="" class="image">
                </div>
            </div>
            
                
            <div class="review__down" v-if="getLocales" v-html="review.questionnaire_ar"></div>
            <div class="review__down" v-if="!getLocales" v-html="review.questionnaire_en"></div>
        </div>
    </div>


    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import CreateAt from "@/components/CreateAt.vue"
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import LogoSearch from "@/components/LogoSearch.vue"
    export default {
        data(){
            return {
                idRev: this.$route.params.id,
                review: null,
                showComments: false,
                showAddComments: false,
                showMoreDetails: false,
                showMoreDetailsTog: false,
                showReplayCommentDiv: false,
                ReplayCommentId: null,
                halfBody: '',
                bodyComment: '',
                bodyReplayCom: '',
                bodyCommentEdit: '',
                bodyReplayCommentEdit: '',
                replaysComments: [],
                indexx:1,
                userLogin: JSON.parse(cookie.get('userData')),
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
        },
        mounted() {
            // console.log(this.idEx)
            this.getSingleExperience()
        },
        computed: {
            getLocales () {
                let local = this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
                if(local[0] == 'en'){
                return true
                } else {
                return false
                }
            },
        },  
        methods: {
            async getSingleExperience(){
                await Api.user.userGetSingleExperiments(this.idRev).then((res)=>{
                    if(res.data.status){
                        console.log("user",res.data)
                        this.review = res.data.body;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>