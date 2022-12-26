<template>
    <Header />
    <logo-search/>

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
                    <div class="info__question active">
                        <div class="question">
                            <span class="title">Can I change my account email ?</span>
                            <i class="fas fa-sort-down icon"></i>
                        </div>
                        <p class="answer">
                            My Expe Lorem Ipsum Is Simply Dummy Text Of The printing and the project he Printing, Typesetting Industry. Lorem Ipsum Has he Printing And Typesetting Industry.
                        </p>
                    </div>
                    <div class="info__question">
                        <div class="question">
                            <span class="title">Can I change my account email ?</span>
                            <i class="fas fa-sort-down icon"></i>
                        </div>
                        <p class="answer">
                            My Expe Lorem Ipsum Is Simply Dummy Text Of The printing and the project he Printing, Typesetting Industry. Lorem Ipsum Has he Printing And Typesetting Industry.
                        </p>
                    </div>
                    <div class="info__question">
                        <div class="question">
                            <span class="title">Can I change my account email ?</span>
                            <i class="fas fa-sort-down icon"></i>
                        </div>
                        <p class="answer">
                            My Expe Lorem Ipsum Is Simply Dummy Text Of The printing and the project he Printing, Typesetting Industry. Lorem Ipsum Has he Printing And Typesetting Industry.
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

    <FooterVue />
</template>

<script>
import Api from "@/api"
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import LogoSearch from "@/components/LogoSearch.vue"
    export default {
        data() {
            return {
                bodyPrivacy:'',
                bodyTerms:'',
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
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
                        console.log(res)
                    }
                });
                await Api.general.getPrivcyAndPolicy().then((res)=>{
                    if(res.data.status){
                        console.log(res)
                        this.bodyPrivacy = res.data.body;
                    }
                });
                await Api.general.getTermsAndConditions().then((res)=>{
                    if(res.data.status){
                        console.log(res)
                        this.bodyTerms = res.data.body;
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>