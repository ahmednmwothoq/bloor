<template>
    <!-- <link rel="stylesheet" href="/assets/css/user/style.css"> -->
    <Header />
    <!-- <ErrorList /> -->

    <div class="overlay"></div>
    <div class="downlist__home">
        <span class="close">X</span>
        <span class="tringle"></span>
        <div class="lists">
            <a  class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('about_us') }}</span>
            </a>
            <a href="pages/user/online_complaint.html" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('complaints') }}</span>
            </a>
            <a href="pages/user/get_touch.html" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('contact_us') }}</span>
            </a>
            <a href="pages/user/faqs.html" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('faqs') }}</span>
            </a>
            <a href="pages/user/classification.html" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('classification') }}</span>
            </a>
        </div>
    </div>
    

    <main class="_Home_content">
        <div class="content__home mr-2">
            <div class="home__nav">
                <img src="/assets/images/logo/logo_user.png" alt="" class="nav__img">
                <button class="nav__btn" id="open_home_list">
                    <i class="fa fa-question" aria-hidden="true"></i>
                </button>
            </div>
            <h1 class="home__title">{{ $t('title_home') }}</h1>
            <div class="home_f_triangle"></div>
            <div class="home_s_triangle"></div>
            <div class="home_t_triangle"></div>
        </div>
        
        <!-- <div class="content__cards">
            <h2 class="cards__title">Explore Best Car Rating</h2>
            <div class="__cards">
                <div  class="__card" onclick="goToURL('pages/user/search_reviews.html')">
                    <img src="/assets/images/icon/ferrari.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Ferrari</span>
                        <span class="name__num">7,5K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="icon fa fa-star yellow" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>
                <div class="__card">
                    <img src="/assets/images/icon/mercedes.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Mercedes</span>
                        <span class="name__num">6,9K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="fa fa-star yellow" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>
                <div class="__card">
                    <img src="/assets/images/icon/peugeot.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Peugeot</span>
                        <span class="name__num ">5,4K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="far fa-star white" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>

                <div class="__card">
                    <img src="/assets/images/icon/porsche.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Porsche</span>
                        <span class="name__num">5,9K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="fa fa-star blue" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>

                <div class="__card">
                    <img src="/assets/images/icon/volkswagen.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Volkswagen</span>
                        <span class="name__num">15,9K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="fa fa-star blue" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>
                <div class="__card">
                    <img src="/assets/images/icon/toyota.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Toyota</span>
                        <span class="name__num">7K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="fa fa-star yellow" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>
                <div class="__card">
                    <img src="/assets/images/icon/bmw.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">BMW</span>
                        <span class="name__num ">7K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="far fa-star white" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>

                <div class="__card">
                    <img src="/assets/images/icon/hyundai.png" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car">Hyundai</span>
                        <span class="name__num">15,3K units</span>
                    </div>
                    <div class="card__rate">
                        <i class="fa fa-star blue" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div>
                </div>
            </div>
            
            <img class="shape_path" src="/assets/images/gallary/Path.png" alt="">
        </div> -->

        <!-- <div class="content__reviews">
            <h2 class="reviews__title"><a style="text-decoration: none;color: #707070;">Recent Reviews</a></h2>
            <div class="reviews__slider">
                <div class="owl-carousel owl-theme">
                    <div class="item item__slider" v-for="item in 4" :key="item.id" >
                        <item-product-person />
                    </div>
                    
                    
                </div>
            </div>
        </div> -->


        <div class="content__offers" v-if="allProductsAllow">
            <div class="offers_nav">
                <h2 class="offers__title">
                    <a style="text-decoration: none;color: #707070;" href="pages/user/offers.html">{{ $t('product_to_review') }}</a>
                </h2>
                <img src="/assets/images/icon/search.png" alt="" class="icon__search">
            </div>
            <carousel :items-to-show="1" :transition="500" v-bind:style="'text-align: unset;'"  :wrap-around="true" >
                <slide v-for="item in allProducts" :key="item.id">
                    <item-product-supplier :item="item" :user="user" />

                    <!-- <div v-if="showOverlayRew" @click="showReviewToProduct('theDivAddReview-'+ item.id)" class="overlay"></div>
                    <div :id="'theDivAddReview-'+ item.id" class="add_product" style="display: none;">
                        <h2 class="title_add">Add Review</h2>
                        <div class="form">
                            <form class="">
                                <div class="row">
                                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 bg-white">
                                        <QuillEditor theme="snow" toolbar="full" v-model:content="item.questionnaire_ar" contentType="html"  />
                                    </div>
                                </div>
                                <div class="raw">
                                    <div class="upload-images mb-4">
                                        <div class="imgs-uploaded" v-if="image_file_review">
                                        <ul class="list-style">
                                            <li class="list">
                                                <img :src="image_file_review" alt="avatar" v-if="image_file_review"/>
                                            </li>
                                        </ul>
                                        </div>
                                        <label for="upload-label-edit" :class="{'absolute_label mt-5': image_file_review}">
                                            <div>
                                                Upload Image
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                                            </div>
                                            <input type="file" accept="image/*" @change="uploadImageItemReview" id="upload-label-edit">
                                        </label>
                                    </div>
                                </div>
                                <div class="raw">
                                    <button @click.prevent="editProductForm(item.id)" class="form__btn" type="submit">Next</button>
                                </div>
                            </form>
                        </div>
                    </div> -->
                </slide>

                <template #addons>
                <!-- <navigation /> -->
                <pagination />
                </template>
            </carousel>
            
        </div>



        <div class="content__offers">
            <div class="offers_nav">
                <h2 class="offers__title">
                    <a style="text-decoration: none;color: #707070;" href="pages/user/offers.html">{{ $t('offers') }}</a>
                </h2>
                <img src="/assets/images/icon/search.png" alt="" class="icon__search">
            </div>
            <!-- <div class="owl-carousel owl-theme">
                    <div class="d-flex justify-content-between">
                        <item-offer :user="user" :item="items" v-for="items in allOffer" :key="items.id" />
                    </div>
            </div> -->
            <carousel :items-to-show="1" :transition="500" v-bind:style="'text-align: unset;'" :autoplay="5000" :wrap-around="true" >
                <slide v-for="items in allOffer" :key="items.id" >
                    <item-offer :user="user" :item="items" />
                </slide>

                <template #addons>
                <!-- <navigation /> -->
                <pagination />
                </template>
            </carousel>
            
        </div>

        <!-- <div class="content__suppliers">
            <div class="suppliers_nav">
                <h2 class="suppliers__title">Suppliers</h2>
                <img  class="icon__search" src="/assets/images/icon/search.png" alt="">
            </div>
            <div class="owl-carousel owl-theme">
                <div class="item item__supplier" v-for="item in 1" :key="item.id">
                    <item-supplier />
                </div>
                
            </div>
        </div> -->

        <div class="content__experiences _home_section">
            <div class="section_nav">
                <h2 class="section__title">{{ $t('experience_of_your') }}</h2>
                <img  class="icon__search" src="/assets/images/icon/search.png" alt="">
            </div>
            <!-- <div class="owl-carousel owl-theme"> -->
                <!-- <div class="item item__experience" v-for="item in allExperiences" :key="item.id">
                    <item-experience :item="item" />
                </div> -->

                <!-- <div class="item d-flex justify-content-between" style="width: 254vw;">
                    <item-experience :item="item" v-for="item in allExperiences" :key="item.id" />
                </div> -->
                <!-- <div >
                    <div class="item">
                        <div class="item__experience" >
                            <item-experience :item="item" />
                        </div>
                    </div>
                </div>   -->
            <!-- </div> -->
            <carousel :autoplay="5000" :transition="500" :items-to-show="1" v-bind:style="'text-align: unset;'" :wrap-around="true">
                <slide v-for="item in allExperiences" :key="item.id" >
                    <item-experience :item="item"  />
                </slide>

                <template #addons>
                <!-- <navigation /> -->
                <pagination />
                </template>
            </carousel>
        </div>
    </main>

    <Footer />
