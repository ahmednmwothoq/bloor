<template>
    <div class="item item__product_rev">
        <div class="offer__img" v-if="user == 'user'"  @click="this.$router.push({ name: 'showReview', params: { id: item.id }})">
            <img class="image" :src="item.media[0].original_url" alt="">
        </div>
        <div class="offer__img" v-else>
            <img class="image" :src="item.media[0].original_url" alt="">
        </div>
        <div class="offer__info">
            <div class="content">
                <h3 class="info__title">{{getLocales ? item.product_ar : item.product_en }}</h3>
                <span class="info__date"><CreateAt :create="item.created_at" /></span>
                <div class="info__details">
                    <div class="detail__desc"> 
                        <span class="detail_title">{{ $t('questionnaire_home') }}</span>
                        <!-- <p class="desc__text" v-html="item.questionnaire_ar" v-if="getLocales"></p>
                        <p class="desc__text" v-html="item.questionnaire_en" v-if="!getLocales"></p> -->
                        <p class="desc__text">
                            <ol>
                                <li v-for="ques in item.questions" :key="ques.id">
                                    <span>{{ getLocales ? ques.question_ar : ques.question_en }}</span>
                                </li>
                            </ol>
                        </p>
                    </div>
                    <div class="detail__added">
                        <span class="detail_title">{{ $t('added_by_home') }}</span>
                        <div class="added__person">
                            <img src="/assets/images/avatar/avatar-image.png" alt="" class="person">
                            <div class="person_info">
                                <span class="name">{{item.username}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail__added">
                        <span class="detail_title">{{ $t('date_home') }}</span>
                        <div class="added__person">
                            <div class="person_info">
                                <span class="name">{{item.date}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="offer_request" v-if="user == 'supplier'">
                <div class="mb-3 _b_btn">
                    <a class="request__btn btn_supplier" @click="this.$router.push({ name: 'SupplierProductQuestions', params: { id: item.id }})" >{{ $t('questions') }}</a>
                    <!-- <a class="request__btn btn_supplier" @click="this.$router.push({ name: 'SupplierProductUsersAnswers', params: { id: item.id }})" >{{ $t('users_answers') }}</a> -->
                    <a class="request__btn btn_supplier" data-bs-toggle="modal" data-bs-target="#ViewUserAnswersModalProduct" >{{ $t('users_answers') }}</a>
                </div>
                <div class="mb-3 _b_btn">
                    <a class="request__btn btn_supplier" data-bs-toggle="modal" :data-bs-target="`#addQuestionModalProduct${item.id}`" >{{ $t('add_question') }}</a>
                    <a class="request__btn btn_supplier" @click="showEditProductRev('theDivProductEdit-'+ item.id)">{{ $t('edit') }}</a>
                    <a class="request__btn btn_supplier" data-bs-toggle="modal" :data-bs-target="`#deleteModalProduct${item.id}`" >{{ $t('delete') }}</a>
                </div>
            </div>
            <div class="offer_request" v-else>
                <!-- <a class="request__btn"  @click="showReviewToProduct('theDivAddReview-'+ item.id)" >Review</a> -->
                <!-- <button class="request__btn" @click="this.$router.push({ name: 'addReview', params: { id: item.id }})" >{{ $t('review') }}</button> -->
                <!-- <router-link :to="`/books/${item.id}`">asdasd</router-link> -->
                <!-- <router-link class="request__btn" :to="`/books/${item.id}`">{{ $t('review') }}</router-link> -->
                <!-- <router-link class="request__btn" :to="`/add-review/${item.id}`">{{ $t('review') }}</router-link> -->
                <!-- <router-link class="request__btn btn_supplier" :to="`/show-review/${item.id}`">{{ $t('show_reviews') }}</router-link> -->
                <div>
                    <!-- <a class="request__btn" @click="this.$router.push({ name: 'addReview', params: { id: item.id }})">{{ $t('review') }}</a> -->
                    <a class="request__btn"
                        @click="this.$router.push({ path: `/add-review/${item.id}`, query: { name: item.product_ar }})"
                        v-if="this.$i18n.locale === 'ar'"
                    >
                        {{ $t('review') }}
                    </a>
                    
                    <a class="request__btn" 
                        @click="this.$router.push({ path: `/add-review/${item.id}`, query: { name: item.product_ar }})" 
                        v-else
                    >
                        {{ $t('review') }}
                    </a>
                    
                    <a class="request__btn btn_supplier" @click="this.$router.push({ name: 'showReview', params: { id: item.id }})" >{{ $t('show_reviews') }}</a>
        
                </div>
            </div>
        </div>
    </div>

    <div v-if="showOverlay" @click="showEditProductRev('theDivProductEdit-'+ item.id)" class="overlay"></div>

    <div :id="'theDivProductEdit-'+ item.id" class="add_product" style="display: none;">
        <h2 class="title_add">{{ $t('edit_product') }}</h2>
        <div class="form">
            <form class="">
                <div class="raw d-flex justify-content-between">
                    <div class="col-6 text-white">
                        <label for="">{{ $t('product_name_ar') }}</label>
                    </div>
                    <div class="col-6 text-white">
                        <label for="">{{ $t('product_name_en') }}</label>
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="item.product_ar" :placeholder="$t('product_name_ar') +` *`"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3">
                        <input type="text" v-model="item.product_en" :placeholder="$t('product_name_en') +` *`"  class="custome-input widthInputOffset">
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="col-6 text-white">
                        <label for="">{{ $t('date') }}</label>
                    </div>
                    <div class="col-6 text-white">
                        <label for="">{{ $t('link') }}</label>
                    </div>
                </div>
                <div class="raw d-flex justify-content-between">
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="date" v-model="item.date" :placeholder="$t('date')+` *`"  class="custome-input widthInputOffset">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-sm-12 mb-3 ">
                        <input type="text" v-model="item.link" :placeholder="$t('link')+` *`"  class="custome-input widthInputOffset">
                    </div>
                </div>
                        <!-- <input type="text" v-model="formPro.questionnaire_ar" placeholder="Question Ar *"  class="custome-input widthInputOffset"> -->
                        <!-- <QuillEditor theme="snow" toolbar="full" v-model:content="item.questionnaire_ar" contentType="html"  /> -->
                <!-- <div class="raw">
                    <div class="col-12 text-white">
                        <label for="">{{ $t('questionnaire_ar') }}</label>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 bg-white">
                        <textarea  class="custome-input" v-model="item.questionnaire_ar" cols="30" rows="3" placeholder="Questionnaire Ar Your Product........ *"></textarea>
                    </div>
                    <div class="col-12 text-white">
                        <label for="">{{ $t('questionnaire_en') }}</label>
                    </div>
                    <div class="form-group col-lg-12 col-md-12 col-sm-12 mb-3 bg-white">
                        <textarea  class="custome-input" v-model="item.questionnaire_en" cols="30" rows="3" placeholder="Questionnaire En Your Product........ *"></textarea>
                    </div>
                </div> -->
                        <!-- <input type="text" v-model="formPro.questionnaire_en" placeholder="Question En *"  class="custome-input widthInputOffset"> -->
                        <!-- <QuillEditor theme="snow" toolbar="full" v-model:content="item.questionnaire_en" contentType="html"  /> -->
                <div class="raw">
                    <div class="col-12 text-white">
                        <label for="">{{ $t('upload_image') }}</label>
                    </div>
                    <div class="upload-images mb-4">
                        <div class="imgs-uploaded" v-if="image_file_product">
                        <ul class="list-style">
                            <li class="list">
                                <img :src="image_file_product" alt="avatar" v-if="image_file_product"/>
                            </li>
                        </ul>
                        </div>

                        <div class="imgs-uploaded" v-else>
                        <ul class="list-style">
                            <li class="list">
                                <img :src="item.media[0].original_url" alt="avatar"/>
                            </li>
                        </ul>
                        </div>

                        <label for="upload-label-edit-pr" :class="{'absolute_label mt-5': image_file_product}">
                            <div>
                                {{ $t('upload_image') }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                            </div>
                            <input type="file" accept="image/*" @change="uploadImageItemProduct" id="upload-label-edit-pr">
                        </label>
                    </div>
                </div>
                <div class="raw">
                    <button @click.prevent="editProductForm(item.id)" class="form__btn" type="submit">{{ $t('next') }}</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="`deleteModalProduct${item.id}`" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
               {{ $t('are_you_sure') }}
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('no') }}</button>
                <button type="button" class="btn btn-primary" @click="sentDeleteProduct(item.id)">{{ $t('yes') }}</button>
            </div>
            </div>
        </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" :id="`addQuestionModalProduct${item.id}`" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div :class="this.$i18n.locale === 'ar' ?`modal-header flex-row-reverse`: `modal-header`">
                    <h5 class="modal-title">{{ $t('add_question') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                    <div :class="this.$i18n.locale === 'ar' ?`mb-3 text-end`: `mb-3 text-start`">
                        <label class="form-label">{{ $t('question_ar') }}</label>
                        <input type="text" v-model="question.question_ar" class="form-control">
                    </div>
                    <div :class="this.$i18n.locale === 'ar' ?`mb-3 text-end`: `mb-3 text-start`">
                        <label class="form-label">{{ $t('question_en') }}</label>
                        <input type="text" v-model="question.question_en" class="form-control" >
                    </div>
                    <div :class="this.$i18n.locale === 'ar' ?`mb-3 form-check text-end w-75`: `mb-3 form-check text-start w-75`">
                        <input type="checkbox" v-model="question.rate" true-value="1" false-value="0" class="form-check-input">
                        <label class="form-check-label" >{{ $t('answer_has_rate') }}</label>
                    </div>
                    <div :class="this.$i18n.locale === 'ar' ?`mb-3 form-check text-end w-75`: `mb-3 form-check text-start w-75`">
                        <input type="checkbox" v-model="question.text" true-value="1" false-value="0" class="form-check-input">
                        <label class="form-check-label" >{{ $t('answer_has_text') }}</label>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                    <button type="button" class="btn btn-primary" @click="sentAddQuestion(item.id)"  data-bs-dismiss="modal">{{ $t('save') }}</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="ViewUserAnswersModalProduct" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div :class="this.$i18n.locale === 'ar' ?`modal-header flex-row-reverse`: `modal-header`">
                    <h5 class="modal-title">{{ $t('questions') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- <li v-for="ques in item.questions" :key="ques.id">
                    <span>{{ getLocales ? ques.question_ar : ques.question_en }}</span>
                </li> -->
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{ getLocales ? $t('question_ar') : $t('question_en') }}</th>
                            <th scope="col">{{ $t('view_user_answers') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ques , index) in item.questions" :key="ques.id">
                                <th scope="row">{{ index+1 }}</th>
                                <td>{{ getLocales ? ques.question_ar : ques.question_en }}</td>
                                <td class="cursor_pointer" @click="this.$router.push({ path: `/supplier/products/users-answers/${ques.id}`, query: { id: `${item.id}`} })" data-bs-dismiss="modal">{{ $t('go') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                </div>
            </div>
        </div>
    </div>


    
    
</template>

<script>
import CreateAt from "@/components/CreateAt.vue"
import Api from "@/api"
    export default {
        data() {
            return {
                showDivAddProductRev:false,
                showOverlay: false,
                showOverlayRew: false,
                image_item_product: null,
                image_file_product: null,

                image_item_review: null,
                image_file_review: null,
                formPro:{
                    product_ar:'',
                    product_en:'',
                    date:'',
                    questionnaire_ar:'',
                    questionnaire_en:'',
                    link:'',
                },
                reviewBody:'',
                question:{
                    question_ar:'',
                    question_en:'',
                    rate: 0,
                    text: 0,
                }
                
            }
        },
        props:{
            item:{
                type:Object,
                required: true
            }, 
            user:{
                type:String,
                required: true
            } 
        },
        components:{
            CreateAt,
            // VueEditor,
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
        methods: {
            showEditProductRev(txtDivID){
                $("#"+txtDivID).toggle(400);
                this.showOverlay = !this.showOverlay
            },
            showReviewToProduct(txtDivID){
                $("#"+txtDivID).toggle(400);
                this.showOverlayRew = !this.showOverlayRew
            },
            showHide(){
                this.showDivAddProduct = false
                this.showDivAddProductRev = false
                this.showOverlay = false
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
            uploadImageItemReview(event) {
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image_file_review = e.target.result;
                }
                this.image_item_review = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            async editProductForm(id){
                const data = new FormData();
                data.append('product_ar', this.item.product_ar);
                data.append('product_en', this.item.product_en);
                data.append('date', this.item.date);
                data.append('questionnaire_ar', this.item.questionnaire_ar);
                data.append('questionnaire_en', this.item.questionnaire_en);
                data.append('link', this.item.link);
                if(this.image_item_product){
                    data.append('image', this.image_item_product);
                }
                // data.append('review_image', this.image_item_product);
                
                await Api.supplier.supplierEditProductRev(id , data).then((res)=>{
                    this.$router.go()
                    // console.log(res)
                })
            },
            async sentDeleteProduct(id){
                await Api.supplier.supplierDeleteProductRev(id).then((res)=>{
                    this.$router.go()
                    // console.log(res)
                })
            },
            async sentAddQuestion(id){
                const data = new FormData();
                data.append('question_ar', this.question.question_ar);
                data.append('question_en', this.question.question_en);
                data.append('rate', this.question.rate);
                data.append('text', this.question.text);

                await Api.supplier.supplierAddQuestionProduct(id , data).then((res)=>{
                    // this.$router.go()
                    setTimeout(() => this.$router.go(), 2000)
                    // console.log(res)
                })
                // console.log(data ,id)
            },
        },
    }
</script>

<style scoped>

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