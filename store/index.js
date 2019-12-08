import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		role: 'tenant',
		cityName: '',
		token: '',
		userInfo: {},
		checkIn:[],
		userInfo: {},
		orderId:4,
		location: '',
		houseId:'',
		houseType:[],
		refundRule:{
			refundRuleDay:1,
			refundRulePercentage:10
		},
		backIndex:0,
		cityId:610100,
		houseAllInfo:{},
		houseFlag:0,
		receipt:[],
	},
	getters: {
		isLogin: state => {
			return state.tocken != '';
		}
	},
	mutations: {
		changeRole(state, role) {
			state.role = role;
		},
		changeLocation(state, location) {
			state.location = location;
			/* if (location != null) {
				this.$store.commit('changeCityId', null, location.address.city);
			} */
		},
		// 切换城市名称
		changeCityName(state,val){
			state.cityName = val;
		},
		// 添加入住人
		addFriend(state,NewCheckIn){
			state.checkIn = NewCheckIn;
		},
		//更新用户信息
		changeUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		// 更新Token
		changeToken(state, token) {
			state.token = token;
		},
		// 房东端订单参数
		order(state,NewId){
			state.orderId = NewId
		},
		//发布房屋ID
		changeHouseCard(state,id){
			state.houseId = id
		},
		// 发布房屋类型
		changeHouseType(state,value){
			state.houseType = value
		},
		// 发布房屋退款规则
		changeRefundRule(state,val){
			state.refundRule = val
		},
		//监听登录返回
		changeBackIndex(state,val){
			state.backIndex = val
		},
		// 获取城市id
		changeCityId(state,val){
			state.cityId = val
		},
		// 编辑房源，获取房源信息
		changeHouseAllInfo(state,val){
			state.houseAllInfo = val
		},
		// 判断房源是发布还是编辑状态
		changeHouseFlag(state,val){
			state.houseFlag = val
		},
		//添加收件地址
		changeReceipt(state,val){
			state.receipt = val
		},
	},
	actions: {
		
	}
})
	
export default store