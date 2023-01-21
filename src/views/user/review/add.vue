<template>
    <Header />
    <logo-search/>
    <div class="contentStander mt-1 w-100">
        <div class="item_review">
                <div class="review__up">
                    <div class="contan">
                        <!-- <img class="up__img" src="../../assets/images/avatar/person1.jpg" alt=""> -->
                        <div class="up__info">
                            <span class="name">{{ $t('add_review') }}</span>
                            <!-- <span class="follow">Follow</span> -->
                        </div>
                        <div class="up__rate">
                            <!-- <span>4.7</span> -->
                        </div>
                    </div>
                    <div class="up__time">
                        <!-- <span>3 Hours ago</span> -->
                    </div>
                </div>
                <div class="review_mid">
                    <div class="mid__left">
                        <span class="car">{{ nameProduct }}</span>
                        <!-- <span class="edit">2020 - Edition</span> -->
                    </div>
                    <div :class="preview_image_file ? 'mid__rigth upload_div_custom' : 'mid__rigth upload_div_custom custom_image_upload' ">
                        <img @change="uploadImageItemProduct" :src="preview_image_file" alt="avatar" v-if="preview_image_file" class="image">

                        <label for="upload-label-edit-pr" :class="preview_image_file ? 'position-absolute top-0 opacity_none label_custom': 'label_custom'">
                            <div>
                                {{ $t('upload_image') }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                            </div>
                            <input type="file" class="d-none" accept="image/*" @change="uploadImageItemProduct" id="upload-label-edit-pr">
                        </label>
                        
                    </div>
                </div>
                <div class="review__down" style="width: 80%!important;">
                    <form action="">
                        <div class="row">
                            <!-- <div class="form-group col-12 mb-3 bg-white">
                               Review
                            </div> -->
                            <div class="form-group col-12 mt-3 mb-1 bg-white h5">
                                {{ $t('questions') }}
                            </div>
                            <!-- <div 
                                class="form-group col-12 mb-3 bg-white" 
                                style="margin-bottom: 1vw!important;margin-top: 1vw!important;"
                                v-for="ques in allQuestions.questions" :key="ques.id"
                            >
                                <label for="">{{ getLocales ? ques.question_ar : ques.question_en }}</label>
                                <input v-model="answer_id[ques.id]" v-if="ques.answer_has_text == 1" type="text"  placeholder="Answer *"  class="custome-input">
                                <star-rating
                                    v-if="ques.answer_has_rate == 1"
                                    v-bind:star-size="40"
                                    v-model:rating="rating_id[ques.id]"
                                ></star-rating>
                            </div> -->

                            <div 
                                class="down__comment w-80" 
                                v-for="ques in allQuestions.questions" :key="ques.id"
                            >
                                <div :class="ques.answer_has_text == 1 ? 'comment_up' : 'comment_up align-items-start'" >
                                    <div :class="ques.answer_has_text == 1 ? 'left' : 'left align-items-start'">
                                        <span :class="ques.answer_has_text == 1 ? 'dot' : 'dot mt-1'"></span>
                                        <span :class="ques.answer_has_text == 1 ?'text' : 'text pb-5'">{{ getLocales ? ques.question_ar : ques.question_en }}</span>
                                    </div>
                                    <div class="right">
                                        <star-rating
                                            v-if="ques.answer_has_rate == 1"
                                            v-bind:star-size="40"
                                            v-model:rating="rating_id[ques.id]"
                                        ></star-rating>
                                    </div>
                                </div>
                                <div class="comment_mid w-100">
                                    <input class="custome-input border-0" v-model="answer_id[ques.id]" v-if="ques.answer_has_text == 1" type="text"  :placeholder="$t('question_answer')">
                                </div>                                
                                <!-- <span v-if="rating_id[ques.id]">{{ rating_id[ques.id] }}</span> -->
                                <!-- <QuillEditor theme="snow" toolbar="full" v-model:content="reviewBody" contentType="html"  /> -->
                            </div>

                            <!-- <span @click="here(allQuestions.questions)">view</span> -->
                            <!-- <span @click="addAnswerQues">submit</span> -->
                            
                            <div class="form-group col-12 mt-4 mb-3 bg-white margin_l1_r1" >
                                <label class="h5 p-2" for="">{{ $t('Your_overall_review') }}</label>
                                <input v-model="reviewBody" type="text"  :placeholder="$t('what_is_your_review')+'..*'"  class="custome-input">
                            </div>
                            
                            <div class="form-group col-12 mt-3 mb-1 bg-white h5 margin_l1_r1">
                                {{ $t('Your_overall_rating') }}
                            </div>
                            <div class="form-group col-12 mb-3 bg-white">
                                <Rating @rate="rate" :grade="0" :size="'fs-1'" />
                            </div>
                            <!-- <div class="form-group col-12 mb-3 bg-white">
                                <div class="raw">
                                    <div class="upload-images mb-4">
                                        <div class="imgs-uploaded" v-if="preview_image_file">
                                            <ul class="list-style">
                                                <li class="list">
                                                    <img :src="preview_image_file" alt="avatar" v-if="preview_image_file"/>
                                                </li>
                                            </ul>
                                        </div>

                                        <label for="upload-label-edit-pr" :class="{'absolute_label mt-5': preview_image_file}">
                                            <div>
                                                Upload Image
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                                            </div>
                                            <input type="file" accept="image/*" @change="uploadImageItemProduct" id="upload-label-edit-pr">
                                        </label>
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-6">
                                <button class="btn btn-primary" @click="addReview" type="button">{{ $t('publish') }}</button>
                            </div>
                        </div>
                    </form>
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
import LogoSearch from "@/components/LogoSearch.vue"
import Rating from '@/components/Rating.vue';

import StarRating from 'vue-star-rating';
    export default {
        data() {
            return {
                idRev: this.$route.params.id,
                nameProduct: this.$route.query.name,
                reviewBody:'',
                rateValue:0,
                preview_image_file:null,
                image_item_file:null,
                allQuestions:[],
                rating: 0,
                rating_id: [],
                answer_id: [],

            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
            Rating,
            StarRating,
        },
        mounted(){
            this.getAllQuestions()
            // console.log(this.rating)
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
            here(even){
                // console.log(this.rating_id)
                // console.log(this.answer_id)

                const ques = even

                // ques.map((value, index) => {
                //     return console.log(value,index);
                // });

                this.allQuestions.questions.filter((value, index) => {
                    // console.log(value,index);
                    // console.log(value.id);
                    // console.log(value.question);
                });
                
                // ques.forEach((item, index) => {
                //     console.log(item, index)
                // })

                // return this.allQuestions.questions.filter(post => {
                //     return console.log(post)
                // })



                // Array.from(this.allQuestions).forEach(element => {
                //     console.log("sadsa",element)
                // });
                // let filtered = this.allQuestions.filter((el) => {
                //     return console.log(el)
                // })
                // console.log(filtered)


            },
            setRating(rating) {
                this.rating = rating;
                // console.log(this.rating)
            },
            rate(event){
                this.rateValue = event
                // console.log(this.rateValue)
            },
            uploadImageItemProduct(event){
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview_image_file = e.target.result;
                }
                this.image_item_file = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            async addReview(){
                const data = new FormData();
                data.append('review', this.reviewBody);
                data.append('rate', this.rateValue);
                data.append('file', this.image_item_file);

                await Api.user.userAddReviewAndRate(this.idRev,data).then((res)=>{
                    // console.log("addReview",res);
                    if(res.data.status){
                        this.addAnswerQues()
                        // this.$router.go()
                    } 
                    
                })
                
            },
            async addAnswerQues(){
                this.allQuestions.questions.filter((value, index) => {
                    // return console.log(value,index);
                    let data = new FormData();
                    if(this.rating_id[value.id]){
                        data.append('rate', parseInt(this.rating_id[value.id]));
                    }
                    if(this.answer_id[value.id]){
                        data.append('text', this.answer_id[value.id]);
                    }
                    
                        Api.user.userAddAnswerInQues(value.id , data).then((res)=>{
                            // console.log("addAnswerQues",res);
                            if(res.data.status){
                                // this.$router.push('')
                            } 
                            
                        })
                });

            },
            async getAllQuestions(){
                await Api.general.getShowProductReviewsQuestions(this.idRev).then((res)=>{
                    // console.log("Suppliers",res)
                    if(res.data.status){
                        // console.log("Suppliers",res)
                        this.allQuestions = res.data.body
                    }
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
.opacity_none{
    opacity: 0;
}
.upload_div_custom{
    background: #FFFFFF;
    border: 1px solid #707070;
    border-radius: 13px;
    position: relative;
}
.upload_div_custom .label_custom{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.custom_image_upload{
    width: 25vw;
    height: 15vw;
}
.w-80 {
    width: 80%!important;
}
.margin_l1_r1{
    margin-left: -1vw;
    margin-right: -1vw;
}
</style>