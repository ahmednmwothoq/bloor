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
                <!-- <span class="car">approval</span> -->
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
                    <div class="comment_up">
                        <div class="left">
                            <span class="dot"></span>
                            <span class="text">{{ getLocales ? question.question_ar : question.question_en }}</span>
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
                
                    <div class="comment_mid" >
                        <p class="text" v-if="question.answer_has_text == 1">{{ answer.text }}</p>
                    </div>
                </div>
                <div class="comment_down">
                    <a  class="read">Read Answer</a>
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
                <div class="icons" @click="">
                    <i class="fas fa-comment-alt icon"></i>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateAt from "@/components/CreateAt.vue"
    export default {
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
    }
</script>

<style lang="scss" scoped>

</style>