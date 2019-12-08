<template>
	<view>
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" :title="titleText"></uni-nav-bar>
		<view class="order" v-if="messageType==1">
			<view class="orderList" v-for="(item,userId) in messageList" :key="userId">
				<view class="uni-flex uni-row orderDate">
					<view>{{item.createTime}}</view>
				</view> 
				<view class="textWarp">
					<text class="orderDetail">
					 {{item.content}} 
					</text>
				</view>
				<!-- <image class="activeImg" src="http://113.200.212.12/ymshapi/api/location/scenicspot_house2@2x.jpg"></image> -->
			</view>	
		</view>
		<view class="order" v-if="messageType==2">
			<view class="orderList" v-for="(item,userId) in messageList" :key="userId">
				<view class="uni-flex uni-row orderDate">
					<view>{{item.createTime}}</view>
				</view> 
				<view class="textWarp">
					<text class="orderDetail">
						{{item.content}}
					</text>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	  export default {
		  components:{
		    	uniNavBar
		    },
			data(){
				return{
					titleText:'',
					messageType:'',
					messageList:'',
					token:'',
					orderDate:'',
					orderTime:'',
				}
			},
			onLoad(e) {
				this.messageType=e.messageType
				if(this.messageType==1){
							 this.titleText='活动通知'
				} else if(this.messageType==2){
							  this.titleText='订单通知'
				}
				this.imageUrl=this.getApp.api.urlImage
				this.token = uni.getStorageSync('token');
				this.getmessage()
			},
			methods:{
				getmessage(){
					uni.request({
						url: this.getApp.api.smsmessage.queryTypeMessage,
						method: 'POST',
						header: {
							token: this.token
						},
						data:{
							type:this.messageType
						},
						success: res => {
							if(res.data.code==0){
								console.log(res.data)
								if(res.data.appMessage.length!=''&&res.data.appMessage.length!=null){
									this.messageList=res.data.appMessage
										for(var i=0;i<res.data.appMessage.length;i++){
											var str=res.data.appMessage[i].createTime
											console.log(str)
											var dt1=str.slice(0,4)
											var dt2=str.slice(5,7)
											var dt3=str.slice(8,10)
											var dt4=str.slice(11,16)
												str=dt1+'年'+dt2+'月'+dt3+'日'+' '+dt4
											this.messageList[i].createTime=str
										}
								}
								
								this.alreadyRead()
							}
						}
					});
				},
				alreadyRead(){
					uni.request({
						url: this.getApp.api.smsmessage.addMessageAlreadyRead,
						method: 'POST',
						header: {
							token: this.token
						},
						data:{
							type:this.messageType
						},
						success: res => {
							console.log(this.messageType)
							console.log(res)
							if(res.data.code==0){
								
							}
						}
					});
				},
				comeBack(){
						uni.switchTab({
							url:'/pages/main/tabbar2/tabbar2'
						})
					}
			}
	  }
</script>

<style>
	.activityList{
		width: calc( 100% - 60upx );
		padding: 0;
		margin: 0 30upx 0 30upx;
		background: #FFFFFF;
		position:relative;
		border-bottom: 1upx solid #f0eff5;
	}
	.textWarp{
		overflow: hidden;
	}
	 .activeText{
		overflow: hidden;
		font-size: 28upx;
		color: #000000;
		line-height: 20upx;
	}
	.activeImg{
		width: 100%;
		margin: 8upx 0 18upx 0;
	}
	.activeDate{
		position: absolute;
		 width: 30%; 
	}
	.activeTime{
		 position: relative;
		 left: 28%;
		 width: 12%;
		 font-size: 24upx;
		 color: #707070;
	}
	
	.activeTime ,.activeDate{
		line-height: 36upx;
		font-size: 26upx; 
		color: #535353;
		margin-top: 24upx;
	}
	.order{
		width: calc(100% - 60upx);
		margin-left: 30upx;
		margin-right: 30upx;
		background-color: #FFFFFF;
		height: calc(100vh - 142upx);
		overflow-y: auto;
		border-top:3upx solid #f0f0f0;
		
		}
	.orderList{
		position:relative;
		width: 100%;
		border-bottom: 1upx solid #f0eff5;
		padding-bottom: 20upx;
	}
	.orderDate{
		justify-content: flex-end;
		 width: 100%;
	}
	.orderDate view{
		/* line-height: 80upx; */
		font-size: 26upx;
		line-height: 1em;
		margin: 30upx 0 15upx 0;
		color: #999;
	}
	.orderDetail{
		line-height: 38upx;
		width: 100%;
		color: #000000;
		font-size: 28upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3; 
	}
	.orderClick{
		color: #49C29D;
		font-size: 24upx;
	}
</style>
