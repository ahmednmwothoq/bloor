<template>
    <Header />
    <only-logo/>

    <div class="supplier_info">
        <div class="info">
            <img src="/assets/images/avatar/person2.jpg" alt="" class="image">
            <span class="name">{{ nameSupplier }}</span>
        </div>
        <a  class="follow">Follow</a>
    </div>

    <div class="search__content">
        <form action="" class="form_content">
            <div class="d-flex">
                <!-- <div class="form__feild">
                    <select class="form-control feild__select" name="" id="">
                        <option>Dept.</option>
                        <option>Dept.</option>
                        <option>Dept.</option>
                    </select>
                    <i class="fas fa-sort-down icon"></i>
                    <span class="label">Type</span>
                </div> -->
                <div class="form__feild">
                    <input class="form-control feild__select feild__input" v-model="search" type="text" :placeholder="$t('search_here')">
                </div>
                
            </div>
            <!-- <button class="btn_content" type="submit">{{ $t('search') }}</button> -->
        </form>
    </div>

    <!-- <div class="filter__nav">
        <span class="nav__title">{{ nameSupplier }} Offers</span>
        <a  class="nav__btn">
            By Date
            <i class="fas fa-filter nav__icon"></i>
        </a>
    </div> -->

    <div class="item" v-for="item in paginatedData" :key="item.id" v-if="paginatedData.length > 0">
        <item-offer :user="user" :item="item" />
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
    



    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
// import CreateAt from "@/components/CreateAt.vue"
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import OnlyLogo from "@/components/OnlyLogo.vue"
import ItemOffer from "@/components/ItemOffer.vue"
import Pagination from 'v-pagination-3';
// import ItemProductSupplier from "@/components/ItemProductSupplier.vue"
    export default {
        data() {
            return {
                allOffer: [],
                search:'',
                idSupplier: this.$route.params.id,
                nameSupplier: this.$route.query.name,
                user:'user',
                page_index: 1,
                page_size: 4
            }
        },
        components:{
            Header,
            FooterVue,
            OnlyLogo,
            ItemOffer,
            Pagination,
        },
        computed: {
            filteredList() {
                if(this.$i18n.locale == "en"){
                    return this.allOffer.filter(post => {
                        return post.product_en.toLowerCase().includes(this.search.toLowerCase())
                    })
                }else{
                    return this.allOffer.filter(post => {
                        return post.product_ar.toLowerCase().includes(this.search.toLowerCase())
                    })
                }
            
            },
            
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
                return this.filteredList.slice(start, end);
            }
        },
        mounted() {
            // console.log(this.idEx)
            this.getAllOffer()
            console.log(this.$route.params.id)
            console.log(this.$route.query.name)
        },
        methods: {
            async getAllOffer(){
                await Api.general.getAllOffersSupplier(this.idSupplier).then((res)=>{
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

<style scoped>
/* supplier  */

.supplier_info{
    display: flex;
    justify-content: space-between;
    width: 88%;
    margin: auto;
    margin-top: 51px;
    align-items: center;
    margin-bottom: 90px;
}

.supplier_info .info{
    display: flex;
    align-items: center;
    flex-direction: row;
}

.supplier_info .info .image{
    width: 142px;
    height: 163px;
    border-radius: 50%;
    box-shadow: 5px 5px 6px #00000029;
    border: 1px solid #D3D3D3;
}

.supplier_info .info .name{
    color: #000000;
    font-size: 45px;
    font-weight: bold;
    margin-left: 50px;
}

.supplier_info .follow{
    width: 7.8125vw;
    color: #0136EE;
    text-decoration: none;
    border-radius: 29px;
    font-size: 1.458333vw;
    margin-bottom: 1.6055vw;
    height: 53px;
    border: 1px solid #0136EE;
    padding: 0.208334vw 1.80334vw;
    font-weight: 500;
}

.item{
    width: 80%;
    margin: auto;
    margin-top: 3vw;
}
</style>