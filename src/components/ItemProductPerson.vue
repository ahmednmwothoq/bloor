<template>
    <div class="item__slider">
        <a style="text-decoration: none;" @click="this.$router.push({ name: 'showReview', params: { id: item.product_to_review_id }})">

            <img :src="item.media[0].original_url" alt="" class="slider__img">
            
            <div v-for="product in allProducts" :key="product.id" @click="this.$router.push({ name: 'showReview', params: { id: item.product_to_review_id }})">
                <h2 class="slider__title" v-if="product.id == item.product_to_review_id">
                    {{ getLocales ? product.product_ar : product.product_en }}
                </h2>
            </div>
            <p class="slider__text">
                {{  item.review  }}
            </p>
        </a>
        <div class="slider__person">
            <div class="person__info">
                <img src="/assets/images/avatar/avatar-image.png" alt="" class="info_img">
                <div class="info_name">
                    <span class="name">{{ item.user.f_name }} {{ item.user.l_name }}</span>
                    <!-- <span class="job">news editor</span> -->
                </div>
            </div>
            <div class="person__rate">
                <!-- <i class="fa fa-star yellow" aria-hidden="true"></i> -->
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
                <span>{{ item.rate }}</span>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            },
            allProducts: {
                type: Array,
                required: true
            },
        },
        mounted() {
            // console.log("this.allProducts this.allProducts",this.allProducts)
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
            },

            
        },
    }
</script>

<style scoped>
/* .slider__img {
    width: 100%;
    height: 11.72486vw;
    border-top-left-radius: 50px;
}
.slider__title {
    margin-top: 0.93799vw;
    font-size: 1.71965vw;
    font-weight: normal;
    color: #6e6e6e;
}
.slider__text {
    margin: 1.302762vw 0;
    font-size: 0.88588vw;
    font-weight: lighter;
    color: #6e6e6e;
    width: 90%;
} */
</style>