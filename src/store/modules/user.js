import cookie from "vue-cookie";
const state = () => ({
  user: {},
  supplier: {},
  role: null,
  token: null,
  isLoggedIn: false,
  lang: 'ar',
});

const mutations = {
  storeUser(state, userObj) {
    state.user = userObj;
  },
  storeRole(state, role) {
    state.role = role;
  },
  storeSupplier(state, supplierObj) {
    state.supplier = supplierObj;
  },
  storeToken(state, token) {
    state.token = token;
  },
  switchUserStuts(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  storeLang(state, lang) {
    state.lang = lang;
  }
};

const actions = {
  addUser({ commit }, event) {
    commit('storeUser', event)
    cookie.set("userData", JSON.stringify(event));
  },
  addSupplier({ commit }, event) {
    commit('storeSupplier', event)
    cookie.set("SupplierData", JSON.stringify(event));
  },
  addRole({ commit }, event) {
    commit('storeRole', event)
    cookie.set("RoleData", event);
  },
  addToken({ commit }, event) {
    commit('storeToken', event)
    cookie.set("token", event);
  },
  switchStatus({ commit }, event) {
    commit('switchUserStuts', event)
    cookie.set("logged_In", event);
  },
  switchLang({ commit }, event) {
    commit('storeLang', event)
    cookie.set("lang", event)
   
  },
}

const getters = {
  getRole: state => {
    return state.role
  },
  getUser: state => {
    return state.user
  },
  getSupplier: state => {
    return state.supplier
  },
  getToken: state => {
    return state.token
  },
  getSwitchStatus: state => {
    return state.isLoggedIn
  },
  getLang: state => {
    return state.lang
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
