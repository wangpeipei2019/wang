<template>
	<view class="container" v-if="isShow">
		<view class="uni-flex confirm-trip border-bottom">
			<view class="uni-flex uni-column uni-flex-item">
				<view class="time-day">入住时间</view>
				<view class="date">{{ startTime }}</view>
				<view class="time-day">{{ checkInTime }}</view>
			</view>
			<view class="uni-flex uni-column uni-flex-item-time">
				<view :style="{backgroundImage:'url('+urlImage+'nav_bground.png)'}" class="night">{{checkInCount}}晚</view>
			</view>
			<view class="uni-flex uni-column uni-flex-item">
				<view class="time-day">离开时间</view>
				<view class="date">{{ endTime }}</view>
				<view class="time-day">{{ checkOutTime }}</view>
			</view>
		</view>
		<view class="uni-common-mt border-bottom">
			<view class="uni-form-item uni-flex">
				<view class="title">预订套餐</view>
				<!-- <uni-number-box :min="1">
					<view class="unit">套</view>
				</uni-number-box> -->
				<view class="confirmNum">1套</view>
			</view>
			<view class="uni-form-item uni-flex">
				<view class="title">入住人数</view>
				<!-- <uni-number-box :value="checkIn.length" @change="change" :min="0" :max="0"> -->
				<view class="confirmNum">{{checkIn.length!=0?checkIn.length+'人':'0人'}}</view>
				<!-- <text>人</text> -->
				<!-- </uni-number-box> -->
			</view>
			<view class="uni-form-item uni-flex">
				<view class="title">联系人手机号</view>
				<input class="uni-input" type="number" @input="watchPhone" maxlength="11" v-model="phone" placeholder="请输入联系人手机号" placeholder-style="color:#bbb" />
			</view>
			<view class="uni-form-item uni-flex borderNo">
				<view class="title">联系人</view>
				<input class="uni-input" type="text" v-model="name" maxlength="12" placeholder="填写真实姓名" placeholder-style="color:#bbb" />
			</view>
		</view>
		<view class="uni-common-mt border-bottom add-container">
			<view class="title uni-flex">
				<text>添加入住人</text>
				<!-- <image class="img" src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png" mode="widthFix"></image> -->
			</view>
			<view class="uni-flex add-list">
				<view class="normal-item add-item" v-for="item in checkIn" :key="item.id">{{ item.name }}</view>
				<view class="normal-item add-item" @tap="openCheckList">+&nbsp;添加</view>
			</view>
			<view class="uni-flex uni-row friendList" v-for="item in checkIn" :key="item.id">
				<view class="left" @tap="delPeople(item.id)">
					<image :src="urlImage+'nav_cut_hover.png'"></image>
				</view>
				<view class="right">
					<view>{{ item.name }}</view>
					<view>身份证号: {{ item.card }}</view>
				</view>
			</view>
		</view>
		<view class="code">
			<view>房东规定</view>
			<view>6月12日12点前取消订单，房费可全额退还；</view>
			<view>6月12日12点后取消订单，扣除未住房费的50%作为违约金支付给房东。</view>
		</view>
		<view class="footer uni-flex">
			<view class="payment">
				<text>线上支付：</text>
				<text class="money">￥{{orderTotalMoney}}</text>
			</view>
			<view class="uni-flex right">
				<!-- <view class="detailed" :class="{'active':current}" @tap="current=!current">明细</view> -->
				<view class="detailed" @tap="openPayment">明细</view>
				<button type="primary" class="submitBtn" @tap="commitOrder">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				id: '',
				type: '',
				current: false,
				startTime: '',
				endTime: '',
				getStartTime: '',
				getEndTime: '',
				numberValue: '1',
				phone: '',
				name: '',
				orderTotalMoney: '',
				checkInCount: '',
				activeID: '',
				onlinePayment: '',
				houseRent: '',
				deposit: '',
				token: '',
				orderNumber: '',
				friendIdStr: '',
				resetCheckIn: [],
				checkInTime: '',
				checkOutTime: '',
				urlImage:'',
				isShow:false,
				deduction:''
			};
		},
		components: {
			uniNumberBox,
			uniPopup
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.id = e.id;
			// console.log(this.id)
			this.getStartTime = e.startTime;
			this.getEndTime = e.endTime;
			this.checkInTime = e.checkInTime
			this.checkOutTime = e.checkOutTime
			this.count()
			this.addFriend()
		},
		computed: {
			checkIn: function() {
				return this.$store.state.checkIn
			}
		},
		methods: {
			getInfo() {
				uni.request({
					url: this.getApp.api.tenant.orderPriceDetail,
					method: 'GET',
					data: {
						houseId: this.id,
						startTime: this.startTime,
						endTime: this.endTime,
					},
					header: {
						token: this.token
					},
					success: res => {
						this.onlinePayment = res.data.orderPrice.onlinePayment
						this.houseRent = res.data.orderPrice.houseRent
						this.deposit = res.data.orderPrice.deposit
						this.orderTotalMoney = res.data.orderPrice.onlinePayment
						this.isShow=true
					}
				});
			},
			change(value) {
				this.numberValue = value
				// console.log(this.numberValue)
			},
			openCheckList() {
				uni.navigateTo({
					url: '/pages/tenant/order/check-in/check-list'
				});
			},
			openPayment() {
				uni.navigateTo({
					url: '/pages/tenant/order/confirm-order/payment?onlinePayment=' + this.onlinePayment + '&checkInCount=' + this.checkInCount +
						'&houseRent=' + this.houseRent + '&deposit=' + this.deposit,
				});
			},
			addFriend() {
				this.$store.commit('addFriend', this.resetCheckIn);
			},
			watchPhone(){
				setTimeout(() => { this.phone =this.phone.replace(/\D/g,'') ; }, 3)
			},
			commitOrder() {
				var reg=/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
				var regName = /^[\u4e00-\u9fa5]+$/; 
				if (this.checkIn.length == 0) {
					uni.showToast({
						title: '入住人不能为空',
						icon: 'none'
					});
					return
				}if (this.phone == '') {
					uni.showToast({
						title: '联系人手机号不能为空',
						icon: 'none'
					});
					return
				}if(this.phone!=''){
					if(!reg.test(this.phone)){
						uni.showToast({
							title: '手机号格不正确',
							icon: 'none'
						});
						return
					}
				}if (this.name == '') {
					uni.showToast({
						title: '联系人不能为空',
						icon: 'none'
					});
					return
				}if(this.name!=''){
					if(!regName.test(this.name)){
						uni.showToast({
							title: '联系人格不正确',
							icon: 'none'
						});
						return
					}else{
						let idStr = ''
						let idArr = []
						for (let i in this.checkIn) {
							idArr.push(this.checkIn[i].id)
						}
						idStr = idArr.join(',')
						uni.request({
							url: this.getApp.api.tenant.commit,
							method: 'POST',
							data: {
								houseId: this.id,
								startTime: this.startTime,
								endTime: this.endTime,
								orderName: this.name,
								orderPhone: this.phone,
								checkInCount: this.checkInCount,
								orderTotalMoney: this.orderTotalMoney,
								deposit: this.deposit,
								friendId: idStr,
								friendNumber: this.checkIn.length
							},
							header: {
								token: this.token
							},
							success: res => {
								if (res.data.code == 0) {
									this.addFriend()
									this.orderNumber = res.data.orderNumber;
									uni.navigateTo({
										url: '/pages/tenant/order/order_pay/order_pay?orderTotalMoney=' + this.orderTotalMoney + '&orderNumber=' +
											this.orderNumber
									});
								} else {
									uni.showToast({
										title: '您预订的木屋在此时间段已出租',
										icon: 'none',
										duration: 2000
									});
								}
							}
						});
					}
				} 
			},
			count() {
				// 请求入住时间+离店时间+住几晚
				uni.request({
					url: this.getApp.api.tenant.submitData,
					method: 'POST',
					data: {
						startTime: this.getStartTime,
						endTime: this.getEndTime
					},
					header: {
						token: this.token
					},
					success: res => {
						 console.log("入离时间")
						this.checkInCount = res.data.houseOrderInfo.checkInCount
						this.startTime = res.data.houseOrderInfo.startTime
						this.endTime = res.data.houseOrderInfo.endTime
						this.getInfo()
					}
				});
			},
			delPeople(id) {
				let checkInDel = this.checkIn
				for (let i in checkInDel) {
					if (checkInDel[i].id == id) {
						checkInDel.splice(i, 1)
						this.$store.commit('addFriend', checkInDel)
					}
				}
				// uni.showToast({
				// 	title: '该功能正在开发中',
				// 	icon:'none'
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}

	.container {
		width: 100%;
		height: 100vh;
		background-color: #fbfbfb;
	}
	.confirm-trip {
		height: 190upx;
		padding: 0 60upx 10upx 60upx;
		margin-bottom: 18upx;
		background-color: #ffffff;
		//background: #666;

		.uni-flex-item-time {
			width: 140upx;
			text-align: center;

			.night {
			//	background-image: url("http://113.200.212.12/ymshapi/api/location/nav_bground.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: 98upx;
				height: 40upx;
				line-height: 40upx;
				font-size: 22upx;
				text-align: center;
				margin: 74upx auto 0 auto;
			}
		}

		.uni-flex-item {
			align-items: center;
			justify-content: center;

			.time-day {
				font-size: 22upx;
				color: #666;
			}

			.date {
				font-size: 36upx;
				color: #000;
				font-weight: bold;
				margin: 24upx 0;
			}

		}
	}

	.uni-common-mt {
		padding: 0 30upx;
		margin: 0;
		background-color: #ffffff;
		margin-bottom: 12upx;

		.uni-form-item {
			justify-content: space-between;
			align-items: center;
			padding: 0;
			height: 88upx;
			border-bottom: 1px solid #ededed;

			.title {
				padding: 0;
				font-size: 28upx;
				color: #333;
			}

			.uni-input {
				padding: 0 0 0 100upx;
				text-align: right;
				color: #333;
			}

			.unit {
				line-height: 37upx;
				width: 28upx;
				padding-right: 30upx;
				color: #333;
			}

			.confirmNum {
				word-spacing: 20upx;
				padding-right: 80upx;
			}


		}

		.borderNo {
			border-bottom: 0;
		}
	}

	.add-container {
		/* border-bottom: 300upx solid #fcfcfc; */
		box-sizing: border-box;
		padding-bottom: 35upx;

		.title {
			padding: 40upx 0 0 0;
			justify-content: space-between;
			align-items: center;

			.img {
				width: 24upx;
				height: 24upx;
			}
		}

		.add-list {
			flex-wrap: wrap;

			.normal-item {
				width: 155upx;
				height: 56upx;
				line-height: 56upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0 10upx;
				box-sizing: border-box;
				margin: 40upx 18upx 0 0;
				border: 1px solid #c5c5c5;
				border-radius: 8upx;
				color: #333;
				text-align: center;
				// display: flex;
				// justify-content: center;
				// align-items: center;

				&:nth-child(4n) {
					margin-right: 0;
				}

				&.add-item {
					border-color: $uni-text-color-green;
					color: $uni-text-color-green;
				}
			}
		}
	}

	.friendList {
		width: 100%;
		/* height: 200upx; */
		padding: 25upx 0 0 0;
	}

	.friendList .left image {
		width: 40upx;
		height: 40upx;
		margin: 25upx 20upx 0 0;
	}

	.friendList .right view:nth-of-type(1) {
		font-size: 26upx;
		line-height: 50upx;
	}

	.friendList .right view:nth-of-type(2) {
		font-size: 26upx;
		line-height: 30upx
	}
	.code{
		/* height: 112upx; */
		padding: 30upx 30upx 28upx 30upx;
		background-color: #ffffff;
		margin-bottom: 136upx;
		
		}
	.code view:nth-of-type(1){
		/* font-size: 28upx; */
		color: #333;
		padding: 0 0 25upx 0; 
	}	
	.code view:nth-of-type(2), .code view:nth-of-type(3){
		font-size: 22upx;
		color: #333;
		padding:  0 0 10upx 0;
	}
	.footer {
		height: 106upx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		z-index: 999;

		.payment {
			padding-left: 30upx;
			color: #3f3f3f;
			font-size: 30upx;

			.money {
				font-weight: bold;
			}
		}

		.right {
			align-items: center;

			.submitBtn {
				background: $uni-color-level-gradual;
				width: 280upx;
				height: 106upx;
				line-height: 106upx;
				border-radius: 0;
				color: #fff;
				font-size: 26upx;
				font-weight: bold;

				&:after {
					border-color: $uni-text-color-green;
				}
			}

			.detailed {
				width: 90upx;
				height: 30upx;
				margin-right: 26upx;
				font-size: 22upx;
				color: #333;

				&:after {
					content: '';
					background-image: url("http://113.200.212.12/ymshapi/api/location/nav_down_icon@2x.png");
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 24upx;
					height: 24upx;
					display: inline-block;
					position: relative;
					top: 6upx;
					left: 8upx;
				}

				&.active {
					color: $uni-text-color-green;
				}

				&.active:after {
					background-image: url("http://113.200.212.12/ymshapi/api/location/btn_down2.png");
				}
			}
		}
	}
</style>
