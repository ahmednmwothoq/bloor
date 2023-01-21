<template>
    <Header />
    <logo-search/>

    <main class="_classific_content">
        <div class="classification">
            <h2 class="class__title">
                {{ $t('class_instructions') }}
                <img class="image" src="/assets/images/icon/classification.png" alt="">
            </h2>
            <div class="class__content">
                <div class="con__text">
                    {{ $t('classification_text_one') }}
                </div>
                <div class="con__text">
                    <span class="item__text">{{ $t('white') }}:</span>
                    {{ $t('classification_text_two') }}
                </div>
                <div class="con__text">
                    <span class="item__text">{{ $t('blue') }}:</span>
                    {{ $t('classification_text_three') }}
                </div>
                <div class="con__text">
                    <span class="item__text">{{ $t('gold') }}:</span>
                    {{ $t('classification_text_Four') }}
                </div>
                
            </div>
            <span class="class__got">{{ $t('got_it_or') }} <a @click="this.$router.push('/contact-us')">{{ $t('get_in_touch') }}</a></span>
        </div>
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