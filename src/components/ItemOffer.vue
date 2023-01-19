<template>
    <div class="item__offer">
        <div class="offer__img" @click="this.$router.push({ name: 'OfferDetailsUser', params: { id: item.id }})">
            <!-- <img class="image" src="/assets/images/gallary/car_black.png" alt=""> -->
            <!-- <div class="carousel-item active">
                    <img src="/assets/images/gallary/laborghini_huracan.jpg" alt="" class="image image_slider">
                </div> -->
            <!-- ,  {active: activeSlider.id != img.id ? '' : 'active' }  -->
            <!-- <div class="carousel-item">
            <img src="/assets/images/gallary/car_yellow.png" alt="" class="image image_slider">
            </div> -->

            <!-- <div :id="`carouselExampleControls${item.id}`" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div :class="activeSlider.id == img.id ? `carousel-item active` : `carousel-item`" v-for="img in item.media" :key="img.id">
                        <img :src="img.original_url" alt="img" class="image image_slider" @click="this.$router.push({ name: 'OfferDetailsUser', params: { id: item.id }})">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" :data-bs-target="`#carouselExampleControls${item.id}`" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" :data-bs-target="`#carouselExampleControls${item.id}`" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            -->
            <img class="image" :src="item.media[0].original_url" alt="">



            <div class="rate__offer" :style="{ display: item.offer_percentage > 0 ? '' : 'none' }">
                <span  class="rate__num">{{item.offer_percentage}}% oFF</span>
                <span class="rate__code">{{ $t('use_code') }} <span>{{item.offer_code.slice(0, 5)}}</span></span>
            </div>

            <!-- <div class="rate__offer">
                <span  class="rate__num">10% oFF</span>
                <span class="rate__code">{{ $t('use_code') }} <span>54454</span></span>
            </div> -->
        </div>
        <div class="offer__info">
            <h3 class="info__title">{{ getLocales ? item.product_ar : item.product_en}}</h3>
            <span class="info__date">{{ getLocales ? CreateAtDateAR(item.created_at) : CreateAtDateEN(item.created_at)}} &nbsp {{CreateAtTime(item.created_at)}}</span>
            <div class="info__details">
                <div class="detail__desc">
                    <span class="detail_title">{{ $t('description') }} :</span>
                    <p class="desc__text">{{ getLocales ? item.product_description_ar : item.product_description_en}}</p>
                </div>
                <div class="detail__added">
                    <span class="detail_title">{{ $t('added_by') }} :</span>
                    <div class="added__person">
                        <img src="/assets/images/avatar/avatar-image.png" alt="" class="person">
                        <div class="person_info">
                            <span class="name" v-if="user == 'supplier'">{{ getLocales ? item.company_name_ar : item.company_name_en}}</span>
                            <span class="name" v-if="user == 'user'">{{ item.user.f_name }} {{ item.user.l_name }}</span>
                            <span class="number">
                                <span> {{ $t('marouf_number') }} :</span>
                                <span> {{item.known_number}} </span>
                            </span>
                            <span class="no">
                                <span> {{ $t('commerecial_register_no') }} :</span>
                                <span> {{item.commercial_registration}} </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="detail__price">
                    <span class="detail_title">{{ $t('price') }} : </span>
                    <div class="price_info">
                        <span class="price"> <span> {{ $t('sar') }} </span>
                        <span> {{item.original_price}} </span>
                    </span>
                        <span class="offer" v-if="item.offer_percentage > 0">{{ $t('sar') }} {{(item.offer_percentage/100)* item.original_price}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="offer_request">
            <a class="request__btn btn_supplier" @click="$emit('editOffer', item.id)" v-if="user == 'supplier'">{{ $t('edit') }}</a>
            <a class="request__btn btn_supplier" data-bs-toggle="modal" :data-bs-target="`#exampleModal${item.id}`"  v-if="user == 'supplier'">{{ $t('delete') }}</a>
            <!-- <a class="request__btn" v-if="user == 'user'" data-bs-toggle="modal" :data-bs-target="`#requstModalOffer${item.id}`">{{ $t('request') }}</a> -->
            <a class="request__btn" v-if="user == 'user'" @click="$emit('requestOffer', item.id)">{{ $t('request') }}</a>
        </div>
    </div>

    <!-- Modal -->
    <!-- <div class="modal fade" :id="`requstModalOffer${item.id}`" tabindex="-1" :aria-labelledby="`requstModalLabel${item.id}`" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="`requstModalLabel${item.id}`">{{ $t('enter_your_message') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                <input type="text" class="form-control" placeholder="name@example.com">
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('no') }}</button>
                <button type="button" class="btn btn-primary" @click="requstOfferUser(item.id)">{{ $t('yes') }}</button>
            </div>
            </div>
        </div>
    </div> -->
    <!-- </div> -->
    <!-- <div class="offer__rate">
        <i class="fa fa-star yellow icon" aria-hidden="true"></i>
        <span>4.7</span>
    </div> -->

    <!-- Modal -->
    <div class="modal fade" :id="`exampleModal${item.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
            {{ $t('are_you_sure') }}
        </div>
        <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <button type="button" class="btn btn-primary" @click="$emit('deleteOffer', item.id)">Yes</button>
        </div>
        </div>
    </div>
    </div>

</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
    export default {
        data() {
            return {
                userLogin: JSON.parse(cookie.get('userData')),
            }
        },
        emits: ["editOffer","deleteOffer","requestOffer"],
        props: {
            item: {
                type: Object,
                required: true
            },
            user: {
                type: String,
                required: true
            }
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
                return this.item.media[0];
            },
            
            
        },
        mounted() {
            // console.log(this.userLogin)
        },
        methods: {
            CreateAtDateEN(create_at){
                const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const date = create_at.split(' ')[0]

                const d = new Date(`${date}`);
                const month = months[d.getMonth()];
                const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
                return last
            },
            CreateAtTime(create_at){

                const time = create_at.split(' ')[1]

                const timeHour = time.slice(0, 2);
                const timeMinSec = time.slice(2);
                // const last = "";
                if(timeHour > 12){
                const last = `${timeHour - 12}${timeMinSec} PM`
                return last
                }else{
                const last = `${timeHour}${timeMinSec} AM`
                return last
                }
            },
            CreateAtDateAR(create_at){
                const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                            ];
                const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                const date = create_at.split(' ')[0]

                const d = new Date(`${date}`);
                // const month = months[d.getMonth()];
                // const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
                const last = days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
                return last
            },
            async requstOfferUser(item){
                const data = new FormData();
                data.append('request_message', "Request Offer");
                await Api.user.userRequstOfferDemand(item,data).then((res)=>{
                    console.log(res);
                })
            }
            
        },
    }
</script>

<style  scoped>
    .image_slider{
        height: 14.1vw!important;
    }
    @media only screen and (max-width: 600px){
        .image_slider {
            height: 26vw!important;
        }
    }
    @media only screen and (min-width: 600px){
        .image_slider {
            height: 26vw!important;
        }
    }
    @media only screen and (min-width: 768px){
        .image_slider {
            height: 17vw!important;
        }
    }
    .btn_supplier{
        padding: 0.6vw 2.4vw!important;
        margin: 0 0.5vw!important;
    }
    .overlay{
        position: absolute;
        top: 3vw;
        left: 20vw;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
    }
</style>