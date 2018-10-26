import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state:     state,
	getters:   getters,
	mutations: mutations,
	actions:   actions,
	strict:    process.env.NODE_ENV === 'production'
});