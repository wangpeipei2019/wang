<template>
	<view class="mobNumber" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="请帮助我们验证您的身份"></uni-nav-bar>
		<view class="uni-flex uni-column imgBg">
			<view style="position:relative;padding-bottom:350upx;">
				<view class="imgTop" v-if="flagImage">
					<image :src="urlImage+defaultPic+landlordPic"></image>
				</view>
				<view class="imgBtn" v-if="defaultImage">
					<image style="width: 52upx;height: 52upx;" src="http://113.200.212.12/ymshapi/api/location/camera-b.png"></image>
				</view>
				<view class="uni-flex uni-row image head-portrait">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						</block>
						<view class="uni-uploader__input-box picker-portrait">
							<view class="uni-uploader__input" @tap="chooseImage()"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="imgTitle">请上传真实头像</view>
		</view>
		<view class="uni-flex uni-column uni-padding-wrap">
			<view class="uni-flex uni-row mobList">
				<view class="left">昵称</view>
				<view class="right">
					<input class="nameInput" :maxlength="20" :focus="isFocus" type="text" v-model="landlordName" placeholder-style="color:#999999;" placeholder="真实姓名或个人昵称.如漫画师之家" />
				</view>
			</view>
			<view class="uni-flex uni-row mobList">
				<view class="left">手机号</view>
				<view class="right">
					<input type="number" :maxlength="11" placeholder-style="color:#999999;" v-model="phone" disabled placeholder="请输入新的手机号码" />
				</view>
			</view>

			<!-- <view class="uni-flex uni-row mobList">
				<view class="left">验证码</view>
				<view class="uni-flex uni-row yanZheng" >
					<view class="rightInp">
						<input type="number"  placeholder-style="color:#999999;"  placeholder="请输入验证码"/>
					</view>
					<view class="line"></view>
					<view class="rightText">获取验证码</view>
				</view>
			</view> -->

		</view>
		<!-- 
		<view class="footer" @tap="addLandlordInfo">确定</view> -->
		<!-- <view class="marginTop"></view> -->
		<view class="bottomWarp">
			<view class="bottom" @tap="addLandlordInfo">确定</view>
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
		components: {
			uniNavBar
		},
		data() {
			return {
				token: '',
				urlImage: '',
				flagImage: true,
				defaultImage:false,
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 1,
				count: [1],
				defaultPic:'tuxiang.png',
				landlordPic: '',
				landlordName: '',
				phone: '',
				canSave:true,
				isFocus:true,
				isShow:false
			}
		},
		onLoad() {
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token')
			this.queryLandlordInfo();
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
			addLandlordInfo() {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/; 
				if(this.landlordPic ==''){
					uni.showToast({
						title: '真实头像不能为空',
						icon:'none'
					});
				}else if(this.landlordName == ''){
					uni.showToast({
						title: '昵称不能为空',
						icon:'none'
					});
				}else if(!reg.test(this.landlordName)){
					this.isFocus=true
					uni.showToast({
						title: '输入昵称错误',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					
				}
				else{
					uni.request({
						url: this.getApp.api.attestation.addLandlordInfo,
						method: 'POST',
						data: {
							landlordName: this.landlordName,
							landlordPic: this.landlordPic,
							userSparePhone: this.phone,
						},
						header: {
							token: this.token
						},
						success: res => {
						//	console.log(JSON.stringify(res))
							if(res.data.code==0){
								uni.navigateBack({});
							}
						}
					});
				}
			},
			queryLandlordInfo() {
				uni.request({
					url: this.getApp.api.attestation.queryLandlordInfo,
					method: 'POST',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.uInfoEntity.landlordPic != null&&res.data.uInfoEntity.landlordPic != '') {
							this.defaultPic = ''
							this.landlordPic = res.data.uInfoEntity.landlordPic
							this.defaultImage = false
						}else{
							this.defaultImage = true
						}
						this.landlordName = res.data.uInfoEntity.landlordName
						if (res.data.uInfoEntity.userSparePhone != null&&res.data.uInfoEntity.userSparePhone != '') {
							this.phone = res.data.uInfoEntity.userSparePhone
						} else {
							this.phone = res.data.uInfoEntity.userRegisterPhone
						}
						this.isShow=true
					},
					fail: () => {
						this.defaultImage = true
					}
				});
			},
			chooseImage: async function() {
				if (this.imageList.length === 1) {
					let isContinue = await this.isFullImg();
					// console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 1 ? 1 - this.imageList.length : this.count[
						this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						var index = this.imageList.length - 1
						uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageList[index],
							name: 'file',
							formData: {
								type: 4
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								if (imgData.code == 0) {
									this.flagImage = false
									this.defaultImage = false
									this.landlordPic = imgData.newFileName
								}
							}
						});
					}
				})
			},
			isFullImg() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有1张图片了,是否清空现有图片？",
						confirmColor: '#45c298',
						success: (e) => {
							if (e.confirm) {
								this.imageList = [],
								this.flagImage = true
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
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			comeBack(){
				uni.navigateTo({
					url: "/pages/tenant/application-landlord/information"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.picker-portrait {
		width: 280upx;
		height: 280upx;
		margin: 0;
		opacity: 0;
	}

	.head-portrait {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);

		image {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 50%;
		}
	}

	.mobNumber {
		width: 100%;
		height: 100vh;
		background-color: #f7fafc;
		border-top: 1upx solid #dadada;
		position: relative;
	}

	.mobNumber .imgBg {
		width: 100%;
		background-color: #f7fafc;
	}

	.imgBg .imgTop {
		width: 280upx;
		height: 280upx;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.imgBg image:nth-of-type(1) {
		justify-content: center;
		width: 280upx;
		height: 280upx;
		border-radius:50%;
	}

	.imgBg .imgBtn {
		width: 52upx;
		height: 52upx;
		position: absolute;
		top: 270upx;
		left: 438upx;
	}

	.imgBg .imgBtn image {
		width: 52upx;
		height: 52upx;
	}

	.imgTitle {
		text-align: center;
		font-size: 26upx;
		color: #333333;
		margin: 26upx 0 96upx 0;
	}

	.uni-padding-wrap {
		background-color: #ffffff;
		margin-bottom: 128upx;
	}

	.mobList {
		width: calc(100% - 60upx);
		width: 100%;
		height: 90upx;
		border-bottom: 1upx solid #e8e8e8;
		justify-content: space-between;
	}

	.mobList .left {
		font-size: 26upx;
		color: #333333;
		line-height: 90upx;
	}

	.mobList .right input {
		font-size: 26upx;
		color: #333333;
		line-height: 90upx;
		height: 90upx;
		width: 240upx;
		text-align: right;
	}

	.mobList .right .nameInput {
		width: 420upx;
	}

	.mobList .yanZheng {
		justify-content: flex-end;
	}

	.mobList .yanZheng .line {
		width: 2upx;
		height: 26upx;
		background-color: #999999;
		margin: 32upx 18upx 0 18upx;
	}

	.mobList .rightInp input {
		width: 156upx;
		height: 90upx;
		line-height: 90upx;
		color: #333333;
		font-size: 26upx;

	}

	.mobList .rightText {
		color: #999999;
		font-size: 26upx;
		line-height: 90upx;
	}

	.marginTop {
		width: 100;
		height: 240upx;
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
	
</style>
