<template>
	<view class="characteristic">
		<uni-nav-bar v-if="houseFlag==0" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="您的房屋有什么特色"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==1" fixed="true" statusBar="true" right-text="保存" @click-right="openSheshi(0)" left-icon="back"
		 @click-left="comeBackList" title="您的房屋有什么特色"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==2" fixed="true" statusBar="true" left-icon="back" @click-left="comeBackList" title="您的房屋有什么特色"></uni-nav-bar>
		<view class="uni-flex uni-column">
			<view class="title">房屋名称</view>
			<view class="uni-flex uni-row titleText">
				<input placeholder-style="color:#a8a8a8;" value="houseName" :maxlength="20"  @input="watchOne()" v-model="houseName" placeholder="建议:地标+特色/亮点+户型" />
				<view>{{changeOne}}/20</view>
			</view>
			<view class="title">房屋特色</view>
			<view class="teseText">
				<textarea placeholder-style="color:#a8a8a8;" :maxlength="1000" @input="watchTow()" v-model="houseFeature" placeholder="可描述房屋软装风格,家具配套,小区环境,物业管理等"></textarea>
				<view>{{changeTow}}/1000</view>
			</view>
			<view>
				<view class="uni-list-cell-navigate uni-navigate-bottom jtBox" hover-class="uni-list-cell-hover" :class="list[0].open ? 'uni-active' : ''"
				 @click="triggerCollapse(0)">
					交通位置（选填）
				</view>
				<view class="jiaotongText" :class="{'hide':list[0].display}">
					<textarea placeholder-style="color:#a8a8a8;" :maxlength="500" @input="watchThree()" v-model="houseAddress" placeholder="位于朝阳门外大街.从朝阳门地铁站A口5分钟到达,楼下有38路,210等多条公交线路,十分方便"></textarea>
					<view>{{changeThree}}/500</view> 
				</view>
			</view>
			<view class="paddingBot">
				<view class="uni-list-cell-navigate uni-navigate-bottom jtBox" hover-class="uni-list-cell-hover" :class="list[2].open ? 'uni-active' : ''"
				 @click="triggerCollapse(1)">
					周边介绍（选填）
				</view>
				<view class="jiaotongText" :class="{'hide':list[1].display}">
					<textarea placeholder-style="color:#a8a8a8;" :maxlength="500" @input="watchFour()" v-model="houseNearbyIntroduction" placeholder="小区东侧有条美食街,特别推荐美美火锅菜,海鲜烧烤.附近配有超市,便利店,辉煌量版KTV,24小时药店,建行ATM,生活便利.最近的医院,距离2公里,车程5分钟,出租车即可就到"></textarea>
					<view>{{changeFour}}/500</view>
				</view>
			</view>
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="openSheshi(1)">下一步</view>
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
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'spinner'
				},
				token: '',
				houseName: '',
				houseFeature: '',
				houseAddress: '',
				houseNearbyIntroduction: '',
				nextStep: false,
				list: [{
						open: false,
						display: true
					},
					{
						open: false,
						display: true
					},
				],
				edit: '',
				houseAllInfo: {},
				changeOne:0,
				changeTow:0,
				changeThree:0,
				changeFour:0,
				
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			this.getHouseAllInfo()
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
									url: '/pages/landlord/resource/sheshi/sheshi'
								})
							}
						} else {
							console.log('修改房屋审核状态失败')
						}
					}
				});
			},
			change(e) {
				console.log(e)
			},
			comeBack() {
				uni.redirectTo({
					url: '/pages/landlord/resource/specification/specification'
				})
			},
			comeBackList() {
				uni.navigateBack({});
			},
			openSheshi(edit) {
				if (this.houseFlag == 0) {
					this.saveHouseType()
				} else if (this.houseFlag == 1) {
					this.edit = edit
					this.saveHouseType()
				} else if (this.houseFlag == 2) {
					uni.redirectTo({
						url: '/pages/landlord/resource/sheshi/sheshi'
					})
				}
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
							if (this.houseAllInfo.hoouseBaseInfo.houseName != null) {
								this.houseName = this.houseAllInfo.hoouseBaseInfo.houseName
							}
							if (this.houseAllInfo.hoouseBaseInfo.houseFeature != null) {
								this.houseFeature = this.houseAllInfo.hoouseBaseInfo.houseFeature
							}
							if (this.houseAllInfo.hoouseBaseInfo.houseAddress != null) {
								this.houseAddress = this.houseAllInfo.hoouseBaseInfo.houseAddress
							}
							if (this.houseAllInfo.hoouseBaseInfo.houseFeature != null) {
								this.houseNearbyIntroduction = this.houseAllInfo.hoouseBaseInfo.houseNearbyIntroduction
							}
						}
					}
				});
			},
			saveHouseType() {
				var reg=/^[\u4E00-\u9FA5，.。！、……A-Za-z\d\-\_]{0,1000}$/;
				if (this.houseName == '') {
					uni.showToast({
						title: '房屋名称不能为空',
						icon: 'none'
					});
				} else  if(this.houseName!=''&&!reg.test(this.houseName)){
					uni.showToast({
						title: '输入房屋名称错误',
						icon: 'none'
					});
				}
				else if (this.houseFeature == '') {
					uni.showToast({
						title: '房屋特色不能为空',
						icon: 'none'
					});
				} else if(this.houseFeature!=''&&!reg.test(this.houseFeature)){
					uni.showToast({
						title: '输入房屋特色错误',
						icon: 'none'
					});
				}else if(this.watchNum!=''&&!reg.test(this.watchNum)){
					uni.showToast({
						title: '输入交通位置错误',
						icon: 'none'
					});
				}else if(this.houseNearbyIntroduction!=''&&!reg.test(this.houseNearbyIntroduction)){
					uni.showToast({
						title: '输入周边介绍错误',
						icon: 'none'
					});
				}
				else {
					uni.request({
						url: this.getApp.api.landlord.houseInfoThree,
						method: 'POST',
						data: {
							id: this.houseId,
							houseName: this.houseName,
							houseFeature: this.houseFeature,
							houseAddress: this.houseAddress,
							houseNearbyIntroduction: this.houseNearbyIntroduction
						},
						header: {
							token: this.token
						},
						success: res => {
							// console.log(JSON.stringify(res))
							if (res.data.code == 0) {
								if (this.houseFlag == 0) {
									uni.redirectTo({
										url: '/pages/landlord/resource/sheshi/sheshi'
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
			triggerCollapse(e) {
				this.display = !this.display
				for (var i = 0; i < this.list.length; ++i) {
					if (e === i) {
						this.list[i].display = !this.list[e].display;
					} else {
						this.list[i].display = true;
						this.nextStep = !this.nextStep
					}
				}
			},
			watchOne(){
				 this.changeOne=this.houseName.length; 
			},
			watchTow(){
				 this.changeTow=this.houseFeature.length; 
			},
			watchThree(){
				 this.changeThree=this.houseAddress.length; 
			},
			watchFour(){
				 this.changeFourm=this.houseNearbyIntroduction.length; 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hide {
		display: none;
	}

	.characteristic {
		width: 100%;
		height: 100vh;
		background-color: #f8f7fc;
	}

	.characteristic .title {
		width: calc(100% - 30upx);
		height: 50upx;
		background-color: #f8f7fc;
		font-size: 24upx;
		color: #3d3d3d;
		font-weight: bold;
		padding-top: 30upx;
		padding: 30upx 0 0 30upx;
	}

	.characteristic .titleText {
		justify-content: space-between;
		width: 100%;
	}

	.characteristic .titleText view {
		width: 30%;
		font-size: 18upx;
		color: #656565;
		height: 88upx;
		line-height: 88upx;
		padding-right: 30upx;
		text-align: right;
		background-color: #ffffff;
	}

	.characteristic .titleText input {
		width: calc(100% - 60upx);
		background-color: #ffffff;
		font-size: 24upx;
		color: #3d3d3d;
		height: 40upx;
		line-height: 40upx;
		padding:17upx 30upx 17upx 30upx;
	}

	.characteristic .teseText {
		width: calc(100% - 60upx);
		padding: 30upx 30upx 0 30upx;
		height: 355upx;
		background: #FFFFFF;
		margin-bottom: 70upx;
	}

	.characteristic .teseText view {
		width: 100%;
		height: 66upx;
		text-align: right;
		font-size: 18upx;
		color: #656565;
		margin-bottom: 48upx;
	}

	.characteristic .teseText textarea {
		width: 100%;
		height: 289upx;
		background-color: #FFFFFF;
		font-size: 24upx;
		color: #3d3d3d;
		overflow-y: auto;
	}

	.jtBox {
		border-top: 1upx solid #e1e1e1;
		background-color: #ffffff;

	}

	.jiaotongText {
		width: calc(100% - 60upx);
		height: 306upx;
		padding: 30upx 30upx 0 30upx;
		background-color: #ffffff;
	}

	.jiaotongText textarea {
		width: 100%;
		height: 236upx;
		background: #ffffff;
		font-size: 24upx;
		color: #3d3d3d;
		overflow-y: auto;
	}

	.jiaotongText view {
		width: 100%;
		height: 66upx;
		text-align: right;
		font-size: 18upx;
		color: #656565;
	}

	.paddingBot {
		padding-bottom: 148upx;
		background-color: #f8f7fc;
	}

	.bottomWarp {
		background-color: #ffffff;
		width: calc(100% - 48upx);
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
