<template>
    <Header />
    <logo-search />

    <div class="offer_header">
        <img class="image" src="/assets/images/gallary/offers.png"  alt="">
        <span class="title">{{ $t('offers_exchange') }}</span>
    </div>
    <div class="contentStander mt-1 w-100">
        <div class="item" v-for="item in paginatedData" :key="item.id" v-if="paginatedData.length > 0">
            <item-offer-sec :user="user" :item="item" />
        </div>
        <div class="item" v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                {{ $t('no_data_here') }}
            </div>
        </div>

        <div class="m-auto w-90" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
            <pagination 
                v-if="allOffer.length > 0" 
                v-model="page_index" 
                :records="allOffer.length" 
                :per-page="page_size" 
                @paginate="myCallback"
            />
        </div>

    </div>
    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import CreateAt from "@/components/CreateAt.vue"
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import LogoSearch from "@/components/LogoSearch.vue"
import ItemOfferSec from "@/components/ItemOfferSec.vue"
import { useToast } from 'vue-toastification'
import Pagination from 'v-pagination-3';
    export default {
        data() {
            return {
                allOffer: [],
                search:'',
                user:'user',
                page_index: 1,
                page_size: 4
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
            ItemOfferSec,
            Pagination,
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
            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.allOffer.slice(start, end);
            }
        },
        mounted() {
            // console.log(this.idEx)
            this.getAllOffer()
        },
        methods: {
            async getAllOffer(){
                await Api.general.getAllOffers().then((res)=>{
                    // console.log(res)
                    this.allOffer = res.data.body
                })
            },
            myCallback(event){
                // console.log(event);
                this.page_index = event
            },
        },
    }
</script>

<style  scoped>
.item{
    width: 90%;
    margin: auto;
    margin-top: 3vw;
}

</style>