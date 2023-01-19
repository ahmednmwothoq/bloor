<template>
    <Header />
    <only-logo/>
    <div class="contentStander mt-1 w-100">
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

        <!-- <div class="item" v-for="item in allOffer" :key="item.id">
            <item-offer :user="user" :item="item" />
        </div> -->




    </div>
    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import CreateAt from "@/components/CreateAt.vue"
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import OnlyLogo from "@/components/OnlyLogo.vue"
import ItemOffer from "@/components/ItemOffer.vue"
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
            OnlyLogo,
            CreateAt,
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
    width: 80%;
    margin: auto;
    margin-top: 3vw;
}
</style>