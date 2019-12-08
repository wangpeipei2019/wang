<template>
	<view class="toll" v-if="isShow">
		<uni-nav-bar v-if="houseFlag==0" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="您将怎样收取费用"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==1" fixed="true" statusBar="true" right-text="保存" @click-right="openPhoto(0)" left-icon="back"
		 @click-left="comeBackList" title="您将怎样收取费用"></uni-nav-bar>
		<uni-nav-bar v-if="houseFlag==2" fixed="true" statusBar="true" left-icon="back" @click-left="comeBackList" title="您将怎样收取费用"></uni-nav-bar>
		<view class="uni-flex uni-column padBot">
			<view class="title">基础价</view>
			<view class="uni-flex uni-row jichu">
				<view class="left">基础价</view>
				<view class="uni-flex uni-row right">
					<view><input type="number" v-model="price" @input="watchNum"  placeholder-style="color:#cdcdcd;" placeholder="请输入价格" /> </view>
					<view>￥</view>
				</view>
			</view>
			<view class="title">价格规则</view>
			<view class="uni-flex uni-column codeWrap">
				<view class="uni-flex uni-row codeList">
					<view class="left">付款方式</view>
					<view class="right">全额预付</view>
				</view>
				<view class="uni-flex uni-row codeList" @tap="openRefundRule">
					<view class="left">退款规则</view>
					<view class="uni-flex uni-row right">
						<view>入住前{{refundRule.refundRuleDay}}天12点前可退</view>
						<view>
							<image :src="imageUrl+'nav_right_icon@2x.png.png'"></image>
						</view>
					</view>
				</view>
				<view class="uni-flex uni-row codeList">
					<view class="left">最少入住天数</view>
					<view class="right uni-flex" style="align-items:center">
						<input type="number" @input="watchDays" style="text-align:right;width:150upx;margin-right:10upx;" v-model="checkInDays"
						 placeholder-style="color:#cdcdcd;" placeholder="请输入天数" />
						<view>天</view>
					</view>
				</view>
			</view>
			<view class="title">押金</view>
			<view class="uni-flex uni-column">
				<view class="uni-flex uni-row codePadding">
					<view class="left">是否收取押金</view>
					<view class=" checkList">
						<radio-group class="uni-flex uni-row" name="gender" @change="radioChange">
							<view class="uni-flex uni-row">
								<radio value="0" :color="radioColor" :checked="checked" style="transform:scale(0.6)" /></label>
								<view class="text">是</view>
							</view>
							<view class="uni-flex uni-row">
								<radio value="1" :color="radioColor" :checked="!checked" style="transform:scale(0.6)" /></label>
								<view class="text">否</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="uni-flex uni-row codePadding border0">
					<view class="left">押金金额</view>
					<view class="right uni-flex" style="align-items:rignt">
						<view>￥</view>
						<input type="number" :class="{'codeInput' :codeInput}" @focus="watch" v-model="depositMoney" placeholder-style="color:#cdcdcd;"
						 :placeholder="placeholder" @input="watch" @blur="blur" />
					</view>
				</view>
			</view>
		</view>
		<view class="bottomWarp">
			<view class="bottom" @tap="openPhoto(1)">下一步</view>
		</view>

	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				token: '',
				price: '',
				checkInDays: '',
				deposit: '0',
				depositMoney: '',
				refundRuleDay: '1',
				refundRulePercentage: '10',
				nextStep: false,
				codeInput: false,
				placeholder: "请输入金额",
				checked: true,
				edit: '',
				houseAllInfo: {},
				valList:{
					refundRuleDay:1,
					refundRulePercentage:10
				},
				num:0,
				imageUrl:'',
				isShow:false,
				radioColor:'#45c298', 
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token')
			this.getHouseAllInfo()
		},
		computed: {
			houseId() {
				return this.$store.state.houseId
			},
			refundRule() {
				return this.$store.state.refundRule
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
									url: '/pages/landlord/resource/photo/photo'
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
					url: '/pages/landlord/resource/claim/claim'
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
							if (this.houseAllInfo.price != null) {
								this.price = this.houseAllInfo.price
							}
							if (this.houseAllInfo.hoouseBaseInfo.refundRuleDay != null&&
							this.houseAllInfo.hoouseBaseInfo.refundRulePercentage != null) {
								this.valList.refundRuleDay = this.houseAllInfo.hoouseBaseInfo.refundRuleDay
								this.valList.refundRulePercentage = this.houseAllInfo.hoouseBaseInfo.refundRulePercentage
								this.$store.commit('changeRefundRule',this.valList)
							}
							if (this.houseAllInfo.hoouseBaseInfo.checkInDays != null) {
								this.checkInDays = this.houseAllInfo.hoouseBaseInfo.checkInDays
							}
							if (this.houseAllInfo.hoouseBaseInfo.deposit != null) {
								this.deposit = this.houseAllInfo.hoouseBaseInfo.deposit
								if (this.deposit == 0) {
									this.checked = true
								} else {
									this.checked = false
								}
							}
							if (this.houseAllInfo.hoouseBaseInfo.depositMoney != null) {
								this.depositMoney = this.houseAllInfo.hoouseBaseInfo.depositMoney
							}
						}
						this.isShow=true
					}
				});
			},
			watchNum(){
				setTimeout(() => { this.price =this.price.replace(/\D/g,'') ; }, 3)
			},
			watchDays(){
				setTimeout(() => { this.checkInDays =this.checkInDays.replace(/\D/g,'') ; }, 3)
			},
			saveHouseType() {
				var expDays=/^[1-9][0-9]*$/;
				if (this.price == '') {
					uni.showToast({
						title: '基础价格不能为空',
						icon: 'none'
					});
				} else if(this.price !== ''&&!expDays.test(this.price)){
					uni.showToast({
						title: '输入金额错误',
						icon: 'none'
					});
				}
				else if (this.refundRule.refundRuleDay == '') {
					uni.showToast({
						title: '退款规则不能为空',
						icon: 'none'
					});
				} else if (this.refundRule.refundRulePercentage == '') {
					uni.showToast({
						title: '退款规则不能为空',
						icon: 'none'
					});
				} else if (this.checkInDays == '') {
					uni.showToast({
						title: '入住天数不能为空',
						icon: 'none'
					});
				} else if(this.checkInDays!=''&&!expDays.test(this.checkInDays)){
					uni.showToast({
						title: '输入入住天数错误',
						icon: 'none'
					});
				}else if(this.deposit=='0'&&this.depositMoney==''){
						uni.showToast({
							title: '您选择了收取押金，所以押金金额不能为空',
							icon: 'none'
						});
				}else if(this.depositMoney!=''&&!expDays.test(this.depositMoney)){
						uni.showToast({
							title: '输入押金错误',
							icon: 'none'
						});
				}else {
					uni.request({
						url: this.getApp.api.landlord.houseInfoSix + '?basePrice=' + this.price,
						method: 'POST',
						data: {
							id: this.houseId,
							checkInDays: this.checkInDays,
							deposit: this.deposit,
							depositMoney: this.depositMoney,
							refundRuleDay: this.refundRule.refundRuleDay,
							refundRulePercentage: this.refundRule.refundRulePercentage
						},
						header: {
							token: this.token
						},
						success: res => {
							// console.log(JSON.stringify(res))
							if (res.data.code == 0) {
								if (this.houseFlag == 0) {
									uni.redirectTo({
										url: '/pages/landlord/resource/photo/photo'
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
			radioChange: function(e) {
				var checked = e.target.value
				this.deposit = checked
				if (this.deposit == 0) {
					this.checked = true
					
				} else {
					this.checked = false
				}
			},
			openRefundRule() {
				uni.navigateTo({
					url: '/pages/landlord/resource/refundRule/refundRule'
				})
			},
			openPhoto(edit) {
				if (this.houseFlag == 0) {
					this.saveHouseType()
				} else if (this.houseFlag == 1) {
					this.edit = edit
					this.saveHouseType()
				} else if (this.houseFlag == 2) {
					uni.redirectTo({
						url: '/pages/landlord/resource/photo/photo'
					})
				}
			},
			watch(e) {
				this.placeholder = "";
				this.codeInput = true;
				setTimeout(() => { this.depositMoney =this.depositMoney.replace(/\D/g,'') ; }, 3)
			},
			blur() {
				// console.log(this.depositMoney.length)
				if (this.depositMoney.length > 0) {
					this.codeInput = true
				}
				if (this.depositMoney.length == 0) {
					this.codeInput = false
				}
				this.placeholder = "请输入金额"
			}


		}

	}
</script>

<style lang="scss" scoped>
	.toll {
		background-color: #ffffff;
		background-color: #f8f8fb;
		width: 100%;
		height: 100vh;
	}
	.toll .title:nth-of-type(1) {
		border-top: 1upx solid #e8e8e8;
	}
	.toll .title {
		width: calc(100% - 30upx);
		color: #3D3D3D;
		font-size: 24upx;
		line-height: 1em;
		padding: 30upx 0 18upx 30upx;
		background-color: #f8f8fb;
	}
	.padBot{
		padding-bottom: 138upx;
	}
	.toll .jichu {
		width: calc(100% - 60upx);
		height: 88upx;
		padding: 0 30upx 0 30upx;
		background-color: #ffffff;
		justify-content: space-between;
	}
	.toll .jichu .left {
		font-size: 24upx;
		color: #656565;
		line-height: 88upx;
	}
	.jichu .right input {
		text-align: right;
		font-size: 24upx;
		width: 160upx;
		margin-top: 17upx;
	}
	.jichu .right view:nth-of-type(2) {
		color: $uni-text-color-green;
		width: 42upx;
		height: 42upx;
		border-radius: 10upx;
		border: 1upx solid #e7e7e7;
		margin: 23upx 0 0 20upx;
		line-height: 42upx;
		text-align: center;
	}
	.toll .codeWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		background-color: #ffffff;
	}
	.toll .codeList {
		width: 100%;
		height: 88upx;
		border-bottom: 1upx solid #e8e8e8;
		justify-content: space-between;
		background-color: #FFFFFF;
	}
	.toll .codeList:nth-of-type(3) {
		border-bottom: 0;
	}
	.toll .codeList .left,
	.codePadding .left {
		font-size: 24upx;
		color: #656565;
		line-height: 88upx;
	}

	.toll .codeList .right,
	.toll .codeList .right view:nth-of-type(1),
	.codePadding .right {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 88upx;
	}

	.codePadding .right view:nth-of-type(1) {
		height: 88upx;
		line-height: 88upx;
	}

	.codePadding .right input {
		max-width: 120upx;
		text-align: right;
		margin-top:17upx;
	}
	.codeInput {
		width: 80upx;
	}

	.toll .codeList .right image {
		width: 32upx;
		height: 32upx;
		margin: 29upx 0 0 8upx;
	}

	.codePadding {
		width: calc(100% - 60upx);
		background-color: #ffffff;
		padding: 0 30upx;
		justify-content: space-between;
		margin-bottom: 16upx;
		border-bottom: 16upx solid #f8f8fb;
	}

	.toll .checkList {
		height: 88upx;
		margin-left: 30upx;
	}

	.toll .checkList .text {
		line-height: 88upx;
		font-size: 24upx;
		color: #3d3d3d;
		margin-left: -10upx;
	}

	.toll .checkList radio {

		margin: 16upx 0 0 30upx;
	}

	.toll .border0 {
		border-bottom: 0;
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
