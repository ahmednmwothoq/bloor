<template>

    <Header />

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
            <h2 class="title">{{ $t('over_view') }}</h2>
            <div class="raw mt-5 d-flex">
                <div class="col-3 mar-50 width-30">
                    <div class="card_info">
                        <div class="card_info_con">
                            <span class="num">{{ numCountOffer }}</span>
                            <span class="text">{{ $t('offers') }}</span>
                        </div>
                        <div @click="showAddOffer" class="add_card_info">+</div>
                    </div>  
                </div>
                <div class="col-3 mar-90 width-30">
                    <div class="card_info">
                        <div class="card_info_con">
                            <span class="num">{{ numCountProduct }}</span>
                            <span class="text">{{ $t('products') }}</span>
                        </div>
                        <div @click="showAddProductRev" class="add_card_info">+</div>
                    </div>  
                </div>
                <div class="col-4">
                    <!-- <chats /> -->
                </div>
                <!-- <div class="col-4"></div> -->
                <!-- <img src="/assets/images/gallary/laborghini_huracan.jpg" alt="" class="slider__img"> -->
            </div>
            <div class="section section_slider">
                <!-- <h2 class="sec__title"><a style="text-decoration: none;color: #707070;" href="pages/user/reviews.html">Recent Products</a></h2>
                <div class="sec__slider">
                    <div class="owl-carousel owl-theme">
                        <div class="item item__slider">
                            <item-product/>
                        </div>
                        <div class="item item__slider">
                            <item-product/>
                        </div>
                        <div class="item item__slider">
                            <item-product/>
                        </div>
                        <div class="item item__slider">
                            <item-product/>
                        </div>
                        <div class="item item__slider">
                            <item-product/>
                        </div>
                    </div>
                </div> -->
            </div>
           </div>
        </div>
    </div>

    <div v-if="showOverlay" @click="showHide" class="overlay"></div>
    <div v-if="showDivAddProduct" class="add_product">
        <h2 class="title_add">{{ $t('add_Offer') }}</h2>
        <div class="form">
            <form>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="form.company_name_ar" placeholder="Company Name Ar *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="form.company_name_en" placeholder="Company Name En *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="number" v-model="form.known_number" placeholder="Known Number *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="number" v-model="form.commercial_registration" placeholder="Commercial Registration *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="form.product_ar" placeholder="Product Name Ar *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="form.product_en" placeholder="Product Name En *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="text" v-model="form.type" placeholder="Type *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="number" v-model="form.quantity" placeholder="Quantity *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 ">
                        <input type="number" v-model="form.original_price" placeholder="Original Price *"  class="custome-input">
                    </div>
                </div>
                
                <div class="raw">
                    <div class="form-group col-12 mb-3">
                        <textarea  class="custome-input" v-model="form.product_description_ar" cols="30" rows="3" placeholder="Description Ar Your Offer / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
                    </div>
                    <div class="form-group col-12 mb-3">
                        <textarea  class="custome-input" v-model="form.product_description_en" cols="30" rows="3" placeholder="Description En Your Offer / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
                    </div>
                </div>
                
                <div class="raw">
                    <div class="upload-images mb-4">
                        <div class="imgs-uploaded" v-if="image_file">
                        <ul class="list-style">
                            <li class="list">
                                <img :src="image_file" alt="avatar" v-if="image_file"/>
                            </li>
                        </ul>
                        </div>
                        <label for="upload-label" :class="{'absolute_label mt-5': image_file}">
                            <div>
                                Upload Image
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                            </div>
                            <input type="file" accept="image/*" @change="uploadImageItem" id="upload-label">
                        </label>
                    </div>
                </div>
                <div class="raw">
                    <div class="upload-images mb-4">
                        <div class="imgs-uploaded" v-if="preview_images.length > 0">
                        <ul class="list-style">
                            <li class="list" v-for="(item, index) in preview_images" :key="index">
                                <img :src="item" alt="alt_img">
                                <button class="delete-btn" type="button" @click.prevent="deleteImg(item)">
                                    <i class="fas fa-trash-alt fa-2x icon"></i>
                                </button>
                            </li>
                        </ul>
                        </div>
                        <label for="upload-label-first" :class="{'absolute_label mt-5': preview_images.length > 0}">
                            <div>
                                Upload Offer Images 
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                            </div>
                            <input type="file" accept="image/*" multiple="multiple" @change="uploadImages" id="upload-label-first">
                        </label>
                    </div>
                </div>
                <div class="raw">
                    <button @click.prevent="addOfferForm()" class="form__btn" type="submit">Next</button>
                </div>
            </form>
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
                        <div class="imgs-uploaded" v-if="image_file_product">
                        <ul class="list-style">
                            <li class="list">
                                <img :src="image_file_product" alt="avatar" v-if="image_file_product"/>
                            </li>
                        </ul>
                        </div>
                        <label for="upload-label" :class="{'absolute_label mt-5': image_file_product}">
                            <div>
                                Upload Image
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                            </div>
                            <input type="file" accept="image/*" @change="uploadImageItemProduct" id="upload-label">
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
    import axios from "axios"
    import Api from "@/api"
    // CKEDITOR.replace( 'editor1' );
    import { mapActions } from 'vuex'
    // components
    // import CKEditor from 'ckeditor4';
    import Header from "@/components/Header.vue"
    import ListSupplier from "@/components/supplier/ListSupplier.vue"
    import HeaderImage from "@/components/supplier/HeaderImage.vue"
    import HeaderIcons from "@/components/supplier/HeaderIcons.vue"
    import CardInfo from "@/components/supplier/CardInfo.vue"
    import Chats from "@/components/Chats.vue"
    import ItemProduct from "@/components/ItemProduct.vue"
    // import ErrorList from "../components/ErrorList.vue"
    export default {
        name: "Home",
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            CardInfo,
            Chats,
            ItemProduct,
            // CKEditor,
            // ErrorList
        },
        data() {
            return {
                showDivAddProduct: false,
                showDivAddProductRev: false,
                showOverlay: false,
                isActive: false,
                sideList: [
                    {
                        id:1,
                        name: "Overview",
                        active: 'active',
                        url:'/supplier'
                    },
                    {
                        id:2,
                        name: "Products",
                        active: '',
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
                preview_images: [],
                image_list: [],
                image_item: null,
                image_file: null,
                image_item_product: null,
                image_file_product: null,

                numCountOffer: '',
                numCountProduct: '',

                form:{
                    company_name_ar: '',
                    company_name_en: '',
                    type: '',
                    quantity: '',
                    known_number: '',
                    product_ar: '',
                    product_en: '',
                    product_description_ar: '',
                    product_description_en: '',
                    original_price: '',
                    commercial_registration: '',
                },
                formPro:{
                    product_ar:'',
                    product_en:'',
                    date:'',
                    questionnaire_ar:'',
                    questionnaire_en:'',
                    link:'',
                }
            }
        },
        mounted(){
            // let user = localStorage.getItem("userToken")
            // // let user = localStorage.getItem("token")
            // if(!user){
            //     this.redirectTo({ val: "userLogin" })
            // }
            // $("#editor1").CKEDITOR;
            // CKEDITOR.replace( 'editor1' );
            this.getCountProduct()
            this.getCountOffer()
        },
        methods:{
            ...mapActions(['redirectTo']),
            deleteImg(event) {
                for (let index = 0; index < this.preview_images.length; index++) {
                if (event == this.preview_images[index]) {
                    this.preview_images.splice(index, 1)
                    this.image_list.splice(index, 1)
                }
                }
            },
            uploadImages(event) {
                var input = event.target;
                var count = input.files.length;
                var index = 0;
                if (input.files) {
                while(count --) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                    this.preview_images.push(e.target.result);
                    }
                    this.image_list.push(input.files[index]);
                    reader.readAsDataURL(input.files[index]);
                    index ++;
                }
                }
            },
            uploadImageItem(event) {
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image_file = e.target.result;
                }
                this.image_item = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            uploadImageItemProduct(event) {
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image_file_product = e.target.result;
                }
                this.image_item_product = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            showAddOffer(){
                this.showDivAddProduct = !this.showDivAddProduct
                this.showOverlay = !this.showOverlay
            },
            showAddProductRev(){
                this.showDivAddProductRev = !this.showDivAddProductRev
                this.showOverlay = !this.showOverlay
            },
            showHide(){
                this.showDivAddProduct = false
                this.showDivAddProductRev = false
                this.showOverlay = false
            },
            async addOfferForm(){
                const data = new FormData();
                data.append('company_name_ar', this.form.company_name_ar);
                data.append('company_name_en', this.form.company_name_en);
                data.append('type', this.form.type);
                data.append('quantity', this.form.quantity);
                data.append('known_number', this.form.known_number);
                data.append('product_ar', this.form.product_ar);
                data.append('product_en', this.form.product_en);
                data.append('product_description_ar', this.form.product_description_ar);
                data.append('product_description_en', this.form.product_description_en);
                data.append('original_price', this.form.original_price);
                data.append('commercial_registration', this.form.commercial_registration);
                for (let index = 0; index < this.image_list.length; index++) {
                    data.append(`offer_images[${index}]`, this.image_list[index]);
                }
                data.append('image', this.image_item);

                await Api.supplier.supplierAddOffer(data).then((res)=>{
                    // if(res.data.status){
                    
                    //     this.notifications = res.data.userData;
                    // } 
                    console.log(res)
                })
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
                    // if(res.data.status){
                    
                    //     this.notifications = res.data.userData;
                    // } 
                    console.log(res)
                })
            },
            async getCountProduct(){
                await Api.supplier.supplierCountProduct().then((res)=>{
                    // console.log("Suppliers",res)
                    if(res.data.status){
                        // console.log("Suppliers",res)
                        this.numCountProduct = res.data.body
                    }
                })
            },

            async getCountOffer(){
                await Api.supplier.supplierCountOffer().then((res)=>{
                    // console.log("Suppliers 2",res)
                    if(res.data.status){
                        // console.log("Suppliers",res)
                        this.numCountOffer = res.data.body
                    }
                })
            },
        }
    }
