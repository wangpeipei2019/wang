<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="openBack" title="订单详情"></uni-nav-bar>
		<view class="paddingBot">
			<view class="top" :class="{'top-green':order.order_status==0,'top-red':order.order_status==1||order.order_status==2||order.order_status==4}">{{order.order_status==0?'待支付':order.order_status==1?'已支付':order.order_status==2?'已取消':order.order_status==4?'已失效':'暂无数据'}}<span>{{order.order_status==0?'剩余时间：10:20':order.order_status==1?'支付时间：10:20':order.order_status==2?'取消时间：10:20':order.order_status==4?'失效时间：10:20':'剩余时间：10:20'}}</span></view>
			<view class="uni-flex uni-row title" @tap="programDetail(order.project_id,order.plan_id)">
				<text>{{order.programme_title}}</text>
				<view>
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="listWarp">
				<view class="uni-flex uni-row orderList">
					<view>发起团队</view>
					<view class="uni-flex uni-row">
						<view class="log">
							<image :src="urlImage+order.crowd_funding_pictures"></image>
						</view>
					</view>
				</view>
				<view class="uni-flex uni-row orderList">
					<view>地理位置</view>
					<view>{{order.project_province+'-'+order.project_city}}</view>
				</view>
				<view style="height:120upx;line-height:120upx;">信息披露</view>
				<view class="info-text">
					<view v-for="(item,index) in disclosure" :key="index">{{item.crowd_funding_pictures}}</view>
				</view>
				<view class="uni-flex uni-row orderList">
					<view>订单编号</view>
					<view>{{order.order_number}}</view>
				</view>
				<view class="uni-flex uni-row orderList">
					<view>下单时间</view>
					<view>{{order.create_time | moment}}</view>
				</view>
				<view class="uni-flex uni-row orderList">
					<view>方案单价</view>
					<view>￥{{order.order_money}}.00</view>
				</view>
				<view class="uni-flex uni-row orderList">
					<view>份数</view>
					<view>{{order.order_count}}份</view>
				</view>
				<view class="uni-flex uni-row orderList">
					<view>预约金</view>
					<view>￥{{order.reserve}}.00</view>
				</view>
				<view class="uni-flex uni-row orderList" @tap="subscription(order.project_id)">
					<view>项目详情</view>
					<view class="leftIcon">
						<image :src="urlImage+'my_left_icon.png'"></image>
					</view>
				</view>
				<view class="uni-flex uni-row check" v-if="order.order_status==0">
					<checkbox-group class="uni-flex uni-row" @change="checkboxChange">
						<label>
							<checkbox :color="checkColor" checked style="transform:scale(0.7)" id="value" value="1"></checkbox>
						</label>
						<view class="text" @click="togglePopup('middle')">
							我已阅读并同意 <span>《投资服务协议》《授权委托书》《风险提示书》</span>及其他相关条款协议.
						</view>
					</checkbox-group>
				</view>
			</view>
			<uni-popup v-if="order.order_status==0" :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
				<view class="boxPopup">
					<view class="title">风险提示</view>
					<view class="content">
						<view>请您在认购前悉知：</view>
						<view>为保护投资人权益，认购期结束后24小时内为投资冷静期，投资人在该期间内可申请退还认购款，预约需支付投资额1%的预约金（性质为定金），该笔预约金在认购时自动抵扣；若项目认购结束且认购进度不足100%时，预约金可退。冷静期过后，除平台规则另有约定外，将不再支持退款。</view>
						<view>项目认购结束时，若认购进度达到或超过融资目标总金额的100%，则视为融资成功；若认购进度不足融资目标总金额的80%，或认购进度大于等于80%小于100%但相关融资主体不接受该等融资款项，则视为该项目融资未成功，投资人已经支付的投资款（包含预约用户支付的1%预约金）将原路退还，若认购进度大于等于80%小于100%且相关融资主体接受该等融资款项的，投资人可在认购期结束后3日内向平台客服发起申请，要求退还认购款，提出退款申请的投资人已经支付的投资款（包含预约用户支付的1%预约金）将全部原路退还。</view>
						<view>若您所预约项目，签署协议时需要使用电子签章，您需要在认购的时候授权给一木生活的方式签署完成投资所必要的法律文件（包括但不限于：投资协议、投资协议之补充协议、投资协议之解除协议、合伙协议），各签署方签署完成后的协议将即时存证，您可在平台上查看。</view>
						<view>请您仔细阅读下方《投资风险提示书》，完全了解并理解相关融资项目的风险，谨慎投资。</view>
						<view>尊敬的投资人：</view>
						<view>一木生活平台以互联网形式为创业公司提供非公开的股权、收益权、消费权等形式的融资服务（以下简称“融资服务”），以及向投资人提供投资服务。</view>
						<view>投资过程中可能会面临诸多风险因素，一木生活作为提供信息及服务的平台，不对融资或其它交易的达成或者投资收益作出任何形式的担保或保证，亦不对投资人投资时遭遇或可能遭遇的风险，、损失或损害等不利后果承担任何形式的责任。</view>
						<view>为让您更好地了解非公开股权、收益权、消费权等融资项目的投资风险，特为您提供此《投资风险提示书》，您通过网络页面点击确认、签署或以其他方式接受本风险提示书，即视为您已认真阅读风险提示书的全部内容，自愿且能够承担投资可能带来的损失。</view>
					</view>
					<view @tap="togglePopup" class="btn-confirm">我已知晓</view>
				</view>
			</uni-popup>
		</view>
		<view class="uni-flex uni-row bottom" v-if="order.order_status==0">
			<view class="left">
				<view class="sellRight">订单金额：</view>
				<view class="sell">￥{{order.reserve}}.00</view>
			</view>
			<view class="right" @tap="openOrderPay(order.reserve,order.order_number)">去支付</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			uniPopup
		},
		data() {
			return {
				type: '',
				token: '',
				orderNumber: '',
				disclosure: [],
				order: {},
				isShow: false,
				urlImage:'',
				picker: true,
				checkColor:'#45c298'
			}
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token')
			this.orderNumber = e.orderNumber
			this.getOrderDetails()
		},
		methods: {
			checkboxChange(e) {
				var checked = e.target.value
				if (checked == 1) {
					this.picker = true
				} else {
					this.picker = false
				}
			},
			getOrderDetails() {
				uni.request({
					url: this.getApp.api.crowdFunding.orderDetails,
					method: 'GET',
					data: {
						orderNumber: this.orderNumber
					},
					header: {
						token: this.token
					},
					success: res => {
						this.disclosure = res.data.disclosure
						this.order = res.data.order[0]
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});

			},
			togglePopup(type) {
				this.type = type
			},
			openBack() {
				uni.navigateBack({});
			},
			subscription(id) {
				uni.navigateTo({
					url: "/pages/tenant/crowdfunding/subscription?id=" + id + '&isBuy=' + 1
				})
			},
			programDetail(projectId, schemeId) {
				uni.navigateTo({
					url: "/pages/tenant/crowdfunding/programDetail?projectId=" + projectId + "&schemeId=" + schemeId + '&isBuy=' + 1
				})
			},
			openOrderPay(reserve, orderNumber) {
				if (this.picker) {
					uni.navigateTo({
						url: '/pages/tenant/crowdfunding/order_pay?reserve=' + reserve + '&orderNumber=' + orderNumber
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-text {
		background: #f6f6f6;
		padding: 18upx 20upx;
		margin: 0 -20upx;
	}
	.paddingBot {
		padding-bottom: 150upx;
	}
	.top-green {
		color: $uni-text-color-green;
	}
	.top-red {
		color: $uni-text-color-pay;
	}
	.top {
		text-align: center;
		/* height: 105upx;
		line-height: 105upx; */
		font-size: 36upx;
		font-weight: bold;
		border-bottom: 1upx solid #ecf1f2;
		line-height: 1em;
		padding: 20upx 0 40upx 0;
	}
	.top span {
		font-size: 26upx;
		color: #3d3d3d;
		padding-left: 20upx;
		font-weight: normal;
	}
	.title {
		height: 170upx;
		font-weight: bold;
		font-size: 42upx;
		color: #3d3d3d;
		line-height: 170upx;
		justify-content: space-between;
		border-bottom: 1upx solid #ecf1f2;
	}
	.title text {
		padding-left: 20upx;
		width: 80%;
	}
	.title image {
		width: 40upx;
		height: 40upx;
		margin: 72upx 20upx 0 0;
	}
	.listWarp {
		width: calc(100% - 40upx);
		padding: 0 20upx 0 20upx;
	}
	.orderList {
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		justify-content: space-between;
		font-size: 24upx;
		border-bottom: 1upx solid #ecf1f2;
	}
	.orderList:nth-last-of-type(1){
		border-bottom: 0;
	}
	.orderList view:nth-of-type(1) {
		line-height: 120upx;
	}
	.orderList view:nth-of-type(2) {
		line-height: 120upx;
	}
	.orderList .log {
		display: flex;
		align-items: center;
	}
	.orderList .log image {
		width: 280upx;
		height: 80upx;
		// background: #45c298;
		// margin-top:44upx;
	}
	.orderList .leftIcon image {
		width: 40upx;
		height: 40upx;
		margin-top: 42upx;
	}
	.check {
		height: 100upx;
		padding: 30upx 0 0 0;
		box-shadow: 0 0 10px #f3f3f3;
	}
	.check radio-group {
		width: 80upx;
	}
	.text {
		color: #949c9c;
		font-size: 24upx;
	}
	.text span {
		color: #4361Fc;
		font-size: 24upx;
	}
	.boxPopup {
		width: calc(100% - 100upx);
		width: 690upx;
		height: calc(100vh - 200upx);
	}
	.boxPopup .title {
		width: 100%;
		height: 130upx;
		line-height: 130upx;
		font-size: 34upx;
		color: #3d3d3d;
		font-weight: bold;
		text-align: center;
	}
	.boxPopup .content {
		width: calc(100% - 40upx);
		height: calc(100vh - 480upx);
		padding: 0 20upx 40upx 20upx;
		box-shadow: 0 0 10px #f3f3f3;
		overflow-y: auto;
	}
	.boxPopup .btn-confirm {
		width: 100%;
		line-height: 106upx;
		text-align: center;
		height: 106upx;
		font-size: 36upx;
		color: #152bca;
		position: fixed;
		bottom: 0;
	}
	.bottom {
		width: 750upx;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		height: 120upx;
		bottom: 0;
		box-sizing: border-box;
		padding: 0 20upx;
	}
	.bottom .left {
		display: flex;
	}
	.bottom .sell {
		font-size: 30upx;
		color: #ea5e57;
		line-height: 1em;
		font-weight: bold;
	}
	.bottom .sellRight {
		line-height: 1em;
		font-size: 24upx;
		color: #3d3d3d;
		font-weight: bold;
	}
	.bottom .right {
		width: 247upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: #ffffff;
		font-size: 32upx;
		background: $uni-color-level-gradual;
	}
</style>
