<template>
	<view class="container" v-if="isShow">
		<view class="paddingBot">
		<view class="top-title" v-if="confirmData.order_status==1">待确认</view>
		<view class="top-title" v-else-if="confirmData.order_status==2">待入住</view>
		<view class="top-title" v-else-if="confirmData.order_status==3">已入住</view>
		<view class="top-title disabled" v-else-if="confirmData.order_status==4">已取消</view>
		<view class="top-title disabled" v-else-if="confirmData.order_status==5">已结束</view>
		<view class="content">
			<view class="group uni-flex">
				<view class="label">订单号：</view>
				<view class="text">{{confirmData.order_number}}</view>
			</view>
			<view class="group uni-flex">
				<view class="label">下单时间：</view>
				<view class="text">{{confirmData.create_time | moment}}</view>
			</view>
		</view>
		<view class="title">收入信息</view>
		<view class="content">
			<view class="group uni-flex space-between">
				<view class="label">预计收入：</view>
				<view class="text">￥{{confirmData.house_price}}</view>
			</view>
			<view class="group uni-flex space-between">
				<view class="label">总房费：</view>
				<view class="text">￥{{confirmData.order_total_money}}.00</view>
			</view>
			<view class="group uni-flex space-between">
				<view class="label">预计服务费：</view>
				<view class="text">-￥{{confirmData.deposit}}</view>
			</view>
		</view>
		<view class="title">押金信息</view>
		<view class="content">
			<view class="group uni-flex">
				<view class="label">在线收取押金：</view>
				<view class="text">￥{{confirmData.deposit}}.00</view>
			</view>
			<view class="areatext">如要申请扣除押金，请提前与房东沟通。离店当日可以在线申请操作押金。</view>
		</view>
		<view class="title">预订信息</view>
		<view class="content">
			<view class="uni-flex mixi-container">
				<image class="img" :src="imageUrl+confirmData.house_img"></image>
				<view class="mixi-text uni-flex">
					<view class="subtitle">{{confirmData.house_name}}</view>
					<view class="subtext"><text>预订产品：</text>基础价</view>
					<view class="subtext"><text>预定套数：</text>1套</view>
				</view>
			</view>
		</view>
		<view class="content" style="">
			<view>
				<view class="group uni-flex space-between">
					<view class="uni-flex">
						<view class="label">入住人：</view>
						<view class="text">{{confirmData.friend_name}}</view>
					</view>
				</view>
				<view class="group uni-flex">
					<view class="label">入离日期：</view>
					<view class="text">
						<text>{{confirmData.start_time}}</text>
						<text>至</text>
						<text>{{confirmData.end_time}}</text>
						<text>共{{confirmData.check_in_count}}晚</text>
					</view>
				</view>
				<view @tap="openPersonalDetails(confirmData.order_number)" class="group uni-flex uni-row yudingImg" style="justify-content: space-between;">
					<view class="uni-flex uni-row">
						<view class="label">预订人：</view>
						<view class="text">
							<image class="photo" :src="imageUrl+confirmData.user_pic"></image>
						</view>
					</view>
					<view>
						<image class="icon-right" :src="imageUrl+'nav_right_icon@2x.png.png'" mode="widthFix"></image>
					</view>
				</view>
				<!-- <view class="group uni-flex">
					<view class="label">房屋经营数据</view>
					<view class="text"></view>
				</view> -->
			</view>
		</view>
		</view>
		<view class="content" v-if="confirmData.order_status==1">
			<view class="footer uni-flex">
				<view class="foot-left">
					<image class="icon" :src="imageUrl+'orderdetails_time_icon.png'" mode="widthFix"></image>
					<text>28分46秒后自动拒单</text>
				</view>
				<view class="btn-group uni-flex">
					<button class="btn" @tap="cancel">拒绝订单</button>
					<button class="btn btn-green" @tap="confirm">确认订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNumber: '',
				confirmData: {},
				token: '',
				imageUrl:'',
				isShow:false
			}
		},
		onLoad(e) {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.orderNumber = e.order_number
			console.log(this.orderNumber)
			this.getOrderInfo()
		},
		methods: {
			openPersonalDetails(orderNumber) {
				uni.navigateTo({
					url: '/pages/landlord/order/personal-details/personal-details?orderNumber='+orderNumber
				});
			},
			getOrderInfo(){
				uni.request({
					url: this.getApp.api.landlordData.orderDetail,
					method: 'POST',
					data: {
						orderNumber: this.orderNumber
					},
					header:{
						token:this.token
					},
					success: res => {
						console.log(JSON.stringify(res))
						this.confirmData = res.data
						console.log(JSON.stringify(this.confirmData))
						this.isShow=true
					}
				});
			},
			cancel(){
				uni.request({
					url: this.getApp.api.landlordData.orderConfirm,
					method: 'POST',
					data: {
						orderNumber: this.confirmData.order_number,
						houseId: this.confirmData.house_id,
						startTime: this.confirmData.start_time,
						endTime: this.confirmData.end_time,
						confirmStatus: 2
					},
					header: {
						token: this.token
					},
					success: res => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							uni.switchTab({
								url:'/pages/main/tabbar3/tabbar3'
							})
						}
					}
				});
			},
			confirm() {
				uni.request({
					url: this.getApp.api.landlordData.orderConfirm,
					method: 'POST',
					data: {
						orderNumber: this.confirmData.order_number,
						houseId: this.confirmData.house_id,
						startTime: this.confirmData.start_time,
						endTime: this.confirmData.end_time,
						confirmStatus: 1
					},
					header: {
						token: this.token
					},
					success: res => {
				//		console.log(JSON.stringify(res))
						if(res.data.code==0){
							uni.switchTab({
								url:'/pages/main/tabbar3/tabbar3'
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
		line-height: 1em;
	}

	.icon-right {
		width: 32upx;
		height: 32upx;
	}

	.container {
		min-height: 100vh;
		background: #fff;

		.title {
			height: 88upx;
			line-height: 88upx;
			font-size: 28upx;
			color: #333;
			font-weight: bold;
			padding: 0 30upx;
			// border-bottom: 1px solid #f6f6f6;
			background:#f8f9fb;
		}

		.content {
			background: #fff;
			border-top: 1px solid #f6f6f6;
			padding: 30upx;

			.mixi-container {
				.img {
					width: 135upx;
					height: 135upx;
					border-radius: 15upx;
					margin-right: 12upx;
					vertical-align: top;
				}

				.mixi-text {
					justify-content: center;
					flex-direction: column;

					.subtitle {
						color: #333;
						line-height: 1em;
						font-size: 24upx;
						padding: 0 0 20upx;
					}

					.subtext {
						font-size: 22upx;
						color: #333;
						line-height: 1em;
						padding-bottom: 14upx;

						text {
							color: #5b5b5b;
						}
					}
				}
			}

			.group {
				margin: 0 0 30upx;

				.photo {
					width: 45upx;
					height: 45upx;
					border-radius: 50%;
					vertical-align: top;
					margin-top: -8upx;
				}

				.label {
					font-size: 22upx;
					color: #666;
				}

				.text {
					font-size: 22upx;
					color: #333;
				}

				.yudingImg {}
			}

			.areatext {
				line-height: 1.4;
				font-size: 22upx;
				color: #333;
			}

			.group:last-child {
				margin: 0;
			}

			.space-between {
				justify-content: space-between;
			}
		}

		.top-title {
			// width: calc(100% - 60upx);
			width:100%;
			text-align: center;
			height: 88upx;
			line-height: 88upx;
			padding: 0 30upx;
			background: #fff;
			color: $uni-text-color-green;
			font-size: 26upx;
			border-buttom: 1px solid #f6f6f6;
		}
		.top-title.disabled{
			color:#a0a0a0;
		}

		.footer {
			position: fixed;
			bottom: 0;
			z-index: 99;
			// justify-content: space-between;
			background: #ffffff;
			width:690upx;
			height:98upx;
			justify-content: space-between;
			.foot-left {
				line-height: 54upx;
				font-size: 20upx;
				color: #666;
				display: flex;
				align-items: center;
			}

			.icon {
				width: 30upx;
				height: 30upx;
				vertical-align: middle;
				margin-right: 15upx;
			}

			.btn-group {
				align-items: center;
				.btn {
					width: 130upx;
					height: 54upx;
					line-height: 54upx;
					font-size: 24upx;
					padding: 0;
					margin-left: 30upx;
				}

				.btn-green {
					color: #fff;
					background: $uni-color-level-gradual;
				}
			}
		}
	}
	.paddingBot{
		padding-bottom:64upx;
	}
</style>
