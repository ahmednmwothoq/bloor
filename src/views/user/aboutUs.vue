<template>
    <div> 
        <Header />
            <logo-search/>

            <main class="_aboutus_content">
                <div class="section__upper">
                    <div class="section__home">
                        <h2 class="sec__title">{{ $t('about') }}</h2>
                        <h2 class="sect__subtitle">{{ $t('us') }}</h2>
                        <p class="sec__text">{{ $t('about_desc') }}</p>
                        <a  class="sec__link">
                            {{ $t('show_more') }}
                            <i class="fal fa-chevron-down"></i>
                        </a>
                    </div>
                    <div class="section__image">
                        <img src="/assets/images/gallary/about_us.png" alt="" class="sec__img">
                        <div class="sec_rect rect_large rect_right"></div>
                    </div>
                </div>
                <div class="section__first">
                    <div class="section__image">
                        <img src="/assets/images/gallary/happyworkersclose.png" alt="" class="sec__img">
                        <div class="sec_rect rect_small rect_left"></div>
                    </div>
                    <div class="section__info">
                        <h2 class="sec__title mb-5">{{ $t('who_we_are') }}</h2>
                        <!-- <p class="sect__subtitle">Welcome To <img src="/assets/images/logo/logo2.png" alt=""> Lives Here!</p> -->
                        <p class="sec__text" v-html="aboutUs"></p>
                    </div>
                </div>
                <div class="section__second">
                    <div class="section__info">
                        <h2 class="sec__title">{{ $t('our_message') }}</h2>
                        <p class="sec__text" v-html="OurMessages"></p>
                        <img class="sec_shape" src="/assets/images/gallary/Path.png" alt="" >
                    </div>
                    <div class="section__image">
                        <img src="/assets/images/gallary/businessmen.png" alt="" class="sec__img">
                        <div class="sec_rect rect_mid rect_right"></div>
                    </div>
                </div>
                <div class="section__third">
                    <div class="section__image">
                        <img src="/assets/images/gallary/kisspngvision.png" alt="" class="sec__img">
                    </div>
                    <div class="section__info">
                        <h2 class="sec__title">{{ $t('business_vision') }}</h2>
                        <p class="sec__text" v-html="OurVission"></p>
                    </div>
                </div>
                
            </main>

        <Footer />
    </div>
</template>

<script>
    import Api from "@/api"
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"
    import LogoSearch from "@/components/LogoSearch.vue"
    export default {
        data() {
            return {
                aboutUs: '',
                OurMessages: '',
                OurVission: '',
            }
        },
        components: {
            Header,
            Footer,
            LogoSearch,
        },
        mounted() {
            this.getAboutUs()
        },
        methods: {
            async getAboutUs(){
                await Api.general.getAboutUs().then((res)=>{
                    console.log(res)
                    this.aboutUs = res.data.body
                });
                await Api.general.getOurMessages().then((res)=>{
                    console.log(res)
                    this.OurMessages = res.data.body
                });
                await Api.general.getOurVission().then((res)=>{
                    console.log(res)
                    this.OurVission = res.data.body
                });
            }
        },
    }
</script>

<style scoped>

</style>