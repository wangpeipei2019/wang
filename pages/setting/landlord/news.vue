<template>
	<view  class="setting">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="新消息通知"></uni-nav-bar>
			<view class="title">消息通知内容</view>
		<view class="uni-flex uni-column">
			<!-- <view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">新聊天</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch @change="switch1Change" checked color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view> -->
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">用户确认入住</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch @change="switch1Change" checked color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view> 
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">用户入住结束</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch @change="switch1Change" checked color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view> 
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">客人取消订单</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch @change="switch1Change" color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view>
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">订单确认超时</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch @change="switch1Change" color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view>
			<!-- <view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">新点评</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch checked color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view> -->
			<!-- <view class="title">推送方式</view>
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">声音提醒</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch checked color="#45C298" height="20upx" style="transform:scale(0.7)"/>
				</view>
			</view>
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">震动提醒</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<switch checked color="#45C298" style="transform:scale(0.7)"/>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default{
		components:{
			uniNavBar
		},
		methods:{
			comeBack(){
				uni.redirectTo({
					url: '/pages/setting/landlord/setting'
				})
			},
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}	
	}
</script>

<style scoped>
	.setting {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;
	}
	.title{
		font-size: 32upx;
		color: #353535;
		line-height: 80upx;
		height: 80upx;
		background-color: #f7f7f7;
		padding-left: 30upx;
		
	}
	.settingList {
		background-color: #ffffff;
		height: 83upx;
		line-height: 83upx;
		width: calc(100% - 30upx);
		padding: 0 0 0 30upx;
		justify-content: space-between;
		border-bottom: 1upx solid #f5f5f8;
	}
	.settingList switch{
		margin-top:-13upx;
	}
	.settingList image {
		width: 30upx;
		height: 30upx;
		vertical-align: top;
		margin-top: 28upx;
		margin-left: 10upx;
	}
	
	.settingList .left {
		font-size: 28upx;
		color: #656565;
		line-height: 84upx;
	}
	
	.settingList .right {
		justify-content: flex-end;
		font-size: 28upx;
		color: #353535;
		line-height: 84upx;
	}
	.settingList .right view {
		font-size: 28upx;
		color: #353535;
		line-height: 84upx;
	}
	
</style>
