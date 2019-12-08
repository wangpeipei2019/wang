<template>
	<view class="setting">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="意见反馈"></uni-nav-bar>
		<view class="code">
			<view class="codeWrap">
				<textarea :maxlength="500"  @input="watch()" placeholder-style="color:#a8a8a8;" v-model="ideaContent" placeholder="请留下您的意见,如功能需求,产品吐槽,我们会努力改进"></textarea>
				<view class="number">{{changeNum}}/500</view>
			</view>
			 <view class="button" @tap ="saveFeed()">提交</view>
		</view>
	</view>
</template>
<script>
		import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default{
		components:{
			uniNavBar
		},
		data() {
			return {
				token:'',
				ideaContent:'',
				changeNum:0,
				Surplus:0
			}
		},
		onLoad(){
			this.token = uni.getStorageSync('token')
		},
		methods:{
			comeBack(){
				uni.redirectTo({
					url: '/pages/setting/landlord/setting'
				})
			},
			watch(){
				this.changeNum=this.ideaContent.length
				this.Surplus = 500 - this.changeNum;
			},
			saveFeed() {
				var reg=/^[\u4E00-\u9FA5，.。！、……A-Za-z\d\-\_]{0,1000}$/;
				if(this.ideaContent==''){
					uni.showToast({
						title: '输入内容不能为空',
						icon: 'none'
					});
					return
				}
				if(this.ideaContent!=''&&!reg.test(this.ideaContent)){
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
							ideaType:'2'
						},
						success: res => {
							console.log(res)
							if(res.data.code==0){
								uni.redirectTo({
								url:'/pages/setting/landlord/setting'
								})
							}
						}
					});
				}
				
			} 
			
		}
	}
</script>

<style lang="scss" scoped>
.setting {
	width: 100%;
	height: 100vh;

	background-color: #f8f8fb;
}
.code{
	width: calc(100% - 60upx);
	padding: 30upx 30upx 30upx 30upx;
	background: #ffffff;
	height: 300upx;
	border-top: 1upx solid #f3f3f3;
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
		overflow-y: auto;
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
