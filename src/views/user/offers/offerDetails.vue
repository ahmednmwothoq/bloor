<template>
    <Header />
    <main class="_offer_details_content">
        <div class="offer__details" v-if="offerDetails">
            <div class="details__nav">
                <div class="nav__left">
                    <div>
                        <h2 class="nav__title">{{ getLocales ? offerDetails.product_ar : offerDetails.product_en }}</h2>
                        <span class="info__date">
                            <CreateAt :create="offerDetails.created_at" />
                        </span>
                    </div>    
                    <!-- <div class="nav__rate">
                        <i class="fa fa-star yellow" aria-hidden="true"></i>
                        <span>4.7</span>
                    </div> -->
                    <!-- <img class="nav__filter" src="/assets/images/icon/filter.png" alt="" > -->
                </div>
                <div class="nav__right">
                    <img  class="icon__search" src="/assets/images/icon/search.png" alt="">
                    <!-- <a class="add__review" >Add Review</a> -->
                </div>
            </div>
            <div class="details__desc">
                <span class="desc_title">{{ $t('description') }} : </span>
                <p class="desc__text">{{ getLocales ? offerDetails.product_description_ar : offerDetails.product_description_en  }}</p>
            </div>

            <div class="details__cars">
                <div class="cars__left">
                    <img id="showImageOffer" class="car__select" src="" alt="">

                    <div class="rate__offer" :style="{ display: offerDetails.offer_percentage > 0 ? '' : 'none' }">
                        <span  class="rate__num">{{offerDetails.offer_percentage}}% oFF</span>
                        <span class="rate__code">{{ $t('use_code') }} <span>{{offerDetails.offer_code.slice(0, 5)}}</span></span>
                    </div>
                </div>
                <!-- <div class="row cars__right"> -->
                    <carousel :transition="500" :items-to-show="2" v-bind:style="'margin-left: 2vw;margin-right: 2vw;text-align: unset;height: 20vw;width: 37vw;'" :wrap-around="true" v-bind:class="'row cars__right'">
                            <slide v-for="item in offerDetails.media" :key="item.id" v-bind:style="'height: 28vw;'">
                                <div class="col-3 show__car">
                                    <div class="parallelogram"></div>
                                    <div class="cont">
                                        <img :src="item.original_url" alt="">
                                        <div class="info">
                                            <span>Show</span>
                                            <img @click="showImageInDiv(item.original_url)" class="icon" src="/assets/images/icon/pluse.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </slide>
                        <template #addons>
                        <!-- <navigation /> -->
                        <!-- <pagination /> -->
                        </template>
                    </carousel>
                <!-- </div> -->



                <!-- <div class="row cars__right">
                    <div class="col-3 car__first show__car">
                        <div class="parallelogram"></div>
                        <div class="cont">
                            <img src="/assets/images/gallary/car1.png" alt="">
                            <div class="info">
                                <span>Style</span>
                                <img class="icon" src="/assets/images/icon/pluse.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-3  show__car">
                        <div class="parallelogram"></div>
                        <div class="cont">
                            <img src="/assets/images/gallary/car2.png" alt="">
                            <div class="info">
                                <span>Exclusive</span>
                                <img class="icon" src="/assets/images/icon/pluse.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-3  show__car">
                        <div class="parallelogram"></div>
                        <div class="cont">
                            <img src="/assets/images/gallary/car3.png" alt="">
                            <div class="info">
                                <span>Premium</span>
                                <img class="icon" src="/assets/images/icon/pluse.png" alt="">
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="details__bottom">
                <div class="details__added">
                    <span class="detail_title">{{ $t('added_by') }} :</span>
                    <div class="added__person">
                        <!-- <img src="/assets/images/avatar/person1.jpg" alt="" class="person"> -->
                        <div class="person_info">
                            <span class="name">{{ getLocales ? offerDetails.company_name_ar : offerDetails.company_name_en}}</span>
                            <div class="number">
                                <span>{{ $t('marouf_number') }} : </span>
                                <span>{{offerDetails.known_number}}</span>
                            </div>
                            <div class="no">
                                <span class="no">{{ $t('commerecial_register_no') }} : </span>
                                <span>{{offerDetails.commercial_registration}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail__price">
                    <div class="price_info">
                        <span class="price">
                            <span>{{ $t('sar') }}</span>
                            <span>{{offerDetails.original_price}}</span>
                        </span>
                        <span class="offer" v-if="offerDetails.offer_percentage > 0">{{ $t('sar') }} {{(offerDetails.offer_percentage/100) * offerDetails.original_price}}</span>
                    </div>
                </div>
                <div class="offer_request">
                    <a class="request__btn" @click="requstOfferUser(offerDetails.id)">{{ $t('request') }}</a>
                </div>
            </div>
        </div>
    </main>
    <FooterVue />
    
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import CreateAt from "@/components/CreateAt.vue"
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import { useToast } from 'vue-toastification'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    export default {
        data() {
            return {
                idOf: this.$route.params.id,
                offerDetails: null,
                search:'',
                user:'user',
            }
        },
        components:{
            Header,
            FooterVue,
            CreateAt,
            Carousel,
            Slide,
            Pagination,
            Navigation,
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
            }
        },
        mounted() {
            // console.log(this.idEx)
            this.getAllOffer()
        },
        methods: {
            async getAllOffer(){
                await Api.general.getDetailsOffer(this.idOf).then((res)=>{
                    console.log(res)
                    this.offerDetails = res.data.body
                })
                $("#showImageOffer").attr("src",`${this.offerDetails.media[0].original_url}`);
            },
            async requstOfferUser(item){
                const data = new FormData();
                data.append('request_message', "Request Offer");
                await Api.user.userRequstOfferDemand(item,data).then((res)=>{
                    // console.log(res);
                })
            },
            showImageInDiv(item){
                $("#showImageOffer").attr("src",`${item}`);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>