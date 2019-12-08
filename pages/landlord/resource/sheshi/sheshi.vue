<template>
	<view class="sheshi" v-if="isShow">
		<uni-nav-bar v-if="houseFlag==0" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="您有哪些设施可以提供"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==1" fixed="true" statusBar="true" right-text="保存" @click-right="openClaim(0)" left-icon="back"
		 @click-left="comeBackList" title="您有哪些设施可以提供"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==2" fixed="true" statusBar="true" left-icon="back" @click-left="comeBackList" title="您有哪些设施可以提供"></uni-nav-bar>
		<view class="paddingBot">
			<!-- <view style="font-size: 32upx;color:#111015;line-height: 1em;padding-top: 36upx; padding-left: 30upx;">房屋设施</view> -->
			<view class="uni-flex uni-column lastPadding">
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.kitchenList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="kitchenChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.kitchenList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.safeList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="safeListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.safeList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.dispList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="dispListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.dispList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.buildList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="buildListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.buildList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.toiletriesList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="toiletriesListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.toiletriesList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.homeList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="homeListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.homeList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="openClaim(1)">下一步</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				token: '',
				build: '',
				disp: '',
				home: '',
				kitchen: '',
				safe: '',
				toiletries: '',
				facilitiesList: {},
				urlImage: '',
				nextStep: false,
				pureDefault: '',
				edit: '',
				houseAllInfo: {},
				isShow:false
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			this.urlImage = this.getApp.api.urlImage
			this.getFacility()
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
							if (this.edit == 0) {
								this.comeBackList()
							} else if (this.edit == 1) {
								uni.redirectTo({
									url: '/pages/landlord/resource/claim/claim'
								})
							}
						} else {
							console.log('修改房屋审核状态失败')
						}
					}
				});
			},
			openClaim(edit) {
				if (this.houseFlag == 0) {
					this.saveHouseType()
				} else if (this.houseFlag == 1) {
					this.edit = edit
					this.saveHouseType()
				} else if (this.houseFlag == 2) {
					uni.redirectTo({
						url: '/pages/landlord/resource/claim/claim'
					})
				}
			},
			checkboxChange(e, list) {
				let values = e.detail.value;
				for (let i = 0, lenI = list.length; i < lenI; ++i) {
					const item = list[i]
					if (values.includes(item.code)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				// console.log(JSON.stringify(list))
			},
			kitchenChange(e) {
				this.kitchen = e.detail.value.join(',')
				// console.log(this.kitchen)
				this.checkboxChange(e, this.facilitiesList.kitchenList)
			},
			safeListChange(e) {
				this.safe = e.detail.value.join(',')
				// console.log(this.safe)
				this.checkboxChange(e, this.facilitiesList.safeList)
			},
			dispListChange(e) {
				this.disp = e.detail.value.join(',')
				// console.log(this.disp)
				this.checkboxChange(e, this.facilitiesList.dispList)
			},
			buildListChange(e) {
				this.build = e.detail.value.join(',')
				// console.log(this.build)
				this.checkboxChange(e, this.facilitiesList.buildList)
			},
			toiletriesListChange(e) {
				this.toiletries = e.detail.value.join(',')
				// console.log(this.toiletries)
				this.checkboxChange(e, this.facilitiesList.toiletriesList)
			},
			homeListChange(e) {
				this.home = e.detail.value.join(',')
				// console.log(this.home)
				this.checkboxChange(e, this.facilitiesList.homeList)
			},
			comeBack() {
				uni.redirectTo({
					url: '/pages/landlord/resource/characteristic/characteristic'
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
							if(this.houseAllInfo.houseFacilities.length>0){
								if (this.houseAllInfo.houseFacilities[0].kitchen != null&&
								this.houseAllInfo.houseFacilities[0].kitchen != "") {
									this.kitchen = this.houseAllInfo.houseFacilities[0].kitchen
									this.changeList(this.kitchen, this.facilitiesList.kitchenList)
								}
								if (this.houseAllInfo.houseFacilities[0].safe != null&&
								this.houseAllInfo.houseFacilities[0].safe != "") {
									this.safe = this.houseAllInfo.houseFacilities[0].safe
									this.changeList(this.kitchen, this.facilitiesList.safeList)
								}
								if (this.houseAllInfo.houseFacilities[0].disp != null&&
								this.houseAllInfo.houseFacilities[0].disp != "") {
									this.disp = this.houseAllInfo.houseFacilities[0].disp
									this.changeList(this.disp, this.facilitiesList.dispList)
								}
								if (this.houseAllInfo.houseFacilities[0].build != null&&
								this.houseAllInfo.houseFacilities[0].build != "") {
									this.build = this.houseAllInfo.houseFacilities[0].build
									this.changeList(this.build, this.facilitiesList.buildList)
								}
								if (this.houseAllInfo.houseFacilities[0].toiletries != null&&
								this.houseAllInfo.houseFacilities[0].toiletries != "") {
									this.toiletries = this.houseAllInfo.houseFacilities[0].toiletries
									this.changeList(this.toiletries, this.facilitiesList.toiletriesList)
								}
								if (this.houseAllInfo.houseFacilities[0].home != null&&
								this.houseAllInfo.houseFacilities[0].home != "") {
									this.home = this.houseAllInfo.houseFacilities[0].home
									this.changeList(this.home, this.facilitiesList.homeList)
								}
							}
						}
						this.isShow=-true
					}
				});
			},
			changeList(val, valList) {
				let pureList = val.split(',')
				for (let i in valList) {
					if (pureList.includes(valList[i].code)) {
						this.$set(valList[i], 'checked', true)
					} else {
						this.$set(valList[i], 'checked', false)
					}
				}
			},
			saveHouseType() {
				this.pureDefault += this.kitchen
				this.pureDefault += this.build
				this.pureDefault += this.disp
				this.pureDefault += this.home
				this.pureDefault += this.safe
				this.pureDefault += this.toiletries
				console.log(this.pureDefault)
				if (this.pureDefault == '') {
					uni.showToast({
						title: '设施服务不能为空',
						icon: 'none'
					});
				} else {
					uni.request({
						url: this.getApp.api.landlord.houseInfoFour,
						method: 'POST',
						data: {
							build: this.build,
							disp: this.disp,
							home: this.home,
							houseId: this.houseId,
							kitchen: this.kitchen,
							safe: this.safe,
							toiletries: this.toiletries
						},
						header: {
							token: this.token
						},
						success: res => {
							// console.log(JSON.stringify(res))
							if (res.data.code == 0) {
								if (this.houseFlag == 0) {
									uni.redirectTo({
										url: '/pages/landlord/resource/claim/claim'
									})
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
			getFacility() {
				uni.request({
					url: this.getApp.api.landlord.facilityList,
					method: 'GET',
					data: {},
					success: res => {
						this.facilitiesList = res.data.facilitiesList
						this.getHouseAllInfo()
						// console.log(JSON.stringify(res))
					}
				});
			}
		},
		components: {
			uniNavBar
		}
	}
</script>

<style lang="scss" scoped>
	.label {
		padding: 0;
	}

	.hide {
		display: none;
	}

	.sheshi {
		width: 100%;

	}

	.sheshi-padding {
		padding: 0 30upx;
	}

	.paddingBot {
		width: 100%;
		padding-bottom: 118upx;
	}

	.sheshiTitle {
		font-size: 28upx;
		padding-top: 28upx;
		padding-bottom: 16upx;
		color: #111015;
		line-height: 1em;
		background-color: #f8f7fc;

	}

	.sheshiWrap {
		padding-top: 46upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #e8e8e8;
	}

	.sheshiList {
		flex-wrap: wrap;
		text-align: center;
		background: #ffffff;


	}

	.sheshi .imgBgHide {
		width: 106upx;
		height: 106upx;
		background: #f8f7fc;
		border-radius: 50%;
		display: none;

	}

	.sheshi .imgBgHide image {
		width: 106upx;
		height: 106upx;
	}

	.sheshi .imgBg {
		display: block;
		width: 106upx;
		height: 106upx;
		border-radius: 50%;
		background-color: #ecf1f2;

	}

	// .sheshi .active {
	// 	background-color: #FFFFFF;
	// 	box-shadow: 3upx 4upx 5upx 4upx #e7eaea;
	// }

	.sheshi .imgBg image {
		width: 106upx;
		height: 106upx;
	}

	.imgName {
		width: 106upx;
		font-size: 22upx;
		color: #999999;
		text-align: center;
		line-height: 1em;
		padding-top: 10upx;
		padding-bottom: 48upx;
	}

	.imgName-active {
		color: $uni-text-color-green;
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

	.active {
		.imgBg {
			background-color: #FFFFFF;
			box-shadow: 3upx 4upx 5upx 4upx #e7eaea;
		}

		.imgName {
			color: $uni-text-color-green;
		}
	}
</style>
