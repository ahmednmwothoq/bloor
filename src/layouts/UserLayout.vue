
<template>
    <!-- <link 
        v-if="this.$i18n.locale === 'ar'"
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.rtl.min.css" 
        integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N" 
        crossorigin="anonymous"
    >
    <link 
        v-if="this.$i18n.locale === 'en'"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" 
        crossorigin="anonymous"
    > -->

    <div :dir="this.$i18n.locale === 'ar' ? 'rtl' : ''">
        <router-view></router-view>
    </div>
    
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
export default {
    mounted() {
        // this.getData()
        
        this.$store.dispatch("user/addUser", JSON.parse(cookie.get('userData')))
        console.log(cookie.get('lang'))
        console.log(cookie.get('token'))
        console.log(JSON.parse(cookie.get('userData')))

        if(cookie.get('lang') == null){
            this.$store.dispatch("user/switchLang", 'ar')
            this.$i18n.locale = 'ar';
        }else{
            // this.$store.dispatch("user/switchLang", cookie.get('lang'))
            // this.$i18n.locale = cookie.get('lang');
            this.$store.dispatch("user/switchLang", cookie.get('lang'))
            this.$i18n.locale = cookie.get('lang');
        }

    },
    methods: {
        // async getData(){
        //     await Api.user.getUser().then((res)=>{
        //         if(res.data.status){
        //             // console.log("user",JSON.stringify(res.data.userData))
        //             // this.addUser()
        //             this.$store.dispatch("user/addUser", res.data.userData)
        //             // console.log("user",this.$store.getters["user/getUser"])
        //         }
        //     })
        // }
    },
}
</script>


