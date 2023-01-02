<template>
    <div class="s_overlay" v-if="showOverlayOpi" @click="showOpinion"></div>
    <div class="list_add_opinion" v-if="showOpi">
        <div class="form_add_opinion">
            <form class="opinin_form">
                <textarea v-model="bodyEx" placeholder="Enter Your Experiment....." name="" cols="30" rows="10"></textarea>
                <!-- <span class="feedback_error" v-if="val$.bodyEx.$error">{{ val$.bodyEx.$errors[0].$message }}</span> -->
                <input id="add_profile_attach" @change="uploadImagesOpin" ref="image" class="input" type="file">
                <input id="add_profile_attach" @change="uploadImagesOpinFile" ref="file" class="input" type="file">
                <span class="attach" @click="$refs.image.click()">
                    <i class="far fa-paperclip icon"></i> {{ $t('attach_image_product') }}
                </span>
                <span class="attach_file" @click="$refs.file.click()">
                    <i class="far fa-paperclip icon"></i> {{ $t('attach_file') }}
                </span>
                <Rating @rate="rate" :grade="0"/>
                <ul class="list-style" v-if="preview_image || preview_image_file">
                <span @click="clearUploadImg" class="clear">{{ $t('clear') }}</span>
                    <li class="list" v-if="preview_image">
                        <img :src="preview_image" alt="alt_img" />
                    </li>
                    <li class="list" v-if="preview_image_file">
                        <img :src="preview_image_file" alt="alt_img" />
                    </li>
                </ul>
                <!-- <input type="checkbox" class="check__field" name=""> -->
                <button class="btn_submit" @click="addExperimentUser" type="button">{{ $t('publish') }}</button>
            </form>
        </div>
    </div>
    <div class="__background"></div>

    <profile-header-vue />

    <!-- logo & search -->
    <div class="logo__content">
        <img class="logo" src="/assets/images/logo/logo_user.png" alt="">
        <div class="icons">
            <!-- <a class="item" id="open_profile_opinion">
                <i class="fas fa-plus icon"></i>
            </a> -->
            <a class="item" @click="showOpinion">
                <i class="fas fa-plus icon"></i>
            </a>
            <a @click="redirectToPath({ val: '/user-edit-profile' })" class="item">
                <i class="fas fa-pencil-alt icon"></i>
            </a>
            <!-- <a class="item" id="open_profile_notif">
                <i class="fas fa-bell icon"></i>
            </a> -->
            <a class="item" @click="showNotifications">
                <i class="fas fa-bell icon"></i>
            </a>
        </div>
    </div>

    <!-- Navbar & Search Input -->
    <div class="nav__content">
        <div class="nav__list">
            <!-- sideList <a href="profile_details.html" class="item active">Details</a>
            <a href="profile_reviews.html" class="item">Reviews</a>
            <a href="profile_chat.html" class="item">Chat</a> -->
            <a v-for="item in sideList" :key="item.id" 
                @click="redirectToPath({ val: item.url })" 
                :class="item.active == `active` ? `item active` : `item`"
                >{{ $t(item.name) }}</a>
        </div>
        <div class="nav__search">
            <img class="image" src="/assets/images/icon/mag2.png" alt="">
            <form action="" class="search_input">
                <input class="input" type="text" name="search" :placeholder="$t('search_here')" > 
            </form>
        </div>
    </div>

    <div class="overlay" v-if="showOverlayNote" @click="showNotifications"></div>
    <div class="notif_profile" v-if="showNote" >
        <span class="close">X</span>
        <span class="tringle"></span>
        <div class="Title">{{ $t('notifications') }}</div>
        <div class="content">
            <div class="notif_day">
                <span class="day">Info</span>
                <div class="lists" >
                    <div class="item__list" v-for="item in notifications" :key="item.id">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">{{ item.owner_id }}</span>
                            {{ item.message }}
                        </span>
                        <span class="time">{{ item.created_at }}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Api from "@/api"
