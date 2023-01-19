
<template>
  
  <!-- Header -->
    <header class="__header" v-if="isUser">
        <a v-if="RoleUser" @click="redirectToPath({ val: '/user-profile' })" class="header__item">
            <i class="item__icon far fa-user-circle" style="margin-left: 0.5vw;margin-right: 0.5vw;"></i>
            <span class="item__text custom_lang">{{ $t('profile') }}</span>
        </a>
        <a v-if="!RoleUser" @click="redirectToPath({ val: '/supplier' })" class="header__item">
            <i class="item__icon far fa-user-circle" style="margin-left: 0.5vw;margin-right: 0.5vw;"></i>
            <span class="item__text custom_lang">{{ $t('dashboard') }}</span>
        </a>
        <a @click="logoutUser()" class="header__item" >
            <img class="logout_icon item__icon" src="/assets/images/icon/logout.png"  alt="">
            <img class="logout_hover_icon item__icon" src="/assets/images/icon/logout_hover.png" alt="">
            <span class="item__text custom_lang">{{ $t('logout') }}</span>
        </a>
        <div v-for="(locale, index) in availableLocales">
          <a class="header__item" @click="changeLocale(locale)" v-if="locale !== this.$i18n.locale">
            <i class="item__icon far fa-globe"></i>
            <span class="item__text custom_lang">{{ locale }}</span>
          </a>
        </div>
        <div class="dropdown">
          <a class="header__item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-question" style="margin-left: 0.5vw;margin-right: 0.5vw;" aria-hidden="true"></i>
            <!-- <span class="item__text custom_lang">{{ $t('supplier_list') }}</span> -->
          </a>

          <ul class="dropdown-menu mt-1">
            <li class="cursor_pointer">
              <a @click="this.$router.push('/about-us')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('about_us') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/online-complaint')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('complaints') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/contact-us')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('contact_us') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/faqs')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('faqs') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/classification')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('classification') }}</span>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- <nuxt-link
          class="header__item"
          v-for="(locale, index) in availableLocales"
          v-if="locale == this.$i18n.locale"
          :key="index"
          :to="changeLocale(locale)
          ">
          <i class="item__icon far fa-globe"></i>
          <span class="item__text">{{ locale }}</span>

        

        </nuxt-link> -->
    </header>

    <header class="__header" v-else>
        <div class="dropdown">
          <a class="header__item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="item__icon far fa-user-circle" style="margin-left: 0.5vw;margin-right: 0.5vw;"></i>
            <span class="item__text custom_lang">{{ $t('user_list') }}</span>
          </a>
          <ul class="dropdown-menu">
            <li class="cursor_pointer">
              <a @click="redirectTo({ val: 'userSignUp' })" class="dropdown-item">
                  <!-- <i class="item__icon far fa-user-circle"></i> -->
                  <span class="item__text custom_lang">{{ $t('sign_up') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="redirectTo({ val: 'userLogin' })" class="dropdown-item">
                <!-- <img class="logout_icon item__icon" src="/assets/images/icon/login.png"  alt="">
                <img class="logout_hover_icon item__icon" src="/assets/images/icon/login_hover.png" alt=""> -->
                <span class="item__text custom_lang">{{ $t('login') }}</span>
            </a>
            </li>
          </ul>
        </div>

        <div class="dropdown">
          <a class="header__item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="item__icon far fa-user-circle" style="margin-left: 0.5vw;margin-right: 0.5vw;"></i>
            <span class="item__text custom_lang">{{ $t('supplier_list') }}</span>
          </a>
          <ul class="dropdown-menu">
            <li class="cursor_pointer">
              <a @click="this.$router.push('/supplier-signup')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('sign_up_supplier') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/supplier-login')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('login_supplier') }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div v-for="(locale, index) in availableLocales">
          <a class="header__item" @click="changeLocale(locale)" v-if="locale !== this.$i18n.locale">
            <i class="item__icon far fa-globe"></i>
            <span class="item__text custom_lang">{{ locale }}</span>
          </a>
        </div>

        <div class="dropdown">
          <a class="header__item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-question" style="margin-left: 0.5vw;margin-right: 0.5vw;" aria-hidden="true"></i>
            <!-- <span class="item__text custom_lang">{{ $t('supplier_list') }}</span> -->
          </a>
          <ul class="dropdown-menu mt-1">
            <li class="cursor_pointer">
              <a @click="this.$router.push('/about-us')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('about_us') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/online-complaint')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('complaints') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/contact-us')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('contact_us') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/faqs')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('faqs') }}</span>
              </a>
            </li>
            <li class="cursor_pointer">
              <a @click="this.$router.push('/classification')" class="dropdown-item">
                <span class="item__text custom_lang">{{ $t('classification') }}</span>
              </a>
            </li>
          </ul>
        </div>
    </header>
    <!-- Supplier -->


</template>

<script>

import Api from "@/api"
import cookie from "vue-cookie";
import { mapActions , mapGetters } from 'vuex'
export default {
    name: "Header",
    data() {
      return {
        user : ''
      }
    },
    computed:{
        ...mapGetters("authUser",{
          getAuthenticated:"getAuthenticated",
          getToken:"getToken",
        }),
        isUser() {
        if (JSON.parse(cookie.get("logged_In")) == true) {
          return true
        } else {
          return false
        }
      },
      RoleUser() {
        if (JSON.parse(cookie.get('RoleData')) == 1 ) {
          return true
        } else {
          return false
        }
      },

      availableLocales () {
        if(cookie.get("lang") == null){
          return ['ar']
        }else{
          return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
        }
        
      },
      getLocales () {
        let local = this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
        if(local[0] == 'en'){
          return true
        } else {
          return false
        }
      },

    },
    mounted() {
      // console.log(cookie.get("token"))
      // console.log(JSON.parse(cookie.get('RoleData')))
      // console.log(JSON.parse(cookie.get("token")).length > 0 && )
      // console.log(this.$i18n,this.availableLocales,this.getLocales)

    },
    methods:{
      changeLocale(locale) {
        // i18nn.locale = locale;
        this.$store.dispatch("user/switchLang", locale)
        this.$i18n.locale = locale;
        this.$router.go()
      },
      ...mapActions(['redirectTo']),
      ...mapActions(['redirectToPath']),
      // ...mapActions('authUser' , {
      //   userProfile:"userProfile",
      //   logoutApi:"logoutApi",
      // }),
      reloadPage() {
          window.location.reload();
      },
      async logoutUser(){
        await Api.authUser.logout().then((res) => {
            // console.log("success fetch", res)
            if(res?.data?.status){
              this.$store.dispatch("user/addToken", null)
              this.$store.dispatch("user/switchStatus", false)
              this.$store.dispatch("user/addRole", null)
              this.$store.dispatch("user/addUser", null)
              this.$store.dispatch("user/addSupplier", null)
              // cookie.get("token") && cookie.get("logged_In")

              this.$router.push({ path: '/'}).then(() => { this.$router.go() })
            }
            
        })
        // this.$router.push({ path: '/'}).then(() => { this.$router.go() })
      }
    }
      
}

</script>


<style scoped>
 /* Header */
 .__header{
    padding: 0 0.5208334vw;
    height:  2.5vw;
    display: flex;
    background: var(--primary_color);
    justify-content: flex-end;
    align-items: center;
    z-index: -1;
  }
  .header__item{
    color: #fff;
    margin-right: 0.83334vw;
    display: flex;
    align-items: center;
    margin-left: 3.125vw;
    font-size: 1vw;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
  }
  .header__item .logout_hover_icon {
    display: none;  
  }
  .header__item:hover .logout_hover_icon {
    display: block;  
  }
  .header__item:hover .logout_icon {
    display: none;  
  }
  .header__item:hover{
    color: rgb(59, 59, 59)   ;
  }
  .header__item .item__icon{
    width: 1.3vw;
    height: 1.3vw;
    margin-right: 0.3604167vw;
    z-index: 1;
    margin-bottom: -0.26041667vw;
  }
  .custom_lang{
    text-transform: capitalize;
    margin-top: 0px!important;
    margin: 0 5px;
  }

  

  /****************************** Responsive ******************************/
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    .__header{
      padding: 0 1vw;
      height:  7vw;
    }
    .header__item{
      margin-right: 0.83334vw;
      margin-left: 3.125vw;
      font-size: 3vw;
    }
    .header__item .item__icon{
      width: 3vw;
      height: 3vw;
      margin-right: 2vw;
      z-index: 1;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    .__header{
      padding: 0 1vw;
      height:  6vw;
    }
    .header__item{
      margin-right: 0.83334vw;
      margin-left: 3.125vw;
      font-size: 2vw;
    }
    .header__item .item__icon{
      width: 3vw;
      height: 3vw;
      margin-right: 2vw;
      z-index: 1;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    .__header{
      padding: 0 1vw;
      height:  5vw;
    }
    .header__item{
      margin-right: 0.83334vw;
      margin-left: 3.125vw;
      font-size: 1.7vw;
    }
    .header__item .item__icon{
      width: 2.5vw;
      height: 2.5vw;
      margin-right: 2vw;
      z-index: 1;
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .__header{
      padding: 0 1vw;
      height:  5vw;
    }
    .header__item{
      margin-right: 0.83334vw;
      margin-left: 3.125vw;
      font-size: 1.5vw;
    }
    .header__item .item__icon{
      width: 2.2vw;
      height: 2.2vw;
      margin-right: 1vw;
      z-index: 1;
    }
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    .__header{
      padding: 0 1vw;
      height:  4vw;
    }
    .header__item{
      margin-right: 0.83334vw;
      margin-left: 3vw;
      font-size: 1.2vw;
    }
    .header__item .item__icon{
      width: 1.8vw;
      height: 1.8vw;
      margin-right: 1vw;
      z-index: 1;
    }
  }

  /* Extra large devices (large laptops and desktops, 1500px and up) */
  @media only screen and (min-width: 1500px) {
    .__header{
      padding: 0 1vw;
      height:  3.2vw;
    }
    .header__item{
      margin-right: 0.83334vw;
      margin-left: 3vw;
      font-size: 1vw;
    }
    .header__item .item__icon{
      width: 1.2vw;
      height: 1.2vw;
      margin-right: 0;
      z-index: 1;
    }

  }

</style>