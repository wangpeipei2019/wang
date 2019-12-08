<template>
	<view class="orderPay" v-if="isShow">
		<view class="paybBanner">
			<view class="uni-flex uni-column" style="justify-content: center;text-align: center;">
				<view class="orderTitle">已取消</view>
				<view class="oderAsk">订单已成功取消，您可以查看其他同类房源</view>
			</view>
		</view>
		<view class="payCont">
			
			<view class="uni-flex confirm-trip border-bottom">
				<view class="uni-flex uni-column uni-flex-item">
					<view class="time-day">入住时间</view>
					<view class="date">3月12日</view>
					<view class="time-day">今天</view>
				</view>
				<view class="uni-flex uni-column uni-flex-item-time">
					<view class="night">1晚</view>
				</view>
				<view class="uni-flex uni-column uni-flex-item">
					<view class="time-day">离开时间</view>
					<view class="date">3月13日</view>
					<view class="time-day">明天</view>
				</view>
			</view>
			<view class="uni-flex uni-row orderDetail border-bottom">
				<view class="img">
					<image :src="urlImage+'search_wooden_3_img@2x.png'"></image>
				</view>
				<view>
					<view class="title">关山牧场草原&nbsp;&nbsp;特色舒适木屋</view>
					<view class="num">房间数量：1套</view>
					
				</view>
			</view>
			<view class="uni-flex uni-column payDetail border-bottom">
				<view class="uni-flex uni-row name">
					<view>房费</view>
					<view>￥300</view>
				</view>
				<view class="uni-flex uni-row name">
					<view>押金</view>
					<view>￥100</view>
				</view>
				<view class="uni-flex uni-row name">
					<view>定金总额</view>
					<view>￥356</view>
				</view>
				<view class="uni-flex uni-row payAll">
					<view>线上支付</view>
					<view class="value">￥300</view>
				</view>
			</view>	
			
			<view class="uni-flex uni-row landlord border-bottom">
					<view class="img uni-flex uni-row">
						
					<view>
						<image :src="urlImage+'fanfdong_pho@2x.png'"></image>
					
					</view>
					<view>
						<view class="title">月光木屋</view>
						<view class="name">房东</view>
					</view>	
					</view>
					<view class="jian">
						<image style="width: 40upx;height: 40upx;" src="/static/nav_right_icon@2x.png.png"></image> 
							<!-- <image  src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png.png"></image> -->
					</view>
			</view>
			<view class="uni-flex uni-row refund  border-bottom" @click="refund">
				<view>
					<view  class="title">退款政策</view>
					<view class=" name">4月14日12：00前免费取消</view>
				</view>
				<view class="jian">
					<image src="/static/nav_right_icon@2x.png.png"></image>
					<!-- <image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png.png"></image> -->
				</view>
			</view>	
			<view class="uni-flex uni-row check border-bottom">
				<view>
					<view  class="title">入住人信息</view>
					<view class="uni-flex uni-row">
						<view class=" name">王延平</view>
						<view class="IDfirst"></view>
						<view class="name">610103********1221</view>
					</view>
				</view>
				<view class="success">
					验证成功
				</view>
			</view>	
			<view class="uni-flex uni-column phone border-bottom">
				<view class="uni-flex uni-row">
					<view class="title">联系人：</view>
					<view class="name">姓名未填写</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="title">手机号：</view>
					<view class="name">17334765673</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="title">订单号：</view>
					<view class="name">201904011456</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="title">下单时间：</view>
					<view class="name">2019-3-13&nbsp;10：38</view>
				</view>
				
			</view>
			
		</view>
		<view class="uni-flex uni-row footer">
					<view class="center">重新找房</view>
		</view>
			
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			
			return{
				urlImage: '',
				isShow:false
			}
		},
		created() {
			this.urlImage = this.getApp.api.urlImage
			this.isShow=true
		},
		methods:{
			refund(){
				uni.navigateTo({
					url:"code"
				})
			}
		}
		
	}
	
	
</script>
	
