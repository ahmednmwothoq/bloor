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
            <button class="btn_content" type="submit">{{ $t('search') }}</button>
            </form>
        </div>

        <div class="item" v-for="item in filteredList" :key="item.id" v-if="filteredList.length > 0">
            <!-- <item-review-product :item="item" /> -->
            <item-product-supplier :item="item" :user="user" />
        </div>
        <div class="item" v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                {{ $t('no_data_here') }}
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
import OnlyLogo from "@/components/OnlyLogo.vue"
import ItemProductSupplier from "@/components/ItemProductSupplier.vue"
import { useToast } from 'vue-toastification'
    export default {
        data() {
            return {
                products: [],
                search:'',
                user:'user',
            }
        },
        components:{
            Header,
            FooterVue,
            OnlyLogo,
            CreateAt,
            ItemProductSupplier,
        },
        computed: {
            filteredList() {
                if(this.$i18n.locale == "en"){
                    return this.products.filter(post => {
                        return post.product_en.toLowerCase().includes(this.search.toLowerCase())
                    })
                }else{
                    return this.products.filter(post => {
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
            }
        },
        mounted() {
            // console.log(this.idEx)
            this.GetAllProduct()
        },
        methods: {
            async GetAllProduct(){
                await Api.general.getAllProductstoReviews().then((res)=>{
                    // this.$router.go()
                    console.log(res.data)
                    this.products = res.data.body
                })
            }
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