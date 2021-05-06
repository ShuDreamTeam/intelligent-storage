import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
  	admin:'',
  	admin_id:'',
  },
  mutations: {
  	"getAdmin" : function (state,val) {
  	  state.admin = val;
  	},
  	"getAdminId" : function (state,val) {
  	  state.admin_id = val;
  	},
  },
})