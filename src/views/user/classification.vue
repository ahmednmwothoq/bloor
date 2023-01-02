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
                    The colors of the crystals change based on the presence of evidence that proves the use of the product or not, through an invoice or any other document, and this is verified by the system manager (supervisor).
                </div>
                <div class="con__text">
                    <span class="item__text">White:</span>No proof of ownership of the product was provided. Any comment without a picture is inserted directly white and does not need verification from the admin
                </div>
                <div class="con__text">
                    <span class="item__text">Blue:</span>Provide proof of ownership of the product. A picture has been inserted and the car serial number will immediately become blue, but a gray writing appears next to the comment (not yet verified by the platform) and the comment is approved or deleted by the supervisor.<br> The attached photo is the car purchase contract or the car or insurance form (the most important of which is the car registration number, the name in binary and the date of acquisition or purchase, provided that it matches what was written in the year of acquisition) with other data being highlighted because they are not important to the site. 
                </div>
                <div class="con__text">
                    <span class="item__text">Gold:</span>He has more than one experience for the same brand, or he has a long experience of 3 years, responds to the inquiries of others and obtains a confirmation of benefit from the beneficiary. He is listed directly as Gold if his car experience is more than 3 years, or he lists two different experiences for the same brand, but a gray writing appears next to the comment (not yet verified by the platform).
                </div>
                
            </div>
            <span class="class__got">Got it ? Or <a @click="this.$router.push('/contact-us')">Get In Touch</a></span>
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