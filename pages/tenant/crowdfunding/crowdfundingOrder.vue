<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="openBack" title="我的订单"></uni-nav-bar>
		<view class="order">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="cont">
						<view class="orderList" @tap="orderDetail(item.order_number)" v-for="(item,index) in CrowdFundingOrderEntity" :key="index">
							<view class="uni-flex uni-row top">
								<view>认购订单</view>
								<view class="payColor">待支付</view>
							</view>
							<view class="uni-flex uni-row bottom border-bottom">
								<view class="left">
									<image :src="urlImage+item.crowd_funding_pictures"></image>
								</view>
								<view class="right">
									<view class="title">{{item.project_name}}</view>
									<view class="uni-flex uni-row text">
										<view class="textSet">方案：{{item.programme_title}}</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>份数：{{item.order_count}}份</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>订单金额：￥{{item.order_money}}.00</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>下单时间：{{item.create_time | moment}}</view>
									</view>
								</view>
							</view>
							<view class="uni-flex uni-row button">
								<view>剩余支付时间：14:20</view>
								<view>去支付</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="cont">
						<view class="orderList" @tap="orderDetail(item.order_number)" v-for="(item,index) in CrowdFundingOrderEntity" :key="index">
							<view class="uni-flex uni-row top">
								<view>认购订单</view>
								<view>已支付</view>
							</view>
							<view class="uni-flex uni-row bottom">
								<view class="left">
									<image :src="urlImage+item.crowd_funding_pictures"></image>
								</view>
								<view class="right">
									<view class="title">{{item.project_name}}</view>
									<view class="uni-flex uni-row text">
										<view class="textSet">方案：{{item.programme_title}}</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>份数：{{item.order_count}}份</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>订单金额：￥{{item.order_money}}.00</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>下单时间：{{item.create_time | moment}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>  
				<view v-show="current === 2">
					<view class="cont">
						<view class="orderList" @tap="orderDetail(item.order_number)" v-for="(item,index) in CrowdFundingOrderEntity" :key="index">
							<view class="uni-flex uni-row top">
								<view>认购订单</view>
								<view>{{item.order_status==2?'已取消':item.order_status==4?'已失效':'暂无数据'}}</view>
							</view>
							<view class="uni-flex uni-row bottom">
								<view class="left">
									<image :src="urlImage+item.crowd_funding_pictures"></image>
								</view>
								<view class="right">
									<view class="title">{{item.project_name}}</view>
									<view class="uni-flex uni-row text">
										<view class="textSet">方案：{{item.programme_title}}</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>份数：{{item.order_count}}份</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>订单金额：￥{{item.order_money}}.00</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>下单时间：{{item.create_time | moment}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="current === 3">
					<view class="cont">
						<view class="orderList" @tap="orderDetail(item.order_number)" v-for="(item,index) in CrowdFundingOrderEntity" :key="index">
							<view class="uni-flex uni-row top">
								<view>认购订单</view>
								<view :class="{payColor:item.order_status==0}">{{item.order_status==0?'待支付':item.order_status==1?'已支付':item.order_status==2?'已取消':item.order_status==4?'已失效':'暂无数据'}}</view>
							</view>
							<view class="uni-flex uni-row bottom" :class="{'border-bottom':item.order_status==0}">
								<view class="left">
									<image :src="urlImage+item.crowd_funding_pictures"></image>
								</view>
								<view class="right">
									<view class="title">{{item.project_name}}</view>
									<view class="uni-flex uni-row text">
										<view class="textSet">方案：{{item.programme_title}}</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>份数：{{item.order_count}}份</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>订单金额：￥{{item.order_money}}.00</view>
									</view>
									<view class="uni-flex uni-row text">
										<view>下单时间：{{item.create_time | moment}}</view>
									</view>
								</view>
							</view>
							<view class="uni-flex uni-row button" v-if="item.order_status==0">
								<view>剩余支付时间：14:20</view>
								<view>去支付</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniNavBar,
			uniSegmentedControl,
		},
		data() {
			return {
				items: [
					'待支付',
					'已支付',
					'已结束',
					'全部'
				],
				current: 3,
				colorIndex: 3,
				backgroundColor: '#ffffff',
				styleType: 'button',
				token: '',
				CrowdFundingOrderEntity: [],
				urlImage: '',
				isShow: false
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.urlImage = this.getApp.api.urlImage
			this.getOrderList(4)
		},
		methods: {
			getOrderList(status) {
				uni.request({
					url: this.getApp.api.crowdFunding.orderList,
					method: 'POST',
					data: {
						orderStatus: status
					},
					header: {
						token: this.token
					},
					success: res => {
						this.CrowdFundingOrderEntity = res.data.CrowdFundingOrderEntity
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					this.getOrderList(this.current)
				}
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
			openBack() {
				uni.navigateBack({});
			},
			orderDetail(orderNumber) {
				uni.navigateTo({
					url: '/pages/tenant/crowdfunding/orderDetail?orderNumber=' + orderNumber
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: calc(100vh - 220upx);
		overflow: auto;
		border-top:3upx solid #f0f0f0;
	}

	.cont {
		width: calc(100% - 36upx);
		padding: 28upx 18upx 15upx 18upx;

	}

	.orderList {
		width: calc(100% - 40upx);
		padding: 0 18upx 0 18upx;
		border-radius: 10upx;
		border: 1upx solid #e9e9e9;
		box-shadow: 0upx 2upx 15upx #dcdcdc;
		margin-bottom: 30upx;
	}

	.cont .top {
		justify-content: space-between;
		width: 100%;
		height: 95upx;
		font-size: 26upx;
	}

	.cont .top view {
		line-height: 95upx;
	}

	.payColor {
		color: $uni-text-color-green;
	}

	.cont .bottom {
		width: 100%;
		padding: 38upx 0 15upx 0;
		border-top: 1upx solid #f5f5f8;
	}

	.cont .bottom.border-bottom {
		border-bottom: 1upx solid #f5f5f8;
	}

	.cont .bottom image {
		width: 150upx;
		height: 100upx;
		vertical-align: top;
		margin-right: 18upx;
		background: #d5d5d5;
	}

	.cont .bottom .title {
		font-size: 34upx;
		color: #3d3d3d;
		font-weight: bold;
		line-height: 1em;
	}

	.cont .bottom .text {
		font-size: 26upx;
		color: #2c2c2f;
	}

	// .textSet {
	// 	width: 80upx;
	// 	line-height: 43upx;
	// }

	// .cont .bottom .text view:nth-of-type(1) {
	// 	margin-right: 18upx;
	// }

	.cont .bottom .text view:nth-of-type(1),
	.cont .bottom .text view:nth-of-type(2) {
		line-height: 43upx;
	}

	.cont .button {
		justify-content: space-between;
		padding: 0 5upx;
		height: 100upx
	}

	.cont .button :nth-of-type(1) {
		color: $uni-text-color-green;
		line-height: 100upx;
	}

	.cont .button :nth-of-type(2) {
		width: 215upx;
		height: 75upx;
		line-height: 75upx;
		margin-top: 12upx;
		text-align: center;
		color: #ffffff;
		background: $uni-color-level-gradual;
	}
</style>
