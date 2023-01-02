import cookie from "vue-cookie";
export default function auth({ next, router }) {
    let token = cookie.get('token') 
    if (!token) {
      return next({
        name: 'Home'
    });
      // this.$router.push('/supplier-login')
    }
  
    return next();
  }