<template>
    <!-- <link rel="stylesheet" href="/assets/css/user/style.css"> -->
    <Header />
    
    <!-- <ErrorList /> -->

    <div class="overlay_delete" v-if="showOverlay" @click="showRequestOffer"></div>
    <div class="overlay"></div>
    <div class="downlist__home">
        <span class="close">X</span>
        <span class="tringle"></span>
        <div class="lists">
            <a @click="this.$router.push('/about-us')" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('about_us') }}</span>
            </a>
            <a @click="this.$router.push('/online-complaint')" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('complaints') }}</span>
            </a>
            <a @click="this.$router.push('/contact-us')" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('contact_us') }}</span>
            </a>
            <a @click="this.$router.push('/faqs')" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('faqs') }}</span>
            </a>
            <a @click="this.$router.push('/classification')" class="item__list">
                <span class="circle"></span>
                <span class="list_text">{{ $t('classification') }}</span>
            </a>
        </div>
    </div>
    

    <main class="_Home_content">
        <div class="content__home mr-2">
            
            <div class="home__nav">
                <!-- <img src="/assets/images/logo/logo_user.png" alt="" class="nav__img">
                <button class="nav__btn" id="open_home_list">
                    <i class="fa fa-question" aria-hidden="true"></i>
                </button> -->
                <logo-search/>
            </div>
            <h1 class="home__title">{{ $t('title_home') }}</h1>
            <div class="home_f_triangle"></div>
            <div class="home_s_triangle"></div>
            <div class="home_t_triangle"></div>
        </div>
        
        <div class="content__cards">
            <h2 class="cards__title" @click="this.$router.push('/search/products')" src="/assets/images/icon/search.png">{{ $t('explore_best_prod_rate') }}</h2>
            <div class="__cards">
                <div class="__card" v-for="item_c in paginatedData" v-if="paginatedData.length > 0" :key="item_c.id" @click="this.$router.push({ name: 'showReview', params: { id: item_c.id }})">
                    <img :src="item_c.media[0].original_url" alt="" class="card__logo">
                    <div class="card__name">
                        <span class="name__car" v-if="item_c.product_ar.length > 40 || item_c.product_en.length > 40">{{ getLocales ? item_c.product_ar.slice(0,40) + '...' : item_c.product_en.slice(0,40) + '...'  }}</span>
                        <span class="name__car" v-else >{{ getLocales ? item_c.product_ar : item_c.product_en  }}</span>
                        <!-- <span class="name__num">7,5K units</span> -->
                    </div>
                    <div class="card__rate">
                        <i class="icon fa fa-star yellow" aria-hidden="true"></i>
                        <span>{{ item_c.averagerate.toFixed(1) }}</span>
                    </div>
                </div>
            </div>

            <div class="m-auto w-90 custom_pagination_card" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
                <pagination-card 
                    v-if="allProducts.length > 0" 
                    v-model="page_index" 
                    :records="allProducts.length" 
                    :per-page="page_size" 
                    :options="{ template: MyPagination }" 
                    @paginate="myCallback"
                />
            </div>
            
            <img class="shape_path" src="/assets/images/gallary/Path.png" alt="">
        </div>

        <div class="content__reviews">
            <h2 class="reviews__title"><a style="text-decoration: none;color: #6e6e6e;">{{ $t('recent_reviews') }}</a></h2>
            <div class="reviews__slider">
                <carousel :items-to-show="2" :breakpoints="breakpointsReview" :transition="500" v-bind:style="'text-align: unset;'"  :wrap-around="true" >
                    <slide v-for="item in allReviews" :key="item.id" >
                        <item-product-person :item="item" :allProducts="allProducts" />
                    </slide>

                    <template #addons>
                    <!-- <navigation /> -->
                    <pagination />
                    </template>
                </carousel>
            </div>
        </div>


        <!-- <div class="content__offers" v-if="allProductsAllow">
            <div class="offers_nav">
                <h2 class="offers__title">
                    <a style="text-decoration: none;color: #707070;" >{{ $t('product_to_review') }}</a>
                </h2>
                <img @click="this.$router.push('/search/products')" src="/assets/images/icon/search.png" alt="" class="icon__search">
            </div>
            <carousel :items-to-show="1" :transition="500" v-bind:style="'text-align: unset;'"  :wrap-around="true" >
                <slide v-for="item in allProducts" :key="item.id" >
                    <item-product-supplier :item="item" :user="user" />
                </slide>
                <template #addons>
                <pagination />
                </template>
            </carousel>
            
        </div> -->



        <div class="content__offers">
            <div class="offers_nav">
                <h2 class="offers__title">
                    <a style="text-decoration: none;color: #6e6e6e;" @click="this.$router.push('/allOffer')">{{ $t('offers') }}</a>
                </h2>
                <img @click="this.$router.push('/search/offers')" src="/assets/images/icon/search.png" alt="" class="icon__search">
            </div>
            <!-- <div class="owl-carousel owl-theme">
                    <div class="d-flex justify-content-between">
                        <item-offer :user="user" :item="items" v-for="items in allOffer" :key="items.id" />
                    </div>
            </div> -->
            <!-- <carousel :items-to-show="1" :transition="500" v-bind:style="'text-align: unset;'" :autoplay="5000" :wrap-around="true" > -->
            <carousel :items-to-show="1" :transition="500" v-bind:style="'text-align: unset;'"  :wrap-around="true" >
                <slide v-for="items in allOffer" :key="items.id" >
                    <item-offer :user="user" :item="items" @requestOffer="requestOffer" />
                </slide>

                <template #addons>
                <!-- <navigation /> -->
                <pagination />
                </template>
            </carousel>
            
        </div>

        <div class="content__suppliers">
            <div class="suppliers_nav">
                <h2 class="suppliers__title">{{ $t('suppliers') }}</h2>
                <!-- <img  class="icon__search" src="/assets/images/icon/search.png" alt=""> -->
            </div>
            <!-- <div class="owl-carousel owl-theme">
                <div class="item item__supplier" v-for="item in 1" :key="item.id">
                    <item-supplier />
                </div>
                
            </div> -->
            <carousel :items-to-show="1.5" :breakpoints="breakpointsSupplier" v-bind:style="'text-align: unset;'" :wrap-around="true">
                <slide v-for="item in allSuppliers" :key="item.id" >
                    <item-supplier :item="item" />
                    <!-- <item-supplier :item="item" /> -->
                </slide>

                <template #addons>
                <!-- <navigation /> -->
                <pagination />
                </template>
            </carousel>
        </div>

        <div class="content__experiences _home_section">
            <div class="section_nav">
                <h2 class="section__title" @click="this.$router.push('/allExperiment')">{{ $t('experience_of_your') }}</h2>
                <img @click="this.$router.push('/search/experiences')"  class="icon__search" src="/assets/images/icon/search.png" alt="">
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
            <!-- <carousel :autoplay="5000" :transition="500" :items-to-show="1" v-bind:style="'text-align: unset;'" :wrap-around="true"> -->
            <div v-if="allFollowExperiments.length > 0">
                <carousel :items-to-show="1" v-bind:style="'text-align: unset;'" :wrap-around="true">
                    <slide v-for="item in allFollowExperiments" :key="item.id" >
                        <item-experience :item="item" @reloadTwo="reloadTwo"  />
                    </slide>

                    <template #addons>
                    <!-- <navigation /> -->
                    <pagination />
                    </template>
                </carousel>
            </div>
            <div v-else>
                <carousel :items-to-show="1" v-bind:style="'text-align: unset;'" :wrap-around="true">
                    <slide v-for="item in allExperiences" :key="item.id" >
                        <item-experience :item="item" @reload="reload"  />
                    </slide>

                    <template #addons>
                    <!-- <navigation /> -->
                    <pagination />
                    </template>
                </carousel>
            </div>

        </div>

           
        <!-- Modal-->
        <transition @enter="startTransitionModal" @after-enter="endTransitionModal" @before-leave="endTransitionModal" @after-leave="startTransitionModal">
            <div class="modal fade" v-if="showModal" ref="modal">
            <div class="modal-dialog" role="document" style="margin: 20vw auto;">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ $t('enter_your_message') }}</h5>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="requestMess" class="form-control" placeholder=".....">
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showRequestOffer">{{ $t('cancel') }}</button>
                    <button class="btn btn-primary" @click="requstOfferUser(this.idRequestOffer)">{{ $t('request') }}</button>
                </div>
                </div>
            </div>
            </div>
        </transition>
        <div class="modal-backdrop fade d-none" ref="backdrop"></div>

        
    </main>

    <Footer />
