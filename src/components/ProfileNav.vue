<template>
    <div class="s_overlay" v-if="showOverlayOpi" @click="showOpinion"></div>
    <div class="list_add_opinion" v-if="showOpi">
        <div class="form_add_opinion">
            <form class="opinin_form">
                <textarea :class="changeSize ? `padding_change_img`: ``" v-model="bodyEx" :placeholder="$t('enter_your_experiment')" name="" cols="30" rows="10"></textarea>
                <!-- <span class="feedback_error" v-if="val$.bodyEx.$error">{{ val$.bodyEx.$errors[0].$message }}</span> -->
                <input id="add_profile_attach" @change="uploadImagesOpin" ref="image" class="input" type="file">
                <input id="add_profile_attach" @change="uploadImagesOpinFile" ref="file" class="input" type="file">
                <span class="attach" @click="$refs.image.click()">
                    <i class="far fa-paperclip icon"></i> {{ $t('attach_image_product') }}
                </span>
                <span class="attach_file" @click="$refs.file.click()">
                    <i class="far fa-paperclip icon"></i> {{ $t('attach_file') }}
                </span>
                <Rating @rate="rate" :grade="0"  />
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
        <img @click="this.$router.push('/')" class="logo cursor_pointer" src="/assets/images/logo/logo_user.png" alt="">
        <div class="icons">
            <!-- <a class="item" id="open_profile_opinion">
                <i class="fas fa-plus icon"></i>
            </a> -->
            <a class="item cursor_pointer" @click="showOpinion">
                <i class="fas fa-plus icon"></i>
            </a>
            <a @click="redirectToPath({ val: '/user-edit-profile' })" class="item cursor_pointer">
                <i class="fas fa-pencil-alt icon"></i>
            </a>
            <!-- <a class="item" id="open_profile_notif">
                <i class="fas fa-bell icon"></i>
            </a> -->
            <a class="item cursor_pointer" @click="showNotifications">
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
                :class="item.active == `active` ? `item cursor_pointer active` : `item cursor_pointer`"
                >{{ $t(item.name) }}</a>
        </div>
        <div class="nav__search">
            <img class="image" @click="submitSearchForm" src="/assets/images/icon/mag2.png" alt="">
            <div class="search_input">
                <input v-on:keyup.enter="submitSearchForm" class="input" type="text" v-model="searchValue" :placeholder="$t('search_here')" > 
            </div>
        </div>
    </div>

    <div class="overlay_not" v-if="showOverlayNote" @click="showNotifications"></div>
    <div class="notif_profile" v-if="showNote" >
        <span class="close" @click="showNotifications">X</span>
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
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
                    </div>
                    <div class="item__list">
                        <span class="circle"></span>
                        <span class="list_text">
                            <span class="notify_person">Lorim</span>
                            commented on your review for lorim product.
                        </span>
                        <span class="time">2:00 pm</span>
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
        emits: ["search"],
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
                changeSize: true,
                notifications: [],
                preview_image: null,
                image_item: null,
                preview_image_file: null,
                image_item_file: null,
                bodyEx: '',
                rateValue: '',
                searchValue: '',
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
                // console.log(this.showOverlayNote,this.showNote)
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
                this.changeSize = false
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
                this.changeSize = false
                }
            },
            clearUploadImg(){
                this.image_item = null
                this.preview_image = null
                this.image_item_file = null
                this.preview_image_file = null
                this.changeSize = true
            },
            rate(event){
                this.rateValue = event
                // console.log(this.rateValue)
            },
            sendSearch(){
                this.$emit('search', this.searchValue)
            },
            submitSearchForm(){
                this.sendSearch()
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
                            this.showOverlayOpi = false
                            this.showOpi = false
                            this.preview_image = null
                            this.image_item = null
                            this.preview_image_file = null
                            this.image_item_file = null
                            this.bodyEx = ''
                            this.rateValue = ''
                            // this.$router.go()
                            this.$router.push('/user-experiment')
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

.padding_change_img {
    padding-left: 30%!important;
}

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
    cursor: pointer;
}
.logo__content .icons{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 11.9791666vw;
}
.logo__content .icons .item{
    cursor: pointer;
}
.logo__content .icons .item .icon{
    font-size: 1.1458333vw;
    color: #6e6e6e;
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
    color: #6e6e6e;
    font-size: 1.5625vw;
    margin-right: 8.33333334vw;
    cursor: pointer;
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
[dir='rtl'] .nav__content .nav__search .image{}
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
    border: 2px solid #6e6e6e;
    background: #F2F2F2;
    cursor: pointer;
}
.nav__content .nav__search .search_input .input:focus{
    outline: none;
}
.nav__content .nav__search .search_input .input::placeholder{
    font-size: 1.82291667vw;
    font-weight: lighter;
    color: #6e6e6e;
}

