<template>
    <div class="item__supplier" @click="this.$router.push({ path: `/supplier/offers/${item.id}`, query: { name: `${ item.f_name} ${item.l_name}` }})">
        <img class="supplier__img" src="/assets/images/avatar/avatar-image.png" alt="">
        <div class="supplier__info">
            <span class="name">{{ item.f_name }} {{ item.l_name }}</span>
            <span class="follow">{{ $t('follow') }}</span>
            <div v-if="userLogin">
                <!-- <span 
                    v-if="userLogin.id != item.id"
                    class="follow cursor_pointer" 
                    @click="makeUserFollowUser(item.id)"
                >{{ $t('follow') }}</span> -->
            </div>
        </div>
    </div>
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import { useToast } from 'vue-toastification'
    export default {
        data(){
            return {
                userLogin: JSON.parse(cookie.get('userData')) ? JSON.parse(cookie.get('userData')) : '',
            }
        },
        props:{
            item:{
                type:Object,
                required:true
            }
        },
        methods:{
            async makeUserFollowUser(id){
                // console.log(id)
                const toast = useToast()
                await Api.user.userFollowAnotherUser(id).then((res)=>{
                    if(res.data.status){
                        // this.$router.go()
                        // console.log(res.data)
                        toast.success(`Follow ${res.data.msg}`,{
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
                });
            }   
        }
    }
</script>

<style lang="scss" scoped>

</style>