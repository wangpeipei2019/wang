<template>
	<view class="login">
		<view class="hello">您好，</view>
		<view class="wellcom">欢迎注册一木生活账号</view>
		<view class="text">输入手机号</view>
		<view class="inp">
			<input type="number" :maxlength="11" @input="watchPhone" v-model="phone" />
		</view>
		<view class="">
			<button type="primary" class="but butOff" @tap="verification">获取验证码</button>
		</view>
		<!-- <view class="uni-flex uni-column bottom">
			<view class="uni-flex uni-column">
				<view class="line"></view>
				<view class="loginText">其他方式登陆</view>
			</view>
			<view class="uni-flex uni-row bottomImg">
				<view>
					<image src="http://113.200.212.12/ymshapi/api/location/login_icon_weibo.png"></image>
				</view>
				<view>
					<image src="http://113.200.212.12/ymshapi/api/location/login_icon_wechat.png"></image>
				</view>
				<view>
					<image src="http://113.200.212.12/ymshapi/api/location/login_icon_qq.png"></image>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled: false,
				phone: ''
			}
		},
		methods: {
			watchPhone(){
				setTimeout(() => { this.phone =this.phone.replace(/\D/g,'') ; }, 3)
			},
			sendcode() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (this.phone == '') {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				} else if (!reg.test(this.phone)) {
					uni.showToast({
						title: '手机格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				} else {
					this.disabled = true;
				}
			},
			verification() {
				// 获取验证码
				this.sendcode();
				if (this.disabled) {
					uni.request({
						url: this.getApp.api.login.code,
						method: 'POST',
						data: {
							regPhone: this.phone,
							smsType: 0
						},
						success: res => {
							if (res.data.code == 0) {
								uni.navigateTo({
									url: "verification?regPhone=" + this.phone
								})
							}else{
								console.log(JSON.stringify(res))
								uni.showToast({
									title: '验证码发送失败0，请重试',
									icon: 'none',
									mask: false,
									duration: 1500
								});
							}
						},
						fail: () => {
							uni.showToast({
								title: '验证码发送失败，请重试',
								icon: 'none',
								mask: false,
								duration: 1500
							});
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}
	.login {
		width: 100%;
		background-color: #FFFFFF;
	}
	.login .hello {
		font-size: 60upx;
		color: #434343;
		margin: 0 0 30upx 50upx;
		padding-top: 74upx;
	}
	.login .wellcom {
		font-size: 30upx;
		color: #434343;
		margin-left: 50upx;
	}
	.login .text {
		font-size: 26upx;
		color: #919191;
		margin-left: 50upx;
		padding: 120upx 0 34upx 0;
	}
	.login .inp {
		width: calc(100% - 60upx);
		padding: 0 30upx 0 30upx;
		height: 115upx;
	}
	.login .inp input {
		width: 100%;
		height: 75upx;
		line-height: 75upx;
		padding: 0 0 20upx 30upx;
		font-size: 48upx;
		color: #000000;
		border-bottom: 2upx solid #e6e6e6;
	}
	.login .but {
		width: 640upx;
		height: 88upx;
		font-size: 36upx;
		color: #ffffff;
		margin: 0 auto;
		margin-top: 60upx;
		background: $uni-color-level-gradual;
	}
	.bottom {
		width: 100%;
		height: 194upx;
	}
	.bottom .line {
		width: 100%;
		height: 24upx;
		border-bottom: 1upx solid #e6e6e6;
		position: absolute;
	}
	.bottom .loginText {
		font-size: 24upx;
		color: #b3b3b3;
		margin: 0 auto;
		padding: 12upx 10upx 30upx 10upx;
		background-color: #ffffff;
		z-index: 3;
	}
	.bottomImg {
		justify-content: center;
	}
	.bottom image {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		margin: 0 22upx;
	}
	.login .butOff {
		margin-bottom: 20upx;
	}
</style>