<style  lang="scss" scoped>

	.paybBanner{
		width: 100%;
		height: 256upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #ecf1f2;
/* 		box-shadow: ; */
	}
		.orderTitle{
		font-size: 36upx;
		color: $uni-text-color-pay;
		line-height: 1em;
		padding-top: 140upx;
		
	}
	.time{
		font-size: 24upx;
		color: #333333;
		line-height: 1em;
		padding-top: 28upx;
	}
	.time text{
		color: $uni-text-color-green;
	}
	.oderAsk{
		font-size: 22upx;
		color: #666666;
		line-height: 1em;
		padding-top: 22upx;
	}
	.payCont{
		width: calc(100% - 60upx);
		padding: 0 30upx;
	}
	
	.border-bottom {
		border-bottom: 1upx solid #ecf1f2;
	} 
	.confirm-trip {
		height: 180upx;
		padding: 0 60upx;
		view{
			line-height: 1em;
		}
		.uni-flex-item-time {
			width: 140upx;
			text-align: center;
	
			.night {
				background-image: url("http://113.200.212.12/ymshapi/api/location/nav_bground.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 92upx;
				height: 40upx;
				line-height: 40upx;
				font-size: 22upx;
				text-align: center;
				margin-top: 70upx;
				margin: 70upx auto 0 auto;
			}
		}
	
		.uni-flex-item {
			align-items: center;
			justify-content: center;
	
			.time-day {
				font-size: 22upx;
				color: #666;
			}
	
			.date {
				font-size: 36upx;
				color: #000;
				font-weight: bold;
				margin: 18upx 0;
			}
	
		}
	}
	
	.payCont{
		.orderDetail{
			background: #FFFFFF;
			padding-top: 54upx;
			padding-bottom: 30upx;
			justify-content: flex-start;
			
			.img{
				width: 130upx;
				height: 130upx;
				margin-right: 18upx;
				
				 image{
					width: 130upx;
					height: 130upx;
					border-radius: 15upx;
				} 
			
			}
			
		}
		
	}
	.orderDetail .title{
		font-size: 26upx;
		color: #333333;
		line-height: 1em;
		padding-top:30upx;
	}
		
	.orderDetail .num{
		font-size: 24upx;
		color: #666666;
		line-height: 1em;
		padding-top: 16upx;
	}
	.payDetail{
		background: #FFFFFF;
		padding-top: 22upx;
		padding-bottom: 36upx;
	}
	.payDetail .uni-row{
		justify-content: space-between;
		padding-top: 14upx;
		
		
	}
	
	.payDetail .name{
		font-size: 26upx;
		color: #666666;
		line-height: 1em;
		
	}
	.payDetail .value{
		color: $uni-text-color-pay;
		font-size: 26upx;
		line-height: 1em;
	}
	.payDetail .payAll{
		font-size: 26upx;
		color: #333333;
		padding-top: 28upx;
		font-weight: bold;
		line-height: 1em;
	}
	
	.landlord{
		padding: 38upx 0 30upx 0;
		 justify-content: space-between; 
	}
	
	.landlord .img image{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		margin-right: 14upx;
		vertical-align: top;
	}
	
	.landlord .title{
		font-size: 26upx;
		color: #333333;
		padding-top: 8upx;
		line-height: 1em;
		
	}
	.landlord .name{
		font-size: 22upx;
		color: #999999;
		padding-top: 14upx;
		line-height: 1em;
	}
	 .landlord .jian{
		position: relative;
		top: 30upx; 
	} 
	
	.refund .jian image{
		width: 40upx;
		height: 40upx;
	}
	.refund{
		justify-content: space-between;
	}
	.refund .jian{
		position: relative;
		top:50upx;
	}
	.refund .title{
		font-size: 26upx;
		line-height: 1em;
		color: #333333;
		padding-top: 34upx;
	}
	.refund .name{
		font-size: 26upx;
		line-height:1em;
		color: $uni-text-color-green;
		
		padding: 34upx 0 30upx 0;
	}
	.check{
		padding: 30upx 0;
		justify-content: space-between;
		
		}
	.check .title, .check .name{
		font-size: 26upx;
		color:#666666;
		padding-top: 4upx;
		line-height: 1em;
	}	
	.check .name{
		padding-top: 14upx;
		line-height: 1em;

	}
	.check .IDfirst{
		width: 4upx;
		height: 20upx;
		background: #666666;
		margin: 18upx 15upx 0 15upx;
	}
		
	.success{
		font-size: 26upx;
		color: $uni-text-color-green;
		position: relative;
		top:8upx;
	}
	.phone{
		padding: 30upx 0;
	}
	.phone .title{
		font-size: 26upx;
		color: #666666;
		width: 130upx;
		height: 42upx;
	}
	.phone .name{
		font-size: 26upx;
		color: #666666;
	}
	.footer{
		height: 98upx;
		text-align: center;
		width: 100%;;
		font-size: 26upx;
		color: #FFFFFF;
		background: $uni-color-level-gradual;
		justify-content: center;
		
	}	
	.footer .center{
		line-height: 98upx;
	} 
	    
</style>
