<script>
	export default {
		data() {
			return {
				type: 0
			}
		},
		methods: {
			getUpdate(flag) {
				// #ifdef APP-PLUS
				// 锁定屏幕方向
				plus.screen.lockOrientation('portrait-primary'); //锁定
				// 检测升级
				// console.log(plus.runtime.appid)
				// console.log(plus.runtime.version)
				// console.log(plus.device.imei)
				// console.log(plus.os.name)
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
							let openUrl = res.data.AutomaticUpgrade.upgradeAddress;
							// 提醒用户更新
							if (res.data.AutomaticUpgrade.mandatoryUpgrade == 1 && flag == 1) {
								uni.showModal({
									title: '发现新版本' + res.data.AutomaticUpgrade.versionNumber,
									content: res.data.AutomaticUpgrade.explain ? res.data.AutomaticUpgrade.explain : '新增版本更新功能！',
									confirmText: '马上升级',
									success: (showResult) => {
										if (showResult.confirm) {
											// plus.runtime.openURL();
											var dtask = plus.downloader.createDownload(openUrl, {}, function(d, status) {
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
											});
											dtask.start();
										} else if (showResult.cancel) {
											plus.runtime.quit();
										}
									}
								})
							} else if (res.data.AutomaticUpgrade.mandatoryUpgrade == 2 && flag == 2) {
								uni.showModal({
									title: '发现新版本' + res.data.AutomaticUpgrade.versionNumber,
									content: res.data.AutomaticUpgrade.explain ? res.data.AutomaticUpgrade.explain : '新增版本更新功能！',
									confirmText: '马上升级',
									success: (showResult) => {
										if (showResult.confirm) {
											plus.runtime.openURL(openUrl);
										}
									}
								})
							}
						}
					}
				})
				// #endif
			},
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// this.getUpdate(2)
			// #endif
			global.isLogin = function() {
				try {
					var token = uni.getStorageSync('token');
					var userName = uni.getStorageSync('userName');
				} catch (e) {
					//TODO handle the exception
				}
				if (token == '' || userName == '') {
					return false;
				} else {
					return [token, userName];
				}
			};
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			// this.getUpdate(1)
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/uni.css';
	@import './common/ssbu.css';
</style>
