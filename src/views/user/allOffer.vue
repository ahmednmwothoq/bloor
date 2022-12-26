<template>
    <Header />
    <logo-search />

    <div class="offer_header">
        <img class="image" src="/assets/images/gallary/offers.png"  alt="">
        <span class="title">{{ $t('offers_exchange') }}</span>
    </div>
    <div class="contentStander mt-1 w-100">
        <div class="item" v-for="item in allOffer" :key="item.id" v-if="allOffer.length > 0">
            <item-offer-sec :user="user" :item="item" />
        </div>
        <div class="item" v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                {{ $t('no_data_here') }}offers_exchange
            </div>
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
    export default {
        data() {
            return {
                allOffer: [],
                search:'',
                user:'user',
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
            ItemOfferSec,
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
                await Api.general.getAllOffers().then((res)=>{
                    console.log(res)
                    this.allOffer = res.data.body
                })
            },
        },
    }
</script>

<style  scoped>
.item{
    width: 80%;
    margin: auto;
    margin-top: 3vw;
}

</style>