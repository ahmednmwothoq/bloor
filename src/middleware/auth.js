import { useToast } from 'vue-toastification'
import cookie from "vue-cookie";
export default function auth({ next, router }) {
    let token = cookie.get('token')
    const toast = useToast()
    if (!token) {
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

    return next();
}