<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" title="我的订单"></uni-nav-bar>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view>
				<view class="uni-flex uni-column page-content" v-for="item in landlordOrderList" :key="item.id">
					<view class="order-code marbottom">
						<text class="txt">订单号：{{item.order_number}}</text>
						<!-- <text class="txt">下单时间：{{item.create_time}}</text> -->
					</view>
					<div class="order-time marbottom">
						<text class="txt-time">{{item.start_time}}</text>
						<text class="txt-time">至</text>
						<text class="txt-time">{{item.end_time}}</text>
					</div>
					<view class="uni-flex uni-row marbottom" style="justify-content: space-between;">
						<view class="orderName">
							<text>{{item.order_name}}</text>
							<text>{{item.friend_number}}人{{item.check_in_count}}晚</text>
						</view>
						<view class="orderTime" v-if='item.order_status==1'>待确认</view>
						<view class="orderTime" v-if='item.order_status==2'>待入住</view>
						<view class="orderTime" v-if='item.order_status==3'>已入住</view>
						<view class="orderTime end" v-if='item.order_status==4'>已取消</view>
						<view class="orderTime end" v-if='item.order_status==5'>已结束</view>
					</view>
					<view class="uni-flex uni-row"  @click="orderPay(item.order_number)">
						<view class="orderImg">
							<image :src="imageUrl+item.house_img"></image>
						</view>
						<view class="orderDetail uni-flex">
							<view class="orderTitle">{{item.house_name}}</view>
							<view class="orderCont">基础价<text>{{item.other_money}}元</text></view>
							<view class="orderCont uni-flex">
								<view class="margin-right">套数:<text class="txt-orange">1</text></view>
								<view class="margin-right margin-right-width">总房费<text class="txt-orange">￥{{item.order_total_money}}.00</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniSegmentedControl,
			uniNavBar
		},
		data() {
			return {
				items: [
					'待确认',
					'待入住',
					'已入住',
					'已结束',
					'全部'
				],
				current: 4,
				colorIndex: 4,
				backgroundColor: '#ffffff',
				styleType: 'button',
				token: '',
				landlordOrderList: '',
				numIndex:0,
				imageUrl:'',
				isShow:false
			}
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.landlordInfo()
			// console.log('获取到的参数'+this.current)
		},
		computed: {
			num: function() {
				return this.$store.state.orderId
			}
		},
		methods: {
			onClickItem(index) {
				this.$store.state.orderId = index;
				this.landlordInfo()
			},
			styleChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.styleType = evt.target.value;
				}
			},
			colorChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.activeColor = evt.target.value;
				}
			},
			orderPay(order_number) {
				uni.navigateTo({
					url: "/pages/landlord/order/wait-confirm/wait-confirm?order_number="+ order_number
				})
			},
			cancel() {
				uni.navigateTo({
					url: "cancel"
				})
			},
			landlordInfo() {
				this.current = this.num
				// console.log('当前下标'+this.current)
				// console.log('请求的参数'+this.num)
				uni.request({
					url: this.getApp.api.landlordData.landLordOrder,
					method: 'POST',
					data: {
						orderStatus: this.current 
					},
					header:{
						token:this.token
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.landlordOrderList = res.data.lInfoEntities
						this.isShow=true
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: 1em;
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #ecf1f2;
		padding-top:70upx;
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}

	uni-radio-group uni-label {
		padding: 0;
	}

	.uni-list-item__container {
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-common-mt {
		margin-top: 0;
		background: #fff;
		width: 750upx;
		box-sizing: border-box;
		position:fixed;
		background:#fff;
		z-index: 99;
		border-bottom: 3upx solid #f0f0f0;
	}

	.uni-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.page-content {
		width: calc(100% - 60upx);
		height: 100%;
		padding: 40upx 30upx 30upx;
		position: relative;
		margin-bottom: 2upx;
		background-color: #ffffff;

	}

	.orderName {
		font-size: 24upx;
		color: #333333;
		line-height: 1em;

		text {
			margin-right: 25upx;
		}
	}

	.orderTime {
		font-size: 26upx;
		color: $uni-text-color-green;
		line-height: 1em;
	}

	.orderTime.end {
		color: #a0a0a0;
	}

	.orderImg {
		width: 125upx;
		height: 125upx;
		border-radius: 15upx;
		margin-right: 18upx;
	}

	.orderImg image {
		width: 125upx;
		height: 125upx;
		border-radius: 15upx;
	}

	.orderTitle {
		color: #5b5b5b;
		line-height: 1em;
		font-size: 26upx;
		padding: 0 0 20upx;
	}

	.orderCont {
		font-size: 24upx;
		color: #9a9a9a;
		line-height: 1em;
		padding-bottom: 14upx;

		text {
			margin-left: 15upx;
		}

		.margin-right {
			font-size: 24upx;
			margin-right: 10upx;
			width: 150upx;
		}

		.margin-right-width {
			width: 260upx;
		}
	}

	.orderPay {
		width: 100%;
		height: 104upx;
		align-items: center;
	}

	.orderBtn {
		font-size: 22upx;
		color: #a0a0a0;
	}

	.btnActive {
		color: $uni-text-color-green;
	}

	.order-code {
		font-size: 24upx;
		color: #717171;

		.txt {
			margin-right: 40upx;
		}
	}

	.order-time {
		font-size: 26upx;
		color: #333;
		font-weight: bold;

		.txt-time {
			margin-right: 20upx;
		}
	}

	.marbottom {
		margin: 0 0 30upx;
	}

	.orderDetail {
		flex-direction: column;
		justify-content: center;
	}

	.txt-orange {
		color: $uni-text-color-landlord;
	}
</style>
