<template>
    <Header />
    <only-logo/>
    <div class="contentStander mt-1 w-100">
        <div class="search__content">
            <form action="" class="form_content">
                <div class="d-flex">
                    <div class="form__feild">
                        <select class="form-control feild__select" @change="onChange($event)" id="">
                            <option value="" selected>{{ $t('type') }}.</option>
                            <option value="white">{{ $t('white') }}</option>
                            <option value="blue">{{ $t('blue') }}</option>
                            <option value="gold">{{ $t('gold') }}</option>
                        </select>
                        <i class="fas fa-sort-down icon"></i>
                        <span class="label">{{ $t('type') }}</span>
                    </div>
                    <!-- <div class="form__feild">
                        <input class="form-control feild__select feild__input" v-model="search" type="text" placeholder="Search Here............">
                    </div> -->
                    
                </div>
            <button class="btn_content" @click="DoTheSearch">{{ $t('search') }}</button>
            </form>
        </div>

        <div class="item" v-for="item in paginatedData" :key="item.id" v-if="paginatedData.length > 0">
            <item-experience :item="item" />
        </div>
        <div class="item" v-else>
            <div class="alert alert-primary text-center mb-5" role="alert">
                {{ $t('no_data_here') }}
            </div>
        </div>

        <div class="m-auto w-90" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
            <pagination 
                v-if="allExperiences.length > 0" 
                v-model="page_index" 
                :records="allExperiences.length" 
                :per-page="page_size" 
                @paginate="myCallback"
            />
        </div>

        <!-- <div class="item" v-for="item in allExperiences" :key="item.id">
            <item-experience :item="item" />
        </div> -->

        <!-- <div class="item d-flex justify-content-between" style="width: 254vw;">
                    <item-experience :item="item" v-for="item in allExperiences" :key="item.id" />
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
import ItemExperience from "@/components/ItemExperience.vue"
import { useToast } from 'vue-toastification'
import Pagination from 'v-pagination-3';
    export default {
        data() {
            return {
                allExperiences: [],
                search:'',
                typeBloor:'',
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
            ItemExperience,
            Pagination,
        },
        computed: {
            filteredList() {
                return this.allExperiences.filter(post => {
                    // const byFname = post.user.f_name.toLowerCase().includes(this.search.toLowerCase()) > -1;
                    // const byLname = post.user.l_name.toLowerCase().includes(this.search.toLowerCase()) > -1 ;
                    // const bloorColor = post.bloor_colour.toLowerCase().includes(this.typeBloor.toLowerCase()) > -1;
                    
                    // if (bloorColor === true) {
                    //     if(byFname === true){
                    //         return this.allExperiences.filter(pos => {
                    //             return pos.user.f_name.toLowerCase().includes(this.search.toLowerCase())
                    //         });
                    //     }else{
                    //         return bloorColor
                    //     }
                    // } else if (byLname === true) {
                    //     return byLname;
                    // }
                    return post.bloor_colour.toLowerCase().includes(this.typeBloor.toLowerCase())
                })
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
            this.getAllExperience()
        },
        methods: {
            async getAllExperience(){
                await Api.general.getAllExperiments().then((res)=>{
                    console.log(res)
                    this.allExperiences = res.data.body
                })
            },
            onChange(event) {
                console.log(event.target.value)
                this.typeBloor = event.target.value
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