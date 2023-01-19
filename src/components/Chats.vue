<template>
    <div class="chat">
        <dis class="date">
            Today
        </dis>
        <dis class="chats_persons">
            <div onclick="openChat(event, 'chat1')" class="chat_header online">
                <img class="image" src="/assets/images/avatar/person2.jpg" alt="">
                <div class="person_info">
                    <span class="name">Ahmed</span>
                    <span class="message">lorimmlipsumLoron random status.....</span>
                </div>
                <span class="time">09:08</span>
            </div>
            <div onclick="openChat(event, 'chat2')" class="chat_header">
                <img class="image" src="/assets/images/avatar/person4.jpg" alt="">
                <div class="person_info">
                    <span class="name">Ahmed</span>
                    <span class="message">lorimmlipsumLoron random status.....</span>
                </div>
                <span class="time">09:08</span>
            </div>
            <div onclick="openChat(event, 'chat3')" class="chat_header">
                <img class="image" src="/assets/images/avatar/person4.jpg" alt="">
                <div class="person_info">
                    <span class="name">Ahmed</span>
                    <span class="message">lorimmlipsumLoron random status.....</span>
                </div>
                <span class="time">09:08</span>
            </div>
        </dis>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
.chat {
    position: relative;
}
.chat .date {
    color: #6e6e6e;
    font-size: 1.4583333vw;
    font-weight: 400;
    position: absolute;
    top: -3.59375vw;
}
.chat .chats_persons .chat_header:first-child {
    border-top-left-radius: 1.82291667vw;
    border-top-right-radius: 1.82291667vw;
}
.chat .chats_persons .chat_header:last-child {
    border-bottom-left-radius: 1.82291667vw;
    border-bottom-right-radius: 1.82291667vw;
}

.chat .chats_persons .chat_header:not(:last-child) {
    border-bottom: 1px solid #707070;
}
.chat .chats_persons .chat_header {
    display: flex;
    flex-direction: row;
    /* width: 29.53125vw; */
    width: 100%;
    height: 6.71875vw;
    background: #F7F7F7 0% 0% no-repeat padding-box;
    /* border-radius: 35px; */
    align-items: center;
    justify-content: space-between;
    padding: 0 1.82291667vw;
    position: relative;
    cursor: pointer;
}

.chat .chats_persons .chat_header:hover{
    background: #0136EE 0% 0% no-repeat padding-box;
}
.chat .chats_persons .chat_header .image {
    width: 4.32291667vw;
    height: 4.32291667vw;
    border-radius: 50%;
    border: 1px solid #707070;
}
.chat .chats_persons .chat_header .person_info {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}
.chat .chats_persons .chat_header .person_info .name {
    color: #000000;
    font-size: 1.3020833vw;
}
.chat .chats_persons .chat_header:hover .person_info .name{
    color: #fff;
}
.chat .chats_persons .chat_header .person_info .message {
    color: #6e6e6e;
    font-size: 1.0416667vw;
}
.chat .chats_persons .chat_header:hover .person_info .message{
    color: #fff;
}
.chat .chats_persons .chat_header .time {
    color: #6e6e6e;
    font-size: 1.0416667vw;
    margin-top: -2.60416665vw;
}
.chat .chats_persons .chat_header:hover .time {
    color: #fff;
}
.online::after {
    content: '';
    position: absolute;
    bottom: 1.0416667vw;
    left: 4.6875vw;
    right: 0;
    width: 1.14583333vw;
    height: 1.14583333vw;
    border-radius: 50%;
    background: #1CA300 0% 0% no-repeat padding-box;
}
</style>