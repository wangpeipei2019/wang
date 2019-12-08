<template><!-- 需填入房屋信息，进度变化 -->
	<view class="informWrap" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="back"  :title='title'></uni-nav-bar>
		<view class="inform">
			<!-- <image :src="urlImg+img"></image> -->
			<image :src="urlImage+'scenicspot_house1@2x.jpg'"></image>
		</view>
		<view class="uni-flex uni-column newestTop">
			<view class="uni-flex uni-row newestTitle">
				<view>入住指引（{{percentData}}%）</view>
				<view @tap="openGuide">继续</view>
				<!-- <view>查看</view> -->
			</view>
			<view>
				<view class="progress-box">
					<progress :percent="percentData" activeColor="#45C298" active stroke-width="3" />
				</view>
			</view>
		</view>
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row informList">
				<view class="left">
					<view>房屋位置</view>
					<view>陕西宝鸡陈仓区宝鸡市陈仓区</view>
				</view>
				<view class="uni-flex uni-row right">
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList">
				<view class="left">
					<view>房屋详情</view>
					<view>3室1厅2卫1厨2阳台</view>
				</view>
				<view class="uni-flex uni-row right">
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList">
				<view class="left">
					<view>房屋描述</view>
					<view>起一个醒目的名城，描述房屋的名字</view>
				</view>
				<view class="uni-flex uni-row right">
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList">
				<view class="left">
					<view>设施服务</view>
					<view>无线网络，有线网络</view>
				</view>
				<view class="uni-flex uni-row right">
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList">
				<view class="left">
					<view>入住规则</view>
					<view>14：00后可办理入住，12：00前需办理离店</view>
				</view>
				<view class="uni-flex uni-row right">
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList">
				<view class="left">
					<view>价格设置</view>
					<view>基础价格1000</view>
				</view>
				<view class="uni-flex uni-row right">
					<image :src="urlImage+'my_left_icon.png'"></image>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row footer">
			<view class="left" @tap="openHouseSource">删除</view>
			<view class="right" @tap="openHouseSource">下架</view>
		</view> 
		<!-- <view class="uni-flex uni-row footer">
			<view class="left bg" @tap="openHouseSource">删除</view> 
			 <view class="right"  @tap="openHouseSource">上架</view> 
		</view> -->
		
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
				title:'特色住宅小区',
				"percentData":0,
				urlImage:'',
				isShow:false
			}
		},
		created() {
			this.urlImage = this.getApp.api.urlImage
			this.isShow=true
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/main/tabbar1/tabbar1'
				})
			},
			openGuide(){
				uni.navigateTo({
					url: '/pages/landlord/resource/guide/guide'
				}) 
			},
			openHouseSource(){
				uni.showToast({
					title: '功能正在完善中...',
					icon:'none'
				});
			}
		}
	}
</script>

<style scoped>
	view {
		line-height: 1em;
	}
	.informWrap {
		width: 100%;
		height: 100vh;
		background-color: #f8f8fb;
	}
	.inform {
		width: calc(100% - 60upx);
		padding: 34upx 30upx 40upx 30upx;
		border-top: 1upx solid #8f8f8f;
		background-color: #ffffff;
	}
	.inform image {
		width: 100%;
		height: 300upx;
		/* border: 1upx solid #007AFF; */
	}
	.newestTop{
		width: calc(100% - 60upx);
		height:125upx;
		padding: 0 30upx;
		background-color: #FFFFFF;
		margin-bottom: 12upx;
	}
	.newestTitle{
		justify-content: space-between;
	}
	.newestTitle view:nth-of-type(1){
		font-size: 34upx;
		color: #3d3d3d;
		padding: 5upx 0 36upx 0;
	}
	 .newestTitle view:nth-of-type(2){
		width: 140upx;
		height: 52upx;
		background: linear-gradient(to right, #44cfcd, #3dcf94);
		color: #ffffff;
		font-size: 26upx;
		text-align: center;
		line-height: 52upx;
		border-radius: 15upx;
	} 
	.progress-box {
		display: flex;
		height: 12upx;
		width: 100%;
		/* margin:18upx 0 0 0; */
	}
	.progress-box .uni-progress-inner-bar{
		background: #00CE47;
	}
	.informList {
		height: 118upx;
		background-color: #ffffff;
		border-radius: 1upx solid #f1f1f1;
		justify-content: space-between;
		padding: 0 30upx;
		border-bottom: 1upx solid #f8f8f8;
	}
	.informList .left view:nth-of-type(1) {
		color: #3d3d3d;
		font-weight: bold;
		font-size: 28upx;
		margin-top: 32upx;
	}
	.informList .left view:nth-of-type(2) {
		color: #3d3d3d;
		font-size: 22upx;
		margin-top: 10upx;
	}
	.informList .right .wait {
		font-size: 26upx;
		line-height: 118upx;
		margin-right: 10upx;
		color: red;
	}
	.informList .right image {
		width: 32upx;
		height: 32upx;
		margin-top: 45upx;
	}
	.informList:nth-last-of-type(1){
		margin-bottom: 65upx;
	}
	.footer {
		width: 100%;
		height: 85upx;
		position: fixed;
		bottom: 0;
		justify-content: center;
		background-color: #ffffff;
	}
	.footer .left,
	.footer .right{
		font-size: 26upx;
		line-height: 65upx;
		border: 1upx solid #b6b6b6;
		text-align: center;
		border-radius: 15upx;
		margin-bottom: 20upx;
	}
	.footer .left{
		width: 230upx;
		height: 65upx;
		background-color: #dcdcdc;
		margin-right: 16upx;
	}
	.footer .right{
		width: 460upx;
		height: 65upx;
		background-color: #ffffff;
		color: #6e6e6e;
	}
	.footer .bg{
		background-color: #ffffff;
	}
</style>
