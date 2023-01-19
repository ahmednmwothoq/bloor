<template>
     <div class="list">
        <div class="item" v-for="item in sideList" :key="item.id">
            <a @click="redirectToPath({ val: item.url })" :class="item.active == `active` ? `item_link active` : `item_link`">{{ $t(`${item.name}`) }}</a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:{
        sideList:{
            type:Array,
            required:true
        }
    }, 
    data () {
        return {}
    },
    methods:{
        ...mapActions(['redirectTo']),
        ...mapActions(['redirectToPath']),
    }
}
</script>

<style lang="scss" scoped>

</style>