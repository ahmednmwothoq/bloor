<template>
    <div class="logo__content">
        <img @click="this.$router.push('/')" class="logo" src="/assets/images/logo/logo_user.png" alt="">
        <img @click="showAndHideList" class="icon__search" src="/assets/images/icon/search.png" alt="">
    </div>

        <div class="overlay_footer" v-if="divOverlay" @click="hideAll"></div>
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
</template>

<script>
    export default {
        data() {
            return {
                divOverlay: false,
                divSearch: false,
            }
        },
        methods: {
            hideAll(){
                this.divOverlay = false;
                this.divSearch = false;
            },
            showAndHideList(){
                this.divOverlay = !this.divOverlay;
                this.divSearch = !this.divSearch;
            },
        }
    }
</script>

<style  scoped>
.logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 3.64583vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 2.08vw;
  }


  .overlay_footer{
    position: absolute;
    top:0vw;
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
    top: 9vw;
    padding: 3vw 2vw;
    width: 32vw;
    height: 32vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -2.2vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -2vw;
    left: -2.2vw;
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
    top: -2.2vw;
    right: 2vw;
    width: 0;
    height: 0;
    border-left: 3vw solid transparent;
    border-right: 3vw solid transparent;
    border-bottom: 2.9vw solid #0136EE;
    transform: rotate(360deg);
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

  /****************************** Responsive ******************************/
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

    .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 8vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 4vw;
  }
    .overlay_footer{
    position: absolute;
    top:0vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 370vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 2vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 2vw;
    top: 19vw;
    padding: 3vw 2vw;
    width: 52vw;
    height: 40vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -4vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -6vw;
    left: -4vw;
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
    top: -5.2vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 7vw solid transparent;
    border-right: 7vw solid transparent;
    border-bottom: 6.9vw solid #0136EE;
    transform: rotate(360deg);
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
    font-size: 6vw;
    cursor: pointer;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 8vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 4vw;
  }
    .overlay_footer{
    position: absolute;
    top:0vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 370vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 2vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 2vw;
    top: 19vw;
    padding: 3vw 2vw;
    width: 52vw;
    height: 35vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -4vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -6vw;
    left: -4vw;
    padding: 0.2vw 2.5vw;
    font-size: 5vw;
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
    top: -4.2vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 5vw solid transparent;
    border-right: 5vw solid transparent;
    border-bottom: 4.9vw solid #0136EE;
    transform: rotate(360deg);
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
    font-size: 4vw;
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
    font-size: 5vw;
    cursor: pointer;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 6vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 3vw;
  }
    .overlay_footer{
    position: absolute;
    top:0vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 370vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 2vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 2vw;
    top: 15vw;
    padding: 3vw 2vw;
    width: 45vw;
    height: 32vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -3vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -4vw;
    left: -3vw;
    padding: 0.2vw 2.2vw;
    font-size: 4vw;
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
    top: -3.7vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 4vw solid transparent;
    border-right: 4vw solid transparent;
    border-bottom: 3.9vw solid #0136EE;
    transform: rotate(360deg);
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
    font-size: 3vw;
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
    font-size: 4vw;
    cursor: pointer;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 5vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 2.5vw;
  }
    .overlay_footer{
    position: absolute;
    top:0vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 370vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 2vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 2vw;
    top: 15vw;
    padding: 3vw 2vw;
    width: 37vw;
    height: 30vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -2vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -3vw;
    left: -2vw;
    padding: 0.2vw 1.7vw;
    font-size: 3vw;
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
    top: -2.7vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 3vw solid transparent;
    border-right: 3vw solid transparent;
    border-bottom: 2.9vw solid #0136EE;
    transform: rotate(360deg);
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
    font-size: 2.5vw;
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
    font-size: 3vw;
    cursor: pointer;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 4.5vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 2vw;
  }
    .overlay_footer{
    position: absolute;
    top:0vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 370vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 2vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 2vw;
    top: 12vw;
    padding: 3vw 2vw;
    width: 30vw;
    height: 25vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -1vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -1.5vw;
    left: -1vw;
    padding: 0.2vw 1.2vw;
    font-size: 2vw;
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
    top: -1.7vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 2vw solid transparent;
    border-right: 2vw solid transparent;
    border-bottom: 1.9vw solid #0136EE;
    transform: rotate(360deg);
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
    width: 1vw;
    height:  1vw;
    border-radius: 50%;
  }
  .downlist__footer .lists .item__list .list_text{
    font-size: 2vw;
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
    bottom: 3vw;
    color: #FFFFFF;
    font-size: 2.5vw;
    cursor: pointer;
  }
}

/* Extra large devices (large laptops and desktops, 1500px and up) */
@media only screen and (min-width: 1500px) {
    .logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
    margin: auto;
    margin-top: 1.5625vw;
    margin-bottom: 5vw;

}
.logo__content .logo{
    width: 4vw;
    cursor: pointer;
}
.logo__content .icon__search{
    width: 1.5vw;
  }
    .overlay_footer{
    position: absolute;
    top:0vw;
    left:0;
    right:0;
    bottom:0;
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.5;
    z-index:5;
    height: 370vw;
    /* display:none; */
  }

  /* down list footer */

  [dir="rtl"] .downlist__footer{
    left: 2vw;
    right: auto;
  }
  .downlist__footer{
    position: absolute;
    border-radius: 11px;
    opacity: 1 !important;
    z-index: 6;
    right: 2vw;
    top: 12vw;
    padding: 3vw 2vw;
    width: 23vw;
    height: 20vw;
    /* display: none; */
    background: #0136EE 0% 0% no-repeat padding-box;
  }

  [dir="rtl"] .downlist__footer .close{
    right: -1vw;
    left: auto;
  }
  .downlist__footer .close{
    position: absolute;
    top: -1.5vw;
    left: -1vw;
    padding: 0.2vw 1.2vw;
    font-size: 2vw;
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
    top: -1.7vw;
    right: 1vw;
    width: 0;
    height: 0;
    border-left: 2vw solid transparent;
    border-right: 2vw solid transparent;
    border-bottom: 1.9vw solid #0136EE;
    transform: rotate(360deg);
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
    width: 0.9vw;
    height:  0.9vw;
    border-radius: 50%;
  }
  .downlist__footer .lists .item__list .list_text{
    font-size: 1.5vw;
    color: #fff;
    margin-top: -5px;
  }

  [dir="rtl"] .downlist__footer .done{
    left: 5vw;
    right: auto;
  }
  .downlist__footer .done{
    position: absolute;
    right: 5vw;
    bottom: 2vw;
    color: #FFFFFF;
    font-size: 1.9vw;
    cursor: pointer;
  }
}
</style>