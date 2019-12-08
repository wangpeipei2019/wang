<template>
	<view class="setting">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="修改密码"></uni-nav-bar>
		<view class="content">
			<view class="textList">
				<input type="text" placeholder-style="color:#8f8f8f" placeholder="请输入旧密码" />
			</view>
			<view class="textList">
				<input type="text" placeholder="请输入新密码/明文显示" />
			</view>
			<view class="textList">
				<input type="text" placeholder="请再次输入新密码/明文显示" />
			</view>
		</view>
		<view class="footer">确定修改</view>
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
	
			}
	
		},
		methods: {
			comeBack(){
				uni.redirectTo({
					/* url:'/pages/setting/landlord/phoneNumber' */
				})
			}
			
		}
	}
</script>

<style scoped>
	.setting {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
	}
	.content{
		width: calc(100% - 120upx);
		padding: 0 60upx;
		border-top:1upx solid #f5f5f8;
	}
	.textList{
		width: 100%;
		height: 122upx;
		border-bottom: 1upx solid #efefef;
		color: #535353;
		font-size: 32upx;
		}
	.textList input{
		height: 122upx;
		line-height: 122upx;
	}	
	.footer{
		margin:95upx auto 0 auto;
		width: calc(100% - 140upx);
		height: 80upx;
		line-height: 80upx;
		border-radius: 40upx;
		color: #ffffff;
		font-size: 32upx;
		text-align: center;
		background:linear-gradient(to right, #44cfcd, #3dcf94);
		}
</style>
