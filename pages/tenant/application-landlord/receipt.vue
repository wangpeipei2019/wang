<template>
	<view class="receipt" v-if="isShow">
		<view class="payBg">
			<view class="uni-flex uni-row payList" @tap="openAddReceipt">
				<view class="left"><image class="zfb" :src="imageUrl+'nav_logo_zhifubao.png'"></image></view>
				<view class="right"><image :src="imageUrl+'my_left_icon.png'"></image></view>
			</view>
			<view class="payText">
				<view>(CNY)人民币</view>
				<view>支持按订单结算/按日结算</view>
				<view>结算后即可到帐</view>
			</view>
		</view>
		<view class="payBg payBack">
			<view class="uni-flex uni-row payList" @tap="openAddWeixin">
				<view class="left"><image class="wx" :src="imageUrl+'nav_logo_weixin.png'"></image></view>
				<view class="right"><image :src="imageUrl+'my_left_icon.png'"></image></view>
			</view>
			<view class="payText">
				<view>(CNY)人民币</view>
				<view>支持按订单结算/按日结算</view>
				<view>结算后即可到帐</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		
		data(){
			return{
				imageUrl:'',
				isShow:false
				}
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.isShow=true
		},
		methods:{
			openAddReceipt(){
				uni.navigateTo({
					url:"/pages/tenant/application-landlord/addReceipt"
				})
				},
			openAddWeixin(){
				uni.navigateTo({
					url:"/pages/tenant/application-landlord/addWeixin"
				})
			}
		}
		
	}
</script>

<style scoped>
	.receipt{
		width: calc(100% - 60upx);
		height: calc(100% - 30upx)vh;
		background-color: #ffffff;
		padding: 30upx 30upx 0 30upx;
		border-top:1upx solid #dadada;
	}
	.payBg{
		width: 100%;
		height: 250upx;
		border-radius: 15upx;
		background-color: #19a0db;
	}
		
	.payBack{
		margin-top: 30upx;
		background-color: #009bad;
	}
	.payList{
		justify-content: space-between;
		padding: 12upx 10upx 12upx 10upx;
	}
	.payList .zfb{
		width: 186upx;
		height: 50upx;
		vertical-align: top;
		margin:5upx 0 5upx 0;
	}
	.payList .wx{
		width: 200upx;
		height: 58upx;
		vertical-align: top;
	}
	.payList .right image{
		width: 24upx;
		height: 24upx;
		margin-top: 24upx;
		vertical-align: top;
	}
	.payText{
		margin:0 20upx;
		border-top:1upx solid #ffffff;
		padding-top: 24upx;
	}
	.payText view{
		line-height: 1em;
		font-size: 22upx;
		color: #ffffff;
		
		margin:12upx 0 0 6upx;
	}
</style>
