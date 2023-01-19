<template>
    <div class="logo__content">
        <img @click="this.$router.push('/')" class="logo" src="/assets/images/logo/logo_user.png" alt="">
        <!-- <img  class="icon__search" src="/assets/images/icon/search.png" alt=""> -->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
.logo__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
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
</style>