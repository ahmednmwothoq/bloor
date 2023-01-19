<template>

    <Header />

    <div v-if="showOverlay" @click="showHide" class="overlay"></div>
    <div class="content_slide">
        <span class="toggle_side"  @click="isActive =! isActive" >
            <i class="fas fa-list-ul icon"></i>
        </span>
        <div :class="isActive ? `slidebar openNavClass` : `slidebar `">
           <list-supplier :sideList="sideList" />
        </div>
        <div class="all">
           <div class="all__up">
            <header-image />
            <header-icons />
           </div>
           <div class="all__down">
            <h2 class="title">
                <button type="button" class="btn btn-primary" @click="showAddProductRev">Add Product</button>
            </h2>
                <div class="section">
                    <div class="item" v-for="item in paginatedData" :key="item.id" v-if="paginatedData.length > 0">
                        <!-- <item-review-product :item="item" /> -->
                        <item-product-supplier :item="item" :user="user" />
                    </div>
                    <div class="item" v-else>
                        <div class="alert alert-primary text-center mb-5" role="alert">
                            {{ $t('no_data_here') }}
                        </div>
                    </div>

                    <div class="m-auto w-90" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
                        <pagination 
                            v-if="products.length > 0" 
                            v-model="page_index" 
                            :records="products.length" 
                            :per-page="page_size" 
                            @paginate="myCallback"
                        />
                    </div>
                </div>
           </div>
        </div>
    </div>

    
    <div v-if="showDivAddProductRev" class="add_product">
        <h2 class="title_add">Add Product</h2>
        <div class="form">
            <form class="">
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="formPro.product_ar" placeholder="Product Name Ar *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="formPro.product_en" placeholder="Product Name En *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="date" v-model="formPro.date" placeholder="Date *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="text" v-model="formPro.link" placeholder="Link *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw">
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 bg-white">
                        <!-- <input type="text" v-model="formPro.questionnaire_ar" placeholder="Question Ar *"  class="custome-input widthInputOffset"> -->
                        <!-- <QuillEditor theme="snow" toolbar="full" v-model:content="formPro.questionnaire_ar" contentType="html"  /> -->
                        <textarea  class="custome-input" v-model="formPro.questionnaire_ar" cols="30" rows="3" placeholder="Questionnaire Ar Your Product........ *"></textarea>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 bg-white">
                        <!-- <input type="text" v-model="formPro.questionnaire_en" placeholder="Question En *"  class="custome-input widthInputOffset"> -->
                        <!-- <QuillEditor theme="snow" toolbar="full" v-model:content="formPro.questionnaire_en" contentType="html"  /> -->
                        <textarea  class="custome-input" v-model="formPro.questionnaire_en" cols="30" rows="3" placeholder="Questionnaire En Your Product........ *"></textarea>
                        
                    </div>
                </div>
                <div class="raw">
                    <div class="upload-images mb-4">
                        <div class="imgs-uploaded" v-if="image_add_product">
                        <ul class="list-style">
                            <li class="list">
                                <img :src="image_add_product" alt="avatar" v-if="image_add_product"/>
                            </li>
                        </ul>
                        </div>
                        <label for="upload-label-add" :class="{'absolute_label mt-5': image_add_product}">
                            <div>
                                Upload Image
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                            </div>
                            <input type="file" accept="image/*" @change="uploadImageItemProduct" id="upload-label-add">
                        </label>
                    </div>
                </div>
                <div class="raw">
                    <button @click.prevent="addProductForm()" class="form__btn" type="submit">Next</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
    import Api from "@/api"
    import Header from "@/components/Header.vue"
    import ListSupplier from "@/components/supplier/ListSupplier.vue"
    import HeaderImage from "@/components/supplier/HeaderImage.vue"
    import HeaderIcons from "@/components/supplier/HeaderIcons.vue"
    import ItemReviewProduct from "@/components/ItemReviewProduct.vue"
    import ItemProductSupplier from "@/components/ItemProductSupplier.vue"
    import Pagination from 'v-pagination-3';
    export default {
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            ItemReviewProduct,
            ItemProductSupplier,
            Pagination,
            // ErrorList
        },
        data() {
            return {
                showDivAddProduct: false,
                showOverlay: false,
                showDivAddProductRev:false,
                isActive:false,
                page_index: 1,
                page_size: 2,
                sideList: [
                    {
                        id:1,
                        name: "Overview",
                        active: '',
                        url:'/supplier'
                    },
                    {
                        id:2,
                        name: "Products",
                        active: 'active',
                        url:'/supplier/products'
                    },
                    {
                        id:3,
                        name: "Offers",
                        active: '',
                        url:'/supplier/offers'
                    },
                    {
                        id:4,
                        name: "Chats",
                        active: '',
                        url:'/supplier/chats'
                    },
                    // {
                    //     id:5,
                    //     name: "Notifications",
                    //     active: '',
                    //     url:'/supplier/notifications'
                    // },
                    {
                        id:6,
                        name: "Complaints",
                        active: '',
                        url:'/supplier/complaints'
                    },
                    {
                        id:7,
                        name: "FAQs",
                        active: '',
                        url:'/supplier/faqs'
                    },
                    // {
                    //     id:8,
                    //     name: "Privacy Policy",
                    //     active: '',
                    //     url:'/supplier/privacy-policy'
                    // },
                    // {
                    //     id:9,
                    //     name: "Terms & Conditions",
                    //     active: '',
                    //     url:'/supplier/terms-conditions'
                    // },
                    {
                        id:10,
                        name: "About us",
                        active: '',
                        url:'/supplier/about-us'
                    },
                    {
                        id:11,
                        name: "Contact us",
                        active: '',
                        url:'/supplier/contact-us'
                    },
                    
                ],
                formPro:{
                    product_ar:'',
                    product_en:'',
                    date:'',
                    questionnaire_ar:'',
                    questionnaire_en:'',
                    link:'',
                },
                image_item_product: null,
                image_add_product: null,
                products:[],
                user:'supplier',
            }
        },
        computed: {
            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.products.slice(start, end);
            }
        },
        mounted() {
            this.getDataProducts()
        },
        methods: {
            async getDataProducts(){
                await Api.supplier.supplierGetProducts().then((res)=>{
                    if(res.data.status){
                        console.log(res.data)
                        this.products = res.data.body
                    }
                });
            },
            showAddProductRev(){
                this.showDivAddProductRev = !this.showDivAddProductRev
                this.showOverlay = !this.showOverlay
            },
            showHide(){
                this.showDivAddProductRev = false
                this.showOverlay = false
            },
            uploadImageItemProduct(event) {
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image_add_product = e.target.result;
                }
                this.image_item_product = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            async addProductForm(){
                const data = new FormData();
                data.append('product_ar', this.formPro.product_ar);
                data.append('product_en', this.formPro.product_en);
                data.append('date', this.formPro.date);
                data.append('questionnaire_ar', this.formPro.questionnaire_ar);
                data.append('questionnaire_en', this.formPro.questionnaire_en);
                data.append('link', this.formPro.link);
                data.append('review_image', this.image_item_product);
                
                await Api.supplier.supplierAddProductRev(data).then((res)=>{
                    // this.$router.go()
                    if(res.data.status){
                        setTimeout(() => this.$router.go(), 2000)
                        // this.notifications = res.data.userData;
                    } 
                    // console.log(res)
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
.all{
    display: flex;
    flex-direction: column;
}
.all .all__up{
    display: flex;
    justify-content: flex-end;
    width: 95%;
    margin: 0 auto;
}
.all .all__down{
    width: 94%;
    margin: 0 auto;
}
.all .all__down .title{
    letter-spacing: 0px;
    color: #6e6e6e;
    font-size: 2.4vw;
}
.section{
    width: 97%;
    margin-top: 50px!important;
    margin: 0 auto;
}

.overlay{
  position: absolute;
  top: 7vw;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000 0% 0% no-repeat padding-box;
  opacity: 0.5;
  z-index: 2;
  display: block !important;
  /* height: 93vw; */
}


/****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .overlay{
        position: absolute;
        top: 7vw;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
        height: 230vw;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .overlay{
        position: absolute;
        top: 6vw;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
        height: 230vw;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .overlay{
        position: absolute;
        top: 5vw;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
        height: 130vw;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .overlay{
        position: absolute;
        top: 5vw;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
        height: 130vw;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .overlay{
        position: absolute;
        top: 4vw;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
        height: 105vw;
    }
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
    .overlay{
        position: absolute;
        top: 3.2vw;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000 0% 0% no-repeat padding-box;
        opacity: 0.5;
        z-index: 2;
        display: block !important;
        height: 97vw;
    }
}

</style>