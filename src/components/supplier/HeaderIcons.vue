<template>
    <div class="icons">
        <a class="item active" @click="showNoteSupplier" v-if="addActiveNote">
            <i class="fas fa-bell icon active"></i>
        </a>
        <a class="item " @click="showNoteSupplier" v-if="!addActiveNote">
            <i class="fas fa-bell icon"></i>
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
        <div class="profile_edit_content active">
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

    <div class="notif_profile" v-if="showDivNote" >
        <span class="close" @click="showNoteSupplier">X</span>
        <span class="tringle"></span>
        <div class="Title">Notifications</div>
        <div class="content">
            <div class="notif_day">
                <span class="day">Today</span>
                <div class="lists">
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
            <div class="notif_day">
                <span class="day">Today</span>
                <div class="lists">
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
                }
                
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
            this.getDataSupplier()
            console.log(this.addActiveEdit,this.showDivEdit,this.showOverlayEdit)
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
        }
        },
    }
</script>

<style  scoped>
.right_abs{
    right: -6vw !important;
}
.left_abs{
    left: -6vw !important;
}
.margin_top_8{
    margin-top: 2vw !important;
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
    color: #b1b1b1;

}

.icons .active{
    z-index: 3;
}
.icons .item .active {
    font-size: 2.0458333vw;
    padding: 0.364583333vw 0.46875vw;
    background: #0136EE 0% 0% no-repeat padding-box;
    border-radius: 50%;
    color: #fff;
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