</template>

<script>
    import Api from "@/api"
    import { mapActions } from 'vuex'
    // components
    import ItemProductSupplier from "@/components/ItemProductSupplier.vue"
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"
    import ItemProductPerson from "@/components/ItemProductPerson.vue"
    import ItemOffer from "@/components/ItemOffer.vue"
    import ItemSupplier from "@/components/ItemSupplier.vue"
    import ItemExperience from "@/components/ItemExperience.vue"
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    // import ErrorList from "../components/ErrorList.vue"
    export default {
        name: "Home",
        data() {
            return {
                allOffer: [],
                allExperiences: [],
                allProducts: [],
                allProductsAllow: true,
                user: 'user',
            }
        },
        components: {
            Header,
            Footer,
            ItemProductPerson,
            ItemOffer,
            ItemSupplier,
            ItemExperience,
            ItemProductSupplier,
            Carousel,
            Slide,
            Pagination,
            Navigation,
            // ErrorList
        },
        setup() {
            // const offer = Api.general.getAllOffers().then((res)=>{
            //     // console.log(res)
            //     const allOffer = res.data.body
            //     return allOffer
            // })
            // const experience = Api.general.getAllExperiments().then((res)=>{
            //     // console.log(res)
            //     const allExperiences = res.data.body
            //     return allExperiences
            // })
            // const responsesOffer = Promise.all([offer,experience])
            // const responses = new Promise((resolve, reject) => resolve('success')).then(res => console.log(res))
            return {
                // responsesOffer,
                //  responsesExperience
            }
        },
        mounted(){
            // let user = localStorage.getItem("userToken")
            // // let user = localStorage.getItem("token")
            // if(!user){
            //     this.redirectTo({ val: "userLogin" })
            // }
            this.getAllOffer()
            this.getAllExperience()
            this.getAllProducts()
            // console.log(this.responsesOffer)
        },
        computed: {
            getLocales () {
                let local = this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
                // console.log("text",local)
                if(local[0] == 'en'){
                return true
                } else {
                return false
                }
            },
            activeSlider: function () {
                return this.allOffer[0];
            },
            
            
        },
        methods:{
            ...mapActions(['redirectTo']),
            async getAllOffer(){
                await Api.general.getAllOffers().then((res)=>{
                    if(res.data.status){
                        console.log(res)
                        this.allOffer = res.data.body
                    }
                    
                })
            },
            async getAllExperience(){
                await Api.general.getAllExperiments().then((res)=>{
                    if(res.data.status){
                        console.log(res)
                        this.allExperiences = res.data.body
                    }
                })
            },
            async getAllProducts(){
                await Api.general.getAllProductstoReviews().then((res)=>{
                    if(res.data.status){
                        console.log(res)
                        this.allProducts = res.data.body
                    }else{
                        this.allProductsAllow = false
                    }
                })
            },
        }
    }
