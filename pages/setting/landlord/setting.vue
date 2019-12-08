<template>
	<view class="setting" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="设置"></uni-nav-bar>
		<view class="uni-flex uni-column listWrap">
				<view class=" uni-flex uni-row settingList" @tap="openAccount()">
					<view class="left">账号与安全</view>
					<view>
						<image :src="imageUrl+'my_left_icon.png'"></image>
					</view>
				</view>
				<!-- <view class=" uni-flex uni-row settingList" @tap="openNews()">
					<view class="left">新消息通知</view>
					<view>
						<image src="http://113.200.212.12/ymshapi/api/location/my_left_icon.png"></image>
					</view>
				</view> -->
		</view>
		<view class="listWarp2">
			<view class=" uni-flex uni-row settingList" @tap="openFeedBack()">
				<view class="left">意见反馈</view>
				<view>
					<image :src="imageUrl+'my_left_icon.png'"></image>
				</view>
			</view>
			<!-- <view class="uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">清除缓存</view>
				<view class="right" style="height: 102upx;line-height: 102upx;">39.80MB</view>
			</view> -->
			<view class="uni-flex uni-row settingList orderOff">
				<view class="left">APP版本</view>
				<view class="right">当前版本{{ver}}</view>
			</view>
		</view>
		
		<view class="bottom" @tap="logout">退出</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default{
		components:{
			uniNavBar
		},
		data() {
			return {
			imageUrl:'',
			ver:'',
			isShow:false
			}
		},
		created() {
			this.imageUrl = this.getApp.api.urlImage
			this.version()
			this.isShow=true
		},
		methods:{
			logout() {
				uni.clearStorageSync();
				this.$store.commit('changeToken', ''); 
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
			comeBack(){
				uni.reLaunch({
					url: '/pages/main/tabbar3/tabbar3'
				});
			},
			openNews(){
				 uni.navigateTo({
					url:'/pages/setting/landlord/news'
				}) 
			},
			openFeedBack(){
				 uni.navigateTo({
					url:'/pages/setting/landlord/feedBack'
				}) 
			},
			openAccount(){
				 uni.navigateTo({
					url:'/pages/setting/landlord/account'
				}) 
			},
			version(){
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				this.ver=wgtinfo.version
				})
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.setting {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;
	}
	.listWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		background-color: #ffffff;
		border-top: 14upx solid #F7F7F7;
		box-shadow: 0 3upx 2upx #e1e4e2;
		margin-bottom: 14upx;
	}
	.listWarp2{
		padding: 0 30upx;
		width: calc(100% - 60upx);
		background-color: #ffffff;
		box-shadow: 0 5upx 4upx #e1e4e2;
		margin-bottom: 45upx;
	}
	.marginBtn{
		margin-bottom: 14upx;
	}
	.settingList {
		background-color: #ffffff;
		height: 84upx;
		line-height: 84upx;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1upx solid #f5f5f8;
	}
	
	.settingList image {
		width: 30upx;
		height: 30upx;
		vertical-align: top;
		margin-top: 24upx;
	}
	
	.settingList .left {
		font-size: 28upx;
		color: #656565;
		line-height: 84upx;
	}
	
	.settingList .right {
		font-size: 28upx;
		color: #353535;
		line-height: 84upx;
	}
	
	.orderOff {
		border-bottom: none;
	}
	
	.setting .bottom {
		width: 100%;
		height: 78upx;
		background-color: #ffffff;
		color: $uni-text-color-green;
		line-height: 78upx;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		box-shadow: 0 5upx 4upx #e1e4e2;
	}
</style>
