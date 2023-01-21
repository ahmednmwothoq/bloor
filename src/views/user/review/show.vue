<template>
    <Header />
    <logo-search/>
    <div class="contentStander mt-1 w-100">
        <div class="m-auto w-75" v-if="this.$i18n.locale === 'ar'">
            <button 
                type="button" 
                class="btn btn-primary" 
                @click="this.$router.push({ path: `/add-review/${idRev}`, query: { name: singleProduct.product_ar }})"
                v-if="userLogin"
            >
                {{ $t('review') }}
            </button>
        </div>
        <div class="m-auto w-75" v-else>
            <button 
                type="button" 
                class="btn btn-primary" 
                @click="this.$router.push({ path: `/add-review/${idRev}`, query: { name: singleProduct.product_en }})"
                v-if="userLogin"
            >
                {{ $t('review') }}
            </button>
        </div>
        <div  v-for="item in paginatedData" :key="item.id" v-if="paginatedData">
            <div class="item_review">
                <div class="review__up">
                    <div class="contan">
                        <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
                        <div class="up__info">
                            <span class="name">{{item.user.f_name}} {{item.user.l_name}}</span>
                            <div v-if="userLogin">
                                <span
                                    v-if="userLogin.id != item.user_id"
                                    class="follow"
                                    @click="makeUserFollowUser(item.user_id)"
                                    >{{ $t('follow') }}
                                </span>
                            </div>
                            
                        </div>
                        <div class="up__rate">
                            <i
                                v-if="item.bloor_colour != 'white'"
                                :class="item.bloor_colour ? `fa fa-star ${item.bloor_colour} icon` : `fa fa-star icon`" 
                                aria-hidden="true"
                            ></i>
                            <i
                                v-else
                                :class="item.bloor_colour ? `far fa-star ${item.bloor_colour} icon` : `far fa-star icon`" 
                                aria-hidden="true"
                            ></i>
                            <span>{{item.rate}}</span>
                        </div>
                    </div>
                    <div class="up__time">
                        <span><CreateAt :create="item.created_at" /></span>
                    </div>
                </div>
                <div class="review_mid">
                    <div class="mid__left">
                        <span class="car">{{ getLocales ? singleProduct.product_ar : singleProduct.product_en }}</span>
                        <!-- <span class="edit"></span> -->
                    </div>
                    <div class="mid__rigth">
                        <img :src="item.media[0].original_url" alt="" class="image">
                    </div>
                </div>
                <div class="review__down" style="word-break: break-word;">
                    <!-- <div class="down__comment" v-html="item.review"></div> -->
                    <div class="down__comment" v-for="question in singleProduct.questions" :key="item.id" v-if="singleProduct">
                        <div v-for="answer in question.answers" :key="answer.id">
                            <div :class="question.answer_has_text == 1 ? 'comment_up' : 'comment_up align-items-start'" v-if="answer.user_id == item.user_id">
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
                        
                            <div class="comment_mid" v-if="answer.user_id == item.user_id">
                                <p class="text" v-if="question.answer_has_text == 1">{{ answerText(answer.text ,answer.id , answer.user_id , answer.question_id,item.id) }}</p>
                            </div>
                        
                            <div class="comment_down" v-if="answer.user_id == item.user_id">
                                <a class="read" v-if="question.answer_has_text == 1" @click="showHideAnswer_id[answer.question_id+answer.id+answer.user_id+item.id] = !showHideAnswer_id[answer.question_id+answer.id+answer.user_id+item.id]">Read Answer</a>
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
                            <span>{{item.admin_approval}}</span>
                        </div>
                        <div class="icons" @click="showCommentsDiv(`TheDivShowComment`+item.id)">
                            <i class="fas fa-comment-alt icon"></i>
                            <span>{{item.comments.length}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- v-if="showComments" -->

            <div :id="`TheDivShowComment`+item.id" style="display:none">
                <div class="comments_container" v-if="item.comments.length > 0">
                    <div class="list">
                        <div v-for="comment in item.comments" :key="comment.id">
                            <div class="item">
                                <img src="/assets/images/avatar/avatar-image.png" alt="" class="image">
                                <div class="info">
                                    <span class="name">{{comment.username}}</span>
                                    <span class="comment">{{comment.body}}</span>
                                    <span class="reply">
                                        <span class="show" @click="showReplyComment('theDivRep-'+ comment.id , comment.id)">{{ $t('show_reply') }}</span>
                                        <span class="add" @click="showAddReplyComment('theDivCom-'+ comment.id)">{{ $t('add_reply') }}</span>
                                    </span>
                                </div>
                                <div class="date">
                                    <span>
                                        <CreateAt :create="comment.created_at" />
                                    </span>
                                </div>
                                <div v-if="userLogin">
                                    <div class="edit_delete" v-if="userLogin.id == comment.user_id">
                                        <a data-bs-toggle="modal" :data-bs-target="`#deleteModalComment${comment.id}`"  class="con">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <a @click="showEditCommentDiv('theDivComEdit-'+ comment.id)" class="con">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal -->
                            <div class="modal fade" :id="`deleteModalComment${comment.id}`" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                                        {{ $t('are_you_sure') }}
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('no') }}</button>
                                        <button type="button" class="btn btn-primary" @click="sentDeleteComment(comment.id)">{{ $t('yes') }}</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="add_comment_To" :id="'theDivComEdit-'+comment.id">
                                <form class="comment_form">
                                    <input type="text" class="name_person" :value="`@`+comment.username" disabled>
                                    <!-- <textarea v-model="comment.body" :value=""   class="input"></textarea> -->
                                    <textarea :value="comment.body" @input="event => bodyCommentEdit = event.target.value"  class="input"></textarea>
                                    <div class="btn">
                                        <a class="btn_comment" @click="SendEditComment('theDivComEdit-'+ comment.id , comment.id)">{{ $t('edit') }}</a>
                                        <a class="btn_comment cancel_btn" @click="showEditCommentDiv('theDivComEdit-'+ comment.id)">{{ $t('cancel') }}</a>
                                    </div>
                                </form>
                            </div>
                            <div class="reply_comment mb-4" :id="'theDivCom-'+comment.id">
                                <form class="comment_form" action="">
                                    <input type="text" class="name_person" v-model="comment.username" disabled>
                                    <textarea v-model="bodyReplayCom" class="input"></textarea>
                                    <div class="btn">
                                        <a class="btn_comment" @click="addReplayInComment('theDivCom-'+ comment.id , comment.id)">{{ $t('post') }}</a>
                                        <a class="btn_comment cancel_btn" @click="closeDivReplay">{{ $t('cancel') }}</a>
                                    </div>
                                </form>
                            </div>
                            <div v-if="showReplayCommentDiv" :id="'theDivRep-'+ comment.id">
                                <div v-for="com in replaysComments" :key="com.id" v-if="ReplayCommentId == comment.id">
                                    <div class="item_reply">
                                        <img src="/assets/images/avatar/avatar-image.png" alt="" class="image">
                                        <div class="info">
                                            <span class="name">{{ com.username }}</span>
                                            <span class="comment">{{ com.body }}</span>
                                        </div>
                                        <div class="date">
                                            <span>
                                                <CreateAt :create="com.created_at" />
                                            </span>
                                            
                                        </div>
                                        <div v-if="userLogin">
                                            <div class="edit_delete" v-if="userLogin.id == com.user_id">
                                                <a data-bs-toggle="modal" :data-bs-target="`#deleteModalCommentReply${com.id}`" class="con">
                                                    <i class="fas fa-trash"></i>
                                                </a>
                                                <a @click="showEditReplayCommentDiv('theDivReplayComEdit-'+ com.id)"  class="con">
                                                    <i class="fas fa-edit"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal fade" :id="`deleteModalCommentReply${com.id}`" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                            <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                                                {{ $t('are_you_sure') }}
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('no') }}</button>
                                                <button type="button" class="btn btn-primary" @click="sentDeleteReplayComment(com.id)">{{ $t('yes') }}</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="add_comment_To" :id="'theDivReplayComEdit-'+com.id">
                                        <form class="comment_form">
                                            <input type="text" class="name_person" :value="`@`+com.username" disabled>
                                            <!-- <textarea v-model="comment.body" :value=""   class="input"></textarea> -->
                                            <textarea :value="com.body" @input="event => bodyReplayCommentEdit = event.target.value"  class="input"></textarea>
                                            <div class="btn">
                                                <a class="btn_comment" @click="SendEditReplayComment('theDivReplayComEdit-'+ com.id , com.id)">{{ $t('edit') }}</a>
                                                <a class="btn_comment cancel_btn" @click="showEditReplayCommentDiv('theDivReplayComEdit-'+ com.id)">{{ $t('cancel') }}</a>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                                

                                
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="add_comment_To" :id="`TheDivShowAddComment`+item.id">
                    <form class="comment_form">
                        <input type="text" class="name_person" :value="`@`+ item.username" disabled>
                        <textarea v-model="bodyComment" class="input"></textarea>
                        <div class="btn">
                            <a class="btn_comment" @click="SendCommentInExp(item.id)">{{ $t('post') }}</a>
                            <a class="btn_comment cancel_btn" @click="showAddCommentInExp(`TheDivShowAddComment`+item.id)">{{ $t('cancel') }}</a>
                        </div>
                    </form>
                </div>
                
            
                <button class="add_comment" @click="showAddCommentInExp(`TheDivShowAddComment`+item.id)">{{ $t('add_comment') }}</button>
            </div>
        </div>


        <div class="m-auto w-90" style="margin-top: 4vw!important;margin-bottom: 17vw!important;">
            <pagination 
                v-if="allProductReviewsData.length > 0" 
                v-model="page_index" 
                :records="allProductReviewsData.length" 
                :per-page="page_size" 
                @paginate="myCallback"
            />
        </div>
        
        
    </div>


    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import Header from "@/components/Header.vue"
