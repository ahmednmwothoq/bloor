<template>

<div class="overlayy" v-if="divOverlay" @click="hideAll"></div>
  <footer class="__footer" v-if="isUser">

    <div class="downlist__footer" v-if="divSearch">
          <span class="close" @click="hideAll">X</span>
          <span class="tringle"></span>
          <div class="lists">
              <a @click="this.$router.push('/search/offers')" class="item__list">
                  <span class="circle"></span>
                  <span class="list_text">{{ $t('offers') }}</span>
              </a>
              <a @click="this.$router.push('/search/experiences')" class="item__list">
                  <span class="circle"></span>
                  <span class="list_text">{{ $t('experiments') }}</span>
              </a>
              <a @click="this.$router.push('/search/products')" class="item__list">
                  <span class="circle"></span>
                  <span class="list_text">{{ $t('products') }}</span>
              </a>
          </div>
          <a class="done" @click="hideAll">{{ $t('done') }}</a>
      </div>


        <div class="footer__nav">
            <div class="footer_item">
                <a @click="this.$router.push('/user-profile')" class="footer_btn">
                    <i class="fas fa-tag footer_icon"></i>
                </a>
            </div>
            <div class="footer_item">
                <a @click="this.$router.push('/user-chat')" class="footer_btn">
                    <i class="fas fa-comment-alt footer_icon"></i>
                </a>
            </div>
            <div class="footer_item">
                <a @click="this.$router.push('/')" class="footer_btn">
                    <img class="logo" src="/assets/images/logo/logo_user.png" alt="logo">
                </a>
            </div>
            <div class="footer_item">
                <a @click="this.$router.push('/user-profile')" class="footer_btn">
                    <i class="fas fa-bell footer_icon"></i>
                </a>
            </div>
            <div class="footer_item">
                <a class="footer_btn" @click="showAndHideList">
                    <i class="fas fa-search footer_icon"></i>
                </a>
            </div>
        </div>
    </footer>

</template>

