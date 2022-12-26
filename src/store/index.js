import { createStore } from 'vuex'
import authUserModule from './modules/authUser';
import userModule from './modules/user';
import router from '../router'

const state = {
    layout: 'user-layout',
};
const getters = {
    layout (state) {
        return state.layout
    }
};
const mutations = {
    redirectTo(state , payload){
        router.push({name: payload });
    },
    redirectToPath(state , payload){
        router.push({path: payload });
    },
    SET_LAYOUT (state, payload) {
        state.layout = payload
    }
};
const actions = {
    redirectTo({commit} , payload){
        commit("redirectTo", payload.val)
    },
    redirectToPath({commit} , payload){
        commit("redirectToPath", payload.val)
    }
};

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {
        authUser: authUserModule,
        user: userModule,
    }
})