import { mapActions } from 'vuex'
import ProfileHeaderVue from './ProfileHeader.vue';
import Rating from './Rating.vue';
import useValidate from '@vuelidate/core'
import { required , minLength , maxLength   } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
    export default {
        name: "ProfileNav",
        props:{
            sideList:{
                type: Array,
                required: true
            }
        },
        components:{
            ProfileHeaderVue,
            Rating,
        },
        data(){
            return {
                // val$: useValidate(),
                showOverlayNote: false,
                showNote: false,
                showOverlayOpi: false,
                showOpi: false,
                notifications: [],
                preview_image: null,
                image_item: null,
                preview_image_file: null,
                image_item_file: null,
                bodyEx: '',
                rateValue: '',
            }
        },
        validations () {
            return {
                bodyEx: {
                    required,
                    minLength: minLength(100),
                },
            }
        },
        mounted(){
            this.getNotificationsUser()
            console.log(this.$store.getters["user/getToken"])
        },
        methods:{
            ...mapActions(['redirectTo']),
            ...mapActions(['redirectToPath']),
            
            showNotifications() {
                this.showOverlayNote = !this.showOverlayNote
                this.showNote = !this.showNote
            },
                showOpinion() {
                this.showOverlayOpi = !this.showOverlayOpi
                this.showOpi = !this.showOpi
                console.log(this.showOverlayNote,this.showNote)
            },
            async getNotificationsUser(){
                await Api.user.userNotfications().then((res)=>{
                if(res.data.status){
                   
                    this.notifications = res.data.body.Notfications;
                } 
                // console.log(res)
            })
            },
            uploadImagesOpin(event){
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview_image = e.target.result;
                }
                this.image_item = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            uploadImagesOpinFile(event){
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
            clearUploadImg(){
                this.image_item = null
                this.preview_image = null
                this.image_item_file = null
                this.preview_image_file = null
            },
            rate(event){
                this.rateValue = event
                // console.log(this.rateValue)
            },
            async addExperimentUser(){
                const toast = useToast()
                // this.val$.$validate();
                // if(!this.val$.$error){
                    const data = new FormData();
                    data.append('body', this.bodyEx);
                    data.append('rate', this.rateValue);
                    data.append('file', this.image_item_file);
                    data.append('product_image', this.image_item);
                    
                    await Api.user.userAddExperiments(data).then((res)=>{
                        console.log(res);
                        if(res.data.status){
                            this.$router.go()
                        } 
                        
                    })

            //     }else{
            //     // console.log("fail validate")
            //     toast.error(`fail validate`,{
            //         position: "top-right",
            //         timeout: 3048,
            //         closeOnClick: true,
            //         pauseOnFocusLoss: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         draggablePercent: 0.6,
            //         showCloseButtonOnHover: false,
            //         hideProgressBar: true,
            //         closeButton: "button",
            //         icon: true,
            //         rtl: false
            //     })
            // }

            }
        }
    }
</script>

<style scoped>

  /* logo Content */

  .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
    margin-top: 1.5625vw;
}

.logo__content .logo{
    width: 3.64583vw;
}

.logo__content .icons{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 11.9791666vw;
}

.logo__content .icons .item{}

.logo__content .icons .item .icon{
    font-size: 1.1458333vw;
    color: #b1b1b1;
}

.logo__content .icons .item .icon:hover{
    color:#0136EE;
    transition: all 0.2s ease-in-out;
}

.logo__content .icons .item .image{    
    width: 2.96875vw;
    height: 3.177083335vw;
    border-radius: 50%;
}



/* Navbar Content */

.nav__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
    margin-right: 2.60416665vw;
    margin-top: 3.5625vw;
    margin-bottom: 1vw;
    flex-direction: column;
}

.nav__content .nav__list{
    display: flex;
    justify-content: flex-start;
    width: 80%;
    margin-bottom: 3.125vw;
}

.nav__content .nav__list .item{
    color: #B1B1B1;
    font-size: 1.5625vw;
    margin-right: 8.33333334vw;
}

.nav__content .nav__list .active{
    font-size: 1.458333vw !important;
    font-weight: bold;
}

