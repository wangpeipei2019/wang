<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()" title="添加支付宝"></uni-nav-bar>
		<view class="addRec">
			<view class="uni-flex uni-column addRedTop">
				<view class="uni-flex uni-column center">
					<view class="logImg"><image :src="imageUrl+'nav_logo_zhifubao.png'"></image></view>
					<view class="text">您需要填写有效的支付宝账号，以及真实的姓名</view>
				</view>
				<view class="uni-flex uni-row topList">
					<view class="left">支付宝账号</view>
					<view class="right">
						<input type="number" disabled="disabled"  v-model="payAccount"  placeholder-style="color:#6dbcf7;" placeholder ="输入支付宝账号"/>
					</view>
				</view>
				<view class="uni-flex uni-row topList">
					<view class="left">真实姓名</view>
					<view class="right">
						<input type="text" disabled="disabled"  v-model="payName" placeholder-style="color:#6dbcf7;" placeholder ="请输入真实姓名"/>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column redBottom">
				<view class="title">您可以根据您的需要在一下的两种结算方式中选择：</view>
				<view class="uni-flex uni-column">
					<radio-group class="uni-flex uni-column" @change="radioChange">
						<label class="uni-flex uni-row labelList">
							<view>
								<radio id="order" :color="radioColor" style="transform:scale(0.8)" value="order" checked="true"></radio>
							</view>
							<view class="borderBot">
								<label class="uni-flex uni-column labelText" >
									<text>按订单结算</text>
									<text>小于7天每单结算1次，大于7天每周结算1次</text>
								</label>
							</view>
						</label>
						<label class="uni-flex uni-row labelList">
							<view>
								<radio id="date" :color="radioColor" style="transform:scale(0.8)" value="date"></radio>
							</view>
							<view class="borderBot">
								<label class="uni-flex uni-column labelText" >
									<text>按日结算</text>
									<text>每日结算1次</text>
								</label>
							</view>
						</label>
					</radio-group>
				</view>
				<view class="Check">提交前请仔细核对，以免造成不必要的损失</view>
				<view class="determine">确定</view>
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
		data() {
			return {
				token:'',
				imageUrl:'',
				isShow:false,
				radioColor:'#45c298',
				payAccount:'',
				payName:''
			}
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.queryPaymethod()
		},
		methods: {
			radioChange: function(e) {
				var checked = e.target.value
				console.log(checked)
			},
			comeBack(){
				uni.redirectTo({
					url:'/pages/landlord/collectionSetting/receipt'
				})
			},
			queryPaymethod(){
				uni.request({
					url: this.getApp.api.attestation.queryPaymethod,
					method: 'POST',
					data: {
						payType: 1
					},
					header: {
						token: this.token
					},
					success: res => {
						if(res.data.pEntity.payName!=null){
							this.payName = res.data.pEntity.payName
						}
						if(res.data.pEntity.payAccount!=null){
							this.payAccount = res.data.pEntity.payAccount
						}
						if(res.data.pEntity.settlementMethod!=null){
							this.settlementMethod = res.data.pEntity.settlementMethod
							// console.log(this.settlementMethod)
							if(this.settlementMethod==1){
								this.current = true
							}else{
								this.current = false
							}
						}
						this.isShow=true
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		line-height: 1em;
	}
	.col{
		color:red;
	}
	.addRec{
		width: 100%;
		height: calc(100vh - 152upx);
		background-color: #ffffff;
	}
	.addRedTop{
		width: 100%;
		height: 460upx;
		background-color: #19a0db;
	}
	
	.addRedTop image{
		width: 230upx;
		height: 60upx;
		margin:0 auto;
		
	}
	.addRedTop .center{
		justify-content: center;
		text-align: center;
	}
	.center .logImg{
		margin:46upx 0 18upx 0;
	}
	.center .text{
		margin:0 0 52upx 0;
		font-size: 24upx;
		color: #FFFFFF;
	}
	
	.topList{
		justify-content: space-between;
		height: 90upx;
		margin:0 24upx 0 24upx;
		border-bottom: 1upx solid #4ac1f4;
		line-height: 90upx;
	}
		
	.topList .left{
		color: #ffffff;
		font-size: 26upx;
		line-height: 90upx;
	}
	.topList .right input{
		text-align: right;
		font-size: 26upx;
		color: #ffffff;
		line-height: 90upx;
		height: 90upx;
	}
		
	.redBottom{
	margin: 0 30upx 0 20upx;
	}
	.redBottom .title{
		font-size: 22upx;
		color: #333333;
		padding: 32upx 0 26upx 0 ;
		border-bottom: 1upx solid #e8e8e8;
	}
	.labelList{
		height: 108upx;
		
	}
	.labelList radio{
	
		margin: 34upx 30upx 0 0;
		
		}
		.labelText text{
			display:block;
		}
		.labelText text:nth-child(1){
			color: #000000;
			margin: 26upx 0 0 0;
			font-size: 26upx;
			font-weight:bold;
			
		}
		.labelText text:nth-child(2){
			color: #666666;
			margin:8upx 0 25upx 0;
			font-size: 22upx;
			
		}
		 radio-group{
			width: 100%;
		} 
		.borderBot{
			width: calc(100% - 60upx); 
			height: 108upx;
			border-bottom: 1upx solid #e8e8e8;
		}
		.labelText{
			display: inline-block;
			height: 108upx;
			padding-right: 0;
		}
	
		.Check{
			color: $uni-text-color-pay;
			font-size: 22upx;
			margin: 26upx 0 52upx 0;
			}
		.determine{
			width: 100%;
			height: 72upx;
			color: #ffffff;
			font-size:30upx;
			line-height: 72upx;
			text-align: center;
			border-radius: 15upx;
			background: $uni-color-level-gradual;
		}
</style>
