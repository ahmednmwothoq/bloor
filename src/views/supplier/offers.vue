<template>

    <Header />

    <div class="content_slide">
        <div class="slidebar">
           <list-supplier :sideList="sideList" />
        </div>
        <div class="all">
           <div class="all__up">
            <header-image />
            <header-icons />
           </div>
           <div class="all__down">
            <h2 class="title">
                <button type="button" class="btn btn-primary" @click="showAddOffer">Add Offer</button>
            </h2>
            <div class="section">
                <div class="item" v-for="item in offers" :key="item.id">
                    <item-offer :user="user" :item="item" @editOffer="editOffer" @deleteOffer="deleteOffer" />
                </div>
            </div>
           </div>
        </div>
    </div>

    <div v-if="showOverlay" @click="showHide" class="overlay"></div>
    <div v-if="showDivEditOffer" class="add_product">
        <h2 class="title_add">Edit Offer</h2>
        <div class="form">
            <form>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="offerDetail.company_name_ar" placeholder="Company Name Ar *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="offerDetail.company_name_en" placeholder="Company Name En *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="number" v-model="offerDetail.known_number" placeholder="Known Number *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="number" v-model="offerDetail.commercial_registration" placeholder="Commercial Registration *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="offerDetail.product_ar" placeholder="Product Name Ar *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="offerDetail.product_en" placeholder="Product Name En *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="text" v-model="offerDetail.type" placeholder="Type *"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="number" v-model="offerDetail.quantity" placeholder="Quantity *"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 ">
                        <input type="number" v-model="offerDetail.original_price" placeholder="Original Price *"  class="custome-input">
                    </div>
                </div>
                
                <div class="raw">
                    <div class="form-group col-12 mb-3">
                        <textarea  class="custome-input" v-model="offerDetail.product_description_ar" cols="30" rows="3" placeholder="Description Ar Your Offer / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
                    </div>
                    <div class="form-group col-12 mb-3">
                        <textarea  class="custome-input" v-model="offerDetail.product_description_en" cols="30" rows="3" placeholder="Description En Your Offer / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
                    </div>
                </div>
                
                
                <div class="raw">
                    <button @click.prevent="updateOfferForm()" class="form__btn" type="submit">Edit</button>
                    <button @click.prevent="showHide()" class="form__btn bg-red" >Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="showDivAddOffer" class="add_product">
        <h2 class="title_add">Add Offer</h2>
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

</template>

<script>
    import Api from "@/api"
    import Header from "@/components/Header.vue"
    import ListSupplier from "@/components/supplier/ListSupplier.vue"
    import HeaderImage from "@/components/supplier/HeaderImage.vue"
    import HeaderIcons from "@/components/supplier/HeaderIcons.vue"
    import ItemOffer from "@/components/ItemOffer.vue"
    import { useToast } from 'vue-toastification'

    export default {
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            ItemOffer,
            // ErrorList
        },
        data() {
            return {
                showDivAddOffer: false,
                showDivEditOffer: false,
                showOverlay: false,
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
                        active: '',
                        url:'/supplier/products'
                    },
                    {
                        id:3,
                        name: "Offers",
                        active: 'active',
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
                offers: [],
                user: 'supplier',
                offerDetail: null,
                idOffer: null,
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
                preview_images: [],
                image_list: [],
                image_item: null,
                image_file: null,

            }
        },
        mounted(){
            // let user = localStorage.getItem("userToken")
            // // let user = localStorage.getItem("token")
            // if(!user){
            //     this.redirectTo({ val: "userLogin" })
            // }
            this.getDataOffers()
        },
        methods:{
            showAddOffer(){
                this.showDivAddOffer = !this.showDivAddOffer
                this.showOverlay = !this.showOverlay
            },
            showHide(){
                this.showDivEditOffer = false
                this.showDivAddOffer = false
                this.showOverlay = false
            },
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
            async getDataOffers(){
                await Api.supplier.supplierGetOffers().then((res)=>{
                    if(res.data.status){
                        console.log(res.data)
                        this.offers = res.data.body
                    }
                });
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
                    if(res.data.status){
                    
                        this.$router.go()
                    } 
                    console.log(res)
                })
            },
            async editOffer(event){
                await Api.supplier.supplierGetOfferEdit(event).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.offerDetail = res.data.body
                        this.idOffer = res.data.body.id

                        this.showDivEditOffer = true
                        this.showOverlay = true
                    }
                });
            },
            async updateOfferForm(){
                const data = new FormData();
                data.append('company_name_ar', this.offerDetail.company_name_ar);
                data.append('company_name_en', this.offerDetail.company_name_en);
                data.append('type', this.offerDetail.type);
                data.append('quantity', this.offerDetail.quantity);
                data.append('known_number', this.offerDetail.known_number);
                data.append('product_ar', this.offerDetail.product_ar);
                data.append('product_en', this.offerDetail.product_en);
                data.append('product_description_ar', this.offerDetail.product_description_ar);
                data.append('product_description_en', this.offerDetail.product_description_en);
                data.append('original_price', this.offerDetail.original_price);
                data.append('commercial_registration', this.offerDetail.commercial_registration);

                await Api.supplier.supplierOfferUpdate(this.idOffer,data).then((res)=>{
                    if(res.data.status){
                        this.$router.go()
                    } 
                    
                })

            },
            async deleteOffer(event){
                console.log(event)
                await Api.supplier.supplierOfferDelete(event).then((res)=>{
                    if(res.data.status){
                        this.$router.go()
                    } 
                    
                })
            }
        }
    }
</script>

<style scoped>
.bg-red{
    background: #d40000!important;
}
.widthInputOffset{
   width: 95% !important ;
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

.section{
    width: 75vw;
    margin-top: 50px;
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