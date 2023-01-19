<template>
    <div class="item_review">
        <div class="review__up">
            <div class="contan">
                <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
                <div class="up__info">
                    <span class="name">Supplier Name #{{ item.user_id }}</span>
                    <!-- <span class="follow">Follow</span> -->
                </div>
            </div>
            <div class="up__time">
                <span>
                    <CreateAt :create="item.created_at" />
                </span>
            </div>
        </div>
        <div class="review_mid">
            <div class="mid__left">
                <span class="car">{{ getLocales ? item.product_ar : item.product_en }}</span>
                <a :href="item.link" class="edit">{{ item.link }}</a>
            </div>
            <div class="mid__rigth">
                <img :src="item.media[0].original_url" alt="" class="image">
            </div>
        </div>
        <!-- {{ getLocales ? item.questionnaire_ar : item.questionnaire_en }} -->
            <!-- <div class="down__comment">
                <div class="comment_up">
                    <div class="left">
                        <span class="dot"></span>
                        <span class="text">Year Of Purchase</span>
                    </div>
                    <div class="right">
                        <i class="fas fa-star icon" aria-hidden="true"></i>
                        <i class="fas fa-star icon" aria-hidden="true"></i>
                        <i class="fas fa-star icon" aria-hidden="true"></i>
                        <i class="fal fa-star icon" aria-hidden="true"></i>
                        <i class="fal fa-star icon" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="comment_mid">
                    <p class="text">Lorem ipsum dolorsicexplicabo cupiditate sit nihil quisquam voluptas, elige</p>
                </div>
                <div class="comment_down">
                    <a  class="read">Read Answer</a>
                </div>
            </div> -->
            
        <div class="review__down" v-if="getLocales" v-html="item.questionnaire_ar"></div>
        <div class="review__down" v-if="!getLocales" v-html="item.questionnaire_en"></div>
    </div>
</template>

<script>
// import { VueEditor } from "vue2-editor/nuxt/index";
import CreateAt from "@/components/CreateAt.vue"
    export default {
        props:{
            item:{
                type:Object,
                required: true
            } 
        },
        components:{
            CreateAt,
            // VueEditor,
        },
        mounted() {
            // console.log('saaaaaa',this.item)
        },
        computed: {
            getLocales () {
                let local = this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
                // console.log("text",local)
                if(local[0] == 'en'){
                return true
                } else {
                return false
                }
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>