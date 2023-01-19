<template>
    <div class="item__experience">
        <div class="experience__up">
            <div class="contan">
                <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
                <div class="up__info">
                    <span class="name" v-if="user.id == item.user_id">{{user.f_name}} {{user.l_name}}</span>
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
                <!-- <a class="follow" >Follow</a> fa fa-star yellow icon -->
                <span class="time">
                    <CreateAt :create="item.created_at" />
                </span>
            </div>
        </div>
        <div class="experience__mid" @click="this.$router.push({ name: 'ExperienceDetails', params: { id: item.id }})">
            <p class="mid__text">
                {{halfBody}}
            </p>
        </div>

        <div class="experience__down">
            <a @click="showMoreBody" v-if="showMoreDetails" class="down__details">{{ $t('more_details') }}</a>
            <a data-bs-toggle="modal" :data-bs-target="`#exampleModal${item.id}`" class="down__details show_image">{{ $t('show_images') }}</a>
            <div class="down__icons">
                <div class="icons" data-bs-toggle="modal" :data-bs-target="`#deleteModalExper${item.id}`" >
                    <i class="fas fa-trash icon"></i>
                </div>
                <div class="icons" @click="this.$router.push({ name: 'ProfileEditExperiment', params: { id: item.id }})">
                    <i class="fas fa-edit icon"></i>
                </div>
                <!-- <div class="icons" @click="showEditOpinion">
                    <i class="fas fa-edit icon"></i>
                </div> -->
                <div class="icons" @click="this.$router.push({ name: 'ExperienceDetails', params: { id: item.id }})">
                    <i class="fas fa-eye icon"></i>
                    <span>{{ $t('show') }}</span>
                </div>
            </div>
        </div>

        <!-- <div class="s_overlay" v-if="showOverlayOpi" @click="showEditOpinion"></div>
        <div class="list_add_opinion" v-if="showOpi">
            <div class="form_add_opinion">
                <form class="opinin_form">
                    <textarea :value="item.body" @input="event => editBodyEx = event.target.value"  placeholder="Enter Your Experiment....." name="" cols="30" rows="10"></textarea>
                    <span class="feedback_error" v-if="v$.editBodyEx.$error">{{ v$.editBodyEx.$errors[0].$message }}</span>
                    <rating-edit @rateEdit="rateEdit" :graded="3" />

                    <button class="btn_submit" @click="" type="button">Publish</button>
                </form>
            </div>
        </div> -->


        <!-- Modal -->
        <div class="modal fade" :id="`exampleModal${item.id}`" tabindex="-1" :aria-labelledby="`exampleModalLabel${item.id}`" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 750px!important;">
                <div class="modal-content">
                    <div :class="this.$i18n.locale === 'ar' ?`modal-header flex-row-reverse`: `modal-header`">
                        <h1 class="modal-title fs-5" :id="`exampleModalLabel${item.id}`">{{ $t('image_experience') }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6 show_image_ex d-flex flex-column align-items-start" v-for="img in item.media" :key="img.id">
                                <span class="text" v-if="img.collection_name == 'product'">{{ $t('product') }}</span>
                                <span class="text" v-else-if="img.collection_name == 'proof'">{{ $t('proof') }}</span>
                                <img class="image" :src="img.original_url" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" :id="`deleteModalExper${item.id}`" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-body" style="text-align: center;font-size: 2.1vw;">
                    {{ $t('are_you_sure') }}
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('no') }}</button>
                    <button type="button" class="btn btn-primary" @click="sentDeleteExper(item.id)">{{ $t('yes') }}</button>
                </div>
                </div>
            </div>
        </div>
    </div>


    
</template>

<script>
import Api from "@/api"
import CreateAt from "@/components/CreateAt.vue"
import useValidate from '@vuelidate/core'
import { required , minLength  } from '@vuelidate/validators'
import RatingEdit from '@/components/RatingEdit.vue';
import { useToast } from 'vue-toastification'
    export default {
        components:{
            RatingEdit,
        },
        data() {
            return {
                v$: useValidate(),
                halfBody: '',
                showMoreDetails: false,
                showMoreDetailsTog: false,
                showOverlayOpi: false,
                showOpi: false,
                rateValue: '',
                editBodyEx: '',
                type: 'edit',
            }
        },
        
        validations () {
            return {
                editBodyEx: {
                    required,
                    minLength: minLength(100),
                },
            }
        },
        components:{
            CreateAt,
        },
        props:{
            item:{
                type:Object,
                required:true
            },
            user:{
                type:Object,
                required:true
            }
        },
        mounted() {
            if(this.item.body.length > 1000 ){
                this.showMoreDetails = true;
                this.halfBody = this.item.body.slice(0,700);
            }else{
                this.halfBody = this.item.body
            }
        },
        methods: {
            showMoreBody(){
                if(this.showMoreDetails && !this.showMoreDetailsTog){
                    this.halfBody = this.item.body;
                    this.showMoreDetailsTog = !this.showMoreDetailsTog;
                }else{
                    this.halfBody = this.item.body.slice(0,1000);
                    this.showMoreDetailsTog = !this.showMoreDetailsTog;
                }
            },
            showEditOpinion() {
                this.showOverlayOpi = !this.showOverlayOpi
                this.showOpi = !this.showOpi
                // console.log(this.showOverlayNote,this.showNote)
            },
            rateEdit(event){
                this.rateValue = event
                // console.log(this.rateValue)
            },
            async editExperimentUser(){
                const toast = useToast()
                this.v$.$validate();
                console.log(this.editBodyEx,this.rateValue)
                if(!this.v$.$error){
                    // const data = new FormData();
                    // data.append('body', this.bodyEx);
                    // data.append('rate', this.rateValue);
                    // data.append('file', this.image_item_file);
                    // data.append('product_image', this.image_item);
                    
                    // await Api.user.userAddExperiments(data).then((res)=>{
                    //     console.log(res);
                    //     if(res.data.status){
                    //         this.$router.go()
                    //     } 
                        
                    // })
                    console.log()

                }else{
                // console.log("fail validate")
                    toast.error(`fail validate`,{
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
            },
            async sentDeleteExper(id){
                await Api.user.userDeleteExperiments(id).then((res)=>{
                    console.log(res);
                    if(res.data.status){
                        this.$router.push('/user-experiment')
                        setTimeout(() => this.$router.go(), 2000)
                        
                    } 
                })
            }
        },
        
    }
</script>

<style scoped>


</style>