<template>
	<!-- 项目介绍,投资方案,区域须添加软文图片 ，地理位置，地图区域没做-->
	<view class="subscription" v-if="isShow">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			<uni-nav-bar :backgroundColor="bg" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()"></uni-nav-bar>
			<view class=" uni-flex uni-column ">
				<view class="imgTop">
					<image :src="urlImage+crowdFundingManage.crowdFundingPictures"></image>
				</view>
				<view class="projectList">
					<view class="uni-flex uni-row location">
						<view class="uni-flex uni-row left">
							<view>
								<image :src="urlImage+'city_location@2x.png.png'"></image>
							</view>
							<view class="text">{{crowdFundingManage.projectType==0?crowdFundingManage.projectProvince:crowdFundingManage.projectProvince+'-'+crowdFundingManage.projectCity}}</view>
						</view>
						<view class="uni-flex uni-row right">
							<image :src="urlImage+crowdFundingManage.companyLogo" mode="widthFix"></image>
							<!-- <view class="text">华盛外滩</view> -->
						</view>
					</view>
					<view class="projectTitle">{{crowdFundingManage.projectName}}</view>
					<view class="projectText">{{crowdFundingManage.projectBackground}}</view>
					<view class="uni-flex uni-row projectTime" :class="{end:crowdFundingManage.projectStatus==2}" v-if="crowdFundingManage.projectStatus!=0">
						<view class="left" v-if="crowdFundingManage.projectStatus==1">剩余时间：{{crowdFundingManage.remainingTime}}天</view>
						<view class="right">{{crowdFundingManage.projectStatus==1?'认购进度：'+crowdFundingManage.subscriptionProgress+'%':'已预约：'+crowdFundingManage.reservations+'%'}}</view>
					</view>
					<view class="progress-box" v-if="crowdFundingManage.projectStatus!=0">
						<progress :percent="crowdFundingManage.subscriptionProgress" activeColor="#45C298" active stroke-width="3" />
					</view>
				</view>
				<view class="uni-flex uni-row sell" v-if="crowdFundingManage.projectStatus!=0">
					<view class="sellList">
						<view>{{crowdFundingManage.targetMoney}}万</view>
						<view>目标</view>
					</view>
					<view class="sellList">
						<view>{{crowdFundingManage.alreadyMoney}}万</view>
						<view>已预约</view>
					</view>
					<view class="sellList">
						<view>{{crowdFundingManage.lessMoney}}万</view>
						<view>起投金额</view>
					</view>
				</view>
			</view>
			<view class="details">
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
					 :activeColor="activeColor"></uni-segmented-control>
				</view>

				<view class="content">
					<view v-show="current === 0">
						<view class="introduction">
							<view class="introductionImg" v-for="(item,index) in crowdFundingManage.projectIntroduction" :key="index">
								<image style="width: 750upx; height:834upx;" mode="widthFix" :src="urlImage+item"></image>

							</view>
						</view>
					</view>
					<view v-show="current === 1">
						<view class="program">
							<view class="programImg" v-for="(item,index) in crowdFundingManage.investmentProgramme" :key="index">
								<image style="width: 750upx; height:976upx;" mode="widthFix" :src="urlImage+item"></image>
							</view>
						</view>
					</view>
					<view v-show="current === 2">
						<view class="information">
							<view class="informationList">
								<view class="time">{{crowdFundingManage.projectStartTime}}</view>
								<view class="inform">
									<view class="title">{{crowdFundingManage.projectName}}</view>
									<view v-for="item in crowdFundingManage.informationDisclosure" :key="item.id" @tap="openImg(item.pictuesServerAddress)">{{item.crowdFundingPictures}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="background:#fff;height:83upx;" v-if="crowdFundingManage.projectStatus!=0&&isBuy==0"></view>
			<view class="bottomWarp" v-if="crowdFundingManage.projectStatus!=0&&isBuy==0">
				<view v-if="crowdFundingManage.projectStatus==1" class="bottom" @tap="openProgram(crowdFundingManage.id)">认购</view>
				<view v-else-if="crowdFundingManage.projectStatus==2" class="bottom" style="background:#D6D6D6;">认购完成</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniSegmentedControl,
			uniNavBar
		},
		data() {
			return {
				bg: "rgba(255,255,255,0)",
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				"percentData1": 60,
				items: [

					'项目介绍',
					'投资方案',
					'信息披露'
				],
				current: 0,
				colorIndex: 0,
				backgroundColor: '#ffffff',
				styleType: 'button',
				token: '',
				landlordOrderList: '',
				urlImage: '',
				id: '',
				crowdFundingManage: {},
				isShow: false,
				isBuy: ''
			};
		},
		onLoad(e) {
			this.id = e.id
			this.isBuy = e.isBuy
			this.urlImage = this.getApp.api.urlImage
			this.getCrowdsourcingDetails()
		},
		methods: {
			getCrowdsourcingDetails() {
				uni.request({
					url: this.getApp.api.crowdFunding.crowdsourcingDetails,
					method: 'GET',
					data: {
						id: this.id
					},
					success: res => {
						this.crowdFundingManage = res.data.crowdFundingManage
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			openImg(pictues) {
				uni.downloadFile({
					url: pictues,
					success: function(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			},
			styleChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.styleType = evt.target.value;
				}
			},
			colorChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.activeColor = evt.target.value;
				}

			},
			openProgram(id) {
				uni.navigateTo({
					url: '/pages/tenant/crowdfunding/program?id=' + id
				})
			},
			comeBack() {
				// uni.switchTab({
				// 	url: "/pages/main/tabbar2/tabbar2"
				// })
				uni.navigateBack({});
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
				if (this.old.scrollTop >= 99 && this.old.scrollTop < 105) {
					this.bg = 'rgba(255,255,255,0.3)'
				} else if (this.old.scrollTop >= 105 && this.old.scrollTop < 125) {
					this.bg = 'rgba(255,255,255,0.5)'
				} else if (this.old.scrollTop >= 125 && this.old.scrollTop < 155) {
					this.bg = 'rgba(255,255,255,0.7)'
				}else if (this.old.scrollTop >= 155 && this.old.scrollTop < 180) {
					this.bg = 'rgba(255,255,255,0.9)'
				} else if (this.old.scrollTop >= 180) {
					this.bg = 'rgba(255,255,255,1)'
				} else if (this.old.scrollTop < 90) {
					this.bg = 'rgba(255,255,255,0)'
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.projectTime .end {
		justify-content: flex-end;
	}

	.scroll-Y {
		height: 100vh;
	}

	.subscription {}

	.projectList {
		padding: 0 30upx 30upx 30upx;
		width: calc(100% - 60upx);
		background-color: #FFFFFF;
	}

	.imgTop image {
		width: 100%;
		height: 380upx;
		vertical-align: top;
	}

	.location .left {
		justify-content: start;
		color: #707070;
		font-size: 22upx;
	}

	.location .left .text,
	.location .right .text {
		font-size: 22upx;
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
		align-items: center;
	}

	.location .right image {
		justify-content: end;
		margin-right: 12upx;
		width: 230upx;
		height: 60upx;
		/* border-radius: 50%; */
	}

	.location {
		justify-content: space-between;
		color: #707070;
		font-size: 22upx;
		padding-left: 12upx;
		padding-right: 12upx;
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
		font-size: 27upx;
		line-height: 32upx;
		padding-left: 12upx;
		padding-right: 12upx;

	}

	.projectList .active {
		color: #45c298;
		padding-left: 30upx;
	}

	.projectList .out {
		color: #434343;
		padding-left: 30upx;
	}

	.projectTime {
		justify-content: space-between;
		padding-top: 47upx;
		padding-left: 12upx;
		padding-right: 12upx;
		/* 	border: 1upx solid #007AFF; */
	}

	.projectTime .left,
	.projectTime .right {
		height: 44upx;
		font-size: 16upx;
		line-height: 44upx;
		text-align: center;
		box-shadow: #f1f1f4 0px 0px 10px;
		border-radius: 8upx;
	}

	.projectTime .left {
		width: 130upx;
		color: $uni-text-color-orange;
	}

	.projectTime .right {
		width: 136upx;
		color: $uni-text-color-green;
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

	.sell {
		width: calc(100% - 60upx);
		height: 130upx;
		flex: 1;
		padding: 0 30upx;
		box-shadow: #f1f1f4 0px 2px 2px;
	}

	.sellList {
		width: 230upx;
		text-align: center;
	}

	.sellList view:nth-of-type(1) {
		font-size: 32upx;
		color: #3d3d3d;
		font-weight: bold;
		font-family: '\9ED1\4F53';
	}

	.sellList view:nth-of-type(2) {
		font-size: 22upx;
		color: #707070;
	}

	.details {
		width: 100%;
		background-color: #ffffff;
		border-top: 10px solid #fafafa;
	}

	.uni-common-mt {
		margin-top: 0;
		border-bottom: 2px solid #eee;
		background: #fff;
		width: 750upx;
		box-sizing: border-box;
	}

	.introduction {
		width: 100%;
		background-color: #fafafa;
	}

	.introductionImg {
		width: 100%;
		/* padding-bottom: 83upx; */
	}

	.introductionImg image {
		width: 100%;
		width: 750upx;
	}

	.introduction .textTop {
		padding-top: 56upx;
		width: 100%;
		text-align: center;
	}

	.introduction .textTop view {
		font-size: 24upx;
		line-height: 50upx;
		color: #212121;
	}

	.introduction .img {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		height: 355upx;
		margin-top: 15upx;
		background-color: #FFFFFF;
	}

	.introduction .img .imgList {
		width: calc(25% - 2upx);
		height: 355upx;
		margin-right: 2upx;
	}

	.introduction .img image {
		vertical-align: top;
		width: 100%;
		height: 355upx;

	}

	.introduction .text1 {
		width: calc(100% - 60upx);
		padding-top: 35upx;
		padding: 35upx 30upx 0 30upx;
	}

	.introduction .text1 .textList {
		background-color: #ffffff;
		margin-bottom: 16upx;
		line-height: 28upx;
		font-size: 22upx;
		color: #212121;
	}

	.location {
		width: 100%;
		background-color: #ffffff;
		text-align: center;
		/* padding: 15upx 0 20upx 0; */
	}

	.triangle-down {
		width: 0;
		height: 0;
		border-left: 15upx solid transparent;
		border-right: 15upx solid transparent;
		border-top: 25upx solid #000000;
		margin: 15upx auto 20upx auto;
	}

	.location .title {
		color: #000000;
		font-size: 32upx;
		margin-bottom: 60upx;
	}

	.location .img {
		width: calc(100% - 60upx);
		height: 320upx;

	}

	.location .address {
		/* width:65%; */
		width: 600upx;
		height: upx;
		margin-left: 45upx;
		border: 1upx solid #cfcfca;
		padding: 10upx 0 24upx 0;
	}

	.address .addressTop {
		/* width:calc(100% -60upx); */
		line-height: 1em;
		border-bottom: 3upx solid #000000;
		font-size: 28upx;
		color: #000000;
		text-align: left;
		margin: 0 30upx;
		line-height: 64upx;
	}

	.address .eddressBottom {
		line-height: 1em;
		text-align: left;
		font-size: 22upx;
		line-height: 44upx;
		color: #212121;
		padding-left: 30upx;
	}

	.program {
		width: 100%;
		padding-bottom: 83upx;
	}

	.programImg image {
		width: 100%;
		height: 410upx;
	}

	.information {
		width: calc(100% - 100upx);

		padding: 0 50upx;
		padding-bottom: 83upx;
	}

	.informationList .time {
		font-size: 22upx;
		color: #3d3d3d;
		line-height: 82upx;
	}

	.informationList .inform {
		padding-left: 28upx;
		width: 630upx;
		height: 300upx;
		box-shadow: 0 -8upx 8upx #f6f5fb;
		border-left: 3upx solid #f7f6fe;
		border-right: 3upx solid #f7f6fe
	}

	.informationList .inform .title {
		line-height: 82upx;
		font-size: 32upx;
		color: #000000;
	}

	.bottom {
		position: absolute;
		right: 0;
		width: 750upx;
		height: 106upx;
		line-height: 106upx;
		color: #ffffff;
		font-size: 32upx;
		text-align: center;
		background: $uni-color-level-gradual;
	}

	.bottomWarp {
		width: 100%;
		height:106upx;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}
</style>
