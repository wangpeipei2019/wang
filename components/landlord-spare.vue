<template>
	<view>
		<view class="top">社交介绍</view>
		<view class="social">
			<textarea type="text" placeholder="对自己做一个有趣的介绍把"></textarea>
		</view>
		<view class="top">备用信息</view>
		<view class="uni-flex uni-row geren">
			<view class="left">备用电话</view>
			<view class="uni-flex uni-row">
				<view class="right">
					<input placeholder-style="color:#D9D9D9;" type="number" placeholder="请填写" />
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row geren">
			<view class="left">接听时间</view>
			<view class="uni-flex uni-row">
				<view class="right">00:00-23:59</view>
				<view >
					<image src="/static/my_left_icon.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.geren{
		width: 100%;
		justify-content: space-between;
		border-bottom: 1upx solid #f4f4f8;
		height: 102upx;
		line-height: 102upx;
		
		}
	.geren .left{
		font-size:26upx;
		color: #6b6b6b;
		line-height: 102upx;
	}
	
	.geren .right input{
		text-align: right;
		height: 102upx;
		font-size:26upx;
		color: #000000;
		line-height: 102upx;
		padding-right: 40upx;
	}
		
	.geren .right {
		height: 102upx;
		font-size:26upx;
		 color: #000000;
		line-height: 102upx;
	}
	
	.geren image{
		width: 30upx;
		height: 30upx;
		margin: 36upx 0 0 10upx;
	}
	.social{
	width: 100%;
	height: 300upx;
	border: 1upx solid #ccc;
	border-radius: 8upx;
	margin: 30upx 0;
	}
	.social textarea{
		width: calc(100% - 30upx);
		font-size:26upx;
		color: #6b6b6b;
		padding: 15upx;
		height: 270upx;
		background: #ffffff;
	}
	
</style>
