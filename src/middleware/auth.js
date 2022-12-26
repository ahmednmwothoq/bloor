import cookie from "vue-cookie";
export default function auth({ next, router }) {
    let token = cookie.get('token') 
    if (!token) {
      return router.push({ name: 'login' });
    }
  
    return next();
  }