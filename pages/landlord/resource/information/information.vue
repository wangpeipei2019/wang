<template>
	<view class="information">
		<view class="imgTop">
			<image src="http://113.200.212.12/ymshapi/api/location/nav_images_bg.png"></image>
		</view>
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_phone.png"></image>
				</view>
				<view class="uni-flex uni-row imgRight">
					<view>
						<view class="leftTop">手机号码</view>
						<view class="leftBot">86&nbsp;183****1231</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">已完成</view>
						<view>
							<image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_head.png"></image>
				</view>
				<view class="uni-flex uni-row imgRight">
					<view>
						<view class="leftTop">真实头像</view>
						<view class="leftBot">已上传</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">已完成</view>
						<view>
							<image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_cardid.png"></image>
				</view>
				<view class="uni-flex uni-row imgRight">
					<view>
						<view class="leftTop">真实身份</view>
						<view class="leftBot">请完善真实身份</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">未完成</view>
						<view>
							<image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_cards.png"></image>
				</view>
				<view class="uni-flex uni-row imgRight">
					<view>
						<view class="leftTop">收款方式</view>
						<view class="leftBot">请完善收款方式</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">未完成</view>
						<view>
							<image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row footer">开始发布房源 </view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	view{
		line-height: 1em;
	}
	.information{
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}
	.information .imgTop{
		width: 100%;
		height:168upx;
	}
	.information .imgTop image{
		width: 100%;
		height:168upx;
	}
	.infList{
		width: 100%;
		height: 104upx;
	}
	.infList .imgLeft{
		width: 48upx;
		height: 48upx;
	/* 	margin:38upx 18upx 0 30upx *//* 设计标准 */
		margin:30upx 18upx 0 30upx;
	}
	
	.infList .imgLeft image{
		width: 48upx;
		height: 48upx;
	}
	.infList .imgRight{
		width: calc(100% - 129upx);
		justify-content: space-between;
		padding-right: 30upx;
		border-bottom: 1upx solid #e8e8e8;
	}
	.infList .imgRight .leftTop{
		font-size: 26upx;
		color: #333333;
		margin: 22upx 0 10upx 0;
	}
	.infList .imgRight .leftBot{
		font-size: 24upx;
		color: #7e7e7e;
	}
	.infList .imgRight .right{
		font-size: 26upx;
		color: #333333;
		line-height: 104upx;
	}
	.infList .imgRight image{
		width: 22upx;
		height: 22upx;
		margin: 40upx 0 0 8upx;
	}
	.information .footer{
		width: 100%;
		height: 98upx;
		position: fixed;
		bottom:0;
		background-color: #45C298;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 98upx;
		justify-content: center;
		background: linear-gradient(to right, rgb(68, 207, 205), rgb(61, 207, 148));
		}
		
</style>
