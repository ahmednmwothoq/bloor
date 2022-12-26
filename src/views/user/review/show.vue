<template>
    <Header />
    <logo-search/>
    <div class="contentStander mt-1 w-100">
        <div  v-for="item in reviews" :key="item.id" v-if="reviews">
            <div class="item_review">
                <div class="review__up">
                    <div class="contan">
                        <img class="up__img" src="/assets/images/avatar/user-img.jpg" alt="">
                        <div class="up__info">
                            <span class="name">{{item.username}}</span>
                            <span
                                v-if="userLogin.id != item.user_id" 
                                class="follow"
                                @click="makeUserFollowUser(item.user_id)"
                                >Follow
                            </span>
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
                        <!-- <span class="car">approval</span> -->
                        <!-- <span class="edit">{{item.admin_approval}}</span> -->
                    </div>
                    <div class="mid__rigth">
                        <img :src="item.media[0].original_url" alt="" class="image">
                    </div>
                </div>
                <div class="review__down" style="word-break: break-word;">
                    <div class="down__comment" v-html="item.review"></div>
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
                                <img src="/assets/images/avatar/user-img.jpg" alt="" class="image">
                                <div class="info">
                                    <span class="name">{{comment.username}}</span>
                                    <span class="comment">{{comment.body}}</span>
                                    <span class="reply">
                                        <span class="show" @click="showReplyComment('theDivRep-'+ comment.id , comment.id)">Show Reply</span>
                                        <span class="add" @click="showAddReplyComment('theDivCom-'+ comment.id)">add Reply</span>
                                    </span>
                                </div>
                                <div class="date">
                                    <span>
                                        <CreateAt :create="comment.created_at" />
                                    </span>
                                </div>
                                <div class="edit_delete" v-if="userLogin.id == comment.user_id">
                                    <a data-bs-toggle="modal" :data-bs-target="`#deleteModalComment${comment.id}`"  class="con">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                    <a @click="showEditCommentDiv('theDivComEdit-'+ comment.id)" class="con">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </div>
                            </div>
                            <!-- Modal -->
                            <div class="modal fade" :id="`deleteModalComment${comment.id}`" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                                        Are You Sure ?
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                        <button type="button" class="btn btn-primary" @click="sentDeleteComment(comment.id)">Yes</button>
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
                                        <a class="btn_comment" @click="SendEditComment('theDivComEdit-'+ comment.id , comment.id)">Edit</a>
                                        <a class="btn_comment cancel_btn" @click="showEditCommentDiv('theDivComEdit-'+ comment.id)">Cancel</a>
                                    </div>
                                </form>
                            </div>
                            <div class="reply_comment mb-4" :id="'theDivCom-'+comment.id">
                                <form class="comment_form" action="">
                                    <input type="text" class="name_person" v-model="comment.username" disabled>
                                    <textarea v-model="bodyReplayCom" class="input"></textarea>
                                    <div class="btn">
                                        <a class="btn_comment" @click="addReplayInComment('theDivCom-'+ comment.id , comment.id)">Post</a>
                                        <a class="btn_comment cancel_btn" @click="closeDivReplay">Cancel</a>
                                    </div>
                                </form>
                            </div>
                            <div v-if="showReplayCommentDiv" :id="'theDivRep-'+ comment.id">
                                <div v-for="com in replaysComments" :key="com.id" v-if="ReplayCommentId == comment.id">
                                    <div class="item_reply">
                                        <img src="/assets/images/avatar/user-img.jpg" alt="" class="image">
                                        <div class="info">
                                            <span class="name">{{ com.username }}</span>
                                            <span class="comment">{{ com.body }}</span>
                                        </div>
                                        <div class="date">
                                            <span>
                                                <CreateAt :create="com.created_at" />
                                            </span>
                                            
                                        </div>
                                        <div class="edit_delete" v-if="userLogin.id == com.user_id">
                                            <a data-bs-toggle="modal" :data-bs-target="`#deleteModalCommentReply${com.id}`" class="con">
                                                <i class="fas fa-trash"></i>
                                            </a>
                                            <a @click="showEditReplayCommentDiv('theDivReplayComEdit-'+ com.id)"  class="con">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="modal fade" :id="`deleteModalCommentReply${com.id}`" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                            <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                                                Are You Sure ?
                                            </div>
                                            <div class="modal-footer justify-content-center">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                                <button type="button" class="btn btn-primary" @click="sentDeleteReplayComment(com.id)">Yes</button>
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
                                                <a class="btn_comment" @click="SendEditReplayComment('theDivReplayComEdit-'+ com.id , com.id)">Edit</a>
                                                <a class="btn_comment cancel_btn" @click="showEditReplayCommentDiv('theDivReplayComEdit-'+ com.id)">Cancel</a>
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
                            <a class="btn_comment" @click="SendCommentInExp(item.id)">Post</a>
                            <a class="btn_comment cancel_btn" @click="showAddCommentInExp(`TheDivShowAddComment`+item.id)">Cancel</a>
                        </div>
                    </form>
                </div>
                
            
                <button class="add_comment" @click="showAddCommentInExp(`TheDivShowAddComment`+item.id)">add comment</button>
            </div>
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
    export default {
        data() {
            return {
                idRev: this.$route.params.id,
                reviews:[],
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
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
        },
        mounted() {
            this.showReviews()
        },
        methods: {
            async showReviews(){
                await Api.user.userShowReviewAndRate(this.idRev).then((res)=>{
                    console.log(res);
                    if(res.data.status){
                        this.reviews = res.data.body
                    } 
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
                            console.log(res.data)
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
                        toast.success(`Follow ${res.data.msg}`,{
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
            }
        }
    }
</script>

<style  scoped>
.experience__down{
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 1.56331vw;
    margin-bottom: 1.56331vw;
}
.down__icons{
    display: flex;
    margin-right: 2.8661vw;
}
.down__icons .icons{
    margin-left: 2.34497vw;
    display: flex;
    align-items: center;
}

.icon{
    font-size: 2vw;
    /* margin-left: 92px; */
    opacity: 0.3;
}

.icons span{
    font-size: 1.3vw;
    color: #0136EE;
    margin-left: 0.312663vw;
}
</style>