</script>

<style  scoped>

.width-30{
    width: 28% !important;
}
.widthInputOffset{
   width: 95% !important ;
}
.widthInputOffset3{
   width: 30% !important ;
}
.mar-50{
    margin-right: 3vw;
}

.mar-90{
    margin-right: 5vw;
}
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
    color: #B1B1B1;
    font-size: 2.4vw;
}
.card_info{
    width: 100%;
    height: 12.5vw;
    /* UI Properties */
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #E8E8E8;
    border-radius: 11px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
}
.card_info .card_info_con{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 0 auto;
}
.card_info .card_info_con .num{
    color: #B1B1B1;
    font-size: 1.8vw;
    font-weight: 500;
}
.card_info .card_info_con .text{
    color: #B1B1B1;
    font-size: 1.8vw;
    font-weight: 500;
}
.card_info .add_card_info{
    height: 3.4vw;
    border-radius: 50%;
    background: #0136EE 0% 0% no-repeat padding-box;
    font-size: 2.7vw;
    color: #FFFFFF;
    margin: 0.70373vw 2.263054vw;
    padding: 0px 0.7vw;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
}
.sec__title {
    font-size: 1.82387vw;
    opacity: 0.5;
    margin-bottom: 5.21105vw;
}
.item__slider {
    width: 90%;
}
.section_slider{
    width: 75vw;
    margin: auto;
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
}

