import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './modules/user'


var myStore = new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user:user
    }
})

export default myStore