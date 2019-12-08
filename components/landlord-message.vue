<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" title="消息"></uni-nav-bar>
	
	<view class="indexMessage">
		<view class="uni-flex uni-column" :id='item.type'  @tap="order(item.type)" v-for="(item,type) in appMessage" :key="type">
			<view class="uni-flex uni-row messageList" v-if="item.type==1">
					<view class="messageImg">
					 	<image :src="imageUrl+'systemmessage_icon@2x.png.png'"></image> 
					</view>
					<view class="uni-flex uni-column right">
						<view class="uni-flex uni-row mesTime">
							<view class="messageTitle">活动通知</view>
							<view class="messageDate" >{{item.createTime}}</view>
						</view>
						<view class="uni-flex uni-row mesCon">
							<view class="messageText" :class="{'colorAct':isAct}">{{item.content}}</view> 
							<image v-if="actived==1" src="http://113.200.212.12/ymshapi/api/location/alert_icon_dot@xxxhdpi.png" class="iconStatus"></image>
						</view>
					</view> 
			</view> 
			 <view class="uni-flex uni-row messageList" v-if="item.type==2">
					<view class="messageImg">
						<image :src="imageUrl+'orderstatus_icon@2x.png.png'"></image> 
					</view>
					<view class="uni-flex uni-column right">
						<view class="uni-flex uni-row mesTime">
							<view class="messageTitle">订单状态</view>
							<view class="messageDate" >{{item.createTime}}</view>
						</view>
						<view class="uni-flex uni-row mesCon" style="">
							<view class="messageText" :class="{'colorAct':isReaded}">{{item.content}}</view>
							<image v-if="readed==1" src="http://113.200.212.12/ymshapi/api/location/alert_icon_dot@xxxhdpi.png" class="iconStatus"></image>
						</view>
					</view> 
			</view>
			
		</view>
	</view>
	
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			
			uniNavBar
		},
		data() {
			return {
				title: '',
				showImg: false,
				appMessage:[],
				imageUrl:'',
				token:'',
				messageType:'',
				actived:0,
				readed:0,
				isAct:false,
				isReaded:false,
				isShow:false
			}
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.getMessage();
			this.signRed()
		},
		methods:{
			comeBack(){
					uni.switchTab({
						url:'/pages/main/tabbar3/tabbar3'
					})
				},
			order(e){
			 this.messageType= e
			 console.log(this.messageType)
				 uni.redirectTo({
					url: '/pages/landlord/message/order-status/order-status?messageType='+this.messageType
				}); 
			},
			getMessage(){
				uni.request({
					url: this.getApp.api.smsmessage.queryHomePageMessage,
					method: 'POST',
					header: {
						token: this.token
					},
					success: res => {
					//	console.log(res)
						if(res.data.code==0){
							if(res.data.appMessage.length!=''&&res.data.appMessage.length!=null)
							this.appMessage=res.data.appMessage
							for(var i=0;i<res.data.appMessage.length;i++){
								var str=res.data.appMessage[i].createTime.slice(0,10)
								console.log(res.data.appMessage[i].createTime)
								console.log(str)
									this.appMessage[i].createTime=str
							}
						}
						this.isShow=true
					}
				});
			},
			signRed(){
				uni.request({
					url:this.getApp.api.smsmessage.signRedDot,
					method: 'POST',
					header: {
						token: this.token
					},
					success: res => {
					//	console.log(res)
						if(res.data.code==0){
							if(res.data.signMap.signOne==1){
								this.actived=1
							}
							if(res.data.signMap.signOne==0){
								this.actived=0
								this.isAct=true
							 }
							 if(res.data.signMap.signTwo==1){
								this.readed=1
							}if(res.data.signMap.signTwo==0){
								this.readed=0
								this.isReaded=true 
							 }
						}
					}
				});
				
			}
		}
	}
	
</script>

<style>
view{
	line-height: 1em;
}
.indexMessage{
	width: calc(100% - 60upx);
	padding: 0 30upx;
	height: 100%;
	background-color: #ffffff;
	border-top:3upx solid #f0f0f0;
}
.messageList{
	/* height: 140upx; */
	width: 100%;
	border-bottom: 1upx solid #f0eff5;
}

.mesTime{
	justify-content: space-between;
}
.mesCon{
	justify-content: space-between;
}
.right{
	width: 100%;
}
.messageText{
	padding: 14upx 0 32upx 0;
	font-size:28upx;
	color: #000;
	 -webkit-line-clamp: 1;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap; 
	width: 550upx;
	
	}
.messageImg image{
	width: 80upx;
	height: 80upx;
	margin: 32upx 30upx 0 0;
}
.messageTitle{
		width: 50%;
		font-size: 24upx;
		color: #333;
		padding-top: 42upx;
	}
.messageDate{
	padding-top: 42upx;
	width: 50%;
	text-align: right;
	color: #999;
	font-size: 24upx;
	}
.colorAct{
	color:#999;
}
.iconStatus{
	height: 30upx;
	width: 30upx;
	margin: 14upx 0 0 0;
}
</style>
