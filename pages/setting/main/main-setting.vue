<template>
	<view class="setting" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()" title="设置"></uni-nav-bar>
		<view class="uni-flex uni-column listWrap">
			<view class=" uni-flex uni-row settingList" @tap='openMainAccount'>
				<view class="left">账号与安全</view>
				<view>
					<image :src="imageUrl+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class=" uni-flex uni-row settingList" @tap='eddress'>
				<view class="left">收件地址</view>
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
		<view class="bottom" @tap="logout">注销登录</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
			ver:'',
			imageUrl:'',
			isShow:false
			}
		},
		created() {
			this.imageUrl = this.getApp.api.urlImage
			this.version()
			this.isShow=true
		},
		methods: {
			comeBack() {
				uni.reLaunch({
					url: '/pages/main/tabbar3/tabbar3'
				});
			},
			logout() {
				uni.clearStorageSync();
				this.$store.commit('changeToken', '');
				uni.reLaunch({
					url: '/pages/main/tabbar0/tabbar0'
				});
			},
			openMainAccount() {
				uni.navigateTo({
					url: "/pages/setting/main/account"
				})
			},
			eddress(){
				uni.navigateTo({
					url: "/pages/setting/main/addressList"
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
		box-shadow: 0 5upx 4upx #e1e4e2;
		margin-bottom: 24upx;
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
