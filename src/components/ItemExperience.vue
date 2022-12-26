<template>
    <div class="item__experience">
        <div class="experience__up">
            <div class="contan">
                <img class="up__img" src="/assets/images/avatar/user-img.jpg" alt="">
                <div class="up__info">
                    <span class="name">{{ item.user.f_name }} {{ item.user.l_name }}</span>
                    <span class="follow">{{ $t('follow') }}</span>
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
                <div class="icons">
                    <i class="fas fa-heart icon"></i>
                    <span>{{item.countLikes}}</span>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
import CreateAt from "@/components/CreateAt.vue"
    export default {
        data() {
            return {
                halfBody: '',
            }
        },
        components:{
            CreateAt,
        },
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
    }
</script>

<style lang="scss" scoped>

</style>