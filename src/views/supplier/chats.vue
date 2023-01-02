<template>

    <Header />

    <div class="content_slide">
        <div class="slidebar">
           <list-supplier :sideList="sideList" />
        </div>
        <div class="all">
           <div class="all__up">
            <header-image />
            <header-icons />
           </div>
           <div class="all__down">
                <!-- <div class="section"></div> -->
                <main class="profile_chat_content">
        <div class="chats">
            <div class="chat">
                <dis class="date">
                    Chats
                </dis>
                <dis class="chats_persons">
                    <div
                        v-for="chatHeader in chats" :key="chatHeader.id"
                        :onclick="'openChat(event, `chats-'+ chatHeader.id +'`)'" class="chat_header online"
                        @click="showChat(chatHeader.id)"
                    >
                        <img class="image" src="/assets/images/avatar/user-img.jpg" alt="">
                        <div class="person_info">
                            <span class="name">{{chatHeader.username}}</span>
                            <span class="message">{{chatHeader.request_message}}</span>
                        </div>
                        <span class="time">09:08</span>
                    </div>

                </dis>
            </div>
        </div>
        <div class="chat_details">
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
                                        <img class="image" src="/assets/images/avatar/user-img.jpg" alt="">
                                        <span class="time">09:08</span>
                                    </div>
                                </div>
                                <div class="d-flex" v-else>
                                    <div class="person">
                                        <span class="time">{{item.recievername}}</span>
                                        <img class="image" src="/assets/images/avatar/user-img.jpg" alt="">
                                        <span class="time">09:08</span>
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
                                        <img class="image" src="/assets/images/avatar/user-img.jpg" alt="">
                                        <span class="time">09:08</span>
                                    </div>
                                </div>
                                <div class="d-flex" v-else>
                                    <div class="person">
                                        <span class="time">{{item.recievername}}</span>
                                        <img class="image" src="/assets/images/avatar/user-img.jpg" alt="">
                                        <span class="time">09:08</span>
                                    </div>
                                    <div class="message">
                                        <p class="msg">{{item.message}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form action="" class="send_form_msg">
                        <div class="input_form">
                            <input class="input" type="text" v-model="msgSender" placeholder="Type your message">
                            <span class="icons">
                                <i class="fal fa-smile"></i>
                            </span>
                            <span class="file">
                                <i class="far fa-paperclip"></i>
                            </span>
                        </div>
                        <span class="btn_submit_chat"  @click="sendMsgToUser(chatHeader.id)">
                            <img class="icon" src="/assets/images/icon/sent.png" alt="sent">
                        </span>
                    </form>
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
           </div>
        </div>
    </div>

</template>

<script>
    import Api from "@/api"
    import cookie from "vue-cookie";
    import Header from "@/components/Header.vue"
    import ListSupplier from "@/components/supplier/ListSupplier.vue"
    import HeaderImage from "@/components/supplier/HeaderImage.vue"
    import HeaderIcons from "@/components/supplier/HeaderIcons.vue"
    export default {
        components: {
            Header,
            ListSupplier,
            HeaderImage,
            HeaderIcons,
            // ErrorList
        },
        data() {
            return {
                showDivAddProduct: false,
                showOverlay: false,
                sideList: [
                    {
                        id:1,
                        name: "Overview",
                        active: '',
                        url:'/supplier'
                    },
                    {
                        id:2,
                        name: "Products",
                        active: '',
                        url:'/supplier/products'
                    },
                    {
                        id:3,
                        name: "Offers",
                        active: '',
                        url:'/supplier/offers'
                    },
                    {
                        id:4,
                        name: "Chats",
                        active: 'active',
                        url:'/supplier/chats'
                    },
                    // {
                    //     id:5,
                    //     name: "Notifications",
                    //     active: '',
                    //     url:'/supplier/notifications'
                    // },
                    {
                        id:6,
                        name: "Complaints",
                        active: '',
                        url:'/supplier/complaints'
                    },
                    {
                        id:7,
                        name: "FAQs",
                        active: '',
                        url:'/supplier/faqs'
                    },
                    // {
                    //     id:8,
                    //     name: "Privacy Policy",
                    //     active: '',
                    //     url:'/supplier/privacy-policy'
                    // },
                    // {
                    //     id:9,
                    //     name: "Terms & Conditions",
                    //     active: '',
                    //     url:'/supplier/terms-conditions'
                    // },
                    {
                        id:10,
                        name: "About us",
                        active: '',
                        url:'/supplier/about-us'
                    },
                    {
                        id:11,
                        name: "Contact us",
                        active: '',
                        url:'/supplier/contact-us'
                    },
                    
                ],
                chats:[],
                activeChat:false,
                chatList:[],
                msgSender:'',
                events: [],
                userLogin: JSON.parse(cookie.get('SupplierData'))
            }
        },
        mounted() {
            this.getDataUserChat()

            const channel = this.$pusher.subscribe('my-channel');

            // channel.bind('pusher:subscription_succeeded', () => console.log('subscription succeeded'))

            channel.bind('chat', event => {
                console.log('chat', event)
                this.events.push(event.message)
                console.log('events', this.events)
            })
        },
        methods: {
            async getDataUserChat(){
                await Api.supplier.supplierAllChats().then((res)=>{
                    if(res.data.status){
                        // console.log("chats",res.data)
                        this.chats = res.data.body;
                    }
                })
            },
            async showChat(id){
                await Api.supplier.userAllChatMessages(id).then((res)=>{
                    if(res.data.status){
                        console.log(res.data)
                        this.chatList = res.data.body;

                        this.chatList.sort((a,b) => {
                            // return a.id > b.id? 1 : -1;
                            return a.id - b.id ;
                        });
                    }
                })
            },
            async sendMsgToUser(id){
                const data = new FormData();
                data.append('message', this.msgSender);
                data.append('type', 'provider');

                await Api.supplier.userSendMessageInChat(id,data).then((res)=>{
                    if(res.data.status){
                        console.log(res.data)
                        // this.showChat(id)
                        this.msgSender = ''
                    }
                })
            }
            
        }
    }
</script>

<style scoped>
.all{
    display: flex;
    flex-direction: column;
}
.content_slide .slidebar{
    flex: 11%!important;
}
.content_slide .slidebar .list .item .item_link{
    font-size: 1.2vw;
}
.all .all__down {
  /* width: 87%; */
  margin: 0;
}
.profile_chat_content .chat_details {
  width: 59%!important;
}
.profile_chat_content .chats {
  width: 45%!important;
}
/* .all .all__up{
    display: flex;
    justify-content: flex-end;
    width: 95%;
    margin: 0 auto;
}
.all .all__down{
    width: 94%;
    margin: 0 auto;
}
.all .all__down .title{
    letter-spacing: 0px;
    color: #B1B1B1;
    font-size: 2.4vw;
}
.section{
    width: 75vw;
    margin-top: 50px;
} */
</style>