<template>
	<!-- contImg软文区需要添加图片 -->
	<view class="programList" v-if="isShow">
		<view class="programWarp">
			<view class="title">{{crowdFundingProgramme.programmeTitle}}</view>
			<view class="uni-flex uni-row sell">
				<view class="left">个人限购{{crowdFundingProgramme.limitedShare}}份</view>
				<view class="uni-flex uni-row right">
					<view>￥{{crowdFundingProgramme.subscriptionMonovalent}}.00</view>
					<view>/份</view>
				</view>
			</view>
			<view class="top">收益权</view>
		</view>
		<rich-text class="text-clamp" :nodes="crowdFundingProgramme.programmeDetails"></rich-text>
		<view class="uni-flex uni-row bottom" v-if="isBuy==0">
			<view>剩余{{crowdFundingProgramme.surplusShare}}份/共{{crowdFundingProgramme.totalShare}}份</view>
			<view @tap="openOrderConf(crowdFundingProgramme.projectId,crowdFundingProgramme.schemeId)">认购</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				schemeId: '',
				isShow: false,
				token: '',
				crowdFundingProgramme: {},
				isBuy: ''
			}
		},
		onLoad(e) {
			this.id = e.projectId
			this.schemeId = e.schemeId
			this.isBuy = e.isBuy
			this.getProgramme()
		},
		methods: {
			getProgramme() {
				uni.request({
					url: this.getApp.api.crowdFunding.investmentProgrammeInfo,
					method: 'GET',
					data: {
						projectId: this.id,
						schemeId: this.schemeId
					},
					success: res => {
						this.crowdFundingProgramme = res.data.crowdFundingProgramme
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			openOrderConf(projectId, schemeId) {
				this.token = uni.getStorageSync('token')
				if (this.token == '') {
					this.openLogin()
				} else {
					uni.request({
						url: this.getApp.api.crowdFunding.phoneAndEmail,
						method: 'POST',
						data: {},
						header: {
							token: this.token
						},
						success: res => {
							if (res.data.code == 0) {
								uni.navigateTo({
									url: "/pages/tenant/crowdfunding/OrderConfirmation?projectId=" + projectId + '&schemeId=' + schemeId
								})
							} else {
								this.openLogin()
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			openLogin() {
				var res = global.isLogin();
				if (!res) {
					uni.showModal({
						title: '请登录',
						content: "请登录",
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/login/login"
								});
								this.$store.commit('changeBackIndex', 0)
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.programList {
		width: 100%;
		padding: 0 0 144upx;
		background-color: #ffffff;
	}

	.programWarp {
		width: calc(100% - 60upx);
		padding: 0 30upx;
	}

	.programWarp .title {
		font-size: 34upx;
		color: #3d3d3d;
		font-weight: bold;
		padding-top: 26upx;
	}

	.programWarp .sell {
		justify-content: space-between;

	}

	.programWarp .left {
		font-size: 24upx;
		color: #4f4f4f;
		line-height: 1em;
		padding: 14upx 0;
	}

	.programWarp .right {
		padding: 14upx 0;
	}

	.programWarp .right view:nth-of-type(1) {
		font-size: 34upx;
		color: #fd7a0e;
		font-weight: bold;
		line-height: 1em;
	}

	.programWarp .right view:nth-of-type(2) {
		font-size: 24upx;
		color: #4f4f4f;
		line-height: 1em;
		margin: 8upx 0 0 3upx;
	}

	.programWarp .top {
		line-height: 1em;
		font-size: 22upx;
		color: #707070;
		padding: 50upx 0;
	}

	.contImg {
		width: 100%;
		padding-bottom: ;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		right: 0;
		width: calc(100% - 30upx);
		padding-left: 30upx;
		height: 106upx;
		border-top: 1upx solid #ededed;
		color: #ffffff;
		font-size: 32upx;
		background: #fff;
		justify-content: space-between;
	}

	.bottom view:nth-of-type(1) {
		line-height: 106upx;
		font-size: 30upx;
		color: #3d3d3d;
	}

	.bottom view:nth-of-type(2) {
		font-size: 34upx;
		color: #ffffff;
		width: 247upx;
		height: 106upx;
		text-align: center;
		line-height: 106upx;
		background: linear-gradient(to right, #44cfcd, #3dcf94);
	}

	.text-clamp {
		display: block;
		width: calc(100%-60upx);
		padding: 0 30upx;
		font-size: 24upx;
		color: #3707070;
	}
</style>
