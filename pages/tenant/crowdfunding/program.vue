<template>
	<!-- 添加动态数据，正文数字超过显示省略号没做 -->
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()" title="投资方案"></uni-nav-bar>
		<view class="program">
			<view class="programList" v-for="item in cEntities" :key="item.schemeId">
				<view class="top">收益权</view>
				<view class="title">{{item.programmeTitle}}</view>
				<rich-text class="text-clamp" :nodes="item.programmeDetails"></rich-text>
				<view class="maoll font-family" @tap="openProgramDetail(item.projectId,item.schemeId)">查看更多</view>
				<view class="uni-flex uni-row bottom">
					<view class="left">
						<view class="uni-flex uni-row">
							<view class="sell font-family">￥{{item.subscriptionMonovalent}}.00</view>
							<view class="sellRight">/份</view>
						</view>
						<view class="sellBottom">剩余{{item.surplusShare}}份/共{{item.totalShare}}份</view>
					</view>
					<view class="right" @tap="openOrderConf(item.projectId,item.schemeId)">
						认购
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				id: '',
				isShow: false,
				token: '',
				cEntities: []
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getProgramme()
		},
		methods: {
			getProgramme() {
				uni.request({
					url: this.getApp.api.crowdFunding.investmentProgramme,
					method: 'GET',
					data: {
						projectId: this.id
					},
					success: res => {
						this.cEntities = res.data.cEntities
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			openProgramDetail(projectId, schemeId) {
				uni.navigateTo({
					url: "/pages/tenant/crowdfunding/programDetail?projectId=" + projectId + '&schemeId=' + schemeId + '&isBuy=' + 0
				})
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
			comeBack() {
				uni.navigateBack({});
				// uni.redirectTo({
				// 	url: "/pages/tenant/crowdfunding/subscription"
				// })
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
			},
		}
	}
</script>

<style lang="scss" scoped>
	.program {
		width: calc(100% - 60upx);
		background-color: #FFFFFF;
		padding: 0 30upx;
	}

	.programList {
		padding: 35upx 40upx 35upx 40upx;
		border: 1upx solid #787878;
		margin-bottom: 18upx;
	}

	.programList .top {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 58upx;
		font-weight: bold;
	}

	.programList .title {
		font-size: 34upx;
		color: #3d3d3d;
		line-height: 58upx;
		font-weight: bold;
	}

	.programList text {
		font-size: 24upx;
		color: #370707;
		line-height: 36upx;
	}

	.programList .maoll {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 1em;
		margin: 9upx 0 73upx;
		font-weight: bold;
	}
	.font-family{
		font-family: '\9ED1\4F53';
	}

	.bottom {
		justify-content: space-between;
	}

	.bottom .sell {
		font-size: 40upx;
		color: $uni-text-color-orange;
		line-height: 1em;
	}

	.bottom .sellRight {
		line-height: 1em;
		margin-top: 18upx;
		margin: 18upx 0 0 4upx;
		font-size: 22upx;
		color: #3d3d3d;
	}

	.sellBottom {
		color: #3d3d3d;
		font-size: 22upx;
	}

	.bottom .right {
		width: 165upx;
		height: 76upx;
		line-height: 76upx;
		text-align: center;
		color: #ffffff;
		font-size: 32upx;
		background: $uni-color-level-gradual;
	}

	.text-clamp {
		position: relative;
		color: #707070;
		font-size: 24upx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	/* .text-clamp:after {
		content: "...";
		position: absolute;
		bottom: 0;
		right: 0;
		padding-left:18upx;
		background: -webkit-linear-gradient(left, transparent, #fff 55%);
		background: -o-linear-gradient(right, transparent, #fff 55%);
		background: -moz-linear-gradient(right, transparent, #fff 55%);
		background: linear-gradient(to right, transparent, #fff 55%);
	} */
</style>