</template>

<script>
    import Api from "@/api"
    import { markRaw } from "vue";
    import { mapActions } from 'vuex'
    import cookie from "vue-cookie";
    // components
    import ItemProductSupplier from "@/components/ItemProductSupplier.vue"
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"
    import ItemProductPerson from "@/components/ItemProductPerson.vue"
    import ItemOffer from "@/components/ItemOffer.vue"
    import ItemSupplier from "@/components/ItemSupplier.vue"
    import ItemExperience from "@/components/ItemExperience.vue"
    import LogoSearch from "@/components/LogoSearch.vue"
    import MyPagination from "@/components/MyPagination.vue";
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import PaginationCard from 'v-pagination-3';
    // import ErrorList from "../components/ErrorList.vue"
    export default {
        name: "Home",
        data() {
            return {
                allOffer: [],
                allExperiences: [],
                allProducts: [],
                allSuppliers: [],
                allFollowExperiments: [],
                allFollowProducts: [],
                allReviews: [],
                allProductsAllow: true,
                user: 'user',
                idRequestOffer: '',
                requestMess: '',
                showModal: false,
                showOverlay: false,
                divOverlay: false,
                divSearch: false,

                Component: markRaw(MyPagination),

                page_index: 1,
                page_size: 8,


                breakpointsReview: {
                    // 700px and up
                    500: {
                        itemsToShow: 2,
                        
                    },

                    700: {
                        itemsToShow: 2.5,
                        
                    },

                    900: {
                        itemsToShow: 3,
                        
                    },

                    // 1024 and up
                    1100: {
                        itemsToShow: 4,
                        
                    },

                    1200: {
                        itemsToShow: 5,
                        
                    },
                },

                breakpointsSupplier: {
                    // 700px and up
                    500: {
                        itemsToShow: 1.5,
                        
                    },

                    700: {
                        itemsToShow: 2,
                        
                    },

                    900: {
                        itemsToShow: 2.5,
                        
                    },

                    // 1024 and up
                    1100: {
                        itemsToShow: 3,
                        
                    },

                    1200: {
                        itemsToShow: 3,
                        
                    },
                },
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
            LogoSearch,
            PaginationCard,
            // ErrorList
        },
        setup() {
            return { MyPagination };
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
            this.getAllsSuppliers()
            this.getAllFollowsDataContent()
            this.getAllsReviews()
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

            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.allProducts.slice(start, end);
            }
            
            
        },
        methods:{
            ...mapActions(['redirectTo']),
            reload(even){
                if(even){
                    this.getAllExperience()
                }
            },
            reloadTwo(even){
                if(even){
                    this.getAllFollowsDataContent()
                }
            },
            myCallback(event){
                // console.log(event);
                this.page_index = event
            },
            
            // startTransitionModal() {
            //     this.$refs.backdrop.classList.toggle("d-block");
            //     this.$refs.modal.classList.toggle("d-block");
            // },
            // endTransitionModal() {
            //     this.$refs.backdrop.classList.toggle("show");
            //     this.$refs.modal.classList.toggle("show");
            // },
            startTransitionModal() {   
                this.$refs.backdrop.classList.toggle("d-block");   
                if (this.$refs.modal) 
                this.$refs.modal.classList.toggle("d-block"); 
            }, 
            endTransitionModal() {   
                this.$refs.backdrop.classList.toggle("show");   
                if (this.$refs.modal) 
                this.$refs.modal.classList.toggle("show"); 
            },
            showRequestOffer() {
                this.showOverlay = !this.showOverlay
                this.showModal = !this.showModal
                this.requestMess = ''
            },
            async getAllOffer(){
                await Api.general.getAllOffers().then((res)=>{
                    if(res.data.status){
                        console.log("getAllOffer",res)
                        this.allOffer = res.data.body
                    }
                    
                })
            },
            async getAllExperience(){
                await Api.general.getAllExperiments().then((res)=>{
                    if(res.data.status){
                        console.log("getAllExperience",res)
                        this.allExperiences = res.data.body
                    }
                })
            },
            async getAllProducts(){
                await Api.general.getAllProductstoReviews().then((res)=>{
                    if(res.data.status){
                        console.log("getAllProducts",res)
                        this.allProducts = res.data.body
                    }else{
                        this.allProductsAllow = false
                    }
                })
            },
            async getAllsSuppliers(){
                await Api.general.getAllSuppliers().then((res)=>{
                    // console.log("Suppliers",res)
                    if(res.data.status){
                        // console.log("Suppliers",res)
                        this.allSuppliers = res.data.body
                    }
                })
            },
            async getAllFollowsDataContent(){
                if(cookie.get('token').length  > 0 && JSON.parse(cookie.get('logged_In'))){
                    await Api.general.getAllFollowsData().then((res)=>{
                    // console.log("Suppliers",res)
                    if(res.data.status){
                        console.log("getAllFollowsData",res)
                        // this.alFollowsData = res.data.body
                        this.allFollowExperiments = res.data.body.Allexperiments
                        this.allFollowProducts = res.data.body.allProductsReviews
                    }
                })
                }
            },
            async getAllsReviews(){
                await Api.general.getShowAllReviewsAll().then((res)=>{
                    // console.log("Suppliers",res)
                    if(res.data.status){
                        console.log("getAllsReviews",res)
                        this.allReviews = res.data.body
                    }
                })
            },
            requestOffer(event){
                this.idRequestOffer = event
                this.showRequestOffer()
                console.log(event)
            },
            async requstOfferUser(item){
                const data = new FormData();
                data.append('request_message',this.requestMess);
                await Api.user.userRequstOfferDemand(item,data).then((res)=>{
                    this.$router.go()
                })
            }
        }
    }
</script>

<style  scoped>
.overlay_delete{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index: 5;
    height: 200vw;
}

.custom_pagination_card .VuePagination .VuePagination__count{
    display: none!important;
}


</style>