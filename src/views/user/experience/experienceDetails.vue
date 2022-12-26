<template>
    <Header />

    <logo-search/>
        <!-- {{ $route.params.id }} -->
    <div class="contentStander mt-1 w-100" v-if="experience">
        <div class="item__experience border-0 w-90">
            <div class="experience__up">
                <div class="contan">
                    <img class="up__img" src="/assets/images/avatar/user-img.jpg" alt="">
                    <div class="up__info">
                        <span class="name">Supplier Name {{experience.user_id}}</span>
                    </div>
                    <div class="up__rate">
                    <i
                        v-if="experience.bloor_colour != 'white'"
                        :class="experience.bloor_colour ? `fa fa-star ${experience.bloor_colour} icon` : `fa fa-star icon`" 
                        aria-hidden="true"
                    ></i>
                    <i
                        v-else
                        :class="experience.bloor_colour ? `far fa-star ${experience.bloor_colour} icon` : `far fa-star icon`" 
                        aria-hidden="true"
                    ></i>
                    <span>{{experience.rate}}</span>
                </div>
                </div>
                <div class="up__time">
                    <a 
                        v-if="userLogin.id != experience.user_id"
                        class="follow" 
                        @click="makeUserFollowUser(experience.user_id)"
                    >Follow</a>
                    <span class="time">
                        <CreateAt :create="experience.created_at" />
                    </span>
                </div>
            </div>
            <div class="experience__mid">
                <p class="mid__text">
                    {{halfBody}}
                </p>
            </div>

            <div class="experience__down">
                <a @click="showMoreBody"  v-if="showMoreDetails" class="down__details">More Details</a>
                <a data-bs-toggle="modal" :data-bs-target="`#exampleModal${experience.id}`" class="down__details show_image">Show Images</a>
                <div class="down__icons">
                    <div class="icons">
                        <i class="fas fa-handshake icon"></i>
                        <span>{{experience.admin_approval}}</span>
                    </div>
                    <div class="icons" @click="showCommentsDiv">
                        <i class="fas fa-comment-alt icon"></i>
                        <span>{{experience.comments.length}}</span>
                    </div>
                    <div class="icons" @click="makeUserLikeExperiment(experience.id)">
                        <i class="fas fa-heart icon"></i>
                        <span>{{experience.countLikes}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" :id="`exampleModal${experience.id}`" tabindex="-1" :aria-labelledby="`exampleModalLabel${experience.id}`" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 750px!important;">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" :id="`exampleModalLabel${experience.id}`">Image Experience</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6 show_image_ex" v-for="img in experience.media" :key="img.id">
                        <span class="text" v-if="img.collection_name == 'product'">Product</span>
                        <span class="text" v-else-if="img.collection_name == 'proof'">Proof</span>
                        <img class="image" :src="img.original_url" alt="" />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>



        <div class="comments_container" v-if="showComments">
            <div class="list">
                <div v-for="comment in experience.comments" :key="comment.id">
                    <div class="item">
                        <img src="/assets/images/avatar/user-img.jpg" alt="" class="image">
                        <div class="info">
                            <span class="name">User Id #{{comment.user_id}}</span>
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
                            <input type="text" class="name_person" :value="`@`+comment.user_id" disabled>
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
                            <input type="text" class="name_person" v-model="comment.user_id" disabled>
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
                                    <span class="name">User Id #{{ com.user_id }}</span>
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
                                    <input type="text" class="name_person" :value="`@`+com.user_id" disabled>
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

        <div class="add_comment_To" id="showDivComments">
            <form class="comment_form">
                <input type="text" class="name_person" :value="`@`+ experience.user_id" disabled>
                <textarea v-model="bodyComment" class="input"></textarea>
                <div class="btn">
                    <a class="btn_comment" @click="SendCommentInExp">Post</a>
                    <a class="btn_comment cancel_btn" @click="showAddCommentInExp">Cancel</a>
                </div>
            </form>
        </div>

        <button class="add_comment" @click="showAddCommentInExp">add comment</button>
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
import { useToast } from 'vue-toastification'
    export default {
        data(){
            return {
                idEx: this.$route.params.id,
                experience: null,
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
            // console.log(this.idEx)
            this.getSingleExperience()
        },
        methods: {
            async getSingleExperience(){
                await Api.user.userGetSingleExperiments(this.idEx).then((res)=>{
                    if(res.data.status){
                        console.log("user",res.data)
                        this.experience = res.data.body;

                        if(this.experience.body.length > 1000 ){
                            this.showMoreDetails = true;
                            this.halfBody = this.experience.body.slice(0,700);
                        }else{
                            this.halfBody = this.experience.body
                        }
                        // replaysComments


                        // if(this.experience.comments.length > 0){
                        //     for(var i = 0; i < this.experience.comments.length ; i++){
                        //         const repleyCommentCon = [];

                                
                        //     }
                        // }
                    }
                })
            },
            showCommentsDiv() {
                if(this.experience.comments.length > 0){
                    this.showComments = !this.showComments;
                }
                
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

                    await Api.user.ShowAllRepleyCommentInEx(id).then((res)=>{
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

                await Api.user.addRepleyInComment(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        $("#"+txtDivID).toggle(400);
                    }
                });
            },
            showAddCommentInExp(){
                $("#showDivComments").toggle(400);
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
            async SendCommentInExp(){
                const data = new FormData();
                data.append('body', this.bodyComment);

                await Api.user.userAddCommentToExper(this.idEx , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.getSingleExperience()
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

                await Api.user.updateCommentInExper(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.getSingleExperience()
                        $("#"+txtDivID).toggle(400);
                        this.$router.go()
                    }
                });
            },

            async sentDeleteComment(id){
                await Api.user.deleteCommentInExper(id).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.getSingleExperience()
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

                await Api.user.updateReplayCommentInExper(id , data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.getSingleExperience()
                        $("#"+txtDivID).toggle(400);
                        this.$router.go()
                    }
                });
            },

            async sentDeleteReplayComment(id){
                // console.log(id)
                await Api.user.deleteReplayCommentInExper(id).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.getSingleExperience()
                        this.$router.go()
                    }
                });
            },
             async makeUserLikeExperiment(id){
                // console.log(id)
                await Api.user.userLikeExperiment(id).then((res)=>{
                    if(res.data.status){
                        this.getSingleExperience()
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
            

        },
    }
</script>

<style scoped>



</style>