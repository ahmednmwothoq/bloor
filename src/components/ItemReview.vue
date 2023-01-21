<template>
    <div class="item_review">
        <div class="review__up">
            <div class="contan">
                <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
                <div class="up__info">
                    <span class="name">{{itemReview.username}}</span>
                    <!-- <div>
                        <span
                            v-if="userLogin.id != itemReview.user_id"
                            class="follow"
                            @click="makeUserFollowUser(itemReview.user_id)"
                            >{{ $t('follow') }}
                        </span>
                    </div> -->
                    
                </div>
                <div class="up__rate">
                    <i
                        v-if="itemReview.bloor_colour != 'white'"
                        :class="itemReview.bloor_colour ? `fa fa-star ${itemReview.bloor_colour} icon` : `fa fa-star icon`" 
                        aria-hidden="true"
                    ></i>
                    <i
                        v-else
                        :class="itemReview.bloor_colour ? `far fa-star ${itemReview.bloor_colour} icon` : `far fa-star icon`" 
                        aria-hidden="true"
                    ></i>
                    <span>{{itemReview.rate}}</span>
                </div>
            </div>
            <div class="up__time">
                <span><CreateAt :create="itemReview.created_at" /></span>
            </div>
        </div>
        <div class="review_mid">
            <div class="mid__left">
                {{ getLocales ? itemProduct.product_ar : itemProduct.product_en }}
                <!-- <span class="edit">{{item.admin_approval}}</span> -->
            </div>
            <div class="mid__rigth">
                <img :src="itemReview.media[0].original_url" alt="" class="image">
            </div>
        </div>
        <div class="review__down" style="word-break: break-word;">
            <!-- <div class="down__comment" v-html="item.review"></div> -->
            <div class="down__comment" v-for="question in itemProduct.questions" :key="question.id" v-if="itemProduct">
                <div v-for="answer in question.answers" :key="answer.id">
                    <div :class="question.answer_has_text == 1 ? 'comment_up' : 'comment_up align-items-start'" v-if="answer.user_id == itemReview.user_id">
                        <div :class="question.answer_has_text == 1 ? 'left' : 'left align-items-start'" >
                            <span :class="question.answer_has_text == 1 ? 'dot' : 'dot mt-1'"></span>
                            <span :class="question.answer_has_text == 1 ?'text' : 'text pb-5'">{{ getLocales ? question.question_ar : question.question_en }}</span>
                        </div>
                        <div class="right">
                            <star-rating
                                v-if="question.answer_has_rate == 1"
                                v-bind:star-size="15"
                                v-bind:read-only="true"
                                v-bind:show-rating="false"
                                v-model:rating="answer.rate"
                            ></star-rating>
                        </div>
                    </div>
                
                    <div class="comment_mid" v-if="answer.user_id == itemReview.user_id">
                        <p class="text" v-if="question.answer_has_text == 1">{{ answerText(answer.text ,answer.id , answer.user_id , answer.question_id,itemReview.id) }}</p>
                    </div>
                
                    <div class="comment_down" v-if="answer.user_id == itemReview.user_id">
                        <a class="read" v-if="question.answer_has_text == 1" @click="showHideAnswer_id[answer.question_id+answer.id+answer.user_id+itemReview.id] = !showHideAnswer_id[answer.question_id+answer.id+answer.user_id+itemReview.id]">Read Answer</a>
                        <!-- <a class="read">Read Answer</a> -->
                        <!-- showHideAnswer_id[answer.id , answer.user_id , answer.question_id] -->
                    </div>
                </div>
            </div>
            
        </div>
        <div class="experience__down">
            <!-- <a @click="showMoreBody"  v-if="showMoreDetails" class="down__details">More Details</a> -->
            <!-- <a data-bs-toggle="modal" :data-bs-target="`#exampleModal${experience.id}`" class="down__details show_image">Show Images</a> -->
            <div class="down__icons">
                <div class="icons">
                    <i class="fas fa-handshake icon"></i>
                    <span>{{itemReview.admin_approval}}</span>
                </div>
                <!-- <div class="icons">
                    <i class="fas fa-comment-alt icon"></i>
                    <span>{{item.comments.length}}</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import CreateAt from "@/components/CreateAt.vue"
import StarRating from 'vue-star-rating';
    export default {
        data() {
            return {
                showHideAnswer_id: [],
            }
        },
        props: {
            itemProduct: {
                type: Object,
                required: true
            },
            itemReview: {
                type: Object,
                required: true
            }
        },
        components:{
            StarRating,
            CreateAt,
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
            answerText(answer_text ,answer_id , answer_user_id , answer_question_id ,item_id){
                if(answer_text){
                    if(this.showHideAnswer_id[answer_question_id+answer_id+answer_user_id+item_id] == true){
                        return answer_text
                    }else{
                            if(answer_text.length > 50){
                                return answer_text.slice(0,50)
                            }
                            else{
                                return answer_text
                            }
                        
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>