.nav__content .nav__search{
    display: flex;
    position: relative;
    width: 97%;
}

.nav__content .nav__search .image{
    width: 2.08334vw;
    height: 2.08334vw;
    position: absolute;
    left: 0.364583333vw;
    top: 0.625vw;
}

.nav__content .nav__search .search_input{
    width: 100%;
    height: 3.28125vw;
}

.nav__content .nav__search .search_input .input{
    width: 100%;
    height: 100%;
    padding-left: 3.125vw;
    font-size: 1.82291667vw;
    border: 2px solid #B1B1B1;
    background: #F2F2F2;
    cursor: pointer;
}

.nav__content .nav__search .search_input .input:focus{
    outline: none;
}

.nav__content .nav__search .search_input .input::placeholder{
    font-size: 1.82291667vw;
    font-weight: lighter;
    color: #B1B1B1;
}


.s_overlay{
  position: absolute;
  top: 4vw;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000 0% 0% no-repeat padding-box;
  opacity: 0.5;
  z-index: 5;
  display: block !important;
  height: 90vw;
}
.list_add_opinion{
    position: absolute;
    top: 13vw;
    left: 28vw;
    z-index: 6;
    width: 48vw;
    /* height: 616px; */
    display: flex;
    flex-direction: column;
    /* display: none; */
}
.list_add_opinion .person_info{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.4787535vw;
}
.list_add_opinion .person_info .image{
    width: 6.373938vw;
    height: 7.4362606vw;
    border-radius: 50%;
}
.list_add_opinion .person_info .name{
    color: #FFFFFF;
    font-size: 2.4787535vw;
    font-weight: bold;
    margin-left: 1.77053824vw;
}

.list_add_opinion .form_add_opinion{
    width: 100%;
}

.list_add_opinion .form_add_opinion .opinin_form{
    display: flex;
    flex-direction: column;
}
.list_add_opinion .form_add_opinion .opinin_form .feedback_error{
    position: absolute;
    top: 23vw;
    left: 1vw;
    color: #D40000;
    font-size: 1vw;
}
.list_add_opinion .form_add_opinion .opinin_form textarea{
    height: 25vw;
    border: 3px dashed #707070;
    font-size: 2vw;
    padding: 1vw;
}

.list_add_opinion .form_add_opinion .opinin_form textarea:focus{
    outline: none;
}

.list_add_opinion .form_add_opinion .opinin_form textarea::placeholder{
    color: #B1B1B1;
    font-size: 2vw;

}

.list_add_opinion .form_add_opinion .opinin_form input[type=file]{
    padding: 0;
    visibility:hidden;
    position:absolute ;
}
.list_add_opinion .form_add_opinion .opinin_form .attach{
    position: absolute;
    right: 1.0623229vw;
    bottom: 18vw;
    color: #0136EE;
    font-size: 1.2747875vw;
    cursor: pointer;
}
.list_add_opinion .form_add_opinion .opinin_form .attach .icon{
    color: #707070;
}
.list_add_opinion .form_add_opinion .opinin_form .attach_file{
    position: absolute;
    right: 1.0623229vw;
    bottom: 15vw;
    color: #0136EE;
    font-size: 1.2747875vw;
    cursor: pointer;
}
.list_add_opinion .form_add_opinion .opinin_form .attach_file .icon{
    color: #707070;
}

/* checkbox input */

.list_add_opinion .form_add_opinion .opinin_form .check__field{
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: #000;
    width: 1.2020833vw;
    height: 1.3020833vw;
    border: 0.15em solid #000;
    display: grid;
    place-content: center;
    position: absolute;
    left: 0;
    bottom: 5.28125vw;
  }
  
  .list_add_opinion .form_add_opinion .opinin_form .check__field::before {
    content: "";
    width: 0.625vw;
    height: 0.625vw;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #000;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  .list_add_opinion .form_add_opinion .opinin_form .check__field:checked::before {
    transform: scale(1);
  }

