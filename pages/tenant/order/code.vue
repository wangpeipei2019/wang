<template>
	<view class="code" v-if="isShow">
		<!-- <view class="title">退款政策</view> -->
		<view class="name">入住日前一天取消全额退款</view>
		<view class="timeLine">
			<view class="line"></view>
			<view class="uni-flex uni-column img">
				<view class="uni-flex uni-row ">
					<view class="imgBg">
						<image :src="urlImage+'wooden_refund_time@2x.png'"></image>
					</view>
					<view class="time">订单成功</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="text">如取消订单。全额退款</view>
				</view>
				<view class="uni-flex uni-row ">
					<view class="imgBg">
						<image :src="urlImage+'wooden_refund_time@2x.png'"></image>
					</view>
					<view class="time">{{ closingDate }}&nbsp;12:00</view>
				</view>
				<view class="uni-flex uni-row ">
					<view class="text">如取消订单，扣除未住房费的{{ RulePercentage }}%</view>
				</view>
				<view class="uni-flex uni-row ">
					<view class="imgBg">
						<image :src="urlImage+'wooden_refund_time@2x.png'"></image>
					</view>
					<view class="time">{{ startDate }}&nbsp;12:00</view>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row tishi">
			<view class="tishiline" style="width: 88upx; ">
				<view class=""></view>
			</view>
			<view>
				<image :src="urlImage+'tishi.png'"></image>
			</view>
			<view>
				<view class="tishitext">温馨提示</view>
			</view>
			<view>
				<image style="margin-right: 10upx;" :src="urlImage+'tishi.png'"></image>
			</view>
			<view class="tishiline" style="width: 88upx;">
				<view></view>
			</view>
		</view>
		<view class="ask">订单的取消时间以一木木屋系统中记录的取消订单时间为准</view>
		<view class="close" @tap="close">
			<image :src="urlImage+'nav_icon_close.png'"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlImage: '',
				isShow: false,
				id:'',
				startTime:'',
				RulePercentage:'',
				startDate:'',
				closingDate:''
			}
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.id = e.id
			this.startTime = e.startTime
			this.refundPolicy()
		},
		methods: {
			refundPolicy(){
				uni.request({
					url: this.getApp.api.order.refundPolicy,
					method: 'POST',
					data: {
						houseId: this.id,
						startTime:this.startTime
					},
					success: res => {
						if(res.data.code==0){
							this.RulePercentage = res.data.RulePercentage
							this.startDate = res.data.startDate
							this.closingDate = res.data.closingDate
							this.isShow = true
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			close() {
				uni.navigateBack({});
			}
		}
	}
</script>

<style scoped>
	.code {
		padding: 0 30upx;
	}

	.code .title {
		font-size: 36upx;
		color: #000000;
		line-height: 1em;
		/* padding: 26upx 0; */
		padding: 60upx 0 26upx 0;
		text-align: center;
	}

	.code .name {
		font-size: 28upx;
		color: #333333;
		font-weight: bold;
		line-height: 1em;
		padding: 26upx 0 62upx;
	}

	.code .line {
		position: absolute;
		position: relative;
		height: 360upx;
		width: 1upx;
		border-right: 4upx dashed #333333;
		padding-left: 43upx;
	}

	.img {
		position: absolute;
		top: 232upx;
		top:110upx;
		padding-left: 24upx;
		z-index: 99999;
	}

	.code .img image {
		width: 42upx;
		height: 42upx;
		vertical-align: top;

	}

	.code .time {
		font-size: 22upx;
		color: #999999;
		padding-left: 22upx;
		line-height: 1em;
		padding-top: 14upx;
	}

	.code .text {
		font-size: 24upx;
		color: #333333;
		line-height: 1em;
		padding: 46upx 0 46upx 64upx;
	}

	.code .ask {
		font-size: 22upx;
		color: #666666;
		text-align: center;
	}

	.tishitext {
		text-align: center;
		font-size: 22upx;
		color: #999999;
		width: 100upx;
		line-height: 1em;

	}

	.tishi {
		padding-top: 40upx;
	}

	.tishi .left {
		width: 110upx;
	}

	.tishi .right {
		width: 110upx;
	}

	.tishi {
		justify-content: center;
	}

	.tishiline {
		width: 80upx;
		height: 1upx;
		background: #C8C7CC;
		margin-right: 10upx;
		position: relative;
		top: 14upx;
	}

	.tishi image {
		width: 12upx;
		height: 12upx;
		vertical-align: top;
		position: relative;
		top: 7upx;
	}

	.close {
		width: 32upx;
		height: 32upx;
		position: absolute;
		bottom: 144upx;
		left: calc(50% - 16upx);

	}

	.close image {
		width: 32upx;
		height: 32upx;
	}

	.timeLine .imgBg {
		width: 46upx;
		height: 46upx;
		background-color: #ffffff;
		border-radius: 50%;
	}
</style>
