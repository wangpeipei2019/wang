<template>
	<view>
		<view class="modal-container" :class="{hide:isShow}">
			<view class="modal-frame" :style="{backgroundImage:'url('+urlImage+'gx_bg.png)'}">
				<view class="title">发现新版本<text class="subtitle">{{versionNumber}}</text></view>
				<view class="content">
					<view class="subtitle">更新内容</view>
					<view class="list">
						<rich-text :nodes="explain"></rich-text>
					</view>
					<view class="btn-group">
						<view class="btn btn-white" @tap="cancel">下次再说</view>
						<view class="btn btn-gradient" @tap="openUpgrade()">立即更新</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				flag:2,
				isShow: true,
				versionNumber: '',
				explain: '',
				openUrl: '',
				mandatoryUpgrade:'',
				urlImage:''
			};
		},
		created() {
			this.urlImage = this.getApp.api.urlImage
			// #ifdef APP-PLUS
			this.getUpdate()
			// #endif
		},
		methods: {
			getUpdate() {
				// 锁定屏幕方向
				plus.screen.lockOrientation('portrait-primary'); //锁定
				// 检测升级
				if (plus.os.name == 'Android') {
					this.type = 1
				} else if (plus.os.name == 'iOS') {
					this.type = 2
				}
				uni.request({
					url: this.getApp.api.versionUpdate, //检查更新的服务器地址
					method: 'GET',
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version,
						type: this.type
					},
					success: (res) => {
						console.log('success', res);
						if (res.data.code == 0 && res.data.isUpdate) {
							this.isShow = false
							this.openUrl = res.data.AutomaticUpgrade.upgradeAddress
							this.mandatoryUpgrade = res.data.AutomaticUpgrade.mandatoryUpgrade
							// 提醒用户更新
							this.versionNumber = res.data.AutomaticUpgrade.versionNumber
							this.explain = res.data.AutomaticUpgrade.explain
						}
					}
				})
			},
			openUpgrade() {
				this.isShow = true
				if (this.mandatoryUpgrade == 1) {
					var dtask = plus.downloader.createDownload(this.openUrl, {}, function(d, status) {
						// 下载完成  
						if (status == 200) {
							plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
								uni.showToast({
									title: '安装失败',
									mask: false,
									duration: 1500
								});
							})
						} else {
							uni.showToast({
								title: '更新失败',
								mask: false,
								duration: 1500
							});
						}
					})
					dtask.start();
				} else if (this.mandatoryUpgrade == 2) {
					plus.runtime.openURL(this.openUrl);
				}
			},
			cancel() {
				this.isShow = true
				if(this.flag == 1){
					plus.runtime.quit();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
		line-height: 1;
	}

	.modal-container {
		width: 750upx;
		height: 100vh;
		background: transparent;
		// background: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;

		&.hide {
			display: none;
		}

		.modal-frame {
			width: 520upx;
			height: 650upx;
			background: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 15upx;
			padding: 65upx 0 30upx;
			background-size:cover;
			background-repeat: no-repeat;
			box-shadow:4upx 4upx 32upx #c2c2c2;
			.title {
				text-align: center;
				font-size: 36upx;
				margin: 0 0 75upx;
				color:$uni-text-color-inverse;
				.subtitle {
					font-size:26upx;
					margin-left:10upx;
					line-hieght:26upx;
				}
			}

			.content {
				padding: 0 32upx;

				.subtitle {
					font-size: 26upx;
					color: #1a1a1a;
					margin: 0 0 30upx;
				}

				.list {
					height: 305upx;
					margin: 0 0 30upx;
					padding-left: 13upx;
					overflow-y: auto;

					.item {
						font-size: 22upx;
						color: #1a1a1a;
						margin: 0 0 22upx;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
					}
				}

				.btn-group {
					padding: 0 8upx;
					display: flex;
					justify-content: space-between;

					.btn {
						width: 175upx;
						height: 54upx;
						line-height: 54upx;
						font-size: 24upx;
						text-align: center;
						border-radius: 10upx;
					}

					.btn-white {
						color: #1a1a1a;
						border: .5upx solid #c3c3c3;
						background: $uni-bg-color;
					}

					.btn-gradient {
						color: $uni-text-color-inverse;
						background: $uni-color-level-gradual;
					}
				}
			}
		}
	}
</style>
