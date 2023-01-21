<template>
     <!-- <link rel="stylesheet" href="/assets/css/user/profile_chat.css"> -->

     <profile-nav-vue :sideList="sideList" />


    <main class="profile_chat_content">
        <div class="chats">
            <div class="chat">
                <dis class="date">
                    {{ $t('chats') }}
                </dis>
                <dis class="chats_persons">
                    <div
                        v-for="chatHeader in chats" :key="chatHeader.id"
                        :onclick="'openChat(event, `chats-'+ chatHeader.id +'`)'" class="chat_header"
                        @click="showChat(chatHeader.id)"
                    >
                        <img class="image" src="/assets/images/avatar/avatar-image.png" alt="">
                        <div class="person_info">
                            <span class="name">{{chatHeader.providername}}</span>
                            <span class="message">{{chatHeader.request_message}}</span>
                        </div>
                        <span class="time">
                            <span class="date">{{ CreateAtDate(chatHeader.created_at) }}</span>
                            <span>{{ CreateAtTime(chatHeader.created_at) }}</span>
                            
                        </span>
                    </div>
                    <!-- <div onclick="openChat(event, 'chat2')" class="chat_header online">
                        <img class="image" src="/assets/images/avatar/person4.jpg" alt="">
                        <div class="person_info">
                            <span class="name">Ahmed</span>
                            <span class="message">lorimmlipsumLoron random status.....</span>
                        </div>
                        <span class="time">09:08</span>
                    </div> -->
                    <!-- 
                        @click="showChat('chats-'+ chatHeader.id , chatHeader.id)"
                        :class="activeChat ? `chat_header online active` : `chat_header online`"
                        <div onclick="openChat(event, 'chat2')" class="chat_header">
                        <img class="image" src="/assets/images/avatar/person4.jpg" alt="">
                        <div class="person_info">
                            <span class="name">Ahmed</span>
                            <span class="message">lorimmlipsumLoron random status.....</span>
                        </div>
                        <span class="time">09:08</span>
                    </div> -->
                </dis>
            </div>
        </div>
        <div class="chat_details" v-if="chats">
            <div v-for="chatHeader in chats" :key="chatHeader.id">
                <div :id="'chats-' + chatHeader.id" class="chat_person">
                    <div class="messages">
                        <div v-if="events.length == 0">
                            <div
                                v-for="item in chatList" :key="item.id" 
                                :class="item.sender_id == userLogin.id ? `message_item sender` : `message_item receiver`"
                                >
                                <div class="d-flex" v-if="item.sender_id == userLogin.id">
                                    <div class="message">
                                        <p class="msg">{{item.message}}</p>
                                    </div>
                                    <div class="person">
                                        <span class="time">{{item.sendername}}</span>
                                        <img class="image" src="/assets/images/avatar/avatar-image.png" alt="">
                                        <span class="time">
                                            <span>{{ CreateAtDate(item.created_at) }}</span><br>
                                            <span>{{ CreateAtTime(item.created_at) }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex" v-else>
                                    <div class="person">
                                        <span class="time">{{item.recievername}}</span>
                                        <img class="image" src="/assets/images/avatar/avatar-image.png" alt="">
                                        <span class="time">
                                            <span>{{ CreateAtDate(item.created_at) }}</span><br>
                                            <span>{{ CreateAtTime(item.created_at) }}</span>
                                        </span>
                                    </div>
                                    <div class="message">
                                        <p class="msg">{{item.message}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="events.length > 0" v-for="item in events" :key="item.id" >
                            <div
                                
                                :class="item.sender_id == userLogin.id ? `message_item sender` : `message_item receiver`"
                                v-if="item.main_chat_id === chatHeader.id"
                                >
                                <div class="d-flex" v-if="item.sender_id == userLogin.id">
                                    <div class="message">
                                        <p class="msg">{{item.message}}</p>
                                    </div>
                                    <div class="person">
                                        <span class="time">{{item.sendername}}</span>
                                        <img class="image" src="/assets/images/avatar/avatar-image.png" alt="">
                                        <span class="time">
                                            <span>{{ CreateAtDate(item.created_at) }}</span><br>
                                            <span>{{ CreateAtTime(item.created_at) }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex" v-else>
                                    <div class="person">
                                        <span class="time">{{item.recievername}}</span>
                                        <img class="image" src="/assets/images/avatar/avatar-image.png" alt="">
                                        <span class="time">
                                            <span>{{ CreateAtDate(item.created_at) }}</span><br>
                                            <span>{{ CreateAtTime(item.created_at) }}</span>
                                        </span>
                                    </div>
                                    <div class="message">
                                        <p class="msg">{{item.message}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="message_item sender">
                            <div class="message">
                                <p class="msg seen">lorimmlipsumLoron random stat0uslorimmlir andom statustus</p>
                            </div>
                            <div class="person">
                                <img class="image" src="/assets/images/avatar/person1.jpg" alt="">
                                <span class="time">09:08</span>
                            </div>
                        </div>
                        <div class="message_item receiver">
                            <div class="person">
                                <img class="image" src="/assets/images/avatar/person2.jpg" alt="">
                                <span class="time">09:08</span>
                            </div>
                            <div class="message">
                                <p class="msg">lorimmlipsumLoron random stat0uslori ?</p>
                                <p class="msg">lorimmlipsumLoron random stat0uslorimmli psumLoron random stalorimmlipsumLoron r andom statustus</p>
                            </div>
                        </div>
                        <div class="message_item sender">
                            <div class="message">
                                <p class="msg">lorimmlipsumLoron random stat0uslorimmlir andom statustus</p>
                            </div>
                            <div class="person">
                                <img class="image" src="/assets/images/avatar/person1.jpg" alt="">
                                <span class="time">09:08</span>
                            </div>
                        </div> -->
                    </div>
                    <div action="" class="send_form_msg">
                        <div class="input_form">
                            <input class="input" v-on:keyup.enter="sendMsgToUser(chatHeader.id)" type="text" v-model="msgSender" :placeholder="$t('enter_your_message')">
                            <!-- <span class="icons">
                                <i class="fal fa-smile"></i>
                            </span>
                            <span class="file">
                                <i class="far fa-paperclip"></i>
                            </span> -->
                        </div>
                        <span class="btn_submit_chat" @click="sendMsgToUser(chatHeader.id)">
                            <img class="icon" src="/assets/images/icon/sent.png" alt="sent">
                        </span>
                    </div>
                    <!-- <span onclick="openRate('supplier1')" class="rate_review">Rate and review ?</span> -->
                </div>
            
                <div id="supplier1" class="rate_a_review">
                    <span class="close">X</span>
                    <h1 class="title">Rate and review</h1>
                    <form action="" class="the_form">
                        <span class="label_form">How Would You Rate This Supplier*</span>
                        <div class="rating">
                            <label>
                            <input type="radio" name="stars" value="1" />
                            <span class="icon">★</span>
                            </label>
                            <label>
                            <input type="radio" name="stars" value="2" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            </label>
                            <label>
                            <input type="radio" name="stars" value="3" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>   
                            </label>
                            <label>
                            <input type="radio" name="stars" value="4" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            </label>
                            <label>
                            <input type="radio" name="stars" value="5" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            </label>
                        </div>
                        <span class="label_form">Leave A Comment</span>
                        <textarea class="comment" name="" id="" cols="30" rows="10"></textarea>
                        <span class="send_review">Done</span>
                    </form>
                </div>
            </div>
            <!-- <div id="chat2" class="chat_person">
                <div class="messages">
                    <div class="message_item receiver">
                        <div class="person">
                            <img class="image" src="/assets/images/avatar/person4.jpg" alt="">
                            <span class="time">09:08</span>
                        </div>
                        <div class="message">
                            <p class="msg">lorimmlipsumLoron random stat0uslori ?</p>
                            <p class="msg">lorimmlipsumLoron random stat0uslorimmli psumLoron random stalorimmlipsumLoron r andom statustus</p>
                        </div>
                    </div>
                    <div class="message_item sender">
                        <div class="message">
                            <p class="msg seen">lorimmlipsumLoron random stat0uslorimmlir andom statustus</p>
                        </div>
                        <div class="person">
                            <img class="image" src="/assets/images/avatar/person1.jpg" alt="">
                            <span class="time">09:08</span>
                        </div>
                    </div>
                    <div class="message_item receiver">
                        <div class="person">
                            <img class="image" src="/assets/images/avatar/person4.jpg" alt="">
                            <span class="time">09:08</span>
                        </div>
                        <div class="message">
                            <p class="msg">lorimmlipsumLoron random stat0uslori ?</p>
                            <p class="msg">lorimmlipsumLoron random stat0uslorimmli psumLoron random stalorimmlipsumLoron r andom statustus</p>
                        </div>
                    </div>
                    <div class="message_item sender">
                        <div class="message">
                            <p class="msg">lorimmlipsumLoron random stat0uslorimmlir andom statustus</p>
                        </div>
                        <div class="person">
                            <img class="image" src="/assets/images/avatar/person1.jpg" alt="">
                            <span class="time">09:08</span>
                        </div>
                    </div>
                </div>
                <form action="" class="send_form_msg">
                    <div class="input_form">
                        <input class="input" type="text" name="ahmed" id="" placeholder="Type your message">
                        <span class="icons">
                            <i class="fal fa-smile"></i>
                        </span>
                        <span class="file">
                            <i class="far fa-paperclip"></i>
                        </span>
                    </div>
                    <span class="btn_submit_chat" onclick="$(this).closest('form').submit();">
                        <img class="icon" src="/assets/images/icon/sent.png" alt="sent">
                    </span>
                    
                </form>
                <span onclick="openRate('supplier2')" class="rate_review">Rate and review ?</span>
            </div>

            <div id="supplier2" class="rate_a_review">
                <span class="close">X</span>
                <h1 class="title">Rate and review</h1>
                <form action="" class="the_form">
                    <span class="label_form">How Would You Rate This Supplier*</span>
                    <div class="rating">
                        <label>
                          <input type="radio" name="stars" value="1" />
                          <span class="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="2" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="3" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>   
                        </label>
                        <label>
                          <input type="radio" name="stars" value="4" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                        </label>
                        <label>
                          <input type="radio" name="stars" value="5" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                        </label>
                    </div>
                    <span class="label_form">Leave A Comment</span>
                    <textarea class="comment" name="" id="" cols="30" rows="10"></textarea>
                    <span class="send_review">Done</span>
                </form>
            </div> -->
        </div>
    </main>

    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import ProfileNavVue from '@/components/profileNav.vue'
import FooterVue from '@/components/Footer.vue';
    export default {
        name: "ProfileChat",
        components:{
            ProfileNavVue,
            FooterVue
        },
        data() {
            return {
                sideList: [
                    {
                        id:1,
                        name: "details",
                        active: '',
                        url:'/user-profile'
                    },
                    {
                        id:2,
                        name: "reviews",
                        active: '',
                        url:'/user-review'
                    },
                    {
                        id:3,
                        name: "chats",
                        active: 'active',
                        url:'/user-chat'
                    },
                    {
                        id:4,
                        name: "experiments",
                        active: '',
                        url:'/user-experiment'
                    }
                    
                ],
                chats:[],
                activeChat:false,
                chatList:[],
                userLogin: JSON.parse(cookie.get('userData')),
                msgSender:'',
                events: []
                
            }
        },
        mounted() {
            this.getDataUserChat()
            // console.log(cookie.get("userData"));
            // console.log(this.profile);
            // console.log('subscribing to `my-channel`...', {
            //     $pusher: this.$pusher,
            // })
            const channel = this.$pusher.subscribe('my-channel');

            // channel.bind('pusher:subscription_succeeded', () => console.log('subscription succeeded'))

            channel.bind('chat', event => {
                // console.log('chat', event)
                this.events.push(event.message)
                // console.log('events', this.events)
            })

        },
        computed: {
        },
        methods: {
            async getDataUserChat(){
                await Api.user.userAllChats().then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        // this.addUser()
                        // this.$store.dispatch("user/addUser", res.data.userData)
                        // console.log("user",this.$store.getters["user/getUser"])
                        this.chats = res.data.body;

                        // console.log(this.CreateAtDate(this.chats[0].created_at))
                        // console.log(this.CreateAtTime(this.chats[0].created_at))
                    }
                })
            },
            async showChat(id){
                // $("#"+txtDivID).toggle(400);
                // this.activeChat = !this.activeChat
                await Api.user.userAllChatMessages(id).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        this.chatList = res.data.body;
                        // this.CreateAtDate(this.profile.date_of_birth)
                        this.chatList.sort((a,b) => {
                            // return a.id > b.id? 1 : -1;
                            return a.id - b.id ;
                        });
                        // this.chatList.forEach(fields => {
                        //     return this.events.push(fields)
                        // });
                        // this.events = this.chatList

                        // console.log('chats', this.events)
                    }
                })
            },
            async sendMsgToUser(id){
                const data = new FormData();
                data.append('message', this.msgSender);
                data.append('type', 'user');

                await Api.user.userSendMessageInChat(id,data).then((res)=>{
                    if(res.data.status){
                        // console.log(res.data)
                        // this.showChat(id)
                        this.msgSender = ''
                    }
                })
            },
            CreateAtDate(create_at){
                const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const date = create_at.split('.')[0].split('T')[0]

                const today = new Date()
                const d = new Date(`${date}`);
                const month = months[d.getMonth()];
                const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
                if (today.getDate() === d.getDate()) {
                    return (this.$i18n.locale === 'en' ? 'Today' : 'اليوم')
                }else{
                    return last
                }
                
            },
            CreateAtTime(create_at){

                const time = create_at.split('.')[0].split('T')[1]

                const timeHour = time.slice(0, 2);
                const timeMin = time.slice(3, 5);
                const timeMinSec = time.slice(2);
                // console.log(timeHour, timeMinSec,"...",timeMin)
                // const last = "";
                if(timeHour > 12){
                const last = `${timeHour - 12}:${timeMin} PM`
                return last
                }else{
                const last = `${timeHour}:${timeMin} AM`
                return last
                }
            },
            
        }
    }
</script>

<style  scoped>

</style>