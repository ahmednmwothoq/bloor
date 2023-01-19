<template>
    <Header />
    <only-logo/>

    <div class="supplier_info">
        <div class="info">
            <img src="/assets/images/avatar/avatar-image.png" alt="" class="image">
            <span class="name">{{ nameSupplier }}</span>
        </div>
        <a  class="follow">{{ $t('follow') }}</a>
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
    width: 10vw;
    height: 12vw;
    border-radius: 50%;
    box-shadow: 5px 5px 6px #00000029;
    /* border: 1px solid #D3D3D3; */
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 45px;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}

.supplier_info .follow{
    width: 7.8125vw;
    /* height: 53px; */
    padding: 0.4vw 2vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 1.458333vw;
    margin-bottom: 1.3vw;
}

.item{
    width: 80%;
    margin: auto;
    margin-top: 3vw;
}

/****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
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
    width: 10vw;
    height: 12vw;
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 5vw;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}
.supplier_info .follow {
    width: 15vw;
    /* height: 53px; */
    padding: 0.9vw 4vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 2.7vw;
    margin-bottom: 1.3vw;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
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
    width: 9.5vw;
    height: 11.5vw;
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 4.5vw;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}
.supplier_info .follow {
    width: 14.5vw;
    /* height: 53px; */
    padding: 0.9vw 4vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 2.2vw;
    margin-bottom: 1.3vw;
}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
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
    width: 8vw;
    height: 10vw;
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 4.1vw;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}
.supplier_info .follow {
    width: 14vw;
    /* height: 53px; */
    padding: 0.9vw 4vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 2.2vw;
    margin-bottom: 0.2vw;
}
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
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
    width: 6vw;
    height: 8vw;
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 3.3vw;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}
.supplier_info .follow {
    width: 12vw;
    /* height: 53px; */
    padding: 0.8vw 3.7vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 1.8vw;
    margin-bottom: 0.2vw;
}
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
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
    width: 5.5vw;
    height: 7vw;
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 2.7vw;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}
.supplier_info .follow {
    width: 10vw;
    /* height: 53px; */
    padding: 0.8vw 3.2vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 1.4vw;
    margin-bottom: 0.2vw;
}
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
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
    width: 4.5vw;
    height: 6vw;
}

.supplier_info .info .name{
    color: #6e6e6e;
    font-size: 2.2vw;
    font-weight: bold;
    margin-left: 2vw;
    margin-right:2vw
}
.supplier_info .follow {
    width: 8vw;
    /* height: 53px; */
    padding: 0.8vw 2.5vw;
    color: #fff;
    text-decoration: none;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 29px;
    font-size: 1.2vw;
    margin-bottom: 0.2vw;
}
}
</style>