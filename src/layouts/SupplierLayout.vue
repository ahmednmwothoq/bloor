<template>
    <!-- <link 
        v-if="this.$i18n.locale === 'ar'"
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.rtl.min.css" 
        integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N" 
        crossorigin="anonymous"
    >
    <link 
        v-if="this.$i18n.locale === 'en'"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" 
        crossorigin="anonymous"
    > -->
    <div :dir="this.$i18n.locale === 'ar' ? 'rtl' : ''">
        <router-view></router-view>
    </div>
    
</template>

<script>
import cookie from "vue-cookie";
export default {
mounted() {
    console.log(cookie.get('token'))
    // console.log(JSON.parse(cookie.get('userData')) == null ? "nullsssss" : "JSON")
    // console.log(JSON.parse(cookie.get('SupplierData')),JSON.parse(cookie.get('RoleData')))
    this.$store.dispatch("user/addSupplier", JSON.parse(cookie.get('SupplierData')))
    console.log('layout supplier', cookie.get('lang'))
    if(cookie.get('lang') == null){
        this.$store.dispatch("user/switchLang", 'ar')
        this.$i18n.locale = 'ar';
    }else{
        this.$store.dispatch("user/switchLang", cookie.get('lang'))
        this.$i18n.locale = cookie.get('lang');
    }

},
}
</script>