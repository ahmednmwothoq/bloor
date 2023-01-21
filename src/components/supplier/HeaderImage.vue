<template>
    <div class="cardProfile mx-3">
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
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }

/****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .cardProfile .up__img {
        width: 9vw;
        height: 10vw;
        margin-top: 1.6055vw;
        margin-left: 1.6055vw;
        margin-right: 1.6055vw;
    }
    .cardProfile .up__info {
        margin-top: 2.38718vw;
        display: flex;
        flex-direction: column;
        margin-left: 0.78166vw;
        margin-right: 0.78166vw;
    }

    .cardProfile .up__info .name {
        font-size: 4vw;
        font-weight: bold;
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .cardProfile .up__img {
        width: 8vw;
        height: 9vw;
        margin-top: 1.6055vw;
        margin-left: 1.6055vw;
        margin-right: 1.6055vw;
    }
    .cardProfile .up__info {
        margin-top: 3.5vw;
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-right: 0.1vw;
    }

    .cardProfile .up__info .name {
        font-size: 3vw;
        font-weight: bold;
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .cardProfile .up__img {
        width: 7vw;
        height: 8vw;
        margin-top: 1.6055vw;
        margin-left: 1.6055vw;
        margin-right: 1.6055vw;
    }
    .cardProfile .up__info {
        margin-top: 3.5vw;
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-right: 0.1vw;
    }

    .cardProfile .up__info .name {
        font-size: 2.6vw;
        font-weight: bold;
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .cardProfile .up__img {
        width: 6vw;
        height: 7vw;
        margin-top: 1.6055vw;
        margin-left: 1vw;
        margin-right: 1vw;
    }
    .cardProfile .up__info {
        margin-top: 3.5vw;
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-right: 0vw;
    }

    .cardProfile .up__info .name {
        font-size: 2.2vw;
        font-weight: bold;
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .cardProfile .up__img {
        width: 5vw;
        height: 6vw;
        margin-top: 1.6055vw;
        margin-left: 1vw;
        margin-right: 1vw;
    }
    .cardProfile .up__info {
        margin-top: 3.5vw;
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-right: 0vw;
    }

    .cardProfile .up__info .name {
        font-size: 1.8vw;
        font-weight: bold;
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
    .cardProfile .up__img {
        width: 4vw;
        height: 5vw;
        margin-top: 1.6055vw;
        margin-left: 1vw;
        margin-right: 1vw;
    }
    .cardProfile .up__info {
        margin-top: 2.5vw;
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-right: 0vw;
    }

    .cardProfile .up__info .name {
        font-size: 1.4vw;
        font-weight: bold;
        color: #6e6e6e;
        margin-bottom: 0.05211vw;
    }
}

</style>