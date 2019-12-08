<template>
	<view>
		<!-- <uni-nav-bar fixed="true" statusBar="true" left-icon="back"></uni-nav-bar> -->
		<view class="login">
			 <uni-nav-bar fixed="true" v-if="backPage==1" statusBar="true" left-icon="back"  @click-left="comeBackIndex"></uni-nav-bar>
			 <uni-nav-bar fixed="true" v-if="backPage==0" statusBar="true" left-icon="back"  @click-left="comeBack"></uni-nav-bar> 
			<view class="hello">您好，</view>
			<view class="wellcom">欢迎登录一木生活</view>
			<view class="phonewarp">
				<view class="uni-flex uni-row phone">
					<view class="phoneText">手机号</view>
					<view class="phoneNumber">
						<input type="number" :maxlength="11" @input="watchPhone" v-model="loginForm.phone" />
					</view>
				</view>
				 <view class="uni-flex uni-row verificationCode">
					<view class="uni-flex uni-row left">
						<view class="yanzheng">验证码</view>
						 <input type="number" :maxlength="6" @input="watchCode" v-model="loginForm.code" /> 
						
					</view>
					<view class="right" @tap="getCode">{{ btntxt }}</view>
				</view>

			</view>
			<view class="btn">
				<button type="primary" class="but" @tap="setLogin">登录</button>
			</view>
			<view class="registered" @tap="get">注册账号</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				loginForm: {
					phone: '',
					code: ''
				},
				disabled: false,
				time: 0,
				btntxt: '获取验证码',
				canSave: true
			}
		},
		computed:{
			backPage(){
				return this.$store.state.backIndex
			}
		},
		components:{
			uniNavBar
		},
		methods: {
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
					this.canSave = true;
				}
			},
			get() {
				uni.navigateTo({
					url: "get"
				})
			},
			tabbar() {
				uni.switchTab({
					url: "/pages/main/tabbar3/tabbar3"
				});
			},
			comeBackIndex(){
				uni.switchTab({
					url: "/pages/main/tabbar0/tabbar0"
				});
			},
			comeBack() {
				if(this.backPage==1){
					this.comeBackIndex()
				}else{
					uni.navigateBack({});
				}
			},
			watchPhone(){
				setTimeout(() => { this.loginForm.phone =this.loginForm.phone.replace(/\D/g,'') ; }, 3)
			},
			watchCode(){
				setTimeout(() => { this.loginForm.code =this.loginForm.code.replace(/\D/g,'') ; }, 3)
			},
			sendcode() {
				var regValue=/^\d{6}$/;
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (this.loginForm.phone == '') {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				} else if (!reg.test(this.loginForm.phone)) {
					uni.showToast({
						title: '手机格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					console.log(121)
				}else if(this.loginForm.code!=""&&!regValue.test(this.loginForm.code)){
					uni.showToast({
						title: '验证码格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else {
					this.disabled = true;
					this.canSave = true
				}
			},
			getCode() {
				this.sendcode();
				if(this.canSave){
					console.log(this.canSave)
					this.canSave = false;
					if (this.disabled) {
						this.time = 60;
						this.timer();
						uni.request({
							url: this.getApp.api.login.code,
							method: 'POST',
							data: {
								regPhone: this.loginForm.phone,
								smsType: 1
							},
							success: res => {
								if (res.data.code == 0) {
									uni.showToast({
										title: '验证码发送成功',
										mask: false,
										duration: 1500
									});
								} else {
									console.log(JSON.stringify(res))
									uni.showToast({
										title: '验证码发送失败，请重试',
										icon: 'none',
										mask: false,
										duration: 1500
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: '验证码发送失败，请重试',
									mask: false,
									icon: 'none',
									duration: 1500
								});
							}
						});
					}
				}else{
					console.log(this.canSave)
					return
				}
			},
			setLogin() {
				// 登录
				this.sendcode();
				var reg=/^\d{6}$/;
				if (this.disabled) {
					if (this.loginForm.code != '') {
						if(!reg.test(this.loginForm.code)){
							uni.showToast({
								title: '验证码格式不正确',
								icon: 'none'
							});
						}else{
							uni.request({
								url: this.getApp.api.login.setLogin,
								method: 'POST',
								data: {
									regPhone: this.loginForm.phone,
									verificationCode: this.loginForm.code
								},
								success: res => {
									// console.log(JSON.stringify(res))
									if (res.data.code == 0) {
										uni.setStorageSync('token', res.data.token);
										this.$store.commit('changeToken', res.data.token);
										this.updateUserInfo();
										this.comeBack()
									} else {
										uni.showToast({
											title: '手机号或验证码输入有误，请重试',
											icon: 'none',
											mask: false,
											duration: 1500
										});
									}
								},
								fail: () => {
									uni.showToast({
										title: '登录失败，请重试',
										icon: 'none',
										mask: false,
										duration: 1500
									});
								}
							});
						}
					} else {
						uni.showToast({
							title: '请输入验证码',
							mask: false,
							icon: 'none',
							duration: 1500
						});
					}
				}
			},
			updateUserInfo() {
				uni.request({ //用户信息
					url: this.getApp.api.querylandLordInfo,
					method: 'POST',
					data: {},
					header: {
						token: this.$store.state.token
					},
					success: res => {
						this.$store.commit('changeUserInfo', res.data);
						uni.setStorageSync('userName', res.data.userName);
					}
				});
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
		/* padding-top: 74upx; */
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
		height: 20upx;
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
	.phonewarp {
		width: calc(100% - 60upx);
		padding: 0 30upx;
	}
	.phone {
		width: 100%;
		border-bottom: 1upx solid #e6e6e6;
	}
	.phoneText {
		font-size: 26upx;
		color: #919191;
		padding: 120upx 44upx 34upx 30upx;
	}
	.phoneNumber {
		width: 60%;
		height: 115upx;
		margin-top: 66upx;
		font-size: 48upx;
		color: #000000;
	}
	.phoneNumber input {
		width: 100%;
		padding: 20upx 0;
		height: 75upx;
		line-height: 75upx;
	}
	.verificationCode {
		justify-content: space-between;
		width: 100%;
		height: 115upx;
		border-bottom: 1upx solid #e6e6e6;
	}
	.yanzheng {
		font-size: 24upx;
		margin: 60upx 0 0 30upx;
		color: #919191;
		padding-right: 30upx;
	}
	.verificationCode .left {
		color: #919191;
		line-height: 115upx;
	}
	.verificationCode .left input {
		margin-left: 20upx;
		display: inline-block;
		padding: 0;
		width: 240upx;
		font-size: 52upx;
		color: #000000;
		padding: 20upx 0;
		height: 75upx;
		line-height: 75upx;
		
	}
	.verificationCode .right {
		min-width: 160upx;
		height: 52upx;
		font-size: 24upx;
		color: $uni-text-color-green;
		border: 1upx solid $uni-text-color-green;
		border-radius: 15upx;
		line-height: 52upx;
		margin: 40upx 20upx 0 0;
		text-align: center;
		padding:0 10upx;
		box-sizing:border-box;
	}
	.registered {
		display: inline-block;
		float:right;
		font-size: 26upx;
		color: #666666;
		margin-top: 40upx;
		/* margin: 40upx 50upx 39% 0; */
		margin: 40upx 50upx 20upx 0;
	}
</style>
