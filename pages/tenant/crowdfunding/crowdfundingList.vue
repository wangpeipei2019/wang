<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" title="众筹" left-icon="back" @click-left="comeBack"></uni-nav-bar>
		<view class="crowdfunding">
			<view class="uni-flex uni-column">
				<view class=" uni-flex uni-column projectList" @tap="openSubscription(item.id)" v-for="item in crowdFundingManage"
				 :key="item.id">
					<view class="imgTop">
						<image :src="urlImage+item.crowdFundingPictures"></image>
					</view>
					<view class="uni-flex uni-row location">
						<view class="uni-flex uni-row left">
							<view>
								<image :src="urlImage+'city_location@2x.png.png'"></image>
							</view>
							<view class="text">{{item.projectType==0?item.projectProvince:item.projectProvince+'-'+item.projectCity}}</view>
						</view>
						<view class="uni-flex uni-row right">
							<view class="text">{{item.projectType==0?'模拟投资':item.projectType==1?'休闲':item.projectType==2?'民宿':item.projectType==3?'酒店':''}}</view>
							<view class="text" :class="{active:item.projectStatus==1,complete:item.projectStatus==2,trailNotice:item.projectStatus==0}">{{item.projectStatus==0?'预告中':item.projectStatus==1?'认购中':item.projectStatus==2?'已结束':'暂无数据'}}</view>
						</view>
					</view>
					<view class="projectTitle">{{item.projectName}}</view>
					<view class="projectText">{{item.projectBackground}}</view>
					<view class="uni-flex uni-row projectTime" :class="{end:item.projectStatus==2}" v-if="item.projectStatus!=0">
						<view class="left" v-if="item.projectStatus==1">剩余时间：{{item.remainingTime}}天</view>
						<view class="right">{{item.projectStatus==2?'已预约：'+item.reservations+'%':'认购进度：'+item.subscriptionProgress+'%'}}</view>
					</view>
					<view class="progress-box" v-if="item.projectStatus!=0">
						<progress :percent="item.projectStatus==2?0:item.subscriptionProgress" activeColor="#45C298" active stroke-width="3" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				"percentData": 85,
				"percentData1": 60,
				"percentData4": 100,
				urlImage: '',
				crowdFundingManage: [],
				isShow: false,
				status:'',
			};
		},
		components: {
			uniNavBar
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.status = e.status
			this.getCrowdsourcingList()
		},
		methods: {
			getCrowdsourcingList() {
				uni.request({
					url: this.getApp.api.crowdFunding.crowdsourcingSeeMore,
					method: 'GET',
					data: {
						status:this.status
					},
					success: res => {
						if (res.data.code == 0) {
							this.crowdFundingManage = res.data.crowdFundingManage
							this.isShow = true
						}
					}
				});
			},
			comeBack(){
				uni.navigateBack({});
			},
			openSubscription(id) {
				uni.navigateTo({
					url: '/pages/tenant/crowdfunding/subscription?id=' + id + '&isBuy=' + 0
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.crowdfunding {
		width: 100%;
		height: calc(100% - 88upx)vh;
		background-color: #f7f7f7;
		border-top: 3upx solid #f0f0f0;
	}

	.projectList {
		padding: 30upx 30upx 32upx 30upx;
		width: calc(100% - 60upx);
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}

	.location {
		padding-left: 12upx;
		padding-right: 12upx;
	}

	.location .left {
		justify-content: start;
		color: #707070;
		font-size: 22upx;
	}

	.location .left .text,
	.location .right .text {
		font-size: 22upx;
		margin-top: 26upx;
		margin: 26upx 0 24upx 0;
		line-height: 1em;
	}

	.location .left image {
		width: 28upx;
		height: 28upx;
		vertical-align: top;
		margin-top: 24upx;
		margin-right: 30upx;
	}

	.paddingLeft {
		padding-left: 12upx;
	}

	.location .right {
		justify-content: end;
		padding-right: 12upx;
		color: #707070;
		font-size: 22upx;
	}

	.location {
		justify-content: space-between;
		color: #707070;
		font-size: 22upx;
	}

	.projectTitle {
		color: #3d3d3d;
		font-size: 28upx;
		font-weight: bold;
		line-height: 1em;
		margin-bottom: 16upx;
		padding-left: 12upx;
		padding-right: 12upx;
	}

	.projectText {
		color: #707070;
		font-size: 22upx;
		line-height: 32upx;
		padding-left: 12upx;
		padding-right: 12upx;
	}

	.projectList .active {
		color: $uni-text-color-green;
	}

	.projectList .complete {
		color: #b6b6b6;
	}

	.projectList .out {
		color: #434343;
		padding-left: 30upx;
	}

	.imgTop image {
		width: 100%;
		height: 380upx;
		border-radius: 15upx;
		vertical-align: top;
	}

	.projectTime {
		justify-content: space-between;
		padding-top: 47upx;
		padding-left: 12upx;
		padding-right: 12upx;
		/* 	border: 1upx solid #007AFF; */
	}

	.projectTime.end {
		justify-content: flex-end;
	}

	.projectTime .left {
		width: 130upx;
		height: 44upx;
		font-size: 16upx;
		color: $uni-text-color-orange;
		line-height: 44upx;
		text-align: center;
		box-shadow: #f1f1f4 0px 0px 10px;
		border-radius: 8upx;
	}

	.projectTime .right {
		width: 136upx;
		height: 44upx;
		font-size: 16upx;
		color: $uni-text-color-green;
		line-height: 44upx;
		text-align: center;
		box-shadow: #f1f1f4 0px 0px 10px;
		border-radius: 8upx;
	}

	.progress-box {
		display: flex;
		height: 10upx;
		width: 100%;
		margin: 18upx 0 0 0;
	}

	.progress-box .uni-progress-inner-bar {
		background: #00CE47;
	}

	.uni-icon {
		line-height: 1.5;
	}

	.attention {
		justify-content: space-between;
		padding-top: 47upx;
		padding-left: 12upx;
		padding-right: 12upx;

	}

	.attention .left {
		font-size: 22upx;
		color: #3D3D3D;
		line-height: 46upx;
		font-weight: bold;
	}

	.attention .right {
		font-size: 22upx;
		color: #ffffff;
		background: $uni-text-color-green;
		width: 120upx;
		height: 46upx;
		line-height: 46upx;
		text-align: center;
	}
	.location .right .text:last-child{
		padding-left: 30upx;
	}
	.reservation {
		justify-content: flex-end;
		padding-right: 12upx;
		padding-top: 47upx;
	}

	.reservation .right {
		width: 136upx;
		height: 44upx;
		font-size: 16upx;
		color: $uni-text-color-green;
		line-height: 44upx;
		text-align: center;
		box-shadow: #f1f1f4 0px 0px 10px;
		border-radius: 8upx;
	}

	.product-list {
		display: flex;
		width: calc(100% - 60upx);
		padding: 0 30upx;
		flex-wrap: wrap;
		flex-direction: row;
		background-color: #ffffff;
		margin-bottom: 20upx;
		justify-content: space-between;
	}

	.product-list:nth-last-of-type(1) {
		margin-bottom: 0;
	}

	.product-top {
		background-color: #ffffff;
		padding: 0 30upx;
		justify-content: space-between;
	}

	.product-top .left {
		line-height: 1em;
		padding: 35upx 0 25upx 0;
	}

	.product-top .right {
		line-height: 1em;
		padding: 38upx 0 28upx 0;
	}

	.product {
		padding: 0 0 20upx;
		display: flex;
		flex-direction: column;
	}

	.image-view {
		height: 225upx;
		width: 340upx;
		margin: 0 0 12upx 0;
	}

	.product-image {
		height: 225upx;
		width: 340upx;
		border-radius: 15upx;
	}

	.product-title {
		width: 320upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.3;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 27upx;
		color: #1B1B1B;
		margin: 0 auto 30upx auto;
	}

	.product-text {
		justify-content: space-between;
		margin: 8upx auto 15upx auto;
		width: 320upx;
	}

	.product-text view {
		font-size: 23upx;
		color: #707070;
		line-height: 1.3;
	}

	.product-text span {
		padding-left: 20upx;
		font-size: 23upx;
		line-height: 1.3;
	}

	.Subscription span {
		color: $uni-text-color-green;
	}

	.projectList .trailNotice,.trail-notice span {
		color: $uni-text-color-orange;
	}

	.end span {
		color: #b6b6b6;
	}
</style>