import FooterVue from '@/components/Footer.vue';
import LogoSearch from "@/components/LogoSearch.vue"
import CreateAt from "@/components/CreateAt.vue"
import { useToast } from 'vue-toastification'
import StarRating from 'vue-star-rating';
import Pagination from 'v-pagination-3';
    export default {
        data() {
            return {
                idRev: this.$route.params.id,
                reviews:[],
                allProductReviewsData:[],
                singleProduct:{},
                showComments: false,
                showAddComments: false,
                showMoreDetails: false,
                showMoreDetailsTog: false,
                showReplayCommentDiv: false,
                ReplayCommentId: null,
                halfBody: '',
                bodyComment: '',
                bodyReplayCom: '',
                bodyCommentEdit: '',
                bodyReplayCommentEdit: '',
                replaysComments: [],
                indexx:1,
                userLogin: JSON.parse(cookie.get('userData')),
                page_index: 1,
                page_size: 2,
                showHideAnswer_id: [],
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
            StarRating,
            Pagination,
        },
        mounted() {
            this.showReviews()
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
            },
            paginatedData(){
                const start = (this.page_index - 1) * this.page_size,
                    end = start + this.page_size;
                return this.allProductReviewsData.slice(start, end);
            }
        },
        methods: {
            async showReviews(){
                await Api.user.userShowReviewAndRate(this.idRev).then((res)=>{
                    // console.log(res);
                    
                    if(res.data.status){
                        this.reviews = res.data.body
                        this.allProductReviewsData = res.data.body.allProductReviews
                        this.singleProduct = res.data.body.allReviewData[0]
                    } 
                    // console.log(this.singleProduct);
                })
            },
            showCommentsDiv(txtDivID) {
                // this.showComments = !this.showComments;
                $("#"+txtDivID).toggle(400);
            },
            showAddReplyComment(txtDivID){
                $("#"+txtDivID).toggle(400);
            },
            closeDivReplay(){
                this.showReplayCommentDiv = false
                this.replaysComments = []
                this.ReplayCommentId = null
            },
            async showReplyComment(txtDivID,id){
                if(this.showReplayCommentDiv){
                    $("#"+txtDivID).toggle(400);
                    this.showReplayCommentDiv = false
                    this.replaysComments = []
                    this.ReplayCommentId = null
                    this.bodyReplayCom = ''
                }else{

                    this.showReplayCommentDiv = false
                    this.replaysComments = []
                    this.ReplayCommentId = null
                    this.bodyReplayCom = ''

                    await Api.user.ShowAllRepleyCommentInReview(id).then((res)=>{
                        if(res.data.status){
                            // console.log(res.data)
                            if(res.data.body.length > 0){
                                this.replaysComments = res.data.body
                                this.showReplayCommentDiv = true
                                this.ReplayCommentId = res.data.body[0].comment_id
                                $("#"+txtDivID).toggle(400);
                            }
                        }
                    });
                }
            },
            async addReplayInComment(txtDivID , id){
                const data = new FormData();
                data.append('body', this.bodyReplayCom);

                await Api.user.addRepleyInCommentReview(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        $("#"+txtDivID).toggle(400);
                    }
                });
            },
            showAddCommentInExp(txtDivID){
                $("#"+txtDivID).toggle(400);
            },
            showMoreBody(){
                if(this.showMoreDetails && !this.showMoreDetailsTog){
                    this.halfBody = this.experience.body;
                    this.showMoreDetailsTog = !this.showMoreDetailsTog;
                }else{
                    this.halfBody = this.experience.body.slice(0,1000);
                    this.showMoreDetailsTog = !this.showMoreDetailsTog;
                }
            },
            async SendCommentInExp(id){
                const data = new FormData();
                data.append('body', this.bodyComment);

                await Api.user.userAddCommentToReview(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.showReviews()
                        this.$router.go()
                    }
                });
            },
            showEditCommentDiv(txtDivID){
                $("#"+txtDivID).toggle(400);
            },
            async SendEditComment(txtDivID , id){
                const data = new FormData();
                data.append('body', this.bodyCommentEdit);
                // console.log(this.bodyCommentEdit)

                await Api.user.updateCommentInReview(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.showReviews()
                        $("#"+txtDivID).toggle(400);
                        this.$router.go()
                    }
                });
            },

            async sentDeleteComment(id){
                await Api.user.deleteCommentInReview(id).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.showReviews()
                        this.$router.go()
                    }
                });
            },

            showEditReplayCommentDiv(txtDivID){
                $("#"+txtDivID).toggle(400);
            },

            async SendEditReplayComment(txtDivID , id){
                const data = new FormData();
                data.append('body', this.bodyReplayCommentEdit);
                // console.log(this.bodyCommentEdit)

                await Api.user.updateReplayCommentInReview(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.showReviews()
                        $("#"+txtDivID).toggle(400);
                        this.$router.go()
                    }
                });
            },

            async sentDeleteReplayComment(id){
                // console.log(id)
                await Api.user.deleteReplayCommentInReview(id).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.showReviews()
                        this.$router.go()
                    }
                });
            },
             async makeUserLikeExperiment(id){
                // console.log(id)
                await Api.user.userLikeExperiment(id).then((res)=>{
                    if(res.data.status){
                        this.showReviews()
                    }
                });
            },
             async makeUserFollowUser(id){
                // console.log(id)
                const toast = useToast()
                await Api.user.userFollowAnotherUser(id).then((res)=>{
                    if(res.data.status){
                        // this.$router.go()
                        // console.log(res.data)
                        toast.success(`${res.data.msg}`,{
                            position: "top-right",
                            timeout: 3048,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                            rtl: false
                        })
                    }
                });
            },
            myCallback(event){
                // console.log(event);
                this.page_index = event
            },
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
        }
    }
</script>

<style  scoped>

</style>