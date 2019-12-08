<template>
	<view class="orderPay" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" title="订单支付" @click-left="openIndex"></uni-nav-bar>
		<view class="paybBanner">
			<view class="uni-flex uni-column" style="justify-content: center;text-align: center;">
				<view class="time">支付剩余时间:
					<text>39分34秒</text>
				</view>
				<view class="oderAsk">我们将为您保留40分钟，请尽快支付</view>
			</view>
		</view>
		<view class="cardWrap">
			<radio-group @change="radioChange">
				<view class="uni-flex uni-row cardList">
					<view class="uni-flex uni-row left">
						<view>
							<image :src="imageUrl+'zhifubao.png'"></image>
						</view>
						<view class="text">
							<view>支付宝客户端支付</view>
							<view>发生退款0-5个工作日到账，推荐使用</view>
						</view>
					</view>
					<view class="right">
						<radio value="1" checked :color="radioColor" style="transform:scale(0.8)"></radio>
					</view>
				</view>

				<view class="uni-flex uni-row cardList">
					<view class="uni-flex uni-row left">
						<view>
							<image :src="imageUrl+'wxpay.png'"></image>
						</view>
						<view class="text">
							<view>微信支付</view>
							<view>发生退款0-5个工作日到账，推荐使用</view>
						</view>
					</view>
					<view class="right">
						<radio value="2" :color="radioColor" style="transform:scale(0.8)"></radio>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="uni-flex uni-row footer">
			<view class="uni-flex uni-row left">
				<view>待付金额</view>
				<view>￥{{reserve}}.00</view>
			</view>
			<view class="right" @tap="payOrder">确认支付</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				pendingPayment: '',
				orderNumber: '',
				reserve:'',
				token: '',
				payType:1,
				imageUrl:'',
				isShow:false,
				radioColor:'#45c298'
			}
		},
		components: {
			uniNavBar
		},
		onLoad(e){
			this.imageUrl=this.getApp.api.urlImage
			this.reserve = e.reserve
			this.orderNumber = e.orderNumber
			this.token = uni.getStorageSync('token');
			this.isShow=true
		},
		methods: {
			refund() {
				uni.navigateTo({
					url: "code"
				})
			},
			openIndex() {
				uni.navigateBack({})
			},
			payOrder() {
				uni.request({
					url: this.getApp.api.crowdFunding.crowdFundingPayOrder,
					method: 'POST',
					data: {
						orderNumber:this.orderNumber,
						payType:this.payType,
						businessType:2,
						payAmount:this.reserve
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							uni.showModal({
								content: res.data.msg,
								confirmText: '确定',
								confirmColor: '#45c298',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url: '/pages/main/tabbar2/tabbar2'
										})
									}
								}
							});
						}
					}
				});
			},
			radioChange(evt) {
				this.payType = evt.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.paybBanner {
		width: 100%;
		height: 200upx;
		background-color: #FFFFFF;
		border-bottom: 4upx solid #eeeeee;
		border-top: 8upx solid #faf9ff;
		/* 		box-shadow: ; */
	}

	.orderPay {
		width: 100%;
		height: 100vh;
		background-color: #faf9ff;
	}

	.time {
		font-size: 24upx;
		color: #333333;
		line-height: 1em;
		padding-top: 56upx;
	}

	.time text {
		color: #45C298;
	}

	.oderAsk {
		font-size: 22upx;
		color: #666666;
		line-height: 1em;
		padding-top: 22upx;
	}

	.border-bottom {
		border-bottom: 1upx solid #ecf1f2;
	}

	.cardWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		background-color: #ffffff;
		line-height: 1em;
	}

	.cardList {
		justify-content: space-between;
		width: 100%;
		height: 114upx;
		border-bottom: 1upx solid #efefef;
	}

	.cardList .left image {
		width: 42upx;
		height: 42upx;
		margin-top: 35upx;
		margin-right: 18upx;
	}

	.cardList .left .text view:nth-of-type(1) {
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		margin-top: 28upx;
		line-height: 1em;
	}

	.cardList .left .text view:nth-of-type(2) {
		color: #666666;
		font-size: 22upx;
		line-height: 1em;
		margin-top: 10upx;
	}

	.cardList .right radio {
		width: 32upx;
		height: 32upx;
		margin: 35upx 20upx 0 0;
	}

	.footer {
		height: 98upx;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	.footer .left view{
		font-size: 30upx;
		line-height: 98upx;
	}
	.footer .right {
		font-size: 26upx;
		text-align: center;
		line-height: 98upx;
	}

	.footer .left view:nth-of-type(2) {
		color: #e5762d;
		margin-left: 20upx;
	}

	.footer .left {

		color: #999999;
		width: 65%;
		padding-left: 30upx;
		background-color: #ffffff;
	}

	.footer .right {
		font-size: 26upx;
		width: 35%;
		color: #FFFFFF;
		background: $uni-color-level-gradual;
		font-weight: bold;
	}
</style>