/****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .all .all__down .title{
        letter-spacing: 0px;
        color: #B1B1B1;
        font-size: 4.5vw;
        margin-top: 2vw;
    }
    .width-30{
        width: 42% !important;
    }
    .mar-50{
        margin-right: 5vw;
    }
    .mar-90{
        margin-right: 7vw;
    }
    .card_info{
        height: 25vw;
    }

    .card_info .card_info_con .num{
        font-size: 4vw;
    }
    .card_info .card_info_con .text{
        font-size: 4vw;
    }
    .card_info .add_card_info{
        height: 6vw;
        font-size: 5vw;
        margin: 0.9vw 2.263054vw;
        padding: 0px 1.4vw;
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
    }
    
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .all .all__down .title{
        letter-spacing: 0px;
        color: #B1B1B1;
        font-size: 4.5vw;
        margin-top: 2vw;
    }
    .width-30{
        width: 42% !important;
    }
    .mar-50{
        margin-right: 5vw;
    }
    .mar-90{
        margin-right: 7vw;
    }
    .card_info{
        height: 25vw;
    }

    .card_info .card_info_con .num{
        font-size: 4vw;
    }
    .card_info .card_info_con .text{
        font-size: 4vw;
    }
    .card_info .add_card_info{
        height: 6vw;
        font-size: 5vw;
        margin: 0.9vw 2.263054vw;
        padding: 0px 1.3vw;
    }
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
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .all .all__down .title{
        letter-spacing: 0px;
        color: #B1B1B1;
        font-size: 3.5vw;
        margin-top: 2vw;
    }
    .width-30{
        width: 40% !important;
    }
    .mar-50{
        margin-right: 5vw;
    }
    .mar-90{
        margin-right: 7vw;
    }
    .card_info{
        height: 23vw;
    }

    .card_info .card_info_con .num{
        font-size: 3.5vw;
    }
    .card_info .card_info_con .text{
        font-size: 3.5vw;
    }
    .card_info .add_card_info{
        height: 5vw;
        font-size: 4vw;
        margin: 0.9vw 2.263054vw;
        padding: 0px 1.3vw;
    }

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
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .all .all__down .title{
        letter-spacing: 0px;
        color: #B1B1B1;
        font-size: 3vw;
        margin-top: 2vw;
    }
    .width-30{
        width: 40% !important;
    }
    .mar-50{
        margin-right: 5vw;
    }
    .mar-90{
        margin-right: 7vw;
    }
    .card_info{
        height: 21vw;
    }

    .card_info .card_info_con .num{
        font-size: 3vw;
    }
    .card_info .card_info_con .text{
        font-size: 3vw;
    }
    .card_info .add_card_info{
        height: 5vw;
        font-size: 3.54vw;
        margin: 0.9vw 2.263054vw;
        padding: 0px 1.3vw;
    }
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
    }
}


/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .all .all__down .title{
        letter-spacing: 0px;
        color: #B1B1B1;
        font-size: 2vw;
        margin-top: 2vw;
    }
    .width-30{
        width: 30% !important;
    }
    .mar-50{
        margin-right: 5vw;
    }
    .mar-90{
        margin-right: 7vw;
    }
    .card_info{
        height: 16vw;
    }

    .card_info .card_info_con .num{
        font-size: 2vw;
    }
    .card_info .card_info_con .text{
        font-size: 2vw;
    }
    .card_info .add_card_info{
        height: 4vw;
        font-size: 3vw;
        margin: 0.9vw 2.263054vw;
        padding: 0px 1vw;
    }

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
    }
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
    .all .all__down .title{
        letter-spacing: 0px;
        color: #B1B1B1;
        font-size: 1.7vw;
        margin-top: 2vw;
    }
    .width-30{
        width: 30% !important;
    }
    .mar-50{
        margin-right: 5vw;
    }
    .mar-90{
        margin-right: 7vw;
    }
    .card_info{
        height: 13vw;
    }

    .card_info .card_info_con .num{
        font-size: 1.6vw;
    }
    .card_info .card_info_con .text{
        font-size: 1.6vw;
    }
    .card_info .add_card_info{
        height: 3vw;
        font-size: 2vw;
        margin: 0.9vw 2.263054vw;
        padding: 0px 0.9vw;
    }
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
    }
}


</style>