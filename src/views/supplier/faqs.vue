<template>

    <Header />

    <div class="content_slide">
        <div class="slidebar">
           <list-supplier :sideList="sideList" />
        </div>
        <div class="all">
           <div class="all__up">
            <header-image />
            <header-icons />
           </div>
           <div class="all__down">
            <div class="section">
                <main class="_faqs_content">
                    <div class="content__left">
                        <a @click="showFAQs('theDivFAQs')" class="left__title">{{ $t('faqs') }}</a>
                        <a @click="showPrivacy('theDivPrivacy')" class="left__title">{{ $t('privacy_policy') }}</a>
                        <a @click="showTerms('theDivTerms')" class="left__title">{{ $t('terms_conditions') }}</a>
                    </div>
                    <div class="content__right" >
                        <div class="right__details" id="theDivFAQs">
                            <h2 class="right__title">{{ $t('faqs') }}</h2>
                            <div class="right__info">
                                <div :id="'itm'+index" class="info__question" v-for="(item, index) in bodyFAQ" :key="index">
                                    <div class="question" @click="showHideFAQ('itm'+index)">
                                        <span class="title">{{ item.question }}</span>
                                        <i  class="fas fa-sort-down icon"></i>
                                    </div>
                                    <p class="answer">
                                        {{ item.answer }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="right__details" id="theDivPrivacy" style="display: none;">
                            <h2 class="right__title">{{ $t('privacy_policy') }}</h2>
                            <div class="right__info">
                                <p class="info__text" v-html="bodyPrivacy"></p>
                            </div>
                        </div>
                        <div class="right__details" id="theDivTerms" style="display: none;">
                            <h2 class="right__title blue">{{ $t('terms_conditions') }}</h2>
                            <div class="right__info">
                                <p class="info__text" v-html="bodyTerms"></p>
                            </div>
                        </div>
                        
                    </div>
                    
                </main>
            </div>
           </div>
        </div>
    </div>

</template>

<script>
    import Api from "@/api"
    import Header from "@/components/Header.vue"
    import ListSupplier from "@/components/supplier/ListSupplier.vue"
    import HeaderImage from "@/components/supplier/HeaderImage.vue"
    import HeaderIcons from "@/components/supplier/HeaderIcons.vue"
    // import aboutUsVue from '../user/aboutUs.vue';
    export default {
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            // aboutUsVue,
            // ErrorList
        },
        data() {
            return {
                bodyPrivacy:'',
                bodyTerms:'',
                bodyFAQ:[],
                fristFAQ:{},
                sideList: [
                    {
                        id:1,
                        name: "Overview",
                        active: '',
                        url:'/supplier'
                    },
                    {
                        id:2,
                        name: "Products",
                        active: '',
                        url:'/supplier/products'
                    },
                    {
                        id:3,
                        name: "Offers",
                        active: '',
                        url:'/supplier/offers'
                    },
                    {
                        id:4,
                        name: "Chats",
                        active: '',
                        url:'/supplier/chats'
                    },
                    // {
                    //     id:5,
                    //     name: "Notifications",
                    //     active: '',
                    //     url:'/supplier/notifications'
                    // },
                    {
                        id:6,
                        name: "Complaints",
                        active: '',
                        url:'/supplier/complaints'
                    },
                    {
                        id:7,
                        name: "FAQs",
                        active: 'active',
                        url:'/supplier/faqs'
                    },
                    // {
                    //     id:8,
                    //     name: "Privacy Policy",
                    //     active: '',
                    //     url:'/supplier/privacy-policy'
                    // },
                    // {
                    //     id:9,
                    //     name: "Terms & Conditions",
                    //     active: '',
                    //     url:'/supplier/terms-conditions'
                    // },
                    {
                        id:10,
                        name: "About us",
                        active: '',
                        url:'/supplier/about-us'
                    },
                    {
                        id:11,
                        name: "Contact us",
                        active: '',
                        url:'/supplier/contact-us'
                    },
                    
                ],
                
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            showFAQs(txtDivID){
                $("#"+txtDivID).toggle(400);
            },
            showPrivacy(txtDivID){
                $("#"+txtDivID).toggle(400);
            },
            showTerms(txtDivID){
                $("#"+txtDivID).toggle(400);
            },
            async getData(){
                await Api.general.getAllFaqs().then((res)=>{
                    if(res.data.status){
                        // console.log(res)
                        this.bodyFAQ = res.data.body;
                        this.fristFAQ = this.bodyFAQ[0];
                    }
                });
                await Api.general.getPrivcyAndPolicy().then((res)=>{
                    if(res.data.status){
                        // console.log(res)
                        this.bodyPrivacy = res.data.body;
                    }
                });
                await Api.general.getTermsAndConditions().then((res)=>{
                    if(res.data.status){
                        // console.log(res)
                        this.bodyTerms = res.data.body;
                    }
                });
            },
            showHideFAQ(item){
                $("#"+item).toggleClass("active");
                // console.log("hnkj")
            }
            
        },
    }
</script>

<style scoped>
.all{
    display: flex;
    flex-direction: column;
}
.all .all__up{
    display: flex;
    justify-content: flex-end;
    width: 95%;
    margin: 0 auto;
}
.all .all__down {
  width: 95%!important;
  margin: 0 auto;
}
.section{
    width: 75vw;
    margin-top: 50px;
}
</style>