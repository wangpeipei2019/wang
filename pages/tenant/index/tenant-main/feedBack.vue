<template>
	<view class="bgBox">
		<view class="code">
			<view class="codeWrap">
				<textarea :maxlength="500"  @input="watch" v-model="ideaContent"  placeholder-style="color:#a8a8a8;" placeholder="请留下您的意见,如功能需求,产品吐槽,我们会努力改进"></textarea>
				<view class="number">{{changeNum}}/500</view>
			</view>
			<view class="button" @tap="saveFeed">提交</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				token:'',
				ideaContent:'',
				changeNum:0
			}
		},
		created() {
			this.token = uni.getStorageSync('token');
			console.log(this.token)
			
		},
		methods: {
			watch(){
				this.changeNum=this.ideaContent.length
			},
			comeBack(){
				uni.reLaunch({
					url: '/pages/main/tabbar3/tabbar3'
				});
			},
			saveFeed(){
				var reg=/^[\u4E00-\u9FA5，.。！、……A-Za-z\d\-\_]{0,1000}$/;
				if(this.ideaContent==''){
					uni.showToast({
						title: '输入内容不能为空',
						icon: 'none'
					});
					return
				}if(this.ideaContent!=''&&!reg.test(this.ideaContent)){
						uni.showToast({
							title: '输入内容有误',
							icon: 'none'
						});
						return
					}else{
						uni.request({
							url: this.getApp.api.setting.save,
							method: 'POST',
							header: {
								token: this.token
							},
							data: {
								ideaContent:this.ideaContent,
								ideaType:'1'
							},
							success: res => {
								console.log(res)
								if(res.data.code==0){
									uni.switchTab({
										url: '/pages/main/tabbar3/tabbar3'
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
	.bgBox{
		width: 100%;
		height: 100vh;
		border-top: 1upx solid #f3f3f3;
		background-color: #f8f8fb;
	}
	.code{
		width: calc(100% - 64upx);
		height: 300upx;
		background: #ffffff;
		padding: 32upx 32upx 32upx 32upx;
	}
	.codeWrap{
		width: 500upx;
		width: calc(100% - 64upx);
		width: 100%;
		height:300upx;
		border-radius: 15upx;
		background-color: #f6f6f6;
	}
		
	.codeWrap textarea{
		padding:20upx 22upx 5upx 22upx;
		background-color: #f6f6f6;
		width: calc(100% - 44upx);
		height: 233upx;
		 font-size: 24upx; 
		
	}
	.codeWrap .number{
	text-align: right;
	font-size: 18upx;
	color: #656565;
	margin-right: 24upx;
	}
	.button{
		margin:100upx auto;
		width: 100%;
		border-radius: 15upx;
		height: 78upx;
		color: #ffffff;
		line-height: 78upx;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		background: $uni-color-level-gradual;
	}
</style>
