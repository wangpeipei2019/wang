<template>
<view class="setting" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()" title="账号与安全"></uni-nav-bar>
		<view class="title">账号绑定</view>
		<view class="uni-flex uni-column listWrap">
			<view class=" uni-flex uni-row settingList" @tap='openPhone'>
				<view class="left" style="height: 102upx;line-height: 102upx;">手机</view>
				<view class="uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					<view>{{phoneNumber}}</view> 
					<image :src="imageUrl+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class=" uni-flex uni-row settingList" @tap='openEmail'>
				<view class="left" style="height: 102upx;line-height: 102upx;">邮箱</view>
				<view class=" uni-flex uni-row right" style="height: 102upx;line-height: 102upx;">
					 <view>{{email}}</view>
					<image :src="imageUrl+'my_left_icon.png'"></image>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	
	export default {
		components:{
			uniNavBar
		},
		data() {
			return {
				token:'',
				phoneNumber:'',
				email:'',
				imageUrl:'',
				isShow:false
			}

		},
		onLoad(){
			this.token = uni.getStorageSync('token')
			this.imageUrl = this.getApp.api.urlImage
			this.userInfo()
		},
		methods: {
			comeBack(){
				uni.redirectTo({
					url:'/pages/setting/main/main-setting'
				})
			},
			openPhone(){
				 uni.redirectTo({
					url: '/pages/setting/main/phoneNumber?phoneNumber='+this.phoneNumber
				}); 
			},
			openEmail(){
				uni.redirectTo({
					url: '/pages/setting/main/email?email='+this.email
				}); 
			},
			userInfo(){
				uni.request({
					url: this.getApp.api.setting.phoneAndEmail,
					method: 'POST',
					header: {
						token: this.token
					},
					success: res => {
						if(res.data.code==0){
							if(res.data.pAndEmailEntitys.regPhone !=null&&res.data.pAndEmailEntitys.regPhone !=''){
								this.phoneNumber=res.data.pAndEmailEntitys.regPhone
							}if(res.data.pAndEmailEntitys.emailAddress !=null&&res.data.pAndEmailEntitys.emailAddress !=''){
								this.email=res.data.pAndEmailEntitys.emailAddress
							}
							
						}
						this.isShow=true
					}
				});
			}
			
		}
	}
</script>

<style scoped>
	.setting {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;
	}

	.listWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		background-color: #ffffff;
	/* 	border-top: 14upx solid #F7F7F7; */
		box-shadow: 0 5upx 4upx #e1e4e2;
		margin-bottom: 24upx;
	}
	.title{
		font-size: 26upx;
		color: #969696;
		line-height: 84upx;
		height: 84upx;
		background-color: #f7f7f7;
		padding-left: 30upx;
		
	}
	.border-top{
		border-top:6upx solid #e4e4e4;
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
	.orderOff {
		border-bottom: none;
	}

	.setting .bottom {
		width: 100%;
		height: 78upx;
		background-color: #ffffff;
		color: #45C298;
		line-height: 78upx;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		box-shadow: 0 5upx 4upx #e1e4e2;
	}
</style>
