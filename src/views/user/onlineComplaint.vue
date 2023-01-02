<template>
    <Header />
    <logo-search/>

    <main class="_online_content">
        <div class="left__content">
            <h1 class="left__title">{{ $t('online_complaint_po') }}</h1>
            <p class="left__text">{{ $t('online_complaint_con') }}</p>
            <form action="" class="left__form">
                <textarea placeholder="Type Here Your Complaint" class="form__textarea" name="" id="" cols="30" rows="10"></textarea>
                <button class="form__btn" type="submit">Register</button>
            </form>
        </div>
        <img class="right__image" src="/assets/images/gallary/online2.png" alt="">
    </main>

    <FooterVue />
</template>

<script>
    import Header from "@/components/Header.vue"
    import FooterVue from '@/components/Footer.vue';
    import LogoSearch from "@/components/LogoSearch.vue"
    export default {
        data() {
            return {
                
            }
        },
        components:{
            Header,
            FooterVue,
            LogoSearch,
        },
    }
</script>

<style lang="scss" scoped>

</style>