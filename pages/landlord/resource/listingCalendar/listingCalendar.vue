<template>
	<view v-if="isShow">
		<!-- 需添加日历表及关房 调节浮动价功能 -->
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" title="房源日历" @click-left="back"></uni-nav-bar>
		<view class="listingCal">
			<view class="listing">
				<view class="uni-flex uni-column listTop">
					<view class="uni-flex uni-row">
						<view class="leftImg">
							<image :src="urlImage+houseInfo.house_img"></image>
							<view class="status">{{houseInfo.audit_status==3?'审核通过':houseInfo.audit_status==2?'审核中':houseInfo.audit_status==1?'审核未通过':'未审核'}}</view>
						</view>
						<view class="text">
							<view>{{houseInfo.house_name}}</view>
							<view>舒适{{houseInfo.house_type_bedroom}}居{{houseBedNumber}}床{{houseInfo.fit_number}}人</view>
							<view>基础价￥{{houseInfo.price}}</view>
						</view>
					</view>
					<view class="uni-flex uni-row right" @tap="openWhich">
						<view>基础价</view>
					</view>
				</view>
			</view>
			<view class="calendar">
				<view class="uni-flex uni-row title">
					<view class="uni-flex uni-row item">
						<view class="status1"></view>
						<view class="text">可租</view>
					</view>
					<view class="uni-flex uni-row item">
						<view class="status2"></view>
						<view class="text">已租</view>
					</view>
					<view class="uni-flex uni-row item">
						<view>
							<image class="status3" :src="urlImage+'lock2.png'"></image>
						</view>
						<view class="text">已占用</view>
					</view>
				</view>
				<calendar 
				@change="change" 
				@pickData="parentData" 
				@click-left="leftTab" 
				@click-right="rightTab"
				@changeShow="parentShow"
				left-icon="arrowleft"
				right-icon="arrowright" 
				startDate="2019-06-01" 
				endDate="2019-06-05" 
				daysCount="365" 
				ref="calendar" 
				:isFlag="2"></calendar> 
			</view>
		</view>
		<view class="uni-flex uni-row footer">
			<view class="left" @tap="togglePopup('middle','yes')" v-if="!btnFlag">
				<image :src="urlImage+'lock1.png'"></image>
				<view>关房</view>
			</view>
			<view class="left" @tap="changeHouseCloseStatus(1)" v-if="btnFlag">
				<image class="margin" :src="urlImage+'lock3.png'"></image>
				<view>设为可售</view>
			</view>
			<view class="right" @tap="togglePopup('middle','no')">价格浮动</view>
		</view>
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popupBox" v-if="text=='yes'">
				<view class="popupTop">
					<view>关闭房屋后，该日期内房屋无法出租</view>
				</view>
				<view class="popupBot">
					<view @tap="closeCancel()">取消</view>
					<view @tap="changeHouseCloseStatus(0)">确定</view>
				</view>
			</view>
			<view class="popupBox" v-if="text=='no'">
				<view class="popupTitle">修改已选日期的价格</view>
				<view class="uni-flex uni-row popupSet">
					<view>
						<input type="number" @input="watchNum" v-model="floatPrice" />
					</view>
					<view>CNY</view>
				</view>
				<view class="popupBot">
					<view @tap="floatPriceCancel()">取消</view>
					<view @tap="changeFloatPrice()">保存</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import calendar from '@/components/date-picker/date-picker.vue'
	export default {
		data() {
			return {
				id: '',
				type: '',
				text: '',
				startTime: '',
				endTime: '',
				token: '',
				houseInfo: {},
				urlImage: '',
				floatPrice: '',
				btnFlag: false,
				houseBedNumber:0,
				isShow:false
			}
		},
		components: {
			uniNavBar,
			uniIcon,
			uniPopup,
			calendar
		},
		onLoad() {
			
		},
		onShow() {
			this.token = uni.getStorageSync('token')
			this.urlImage = this.getApp.api.urlImage
			this.houseInfoChangePrice()
		},
		computed: {
			houseId() {
				return this.$store.state.houseId
			}
		},
		methods: {
			houseInfoChangePrice() {
				uni.request({
					url: this.getApp.api.landlord.houseInfoChangePrice,
					method: 'GET',
					data: {
						houseId: this.houseId
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							this.houseInfo = res.data.list[0]
							if (this.houseInfo.house_bed_one != null) {
								this.houseBedNumber += parseInt(this.houseInfo.house_bed_one)
								// console.log(this.houseBedNumber)
							}
							if (this.houseInfo.house_bed_two != null) {
								this.houseBedNumber += parseInt(this.houseInfo.house_bed_two)
							}
							if (this.houseInfo.house_bed_three != null) {
								this.houseBedNumber += parseInt(this.houseInfo.house_bed_three)
							}
							if (this.houseInfo.house_bed_four != null) {
								this.houseBedNumber += parseInt(this.houseInfo.house_bed_four)
							}
							this.isShow = true
						} else {
							uni.showToast({
								title: '获取房屋信息失败'
							});
						}
						this.isShow=true
					}
				});
			},
			watchNum(){
				setTimeout(() => { this.floatPrice =this.floatPrice.replace(/\D/g,'') ; }, 3)
			},
			changeFloatPrice() {
				var exp=/^[1-9][0-9]*$/;
				if(this.floatPrice==''){
					return
				}else if(this.floatPrice!=''&&!exp.test(this.floatPrice)){
						uni.showToast({
							title: '价格输入有误',
							icon:'none'
						});
						return
				} else{
					uni.request({
						url: this.getApp.api.landlord.changeFloatPrice,
						method: 'GET',
						data: {
							houseId: this.houseId,
							floatPrice: this.floatPrice,
							startTime: this.startTime,
							endTime: this.endTime
						},
						header: {
							token: this.token
						},
						success: res => {
							if (res.data.code == 0) {
								this.$refs.calendar.getHouseCalendar()
								this.floatPriceCancel()
							}
						}
					});
				}
			},
			changeHouseCloseStatus(flagClose) {
				uni.request({
					url: this.getApp.api.landlord.changeHouseCloseStatus,
					method: 'GET',
					data: {
						houseId: this.houseId,
						houseClose: flagClose,
						startTime: this.startTime,
						endTime: this.endTime
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							this.$refs.calendar.getHouseCalendar()
							this.closeCancel()
							this.btnFlag = !this.btnFlag
						}
					}
				});
			},
			leftTab() {
				console.log('左')
			},
			rightTab() {
				console.log('右')
			},
			parentData(e,count) {
				if (e.length != 0) {
					this.startTime = e[0].re
					this.endTime = e[1].re
					console.log(this.startTime)
					console.log(this.endTime)
					console.log(count)
				} else {
					this.startTime = ''
					this.endTime = ''
				}
			},
			parentShow(e){
				console.log(e)
			},
			back() {
				uni.navigateBack({})
			},
			openWhich() {
				uni.navigateTo({
					url: '/pages/landlord/resource/listingCalendar/which'
				})
			},
			togglePopup(type, text) {
				this.text = text
				this.type = type
			},
			closeCancel() {
				this.startTime = ''
				this.endTime = ''
				this.type = ''
			},
			floatPriceCancel() {
				this.closeCancel()
				this.floatPrice = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}

	.listingCal {
		width: 100%;
		/* height: calc(100vh - 145upx); */
		background-color: #f8f7fd;
	}

	.listing {
		width: calc(100% - 60upx);
		padding: 16upx 30upx 16upx 30upx;
	}

	.listTop {
		padding: 0 30upx;
		height: 256upx;
		background-color: #FFFFFF;
		border: 1upx solid #F2F2F5;
		justify-content: flex-start;
		border-radius: 15upx;
		box-shadow: 0 0 2px 3px #F2F2F5;
	}

	.leftImg {
		margin: 20upx 20upx 10upx 0;
		position: relative;
	}

	.leftImg view:nth-of-type(1) {
		width: 145upx;
		height: 45upx;
		border-radius: 0 0 15upx 15upx;
		position: absolute;
		top: 100upx;
		color: #fd7a0e;
		text-align: center;
		line-height: 45upx;
		font-size: 22upx;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.leftImg image {
		width: 145upx;
		height: 145upx;
		border-radius: 15upx;
		vertical-align: top;
	}

	.listTop .text view:nth-of-type(1) {
		font-size: 28upx;
		font-weight: bold;
		color: #353535;
		margin: 30upx 0 0 0;
		height: 30upx;
	}

	.listTop .text view:nth-of-type(2) {
		font-size: 22upx;
		color: #888888;
		margin: 20upx 0 0 0;
		height: 22upx;
	}

	.listTop .text view:nth-of-type(3) {
		font-size: 22upx;
		color: #888888;
		margin: 20upx 0 0 0;
		height: 22upx;
	}

	.listing .right {
		width: 100%;
		justify-content: flex-end;
	}

	.listing .right view {
		width: 145upx;
		height: 56upx;
		color: #FFFFFF;
		font-size: 26upx;
		background-color: $uni-text-color-green;
		border-radius: 15upx;
		line-height: 56upx;
		text-align: center;
	}

	.calendar {
		width: 100%;
		/* height: calc(100vh - 530upx); */
	}

	.calendar .title {
		padding-left: 42upx;
		width: calc(100% - 42upx);
		height: 52upx;
		/* border-bottom: 1upx solid #f0f0f0; */
		justify-content: flex-start;
		background: #fff;
		align-items: center;
	}

	.calendar .status {
		margin-top: 19upx;
	}

	.calendar .status view:nth-of-type(2) {
		font-size: 22upx;
		color: #7d7d7d;
		padding: 0 30upx 0 7upx;
	}
	.calendar .item{
		margin-right:25upx;
	}
	.calendar .item:nth-child(3) .text{
		position:relative;
		top:2upx;
	}
	.calendar .text{
		font-size:22upx;
		color:#7d7d7d;
		margin-left:8upx;
	}
	.calendar .status1 {
		width: 16upx;
		height: 16upx;
		border: 1upx solid #e6e6e6;
		position:relative;
		top:2upx;
	}

	.calendar .status2 {
		width: 16upx;
		height: 16upx;
		background-color: $uni-text-color-green;
		border: 1upx solid $uni-text-color-green;
		position:relative;
		top:3upx;
	}

	.calendar .status3 {
		width: 20upx;
		height: 20upx;
		/* vertical-align: top; */
	}

	.footer {
		justify-content: space-between;
		width: 100%;
		height: 88upx;
		position: fixed;
		bottom: 0;
		border-top: 1upx solid #eeeeee;
		background: #fff;
	}

	.footer .left {
		margin: 22upx 0 0 60upx;
	}

	.footer .left view {
		font-size: 18upx;
		color: #313131;
		padding-top: 6upx;
	}

	.footer .left image {
		width: 34upx;
		height: 34upx;
	}

	.footer .margin {
		margin-left: 16upx;
	}

	.footer .right {
		margin: 22upx 60upx 0 0;
		height: 55upx;
		width: 140upx;
		line-height: 55upx;
		color: #ffffff;
		font-size: 26upx;
		text-align: center;
		border-radius: 15upx;
		background:$uni-color-level-gradual;
	}

	.popupBox {
		width: 480upx;
		height: 275upx;
		background: #f2f2f2;
		border-radius: 15upx;
	}

	.popupTop {
		text-align: center;
		font-size: 26upx;
		color: #333333;
		font-weight: bold;
		padding: 66upx 80upx 40upx 80upx;
	}

	.popupTop view {
		line-height: 45upx;
	}

	.popupBot {
		border-top: 1upx solid #e4e4e4;
	}

	.popupBot view {
		display: inline-block;
	}

	.popupBot view:nth-of-type(1),
	.popupBot view:nth-of-type(2) {
		width: 49%;
		height: 76upx;
		font-size: 24upx;
		font-weight: bold;
		color: #1076e5;
		text-align: center;
		line-height: 76upx;
	}

	.popupBot view:nth-of-type(1) {
		border-right: 1upx solid #e4e4e4;
	}

	.popupBox1 {
		width: 480upx;
		height: 275upx;
		background: #f2f2f2;
		border-radius: 15upx;
	}

	.popupTitle {
		text-align: center;
		font-size: 26upx;
		color: #333333;
		font-weight: bold;
		margin: 43upx 0 38upx 0;
	}

	
	.popupSet {
		width: 420upx;
		margin: 0 30upx;
		height: 42upx;
		border: 1upx solid #e3e3e3;
		margin-bottom: 18upx;
		background: #fff;
		height: 68upx;
		justify-content: flex-end;
	}
	
	.popupSet view {
		display: inline-block;
		
	}
	
	.popupSet input {
		padding-left: 20upx;
		width: 310upx;
		text-align: left;
		height: 42upx;
		line-height: 42upx;
		padding-top: 11upx;
		text-align: right;
	}
	
	.popupSet view:nth-of-type(2) {
		height:68upx;
		padding-right: 20upx;
		text-align: right;
		line-height: 68upx;
		
	}
</style>
