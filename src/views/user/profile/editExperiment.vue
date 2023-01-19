<template>
    <profile-nav-vue :sideList="sideList" />

    <main class="profile_edit_content" style="margin-bottom: 7rem!important;">
        <form>
            <div class="person__info mt-5">
                <div class="btns mt-2">
                    <a @click="redirectToPath({ val: '/user-profile' })" class="btn_form btn_cancel">{{ $t('cancel') }}</a>
                    <a @click="updateDataUserExp" class="btn_form btn_save">{{ $t('save') }}</a>
                </div>
            </div>
            <div class="person__details mt-5" style="width: auto;">
                <div class="list_add_opinion form_add_opinions" v-if="experiment">
                    <div class="form_add_opinion" style="position: relative;">
                        <form class="opinin_form">
                            <textarea v-model="experiment.body" :placeholder="$t('enter_your_experiment')" name="" cols="30" rows="10"></textarea>
                            <!-- <span class="feedback_error" v-if="val$.bodyEx.$error">{{ val$.bodyEx.$errors[0].$message }}</span> -->
                            <input id="add_profile_attach" @change="uploadImagesOpin" ref="image" class="input" type="file">
                            <input id="add_profile_attach" @change="uploadImagesOpinFile" ref="file" class="input" type="file">
                            <span class="attach" @click="$refs.image.click()">
                                <i class="far fa-paperclip icon"></i> {{ $t('attach_image_product') }}
                            </span>
                            <span class="attach_file" @click="$refs.file.click()">
                                <i class="far fa-paperclip icon"></i> {{ $t('attach_file') }}
                            </span>
                            <Rating @rate="rate" :grade="experiment.rate" :color="'darkColor'"  />
                            <ul class="list-style" style="padding-top: 20.5vw!important;" v-if="preview_image || preview_image_file">
                                <!-- <span @click="clearUploadImg" class="clear">{{ $t('clear') }}</span> -->
                                <li class="list" v-if="preview_image">
                                    <img :src="preview_image" alt="alt_img" />
                                </li>
                                <li class="list" v-if="preview_image_file">
                                    <img :src="preview_image_file" alt="alt_img" />
                                </li>
                            </ul>
                            <ul class="list-style" style="padding-top: 20.5vw!important;" v-else>
                                <!-- <span @click="clearUploadImg" class="clear">{{ $t('clear') }}</span> -->
                                <li class="list" v-for="img in experiment.media" :key="img.id">
                                    <!-- <img :src="preview_image" alt="alt_img" /> -->
                                    <span class="text" v-if="img.collection_name == 'product'">{{ $t('product') }}</span>
                                    <span class="text" v-else-if="img.collection_name == 'proof'">{{ $t('proof') }}</span>
                                    <img class="image" :src="img.original_url" alt="" />
                                </li>
                            </ul>
                            <!-- <input type="checkbox" class="check__field" name=""> -->
                            <!-- <button class="btn_submit" @click="addExperimentUser" type="button">{{ $t('publish') }}</button> -->
                        </form>
                    </div>
                </div>
            </div>
        </form>
    </main>

    <FooterVue />
</template>

<script>
import Api from "@/api"
import cookie from "vue-cookie";
import ProfileNavVue from '@/components/ProfileNav.vue';
import FooterVue from '@/components/Footer.vue';
import Rating from '@/components/Rating.vue';
// import ItemExperienceThird from "@/components/ItemExperienceThird.vue"
    export default {
        data(){
            return {
                idEx: this.$route.params.id,
                sideList: [
                    {
                        id:1,
                        name: "details",
                        active: '',
                        url:'/user-profile'
                    },
                    // {
                    //     id:2,
                    //     name: "reviews",
                    //     active: '',
                    //     url:'/user-review'
                    // },
                    {
                        id:3,
                        name: "chats",
                        active: '',
                        url:'/user-chat'
                    },
                    {
                        id:4,
                        name: "experiments",
                        active: 'active',
                        url:'/user-experiment'
                    }
                    
                ],
                experiment: null,
                preview_image: null,
                image_item: null,
                preview_image_file: null,
                image_item_file: null,
                bodyEx: '',
                rateValue: '',
            }
        },
        components:{
            ProfileNavVue,
            FooterVue,
            Rating,
        },
        mounted() {
            this.getDataExperiment()
            // console.log(this.user)
        },
        methods: {
            async getDataExperiment(){
                await Api.user.userGetSingleExperiments(this.idEx).then((res)=>{
                    if(res.data.status){
                        console.log("user",res.data)
                        this.experiment = res.data.body
                        // this.preview_image = res.data.body
                        // this.experiments = res.data.body;
                        // if(res.data.body.length > 0){
                        //     this.noData = true
                        // }else{
                        //     this.noData = false
                        // }

                    }
                })
            },
            uploadImagesOpin(event){
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview_image = e.target.result;
                }
                this.image_item = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            uploadImagesOpinFile(event){
                var input = event.target;
                if (input?.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview_image_file = e.target.result;
                }
                this.image_item_file = input.files[0];
                reader.readAsDataURL(input.files[0]);
                }
            },
            rate(event){
                this.rateValue = event
                // console.log('tarsg',this.rateValue)
            },
            async updateDataUserExp(){
                const data = new FormData();
                    data.append('body', this.experiment.body);
                    data.append('rate', this.rateValue);
                    if(this.image_item_file){
                        data.append('file', this.image_item_file);
                    }
                    if(this.image_item){
                        data.append('product_image', this.image_item);
                    }

                    await Api.user.userUpdateSingleExperiments(this.idEx,data).then((res)=>{
                        console.log(res);
                        if(res.data.status){
                            this.$router.push('/user-experiment')
                        } 
                        
                    })
            }
        },
    }
</script>

<style  scoped>
.form_add_opinions{
    position: inherit;
    width: 48vw;
    right: auto;
    left: auto;
    top: auto;
    margin: 0 auto;
    z-index: 1;
}
</style>