<template>
	<view class="login">
		<view class="hello">您好，</view>
		<view class="wellcom">欢迎注册一木生活账号</view>
		<view class="text">输入验证码</view>
		<view class="inp">
			<input type="number"  @input="watchCode" :maxlength="6" v-model="code" />
		</view>
		<view class="btn">
			<button type="primary"  class="but butOff" :class="{'active':current}" @tap="submit">注册</button>
		</view>
		<view class="teimText">验证码已发送，<mark>{{ timeTxt }}s</mark>后重新发送</view>
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
				regPhone:'',
				code: '',
				current:false,
				time: 0,
				timeTxt: ''
			}
		},
		onLoad(e){
			this.regPhone = e.regPhone
			this.time = 60;
			this.timer();
		},
		methods: {
			timer() {
				if (this.time > 0) {
					this.time--;
					this.timeTxt = this.time;
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.disabled = false;
				}
			},
			tabbar() {
				uni.switchTab({
					url: "/pages/main/tabbar0/tabbar0"
				});
			},
			watchCode(){
				setTimeout(() => { this.code =this.code.replace(/\D/g,'') ; }, 3)
			},
			submit(){
				var reg=/^\d{6}$/;
				if (this.code != '') {
					if(!reg.test(this.code)){
						uni.showToast({
							title: '验证码格式不正确',
							icon: 'none'
						});
					}
					uni.request({
						url: this.getApp.api.login.setRegister,
						method: 'POST',
						data: {
							regPhone:this.regPhone,
							verificationCode:this.code
						},
						success: res => {
							console.log(JSON.stringify(res))
							if (res.data.code == 0) {
								this.loginModal()
							} else {
								uni.showToast({
									title: '验证码输入有误',
									icon: 'none',
									mask: false,
									duration: 1500
								});
							}
							
						},
						fail: () => {
							uni.showToast({
								title: '注册失败，请重试',
								icon: 'none',
								mask: false,
								duration: 1500
							});
						}
					});
				}else{
					uni.showToast({
						title: '请输入验证码',
						mask: false,
						icon: 'none',
						duration: 1500
					});
				}
			},
			openLogin(){
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			loginModal(){
				uni.showModal({
					content: "注册成功！去登录",
					showCancel:false,
					confirmText: "确定",
					confirmColor:'#45c298',
					success:(res)=>{
						if(res.confirm){
							this.openLogin()
						}
					}
				})
			}
		},
		watch:{
			'code':function(newval){
				if(newval!=''){
					this.current = true
				}else{
					this.current = false
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
		padding: 0 30upx;
		height: 115upx;
	}
	.login .inp input {
		width: calc(100% - 30upx);
		height: 75upx;
		line-height: 75upx;
		padding:  0 0 20upx 30upx;
		padding-left: 30upx;
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
		background: linear-gradient(to right, #44cfcd, #3dcf94);
	}
	.login .butOff {
		background: #cfcfcf;
		color: #ffffff;
	}
	.login .butOff.active{
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
	.teimText mark {
		display: inline-block;
		background-color: #FFFFFF;
		color:$uni-text-color-green;
	}
	.teimText {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		color: #919191;
		padding-top: 30upx;
		margin-bottom: 44%;
		margin-bottom: 20upx;
	}
</style>
