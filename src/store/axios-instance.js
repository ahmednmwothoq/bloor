import axios from 'axios';
import store from './index';
import router from '../router'
import i18n from './i18n'
import { useToast } from 'vue-toastification'
import cookie from "vue-cookie";


const toast = useToast()

const $axios = axios.create({
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    baseURL: 'https://klm.cdy.mybluehost.me/bloor-backend/api/'
});
// console.log(cookie.get('lang'))

$axios.defaults.headers.common['Content-Language'] = cookie.get('lang');

$axios.interceptors.request.use(function (config) {
    // Do something before request is sent return console.log('s')
    if(store.getters["user/getSwitchStatus"] && store.getters["user/getToken"]){
        config.headers = {
            "Authorization": `Bearer ${store.getters["user/getToken"]}`,
            "Content-Language": cookie.get('lang'),
        }
    }
    return config;
  }, function (error) {
    // console.log('axios request error', error)
    return Promise.reject(error);
  });

  $axios.interceptors.response.use(function(response) {
    if (response.config.method == "post" ||
        response.config.method == "put" ||
        response.config.method == "delete" ) {
        if (response?.data?.status && response?.data?.msg) {
            toast.success(`${response.data.msg}`,{
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

        if (!response?.data?.status && response?.data?.msg) {
            toast.error(`${response.data.msg}`,{
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

        if (!response?.data?.status && response?.data?.error) {
            toast.error(`${response.data.error}`,{
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

        if (!response?.data?.status && response?.data?.errors) {
            for (let index = 0; index < response.data.errors.length; index++) {
                toast.error(`${response.data.errors}`,{
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

        if (!response.data.status && response.data.errors) {
          for (let key in response.data.errors) {
            toast.error(`${response.data.errors[key][0]}`,{
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

    if (response.config.method == "get") {
        if (!response?.data?.status && response?.data?.msg) {
            toast.error(`${response.data.msg}`,{
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

        if (!response?.data?.status && response?.data?.error) {
            toast.error(`${response.data.error}`,{
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

        if (!response?.data?.status && response?.data?.errors) {
            for (let index = 0; index < response.data.errors.length; index++) {
                toast.error(`${response.data.errors}`,{
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

    if (!response.data.status && response.data.code == 400){
          router.push('/user-login')
          toast.info(`Session ended Please login Again!!`,{
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

    return response;
  }, function (error) {
    console.log('axios response error', error)
    return Promise.reject(error);
  });
// $axios.setBaseURL('https://klm.cdy.mybluehost.me/bloor-backend/api')
// $axios.setToken(store?.getters["user/getToken"], "Bearer");
// $axios.defaults.headers.common['Authorization'] = 'Bearer ' + store?.getters["user/getToken"]

// $axios.onError((error) => {
//     console.log("error axios", error);
// });

// $axios.interceptors.request.use((config) => {
//     if(store.getters["user/getSwitchStatus"] && store.getters["user/getToken"]){
//         config.headers = {
//           "Authorization": `Bearer ${store.getters["user/getToken"]}`
//         }
//       }
// });

// $axios.interceptors.response.use((response) => {

//     if (response.config.method == "post") {
//         if (response?.data?.status && response?.data?.msg) {
//             toast.success(`${response.data.msg}`,{
//                 position: "top-right",
//                 timeout: 3048,
//                 closeOnClick: true,
//                 pauseOnFocusLoss: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 draggablePercent: 0.6,
//                 showCloseButtonOnHover: false,
//                 hideProgressBar: true,
//                 closeButton: "button",
//                 icon: true,
//                 rtl: false
//               })
//         }

//         if (!response?.data?.status && response?.data?.msg) {
//             toast.error(`${response.data.msg}`,{
//                 position: "top-right",
//                 timeout: 3048,
//                 closeOnClick: true,
//                 pauseOnFocusLoss: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 draggablePercent: 0.6,
//                 showCloseButtonOnHover: false,
//                 hideProgressBar: true,
//                 closeButton: "button",
//                 icon: true,
//                 rtl: false
//               })
//         }

//         if (!response?.data?.status && response?.data?.error) {
//             toast.error(`${response.data.error}`,{
//                 position: "top-right",
//                 timeout: 3048,
//                 closeOnClick: true,
//                 pauseOnFocusLoss: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 draggablePercent: 0.6,
//                 showCloseButtonOnHover: false,
//                 hideProgressBar: true,
//                 closeButton: "button",
//                 icon: true,
//                 rtl: false
//               })
//         }

//         if (!response?.data?.status && response?.data?.errors) {
//             for (let index = 0; index < response.data.errors.length; index++) {
//                 toast.error(`${response.data.errors}`,{
//                     position: "top-right",
//                     timeout: 3048,
//                     closeOnClick: true,
//                     pauseOnFocusLoss: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     draggablePercent: 0.6,
//                     showCloseButtonOnHover: false,
//                     hideProgressBar: true,
//                     closeButton: "button",
//                     icon: true,
//                     rtl: false
//                   })
//             }
//         }
//     }
// })


export default $axios;