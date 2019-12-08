<template>
	<view class="mobNumber" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="完善真实身份证" 
		 @click-right="uploadIdCardInfo"></uni-nav-bar>
		<view class="title">验证您的身份证信息，能提升客人对您的信任</view>
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row mobList margin-bottom uni-padding-wrap">
				<view class="left">资质信息</view>
				<view class="right">身份证</view>
			</view>
			<view class="uni-flex uni-row mobList uni-padding-wrap">
				<view class="left">真实姓名</view>
				<view class="right rightName">
					<input type="text" ref="vref" v-model="name" maxlength="20" placeholder-style="color:#999999;" placeholder="请输入身份证上的真实姓名" />
				</view>
			</view>
			<view class="uni-flex uni-row mobList margin-bottom uni-padding-wrap">
				<view class="left">身份证号码</view>
				<view class="right">
					<input type="number" v-model="userCard" maxlength="18" @input="watchID" placeholder-style="color:#999999;" placeholder="请输入身份证号码" />
				</view>
			</view>
		</view>
		<view class="addId">
			<view class="idTitle">*上传文件大小不超过2M且证照信息清晰，无水印</view>
			<view class="uni-flex uni-column imgList">
				<view class="imgUp">上传</view>
				<view class="imgCamera">
					<image class="defaultImg" :src="urlImage+handHeldIdImg+handHeldIdCard" v-if="currentOne"></image>
					<view class="uni-flex uni-row image head-portrait">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageListOne" :key="index">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageOne"></image>
							</block>
							<view class="uni-uploader__input-box picker-portrait">
								<view class="uni-uploader__input" @tap="chooseImageOne()"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="text">手持身份证正面</view>
			</view>
			<view class="uni-flex uni-column imgList">
				<view class="imgUp">上传</view>
				<view class="img">
					<image class="defaultImg" :src="urlImage+positiveIdImg+positiveIdCard" v-if="currentTwo"></image>
					<view class="uni-flex uni-row image head-portrait">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageListTwo" :key="index">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageTwo"></image>
							</block>
							<view class="uni-uploader__input-box picker-portrait">
								<view class="uni-uploader__input" @tap="chooseImageTwo()"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="text">身份证正面</view>
			</view>
			<view class="uni-flex uni-column imgList marginBtn">
				<view class="imgUp">上传</view>
				<view class="img">
					<image class="defaultImg" :src="urlImage+reverseIdImg+reverseIdCard" v-if="currentThree"></image>
					<view class="uni-flex uni-row image head-portrait">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageListThree" :key="index">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImageThree"></image>
							</block>
							<view class="uni-uploader__input-box picker-portrait">
								<view class="uni-uploader__input" @tap="chooseImageThree()"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="text">身份证反面</view>
			</view>
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="uploadIdCardInfo">确定</view>
		</view>
		<!-- <view class="footer" @tap="uploadIdCardInfo">确定</view> -->
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
				urlImage: '',
				currentOne: true,
				currentTwo: true,
				currentThree: true,
				name: '',
				handHeldIdImg: 'idimage.png',
				positiveIdImg: 'idTop.png',
				reverseIdImg: 'idBottom.png',
				handHeldIdCard: '',
				positiveIdCard: '',
				reverseIdCard: '',
				userCard: '',
				title: 'choose/previewImage',
				imageListOne: [],
				imageListTwo: [],
				imageListThree: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				isShow:false
				
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token')
			this.queryIdCardInfo()
		},
		onUnload() {
			this.imageListOne = [],
				this.imageListTwo = [],
				this.imageListThree = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
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
								type: 4
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									this.currentOne = false
									this.handHeldIdCard = imgData.newFileName
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
								this.imageListOne = []
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
				if (this.imageListTwo.length === 1) {
					let isContinue = await this.isFullImgTwo();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListTwo.length + this.count[this.countIndex] > 1 ? 1 - this.imageListTwo.length : this.count[
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
								type: 4
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									this.currentTwo = false
									this.positiveIdCard = imgData.newFileName
								}
							}
						});
					}
				})
			},
			isFullImgTwo() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有1张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								this.imageListTwo = []
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
				if (this.imageListThree.length === 1) {
					let isContinue = await this.isFullImgThree();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageListThree.length + this.count[this.countIndex] > 1 ? 1 - this.imageListThree.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageListThree = this.imageListThree.concat(res.tempFilePaths);
						var index = this.imageListThree.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageListThree[index],
							name: 'file',
							formData: {
								type: 4
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								// console.log(imgData.newFileName)
								if (imgData.code == 0) {
									this.currentThree = false
									this.reverseIdCard = imgData.newFileName
								}
							}
						});
					}
				})
			},
			isFullImgThree() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有1张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								this.imageListThree = []
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
			comeBack() {
				uni.navigateBack({});
			},
			queryIdCardInfo() {
				uni.request({
					url: this.getApp.api.attestation.queryIdCardInfo,
					method: 'POST',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						this.name = res.data.idCardEntiy.name
						this.userCard = res.data.idCardEntiy.userCard
						if(res.data.idCardEntiy.handHeldIdCard!=null){
							this.handHeldIdCard = res.data.idCardEntiy.handHeldIdCard
							this.handHeldIdImg = ''
							
						}
						if(res.data.idCardEntiy.positiveIdCard!=null){
							this.positiveIdCard = res.data.idCardEntiy.positiveIdCard
							this.positiveIdImg = ''
							
						}
						if(res.data.idCardEntiy.reverseIdCard!=null){
							this.reverseIdCard = res.data.idCardEntiy.reverseIdCard
							this.reverseIdImg = ''
						}
						this.isShow=true
					}
				});
			},
			watchID(){
				this.IDFocus=true
				setTimeout(() => { this.userCard =this.userCard.replace(/\D/g,'') ; }, 3)
			},
			uploadIdCardInfo() { 
				var reg= /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				var regVlue=/^[\u4e00-\u9fa5]+$/;
				if(this.name==''){
					uni.showToast({
						title: '真实姓名不能为空',
						icon:'none',
						mask: false,
						duration: 1500
					})
				}else if(!regVlue.test(this.name)){
					this.nameFocus='focus'
					uni.showToast({
						title: '真实姓名格式不正确',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}else if(this.userCard==''){
					uni.showToast({
						title: '身份证号码不能为空',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}else if(!reg.test(this.userCard)){
					this.IDFocus='focus'
					uni.showToast({
						title: '身份证格式不正确',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}
				else if(this.handHeldIdCard==''){
					uni.showToast({
						title: '手持身份证照不能为空',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}else if(this.positiveIdCard==''){
					uni.showToast({
						title: '身份证正面照不能为空',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}else if(this.reverseIdCard==''){
					uni.showToast({
						title: '身份证反面照不能为空',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}else{
					uni.request({
						url: this.getApp.api.attestation.uploadIdCardInfo,
						method: 'POST',
						data: {
							name: this.name,
							handHeldIdCard: this.handHeldIdCard,
							positiveIdCard: this.positiveIdCard,
							reverseIdCard: this.reverseIdCard,
							userCard: this.userCard
						},
						header: {
							token: this.token
						},
						success: res => {
							console.log(res)
							if(res.data.code==0){
								uni.navigateBack({});
							}
						}
					});
				}
			}
		},
		onNavigationBarButtonTap(e) {
			uni.showToast({
				title: e.index === 0 ? '你点了保存按钮' : '',
			});
		}
	}
</script>

<style lang="scss" scoped>
	.imgCamera {
		padding-bottom: 370upx;
		position: relative;

		.picker-portrait {
			width: 430upx;
			height: 370upx;
			margin: 0;
			opacity: 0;
		}
	}

	.imgList .img {
		padding-bottom: 295upx;
		position: relative;

		.picker-portrait {
			width: 430upx;
			height: 295upx;
			margin: 0;
			opacity: 0;
		}
	}

	.imgList .defaultImg {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.head-portrait {
		position: absolute;
		bottom: 0;
		left: 0;

		image {
			position: absolute;
			bottom: 0;
			left: 0;
		}
	}

	.mobNumber {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		background-color: #f6f9f9;
		border-top: 1upx solid #dadada;
	}

	.uni-padding-wrap {
		background-color: #ffffff;
	}

	.mobNumber .title {
		padding-left: 30upx;
		height: 75upx;
		line-height: 75upx;
		background-color: #f6f9f9;
	}

	.margin-bottom {
		margin-bottom: 34upx;

	}

	.mobList {
		width: calc(100% - 60upx);
		height: 90upx;
		border-bottom: 1upx solid #e8e8e8;
		justify-content: space-between;
		background-color: #ffffff;
	}

	.mobList .left,
	.mobList .right {
		font-size: 26upx;
		color: #333333;
		line-height: 90upx;
	}

	.mobList .right input {
		width: 290upx;
		font-size: 24upx;
		color: #333333;
		line-height: 90upx;
		height: 90upx;
		text-align: right;
	}

	.addId {
		width: 100%;
		width: calc(100% - 160upx);
		padding: 85upx 80upx 75upx 80upx;
		background-color: #ffffff;
	}

	.addId .idTitle {
		font-size: 24upx;
		color: #333333;
		margin-bottom: 12upx;
	}

	.addId .imgUp {
		width: 98upx;
		height: 50upx;
		background-color: #45C298;
		border-radius: 10upx;
		line-height: 50upx;
		text-align: center;
		color: #ffffff;
		font-size: 34upx;
		margin: 63upx 0 0;
	}

	.addId .imgCamera {
		margin: 20upx auto 0;
		width: 430upx;
		margin-bottom: 45upx;
	}

	.addId .imgCamera image {
		width: 430upx;
		height: 370upx;
		vertical-align: top;
	}

	.addId .img {
		margin: 20upx auto 45upx;
		width: 430upx;
	}

	.addId .img image {
		width: 430upx;
		height: 295upx;
		vertical-align: top;
	}

	.addId .text {
		width: 100%;
		text-align: center;
		font-size: 26upx;
		color: #666666;
	}

	/* .mobNumber .footer {
		width: 100%;
		width: calc(100% - 60upx);
		margin: 0 auto 58upx;
		border-radius: 15upx;
		height: 98upx;
		font-size: 26upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 98upx;
		background: $uni-color-level-gradual;
	} */
	.bottomWarp{
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
	.marginBtn{
		margin-bottom: 128upx;
	}
</style>
