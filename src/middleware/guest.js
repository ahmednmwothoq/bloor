import cookie from "vue-cookie";
import { useToast } from 'vue-toastification'
export default function guest({next,store}){
    let isLoggedIn = JSON.parse(cookie.get('logged_In')) // Can be calculated through store
    if(isLoggedIn){
        const toast = useToast()
    if (!isLoggedIn) {
        if(cookie.get('lang') == 'en'){
            toast.error(`Login in first`, {
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
        }else{
            toast.error(`قم بتسجيل الدخول اولا`, {
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
        return next({
            name: 'Home'
        });
        // this.$router.push('/supplier-login')
    }
    }
 
    return next();
 }