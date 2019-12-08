<template>
	<view class="determine" v-if="isShow">
		<uni-nav-bar v-if="houseFlag==0" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="您的房子是怎样的"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==1" fixed="true" statusBar="true" right-text="保存" @click-right="openCharacteristic(0)"
		 left-icon="back" @click-left="comeBackList" title="您的房子是怎样的"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==2" fixed="true" statusBar="true" @click-left="comeBackList" left-icon="back" title="您的房子是怎样的"></uni-nav-bar>
		<view class="uni-flex uni-column padBot">
			<view class="uni-flex uni-row way listWarp">
				<view>出租方式</view>
				<view>{{ rentalMode==0?'整套出租':'暂无数据' }}</view>
				<!-- <input type="text"  placeholder-style="color:#999999;"  placeholder="整套出租?"/> -->

			</view>
			<view class="uni-flex uni-row listWarp wayTitle">
				<view>房屋</view>
			</view>
			<view class="uni-flex uni-row listWarp types" @tap="openTypes">
				<view class="left">房屋类型</view>
				<view class="uni-flex uni-row right">
					<view>{{typeOf.length==0?'请选择房屋类型':typeOf[1]}}</view>
					<view>
						<image :src="imageUrl+'nav_right_icon@2x.png.png'"></image>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row listWarp types" @click="togglePopup('bottom',0)">
				<view class="left">房屋户型</view>
				<view class="uni-flex uni-row right">
					<view>{{houseTypeBedroom!=0?houseTypeBedroom+'室':''}}{{houseTypeDrawi!=0?houseTypeDrawi+'厅':''}}{{houseTypeToilet!=0?houseTypeToilet+'卫':''}}{{houseTypeKetchen!=0?houseTypeKetchen+'厨':''}}{{houseTypeStudy!=0?houseTypeStudy+'书房':''}}{{houseTypeBalcony!=0?houseTypeBalcony+'阳台':''}}</view>
					<view>
						<image :src="imageUrl+'nav_right_icon@2x.png.png'"></image>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row listWarp size">
				<view class="left">房屋面积</view>
				<view class="uni-flex uni-row right">
					<view>
						<input type="number"  @input="watchNum" placeholder-style="color:#cdcdcd;" v-model="house_area" placeholder="请输入房屋面积" />
					</view>
					<view class="text">平米</view>
				</view>
			</view>
			<view class="uni-flex uni-row listWarp wayTitle">
				<view>床型</view>
			</view>
			<view class="uni-flex uni-row listWarp types" @click="togglePopup('bottom',1)">
				<view class="left">添加床型</view>
				<view class="uni-flex uni-row right">
					<view>{{houseBigNumber!=0?houseBigNumber+'大床':''}}{{houseDoubNumber!=0?houseDoubNumber+'双人床':''}}{{houseIndNumber!=0?houseIndNumber+'单人床':''}}{{houseChildNumber!=0?houseChildNumber+'儿童床':''}}</view>
					<view>
						<image :src="imageUrl+'nav_right_icon@2x.png.png'"></image>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row listWarp number">
				<view class="left">宜住人数</view>
				<view class="right">
					<uni-number-box :min="1" :max="9" :value="fit_number" @change="bindChange"></uni-number-box>
				</view>
			</view>
		</view>
		<view class="marginBox"></view>
		<uni-popup :show="type === 'bottom'" position="bottom" mode="fixed" @hidePopup="togglePopup()">
			<view class="uni-flex uni-column paddingWrap" v-if="tabState">
				<view class="uni-flex uni-row popListTitle">
					<view @tap="togglePopup">取消</view>
					<view>房屋户型</view>
					<view @tap="togglePopup">确定</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">卧室</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseTypeBedroom" @change="Bedroom"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">客厅</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseTypeDrawi" @change="Drawi"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">卫生间</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseTypeToilet" @change="Toilet"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">厨房</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseTypeKetchen" @change="Ketchen"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">书房</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseTypeStudy" @change="Study"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">阳台</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseTypeBalcony" @change="Balcony"></uni-number-box>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column paddingWrap" v-if="!tabState">
				<view class="uni-flex uni-row popListTitle">
					<view @tap="togglePopup">取消</view>
					<view>添加床型</view>
					<view @tap="togglePopup">确定</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">大床</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseBigNumber" @change="BigNumber"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">双人床</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseDoubNumber" @change="DoubNumber"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">单人床</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseIndNumber" @change="IndNumber"></uni-number-box>
					</view>
				</view>
				<view class="uni-flex uni-row popList">
					<view class="left">儿童床</view>
					<view class="right">
						<uni-number-box :min="0" :max="9" :value="houseChildNumber" @change="ChildNumber"></uni-number-box>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="bottomWarp">
			<view class="bottom" @tap="openCharacteristic(1)">下一步</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
 	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue' 
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
		 	uniNumberBox, 
			uniPopup,
			uniNavBar
		},
		data() {
			return {
				"numberValue": 0,
				rentalMode: 0,
				houseTypeBedroom: 0,
				houseTypeDrawi: 0,
				houseTypeToilet: 0,
				houseTypeKetchen: 0,
				houseTypeStudy: 0,
				houseTypeBalcony: 0,
				houseBigNumber: 0,
				houseDoubNumber: 0,
				houseIndNumber: 0,
				houseChildNumber: 0,
				house_area: '',
				fit_number: 0,
				houseType: 0,
				array: [],
				token: '',
				type: '',
				nextStep: false,
				tabState: true,
				dictData: [],
				value: [],
				edit: '',
				houseAllInfo: {},
				imageUrl:'',
				isShow:false
			}
		},
		onLoad() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.getHouseType()
			
		},
		computed: {
			houseId() {
				return this.$store.state.houseId
			},
			typeOf() {
				return this.$store.state.houseType
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
									url: '/pages/landlord/resource/characteristic/characteristic'
								})
							}
						} else {
							console.log('修改房屋审核状态失败')
						}
					}
				});
			},
			comeBack() {
				uni.redirectTo({
					url: '/pages/landlord/resource/position/position'
				})
			},
			comeBackList() {
				uni.navigateBack({});
			},
			getHouseType() {
				uni.request({
					url: this.getApp.api.dict,
					method: 'GET',
					data: {
						type: 'house_type'
					},
					success: res => {
						this.dictData = res.data.dictData
						this.getHouseAllInfo()
					}
				});
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
							if (this.houseAllInfo.houseType.length > 0) {
								for (let i in this.dictData) {
									if (this.houseAllInfo.houseType[0].house_type == this.dictData[i].code) {
										this.value[0] = this.dictData[i].code
										this.value[1] = this.dictData[i].value
										this.$store.commit('changeHouseType', this.value);
									}
								}
								if (this.houseAllInfo.houseType[0].house_type_bedroom != null) {
									this.houseTypeBedroom = this.houseAllInfo.houseType[0].house_type_bedroom
								}
								if (this.houseAllInfo.houseType[0].house_type_drawi != null) {
									this.houseTypeDrawi = this.houseAllInfo.houseType[0].house_type_drawi
								}
								if (this.houseAllInfo.houseType[0].house_type_toilet != null) {
									this.houseTypeToilet = this.houseAllInfo.houseType[0].house_type_toilet
								}
								if (this.houseAllInfo.houseType[0].house_type_ketchen != null) {
									this.houseTypeKetchen = this.houseAllInfo.houseType[0].house_type_ketchen
								}
								if (this.houseAllInfo.houseType[0].house_type_study != null) {
									this.houseTypeStudy = this.houseAllInfo.houseType[0].house_type_study
								}
								if (this.houseAllInfo.houseType[0].house_type_balcony != null) {
									this.houseTypeBalcony = this.houseAllInfo.houseType[0].house_type_balcony
								}
								if (this.houseAllInfo.houseType[0].house_bed_one != null) {
									this.houseBigNumber = this.houseAllInfo.houseType[0].house_bed_one
								}
								if (this.houseAllInfo.houseType[0].house_bed_two != null) {
									this.houseDoubNumber = this.houseAllInfo.houseType[0].house_bed_two
								}
								if (this.houseAllInfo.houseType[0].house_bed_three != null) {
									this.houseIndNumber = this.houseAllInfo.houseType[0].house_bed_three
								}
								if (this.houseAllInfo.houseType[0].house_bed_four != null) {
									this.houseChildNumber = this.houseAllInfo.houseType[0].house_bed_four
								}
							}
							if (this.houseAllInfo.hoouseBaseInfo.houseArea != null) {
								this.house_area = this.houseAllInfo.hoouseBaseInfo.houseArea
							}
							if (this.houseAllInfo.hoouseBaseInfo.fitNumber != null) {
								this.fit_number = this.houseAllInfo.hoouseBaseInfo.fitNumber
							}
						}
						this.isShow=true
					}
				});
			},
			bindChange(val) {
				this.fit_number = val
			},
			Bedroom(val) {
				this.houseTypeBedroom = val
			},
			Drawi(val) {
				this.houseTypeDrawi = val
			},
			Toilet(val) {
				this.houseTypeToilet = val
			},
			Ketchen(val) {
				this.houseTypeKetchen = val
			},
			Study(val) {
				this.houseTypeStudy = val
			},
			Balcony(val) {
				this.houseTypeBalcony = val
			},
			BigNumber(val) {
				this.houseBigNumber = val
			},
			DoubNumber(val) {
				this.houseDoubNumber = val
			},
			IndNumber(val) {
				this.houseIndNumber = val
			},
			ChildNumber(val) {
				this.houseChildNumber = val
			},
			watchNum(){
				setTimeout(() => { this.house_area =this.house_area.replace(/\D/g,'') ; }, 3)
			},
			saveHouseType() {
				console.log(this.fit_number)
				var reg =/^[1-9][0-9]*$/;
				if (this.typeOf.length == 0) {
					uni.showToast({
						title: '房屋类型不能为空',
						icon: 'none'
					});
				} else if (
					this.houseTypeBedroom == '' &&
					this.houseTypeDrawi == '' &&
					this.houseTypeToilet == '' &&
					this.houseTypeKetchen == '' &&
					this.houseTypeStudy == '' &&
					this.houseTypeBalcony == ''
				) {
					uni.showToast({
						title: '房屋户型不能为空',
						icon: 'none'
					});

				} else if (this.house_area == '') {
					uni.showToast({
						title: '房屋面积不能为空',
						icon: 'none'
					});
				} else if(this.house_area!=''&&!reg.test(this.house_area)){
					uni.showToast({
						title: '输入房屋面积错误',
						icon: 'none'
					});
				}
				else if (
					this.houseBigNumber == '' &&
					this.houseDoubNumber == '' &&
					this.houseIndNumber == '' &&
					this.houseChildNumber == ''
				) {
					uni.showToast({
						title: '添加床型不能为空',
						icon: 'none'
					});
				} else if (this.fit_number == '') {
					uni.showToast({
						title: '宜住人数不能为空',
						icon: 'none'
					});
				} else {
					uni.request({
						url: this.getApp.api.landlord.houseInfoTwo + '?houseId=' + this.houseId + '&house_area=' + this.house_area +
							'&fit_number=' + this.fit_number,
						method: 'POST',
						data: {
							houseId: this.houseId,
							houseType: this.typeOf[0],
							rentalMode: this.rentalMode,
							houseTypeBedroom: this.houseTypeBedroom,
							houseTypeDrawi: this.houseTypeDrawi,
							houseTypeToilet: this.houseTypeToilet,
							houseTypeKetchen: this.houseTypeKetchen,
							houseTypeStudy: this.houseTypeStudy,
							houseTypeBalcony: this.houseTypeBalcony,
							houseBedOne: this.houseBigNumber,
							houseBedTwo: this.houseDoubNumber,
							houseBedThree: this.houseIndNumber,
							houseBedFour: this.houseChildNumber
						},
						header: {
							token: this.token
						},
						success: res => {
							if (res.data.code == 0) {
								// this.openCharacteristic()
								if (this.houseFlag == 0) {
									uni.redirectTo({
										url: '/pages/landlord/resource/characteristic/characteristic'
									})
								} else if (this.houseFlag == 1) {
									this.updateHouseAuditStatus()
								}
							}
							if (res.data.code != 0) {
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
			openTypes() {
				uni.navigateTo({
					url: '/pages/landlord/resource/types/types',
				})
			},
			openCharacteristic(edit) {
				if (this.houseFlag == 0) {
					this.saveHouseType()
				} else if (this.houseFlag == 1) {
					this.edit = edit
					this.saveHouseType()
				} else if (this.houseFlag == 2) {
					uni.redirectTo({
						url: '/pages/landlord/resource/characteristic/characteristic'
					})
				}
			},
			togglePopup(type, e) {
				// console.log(e)
				if (e == 0) {
					this.tabState = true
				} else {
					this.tabState = false
				}
				this.type = type
			},
			change(value) {
				this.numberValue = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}

	.determine {
		width: 100%;
		height: 100vh;
		background-color: #f8f7fc;
	}
	.padBot{
		padding-bottom: 138upx;
	}
	.listWarp {
		width: calc(100% - 48upx);
		padding: 0 24upx 0 24upx;
		height: 88upx;
		border-bottom: 1upx solid #e8e8e8;
		background: #FFFFFF;

	}

	.way {
		margin: 25upx 0 0 0;
		justify-content: space-between;
		background-color: #ffffff;
	}

	.way view:nth-child(1) {
		line-height: 88upx;
		font-size: 24upx;
		color: #656565;
	}

	.way view:nth-child(2) {
		line-height: 88upx;
		font-size: 24upx;
		color: #3d3d3d;
		padding-right: 48upx;
	}

	.wayTitle {
		width: 100%;
		width: calc(100% - 48upx);
		height: 70upx;
		font-size: 24upx;
		color: #3d3d3d;
		background-color: #f8f7fc;
	}

	.wayTitle view {
		line-height: 70upx;
	}

	.types {
		justify-content: space-between;
	}

	.types .left {
		color: #656565;
		font-size: 24upx;
		line-height: 88upx;
	}

	.types .right view:nth-child(1) {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 88upx;
	}

	.types .right image {
		width: 44upx;
		height: 44upx;
		margin: 25upx 0 0 18upx;
	}

	.size {
		justify-content: space-between;
	}

	.size .left,
	.number .left {
		color: #656565;
		font-size: 24upx;
		line-height: 88upx;
	}

	.size .right input {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 42upx;
		height: 42upx; 
		text-align: right;
		margin-top: 17upx;
		
	}

	.size .right .text {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 42upx;
		height: 42upx;
		margin-left: 14upx;
		margin-top: 23upx;
	}
	.number {
		justify-content: space-between;
		margin: 20upx 0 128upx 0;
	}

	.number .right {
		padding-top: 24upx;

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

	.paddingWrap {}

	.popList {
		padding: 0 30upx 0 30upx;
		width: calc(100% - 60upx);
		background-color: #ffffff;
		border-bottom: 1upx solid #f8f8f8;
		height: 84upx;
		justify-content: space-between;
	}

	.popListTitle {
		padding: 0 30upx 0 30upx;
		width: calc(100% - 60upx);
		background-color: #ffffff;
		border-bottom: 1upx solid #f8f8f8;
		height: 80upx;
	}

	.popListTitle view:nth-child(1) {
		font-size: 22upx;
		color: #6d6d6d;
		width: 50upx;
		line-height: 80upx;
	}

	.popListTitle view:nth-child(2) {
		flex: 1;
		color: #3a3a3a;
		font-size: 24upx;
		line-height: 80upx;
	}

	.popListTitle view:nth-child(3) {
		font-size: 22upx;
		color: $uni-text-color-green;
		width: 50upx;
		line-height: 80upx;
	}

	.popList .left {
		color: #3a3a3a;
		font-size: 22upx;
		line-height: 84upx;
	}

	.popList .right {
		padding-top: 24upx;


	}
</style>
