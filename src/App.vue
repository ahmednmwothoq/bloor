<script>
import { RouterLink, RouterView } from 'vue-router'
// import TheLoaderVue from './components/TheLoader.vue';
import UserLayout from './layouts/UserLayout.vue'
import SupplierLayout from './layouts/SupplierLayout.vue'
import cookie from "vue-cookie";
import { useToast } from 'vue-toastification'
// import UserLogin from './views/user/login.vue'
export default {
	name: 'App',
	data() {
		return {
			showHideSpinner: true,
			user: JSON.parse(cookie.get('userData')),
			supplier: JSON.parse(cookie.get('SupplierData')),
		}
	},
	components: {
		// TheLoaderVue,
		'user-layout': UserLayout,
    	'supplier-layout': SupplierLayout
	},
	watch: {
		'$route' (to, from) {
			document.title = to.meta.title || 'Bloor'
		}
	},
  	beforeCreate() {
    	this.showHideSpinner = true;
  	},
	computed:{
		layout () {
			return this.$store.getters.layout
		}
	},
	mounted() {
		const toast = useToast()
		this.showHideSpinner = false;
		if(cookie.get('logged_In') && cookie.get('token')){
			if(JSON.parse(cookie.get('RoleData')) == 1){
				this.$store.commit('SET_LAYOUT', "user-layout")
				
			}else if(JSON.parse(cookie.get('RoleData')) == 2){
				this.$store.commit('SET_LAYOUT', "supplier-layout")
			}
			// this.addToken(cookie.get('token'))
			// this.switchStatus(cookie.get('logged_In'))
			this.$store.dispatch("user/addToken", cookie.get('token'))
    		this.$store.dispatch("user/switchStatus", cookie.get('logged_In'))
			const channel = this.$pusher.subscribe('my-channel');
			channel.bind('chat', event => {
				if(event){
					if(JSON.parse(cookie.get('RoleData')) == 1){
						if(this.user.id == event.message.reciever_id){
							toast.success(`${event.notfication}`,{
								position: "top-right",
								timeout: 3048,
								closeOnClick: true,
								pauseOnFocusLoss: true,
								pauseOnHover: true,
								draggable: true,
								draggablePercent: 0.6,
								showCloseButtonOnHover: false,
								hideProgressBar: true,
								closeButton: "button",
								icon: true,
								rtl: false
							})
						}
					}else if(JSON.parse(cookie.get('RoleData')) == 2){
						if(this.supplier.id == event.message.reciever_id){
							toast.success(`${event.notfication}`,{
								position: "top-right",
								timeout: 3048,
								closeOnClick: true,
								pauseOnFocusLoss: true,
								pauseOnHover: true,
								draggable: true,
								draggablePercent: 0.6,
								showCloseButtonOnHover: false,
								hideProgressBar: true,
								closeButton: "button",
								icon: true,
								rtl: false
							})
						}
					}
				}
				
				// console.log('chat', event)
				// this.events.push(event.message)
				// console.log('events', this.events)
			})
		}

		if(cookie.get('lang') == null){
			// cookie.set('lang', 'ar')
			this.$store.dispatch("user/switchLang", 'ar')
		}

		

		// channel.bind('pusher:subscription_succeeded', () => console.log('subscription succeeded'))
		
		
		// console.log(this.$router.push)
		// console.log(JSON.parse(cookie.get('logged_In')) == null ? 'no' : 'yes')
		// console.log(cookie.get('token'))
		// console.log(cookie.get('logged_In'),cookie.get('RoleData'),cookie.get('token'),cookie.get('userData'))
	}
}
</script>

<template>
   <!-- <RouterLink to="/login">login</RouterLink> -->
   <!-- <TheLoaderVue v-if="showHideSpinner"/> -->
   

  <!-- <RouterView v-if="!showHideSpinner" /> -->
  <!-- <RouterView /> -->
  <component v-bind:is="layout"></component>
</template>

<style scoped>


</style>
