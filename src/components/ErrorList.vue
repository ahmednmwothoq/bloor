<template>
    <div v-if="alert == 'danger'" >
        <div v-show="toggle" style="position: fixed;top: 120px;right: 0;" class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errors.length">
            <i class="fa fa-times-circle"></i>
            <span>{{ errors }}</span>
            <a id="close_alert_error"
            @close="() => { toggle = false }">&times;</a>
        </div>
    </div>
    <div v-if="alert == 'success'">
        <div v-show="toggle" style="position: fixed;top: 120px;right: 0;" class="alert alertt alert-success alert-dismissible fade show" role="alert" v-if="errors.length">
            <i class="fa fa-times-circle"></i>
            <span>{{ errors }}</span>
            <!-- <button @click="handler()" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> -->
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorList",
        props: {
            errors: {
                type: String,
                required: true
            },
            alert: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                toggle: true,
            }
        },

        created() {
            // setTimeout(() => this.toggle = false, 4000)
            
            
        },
        // methods:{
        //         method1:function(){
        //             this.toggle = false;
        //         },
        //         method2:function(){
        //             if(this.toggle == false){

        //             }
        //         },
        //         handler:function(){
        //             this.method1();
        //             this.method2();
        //         }
        //     }
    }
    
</script>

<style  scoped>
.alertt{
    z-index: 50;
    
}
</style>