.list_add_opinion .form_add_opinion .opinin_form .btn_submit{
    width: 15vw;
    height: 4vw;
    margin: auto;
    color: #FFFFFF;
    text-transform: capitalize;
    border: 0;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 14px;
    font-size: 1.7vw;
    margin-top: 1vw;
}
.list_add_opinion .form_add_opinion .opinin_form .list-style{
    width: 100%;
    margin: auto;
    list-style: none;
    /* position: absolute; */
    border: 1px solid #707070;
    background: #fff;
    padding: 0;
    padding-top: 1.5vw!important;
    display: flex;
    height: 16vw;
    align-items: flex-end;
}
.list_add_opinion .form_add_opinion .opinin_form .list-style .clear{
    margin: 1.5vw;
    font-size: 1vw;
    cursor: pointer;
    font-weight: 600;
    color: #fff;
    padding: 0.7vw 1.7vw;
    background: #9d0000 0% 0% no-repeat padding-box;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
}

.list_add_opinion .form_add_opinion .opinin_form .list-style .list{
    width: 7vw;
    margin: auto;
    margin-top: 2vw!important;
    margin-bottom: 2vw!important;
}
.list_add_opinion .form_add_opinion .opinin_form .list-style .list img{
    width: 100%;
}

.overlay{
    position: absolute;
    top: 10.160339vw;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index: 5;
    /* display:none; */
}
.notif_profile{
    position: absolute;
    width: 46.2266289vw;
    /* height: 524px; */
    background: #fff 0% 0% no-repeat padding-box;
    border-radius: 11px;
    /* opacity: 1 !important; */
    z-index: 6;
    right: 0.55751vw;
    top: 9.9643059vw;
    padding-bottom: 1.0623229vw;
    border: 0;
    /* display: none; */
  }
  .notif_profile .close{
    position: absolute;
    top:-2.053824vw;
    left:-0.849858vw;
    padding:0.0208215vw 0.8623229vw;
    font-size: 1.9371105vw;
    font-weight: bold;
    color: #0136EE;
    border-radius: 50%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    cursor: pointer;
  }
  .notif_profile .tringle{
    position: absolute;
    top: -1.783003vw;
    right: 0.5vw;
    width: 0;
    height: 0;
    border-left: 2.1950354vw solid transparent;
    border-right: 2.1950354vw solid transparent;
    border-bottom: 2.0113475vw solid #0136EE;
  }

  .notif_profile .Title{
    height: 3.27818697vw;
    width: 100%;
    background: #0136EE 0% 0% no-repeat padding-box;
    border: 1px solid #0136EE;
    border-top: 0;
    color: #FFFFFF;
    font-size: 1.72464589vw;
    /* margin: auto 0; */
    display: flex;
    align-items: center;
    padding-left: 3.74107649vw;
  }

  .notif_profile .content{
    display: flex;
    flex-direction: column;
    /* margin-left: 1.04107649vw; */
  }

  .notif_profile .content .notif_day{
    margin-top: 1.5246459vw;
  }

  .notif_profile .content .notif_day .day{
    color: #B1B1B1;
    font-size: 1.5246459vw;
    font-weight: 500;
    margin-left: 1.04107649vw;
  }

  .notif_profile .content .notif_day .lists{
    margin-top: 0.862323vw !important;
    width: 95%;
    margin: auto;
  }

  .notif_profile .content .notif_day .lists .item__list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.7082153vw;
  }

  .notif_profile .content .notif_day .lists .item__list .circle{
    background: #0136EE 0% 0% no-repeat padding-box;
    opacity: 1;
    /* margin-right: 27px; */
    width: 1.27053824vw;
    height: 1.27053824vw;
    border-radius: 50%;
    margin-top: 0.712989vw;
    /* padding: 4px;*/
  }

  .notif_profile .content .notif_day .lists .item__list .list_text{
    color: #D1D1D1;
    font-size: 1.3830028vw;
    width: 85%;
  }

.notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
    color: #B1B1B1;
    font-size: 1.4246459vw;
    font-weight: 500;
}

  .notif_profile .content .notif_day .lists .item__list .time{
    color: #B1B1B1;
    font-size: 1.11643059vw;
  }


  


</style>