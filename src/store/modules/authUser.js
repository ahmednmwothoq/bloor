// import axios from "axios";
import $axios from '../axios-instance';
import { useToast } from 'vue-toastification'
import router from '../../router'

const toast = useToast()

const state = () => ({
    loginApiStatus: "",
    signApiStatus: "",
    token: null,
    authenticated: false,
    userData:{},
    testData:{}
  });
   
  const getters = {
    getTestData(state) {
      return state.testData;
    },
    getLoginApiStatus(state) {
      return state.loginApiStatus;
    },
    getSignApiStatus(state) {
      return state.signApiStatus;
    },
    getToken(state) {
      return state.token;
    },
    getUserData(state) {
      return state.userData;
    },
    getAuthenticated(state) {
      return state.authenticated;
    }
  };
   
  const actions = {
    async signUpApi({ commit },payload) {
      const response = await $axios
      .post("/api/register", payload)
        .catch((err) => {
          console.log(err);
        });
        console.log(response);
        commit("setSignApiStatus", "success");
      if (response && response.data) {        
        if(response.data.error && response.data.status == false){
          toast.error(`${response.data.error}`)

        }else if(response.data.msg && response.data.status == true){
          toast.success(`${response.data.msg}`)
          
        }
        
      } else {
        console.log("error response")
      }
    },
    async verifyEmailApi({ commit }, payload ) {
      const response = await $axios
        .post("/api/verify-email", payload)
        .catch((err) => {
          console.log(err);
        });
   
      if (response && response.data) {        
        if(response.data.error && response.data.status == false){
          toast.error(`${response.data.error}`)

        }else if(response.data.msg && response.data.status == true){
          commit('setAuthenticated', true);
          commit('setToken', response.data.token);

          const dataResTokenSession = btoa(response.data.token);
          sessionStorage.setItem("Token" , dataResTokenSession);

          toast.success(`${response.data.msg}`)
          router.push({ path: '/' })
        }
        
      } else {
        console.log("error response")
      }
    },
    async loginApi({ commit }, payload ) {
      const response = await $axios
        .post("/api/login", payload)
        .catch((err) => {
          console.log(err);
        });
   
      if (response && response.data) {
        commit("setLoginApiStatus", "success");
        
        if(response.data.error && response.data.status == false){
          toast.error(`${response.data.error}`)

        }else if(response.data.msg && response.data.status == true){
          commit('setAuthenticated', true);
          commit('setToken', response.data.token);

          const dataResTokenSession = btoa(response.data.token);
          sessionStorage.setItem("Token" , dataResTokenSession);
          
          toast.success(`${response.data.msg}`)
          router.push({path: '/' })
        }
        
      } else {
        commit("setLoginApiStatus", "failed");
        console.log("error response")
      }
    },
    async userProfile({ commit } ) {
      const response = await $axios
        .get("/api/user")
        .catch((err) => {
          console.log(err);
        });
      if (response && response.data) {
        if(response.data.error && response.data.status == false){
          toast.error(`${response.data.error}`)
        }else if(response.data.status == true){
          commit('setUserData', response.data.userData);
        }
        
      } else {
        // commit("setLoginApiStatus", "failed");
        console.log("failed response")
      }
    },
    async logoutApi ({ commit }) {
      const response = await $axios
        .post("/api/logout")
        .catch((err) => {
          console.log(err);
        });

        if (response && response.data) {   

          if(response.data.error && response.data.status == false){
            toast.error(`${response.data.error}`)

          }else if(response.data.msg && response.data.status == true){
            commit('setAuthenticated', false);
            commit('setToken', null);
            commit('setUserData', null);
            sessionStorage.removeItem("Token");
            toast.success(`${response.data.msg}`)
          }
        } else {
          console.log("failed response")
        }
      // commit('setToken', null);
      // commit('setAuthenticated', false);
    },

  };
   
  const mutations = {
    setTestData(state, testData) {
      state.testData = testData;
    },
    setLoginApiStatus(state, data) {
      state.loginApiStatus = data;
    },
    setSignApiStatus(state, data) {
      state.signApiStatus = data;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    }
  };
   
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };