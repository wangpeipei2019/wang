<template>
	<view class="setting">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="验证邮箱"></uni-nav-bar>
		<view class="title">
			您的邮箱还没有验证，请完善！
		</view>
		<view class="uni-flex uni-column listWrap">
			<view class="uni-flex uni-row settingList">
				<view class="left">邮箱地址</view>
				<view class="right">
					 <input type="text" value="email" v-model="email" @input="emailFn" placeholder-style="color:#c1c1c1" placeholder="您的email地址">
				</view>
			</view>
		</view>
		<view class="bottom" @click="togglePopup('middle')">发送验证邮件</view>
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed">
			<view class="boxPopup">
				<view>我们向您的邮箱发送了验证邮件，登陆邮箱点击邮件查询验证码</view>
				<view  @tap="togglePopupOpen">好的</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniNavBar,
			uniPopup
		},
		data() {
			return {
				type:'',
				email:''
			}
		},
		methods: {
			comeBack(){
				 uni.redirectTo({
					url:'/pages/setting/main/account'
				}) 
			},
			emailFn(){
			setTimeout(() => { this.email =this.email.replace(/[\u4E00-\u9FA5~'!#￥$%*(),;^&-+_=?`]/g,'') ; }, 3)
					
			},
			togglePopup(type) {
				var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
			
				if (this.email==''||this.email==null) {
					uni.showToast({
						title: '您还没有填写邮箱',
						icon:'none'
					});
					return
				} else if(!reg.test(this.email)){
					uni.showToast({
						title: '输入邮箱错误',
						icon:'none'
					});
					return
				}else{
					uni.request({
						url: this.getApp.api.setting.sendOutEmail,
						method: 'POST',
						data: {
							emailAddress:this.email,
						},
						success: res => {
							console.log(res)
							if(res.data.code==0){
								 this.type = type 
							}
						}
					});
				//	this.type = type
				}
				
			},
			togglePopupOpen(type){
				this.type = type
				uni.redirectTo({
					url:'/pages/setting/main/emailVerification?email='+this.email
				})
			}
			/* openEmailVerification() {
				uni.navigateTo({
					url:'/pages/setting/main/emailVerification'
				})
				 
			} */
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
		color: #656565;
		line-height: 100upx;
	}

	.settingList .right {
		font-size: 28upx;
		color: #353535;
		line-height: 100upx;
	}
	.settingList .right input{
		text-align: right;
		height: 42upx;
		line-height: 42upx;
		margin-top: 23upx;
	}
	.orderOff {
		border-bottom: none;
	}

	.setting .bottom {
		margin-top: 30upx;
		margin:30upx auto;
		width: calc(100% - 60upx);
		border-radius: 15upx;
		height: 78upx;
		color: #ffffff;
		line-height: 78upx;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		background:$uni-color-level-gradual;
	}
	.boxPopup{
		 width: 600upx; 
		}
	.boxPopup view:nth-of-type(1){
		width:calc(100% - 80upx); 
		padding:32upx 40upx 0 40upx;
		height: 153upx;
		font-size: 26upx;
		color: #3d3d3d;
		text-align: center;
	}	
	.boxPopup view:nth-of-type(2){
		width: 100%;
		height: 82upx;
		line-height: 82upx;
		text-align: center;
		font-size: 28upx;
		color:$uni-text-color-green;
		border-top:1upx solid #f5f5f8;
	}
	
</style>
