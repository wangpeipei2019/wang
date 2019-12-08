<template>
	<view class="addRec" v-if="isShow">
		<view class="uni-flex uni-column addRedTop">
			<view class="uni-flex uni-column center">
				<view class="logImg">
					<image :src="imageUrl+'nav_logo_zhifubao.png'"></image>
				</view>
				<view class="text">您需要填写有效的支付宝账号，以及真实的姓名</view>
			</view>
			<view class="uni-flex uni-row topList">
				<view class="left">支付宝账号</view>
				<view class="right">
					<input type="text" placeholder-style="color:#6dbcf7;" v-model="payAccount" placeholder="输入支付宝账号" />
				</view>
			</view>
			<view class="uni-flex uni-row topList">
				<view class="left">真实姓名</view>
				<view class="right">
					<input type="text" placeholder-style="color:#6dbcf7;" v-model="payName" placeholder="请输入真实姓名" />
				</view>
			</view>
		</view>
		<view class="uni-flex uni-column redBottom">
			<view class="title">您可以根据您的需要在一下的两种结算方式中选择：</view>
			<view class="uni-flex uni-column">
				<radio-group class="uni-flex uni-column" @change="radioChange">
					<label class="uni-flex uni-row labelList">
						<view>
							<radio :color="radioColor" style="transform:scale(0.8)" id="order" value="1" :checked="current"></radio>
						</view>
						<view class="borderBot">
							<label class="uni-flex uni-column labelText">
								<text>按订单结算</text>
								<text>小于7天每单结算1次，大于7天每周结算1次</text>
							</label>
						</view>
					</label>
					<label class="uni-flex uni-row labelList">
						<view>
							<radio :color="radioColor" style="transform:scale(0.8)" id="date" value="2" :checked="!current"></radio>
						</view>
						<view class="borderBot">
							<label class="uni-flex uni-column labelText">
								<text>按日结算</text>
								<text>每日结算1次</text>
							</label>
						</view>
					</label>
				</radio-group>
			</view>
			<view class="Check">提交前请仔细核对，以免造成不必要的损失</view>
			<!-- <view class="determine" @tap="savePaymethod">提交审核</view> -->
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="savePaymethod">提交审核</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				payAccount: '',
				payName: '',
				settlementMethod: 1,
				current:true,
				cardFocus:'',
				nameFocus:'',
				imageUrl:'',
				isShow:false,
				 radioColor:'#45c298' 
			}
		},
		onLoad(){
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.queryPaymethod()
		},
		methods: {
			radioChange: function(e) {
				this.settlementMethod = e.target.value
				// console.log(e.target.value)
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
			},
			savePaymethod() {
				var reg=/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
				var regVlue=/^[\u4e00-\u9fa5]+$/;
				if (this.payAccount == '') {
					uni.showToast({
						title: '账号不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else if(this.payAccount !=''&&!reg.test(this.payAccount)){
					uni.showToast({
						title: '账号格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else if (this.payName == '') {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				} else if(this.payName !=''&&!regVlue.test(this.payName)){
					uni.showToast({
						title: '姓名格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}
				else {
					uni.request({
						url: this.getApp.api.attestation.savePaymethod,
						method: 'POST',
						data: {
							payAccount: this.payAccount,
							payName: this.payName,
							payType: 1,
							settlementMethod: this.settlementMethod
						},
						header: {
							token: this.token
						},
						success: res => {
							if(res.data.msg==1){
								uni.showToast({
									title: '请先完善前两条信息',
									icon:'none'
								});
							}else if(res.data.msg==0){
								uni.navigateBack({
									delta: 3
								});
							}
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}

	.addRec {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
	}

	.addRedTop {
		width: 100%;
		height: 460upx;
		background-color: #19a0db;
	}

	.addRedTop image {
		width: 230upx;
		height: 60upx;
		margin: 0 auto;

	}

	.addRedTop .center {
		justify-content: center;
		text-align: center;
	}

	.center .logImg {
		margin: 46upx 0 18upx 0;
	}

	.center .text {
		margin: 0 0 52upx 0;
		font-size: 24upx;
		color: #FFFFFF;
	}

	.topList {
		justify-content: space-between;
		height: 90upx;
		margin: 0 24upx 0 24upx;
		border-bottom: 1upx solid #4ac1f4;
		line-height: 90upx;
	}

	.topList .left {
		color: #ffffff;
		font-size: 26upx;
		line-height: 90upx;
	}

	.topList .right input {
		text-align: right;
		font-size: 26upx;
		color: #ffffff;
		line-height: 90upx;
		height: 90upx;
	}

	.redBottom {
		margin: 0 30upx 0 20upx;
	}

	.redBottom .title {
		font-size: 22upx;
		color: #333333;
		padding: 32upx 0 26upx 0;
		border-bottom: 1upx solid #e8e8e8;
	}

	.labelList {
		height: 108upx;

	}

	.labelList radio {

		margin: 28upx 30upx 0 0;

	}

	.labelText text {
		display: block;
	}

	.labelText text:nth-child(1) {
		color: #000000;
		margin: 26upx 0 0 0;
		font-size: 26upx;
		font-weight: bold;

	}

	.labelText text:nth-child(2) {
		color: #666666;
		margin: 8upx 0 25upx 0;
		font-size: 22upx;

	}

	radio-group {
		width: 100%;
	}

	.borderBot {
		width: calc(100% - 60upx);
		height: 108upx;
		border-bottom: 1upx solid #e8e8e8;
	}

	.labelText {
		display: inline-block;
		height: 108upx;
		padding-right: 0;
	}

	.Check {
		color: $uni-text-color-pay;
		font-size: 22upx;
		margin: 26upx 0 52upx 0;
	}

	/* .determine {
		width: 100%;
		height: 88upx;
		color: #ffffff;
		font-size: 26upx;
		line-height: 88upx;
		text-align: center;
		border-radius: 15upx;
		background: $uni-color-level-gradual;
	} */
	.bottomWarp{
		width: calc(100% - 48upx);
		background-color: #ffffff;
		height: 88upx;
		padding: 20upx 24upx;
		position: fixed;
		bottom: 0;
		z-index: 5;
	}
	.bottom {
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		font-size: 26upx;
		text-align: center;
		border-radius: 15upx;
		color: #ffffff;
		background: $uni-color-level-gradual;
		z-index: 15;
	}
	
</style>
