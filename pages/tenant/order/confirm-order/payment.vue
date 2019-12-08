<template>
	<view class="paddingWrap">
		<view class="uni-flex uni-row title">
			<view>线上支付</view>
			<view><text>￥</text>{{onlinePayment}}.00</view>
		</view>
		<view class="uni-flex uni-column confirmWrap">
			<view class="uni-flex uni-row confirm">
				<view class="confirm-left">房费<text>{{checkInCount}}晚1套</text></view>
				<view class="confirm-right"><text>￥</text>{{houseRent}}.00</view>
			</view>
			<!-- <view class="confirm-list-wrap" v-if='checkInCount>1' >
				<view class="uni-flex uni-row confirm-list">
					<view>2019-05-23</view>
					<view>￥268.00</view>
				</view>
				<view class="uni-flex uni-row confirm-list">
					<view>2019-05-23</view>
					<view>￥268.00</view>
				</view>
			</view> -->
		</view>
		<view class="uni-flex uni-row confirmBot">
			<view> <text> 押金</text> <text class="text-left">(离店后退还)</text></view>
			<view class="text-right"><text>￥</text>{{deposit}}.00</view>
		</view>
	
<!-- 		<view class="uni-flex uni-row closeBtn">
			<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_close.png" @tap="togglePopup"></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlinePayment:'',
				checkInCount:'',
				houseRent:'',
				deposit:'',
			};
		},
		onLoad(e) {
			this.onlinePayment= e.onlinePayment
			this.checkInCount= e.checkInCount
			this.houseRent= e.houseRent
			this.deposit= e.deposit
		}
	}
</script>

<style lang="scss" scoped>
	.paddingWrap {
		width: calc(100% - 42upx);
		height: 100vh;
		padding: 0 20upx 0 20upx;
	}
	
	
	.paddingWrap .title {
		justify-content: space-between;
		padding: 30upx 0 0 0;
	}
	
	.paddingWrap .title view:nth-of-type(1) {
		color: #333333;
		font-size: 36upx;
	}
	
	.paddingWrap .title view:nth-of-type(2),
	.paddingWrap .title text {
		color: #ef516e;
		font-size: 32upx;
	}
	
	.confirmWrap {
		padding: 30upx 0;
		border-bottom: 1upx solid #f0f0f0;
	}
	
	.confirmWrap .confirm {
		justify-content: space-between;
		padding: 0 0 8upx 0;
	}
	
	.confirmWrap .confirm view:nth-of-type(1) {
		font-size: 28upx;
		color: #333333;
	}
	
	.confirmWrap .confirm view:nth-of-type(2) {
		font-size: 26upx;
		color: #333333;
	}
	
	.paddingWrap .confirm-list {
		justify-content: space-between;
		padding: 16upx 0 0 0;
		font-size: 26upx;
		color: #969696;
	}
	
	.confirmBot {
		justify-content: space-between;
		padding: 20upx 0;
	
	}
	
	.confirmBot text:nth-of-type(1) {
		font-size: 28upx;
		color: #606060;
	}
	
	.confirmBot text:nth-of-type(2) {
		font-size: 26upx;
		color: #606060;
	}
	
	.confirmBot .text-right {
		font-size: 26upx;
		color: #333333;
	}
	
	
	.closeBtn {
		width: 100%;
		height: 32upx;
		position: absolute;
		bottom: 30upx;
		text-align: center;
	}
	
	.closeBtn image {
		width: 32upx;
		height: 32upx;
		margin: 0 auto;
	}
</style>
