<template>
	<view class="landord">
		<view class="landordImg">
			<view>
				<image class="langordIcon" :src="urlImage+userAvatar"></image>
				<view class="landordName">{{userName}}</view>
			</view>
		</view>
		<view class="landordWrap">
			<view class="verification">
				<view class="landordTitel">已验证信息</view>
				<view class="">
					<view style="width: 200upx; display: inline-block;" v-if="idCrad==1">
						<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon2@2x.png'"></image>
						<view class="imgR">身份证</view>
					</view>
					<view style="width: 200upx; display: inline-block;" v-if="phone==1">
						<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon2@2x.png'"></image>
						<view class="imgR">手机号</view>
					</view>
					<view style="width: 200upx; display: inline-block;" v-if="email==1">
						<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon2@2x.png'"></image>
						<view class="imgR">电子邮箱</view>
					</view>
				</view>
			</view>
			<view class="detailList">
				<view class="title">订单信息</view>
				<view class="uni-flex uni-row">
					<view class="text">TA的订单数：</view>
					<view class="text">{{orderCount}}个</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="text">房东确认订单后他的取消率：</view>
					<view class="text">{{confirmationRate}}%</view>
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
				urlImage:'',
				userAvatar: '',
				userName: '',
				idCrad: 0,
				phone: 0,
				email: 0,
				orderCount: 0,
				confirmationRate: 0,
			}
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.orderNumber = e.orderNumber
			this.userOrderInfo()
		},
		methods: {
			userOrderInfo() {
				uni.request({
					url: this.getApp.api.landlordData.userOrderInfo,
					method: 'POST',
					data: {
						orderNumber: this.orderNumber
					},
					success: res => {
						this.userAvatar = res.data.userAvatar
						this.userName = res.data.userName
						this.idCrad = res.data.idCrad
						this.phone = res.data.phone
						this.email = res.data.email
						this.orderCount = res.data.orderCount
						this.confirmationRate = res.data.confirmationRate
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.landordImg {
		width: 100%;
		height: 412upx;
		background-image: url("http://113.200.212.12/ymshapi/api/location/Landlord20_bg.jpg");
		background-size: contain;
	}

	.langordIcon {
		width: 98upx;
		height: 98upx;
		position: relative;
		top: 120upx;
		left: calc(50% - 49upx);
		border-radius: 50%;
	}

	.landordName {
		color: #ffffff;
		position: absolute;
		top: 240upx;
		width: 100%;		text-align: center;
	}

	.landordWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		height: calc(100vh - 412upx);
	}

	.landordTitel,
	.detailList .title {

		font-size: 26upx;
		color: #434343;
		line-height: 1em;
		padding-top: 48upx;
		padding-bottom: 38upx;
	}

	.detailList .text {
		font-size: 22upx;
	}

	.detailList {
		width: 100%;
		padding-bottom: 35upx;
		border-bottom: 1upx solid #e6e6e6;
	}

	.verification {
		width: calc(100% - 60upx);
		width: 100%;
		height: 180upx;
		border-bottom: 1upx solid #e6e6e6;
	}

	.verification image {
		width: 32upx;
		height: 32upx;
		display: inline-block;
		vertical-align: top;
		position: relative;
		top: 0;
	}

	.verification .imgIcon {
		width: 32upx;
		height: 32upx;
		display: inline-block;
		position: relative;
		top: -8upx;
	}

	.imgR {
		display: inline-block;
		font-size: 22upx;
		line-height: 1em;
		position: relative;
		top: -16upx;
		margin: 0;
	}
</style>
