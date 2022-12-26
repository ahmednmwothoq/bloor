
import $axios from "../store/axios-instance";
async function signIn(payload) {
    try {
      return await $axios.post(`suplier/login`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function register(payload) {
    try {
      return await $axios.post(`suplier/register`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }

  async function verifyEmail(payload) {
    try {
      return await $axios.post(`verify-email`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
  async function logout() {
    try {
      return await $axios.post(`logout`).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
   async function forgotPassword(payload) {
    try {
      return await $axios.post(`forgot-password`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
   async function verifyRestPassCode(payload) {
    try {
      return await $axios.post(`verify-rest-code`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }
   async function changePasswordUser(payload) {
    try {
      return await $axios.post(`change-password`,payload).then((res) => {
        return res;
      });
    } catch (error) {
      return error
    }
  }


  const authSupplier = {
    signIn,
    register,
    verifyEmail,
    logout,
    forgotPassword,
    verifyRestPassCode,
    changePasswordUser,
    
  };
  export default authSupplier;