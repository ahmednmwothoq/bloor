<template>

    <Header />

    <div class="content_slide">
        <span class="toggle_side"  @click="isActive =! isActive" >
            <i class="fas fa-list-ul icon"></i>
        </span>
        <div :class="isActive ? `slidebar openNavClass` : `slidebar `">
           <list-supplier :sideList="sideList" />
        </div>
        <div class="all">
           <div class="all__up">
            <header-image />
            <header-icons />
           </div>
           <div class="all__down">
            <div class="section">
                <main class="_online_content">
                    <div class="left__content">
                        <h1 class="left__title">{{ $t('online_complaint_po') }}</h1>
                        <p class="left__text">{{ $t('online_complaint_con') }}</p>
                        <form action="" class="left__form">
                            <textarea placeholder="Type Here Your Complaint" class="form__textarea" name="" id="" cols="30" rows="10"></textarea>
                            <button class="form__btn" type="submit">Register</button>
                        </form>
                    </div>
                    <img class="right__image" src="/assets/images/gallary/online2.png" alt="">
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
                isActive: false,
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
                        active: 'active',
                        url:'/supplier/complaints'
                    },
                    {
                        id:7,
                        name: "FAQs",
                        active: '',
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
        }
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
  /* width: 95%!important;
  margin: 0 auto; */
}
.section{
    /* width: 75vw; */
    margin-top: 50px!important;
    /* margin: 0 auto; */
}
</style>