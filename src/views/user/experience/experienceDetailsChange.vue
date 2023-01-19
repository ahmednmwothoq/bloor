<template>
    <Header />

    <logo-search/>
        <!-- {{ $route.params.id }} -->
    <div class="contentStander mt-1 w-100" v-if="experience">
        <div class="__page_experience">
            <div class="item__experience border-0 width_custom_details" style="margin: auto 0;margin-top: 0;">
                <div class="experience__up">
                    <div class="contan">
                        <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
                        <div class="up__info">
                            <span class="name">{{ experience.user.f_name }} {{ experience.user.l_name }}</span>
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
                        <div class="mb-3 follow_details" v-if="userLogin != null">
                            <a 
                                v-if="userLogin.id != experience.user_id"
                                class="follow cursor_pointer" 
                                @click="makeUserFollowUser(experience.user_id)"
                            >{{ $t('follow') }}</a>
                        </div>
                        <div class="mb-3 follow_details" v-else-if="supplierLogin != null">
                            <a 
                                v-if="supplierLogin.id != experience.user_id"
                                class="follow cursor_pointer" 
                                @click="makeUserFollowUser(experience.user_id)"
                            >{{ $t('follow') }}</a>
                        </div>
                        <div class="mb-3 follow_details">
                            <a 
                                
                                class="follow cursor_pointer" 
                                @click="makeUserFollowUser(experience.user_id)"
                            >{{ $t('follow') }}</a>
                        </div>
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
                    <div>
                        <a class="down__details cursor_pointer" @click="this.$router.push('/allExperiment')">{{ $t('more_similar') }}</a>
                        <a @click="showMoreBody"  v-if="showMoreDetails" class="down__details cursor_pointer down__icon">{{ $t('more_details') }}</a>
                        <!-- <a class="down__details cursor_pointer">{{ $t('more_details') }}</a> -->
                        <!-- <a @click="showMoreBody"  v-if="showMoreDetails" class="down__details cursor_pointer">
                            <i class="fas fa-angle-double-down icon"></i>More
                        </a> -->
                        <a data-bs-toggle="modal" :data-bs-target="`#exampleModal${experience.id}`" class="down__details show_image cursor_pointer">{{ $t('show_images') }}</a>
                        <!-- <a data-bs-toggle="modal" :data-bs-target="`#exampleModal${experience.id}`" class="down__details show_image cursor_pointer">
                            <i class="fas fa-eye icon"></i>
                        </a> -->
                    </div>
                    <div class="down__icons">
                        <div class="icons">
                            <i class="fas fa-handshake icon cursor_pointer"></i>
                            <span>{{experience.admin_approval}}</span>
                        </div>
                        <div class="icons" @click="showCommentsDiv">
                            <i class="fas fa-comment-alt icon cursor_pointer"></i>
                            <span>{{experience.comments.length}}</span>
                        </div>
                        <div class="icons" @click="makeUserLikeExperiment(experience.id)">
                            <i class="fas fa-heart icon cursor_pointer"></i>
                            <span>{{experience.countLikes}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page__right">
                <div class="right_details" v-for="itemEx in paginatedData" :key="itemEx.id" v-if="paginatedData.length > 0">
                    <p class="detail_text">
                        <!-- <span class="text_ligthblue">Lorem ipsum dolor, elit</span> -->
                            {{ itemEx.body.slice(0,140) }}
                    </p>
                    <a class="detail_btn" @click="callFunctionGo(itemEx.id)" >{{ $t('more_details') }}</a>
                </div>
                
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" :id="`exampleModal${experience.id}`" tabindex="-1" :aria-labelledby="`exampleModalLabel${experience.id}`" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 750px!important;">
                <div class="modal-content m-auto w-75">
                <div :class="this.$i18n.locale === 'ar' ?`modal-header flex-row-reverse`: `modal-header`">
                    <h1 class="modal-title fs-5" :id="`exampleModalLabel${experience.id}`">{{ $t('image_experience') }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <!-- <div class="col-6 show_image_ex" v-for="img in experience.media" :key="img.id">
                            <span class="text" v-if="img.collection_name == 'product'">Product</span>
                            <span class="text" v-else-if="img.collection_name == 'proof'">Proof</span>
                            <img class="image" :src="img.original_url" alt="" />
                        </div> -->
                        <div class="col-12" v-for="img in experience.media" :key="img.id">
                            <div class="show_image_ex d-flex align-items-center flex-column" v-if="img.collection_name == 'product'" >
                                <span class="text">{{ $t('product') }}</span>
                                <img class="image" :src="img.original_url" alt="" />
                            </div>
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

        <div class="add_comment_To" id="showDivComments">
            <form class="comment_form">
                <input type="text" class="name_person" :value="`@`+ experience.username" disabled>
                <textarea v-model="bodyComment" class="input"></textarea>
                <div class="btn">
                    <a class="btn_comment" @click="SendCommentInExp">{{ $t('post') }}</a>
                    <a class="btn_comment cancel_btn" @click="showAddCommentInExp">{{ $t('cancel') }}</a>
                </div>
            </form>
        </div>

        <button class="add_comment" @click="showAddCommentInExp">{{ $t('add_comment') }}</button>
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
                page_index: 1,
                page_size: 3,
                replaysComments: [],
                allExperiences: [],
                indexx:1,
                userLogin: JSON.parse(cookie.get('userData')) ,
                supplierLogin: JSON.parse(cookie.get('SupplierData')) ,
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
            CreateAt,
        },
        computed: {
            paginatedData(){
                const numberOfPages = Math.ceil(this.allExperiences.length / this.page_size);
                const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
                const start = random(this.page_index , numberOfPages) * this.page_size,
                    end = start + this.page_size;
                return this.allExperiences.slice(start, end);
            }
        },
        mounted() {
            this.getSingleExperience()
            this.getAllExperience()
        },
        methods: {
            async getSingleExperience(){
                await Api.user.userGetSingleExperiments(this.idEx).then((res)=>{
                    if(res.data.status){
                        // console.log("user",res.data)
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
            async getAllExperience(){
                await Api.general.getAllExperiments().then((res)=>{
                    if(res.data.status){
                        // console.log("getAllExperience",res)
                        this.allExperiences = res.data.body
                    }
                })
            },
            callFunctionGo(itemEx){
                // console.log(itemEx)
                this.$router.push({ name: 'ExperienceDetails', params: { id: itemEx }})
                // this.$router.go()
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
                    console.log(res.data)
                    if(res.data.status){
                        // this.$router.go()
                        
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
            }   
            

        },
    }
</script>

<style scoped>



</style>