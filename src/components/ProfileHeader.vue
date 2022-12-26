
<template>
  
  <!-- Header -->
  <header class="__header">
        <a v-if="RoleUser" @click="redirectToPath({ val: '/user-profile' })" class="header__item">
            <i class="item__icon far fa-user-circle"></i>
            <span class="item__text">Profile</span>
        </a>
        <a @click="logoutUser()"  class="header__item">
            <img class="logout_hover_icon item__icon" src="/assets/images/icon/logout_hover2.png"  alt="">
            <img class="logout_icon item__icon" src="/assets/images/icon/logout_hover.png" alt="">
            <span class="item__text">Logout</span>
        </a>
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
import { mapActions } from 'vuex'
export default {
        name: "ProfileHeader",
        data() {
          return {
            user : ''
            // user : localStorage.getItem("userToken")
            
          }
        },
        computed:{
            isUser() {
            if (cookie.get("token").length > 0 && JSON.parse(cookie.get("logged_In")) == true) {
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
            return this.$i18n.availableLocales.filter(i => i.code !== this.$i18n.locale)
          },
          getLocales () {
            let local = this.$i18n.availableLocales.filter(i => i.code !== this.$i18n.locale)
            if(local[0].code == 'en'){
              return true
            } else {
              return false
            }
          },

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
    height:  3.95835vw;
    display: flex;
    /* background: var(--unnamed-color-0136ee); */
    justify-content: flex-end;
    align-items: center;
    z-index: 100;
  }

  .header__item{
    color: #B1B1B1;
    margin-right: 0.83334vw;
    display: flex;
    align-items: center;
    margin-left: 3.125vw;
    font-size: 1.31875vw;
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
    color: rgb(59, 59, 59);
  }

  .item__icon{
    width: 1.6667vw;
    height: 1.6667vw;
    margin-right: 0.3604167vw;
    z-index: 1;
  }

  .custom_lang{
    text-transform: capitalize;
    margin-top: 3px!important;
    margin: 0 5px;
  }

</style>