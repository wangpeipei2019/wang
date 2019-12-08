<template>
	<view class="orderPay" v-if="isShow">
		<view class="paddingBot">
		<view class="paybBanner">
			<view class="uni-flex uni-column" v-if="houseData.order_status==0" style="justify-content: center;text-align: center;">
				<view class="orderTitle">待付款</view>
				<view class="time">支付剩余时间:
					<text>39分34秒</text>
				</view>
				<view class="oderAsk">我们将为您保留40分钟，请尽快支付</view>
			</view>
	
			<view class="uni-flex uni-column" v-else-if="houseData.order_status==1" style="justify-content: center;text-align: center;">
				<view class="orderCancelTitle">待确认</view>
				<!-- <view class="oderAsk"></view> -->
			</view>
			<view class="uni-flex uni-column" v-else-if="houseData.order_status==2" style="justify-content: center;text-align: center;">
				<view class="orderCancelTitle">待入住</view>
				<!-- <view class="oderAsk"></view> -->
			</view>
			<view class="uni-flex uni-column" v-else-if="houseData.order_status==3" style="justify-content: center;text-align: center;">
				<view class="orderCancelTitle">进行中</view>
				<!-- <view class="oderAsk"></view> -->
			</view>
			<view class="uni-flex uni-column" v-else-if="houseData.order_status==4" style="justify-content: center;text-align: center;">
				<view class="orderCancelTitle">已取消</view>
				<!-- <view class="oderAsk"></view> -->
			</view>
			<view class="uni-flex uni-column" v-else-if="houseData.order_status==5" style="justify-content: center;text-align: center;">
				<view class="orderCancelTitle">已结束</view>
				<!-- <view class="oderAsk"></view> -->
			</view>
		</view>	
		<view class="payCont">

			<view class="uni-flex confirm-trip">
				<view class="uni-flex uni-column uni-flex-item">
					<view class="time-day">入住时间</view>
					<view class="date">{{houseData.start_time}}</view>
					<view class="time-day">{{houseData.check_in_time}}</view>
				</view>
				<view class="uni-flex uni-column uni-flex-item-time">
					<view :style="{backgroundImage:'url('+urlImage+'nav_bground.png)'}" class="night">{{houseData.check_in_count}}晚</view>
				</view>
				<view class="uni-flex uni-column uni-flex-item">
					<view class="time-day">离开时间</view>
					<view class="date">{{houseData.end_time}}</view>
					<view class="time-day">{{houseData.check_out_time}}</view>
				</view>
			</view>
			<view class="uni-flex uni-row orderDetail border-bottom">
				<view class="img">
					<image :src="urlImage+houseData.house_img"></image>
				</view>
				<view>
					<view class="title">{{houseData.house_name}}</view>
					<view class="num">房间数量：1套</view>

				</view>
			</view>
			<view class="uni-flex uni-column payDetail border-bottom">
				<view class="uni-flex uni-row name">
					<view>房费</view>
					<view>￥{{houseData.house_price}}</view>
				</view>
				<view class="uni-flex uni-row name">
					<view>押金</view>
					<view>￥{{houseData.deposit}}</view>
				</view>
				<view class="uni-flex uni-row name">
					<view>订金总额</view>
					<view>￥{{houseData.order_total_money}}</view>
				</view>
				<view class="uni-flex uni-row payAll">
					<view>线上支付</view>
					<view class="value">￥{{houseData.order_total_money}}</view>
				</view>
			</view>

			<view class="uni-flex uni-row landlord border-bottom" @tap="landlordDetails(houseData.order_number)">
				<view class="img uni-flex uni-row">
					<view>
						<image :src="urlImage+houseData.user_pic"></image>
					</view>
					<view>
						<view class="title">{{houseData.user_name}}</view>
						<view class="name">房东</view>
					</view>
				</view>
				<view class="jian">
					<image style="width: 40upx;height: 40upx;" :src="urlImage+'nav_right_icon@2x.png.png'"></image>
					
				</view>
			</view>
			<view class="uni-flex uni-row refund  border-bottom" @click="refund(houseData.house_id,houseData.start_time)">
				<view>
					<view class="title">退款政策</view>
					<view class=" name">{{houseData.start_time}} 12:00前免费取消</view>
				</view>
				<view class="jian">
					<image :src="urlImage+'nav_right_icon@2x.png.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-column check border-bottom">
				<view>
					<view class="title">入住人信息</view>
				</view>
				<view class="uni-flex uni-row checkList" v-for="item in houseData.friendInfoList" :key="item.id">
					<view class="uni-flex uni-row">
						<view class=" name">{{item.friendName}}</view>
						<view class="IDfirst"></view>
						<view class="name">{{item.friendCard}}</view>
					</view>
					<view class="success">
						验证成功
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column phone">
				<view class="uni-flex uni-row">
					<view class="title">联系人：</view>
					<view class="name">{{houseData.order_name}}</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="title">手机号：</view>
					<view class="name">{{houseData.order_phone}}</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="title">订单号：</view>
					<view class="name">{{houseData.order_number}}</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="title">下单时间：</view>
					<view class="name">{{houseData.create_time | moment}}</view>
				</view>
			</view>
		</view>
		</view>
		<view class="uni-flex uni-row footer" v-if="houseData.order_status==0">
			<view class="left" @tap="orderCancel">订单取消</view>
			<view class="right" @click="pay">去支付</view>
		</view>
		<view class="uni-flex uni-row cancelFooter" @tap="againHouse" v-if="houseData.order_status==4||houseData.order_status==5">
			<view class="center">重新找房</view>
		</view>
		<view class="uni-flex uni-row cancelFooter" v-if="houseData.order_status==3" @tap="houseCheckOut">
			<view class="center">退房</view>
		</view>
		<view class="uni-flex uni-row footer" v-if="houseData.order_status==2">
			<view class="left" @tap="orderCancel">订单取消</view>
			<view class="right" @tap="confirmCheckIn">确认入住</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				houseData: {},
				orderNumber: '',
				token: '',
				urlImage: '',
				startTime:'',
				endTime:'',
				houseId:'',
				isShow:false
			}
		},
		onLoad(e) {
			this.token = uni.getStorageSync('token');
			this.urlImage = this.getApp.api.urlImage
			this.orderNumber = e.order_number
			this.getPayInfo()
		},
		methods: {
			houseCheckOut(){
				uni.request({
					url: this.getApp.api.order.houseCheckOut,
					method: 'POST',
					data: {
						orderNumber:this.orderNumber
					},
					header:{
						token:this.token
					},
					success: res => {
						if(res.data.code==0){
							uni.switchTab({
								url:'/pages/main/tabbar3/tabbar3'
							})
						}
					}
				});
			},
			confirmCheckIn(){
				uni.request({
					url: this.getApp.api.order.confirmCheckIn,
					method: 'POST',
					data: {
						orderNumber:this.orderNumber
					},
					header:{
						token:this.token
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
			},
			landlordDetails(orderNumber) {
				uni.navigateTo({
					url: '/pages/tenant/landlord/landlord-detail?orderNumber='+orderNumber
				});
			},
			getPayInfo() {
				uni.request({
					url: this.getApp.api.tenant.orderDetail,
					method: 'POST',
					data: {
						orderNumber: this.orderNumber
					},
					header: {
						token: this.token
					},
					success: res => {
						this.houseData = res.data
						this.startTime = res.data.start_time
						this.endTime = res.data.end_time
						this.houseId = res.data.house_id
						this.isShow=true
					}
				});
			},
			againHouse(){
				uni.switchTab({
					url:'/pages/main/tabbar0/tabbar0'
				})
			},
			refund(id,startTime) {
				uni.navigateTo({
					url: "code?id="+id+'&startTime='+startTime
				})
			},
			orderCancel(){
				uni.request({
					url: this.getApp.api.order.orderCancel,
					method: 'POST',
					data: {
						orderNumber: this.orderNumber,
						startTime:this.startTime,
						endTime:this.endTime,
						houseId:this.houseId
					},
					header: {
						token: this.token
					},
					success: res => {
						if(res.data.code==0){
							uni.switchTab({
								url:'/pages/main/tabbar3/tabbar3'
							})
						}
					}
				});
			},
			pay() {
				uni.navigateTo({
					url: "order_pay/order_pay?orderTotalMoney=" + this.houseData.order_total_money + '&orderNumber=' + this.orderNumber
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.paybBanner {
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #ecf1f2;
	}
	.orderCancelTitle {
		font-size: 36upx;
		color:$uni-text-color-pay;
		line-height: 1em;
		padding-top: 20upx;
		padding-bottom: 40upx;
	}
	.orderTitle {
		font-size: 36upx;
		color: $uni-text-color-green;
		line-height: 1em;
		padding-top: 20upx;
	}
	.time {
		font-size: 24upx;
		color: #333333;
		line-height: 1em;
		padding-top: 28upx;
	}
	.time text {
		color: $uni-text-color-green;
	}
	.oderAsk {
		font-size: 22upx;
		color: #666666;
		line-height: 1em;
		padding-top: 22upx;
		padding-bottom: 40upx;
	}
	.payCont {
		width: calc(100% - 60upx);
		padding: 0 30upx;
	}
	.border-bottom {
		border-bottom: 1upx solid #ecf1f2;
	}
	.confirm-trip {
		height: 180upx;
		padding: 0 60upx;
		view {
			line-height: 1em;
		}
		.uni-flex-item-time {
			width: 140upx;
			text-align: center;
			.night {
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 92upx;
				height: 40upx;
				line-height: 40upx;
				font-size: 22upx;
				text-align: center;
				margin-top: 70upx;
				margin: 70upx auto 0 auto;
			}
		}
		.uni-flex-item {
			align-items: center;
			justify-content: center;
			.time-day {
				font-size: 22upx;
				color: #666;
			}
			.date {
				font-size: 36upx;
				color: #000;
				font-weight: bold;
				margin: 18upx 0;
			}
		}
	}
	.payCont {
		.orderDetail {
			background: #FFFFFF;
		/* 	padding-top: 54upx; */
			padding-bottom: 30upx;
			justify-content: flex-start;

			.img {
				width: 130upx;
				height: 130upx;
				margin-right: 18upx;

				image {
					width: 130upx;
					height: 130upx;
					border-radius: 15upx;
				}
			}
		}
	}
	.orderDetail .title {
		font-size: 26upx;
		color: #333333;
		line-height: 1em;
		padding-top: 30upx;
	}
	.orderDetail .num {
		font-size: 24upx;
		color: #666666;
		line-height: 1em;
		padding-top: 16upx;
	}
	.payDetail {
		background: #FFFFFF;
		padding-top: 22upx;
		padding-bottom: 36upx;
	}
	.payDetail .uni-row {
		justify-content: space-between;
		padding-top: 14upx;
	}
	.payDetail .name {
		font-size: 26upx;
		color: #666666;
		line-height: 1em;
	}
	.payDetail .value {
		color:$uni-text-color-pay;
		font-size: 26upx;
		line-height: 1em;
	}
	.payDetail .payAll {
		font-size: 26upx;
		color: #333333;
		padding-top: 28upx;
		font-weight: bold;
		line-height: 1em;
	}
	.landlord {
		padding: 38upx 0 30upx 0;
		justify-content: space-between;
	}
	.landlord .img image {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin-right: 14upx;
		vertical-align: top;
	}
	.landlord .title {
		font-size: 26upx;
		color: #333333;
		padding-top: 8upx;
		line-height: 1em;
	}
	.landlord .name {
		font-size: 22upx;
		color: #999999;
		padding-top: 14upx;
		line-height: 1em;
	}
	.landlord .jian {
		position: relative;
		top: 30upx;
	}
	.refund .jian image {
		width: 40upx;
		height: 40upx;
	}
	.refund {
		justify-content: space-between;
	}
	.refund .jian {
		position: relative;
		top: 50upx;
	}
	.refund .title {
		font-size: 26upx;
		line-height: 1em;
		color: #333333;
		padding-top: 34upx;
	}
	.refund .name {
		font-size: 26upx;
		line-height: 1em;
		color: $uni-text-color-green;
		padding: 34upx 0 30upx 0;
	}
	.check {
		padding: 30upx 0 20upx 0;
		justify-content: space-between;
	}
	.check .title,
	.check .name {
		font-size: 26upx;
		color: #666666;
		padding-top: 4upx;
		line-height: 1em;
	}
	.check .name {
		padding-top: 24upx;
		line-height: 1em;
	}
	.check .IDfirst {
		width: 4upx;
		height: 20upx;
		background: #666666;
		margin: 30upx 15upx 0 15upx;
	}
	.success {
		font-size: 26upx;
		color: $uni-text-color-green;
		margin: 20upx 0 0 0;
	}
	.checkList{
		justify-content: space-between;
	}
	.phone {
		padding: 30upx 0;
	}
	.phone .title {
		font-size: 26upx;
		color: #666666;
		width: 130upx;
		height: 42upx;
	}
	.phone .name {
		font-size: 26upx;
		color: #666666;
	}
	.footer {
		height: 98upx;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 10;
		margin-top:110upx;
		background-color: #ffffff;
	}
	.footer .left,
	.footer .right {
		text-align: center;
		line-height: 98upx;
	}
	.footer .left {
		font-size: 22upx;
		color: #999999;
		width: 40%;
		background-color: #ffffff;
	}
	.footer .right {
		font-size: 26upx;
		width: 60%;
		color: #FFFFFF;
		background: $uni-color-level-gradual;
	}
	.cancelFooter {
		height: 98upx;
		text-align: center;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 10;
		font-size: 26upx;
		color: #FFFFFF;
		background: $uni-color-level-gradual;
		justify-content: center;
	}
	.cancelFooter .center {
		line-height: 98upx;
	}
	.paddingBot{
		padding-bottom: 110upx;
	}
</style>
