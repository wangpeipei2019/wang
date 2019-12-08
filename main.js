import Vue from 'vue'
import App from './App'

import store from './store'
Vue.config.productionTip = false
import moment from './store/moment.min.js'

Vue.prototype.$store = store
Vue.prototype.getApp = {
	"api": require('./store/api.js')
}

Vue.filter('moment', function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	return moment(value).format(formatString);
});

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
