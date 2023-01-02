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
                <main class="_contact_us_content flex-column mb-5"> 
                    <div class="left_contact_us_content">
                        <h1 class="left__title">{{ $t('get_in_touch') }} !</h1>
                        <p class="left__text">{{ $t('get_in_touch_con') }}</p>
                        <img src="/assets/images/gallary/get_touch.png" alt="" class="left__image">
                        <div class="left_icons">
                            <i class="fab fa-facebook-f icon"></i>
                            <i class="fab fa-twitter icon"></i>
                            <i class="fab fa-instagram icon"></i>
                        </div>
                    </div>
                    <div class="right_contact_us_content">
                        <div class="right__icons">
                            <div class="__icon">
                                <i class="far fa-map-marker-alt icon"></i>
                                <span class="text">105 Street 90,Blo</span>
                            </div>
                            <div class="__icon">
                                <i style="transform:rotate(90deg);" class="fal fa-phone icon"></i>
                                <span class="text">+02 98 754 6544</span>
                            </div>
                            <div class="__icon">
                                <div class="email icon">
                                    <i class="fal fa-envelope first_icon"></i>
                                    <i class="far fa-at second_icon"></i>
                                </div>
                                <span class="text">hello@gmail.com</span>
                            </div>            
                        </div>
                        <div class="right__form">
                            <form action="" @click.prevent>
                                <div class="inputs">
                                    <h2 class="inputs_title">{{ $t('contact_from') }}</h2>
                                    <div class="inputs_fields">
                                        <div class="fields_left">
                                            <div class="left_input">
                                                <label for="">{{ $t('subject_item') }}</label>
                                                <input :placeholder="$t('subject_item')" type="text" v-model="subject" id="">
                                            </div>
                                            <div class="left_input">
                                                <label for="">{{ $t('name_item') }}</label>
                                                <input :placeholder="$t('name_item')" type="text" v-model="name" id="">
                                            </div>
                                            <div class="left_input">
                                                <label for="">{{ $t('email_item') }}</label>
                                                <input :placeholder="$t('email_item')" type="email" v-model="email" id="">
                                            </div>
                                            <div class="left_input">
                                                <label for="">{{ $t('phone_item') }}</label>
                                                <input :placeholder="$t('phone_item')" type="number" v-model="phone_number" id="">
                                            </div>
                                        </div>
                                        <div class="fields_right">
                                            <label for="">{{ $t('message_item') }}</label>
                                            <textarea :placeholder="$t('message_item')" rows="" cols="" v-model="message"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn_submit">
                                    <button type="submit" @click="sendMessage">Submit</button>
                                </div>
                            </form>
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
                name:'',
                email:'',
                phone_number:'',
                subject:'',
                message:'',
                
            }
        },
        methods: {
            async sendMessage(){
                const data = new FormData();
                data.append('name', this.name);
                data.append('email', this.email);
                data.append('phone_number', this.phone_number);
                data.append('subject', this.subject);
                data.append('message', this.message);

                await Api.general.sendContactUs(data).then((res)=>{
                    // console.log(res)
                    // this.aboutUs = res.data.body
                    // this.$router.go()
                    if(res.data.status){
                        this.$router.go()
                    }
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