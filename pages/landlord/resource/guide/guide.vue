<template><!-- 需填入数据 -->
	<view class="guide" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="back" title='入住指引'></uni-nav-bar>
		<view class="guideTop">
			<view class="title">特色住宅小区</view>
			<image :src="urlImage+'scenicspot_house1@2x.jpg'"></image>
		</view>
		<view class="guideWay">
			<view class="uni-flex uni-row top">
				<view>入住方式</view>
				<view @tap="openCheckIn">编辑</view>
			</view>
			<view class="title">智能门锁</view>
			<view class="text">房东发送开锁密码，用户输入打开门锁即可入住</view>
		</view>
		<view class="uni-flex uni-row note">
			<view></view>
			<view>注意事项</view>
			<view></view>
		</view>
		<view class="Description">
			<view class="uni-flex uni-row top">
				<view>接待说明</view>
				<view @tap="openClaim">编辑</view>
			</view>
			<view class="uni-flex uni-row timeList">
				<view class="time">
					<view>入住时间</view>
					<view>15:00</view>
				</view>
				<view class="time">
					<view>离店时间</view>
					<view>15:00</view>
				</view>
				<view class="time">
					<view>接待时间</view>
					<view>10:00-17:00</view>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row prompt">
			<view>设施使用指南</view>
			<view @tap="openFacility">去添加</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	export default{
		components: {
			uniNavBar,
			uniIcon
		},
		data(){
			return{
				urlImage:'',
				isShow:false
			}
		},
		created() {
			this.urlImage = this.getApp.api.urlImage
			this.isShow=true
		},
		methods: {
			back() {
				 uni.navigateBack({})
			},
			openCheckIn(){
				uni.navigateTo({
					url: '/pages/landlord/resource/guide/checkInMethod'
					
				});
			},
			openFacility(){
				uni.navigateTo({
					url: '/pages/landlord/resource/guide/facility'
					
				});
			},
			openClaim(){
				uni.navigateTo({
					url:'/pages/landlord/resource/guide/claim'
				})
			}
		}
	}
</script>

<style>
	view{
		line-height: 1em;
	}
	.guide{
		width: 100%;
		height: 100vh;
		background-color: #f8f8fb;
	}
	.guideTop{
		width: calc(100% - 60upx);
		padding: 0 30upx 34upx 30upx;
		border-top: 1upx solid #8f8f8f;
		background-color: #ffffff;
		margin-bottom: 12upx;
	}
	.guideTop .title{
		font-size: 38upx;
		color: #3d3d3d;
		padding: 26upx 0 30upx 0;
	}
	.guideTop image{
		width: 100%;
		height: 300upx;
	}
	.guideWay{
		width: calc(100% - 60upx);
		height: 160upx;
		padding: 40upx 30upx;
		background-color: #ffffff;
		border-bottom: 1upx solid #f1f1f1;
	}
	.guideWay .top{
		justify-content: space-between;
	}
	.guideWay .top view:nth-of-type(1){
		font-size: 30upx;
		color: #3d3d3d;
	}
	.guideWay .top view:nth-of-type(2){
		font-size: 26upx;
		color: #45c298;
	}
	.guideWay .title, .guideWay .text{
		padding-top: 40upx;
		font-size: 26upx;
		color: #d5d5d5;
	}
	.guideWay .text{
		padding-top: 30upx;
		}
	.note{
		width: 100%;
		height: 80upx;
		background-color: #f5f9fc;
		justify-content: center;
	}
	.note view:nth-of-type(1), .note view:nth-of-type(3){
		width: 35upx;
		height: 4upx;
		background-color: #d5d5d5;
		margin-top: 42upx;
	}
	.note view:nth-of-type(2){
		font-size: 26upx;
		color: #d5d5d5;
		padding: 0 14upx 0 14upx;
		line-height: 80upx;
	}
	.Description{
		width:calc(100% - 60upx);
		height: 150upx;
		padding: 40upx 30upx;
		margin-bottom: 12upx;
		background-color: #ffffff;
	}
	.Description .top{
		justify-content: space-between;
	}
	.Description .top view:nth-of-type(1){
		font-size: 30upx;
		color: #3d3d3d;
	}
	.Description .top view:nth-of-type(2){
		font-size: 26upx;
		color: #45c298;
	}
	.timeList{
		justify-content: flex-start;
		padding-top: 40upx;
	}
	.timeList .time{
		flex: 1;
	}
	.timeList .time view:nth-of-type(1){
		font-size: 22upx;
		color: #cdcdcd;
	}
	.timeList .time view:nth-of-type(2){
		font-size: 24upx;
		color: #3d3d3d;
		padding-top: 25upx;
	}
	.prompt{
		width:calc(100% - 60upx);
		padding: 0 30upx;
		height: 108upx;
		line-height: 108upx;
		background-color: #ffffff;
		justify-content: space-between;
		margin-bottom: 12upx;
		}
	.prompt view:nth-of-type(1){
		font-size: 30upx;
		color: #3d3d3d;
		line-height: 108upx;
	}
	.prompt view:nth-of-type(2){
		font-size: 26upx;
		color: #45C298;
		line-height: 108upx;
	}
</style>
