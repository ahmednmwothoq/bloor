import cookie from "vue-cookie";
export default function guest({next,store}){
    let isLoggedIn = JSON.parse(cookie.get('logged_In')) // Can be calculated through store
    if(isLoggedIn){
        return next({
            name: 'Home'
        })
    }
 
    return next();
 }