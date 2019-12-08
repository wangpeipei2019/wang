<template>
	<view><!-- 获取浮动价，及修改方式 -->
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="back" @click-right="scan" right-text="保存" title="基础价"></uni-nav-bar>
		<view class="which">
			<view class="whichTop">
				<view class="title">基础价</view>
				<view class="text">基础价格是此间房屋的默认价格，如果您未对指定日期的价格做出修改，我们将按照基础价为您出租房屋</view>
			</view>
			<view class="uni-flex uni-row content">
				<view class="uni-flex uni-row left">
					<view>基础价</view>
					<view>整套{{houseInfo.house_type_bedroom}}室{{houseInfo.house_type_drawi}}厅{{houseInfo.house_type_toilet}}卫共1套</view>
				</view>
				<view class="uni-flex uni-row right">
					<input type="number" @input="watchNum" v-model="basePrice" />
					 <view>CNY</view>
				</view>
			</view>
			<view class="whichTop">
				<view class="title">请选择您所修改的基础价的使用范围</view>
			</view>
			<view>
				<radio-group @change="radioChange">
					<view class="radioBox">
						<label class="uni-flex uni-row radioList border"  key="">
								<view class="left">仅覆盖原有基础价</view>
								<view class="right">
									<radio value="1" :color="radioColor" style="transform:scale(0.8)" checked/>
								</view>
						</label>
					</view>
					<view class="radioBox">
						<label class="uni-flex uni-row radioList"  key="">
								<view class="left">覆盖所有价格<text>(包含修改“浮动价格”)</text></view>
								<view class="right">
									<radio style="transform:scale(0.8)" :color="radioColor" value="2"/>
								</view>
						</label>
					</view>
				</radio-group>
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
				houseInfo:{},
				basePrice:'',
				type:1,
				radioColor:'#45c298'
			}
		},
		computed: {
			houseId() {
				return this.$store.state.houseId
			}
		},
		onLoad(){
			this.token = uni.getStorageSync('token');
			this.houseInfoChangePrice()
		},
		methods: {
			houseInfoChangePrice(){
				uni.request({
					url: this.getApp.api.landlord.houseInfoChangePrice,
					method: 'GET',
					data: {
						houseId:this.houseId
					},
					header:{
						token:this.token
					},
					success: res => {
						if(res.data.code==0){
							this.houseInfo = res.data.list[0]
						}else{
							uni.showToast({
								title: '获取房屋信息失败'
							});
						}
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
				/* uni.navigateTo({
					url: '/pages/landlord/resource/listingCalendar/listingCalendar'
				}) */
			},
			watchNum(){
				setTimeout(() => { this.basePrice =this.basePrice.replace(/\D/g,'') ; }, 3)
			},
			scan() {
				var exp=/^[1-9][0-9]*$/;
				if(this.basePrice==''){
					uni.showToast({
						title: '基础价格不能为空',
						icon:'none'
					});
					
				} else if(!exp.test(this.basePrice)||this.basePrice==0){
					uni.showToast({
						title: '价格输入有误',
						icon:'none'
					});
				}
				else{
					uni.request({
						url: this.getApp.api.landlord.changeBasePrice,
						method: 'GET',
						data: {
							houseId:this.houseId,
							basePrice:this.basePrice,
							type:this.type
						},
						header:{
							token:this.token
						},
						success: res => {
							if(res.data.code==0){
								this.back()
								// components:{
								// 	uni.showToast({
								// 		title: res.data.msg
								// 	});
								// }
							}
						}
					});
				}
			},
			radioChange(evt) {
				// console.log(evt.detail.value)
				this.type = evt.detail.value
			}
		}
	}
</script>

<style scoped>
	view{
		line-height: 1em;
		}
	.which{
		width: 100%;
		height:calc(100vh - 145upx);
		background-color: #f8f7fd;
	}	
	.whichTop{
		width: calc(100% - 66upx);
		padding: 30upx 30upx 10upx 36upx;
		background-color: #f8f7fd;
		border-top:1upx solid #efeef4;
	}
	.whichTop .title{
		font-size: 24upx;
		color: #929292;
		padding-bottom: 10upx;
	}
	.whichTop .text{
		font-size: 20upx;
		color: #929292;
		padding-bottom: 10upx;
		line-height: 24upx;
	}
	.content{
		width: calc(100% - 66upx);
		padding: 0 30upx 0 36upx;
		background-color: #ffffff;
		height: 88upx;
	
		justify-content: space-between; 
	}
	.content .left view:nth-of-type(1){
		font-size: 24upx;
		color: #5c5c5c;
		line-height: 88upx;
		padding-right: 18upx;
	}
	.content .left view:nth-of-type(2){
		font-size: 22upx;
		color: #888888;
		line-height: 88upx;
	}
	.content .right{
		font-size: 22upx;
		color: #292929;
		padding: 23upx 0;
		line-height: 42upx;
	}
	.content .right input{
		text-align: right;
		margin-top: -4upx;
	}
	.content .right view{
		padding-left: 8upx;
		line-height: 42upx;
	}
	.radioBox{
		width: calc(100% - 36upx);
		padding-left: 36upx;
		background-color: #ffffff;
	}
	.radioList{
		justify-content: space-between;
		height: 92upx;
		}
	.border{
		border-bottom: 1upx solid #f8f8f8;
	}
	.radioList .left{
		line-height: 92upx;
		font-size: 24upx;
		color: #292929;
	}
	.radioList .left text{
		font-size: 22upx;
		color: #929292;
	}
	.radioList .right{
		padding-right: 10upx;
		padding-top: 20upx;
	}
</style>
