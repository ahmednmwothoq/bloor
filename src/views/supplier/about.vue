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
                <main class="_aboutus_content_sup">
                    <div class="section__upper">
                        <div class="section__home">
                            <h2 class="sec__title">About</h2>
                            <h2 class="sect__subtitle">Us</h2>
                            <p class="sec__text">Explore our agency and goals Lorim lipsum lorim lipsum......</p>
                            <a href="" class="sec__link">
                                Show More
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
                            <h2 class="sec__title mb-5">Who We Are?</h2>
                            <!-- <p class="sect__subtitle">Welcome To <img src="/assets/images/logo/logo2.png" alt=""> Lives Here!</p> -->
                            <p class="sec__text" v-html="aboutUs"></p>
                        </div>
                    </div>
                    <div class="section__second">
                        <div class="section__info">
                            <h2 class="sec__title">Our Message</h2>
                            <p class="sec__text" v-html="OurMessages"></p>
                            <!-- <img class="sec_shape" src="/assets/images/gallary/Path.png" alt="" > -->
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
                            <h2 class="sec__title">Business Vision</h2>
                            <p class="sec__text" v-html="OurVission"></p>
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
                showDivAddProduct: false,
                showOverlay: false,
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
                    {
                        id:5,
                        name: "Notifications",
                        active: '',
                        url:'/supplier/notifications'
                    },
                    {
                        id:6,
                        name: "Complaints",
                        active: '',
                        url:'/supplier/complaints'
                    },
                    {
                        id:7,
                        name: "FAQs",
                        active: '',
                        url:'/supplier/faqs'
                    },
                    {
                        id:8,
                        name: "Privacy Policy",
                        active: '',
                        url:'/supplier/privacy-policy'
                    },
                    {
                        id:9,
                        name: "Terms & Conditions",
                        active: '',
                        url:'/supplier/terms-conditions'
                    },
                    {
                        id:10,
                        name: "About us",
                        active: 'active',
                        url:'/supplier/about-us'
                    },
                    {
                        id:11,
                        name: "Contact us",
                        active: '',
                        url:'/supplier/contact-us'
                    },
                    
                ],
                aboutUs: '',
                OurMessages: '',
                OurVission: '',
            }
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