.overlay_not{
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
[dir="rtl"] .notif_profile{
    left: 0.55751vw;
    right: auto;
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
  [dir="rtl"] .notif_profile .close{
    right:-0.849858vw;
    left:auto;
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
  [dir="rtl"] .notif_profile .tringle{
    left: 0.2vw;
    right:auto;
  }
  .notif_profile .tringle{
    position: absolute;
    top: -1.783003vw;
    right: 0.2vw;
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
    padding-right: 3.74107649vw;
  }

  .notif_profile .content::-webkit-scrollbar {
  display: none;
}
  .notif_profile .content{
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    /* margin-left: 1.04107649vw; */
  }

  .notif_profile .content .notif_day{
    margin-top: 1.5246459vw;
  }

  .notif_profile .content .notif_day .day{
    color: #6e6e6e;
    font-size: 1.5246459vw;
    font-weight: 500;
    margin-left: 1.04107649vw;
    margin-right: 1.04107649vw;
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
    color: #818181;
    font-size: 1.3830028vw;
    width: 85%;
  }

.notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
    color: #6e6e6e;
    font-size: 1.4246459vw;
    font-weight: 500;
}

  .notif_profile .content .notif_day .lists .item__list .time{
    color: #6e6e6e;
    font-size: 1.11643059vw;
  }


  /****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .logo__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: auto;
        margin-top: 3vw;
    }
    .logo__content .logo{
        width: 9vw;
    }

    .logo__content .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 30vw;
    }
    .logo__content .icons .item .icon{
        font-size: 3vw;
    }
    /* Navbar Content */
    .nav__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        margin: auto;
        margin-right: 2.60416665vw;
        margin-top: 5vw;
        margin-bottom: 1vw;
        flex-direction: column;
    }

    .nav__content .nav__list{
        display: flex;
        justify-content: flex-start;
        width: 80%;
        margin-bottom: 5vw;
    }

    .nav__content .nav__list .item{
        color: #6e6e6e;
        font-size: 3.5vw;
        margin-right: 8vw;
        cursor: pointer;
    }

    .nav__content .nav__list .active{
        font-size: 3.5vw !important;
        font-weight: bold;
    }

    .nav__content .nav__search{
        display: flex;
        position: relative;
        width: 97%;
    }

    [dir='rtl'] .nav__content .nav__search .image{
        left: 1vw;
        right: auto;
    }
    .nav__content .nav__search .image{
        width: 4vw;
        height: 4vw;
        position: absolute;
        right: 1vw;
        left: auto;
        top: 1.8vw;
    }

    .nav__content .nav__search .search_input{
        width: 100%;
        height: 7.5vw;
    }

    .nav__content .nav__search .search_input .input{
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        font-size: 3.5vw;
        border: 2px solid #6e6e6e;
        background: #F2F2F2;
        cursor: pointer;
    }

    .nav__content .nav__search .search_input .input::placeholder{
        font-size: 3.5vw;
        font-weight: lighter;
        color: #6e6e6e;
    }

    [dir="rtl"] .notif_profile{
        left: 1vw;
        right: auto;
    }
    .notif_profile{
        width: 80vw;
        
        z-index: 6;
        right: 1vw;
        top: 22vw;
        padding-bottom: 1.0623229vw;
        border: 0;
        
        /* display: none; */
    }
    [dir="rtl"] .notif_profile .close{
        right:-5vw;
        left:auto;
    }
    .notif_profile .close{
        position: absolute;
        top:-5vw;
        left:-5vw;
        padding:0.5vw 3vw;
        font-size: 6vw;
    }
    [dir="rtl"] .notif_profile .tringle{
        left: 0.2vw;
        right:auto;
    }
    .notif_profile .tringle{
        position: absolute;
        top: -4.9vw;
        right: 0.2vw;
        border-left: 5vw solid transparent;
        border-right: 5vw solid transparent;
        border-bottom: 4.9vw solid #0136EE;
    }

    .notif_profile .Title{
        height: 13vw;
        font-size: 5.5vw;
        /* margin: auto 0; */
        display: flex;
        align-items: center;
        padding-left: 5vw;
        padding-right: 5vw;
    }

    .notif_profile .content{
        max-height: 100vw;
    }

    .notif_profile .content .notif_day{
        margin-top: 1.5246459vw;
    }

    .notif_profile .content .notif_day .day{
        font-size: 4vw;
        font-weight: 500;
        margin-left: 3vw;
        margin-right: 3vw;
    }

    .notif_profile .content .notif_day .lists{
        margin-top: 0.862323vw !important;
        width: 95%;
        margin: auto;
    }

    .notif_profile .content .notif_day .lists .item__list{
        margin-bottom: 5vw;
    }

    .notif_profile .content .notif_day .lists .item__list .circle{
        width: 3vw;
        height: 3vw;
        margin-top: 2vw;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text{
        font-size: 4vw;
        width: 78%;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
        font-size: 4vw;
    }

    .notif_profile .content .notif_day .lists .item__list .time{
        font-size: 3vw;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .logo__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 85%;
        margin: auto;
        margin-top: 2vw;
    }
    .logo__content .logo{
        width: 7vw;
    }

    .logo__content .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 25vw;
    }
    .logo__content .icons .item .icon{
        font-size: 2.5vw;
    }
    /* Navbar Content */
    .nav__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        margin: auto;
        margin-right: 2.60416665vw;
        margin-top: 3vw;
        margin-bottom: 1vw;
        flex-direction: column;
    }

    .nav__content .nav__list{
        display: flex;
        justify-content: flex-start;
        width: 80%;
        margin-bottom: 3vw;
    }

    .nav__content .nav__list .item{
        color: #6e6e6e;
        font-size: 3vw;
        margin-right: 8vw;
        cursor: pointer;
    }

    .nav__content .nav__list .active{
        font-size: 3vw !important;
        font-weight: bold;
    }

    .nav__content .nav__search{
        display: flex;
        position: relative;
        width: 97%;
    }

    [dir='rtl'] .nav__content .nav__search .image{
        left: 1vw;
        right: auto;
    }
    .nav__content .nav__search .image{
        width: 3.5vw;
        height: 3.5vw;
        position: absolute;
        right: 1vw;
        left: auto;
        top: 1.8vw;
    }

    .nav__content .nav__search .search_input{
        width: 100%;
        height: 6.5vw;
    }

    .nav__content .nav__search .search_input .input{
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        font-size: 3vw;
        border: 2px solid #6e6e6e;
        background: #F2F2F2;
        cursor: pointer;
    }

    .nav__content .nav__search .search_input .input::placeholder{
        font-size: 3vw;
        font-weight: lighter;
        color: #6e6e6e;
    }

    [dir="rtl"] .notif_profile{
        left: 4vw;
        right: auto;
    }
    .notif_profile{
        width: 70vw;
        z-index: 6;
        right: 4vw;
        top: 18vw;
        padding-bottom: 1.0623229vw;
        border: 0;
        
        /* display: none; */
    }
    [dir="rtl"] .notif_profile .close{
        right:-3vw;
        left:auto;
    }
    .notif_profile .close{
        position: absolute;
        top:-4vw;
        left:-3vw;
        padding:0.5vw 2vw;
        font-size: 4vw;
    }
    [dir="rtl"] .notif_profile .tringle{
        left: 0.2vw;
        right:auto;
    }
    .notif_profile .tringle{
        position: absolute;
        top: -4.1vw;
        right: 0.2vw;
        border-left: 4.5vw solid transparent;
        border-right: 4.5vw solid transparent;
        border-bottom: 4.4vw solid #0136EE;
    }

    .notif_profile .Title{
        height: 10vw;
        font-size: 4vw;
        /* margin: auto 0; */
        display: flex;
        align-items: center;
        padding-left: 5vw;
        padding-right: 5vw;
    }

    .notif_profile .content{
        max-height: 80vw;
    }

    .notif_profile .content .notif_day{
        margin-top: 1.5246459vw;
    }

    .notif_profile .content .notif_day .day{
        font-size: 3.5vw;
        margin-left: 3.5vw;
        margin-right: 3.5vw;
    }

    .notif_profile .content .notif_day .lists{
        margin-top: 0.862323vw !important;
        width: 95%;
        margin: auto;
    }

    .notif_profile .content .notif_day .lists .item__list{
        margin-bottom: 5vw;
    }

    .notif_profile .content .notif_day .lists .item__list .circle{
        width: 2.7vw;
        height: 2.7vw;
        margin-top: 2vw;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text{
        font-size: 3.3vw;
        width: 78%;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
        font-size: 3.3vw;
    }

    .notif_profile .content .notif_day .lists .item__list .time{
        font-size: 2.7vw;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .logo__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 86%;
        margin: auto;
        margin-top: 2vw;
    }
    .logo__content .logo{
        width: 6vw;
    }

    .logo__content .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 20vw;
    }
    .logo__content .icons .item .icon{
        font-size: 2vw;
    }
    /* Navbar Content */
    .nav__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        margin: auto;
        margin-right: 2.60416665vw;
        margin-top: 2vw;
        margin-bottom: 1vw;
        flex-direction: column;
    }

    .nav__content .nav__list{
        display: flex;
        justify-content: flex-start;
        width: 80%;
        margin-bottom: 2vw;
    }

    .nav__content .nav__list .item{
        color: #6e6e6e;
        font-size: 2.5vw;
        margin-right: 8vw;
        cursor: pointer;
    }

    .nav__content .nav__list .active{
        font-size: 2.5vw !important;
        font-weight: bold;
    }

    .nav__content .nav__search{
        display: flex;
        position: relative;
        width: 97%;
    }

    [dir='rtl'] .nav__content .nav__search .image{
        left: 1vw;
        right: auto;
    }
    .nav__content .nav__search .image{
        width: 2.5vw;
        height: 2.5vw;
        position: absolute;
        right: 1vw;
        left: auto;
        top: 1.8vw;
    }

    .nav__content .nav__search .search_input{
        width: 100%;
        height: 5.5vw;
    }

    .nav__content .nav__search .search_input .input{
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        font-size: 2.5vw;
        border: 2px solid #6e6e6e;
        background: #F2F2F2;
        cursor: pointer;
    }

    .nav__content .nav__search .search_input .input::placeholder{
        font-size: 2.5vw;
        font-weight: lighter;
        color: #6e6e6e;
    }

    [dir="rtl"] .notif_profile{
        left: 4vw;
        right: auto;
    }
    .notif_profile{
        width: 60vw;
        z-index: 6;
        right: 4vw;
        top: 15vw;
        padding-bottom: 1.0623229vw;
        border: 0;
        
        /* display: none; */
    }
    [dir="rtl"] .notif_profile .close{
        right:-2.5vw;
        left:auto;
    }
    .notif_profile .close{
        position: absolute;
        top:-3vw;
        left:-2.5vw;
        padding:0.5vw 1.7vw;
        font-size: 3vw;
    }
    [dir="rtl"] .notif_profile .tringle{
        left: 0.2vw;
        right:auto;
    }
    .notif_profile .tringle{
        position: absolute;
        top: -3.2vw;
        right: 0.2vw;
        border-left: 3.5vw solid transparent;
        border-right: 3.5vw solid transparent;
        border-bottom: 3.4vw solid #0136EE;
    }

    .notif_profile .Title{
        height: 7vw;
        font-size: 3vw;
        /* margin: auto 0; */
        display: flex;
        align-items: center;
        padding-left: 5vw;
        padding-right: 5vw;
    }

    .notif_profile .content{
        max-height: 60vw;
    }

    .notif_profile .content .notif_day{
        margin-top: 1.5246459vw;
    }

    .notif_profile .content .notif_day .day{
        font-size: 2.9vw;
        margin-left: 3.5vw;
        margin-right: 3.5vw;
    }

    .notif_profile .content .notif_day .lists{
        margin-top: 0.862323vw !important;
        width: 95%;
        margin: auto;
    }

    .notif_profile .content .notif_day .lists .item__list{
        margin-bottom: 5vw;
    }

    .notif_profile .content .notif_day .lists .item__list .circle{
        width: 2.3vw;
        height: 2.3vw;
        margin-top: 2vw;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text{
        font-size: 2.7vw;
        width: 78%;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
        font-size: 2.7vw;
    }

    .notif_profile .content .notif_day .lists .item__list .time{
        font-size: 2.4vw;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .logo__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 87%;
        margin: auto;
        margin-top: 2vw;
    }
    .logo__content .logo{
        width: 5vw;
    }

    .logo__content .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 18vw;
    }
    .logo__content .icons .item .icon{
        font-size: 1.5vw;
    }
    /* Navbar Content */
    .nav__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        margin: auto;
        margin-right: 2.60416665vw;
        margin-top: 1vw;
        margin-bottom: 1vw;
        flex-direction: column;
    }

    .nav__content .nav__list{
        display: flex;
        justify-content: flex-start;
        width: 80%;
        margin-bottom: 2vw;
    }

    .nav__content .nav__list .item{
        color: #6e6e6e;
        font-size: 2vw;
        margin-right: 5vw;
        cursor: pointer;
    }

    .nav__content .nav__list .active{
        font-size: 2vw !important;
        font-weight: bold;
    }

    .nav__content .nav__search{
        display: flex;
        position: relative;
        width: 97%;
    }
    [dir='rtl'] .nav__content .nav__search .image{
        left: 1vw;
        right: auto;
    }
    .nav__content .nav__search .image{
        width: 2vw;
        height: 2vw;
        position: absolute;
        right: 1vw;
        left: auto;
        top: 1.2vw;
    }

    .nav__content .nav__search .search_input{
        width: 100%;
        height: 4vw;
    }

    .nav__content .nav__search .search_input .input{
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        font-size: 2vw;
        border: 2px solid #6e6e6e;
        background: #F2F2F2;
        cursor: pointer;
    }

    .nav__content .nav__search .search_input .input::placeholder{
        font-size: 2vw;
        font-weight: lighter;
        color: #6e6e6e;
    }

    [dir="rtl"] .notif_profile{
        left: 4.3vw;
        right: auto;
    }
    .notif_profile{
        width: 50vw;
        z-index: 6;
        right: 4.3vw;
        top: 13vw;
        padding-bottom: 1.0623229vw;
        border: 0;
        
        /* display: none; */
    }
    [dir="rtl"] .notif_profile .close{
        right:-2.5vw;
        left:auto;
    }
    .notif_profile .close{
        position: absolute;
        top:-3vw;
        left:-2.5vw;
        padding:0.5vw 1.5vw;
        font-size: 2.3vw;
    }
    [dir="rtl"] .notif_profile .tringle{
        left: 0.2vw;
        right:auto;
    }
    .notif_profile .tringle{
        position: absolute;
        top: -2.5vw;
        right: 0.2vw;
        border-left: 2.7vw solid transparent;
        border-right: 2.7vw solid transparent;
        border-bottom: 2.6vw solid #0136EE;
    }

    .notif_profile .Title{
        height: 5vw;
        font-size: 2.5vw;
        /* margin: auto 0; */
        display: flex;
        align-items: center;
        padding-left: 5vw;
        padding-right: 5vw;
    }

    .notif_profile .content{
        max-height: 50vw;
    }

    .notif_profile .content .notif_day{
        margin-top: 1.5246459vw;
    }

    .notif_profile .content .notif_day .day{
        font-size: 2.3vw;
        margin-left: 3.5vw;
        margin-right: 3.5vw;
    }

    .notif_profile .content .notif_day .lists{
        margin-top: 0.862323vw !important;
        width: 95%;
        margin: auto;
    }

    .notif_profile .content .notif_day .lists .item__list{
        margin-bottom: 2vw;
    }

    .notif_profile .content .notif_day .lists .item__list .circle{
        width: 2vw;
        height: 2vw;
        margin-top: 1vw;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text{
        font-size: 2vw;
        width: 78%;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
        font-size: 2vw;
    }

    .notif_profile .content .notif_day .lists .item__list .time{
        font-size: 1.7vw;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .logo__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: auto;
        margin-top: 2vw;
    }
    .logo__content .logo{
        width: 4vw;
    }

    .logo__content .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 15vw;
    }
    .logo__content .icons .item .icon{
        font-size: 1.2vw;
    }
    /* Navbar Content */
    .nav__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        margin: auto;
        margin-right: 2.60416665vw;
        margin-top: 1vw;
        margin-bottom: 1vw;
        flex-direction: column;
    }

    .nav__content .nav__list{
        display: flex;
        justify-content: flex-start;
        width: 80%;
        margin-bottom: 2vw;
    }

    .nav__content .nav__list .item{
        color: #6e6e6e;
        font-size: 1.5vw;
        margin-right: 5vw;
        cursor: pointer;
    }

    .nav__content .nav__list .active{
        font-size: 1.5vw !important;
        font-weight: bold;
    }

    .nav__content .nav__search{
        display: flex;
        position: relative;
        width: 97%;
    }

    [dir='rtl'] .nav__content .nav__search .image{
        left: 1vw;
        right: auto;
    }
    .nav__content .nav__search .image{
        width: 1.5vw;
        height: 1.5vw;
        position: absolute;
        right: 1vw;
        left: auto;
        top: 0.8vw;
    }

    .nav__content .nav__search .search_input{
        width: 100%;
        height: 3vw;
    }

    .nav__content .nav__search .search_input .input{
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        font-size: 1.5vw;
        border: 2px solid #6e6e6e;
        background: #F2F2F2;
        cursor: pointer;
    }

    .nav__content .nav__search .search_input .input::placeholder{
        font-size: 1.5vw;
        font-weight: lighter;
        color: #6e6e6e;
    }

    [dir="rtl"] .notif_profile{
        left: 3.1vw;
        right: auto;
    }
    .notif_profile{
        width: 43vw;
        z-index: 6;
        right: 3.1vw;
        top: 11vw;
        padding-bottom: 1.0623229vw;
        border: 0;
        
        /* display: none; */
    }
    [dir="rtl"] .notif_profile .close{
        right:-2vw;
        left:auto;
    }
    .notif_profile .close{
        position: absolute;
        top:-2vw;
        left:-2vw;
        padding:0.5vw 1.2vw;
        font-size: 1.7vw;
    }
    [dir="rtl"] .notif_profile .tringle{
        left: 0.2vw;
        right:auto;
    }
    .notif_profile .tringle{
        position: absolute;
        top: -1.9vw;
        right: 0.2vw;
        border-left: 2.1vw solid transparent;
        border-right: 2.1vw solid transparent;
        border-bottom: 2vw solid #0136EE;
    }

    .notif_profile .Title{
        height: 4.3vw;
        font-size: 1.8vw;
        /* margin: auto 0; */
        display: flex;
        align-items: center;
        padding-left: 3.5vw;
        padding-right: 3.5vw;
    }

    .notif_profile .content{
        max-height: 40vw;
    }

    .notif_profile .content .notif_day{
        margin-top: 1.5246459vw;
    }

    .notif_profile .content .notif_day .day{
        font-size: 1.6vw;
        margin-left: 3.5vw;
        margin-right: 3.5vw;
    }

    .notif_profile .content .notif_day .lists{
        margin-top: 0.862323vw !important;
        width: 95%;
        margin: auto;
    }

    .notif_profile .content .notif_day .lists .item__list{
        margin-bottom: 1vw;
    }

    .notif_profile .content .notif_day .lists .item__list .circle{
        width: 1.5vw;
        height: 1.5vw;
        margin-top: 1vw;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text{
        font-size: 1.4vw;
        width: 78%;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
        font-size: 1.4vw;
    }

    .notif_profile .content .notif_day .lists .item__list .time{
        font-size: 1.2vw;
    }
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
    .logo__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: auto;
        margin-top: 2vw;
    }
    .logo__content .logo{
        width: 3vw;
    }

    .logo__content .icons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 13vw;
    }
    .logo__content .icons .item .icon{
        font-size: 1vw;
    }
    /* Navbar Content */
    .nav__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        margin: auto;
        margin-right: 2.60416665vw;
        margin-top: 0.3vw;
        margin-bottom: 1vw;
        flex-direction: column;
    }

    .nav__content .nav__list{
        display: flex;
        justify-content: flex-start;
        width: 80%;
        margin-bottom: 1vw;
    }

    .nav__content .nav__list .item{
        color: #6e6e6e;
        font-size: 1.2vw;
        margin-right: 5vw;
        cursor: pointer;
    }

    .nav__content .nav__list .active{
        font-size: 1.2vw !important;
        font-weight: bold;
    }

    .nav__content .nav__search{
        display: flex;
        position: relative;
        width: 97%;
    }

    [dir='rtl'] .nav__content .nav__search .image{
        left: 1vw;
        right: auto;
    }
    .nav__content .nav__search .image{
        width: 1.2vw;
        height: 1.2vw;
        position: absolute;
        right: 1vw;
        left: auto;
        top: 0.8vw;
    }

    .nav__content .nav__search .search_input{
        width: 100%;
        height: 2.5vw;
    }

    .nav__content .nav__search .search_input .input{
        width: 100%;
        height: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        font-size: 1.2vw;
        border: 2px solid #6e6e6e;
        background: #F2F2F2;
        cursor: pointer;
    }

    .nav__content .nav__search .search_input .input::placeholder{
        font-size: 1.2vw;
        font-weight: lighter;
        color: #6e6e6e;
    }


    [dir="rtl"] .notif_profile{
        left: 3.2vw;
        right: auto;
    }
    .notif_profile{
        width: 37vw;
        z-index: 6;
        right: 3.2vw;
        top: 9.5vw;
        padding-bottom: 1.0623229vw;
        border: 0;
        
        /* display: none; */
    }
    [dir="rtl"] .notif_profile .close{
        right:-1vw;
        left:auto;
    }
    .notif_profile .close{
        position: absolute;
        top:-1vw;
        left:-2vw;
        padding:0.3vw 1vw;
        font-size: 1.5vw;
    }
    [dir="rtl"] .notif_profile .tringle{
        left: 0.2vw;
        right:auto;
    }
    .notif_profile .tringle{
        position: absolute;
        top: -1.8vw;
        right: 0.2vw;
        border-left: 2vw solid transparent;
        border-right: 2vw solid transparent;
        border-bottom: 1.9vw solid #0136EE;
    }

    .notif_profile .Title{
        height: 3.7vw;
        font-size: 1.5vw;
        /* margin: auto 0; */
        display: flex;
        align-items: center;
        padding-left: 3.5vw;
        padding-right: 3.5vw;
    }

    .notif_profile .content{
        max-height: 30vw;
    }

    .notif_profile .content .notif_day{
        margin-top: 1.5246459vw;
    }

    .notif_profile .content .notif_day .day{
        font-size: 1.3vw;
        margin-left: 3.5vw;
        margin-right: 3.5vw;
    }

    .notif_profile .content .notif_day .lists{
        margin-top: 0.862323vw !important;
        width: 95%;
        margin: auto;
    }

    .notif_profile .content .notif_day .lists .item__list{
        margin-bottom: 2vw;
    }

    .notif_profile .content .notif_day .lists .item__list .circle{
        width: 1.1vw;
        height: 1.1vw;
        margin-top: 0.5vw;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text{
        font-size: 1.1vw;
        width: 78%;
    }

    .notif_profile .content .notif_day .lists .item__list .list_text .notify_person{
        font-size: 1.1vw;
    }

    .notif_profile .content .notif_day .lists .item__list .time{
        font-size: 1vw;
    }
    .overlay_not{
        position: absolute;
        top: 3vw;
        height: 100vw;
    }
}



  


</style>