<template>
	<view v-if="isShow">
		<uni-nav-bar v-if="houseFlag==0" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="请为每间房屋提供美照"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==1" fixed="true" statusBar="true" left-icon="back" @click-left="comeBackList" title="请为每间房屋提供美照"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==2" fixed="true" statusBar="true" left-icon="back" @click-left="comeBackList" title="请为每间房屋提供美照"></uni-nav-bar>
		<view class="photo">
			<view class="text">
				<text>
					温馨提示：为了避免因户型信息与图片不符产生客诉，请您保证上传图片高清，无水印，无联系方式，无logo。
				</text>
			</view>
			<view class="photoList">
				<view class="uni-flex uni-row title">
					<view>首页展示</view>
					<view>{{imageListOne.length}}/1</view>
				</view>
				<view class="tishiyu">上传1张，作为首页的展示照片</view>
				<view class="uni-flex uni-row image">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageListOne" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageOne"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="houseFlag == 0||houseFlag == 1">
							<view class="uni-uploader__input" @tap="chooseImageOne()">
								<image :src="urlImage+'house_icon_upload.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="photoList">
				<view class="uni-flex uni-row title">
					<view>客厅</view>
					<view>{{imageListTwo.length}}/10</view>
				</view>
				<view class="tishiyu">至少上传1张，计量显示配套设施（空调，电视等）及客厅全景</view>
				<view class="uni-flex uni-row image">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageListTwo" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageTwo"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="houseFlag == 0||houseFlag == 1">
							<view class="uni-uploader__input" @tap="chooseImageTwo()">
								<image :src="urlImage+'house_icon_upload.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="photoList">
				<view class="uni-flex uni-row title">
					<view>卧室</view>
					<view>{{imageListThree.length}}/10</view>
				</view>
				<view class="tishiyu">至少上传1张，展示完整床铺</view>
				<view class="uni-flex uni-row image">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageListThree" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageThree"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="houseFlag == 0||houseFlag == 1">
							<view class="uni-uploader__input" @tap="chooseImageThree()">
								<image :src="urlImage+'house_icon_upload.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="photoList">
				<view class="uni-flex uni-row title">
					<view>厨房</view>
					<view>{{imageListFour.length}}/10</view>
				</view>
				<view class="tishiyu">至少上传1张，照片包含厨具和灶具</view>
				<view class="uni-flex uni-row image">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageListFour" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageFour"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="houseFlag == 0||houseFlag == 1">
							<view class="uni-uploader__input" @tap="chooseImageFour()">
								<image :src="urlImage+'house_icon_upload.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="photoList">
				<view class="uni-flex uni-row title">
					<view>卫生间</view>
					<view>{{imageListFive.length}}/10</view>
				</view>
				<view class="tishiyu">至少上传1张，卫浴设施完整，地面整洁</view>
				<view class="uni-flex uni-row image">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageListFive" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageFive"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="houseFlag == 0||houseFlag == 1">
							<view class="uni-uploader__input" @tap="chooseImageFive()">
								<image :src="urlImage+'house_icon_upload.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="photoList">
				<view class="uni-flex uni-row title" style="margin-bottom: 0;">
					<view>其他</view>
					<view>{{imageListSix.length}}/20</view>
				</view>
				<view class="uni-flex uni-row image">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageListSix" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageSix"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-if="houseFlag == 0||houseFlag == 1">
							<view class="uni-uploader__input" @tap="chooseImageSix()">
								<image :src="urlImage+'house_icon_upload.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="openInformation" v-if="houseFlag == 0||houseFlag == 1">提交审核</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'

	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]

	export default {
		data() {
			return {
				token: '',
				title: 'choose/previewImage',
				imageListOne: [],
				imageListTwo: [],
				imageListThree: [],
				imageListFour: [],
				imageListFive: [],
				imageListSix: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				houseAllInfo: {},
				urlImage: '',
				isShow:false
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			this.urlImage = this.getApp.api.urlImage
			this.getHouseAllInfo()
		},
		onUnload() {
			this.imageListOne = [],
				this.imageListTwo = [],
				this.imageListThree = [],
				this.imageListFour = [],
				this.imageListFive = [],
				this.imageListSix = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		computed: {
			houseId() {
				return this.$store.state.houseId
			},
			// houseAllInfo() {
			// 	return this.$store.state.houseAllInfo
			// },
			houseFlag() {
				return this.$store.state.houseFlag
			}
		},
		methods: {
			updateHouseAuditStatus() {
				uni.request({
					url: this.getApp.api.landlord.updateHouseAuditStatus,
					method: 'POST',
					data: {
						id: this.houseId
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							console.log('修改房屋审核状态成功')
						} else {
							console.log('修改房屋审核状态失败')
						}
					}
				});
			},
			comeBack() {
				uni.redirectTo({
					url: '/pages/landlord/resource/toll/toll'
				})
			},
			comeBackList() {
				uni.navigateBack({});
			},
			getHouseAllInfo() {
				uni.request({
					url: this.getApp.api.index.houseDetails,
					method: 'GET',
					data: {
						houseId: this.houseId
					},
					success: res => {
						if (res.data.code == 0) {
							// this.$store.commit('changeHouseAllInfo', res.data.houseAllInfo)
							this.houseAllInfo = res.data.houseAllInfo
							if (this.houseAllInfo.houseImg.length > 0) {
								for (let i in this.houseAllInfo.houseImg) {
									if (this.houseAllInfo.houseImg[i].house_img_type == 0) {
										this.imageListOne.push(this.urlImage + this.houseAllInfo.houseImg[i].house_img)
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 1) {
										this.imageListTwo.push(this.urlImage + this.houseAllInfo.houseImg[i].house_img)
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 2) {
										this.imageListThree.push(this.urlImage + this.houseAllInfo.houseImg[i].house_img)
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 3) {
										this.imageListFour.push(this.urlImage + this.houseAllInfo.houseImg[i].house_img)
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 4) {
										this.imageListFive.push(this.urlImage + this.houseAllInfo.houseImg[i].house_img)
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 5) {
										this.imageListSix.push(this.urlImage + this.houseAllInfo.houseImg[i].house_img)
									}
								}
							}
						}
						this.isShow=true
					}
				});
			},
			openInformation() {
				if (this.imageListOne.length == 0) {
					uni.showToast({
						title: '首页图片不能为空',
						icon: 'none'
					});
				} else if (this.imageListTwo.length == 0) {
					uni.showToast({
						title: '客厅图片不能为空',
						icon: 'none'
					});
				} else if (this.imageListThree.length == 0) {
					uni.showToast({
						// title: '卧室图片至少上传3张',
						title: '卧室图片不能为空',
						icon: 'none'
					});
				} else if (this.imageListFour.length == 0) {
					uni.showToast({
						title: '厨房图片不能为空',
						icon: 'none'
					});
				} else if (this.imageListFive.length == 0) {
					uni.showToast({
						// title: '卫生间图片至少上传2张',
						title: '卫生间图片不能为空',
						icon: 'none'
					});
				} else {
					uni.request({
						url: this.getApp.api.landlord.submitAudit,
						method: 'GET',
						data: {
							houseId: this.houseId
						},
						header: {
							token: this.token
						},
						success: res => {
							if (res.data.code == 0) {
								uni.switchTab({
									url: "/pages/main/tabbar1/tabbar1"
								})
							}
						}
					});
				}
			},
			chooseImageOne: async function() {
				if (this.imageListOne.length === 1) {
					let isContinue = await this.isFullImgOne();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListOne.length + this.count[this.countIndex] > 1 ? 1 - this.imageListOne.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListOne = this.imageListOne.concat(res.tempFilePaths);
						var index = this.imageListOne.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListOne[index],
							name: 'file',
							formData: {
								type: 2
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									uni.request({
										url: this.getApp.api.landlord.houseInfoSeven,
										method: 'POST',
										data: {
											houseId: this.houseId,
											houseImg: imgData.newFileName,
											houseImgType: 0
										},
										header: {
											token: this.token
										},
										success: res => {
											// console.log(JSON.stringify(res));
											if (this.houseFlag == 1) {
												this.updateHouseAuditStatus()
											}
										}
									});
								}
							}
						});
					}
				})
			},
			isFullImgOne() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有1张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								uni.request({
									url: this.getApp.api.landlord.deleteHouseImage,
									method: 'GET',
									data: {
										houseId: this.houseId,
										type: 0
									},
									header: {
										token: this.token
									},
									success: res => {
										this.imageListOne = []
										if (this.houseFlag == 1) {
											this.updateHouseAuditStatus()
										}
									}
								});
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImageOne(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageListOne
				})
			},
			chooseImageTwo: async function() {
				if (this.imageListTwo.length === 10) {
					let isContinue = await this.isFullImgTwo();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListTwo.length + this.count[this.countIndex] > 10 ? 10 - this.imageListTwo.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListTwo = this.imageListTwo.concat(res.tempFilePaths);
						var index = this.imageListTwo.length - 1
						console.log(index)
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListTwo[index],
							name: 'file',
							formData: {
								type: 2
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									uni.request({
										url: this.getApp.api.landlord.houseInfoSeven,
										method: 'POST',
										data: {
											houseId: this.houseId,
											houseImg: imgData.newFileName,
											houseImgType: 1
										},
										header: {
											token: this.token
										},
										success: res => {
											// console.log(JSON.stringify(res));
											if (this.houseFlag == 1) {
												this.updateHouseAuditStatus()
											}
										}
									});
								}
							}
						});
					}
				})
			},
			isFullImgTwo() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有10张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								uni.request({
									url: this.getApp.api.landlord.deleteHouseImage,
									method: 'GET',
									data: {
										houseId: this.houseId,
										type: 1
									},
									header: {
										token: this.token
									},
									success: res => {
										this.imageListTwo = []
										if (this.houseFlag == 1) {
											this.updateHouseAuditStatus()
										}
									}
								});
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImageTwo(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageListTwo
				})
			},
			chooseImageThree: async function() {
				if (this.imageListThree.length === 10) {
					let isContinue = await this.isFullImgThree();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListThree.length + this.count[this.countIndex] > 10 ? 10 - this.imageListThree.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListThree = this.imageListThree.concat(res.tempFilePaths);
						var index = this.imageListThree.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListThree[index],
							name: 'file',
							formData: {
								type: 2
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									uni.request({
										url: this.getApp.api.landlord.houseInfoSeven,
										method: 'POST',
										data: {
											houseId: this.houseId,
											houseImg: imgData.newFileName,
											houseImgType: 2
										},
										header: {
											token: this.token
										},
										success: res => {
											// console.log(JSON.stringify(res));
											if (this.houseFlag == 1) {
												this.updateHouseAuditStatus()
											}
										}
									});
								}
							}
						});
					}
				})
			},
			isFullImgThree() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有10张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								uni.request({
									url: this.getApp.api.landlord.deleteHouseImage,
									method: 'GET',
									data: {
										houseId: this.houseId,
										type: 2
									},
									header: {
										token: this.token
									},
									success: res => {
										this.imageListThree = []
										if (this.houseFlag == 1) {
											this.updateHouseAuditStatus()
										}
									}
								});
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImageThree(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageListThree
				})
			},
			chooseImageFour: async function() {
				if (this.imageListFour.length === 10) {
					let isContinue = await this.isFullImgFour();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListFour.length + this.count[this.countIndex] > 10 ? 10 - this.imageListFour.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListFour = this.imageListFour.concat(res.tempFilePaths);
						var index = this.imageListFour.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListFour[index],
							name: 'file',
							formData: {
								type: 2
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									uni.request({
										url: this.getApp.api.landlord.houseInfoSeven,
										method: 'POST',
										data: {
											houseId: this.houseId,
											houseImg: imgData.newFileName,
											houseImgType: 3
										},
										header: {
											token: this.token
										},
										success: res => {
											// console.log(JSON.stringify(res));
											if (this.houseFlag == 1) {
												this.updateHouseAuditStatus()
											}
										}
									});
								}
							}
						});
					}
				})
			},
			isFullImgFour() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有10张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								uni.request({
									url: this.getApp.api.landlord.deleteHouseImage,
									method: 'GET',
									data: {
										houseId: this.houseId,
										type: 3
									},
									header: {
										token: this.token
									},
									success: res => {
										this.imageListFour = []
										if (this.houseFlag == 1) {
											this.updateHouseAuditStatus()
										}
									}
								});
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImageFour(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageListFour
				})
			},
			chooseImageFive: async function() {
				if (this.imageListFive.length === 10) {
					let isContinue = await this.isFullImgFive();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListFive.length + this.count[this.countIndex] > 10 ? 10 - this.imageListFive.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListFive = this.imageListFive.concat(res.tempFilePaths);
						var index = this.imageListFive.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListFive[index],
							name: 'file',
							formData: {
								type: 2
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									uni.request({
										url: this.getApp.api.landlord.houseInfoSeven,
										method: 'POST',
										data: {
											houseId: this.houseId,
											houseImg: imgData.newFileName,
											houseImgType: 4
										},
										header: {
											token: this.token
										},
										success: res => {
											// console.log(JSON.stringify(res));
											if (this.houseFlag == 1) {
												this.updateHouseAuditStatus()
											}
										}
									});
								}
							}
						});
					}
				})
			},
			isFullImgFive() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有10张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								uni.request({
									url: this.getApp.api.landlord.deleteHouseImage,
									method: 'GET',
									data: {
										houseId: this.houseId,
										type: 4
									},
									header: {
										token: this.token
									},
									success: res => {
										this.imageListFive = []
										if (this.houseFlag == 1) {
											this.updateHouseAuditStatus()
										}
									}
								});
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImageFive(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageListFive
				})
			},
			chooseImageSix: async function() {
				if (this.imageListSix.length === 20) {
					let isContinue = await this.isFullImgSix();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListSix.length + this.count[this.countIndex] > 20 ? 20 - this.imageListSix.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListSix = this.imageListSix.concat(res.tempFilePaths);
						var index = this.imageListSix.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListSix[index],
							name: 'file',
							formData: {
								type: 2
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									uni.request({
										url: this.getApp.api.landlord.houseInfoSeven,
										method: 'POST',
										data: {
											houseId: this.houseId,
											houseImg: imgData.newFileName,
											houseImgType: 5
										},
										header: {
											token: this.token
										},
										success: res => {
											// console.log(JSON.stringify(res));
											if (this.houseFlag == 1) {
												this.updateHouseAuditStatus()
											}
										}
									});
								}
							}
						});
					}
				})
			},
			isFullImgSix() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有20张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								uni.request({
									url: this.getApp.api.landlord.deleteHouseImage,
									method: 'GET',
									data: {
										houseId: this.houseId,
										type: 5
									},
									header: {
										token: this.token
									},
									success: res => {
										this.imageListSix = []
										if (this.houseFlag == 1) {
											this.updateHouseAuditStatus()
										}
									}
								});
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImageSix(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageListSix
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo {
		width: calc(100% - 60upx);
		height: 100vh;
		padding: 0 30upx;
		background-color: #ffffff;
		border-top: 1upx solid #e8e8e8;
		overflow-y: auto;
		scroll-behavior: 0;
	}

	.photo .text {
		width: 100%;
		border-bottom: 1upx solid #e8e8e8;
		padding: 10upx 0 30upx 0;

	}

	.photo .text text {
		line-height: 1em;
		font-size: 24upx;
		color: #3d3d3d;
		margin: 17upx 0 0 0;
	}

	.photoList {
		width: 100%;
		padding: 0 0 30upx 0;
		border-bottom: 1upx solid #e8e8e8;
	}

	.photoList .title {
		padding: 46upx 0 0 0;
	}

	.photoList .title view:nth-of-type(1) {
		font-size: 26upx;
		color: #656565;
		font-weight: bold;
		margin: 0 22upx 0 0;
	}

	.photoList .title view:nth-of-type(2) {
		font-size: 22upx;
		color: #656565;
		margin-top: 5upx;
	}

	.photoList .tishiyu {
		margin: 22upx 0;
		font-size: 24upx;
		color: #656565;
	}
	.photoList .image image {
		width: 210upx;
		/* height: 140upx; */
		margin: 0 20upx 30upx 0;
		vertical-align: top;
		opacity: 1;
	}

	.photoList:nth-last-of-type(1) {
		border: 0;
		margin-bottom: 230upx;
	}

	.bottomWarp {
		width: calc(100% - 48upx);
		background-color: #ffffff;
		height: 88upx;
		padding: 20upx 24upx;
		position: fixed;
		bottom: 0;
		z-index: 5;
	}
	.bottom {
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		font-size: 26upx;
		text-align: center;
		border-radius: 15upx;
		color: #ffffff;
		background: $uni-color-level-gradual;
		z-index: 15;
	}
	.uni-uploader__input{
		opacity: 1;
		width: 210upx;
		height: 140
	}
	.uni-uploader__input image{
		width: 100%;
		height: 100%;
	}
	.uni-uploader__input-box{
		width: 210upx;
		height: 140upx;
		border: 0;
	}
	.uni-uploader__file{
		width: 210upx;
		height: 140upx;
	}
	.uni-uploader__img{
		height: 140upx;
	}
</style>