<script>
import cookie from "vue-cookie";
export default {
    name: "Footer",
    data() {
        return {
          divOverlay: false,
          divSearch: false,
        };
    },
    computed: {
      isUser() {
        if (JSON.parse(cookie.get("logged_In")) == true) {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      showAndHideList(){
        this.divOverlay = !this.divOverlay;
        this.divSearch = !this.divSearch;
      },
      hideAll(){
        this.divOverlay = false;
        this.divSearch = false;
      }
    },

}

</script>
<style scoped>
/* Footer */

.overlayy{
    position: absolute;
    top:3vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 190vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 1vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 1vw;
    bottom: 9vw;
    padding: 3vw 2vw;
    width: 32vw;
    height: 32vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    left: -2.2vw;
    right: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -2vw;
    right: -2.2vw;
    padding: 0.1vw 1.3vw;
    font-size: 3vw;
    font-weight: bold;
    color: #0136EE;
    border-radius: 50%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    cursor: pointer;
  }
  [dir="rtl"] .downlist__footer .tringle{
    left: 2vw;
    right:auto
  }
  .downlist__footer .tringle{
    position: absolute;
    bottom: -2.2vw;
    right: 2vw;
    width: 0;
    height: 0;
    border-left: 3vw solid transparent;
    border-right: 3vw solid transparent;
    border-bottom: 2.9vw solid #0136EE;
    transform: rotate(180deg);
  }
  [dir="rtl"] .downlist__footer .lists{
    
  }
  .downlist__footer .lists{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 20vw;
    width: 100%;
  }
  .downlist__footer .lists .item__list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    margin-bottom: 3vw;
  }

  .downlist__footer .lists .item__list:hover .circle{
    background: #fff;
    border:0;
    transition: all 0.2s ease-in-out;
  }
  .downlist__footer .lists .item__list:hover .list_text{
    color: #fff;
    transition: all 0.2s ease-in-out;
  }


  .downlist__footer .lists .item__list .circle{
    border: 2px solid #fff;
    opacity: 1;
    margin: 0 2vw;
    width: 2vw;
    height:  2vw;
    border-radius: 50%;
  }
  .downlist__footer .lists .item__list .list_text{
    font-size: 2.2vw;
    color: #fff;
    margin-top: -5px;
  }

  [dir="rtl"] .downlist__footer .done{
    left: 7vw;
    right: auto;
  }
  .downlist__footer .done{
    position: absolute;
    right: 7vw;
    color: #FFFFFF;
    font-size: 30px;
    cursor: pointer;
  }
.__footer{
    width: 85%;
    margin: auto;
    margin-bottom: 1.9270833vw;
    margin-top: 2vw;
    position: fixed;
    z-index: 5;
    bottom: 3vw;
    left: 0;
    right: 0;
  }
  
  .footer__nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    height: 5.2083vw;
    padding: 0.78125vw 3.125vw;
    background: #F3F3F3 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #E9E9E9;
    border-radius: 30px;
    margin: auto;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 1.822vw;
    opacity: 0.5;
  }
  .footer_item  .footer_btn .footer_icon:hover{
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
  }
  
  .footer_item .logo{
    width: 7.03125vw;
    margin-top: -1.5625vw;
    padding: 1.0416vw;
    border-radius: 50%;
    background: #f3f3f3;
  }

  /****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .__footer{
    width: 90%;
    margin: auto;
    margin-bottom: 4vw;
    margin-top: 2vw;
  }
  
  .footer__nav{
    width: 100%;
    height: 10vw;
    padding: 1vw 5vw;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 4vw;
  }
  
  .footer_item .logo{
    width: 14vw;
    margin-top: -6vw;
    padding: 1.5vw;
  }
  .overlayy{
    position: absolute;
    top:7vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 570vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 1vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 1vw;
    bottom: 16vw;
    padding: 3vw 2vw;
    width: 52vw;
    height: 40vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    left: -4vw;
    right: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -6vw;
    right: -4vw;
    padding: 0.2vw 2.8vw;
    font-size: 6vw;
    font-weight: bold;
    color: #0136EE;
    border-radius: 50%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    cursor: pointer;
  }
  [dir="rtl"] .downlist__footer .tringle{
    left: 1vw;
    right:auto
  }
  .downlist__footer .tringle{
    position: absolute;
    bottom: -5.2vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 7vw solid transparent;
    border-right: 7vw solid transparent;
    border-bottom: 6.9vw solid #0136EE;
    transform: rotate(180deg);
  }
  [dir="rtl"] .downlist__footer .lists{
    
  }
  .downlist__footer .lists{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 20vw;
    width: 100%;
  }
  .downlist__footer .lists .item__list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    margin-bottom: 3vw;
  }

  .downlist__footer .lists .item__list:hover .circle{
    background: #fff;
    border:0;
    transition: all 0.2s ease-in-out;
  }
  .downlist__footer .lists .item__list:hover .list_text{
    color: #fff;
    transition: all 0.2s ease-in-out;
  }


  .downlist__footer .lists .item__list .circle{
    border: 2px solid #fff;
    opacity: 1;
    margin: 0 2vw;
    width: 3vw;
    height:  3vw;
    border-radius: 50%;
  }
  .downlist__footer .lists .item__list .list_text{
    font-size: 4.5vw;
    color: #fff;
    margin-top: -5px;
  }

  [dir="rtl"] .downlist__footer .done{
    left: 7vw;
    right: auto;
  }
  .downlist__footer .done{
    position: absolute;
    right: 7vw;
    color: #FFFFFF;
    font-size: 4.5vw;
    cursor: pointer;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .__footer{
    width: 90%;
    margin: auto;
    margin-bottom: 4vw;
    margin-top: 2vw;
  }
  
  .footer__nav{
    width: 100%;
    height: 9vw;
    padding: 1vw 5vw;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 3.5vw;
  }
  
  .footer_item .logo{
    width: 12vw;
    margin-top: -6vw;
    padding: 1.5vw;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .__footer{
    width: 90%;
    margin: auto;
    margin-bottom: 4vw;
    margin-top: 2vw;
  }
  
  .footer__nav{
    width: 100%;
    height: 7vw;
    padding: 1vw 5vw;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 3vw;
  }
  
  .footer_item .logo{
    width: 11vw;
    margin-top: -5vw;
    padding: 1.5vw;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .__footer{
    width: 85%;
    margin: auto;
    margin-bottom: 4vw;
    margin-top: 2vw;
  }
  
  .footer__nav{
    width: 100%;
    height: 5vw;
    padding: 1vw 5vw;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 2vw;
  }
  
  .footer_item .logo{
    width: 8vw;
    margin-top: -4vw;
    padding: 1vw;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .__footer{
    width: 80%;
    margin: auto;
    margin-bottom: 4vw;
    margin-top: 2vw;
  }
  
  .footer__nav{
    width: 100%;
    height: 4.5vw;
    padding: 1vw 5vw;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 1.6vw;
  }
  
  .footer_item .logo{
    width: 7vw;
    margin-top: -3vw;
    padding: 1vw;
  }
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
  .__footer{
    width: 70%;
    margin: auto;
    margin-bottom: 1vw;
    margin-top: 2vw;
  }
  
  .footer__nav{
    width: 100%;
    height: 4vw;
    padding: 1vw 5vw;
  }
  
  .footer_item .footer_btn{
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }
  
  .footer_item  .footer_btn .footer_icon{
    font-size: 1.4vw;
  }
  
  .footer_item .logo{
    width: 5.5vw;
    margin-top: -2vw;
    padding: 0.7vw;
  }
}
</style>