<template>
	<view class="inconeWarp">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="back"  title="收入明细"></uni-nav-bar>
		<view class="marginBot">
			<view class="inconeList" v-for="item in incomeDetails" :key="item.order_name">
				<view class="date">{{item.settlement_time}}</view>
				<view class="uni-flex uni-row incone">
					<view>
						<view class="uni-flex uni-row inconeName">
							<view>{{item.order_name}}</view><view>{{item.settlement_days}}晚1套</view>
						</view>
						<view class="inconeHuose">{{item.house_name}}</view>
					</view>
					<view class="inconeAmount"><text>+</text>{{item.settlement_amount}}.00</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	export default{
		components: {
			uniNavBar,
			uniIcon
		},
		data(){
			return{
				token:'',
				incomeDetails:[]
			}
		},
		onLoad(e) {
			this.token = uni.getStorageSync('token')
			this.getInfo()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
				/* uni.navigateTo({
					url: '/pages/landlord/operating/operating'
				}) */
			},
			getInfo(){
				uni.request({
					url: this.getApp.api.operating.incomeDetails,
					method: 'POST',
					header: {
						 token: this.token, 
					},
					success: res => {
						console.log(res)
						if(res.data.code==0){
							if(res.data.Detailed!=''&&res.data.Detailed!=null){
								this.incomeDetails=res.data.Detailed
								for(var i=0;i<res.data.Detailed.length;i++){
									var str=res.data.Detailed[i].settlement_time.slice(0,10)
									this.incomeDetails[i].settlement_time=str
								}
								
							}	
						 } 
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
	.inconeWarp{
		width: 100%;
		height: 100vh;
		background-color: #fafafa;
	}
	.inconeWarp .date{
		width: calc(100% - 26upx);
		font-size: 24upx;
		color:#9b9fa2;
		padding: 30upx 0 16upx 26upx;
		background-color: #f7faf9;
	}
	.incone{
		justify-content: space-between;
		width: 100%;
		height:140upx;
		background-color: #FFFFFF;
	}
	.inconeName{
		font-size: 24upx;
		color: #313131;
		padding: 40upx 0 0 33upx;
	}
	.inconeName view :nth-of-type(1){
		padding-right: 8upx;
	}
	.inconeHuose{
		padding: 16upx 0 0 38upx;
		font-size: 24upx;
		color:#9b9fa2;
	}
	.inconeAmount{
		font-size: 24upx;
		color:$uni-text-color-landlord;
		padding-right: 36upx;
	}
	.inconeAmount text{
		font-size: 26upx;
		line-height: 140upx;
	}
	.marginBot{
		margin-bottom: 20upx;
	}
</style>
