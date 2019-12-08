<template>
	<view class="setting">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="邮箱验证"></uni-nav-bar>
		<view class="title">
			请使用当前绑定的邮箱完成邮箱验证
		</view>
		<view class="uni-flex uni-column listWrap">
			<view class="uni-flex uni-row settingList">
				<view class="right">
					<input type="number" :maxlength="6"  @input="watchCode" v-model="verificationCode" placeholder-style="color:#a8a8a8" placeholder="请输入验证码" />
				</view>
			
			</view>
			
		</view>
		<view class="bottom" @tap ="openAccount">验证</view>
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
				email:'',
				verificationCode:'',
				token:''
			}

		},
		onLoad(e) {
			console.log(e)
			this.email=e.email
			this.token = uni.getStorageSync('token')
		},
		methods: {
			comeBack(){
				uni.navigateTo({
					url:'/pages/setting/landlord/email'
				})
			},
			watchCode(){
				setTimeout(() => { this.verificationCode =this.verificationCode.replace(/\D/g,'') ; }, 3)
			},
			openAccount() {
				//console.log(this.email)
			//	console.log(this.verificationCode)
				var reg=/^\d{6}$/;
				if(!reg.test(this.verification)){
					uni.showToast({
						title: '输入验证码错误',
						icon: 'none'
					});
						return
				}else{
					uni.request({
						url: this.getApp.api.setting.authenEmail,
						method: 'POST',
						header: {
							token: this.token
						},
						data: {
							emailAddress:this.email,
							verificationCode:this.verificationCode
						},
						success: res => {
							console.log(res)
							if(res.data.code==0){
								uni.reLaunch({
									url:'/pages/setting/main/account'
								})
							}
						}
					});
				}
				
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
		border-top: 4upx solid #F7F7F7;
		box-shadow: 0 5upx 4upx #e1e4e2;
		margin-bottom: 24upx;
	}
	.title{
			font-size: 26upx;
			color: #969696;
			height: 84upx;
			line-height: 84upx;
			background-color: #f7f7f7;
			padding-left: 30upx;
			
		}
	.settingList {
		background-color: #ffffff;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1upx solid #f5f5f8;
	}

	.settingList .left {
		font-size: 28upx;
		color: $uni-text-color-green;
		line-height: 100upx;
	}

	.settingList .right {
		font-size: 28upx;
		color: #353535;
		line-height: 100upx;
	}
	.settingList .right input{
		text-align: left;
		height: 42upx;
		line-height: 42upx;
		margin-top: 23upx;
	}
	.orderOff {
		border-bottom: none;
	}

	.setting .bottom {
		margin:110upx auto;
		width: calc(100% - 60upx);
		border-radius: 15upx;
		height: 80upx;
		background-color: #cccccc;
		color: #ffffff;
		line-height: 80upx;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		background: $uni-color-level-gradual;
	}
</style>
