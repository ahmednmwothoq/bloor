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
                <span>{{ $t('the_question') }} : {{ getLocales ? singleQuestion.question_ar : singleQuestion.question_en }}</span>
            </h2>
                <div class="section">

                    <table class="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{{ $t('question_answer') }}</th>
                                <th scope="col">{{ $t('question_rating') }}</th>
                                <th scope="col">{{ $t('user_list') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in answers" :key="item.id">
                                <th scope="row">{{ index+1 }}</th>
                                <td class="w-50">{{ item.text }}</td>
                                <td>
                                    <star-rating
                                        v-if="item.rate"
                                        v-bind:star-size="20"
                                        v-bind:read-only="true"
                                        v-bind:show-rating="false"
                                        v-model:rating="item.rate"
                                    ></star-rating>
                                </td>
                                <td>{{ item.user.f_name }} {{ item.user.l_name }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 style="padding-top: 10rem !important;">{{ $t('the_other_questions') }}</h3>
                    <table class="table mt-1">
                        <thead>
                            <tr>
                            <!-- <th scope="col">#</th> -->
                            <th scope="col">{{ getLocales ? $t('question_ar') : $t('question_en') }}</th>
                            <th scope="col">{{ $t('view_user_answers') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ques , index) in questions" :key="ques.id" :style="singleQuestion.id == ques.id ? `display:none;` : ``">
                                <!-- <th scope="row">{{ index+1 }}</th> -->
                                <td>{{ getLocales ? ques.question_ar : ques.question_en }}</td>
                                <td class="cursor_pointer" @click="goLinkQuestion(ques.id,this.$route.query.id)" >{{ $t('go') }}</td>
                            </tr>
                        </tbody>
                    </table>
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
    import StarRating from 'vue-star-rating';
    export default {
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            StarRating,
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
                answers:[],
                singleQuestion:{},
                
                
            }
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
        mounted() {
            this.showAllAnswersQuestion()
            this.showQuestionProduct()
        },
        methods: {
            async showAllAnswersQuestion(){
                await Api.supplier.supplierShowAllAnswersQuestion(this.idProd).then((res)=>{
                    if(res.data.status){
                        console.log(res.data)
                        this.answers = res.data.body.answers
                        this.singleQuestion = res.data.body.question
                    }
                });
            },
            async showQuestionProduct(){
                await Api.supplier.supplierShowQuestionProduct(this.$route.query.id).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.questions = res.data.body
                    }
                });
            },
            goLinkQuestion(id,idd){
                this.$router.push({ path: `/supplier/products/users-answers/${id}`, query: { id: `${idd}`} })
                setTimeout(() => this.$router.go(), 500)
            }
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
    font-size: 2vw;
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