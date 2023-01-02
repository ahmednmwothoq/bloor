
<template>
  
  <!-- Header -->
    <header class="__header" v-if="isUser">
        <a v-if="RoleUser" @click="redirectToPath({ val: '/user-profile' })" class="header__item">
            <i class="item__icon far fa-user-circle"></i>
            <span class="item__text custom_lang">{{ $t('profile') }}</span>
        </a>
        <a v-if="!RoleUser" @click="redirectToPath({ val: '/supplier' })" class="header__item">
            <i class="item__icon far fa-user-circle"></i>
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

    <header class="__header" v-if="!isUser">
        <div class="dropdown">
          <a class="header__item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="item__icon far fa-user-circle"></i>
            <span class="item__text custom_lang">{{ $t('user_list') }}</span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a @click="redirectTo({ val: 'userSignUp' })" class="dropdown-item">
                  <!-- <i class="item__icon far fa-user-circle"></i> -->
                  <span class="item__text custom_lang">{{ $t('sign_up') }}</span>
              </a>
            </li>
            <li>
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
            <i class="item__icon far fa-user-circle"></i>
            <span class="item__text custom_lang">{{ $t('supplier_list') }}</span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a @click="this.$router.push('/supplier-signup')" class="dropdown-item">
                <!-- <i class="item__icon far fa-user-circle"></i> -->
                <span class="item__text custom_lang">{{ $t('sign_up_supplier') }}</span>
              </a>
            </li>
            <li>
              <a @click="this.$router.push('/supplier-login')" class="dropdown-item">
                <!-- <img class="logout_icon item__icon" src="/assets/images/icon/login.png"  alt="">
                <img class="logout_hover_icon item__icon" src="/assets/images/icon/login_hover.png" alt=""> -->
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
    height:  3.05835vw;
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
    font-size: 1.21875vw;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    text-decoration: none;
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
    width: 1.4667vw;
    height: 1.4667vw;
    margin-right: 0.3604167vw;
    z-index: 1;
    margin-bottom: -0.26041667vw;
  }

  .custom_lang{
    text-transform: capitalize;
    margin-top: 3px!important;
    margin: 0 5px;
  }

</style>