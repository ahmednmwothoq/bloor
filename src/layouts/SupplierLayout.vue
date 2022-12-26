<template>
    <div :dir="this.$i18n.locale === 'ar' ? 'rtl' : ''">
        <router-view></router-view>
    </div>
    
</template>

<script>
import cookie from "vue-cookie";
export default {
mounted() {
    console.log('layout supplier', cookie.get('lang'))
    // console.log(JSON.parse(cookie.get('SupplierData')),JSON.parse(cookie.get('RoleData')))
    this.$store.dispatch("user/addSupplier", JSON.parse(cookie.get('SupplierData')))
    this.$store.dispatch("user/switchLang", cookie.get('lang'))
    this.$i18n.locale = cookie.get('lang');


},
}
</script>