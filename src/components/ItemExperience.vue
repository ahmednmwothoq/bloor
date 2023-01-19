<template>
    <div class="item__experience">
        <div class="experience__up">
            <div class="contan">
                <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
                <div class="up__info">
                    <span class="name">{{ item.user.f_name }} {{ item.user.l_name }}</span>
                    <!-- <span class="follow">{{ $t('follow') }}</span> -->
                    <div v-if="userLogin != null">
                        <span
                            v-if="userLogin.id != item.user_id"
                            class="follow"
                            @click="makeUserFollowUser(item.user_id)"
                            >{{ $t('follow') }}
                        </span>
                    </div>
                    <div v-else-if="supplierLogin != null">
                        <span
                            v-if="supplierLogin.id != item.user_id"
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
                <span>
                    <CreateAt :create="item.created_at" />
                </span>
            </div>
        </div>
        <div class="experience__mid">
            <p class="mid__text">
                {{halfBody}}.....etc
            </p>
        </div>

        <div class="experience__down">
            <a @click="this.$router.push({ name: 'ExperienceDetails', params: { id: item.id }})" class="down__details">{{ $t('more_details') }}</a>
            <div class="down__icons">
                <div class="icons">
                    <i class="fas fa-handshake icon"></i>
                    <span>{{ item.admin_approval }}</span>
                </div>
                <div class="icons" @click="this.$router.push({ name: 'ExperienceDetails', params: { id: item.id }})">
                    <i class="fas fa-comment-alt icon"></i>
                    <span>{{item.comments.length}}</span>
                </div>
                <div class="icons" @click="makeUserLikeExperiment(item.id)">
                    <i class="fas fa-heart icon"></i>
                    <span>{{item.countLikes}}</span>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
import Api from "@/api"
import CreateAt from "@/components/CreateAt.vue"
import cookie from "vue-cookie";
import { useToast } from 'vue-toastification'
    export default {
        data() {
            return {
                halfBody: '',
                userLogin: JSON.parse(cookie.get('userData')) ,
                supplierLogin: JSON.parse(cookie.get('SupplierData')) ,
            }
        },
        components:{
            CreateAt,
        },
        emits: ["reload" , "reloadTwo"],
        props:{
            item:{
                type:Object,
                required:true
            }
        },
        mounted() {
            if(this.item.body.length > 1000 ){
                this.halfBody = this.item.body.slice(0,500);
            }else{
                this.halfBody = this.item.body
            }
        },
        methods:{
            async makeUserLikeExperiment(id){
                // console.log(id)
                await Api.user.userLikeExperiment(id).then((res)=>{
                    if(res.data.status){
                        // console.log(this.userLogin)
                        // console.log(this.supplierLogin != null ? 'not null' : 'null')
                        // this.$router.go()
                        this.$emit('reload', true)
                        this.$emit('reloadTwo', true)
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
        }
    }
</script>

<style lang="scss" scoped>

</style>