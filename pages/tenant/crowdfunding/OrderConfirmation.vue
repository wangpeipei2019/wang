<template>
	<view class="confirmationWrap" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="openBack" title="认购"></uni-nav-bar>
		<view class="confirmation">
			<view class="content">
				<view class="title">{{cProgramme.programmeTitle}}</view>
				<view class="uni-flex uni-row number">
					<view class="uni-flex uni-row left">
						<view>￥{{cProgramme.subscriptionMonovalent}}.00</view>
						<view>/份</view>
					</view>
					<view class="right">
						<uni-number-box :min="1" :max="cProgramme.surplusShare" :value="number" @change="change"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row remaining">
					<view>剩余{{cProgramme.surplusShare}}份</view>
					<view>还可添加{{cProgramme.surplusShare}}份</view>
				</view>
				<view class="uni-flex uni-row rdereSell">
					<view>订单金额</view>
					<view>￥{{cProgramme.orderAmount}}.00</view>
				</view>
				<view class="description">
					<view>冷静说明</view>
					<view>为保护投资人权益,认购期结束后&nbsp;24小时为投资冷静期。期间您可申请退还认购款。冷静期过后，将安平台规则退款</view>
				</view>
			</view>
			<view class="eddress">
				<view class=" uni-flex uni-row settingList" @tap="addAddress">
					<view class="left">
						<view v-for="item in receipt" :key="item.id" v-if="receipt.length!=0">
							<view class="top">{{item.addresseeName}}<span>{{item.contactNumber}}</span></view>
							<view class="bot">{{item.detailedAddress}}</view>
						</view>
						<view v-if="receipt.length==0" class="email tip-color">添加收件人地址</view>
					</view>
					<view class="uni-flex uni-row right1">
						<image :src="imageUrl+'my_left_icon.png'"></image>
					</view>
				</view>
				<view class=" uni-flex uni-row settingList" @tap="addEmail">
					<view class="email" :class="{'tip-color':emailAddress==null||emailAddress==''}">{{emailAddress!=null&&emailAddress!=''?emailAddress:'添加收件人邮箱'}}</view>
					<view class=" uni-flex uni-row right2">
						<image :src="imageUrl+'my_left_icon.png'"></image>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row check">
				<checkbox-group class="uni-flex uni-row" @change="checkboxChange">
					<label>
						<checkbox :color="checkColor" checked style="transform:scale(0.7)" id="value" value="1"></checkbox>
					</label>
					<view class="text" @click.stop="togglePopup('middle')">
						我已阅读并同意 <span>《投资服务协议》《授权委托书》《风险提示书》</span>及其他相关条款协议.
					</view>
				</checkbox-group>
			</view>
			<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
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

		<view class="uni-flex uni-row bottom">
			<view class="left">
				<view class="sellRight">实付金额:</view>
				<view class="sell">￥{{cProgramme.reserve}}.00</view>
			</view>
			<view class="right" @tap="openOrderPay(cProgramme.reserve)">确认</view>
		</view>

	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-navbar.vue'
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniNumberBox,
			uniPopup,
			uniNavBar
		},
		data() {
			return {
				type: '',
				id: '',
				schemeId: '',
				isShow: false,
				number: 1,
				token: '',
				cProgramme: {},
				emailAddress:'',
				picker: true,
				emptyReceipt: [],
				imageUrl:'',
				checkColor:'#45c298'
				}
		},
		computed: {
			receipt() {
				return this.$store.state.receipt
			}
		},
		onLoad(e) {
			this.imageUrl=this.getApp.api.urlImage
			this.id = e.projectId
			this.schemeId = e.schemeId
			this.resetReceipt()
		},
		onShow(){
			this.phoneAndEmail()
		},
		methods: {
			getSubscription() {
				uni.request({
					url: this.getApp.api.crowdFunding.subscription,
					method: 'GET',
					data: {
						projectId: this.id,
						schemeId: this.schemeId,
						number: this.number
					},
					success: res => {
						this.cProgramme = res.data.cProgramme
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			phoneAndEmail() {
				this.token = uni.getStorageSync('token')
				if (this.token == '') {
					this.openLogin()
				} else {
					uni.request({
						url: this.getApp.api.crowdFunding.phoneAndEmail,
						method: 'POST',
						data: {},
						header: {
							token: this.token
						},
						success: res => {
							if (res.data.code == 0) {
								this.emailAddress = res.data.pAndEmailEntitys.emailAddress
								this.getSubscription()
							} else {
								this.openLogin()
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			openLogin() {
				this.$store.commit('changeBackIndex', 2)
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			resetReceipt() {
				this.$store.commit('changeReceipt', this.emptyReceipt)
			},
			change(val) {
				this.number = val
				this.getSubscription()
			},
			checkboxChange(e) {
				var checked = e.target.value
				if (checked == 1) {
					this.picker = true
				} else {
					this.picker = false
				}
			},
			openOrderPay(reserve) {
				if (this.picker) {
					if (this.receipt.length == 0) {
						uni.showToast({
							title: '收件人地址不能为空',
							icon: 'none'
						});
					} else if (this.emailAddress == '' || this.emailAddress == null) {
						uni.showToast({
							title: '邮箱不能为空',
							icon: 'none'
						});
					} else {
						uni.request({
							url: this.getApp.api.crowdFunding.confirmSubscription,
							method: 'POST',
							data: {
								projectId: this.id,
								planId: this.schemeId,
								orderCount: this.number,
								orderMoney: this.cProgramme.orderAmount,
								reserve: this.cProgramme.reserve,
								nextSingleAddressId: this.receipt[0].id,
								mailboxId: this.emailAddress,
								paymentAmount: this.cProgramme.reserve
							},
							header: {
								token: this.token
							},
							success: res => {
								if (res.data.code == 0) {
									uni.navigateTo({
										url: '/pages/tenant/crowdfunding/order_pay?reserve=' + reserve + '&orderNumber=' + res.data.orderNumber
									})
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}
			},
			togglePopup(type) {
				this.type = type
			},
			openBack() {
				uni.navigateBack({});
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/tenant/crowdfunding/addressList'
				})
			},
			addEmail() {
				uni.navigateTo({
					url: '/pages/tenant/crowdfunding/email'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirmationWrap {
		width: 100%;
		height: 100vh;
		background-color: #faf9ff;
	}

	.confirmation {
		width: calc(100% - 60upx);
		padding: 30upx 30upx 90upx 30upx;
		background-color: #ffffff;
		margin-top: 8upx;
	}

	.confirmation .content {
		width: calc(100% - 40upx);
		padding: 0 20upx 40upx 20upx;
		box-shadow: 0 0 10px #f3f3f3;
	}

	.content .title {
		font-size: 34upx;
		color: #3d3d3d;
		font-weight: bold;
		line-height: 1em;
		padding: 55upx 0 0 0;
	}

	.content .number {
		justify-content: space-between;
	}

	.content .number .left view:nth-of-type(1) {
		color: $uni-text-color-landlord;
		font-size: 40upx;
		font-weight: bold;
		line-height: 1em;
		margin: 30upx 2upx 0 0;
	}

	.content .number .left view:nth-of-type(2) {
		color: #3d3d3d;
		font-size: 22upx;
		line-height: 1em;
		margin: 45upx 0 0 0;
	}

	.content .number .right {
		/* 	background-color: #07C160; */
		margin: 30upx 0 0 0;
	}

	.remaining {
		justify-content: space-between;
		font-size: 18upx;
		color: #3d3d3d;
		line-height: 1em;
		margin-top: 22upx;
	}

	.rdereSell {
		justify-content: space-between;
		line-height: 1em;
		margin: 50upx 0 40upx 0;
	}

	.rdereSell view:nth-of-type(1) {
		font-size: 28upx;
		color: #3d3d3d;
	}

	.rdereSell view:nth-of-type(2) {
		font-size: 24upx;
		color: #3d3d3d;
	}

	.description {
		padding: 22upx 22upx 0 22upx;
		width: calc(100% - 44upx);
		min-height: 150upx;
		background-color: #eff7f7;
		/* line-height: 1em; */
	}

	.description view:nth-of-type(1) {
		font-size: 30upx;
		color: #3d3d3d;
		font-weight: bold;
	}

	.description view:nth-of-type(2) {
		font-size: 24upx;
		color: #949c9c;
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
		width: 100%;
		justify-content: space-between;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}

	.bottom .left {
		padding: 0 0 0 8upx
	}

	.bottom .sell {
		font-size: 40upx;
		color: $uni-text-color-landlord;
		line-height: 1em;
		font-weight: bold;
		margin-top: 15upx;
		padding: 0 0 0 10upx;
	}

	.bottom .sellRight {
		padding: 0 0 0 20upx;
		line-height: 1em;
		margin-top: 5upx;
		font-size: 22upx;
		color: #3d3d3d;
		font-weight: bold;
	}

	.bottom .right {
		width: 247upx;
		height: 106upx;
		line-height: 106upx;
		text-align: center;
		color: #ffffff;
		font-size: 32upx;
		background: $uni-color-level-gradual;
	}

	.settingList {
		background-color: #ffffff;
		width: calc(100% - 36upx);
		justify-content: space-between;
		border-bottom: 1upx solid #f5f5f8;
		margin: 10upx 18upx 0 18upx;
		min-height: 60upx;
	}

	.settingList image {
		width: 40upx;
		height: 40upx;
		vertical-align: top;
		margin-left: 10upx;
	}

	.settingList .left .top {
		font-size: 30upx;
		color: #3d3d3d;
		font-weight: bold;
		line-height: 1em;
		padding-top: 38upx;
		padding: 38upx 0 16upx 0;
	}

	.settingList .left .bot {
		font-size: 24upx;
		padding-bottom: 30upx;
	}

	.settingList .left span {
		padding-left: 28upx;
	}

	.settingList .email {
		font-size: 28upx;
		line-height: 120upx;
		height: 120upx;
		font-size: 30upx;
		color: #3d3d3d;
		font-weight: bold;
	}

	.settingList .right1,
	.settingList .right2 {
		justify-content: flex-end;
		margin: 40upx 0;
	}

	.eddress {
		width: 100%;
		box-shadow: 0 0 10px #f3f3f3;

	}
	.tip-color{
		color:#c1c1c1 !important;
	}
</style>
