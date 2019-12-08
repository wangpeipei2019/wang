<template>
	<view class="informWrap" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="完成信息验证即可发布房源"></uni-nav-bar>
		<view class="content dividingLine">
		<view class="inform">
			<image :src="urlImg+img"></image>
		</view>
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row informList" @tap="editPosition">
				<view class="left">
					<view>房屋位置</view>
					<view v-if="flagOne">{{houseAllInfo.hoouseBaseInfo.province}}{{houseAllInfo.hoouseBaseInfo.city}}{{houseAllInfo.hoouseBaseInfo.area}}
						{{houseAllInfo.hoouseBaseInfo.address}}</view>
					<view v-if="!flagOne">填写房屋的地理位置信息</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagOne">已完成</view>
					<view class="wait" v-if="!flagOne">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList" @tap="editSpecification">
				<view class="left">
					<view>房屋详情</view>
					<view v-if="flagTwo">{{houseAllInfo.houseType[0].house_type_bedroom != 0?
					houseAllInfo.houseType[0].house_type_bedroom+'室':''}}{{
					houseAllInfo.houseType[0].house_type_drawi != 0?
					houseAllInfo.houseType[0].house_type_drawi+'厅':''}}{{
					houseAllInfo.houseType[0].house_type_toilet != 0?
					houseAllInfo.houseType[0].house_type_toilet+'卫':''}}</view>
					<view v-if="!flagTwo">填写房屋的基本信息</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagTwo">已完成</view>
					<view class="wait" v-if="!flagTwo">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList" @tap="editCharacteristic">
				<view class="left">
					<view>房屋描述</view>
					<view v-if="flagThree">{{houseAllInfo.hoouseBaseInfo.houseName}}</view>
					<view v-if="!flagThree">起一个醒目的名称，描述房屋的优势</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagThree">已完成</view>
					<view class="wait" v-if="!flagThree">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList" @tap="editSheshi">
				<view class="left">
					<view>设施服务</view>
					<view v-if="flagFour">{{facilitiesOne}} {{facilitiesTwo}}</view>
					<view v-if="!flagFour">有哪些配套设施和便利服务</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagFour">已完成</view>
					<view class="wait" v-if="!flagFour">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList" @tap="editClaim">
				<view class="left">
					<view>入住规则</view>
					<view v-if="flagFive">{{houseAllInfo.hoouseBaseInfo.checkInTime+'后可办理入住，'}}{{houseAllInfo.hoouseBaseInfo.checkOutTime+'前需要办理离店'}}</view>
					<view v-if="!flagFive">对客人入住时的需求说明</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagFive">已完成</view>
					<view class="wait" v-if="!flagFive">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList" @tap="editToll">
				<view class="left">
					<view>价格设置</view>
					<view v-if="flagSix">{{'基础价格'+houseAllInfo.price}}</view>
					<view v-if="!flagSix">给房屋定一个合理的价格</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagSix">已完成</view>
					<view class="wait" v-if="!flagSix">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
			<view class="uni-flex uni-row informList" @tap="editPhoto">
				<view class="left">
					<view>添加图片</view>
					<view v-if="flagSeven">{{'共'+houseAllInfo.houseImg.length+'张图片'}}</view>
					<view v-if="!flagSeven">高颜值的房屋能帮助您获得更多的顾客</view>
				</view>
				<view class="uni-flex uni-row right">
					<view class="carryOut" v-if="flagSeven">已完成</view>
					<view class="wait" v-if="!flagSeven">未完成，待完善</view>
					<image :src="urlImg+'my_left_icon.png'"></image>
				</view>
			</view>
		</view>
		</view>
		<!-- 		<view class="uni-flex uni-row footer">
			<view @tap="openHouseSource">撤回</view>
			<view @tap="openHouseSource">上架</view>
		</view> -->
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				token: '',
				img: '',
				urlImg: '',
				flagOne: false,
				flagTwo: false,
				flagThree: false,
				flagFour: false,
				flagFive: false,
				flagSix: false,
				flagSeven: false,
				facilitiesList: [],
				facilitiesOne: '',
				facilitiesTwo: '',
				houseAllInfo: {},
				isShow:false
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			this.urlImg = this.getApp.api.urlImage
			
		},
		onShow() {
			this.getImage();
			this.getHouseAllInfo()
		},
		computed: {
			houseId() {
				return this.$store.state.houseId
			},
			// houseAllInfo() {
			// 	return this.$store.state.houseAllInfo
			// }
		},
		methods: {
			comeBack() {
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
							// 房屋位置
							if (this.houseAllInfo.hoouseBaseInfo.country == null) {
								this.flagOne = false
							} else if (this.houseAllInfo.hoouseBaseInfo.province == null) {
								this.flagOne = false
							} else if (this.houseAllInfo.hoouseBaseInfo.city == null) {
								this.flagOne = false
							} else if (this.houseAllInfo.hoouseBaseInfo.area == null) {
								this.flagOne = false
							} else if (this.houseAllInfo.hoouseBaseInfo.locationAddress == null) {
								this.flagOne = false
							} else if (this.houseAllInfo.hoouseBaseInfo.address == null) {
								this.flagOne = false
							} else if (this.houseAllInfo.hoouseBaseInfo.additionalExplanation == null) {
								this.flagOne = false
							} else {
								this.flagOne = true
							}
							// 房屋详情
							if (this.houseAllInfo.houseType.length == 0) {
								this.flagTwo = false
							} else if (
								this.houseAllInfo.houseType[0].house_type_bedroom == null &&
								this.houseAllInfo.houseType[0].house_type_drawi == null &&
								this.houseAllInfo.houseType[0].house_type_toilet == null &&
								this.houseAllInfo.houseType[0].house_type_ketchen == null &&
								this.houseAllInfo.houseType[0].house_type_study == null &&
								this.houseAllInfo.houseType[0].house_type_balcony == null
							) {
								this.flagTwo = false
							} else if (
								this.houseAllInfo.houseType[0].house_bed_one == null &&
								this.houseAllInfo.houseType[0].house_bed_two == null &&
								this.houseAllInfo.houseType[0].house_bed_three == null &&
								this.houseAllInfo.houseType[0].house_bed_four == null
							) {
								this.flagTwo = false
							} else if (this.houseAllInfo.hoouseBaseInfo.houseArea == null) {
								this.flagTwo = false
							} else if (this.houseAllInfo.hoouseBaseInfo.fitNumber == null) {
								this.flagTwo = false
							} else {
								this.flagTwo = true
							}
							//房屋描述
							if (this.houseAllInfo.hoouseBaseInfo.houseName == null) {
								this.flagThree = false
							} else if (this.houseAllInfo.hoouseBaseInfo.houseFeature == null) {
								this.flagThree = false
							} else {
								this.flagThree = true
							}
							// 设施服务
							if (this.houseAllInfo.houseFacilities.length > 0) {
								this.facilitiesList = this.houseAllInfo.houseFacilities[0].kitchenList
									.concat(this.houseAllInfo.houseFacilities[0].buildList)
								this.facilitiesList = this.facilitiesList
									.concat(this.houseAllInfo.houseFacilities[0].dispList)
								this.facilitiesList = this.facilitiesList
									.concat(this.houseAllInfo.houseFacilities[0].homeList)
								this.facilitiesList = this.facilitiesList
									.concat(this.houseAllInfo.houseFacilities[0].safeList)
								this.facilitiesList = this.facilitiesList
									.concat(this.houseAllInfo.houseFacilities[0].toiletriesList)
								if (this.facilitiesList.length >= 2) {
									this.flagFour = true
									this.facilitiesOne = this.facilitiesList[0].value
									this.facilitiesTwo = this.facilitiesList[1].value
								} else if (this.facilitiesList.length == 1) {
									this.flagFour = true
									this.facilitiesOne = this.facilitiesList[0].value
								}
							} else {
								this.flagFour = false
							}
							//入住规则
							if (this.houseAllInfo.hoouseBaseInfo.checkInTime == null) {
								this.flagFive = false
							} else if (this.houseAllInfo.hoouseBaseInfo.checkOutTime == null) {
								this.flagFive = false
							} else if (this.houseAllInfo.hoouseBaseInfo.receptionTime == null) {
								this.flagFive = false
							} else if (this.houseAllInfo.cleanTime == null) {
								this.flagFive = false
							} else if (this.houseAllInfo.sheetsTime == null) {
								this.flagFive = false
							} else {
								this.flagFive = true
							}
							//价格设置
							if (this.houseAllInfo.price == null) {
								this.flagSix = false
							} else if (this.houseAllInfo.hoouseBaseInfo.refundRuleDay == null) {
								this.flagSix = false
							} else if (this.houseAllInfo.hoouseBaseInfo.refundRulePercentage == null) {
								this.flagSix = false
							} else if (this.houseAllInfo.hoouseBaseInfo.checkInDays == null) {
								this.flagSix = false
							} else {
								this.flagSix = true
							}
							//添加图片
							if (this.houseAllInfo.houseImg.length > 0) {
								let imgOne = false
								let imgTwo = false
								let imgThree = false
								let imgFour = false
								let imgFive = false
								// let imgThreeList = []
								// let imgFiveList = []
								for (let i in this.houseAllInfo.houseImg) {
									if (this.houseAllInfo.houseImg[i].house_img_type == 0) {
										imgOne = true
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 1) {
										imgTwo = true
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 2) {
										imgThree = true
										// imgThreeList.push(this.houseAllInfo.houseImg[i].house_img)
										// if (imgThreeList.length >= 3) {
										// 	imgThree = true
										// }
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 3) {
										imgFour = true
									} else if (this.houseAllInfo.houseImg[i].house_img_type == 4) {
										imgFive = true
										// imgFiveList.push(this.houseAllInfo.houseImg[i].house_img)
										// if (imgFiveList.length >= 2) {
										// 	imgFive = true
										// }
									}
								}
								if (imgOne && imgTwo && imgThree && imgFour && imgFive) {
									this.flagSeven = true
								} else {
									this.flagSeven = false
								}
							} else {
								this.flagSeven = false
							}

						} else {
							uni.showToast({
								title: '编辑房源失败，请重试',
								icon: 'none'
							});
						}
						this.isShow=true
					}
				});
			},
			editPosition() {
				uni.navigateTo({
					url: '/pages/landlord/resource/position/position'
				});
			},
			editSpecification() {
				uni.navigateTo({
					url: '/pages/landlord/resource/specification/specification'
				});
			},
			editCharacteristic() {
				uni.navigateTo({
					url: '/pages/landlord/resource/characteristic/characteristic'
				});
			},
			editSheshi() {
				uni.navigateTo({
					url: '/pages/landlord/resource/sheshi/sheshi'
				});
			},
			editClaim() {
				uni.navigateTo({
					url: '/pages/landlord/resource/claim/claim'
				});
			},
			editToll() {
				uni.navigateTo({
					url: '/pages/landlord/resource/toll/toll'
				});
			},
			editPhoto() {
				uni.navigateTo({
					url: '/pages/landlord/resource/photo/photo'
				});
			},
			openHouseSource() {
				uni.switchTab({
					url: '/pages/main/tabbar1/tabbar1'
				});
			},
			getImage() {
				this.token = uni.getStorageSync('token');
				uni.request({
					url: this.getApp.api.landlord.houseInfoImg + this.houseId,
					method: 'GET',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.auditEndImgList == "" || res.data.auditEndImgList[0] == undefined) {
							this.img = "house_pic_bg.png"
						} else {
							this.img = res.data.auditEndImgList[0].house_img
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}
	.informWrap {
		width: 100%;
		height: 100vh;
		background-color: #f8f8fb;
	}
	.content{
		width: 100%;
		height:calc(100% - 146upx);
		overflow-y: auto;
	}
	.inform {
		width: calc(100% - 60upx);
		padding: 34upx 30upx 40upx 30upx;
		background-color: #ffffff;
	}
	.dividingLine{
		border-top: 3upx solid #f0f0f0;
	}
	.inform image {
		width: 100%;
		height: 300upx;
		border-radius: 15upx;
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

	.informList .right .carryOut {
		color: $uni-text-color-green;
		font-size: 26upx;
		line-height: 118upx;
		margin-right: 10upx;
	}
	.informList .right .wait {
		font-size: 26upx;
		line-height: 118upx;
		margin-right: 10upx;
		color: $uni-text-color-red;
	}
	.informList .right image {
		width: 32upx;
		height: 32upx;
		margin-top: 45upx;
	}
	.footer {
		width: 100%;
		height: 65upx;
		position: fixed;
		bottom: 20upx;
		justify-content: center;
	}
	.footer view:nth-child(1),
	.footer view:nth-child(2) {
		font-size: 26upx;
		line-height: 65upx;
		border: 1upx solid #b6b6b6;
		text-align: center;
		border-radius: 15upx;
	}
	.footer view:nth-child(1) {
		width: 230upx;
		height: 65upx;
		background-color: #ffffff;
		margin-right: 16upx;
	}
	.footer view:nth-child(2) {
		width: 460upx;
		height: 65upx;
		background-color: #dcdcdc;
		color: #6e6e6e;
	}
</style>
