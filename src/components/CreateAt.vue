<template>
    <span>
        {{ getLocales ? CreateAtDateAR(create) : CreateAtDateEN(create)}} &nbsp {{CreateAtTime(create)}}
    </span>
</template>

<script>
    export default {
        props:{ 
            create:{
                type: String,
                required: true
            }
        },
        
        computed: {
            getLocales () {
                let local = this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
                // console.log("text",local)
                if(local[0] == 'en'){
                return true
                } else {
                return false
                }
            },
        },
        methods: {
            CreateAtDateEN(create_at){
                const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const date = create_at.split(' ')[0]

                const d = new Date(`${date}`);
                const month = months[d.getMonth()];
                const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
                return last
            },
            CreateAtTime(create_at){

                const time = create_at.split(' ')[1]

                const timeHour = time.slice(0, 2);
                const timeMinSec = time.slice(2);
                // const last = "";
                if(timeHour > 12){
                const last = `${timeHour - 12}${timeMinSec} PM`
                return last
                }else{
                const last = `${timeHour}${timeMinSec} AM`
                return last
                }
            },
            CreateAtDateAR(create_at){
                const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                            ];
                const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                const date = create_at.split(' ')[0]

                const d = new Date(`${date}`);
                // const month = months[d.getMonth()];
                // const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
                const last = days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
                return last
            },
            
        },
    }
</script>

<style lang="scss" scoped>

</style>