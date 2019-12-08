<template>
	<view class="container">
		<uni-nav-bar v-if="houseFlag==0" fixed="true" statusBar="true" @click-left="comeBack" left-icon="back" title="您的房屋在什么位置"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==1" fixed="true" statusBar="true" right-text="保存" @click-right="openHouseType(0)"
		 @click-left="comeBack" left-icon="back" title="您的房屋在什么位置"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==2" fixed="true" statusBar="true" @click-left="comeBack" left-icon="back" title="您的房屋在什么位置"></uni-nav-bar>
		<view class="uni-common-mt padBot">
			<view class="uni-form-item">
				<view class="title">国家或区域</view>
				<input class="uni-input" v-model="houseForm.country" disabled="true" />
			</view>
			<view class="uni-form-item">
				<view class="title">城市</view>
				<input class="uni-input" disabled="true" placeholder-style="color:#a8a8a8;" @click="showMulLinkageThreePicker" v-model="houseForm.addressList"
				 placeholder="请选择城市" />
			</view>
			<view class="uni-form-item">
				<view class="title">定位地址</view>
				<input class="uni-input" disabled="true" @tap="chooseLocation" placeholder-style="color:#a8a8a8;" v-model="houseForm.locationAddress"
				 placeholder="请选择房屋定位地址" />
			</view>
			<view class="uni-form-item">
				<view class="title">详细地址</view>
				<input class="uni-input" maxlength="60" placeholder-style="color:#a8a8a8;" v-model="houseForm.address" placeholder="输入房屋详细地址" />
			</view>
			<view class="uni-form-item">
				<view class="title">所属景区</view>
				<input class="uni-input" maxlength="30" placeholder-style="color:#a8a8a8;" v-model="houseForm.explain" placeholder="必填,不可与地址重复" />
			</view>
			<view class="uni-form-item marginBot">
				<view class="title">门牌号</view>
				<input class="uni-input" placeholder-style="color:#a8a8a8;" type="text" v-model="houseForm.numPlate" placeholder="非必填,房客预定后可见" />
			</view>
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="openHouseType(1)">下一步</view>
		</view>

		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				houseForm: {
					country: '中国大陆',
					province: '',
					city: '',
					address: '',
					area: '',
					explain: '',
					numPlate: '',
					provinceId: '',
					cityId: '',
					areaId: '',
					addressList: '',
					latitude: '',
					longitude: '',
					locationAddress: ''
				},
				themeColor: '#45c298',
				cityPickerValueDefault: [0, 0, 1],
				nextStep: false,
				token: '',
				edit: '',
				houseAllInfo: {},
				hasLocation: false
			};
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
		components: {
			uniNavBar,
			mpvueCityPicker
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			this.getHouseAllInfo()
		},
		methods: {
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true
						this.houseForm.longitude = res.longitude
						this.houseForm.latitude = res.latitude
						// this.location = formatLocation(res.longitude, res.latitude)
						this.houseForm.locationAddress = res.address
						console.log(this.houseForm.longitude + '-' + this.houseForm.latitude + '-' + this.houseForm.locationAddress)
					}
				})
			},
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
							if (this.edit == 0) {
								this.comeBack()
							} else if (this.edit == 1) {
								uni.redirectTo({
									url: '/pages/landlord/resource/specification/specification'
								});
							}
						} else {
							console.log('修改房屋审核状态失败')
						}
					}
				});
			},
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
							if (this.houseAllInfo.hoouseBaseInfo.country != null) {
								this.houseForm.country = this.houseAllInfo.hoouseBaseInfo.country
							}
							if (this.houseAllInfo.hoouseBaseInfo.province != null) {
								this.houseForm.province = this.houseAllInfo.hoouseBaseInfo.province
								this.houseForm.provinceId = this.houseAllInfo.hoouseBaseInfo.provinceId
								this.houseForm.addressList += this.houseAllInfo.hoouseBaseInfo.province + '-'
							}
							if (this.houseAllInfo.hoouseBaseInfo.city != null) {
								this.houseForm.city = this.houseAllInfo.hoouseBaseInfo.city
								this.houseForm.cityId = this.houseAllInfo.hoouseBaseInfo.cityId
								this.houseForm.addressList += this.houseAllInfo.hoouseBaseInfo.city + '-'
							}
							if (this.houseAllInfo.hoouseBaseInfo.area != null) {
								this.houseForm.addressList += this.houseAllInfo.hoouseBaseInfo.area
								this.houseForm.area = this.houseAllInfo.hoouseBaseInfo.area
								this.houseForm.areaId = this.houseAllInfo.hoouseBaseInfo.areaId
							}
							console.log(this.houseAllInfo.hoouseBaseInfo.locationAddress)
							console.log(this.houseAllInfo.hoouseBaseInfo.latitude)
							console.log(this.houseAllInfo.hoouseBaseInfo.longitude)
							if (this.houseAllInfo.hoouseBaseInfo.locationAddress != null) {
								this.houseForm.latitude = this.houseAllInfo.hoouseBaseInfo.latitude
								this.houseForm.longitude = this.houseAllInfo.hoouseBaseInfo.longitude
								this.houseForm.locationAddress = this.houseAllInfo.hoouseBaseInfo.locationAddress
							}
							if (this.houseAllInfo.hoouseBaseInfo.address != null) {
								this.houseForm.address = this.houseAllInfo.hoouseBaseInfo.address
							}
							if (this.houseAllInfo.hoouseBaseInfo.additionalExplanation != null) {
								this.houseForm.explain = this.houseAllInfo.hoouseBaseInfo.additionalExplanation
							}
							if (this.houseAllInfo.hoouseBaseInfo.houseNumber != null) {
								this.houseForm.numPlate = this.houseAllInfo.hoouseBaseInfo.houseNumber
							}
						}
					}
				});
			},
			keep() {
				var reg=/^[\u4E00-\u9FA5A-Za-z\d\-\_]{2,60}$/;
				var regExplain=/^[\u4E00-\u9FA5A-Za-z\d\-\_]{2,30}$/;
				var regNumPlate = /^([a-z_A-Z-.+0-9]+)$/
				if (this.houseForm.country == '') {
					uni.showToast({
						title: '国家或区域不能为空',
						icon: 'none'
					});
				} else if (this.houseForm.addressList == '') {
					uni.showToast({
						title: '城市不能为空',
						icon: 'none'
					});
				}else if (this.houseForm.locationAddress == '') {
					uni.showToast({
						title: '定位地址不能为空',
						icon: 'none'
					});
				}else if (this.houseForm.address == '') {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none'
					});
				}else if(this.houseForm.address!=''&&!reg.test(this.houseForm.address)){
					uni.showToast({
						title: '输入详细地址错误',
						icon: 'none'
					});
				}else if (this.houseForm.explain == '') {
					uni.showToast({
						title: '所属景区不能为空',
						icon: 'none'
					});
				}else if(this.houseForm.explain!=''&&!regExplain.test(this.houseForm.explain)){
					uni.showToast({
						title: '输入所属景区错误',
						icon: 'none'
					});
				}else if(this.houseForm.numPlate!=''&&!regNumPlate.test(this.houseForm.numPlate)){
						uni.showToast({
							title: '输入门牌号错误',
							icon: 'none'
						});
					} else {console.log(1)
					uni.request({
						url: this.getApp.api.landlord.houseInfoOne,
						method: 'POST',
						data: {
							id: this.houseId,
							country: this.houseForm.country,
							address: this.houseForm.address,
							additionalExplanation: this.houseForm.explain,
							houseNumber: this.houseForm.numPlate,
							provinceId: this.houseForm.provinceId,
							province: this.houseForm.province,
							cityId: this.houseForm.cityId,
							city: this.houseForm.city,
							areaId: this.houseForm.areaId,
							area: this.houseForm.area,
							latitude: this.houseForm.latitude,
							longitude: this.houseForm.longitude,
							location_address: this.houseForm.locationAddress
						},
						header: {
							token: this.token
						},
						success: res => {
							// console.log(JSON.stringify(res))
							if (res.data.code == 0) {
								// this.openHouseType()
								if (this.houseFlag == 0) {
									uni.redirectTo({
										url: '/pages/landlord/resource/specification/specification'
									});
								} else if (this.houseFlag == 1) {
									this.updateHouseAuditStatus()
								}
							} else {
								uni.showToast({
									title: '保存失败，请重试',
									icon: 'none',
									duration: 2000
								});
							}
						}
					});
				}
			},
			// 下一步
			openHouseType(edit) {
				if (this.houseFlag == 0) {
					this.keep()
				} else if (this.houseFlag == 1) {
					this.edit = edit
					this.keep()
				} else if (this.houseFlag == 2) {
					uni.redirectTo({
						url: '/pages/landlord/resource/specification/specification'
					});
				}
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.opende = false
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.houseForm.province = e.province
				this.houseForm.city = e.city
				this.houseForm.area = e.area
				this.houseForm.provinceId = e.provinceCode
				this.houseForm.cityId = e.cityCode
				this.houseForm.areaId = e.areaCode
				this.houseForm.addressList = this.houseForm.province + '-' + this.houseForm.city + '-' + this.houseForm.area
				console.log(e.value)
			},
			onCancel(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input[disabled] {
		opacity: 1 !important;
		color:#3d3d3d !important;
	}

	.container {
		min-height: 100vh;
		background: #f8f7fc;
	}
	.padBot{
		padding-bottom: 138upx;
	}
	.label {
		font-weight: bold;
		font-size: 34upx;
		color: #3d3d3d;
		padding: 0 30upx;
		line-height: 80upx;
		margin-top: -30upx;
	}

	.uni-form-item {
		background: #fff;
		margin: 0 0 30upx;
		padding: 0;

		.title {
			width: 130upx;
		}

		.title,
		.uni-input {
			padding: 23upx 30upx;
			font-size: 24upx;
			color: #3d3d3d;
		}

		.uni-textarea {
			padding: 0 30upx;
			box-sizing: border-box;
			textarea {
				min-height: 355upx !important;
			}
		}
	}

	.marginBot {
		margin-bottom: 128upx;
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
		width: calc(100% - 48upx);
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