</script>

<style  scoped>
.overlay{
    position: absolute;
    top:3vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    display:none;
  }

  

  [dir="rtl"] .downlist__home{
    left:2vw;
    right:auto
  }
.downlist__home{
    position: absolute;
    width: 40vw;
    height: 45vw;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-radius: 11px;
    opacity: 1 !important;
    z-index:6;
    right:2vw;
    top: 13vw;
    padding: 5vw 3vw;
    display:none;
  }

  [dir="rtl"] .downlist__home .close{
    right:-0.5vw;
    left:auto
  }
  .downlist__home .close{
    position: absolute;
    top:-29px;
    left:-0.5vw;
    padding:1px 15px;
    font-size:33px;
    font-weight: bold;
    color: #0136EE;
    border-radius: 50%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    cursor: pointer;
  }

  [dir="rtl"] .downlist__home .tringle{
    right:auto;
    left:0.5vw;
  }
  .downlist__home .tringle{
    position: absolute;
    top:-2.2vw;
    right:0.5vw;
    width: 0;
    height: 0;
    border-left: 31px solid transparent;
    border-right: 31px solid transparent;
    border-bottom: 28px solid #FFFFFF;
  }
  .downlist__home .lists{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 30vw;
    width: 100%;
  }
  .downlist__home .lists .item__list{
    display: flex;
    justify-content: flex-start;
    /* width: 228px; */
    align-items: center;
    text-decoration: none;
  }

  .downlist__home .lists .item__list:hover .circle{
    background: #0136EE;
    border:0;
    transition: all 0.2s ease-in-out;
  }
  .downlist__home .lists .item__list:hover .list_text{
    color: #0136EE;
    transition: all 0.2s ease-in-out;
  }

  .downlist__home .lists .item__list .circle{
    border: 2px solid #707070;
    opacity: 1;
    margin-right: 27px;
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 50%;
  }
  .downlist__home .lists .item__list .list_text{
    font-size: 2.5vw;
    color: #B1B1B1;
    margin-top: -0.5vw;
    margin: 0 1vw;
  }

  
</style>