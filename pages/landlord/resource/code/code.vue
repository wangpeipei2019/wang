<template>
	<view class="bgBox">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="访客守则" right-text="保存"
		 @click-right="keep"></uni-nav-bar>
		<view class="code">
			<view class="codeWrap">
				<textarea placeholder-style="color:#656565;font-size:24upx" placeholder="若对房客有其入住他要求,请在此处说明,例如:水电,燃气费,额外打扫费用,入住所需证件等"
				 v-model="tenantCodeRules" :maxlength="500" @input="watch()"></textarea>
				 <view class="number">{{changeNum}}/500</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				tenantCodeRules: '',
				changeNum:0
			}
		},
		components: {
			uniNavBar
		},
		methods: {
			comeBack() {
				uni.redirectTo({
					url: '/pages/landlord/resource/claim/claim'
				})
			},
			keep() {
				var reg=/^[\u4E00-\u9FA5，.。！、……A-Za-z\d\-\_]{0,1000}$/;
				if(this.tenantCodeRules!=''&&!reg.test(this.tenantCodeRules)){
					uni.showToast({
						title: '房客守则格式不正确',
						icon: 'none'
					});
					}else{
						uni.redirectTo({
							url: '/pages/landlord/resource/claim/claim?tenantCodeRules=' + this.tenantCodeRules
						})
					}
			},
			watch(){
				 this.changeNum=this.tenantCodeRules.length; 
			},
		}
	}
</script>

<style scoped>
	.bgBox {
		width: 100%;
		height: 100vh;
	}

	.code {
		width: calc(100% - 64upx);
		height: 300upx;
		background: #ffffff;
		padding: 32upx 32upx 32upx 32upx;
	}

	.codeWrap {
		width: 500upx;
		width: calc(100% - 64upx);
		width: 100%;
		height: 300upx;
		border-radius: 15upx;
		background-color: #f3fbfb;
	}

	.codeWrap textarea {
		padding: 20upx 16upx;
		background-color: #f3fbfb;
		width: calc(100% - 32upx);
		height: 218upx;
		font-size: 24upx;
		overflow-y: auto;

	}

	.codeWrap .number {
		text-align: right;
		font-size: 18upx;
		color: #656565;
		margin-right: 24upx;
	}
</style>
