<template>
    <div class="icons">
        <a class="item active cursor_pointer position-relative" @click="showNoteSupplier" v-if="addActiveNote">
            <i class="fas fa-bell icon active"></i>
            <span class="notif_length" v-if="notifications.length > 0">{{ notifications.length }}</span>
        </a>
        <a class="item cursor_pointer position-relative" @click="showNoteSupplier" v-if="!addActiveNote">
            <i class="fas fa-bell icon"></i>
            <span class="notif_length" v-if="notifications.length > 0">{{ notifications.length }}</span>
        </a>
        <a @click="showEditSupplier" v-if="addActiveEdit" class="item active">
            <i  class="fas fa-pencil-alt icon active"></i>
        </a>
        <a @click="showEditSupplier" v-if="!addActiveEdit" class="item">
            <i  class="fas fa-pencil-alt icon"></i>
        </a>
    </div>
    <div v-if="showOverlayEdit" class="s_overlay"></div>
    <div v-if="showDivEdit" class="editSupplier">
        <div class="profile_edit_content form_edit_custom active">
            <div class="person__info mt-5">
                <header-image/>
                <div class="btns mt-2 right_abs">
                    <a @click="showEditSupplier" class="btn_form btn_cancel">Cancel</a>
                    <a @click.prevent="updateDataUser" class="btn_form btn_save">Save</a>
                </div>
            </div>
            <div class="person__details mt-5 margin_top_8">
                <div class="form " v-if="profile">
                    <div class="form__field input_sm">
                        <label class="label">First Name</label>
                        <input class="input" type="text" v-model="profile.f_name" placeholder="First Name">
                        <span class="feedback_error" v-if="v$.profile.f_name.$error">{{ v$.profile.f_name.$errors[0].$message }}</span>
                    </div><div class="offset_input"></div>
                    <div class="form__field input_sm">
                        <label class="label">Last Name</label>
                        <input class="input" type="text" v-model="profile.l_name" placeholder="Last Name">
                        <span class="feedback_error" v-if="v$.profile.l_name.$error">{{ v$.profile.l_name.$errors[0].$message }}</span>
                    </div>

                    <div class="form__field input_sm">
                        <label class="label">Phone</label>
                        <input class="input" type="text" v-model="profile.phone" placeholder="Phone">
                        <span class="feedback_error" v-if="v$.profile.phone.$error">{{ v$.profile.phone.$errors[0].$message }}</span>
                    </div><div class="offset_input"></div>
                    <div class="form__field input_sm">
                        <label class="label">E-mail</label>
                        <input class="input" type="text" v-model="profile.email" placeholder="E-mail">
                        <span class="feedback_error" v-if="v$.profile.email.$error">{{ v$.profile.email.$errors[0].$message }}</span>
                    </div>

                    <div class="form__field">
                        <label class="label">User Name</label>
                        <input class="input" type="text" v-model="profile.username" placeholder="User Name">
                        <span class="feedback_error" v-if="v$.profile.username.$error">{{ v$.profile.username.$errors[0].$message }}</span>
                    </div>

                    <!-- <div class="form__field">
                        <label class="label">Bio</label>
                        <input id="input_pro_file" class="input" type="file" name="bio" placeholder="Bio">
                        <span onclick="document.getElementById('input_pro_file').click()" class="files"></span>
                    </div> -->

                    <!-- <div class="form__field">
                        <label class="label">Country</label>
                        <input class="input" type="text" name="country" placeholder="Country" value="Saudi Arabia" disabled>
                    </div> -->

                    <div class="form__field input_sm">
                        <label class="label">Gender</label>
                        <select class="input" v-model="profile.gender">
                            <option value="female" :selected="profile.gender =='female'">Female</option>
                            <option value="male" :selected="profile.gender =='male'">Male</option>
                        </select>
                        <span class="feedback_error" v-if="v$.profile.gender.$error">{{ v$.profile.gender.$errors[0].$message }}</span>
                    </div><div class="offset_input"></div>
                    <div class="form__field input_sm">
                        <label class="label">Marital status</label>
                        <select class="input" v-model="profile.matrial_status">
                            <option value="single" :selected="profile.matrial_status =='single'">Single</option>
                            <option value="married" :selected="profile.matrial_status =='married'">Married</option>
                        </select>
                        <span class="feedback_error" v-if="v$.profile.matrial_status.$error">{{ v$.profile.matrial_status.$errors[0].$message }}</span>
                    </div>
                    
                    <div class="form__field mb-5">
                        <span class="optional">(Optional)</span>
                        <label class="label">Date Of Birth</label>
                        <input class="input border_none" type="date" v-model="profile.date_of_birth" placeholder="Date Of Birth" >
                    </div>

                    <!-- <div class="form__field">
                        <label class="label">Password</label>
                        <input class="input border_none" type="password" name="password" placeholder="Password" value="September" disabled>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="overlay_not" v-if="showOverlayNote" @click="showNoteSupplier"></div>
    <div class="notif_profile" v-if="showDivNote" >
        <span class="close" @click="showNoteSupplier">X</span>
        <span class="tringle"></span>
        <div class="Title">{{ $t('notifications') }}</div>
        <div class="content">
            <div class="notif_day">
                <span class="day">{{ $t('notice') }}</span>
                <div class="lists">
                    <div class="item__list" v-for="item in notifications" :key="item.id">
                        <span class="circle"></span>
                        <span class="list_text">
                            <!-- <span class="notify_person">{{ item.owner_id }}</span> -->
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
import useValidate from '@vuelidate/core'
import { required , minLength , maxLength , numeric , email , sameAs  } from '@vuelidate/validators'
import HeaderImage from "@/components/supplier/HeaderImage.vue"
import { useToast } from 'vue-toastification'
    export default {
        name: "HeaderIcons",
        components: {
            HeaderImage
        },
        data() {
            return {
                addActiveNote: false,
                addActiveEdit: false,
                showDivEdit: false,
                showOverlayEdit: false,
                showDivNote: false,
                showOverlayNote: false,
                v$: useValidate(),
                // profile: null,
                profile:{
                    f_name: '',
                    l_name: '',
                    email: '',
                    phone: '',
                    gender: '',
                    matrial_status: '',
                    username: '',
                },
                notifications:[]
                
            }
        },
        validations () {
            return {
                profile:{
                    f_name: {
                        required,
                    },
                    l_name: {
                        required,
                    },
                    email: {
                        required,
                        email
                    },
                    phone: {
                        required,
                        numeric,
                        minLength: minLength(10),
                        maxLength: maxLength(10),
                    },
                    gender: {
                        required,
                    },
                    matrial_status: {
                        required,
                    },
                    username: {
                        required,
                    }
                }
            }

        },
        mounted() {
            // this.showEditSupplier()
            this.getNotificationsUser()
            this.getDataSupplier()
            // console.log(this.addActiveEdit,this.showDivEdit,this.showOverlayEdit)
        },
        methods: {
            showNoteSupplier(){
                this.addActiveNote = !this.addActiveNote
                this.showDivNote = !this.showDivNote
                this.showOverlayEdit = !this.showOverlayEdit
            },
            showEditSupplier() {
                this.addActiveEdit = !this.addActiveEdit
                this.showDivEdit = !this.showDivEdit
                this.showOverlayEdit = !this.showOverlayEdit
            },
            async getDataSupplier(){
            await Api.supplier.getUser().then((res)=>{
                if(res.data.status){
                    // this.addUser()
                    // JSON.parse(json)
                    this.$store.dispatch("user/addSupplier", res.data.userData)
                    // console.log("user",this.$store.getters["user/getUser"])
                    this.profile = res.data.userData;
                }
            })
        },
        async updateDataUser(){
            const toast = useToast()
            this.v$.$validate();
            if(!this.v$.$error){
                const payload = {
                    f_name: this.profile.f_name,
                    l_name: this.profile.l_name,
                    username: this.profile.username,
                    email: this.profile.email,
                    phone: this.profile.phone,
                    gender: this.profile.gender,
                    matrial_status: this.profile.matrial_status,
                    date_of_birth: this.profile.date_of_birth,
                }
                
                // console.log(payload)
                await Api.user.updateUser(payload).then((res) => {
                    // console.log("success fetch", res)
                    if(res?.data?.status){
                        this.redirectToPath({ val: '/supplier' })
                    }
                })

            }else{
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
        async getNotificationsUser(){
                await Api.user.userGeneralNotfications().then((res)=>{
                if(res.data.status){
                   
                    this.notifications = res.data.body.Notfications;
                } 
                // console.log(res)
            })
            },
        },
    }
</script>

<style  scoped>
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
.left_abs{
    left: -6vw !important;
}
.right_abs{
    right: -6vw !important;
}

.margin_top_8{
    margin-top: 2vw !important;
}
.editSupplier{
    position: absolute;
    top: 12vw;
    left: 13vw;
    width: 80vw;
    height: auto;
    padding: 50px 5px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}

.s_overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000 0% 0% no-repeat padding-box;
  opacity: 0.5;
  z-index: 2;
  display: block !important;
}
.icons {
    display: flex;
    align-items: center;
    margin-top: 1.2vw;
}
.icons .item {
    margin-left: 1.3458333vw;
}
.icons .item .icon {
    font-size: 1.3458333vw;
    color: #6e6e6e;
}
.icons .item .icon:hover{
    color: #0136ee;
    transition: all 0.2s ease-in-out;
}

.icons .active{
    z-index: 3;
}
.icons .item .active {
    font-size: 2.0458333vw;
    padding: 0.364583333vw 0.46875vw;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 50%;
    color: #fff!important;
}
.icons .item .active:hover {
    color: #6e6e6e!important;
}

.notif_profile{
    position: absolute;
    width: 45vw;
    /* height: 524px; */
    background: #fff 0% 0% no-repeat padding-box;
    border-radius: 11px;
    /* opacity: 1 !important; */
    z-index: 6;
    right: 3vw;
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

[dir='rtl'] .notif_profile .content .notif_day .lists .item__list .time{
    text-align: left;
  }
  .notif_profile .content .notif_day .lists .item__list .time{
    color: #6e6e6e;
    font-size: 1.11643059vw;
    text-align: right;
  }


  .notif_length{
    background: #d40000;
    color: #fff;
    font-weight: 600;
    font-size: 17px;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 0.5vw;
    left: 0.5vw;
  }



    /****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    
    [dir="rtl"] .notif_profile{
        left: 5vw;
        right: auto;
    }
    .notif_profile{
        width: 85vw;
        z-index: 6;
        right: 1vw;
        top: 20vw;
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

    [dir='rtl'].notif_length{
        right: 2vw;
        left: auto;
    }
    .notif_length{
        font-size: 2.5vw;
        width: 3vw;
        height: 3.5vw;
        top:2vw;
        left: 2vw;
    }

    /* .overlay_not{
        position: absolute;
        top: 17.5vw;
        height: 200vw;
    } */

    .s_overlay{
        height: 200vw;
    }
    .icons {
        display: flex;
        align-items: center;
        margin-top: 1.2vw;
    }
    .icons .item {
        margin-left: 4vw;
    }
    .icons .item .icon {
        font-size: 3vw;
        color: #6e6e6e;
    }

    .icons .item .active {
    font-size: 3.5vw;
    padding: 0.364583333vw 0.46875vw;
}
    

[dir='rtl'] .right_abs{
    left: -6vw !important;
    right: auto !important;
}
.right_abs{
    right: -6vw !important;
    top: -10vw!important;
}

.margin_top_8{
    margin-top: 3vw !important;
}
.editSupplier{
    position: absolute;
    top: 30vw;
    left: 11vw;
    width: 80vw;
    height: 130vw!important;
    padding: 50px 5px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

    [dir="rtl"] .notif_profile{
        left: 5.5vw;
        right: auto;
    }
    .notif_profile{
        width: 75vw;
        z-index: 6;
        right: 5.5vw;
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

    [dir='rtl'].notif_length{
        right: 2vw;
        left: auto;
    }
    .notif_length{
        font-size: 2.3vw;
        width: 2.7vw;
        height: 3.2vw;
        top:2vw;
        left: 2vw;
    }

    /* .overlay_not{
        position: absolute;
        top: 15vw;
        height: 150vw;
    } */

    .s_overlay{
        height: 150vw;
    }
    .icons {
        display: flex;
        align-items: center;
        margin-top: 1.2vw;
    }
    .icons .item {
        margin-left: 2vw;
    }
    .icons .item .icon {
        font-size: 2.5vw;
        color: #6e6e6e;
    }

    .icons .item .active {
    font-size: 3vw;
    padding: 0.364583333vw 0.46875vw;
}

[dir='rtl'] .right_abs{
    left: -6vw !important;
    right: auto !important;
}
.right_abs{
    right: -6vw !important;
    top: -10vw!important;
}

.margin_top_8{
    margin-top: 3vw !important;
}
.editSupplier{
    position: absolute;
    top: 20vw;
    left: 11vw;
    width: 80vw;
    height: 105vw!important;
    padding: 5px 5px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
   

    [dir="rtl"] .notif_profile{
        left: 6vw;
        right: auto;
    }
    .notif_profile{
        width: 60vw;
        z-index: 6;
        right: 4vw;
        top: 16vw;
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

    [dir='rtl'].notif_length{
        right: 1.5vw;
        left: auto;
    }
    .notif_length{
        font-size: 2vw;
        width: 2.2vw;
        height: 2.5vw;
        top:1.5vw;
        left: 1.2vw;
    }

    .s_overlay{
        height: 150vw;
    }
    .icons {
        display: flex;
        align-items: center;
        margin-top: 1.2vw;
    }
    .icons .item {
        margin-left: 2vw;
    }
    .icons .item .icon {
        font-size: 2vw;
        color: #6e6e6e;
    }

    .icons .item .active {
    font-size: 2.5vw;
    padding: 0.364583333vw 0.46875vw;
}

[dir='rtl'] .right_abs{
    left: -6vw !important;
    right: auto !important;
}
.right_abs{
    right: -6vw !important;
    top: -5vw!important;
}

.margin_top_8{
    margin-top: 2vw !important;
}
.editSupplier{
    position: absolute;
    top: 20vw;
    left: 11vw;
    width: 80vw;
    height: 95vw!important;
    padding: 0;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}


}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    

    [dir="rtl"] .notif_profile{
        left: 6vw;
        right: auto;
    }
    .notif_profile{
        width: 50vw;
        z-index: 6;
        right: 4.3vw;
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


    [dir='rtl'].notif_length{
        right: 1vw;
        left: auto;
    }
    .notif_length{
        font-size: 1.5vw;
        width: 1.7vw;
        height: 1.9vw;
        top:1vw;
        left: 1vw;
    }

    .s_overlay{
        height: 150vw;
    }
    .icons {
        display: flex;
        align-items: center;
        margin-top: 1.2vw;
    }
    .icons .item {
        margin-left: 2vw;
    }
    .icons .item .icon {
        font-size: 1.5vw;
        color: #6e6e6e;
    }

    .icons .item .active {
        font-size: 2vw;
        padding: 0.364583333vw 0.46875vw;
    }

    
[dir='rtl'] .right_abs{
    left: -6vw !important;
    right: auto !important;
}
.right_abs{
    right: -6vw !important;
    top: -2vw!important;
}

.margin_top_8{
    margin-top: 2vw !important;
}
.editSupplier{
    position: absolute;
    top: 20vw;
    left: 15vw;
    width: 70vw;
    height: 72vw!important;
    padding: 0;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}
.form_edit_custom{
    width: 70%!important;
    margin-top: 0!important;
}
.form_edit_custom .person__details .form .form__field .label{
    margin-top: 1vw!important ;
}
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
   

    [dir="rtl"] .notif_profile{
        left: 6vw;
        right: auto;
    }
    .notif_profile{
        width: 43vw;
        z-index: 6;
        right: 6vw;
        top: 13.5vw;
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

    [dir='rtl'].notif_length{
        right: 1vw;
        left: auto;
    }
    .notif_length{
        font-size: 1.3vw;
        width: 1.3vw;
        height: 1.5vw;
        top:1vw;
        left: 1vw;
    }

    .s_overlay{
        height: 150vw;
    }
    .icons {
        display: flex;
        align-items: center;
        margin-top: 1.2vw;
    }
    .icons .item {
        margin-left: 2vw;
    }
    .icons .item .icon {
        font-size: 1.5vw;
        color: #6e6e6e;
    }

    .icons .item .active {
        font-size: 2vw;
        padding: 0.364583333vw 0.46875vw;
    }

    [dir='rtl'] .right_abs{
    left: -8vw !important;
    right: auto !important;
}
.right_abs{
    right: -3vw !important;
    top: -1vw!important;
}

.margin_top_8{
    margin-top: 2vw !important;
}
.editSupplier{
    position: absolute;
    top: 20vw;
    left: 25vw;
    width: 50vw;
    height: 62vw!important;
    height: auto;
    padding: 0;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}

.form_edit_custom{
    width: 80%!important;
    margin-top: 0!important;
}
.form_edit_custom .person__details .form .form__field .label{
    margin-top: 1vw!important ;
}
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
    [dir="rtl"] .notif_profile{
        left: 6.5vw;
        right: auto;
    }
    .notif_profile{
        width: 37vw;
        z-index: 6;
        right: 3.2vw;
        top: 12.5vw;
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

    [dir='rtl'].notif_length{
        right: 1vw;
        left: auto;
    }
    .notif_length{
        font-size: 1vw;
        width: 1vw;
        height: 1.2vw;
        top: 1.1vw;
        left: 1vw;
    }

    .s_overlay{
        height: 150vw;
    }
    .icons {
        display: flex;
        align-items: center;
        margin-top: 1vw;
    }
    .icons .item {
        margin-left: 2vw;
    }
    .icons .item .icon {
        font-size: 1.5vw;
        color: #6e6e6e;
    }

    .icons .item .active {
        font-size: 2vw;
        padding: 0.364583333vw 0.46875vw;
    }


    [dir='rtl'] .right_abs{
    left: -3vw !important;
    right: auto !important;
}
.right_abs{
    right: -3vw !important;
    top: -1vw!important;
}

.margin_top_8{
    margin-top: 1vw !important;
}
.editSupplier{
    position: absolute;
    top: 15vw;
    left: 30vw;
    width: 45vw;
    height: 55vw!important;
    height: auto;
    padding: 0;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 6px #00000029;
    border-radius: 21px;
    z-index: 3;
}

.form_edit_custom{
    width: 80%!important;
    margin-top: 0!important;
}
.form_edit_custom .person__details .form .form__field .label{
    margin-top: 1vw!important ;
}
}
</style>