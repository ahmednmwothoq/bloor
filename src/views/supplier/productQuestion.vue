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
            <h2 class="title">
                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addQuestionModalProduct" >{{ $t('add_question') }}</a>
            </h2>
                <div class="section">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{ $t('question_ar') }}</th>
                            <th scope="col">{{ $t('question_en') }}</th>
                            <th scope="col">{{ $t('answer_has_text') }}</th>
                            <th scope="col">{{ $t('answer_has_rate') }}</th>
                            <th scope="col">{{ $t('action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in questions" :key="item.id">
                                <th scope="row">{{ index+1 }}</th>
                                <td>{{ item.question_ar }}</td>
                                <td>{{ item.question_en }}</td>
                                <td>{{ item.answer_has_text == 1 ? $t('it_contain') : $t('does_not_contain') }}</td>
                                <td>{{ item.answer_has_rate == 1 ? $t('it_contain') : $t('does_not_contain') }}</td>
                                <td>
                                    <a data-bs-toggle="modal" :data-bs-target="`#deleteModalQuestion${item.id}`"  class="con">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                    <a data-bs-toggle="modal" :data-bs-target="`#editModalQuestion${item.id}`" class="con">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </td>

                                <!-- Modal -->
                                <div class="modal fade" :id="`deleteModalQuestion${item.id}`" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                        <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                                        {{ $t('are_you_sure') }}
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('no') }}</button>
                                            <button type="button" class="btn btn-primary" @click="sentDeleteQuestion(item.id)" data-bs-dismiss="modal">{{ $t('yes') }}</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Modal -->
                                <div class="modal fade" :id="`editModalQuestion${item.id}`" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div :class="this.$i18n.locale === 'ar' ?`modal-header flex-row-reverse`: `modal-header`">
                                                <h5 class="modal-title">{{ $t('add_question') }}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                        <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                                            <div :class="this.$i18n.locale === 'ar' ?`mb-3 text-end`: `mb-3 text-start`">
                                                <label class="form-label">{{ $t('question_ar') }}</label>
                                                <input type="text" v-model="item.question_ar" class="form-control">
                                            </div>
                                            <div :class="this.$i18n.locale === 'ar' ?`mb-3 text-end`: `mb-3 text-start`">
                                                <label class="form-label">{{ $t('question_en') }}</label>
                                                <input type="text" v-model="item.question_en" class="form-control" >
                                            </div>
                                            <div :class="this.$i18n.locale === 'ar' ?`mb-3 form-check text-end w-75`: `mb-3 form-check text-start w-75`">
                                                <input type="checkbox" :checked="item.answer_has_rate == 1" v-model="item.answer_has_rate" true-value="1" false-value="0" class="form-check-input">
                                                <label class="form-check-label" >{{ $t('answer_has_rate') }}</label>
                                            </div>
                                            <div :class="this.$i18n.locale === 'ar' ?`mb-3 form-check text-end w-75`: `mb-3 form-check text-start w-75`">
                                                <input type="checkbox" :checked="item.answer_has_text == 1" v-model="item.answer_has_text" true-value="1" false-value="0" class="form-check-input">
                                                <label class="form-check-label" >{{ $t('answer_has_text') }}</label>
                                            </div>
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                                            <button type="button" class="btn btn-primary" @click="sentUpdateQuestion(item.id,item.question_ar,item.question_en,item.answer_has_rate,item.answer_has_text)"  data-bs-dismiss="modal">{{ $t('save') }}</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addQuestionModalProduct" tabindex="-1" aria-hidden="true">
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
                <button type="button" class="btn btn-primary" @click="sentAddQuestion(this.idProd)"  data-bs-dismiss="modal">{{ $t('save') }}</button>
            </div>
            </div>
        </div>
    </div>
    


</template>

<script>
    import Api from "@/api"
    import Header from "@/components/Header.vue"
    import ListSupplier from "@/components/supplier/ListSupplier.vue"
    import HeaderImage from "@/components/supplier/HeaderImage.vue"
    import HeaderIcons from "@/components/supplier/HeaderIcons.vue"
    export default {
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            // ErrorList
        },
        data() {
            return {
                isActive:false,
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
                idProd: this.$route.params.id,
                questions:[],
                question:{
                    question_ar:'',
                    question_en:'',
                    rate: 0,
                    text: 0,
                }
                
            }
        },
        mounted() {
            this.getDataProducts()
        },
        methods: {
            async getDataProducts(){
                await Api.supplier.supplierShowQuestionProduct(this.idProd).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.questions = res.data.body
                    }
                });
            },
            async sentDeleteQuestion(id){
                await Api.supplier.supplierDeleteQuestionProduct(id).then((res)=>{
                    // this.$router.go()
                    this.getDataProducts()
                    // console.log(res)
                })
                // console.log(data ,id)
            },
            async sentUpdateQuestion(id,question_ar,question_en,answer_has_rate,answer_has_text){
                const data = new FormData();
                data.append('question_ar', question_ar);
                data.append('question_en', question_en);
                data.append('rate', answer_has_rate);
                data.append('text', answer_has_text);

                await Api.supplier.supplierUpdateQuestionProduct(id , data).then((res)=>{
                    // this.$router.go()
                    this.getDataProducts()
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
                    this.getDataProducts()
                    // console.log(res)
                })
                // console.log(data ,id)
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
    color: #B1B1B1;
    font-size: 2.4vw;
}
.section{
    width: 100%;
    margin-top: 70px!important;
    margin: 0 auto;
}

.con{
    font-size: 20px;
    margin: 0 10px;
    cursor: pointer;
    color: #0136ee;
}

</style>