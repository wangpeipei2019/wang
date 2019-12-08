<template>
	<view class="setting">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()" title="手机号"></uni-nav-bar>
		<view class="uni-flex uni-column listWrap">
			<view class="uni-flex uni-row settingList">
				<view class="left" >手机号</view>
				<view class="right">
					<input type="number" :maxlength="11" @input="watchPhone" v-model="phoneNumber" placeholder-style="color:#a8a8a8"  placeholder="修改手机号" />
				</view>
			</view>
		</view>
		<view class="bottom" @tap ="openPhoneVerification">更换手机号</view>
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
				phoneNumber:''
			}

		},
		created(){
			
		},
		methods: {
			comeBack(){
				uni.redirectTo({
					url:'/pages/setting/main/account'
				})
			},
			watchPhone(){
				setTimeout(() => { this.phoneNumber =this.phoneNumber.replace(/\D/g,'') ; }, 3)
			},
			 openPhoneVerification() {
				 var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				 if(this.phoneNumber==''||this.phoneNumber==null){
					 uni.showToast({
					 	title: '您还没有填写手机号码',
					 	icon:'none'
					 });
					 return
				 }else if(!reg.test(this.phoneNumber)){
					  uni.showToast({
					 	title: '输入手机号码错误',
					 	icon:'none'
					 });
					 return
				 }else{
					 uni.redirectTo({
					 	url:'/pages/setting/main/phoneVerification?phoneNumber='+this.phoneNumber
					 })
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

	.settingList .left ,.settingList .right{
		font-size: 28upx;
		color: #656565;
		line-height: 84upx;
	}

	.settingList .right {
		font-size: 28upx;
		color: #353535;
		line-height: 84upx;
	}
	.settingList .right input{
		text-align: right;
		height: 42upx;
		line-height: 42upx;
		margin-top: 17upx;
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
		background: $uni-color-level-gradual;
	}
</style>
