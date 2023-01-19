<template>
    <div class="cardProfile">
        <img class="up__img" src="/assets/images/avatar/avatar-image.png" alt="">
        <div class="up__info">
            <span class="name" v-if="supplierLogin">{{supplierLogin.f_name}} {{supplierLogin.l_name}}</span>
        </div>
    </div>
</template>

<script>
import cookie from "vue-cookie";
    export default {
        data() {
            return {
                supplierLogin: JSON.parse(cookie.get('SupplierData')),
            }
        },
        mounted() {
            // console.log(this.supplierLogin)
        },
    }
</script>

<style  scoped>
    .cardProfile{
        display: flex;
    }
    .cardProfile .up__img {
    width: 4.2875vw;
    height: 4.2875vw;
    border-radius: 50%;
    margin-top: 1.6055vw;
    margin-left: 1.6055vw;
}
.cardProfile .up__info {
    margin-top: 2.38718vw;
    display: flex;
    flex-direction: column;
    margin-left: 0.78166vw;
}

.cardProfile .up__info .name {
    font-size: 1.52291667vw;
    font-weight: bold;
    color: #b1b1b1;
    margin-bottom: 0.05211vw;
}

</style>