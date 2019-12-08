<template>
	<view class="claim" v-if=isShow>
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="您对房客有哪些要求" right-text="保存" @click-right="save"></uni-nav-bar>
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-column claimList">
				<view class="title">入离时间</view>
				<view class="listWrap">
					<view class="uni-flex uni-row list border">
						<view class="left">房客入住</view>
						<view class=" uni-flex uni-row right" @click="showSinglePicker(0)">
							<view>{{checkInTime}}后</view>
							<view>
								<image :src="urlImg+'my_left_icon.png'" mode=""></image>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row list">
						<view class="left">房客离店</view>
						<view class="uni-flex uni-row right" @click="showSinglePicker(1)">
							<view>{{checkOutTime}}前</view>
							<view>
								<image :src="urlImg+'my_left_icon.png'" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column claimList">
				<view class="title">接待时间</view>
				<view class="listWrap">
					<view class="uni-flex uni-row list">
						<view class="left uni-flex reception">
							<view class="input-time" @tap="showSinglePicker(2)">{{morning!=''?morning:'请选择时间'}}-</view>
							<view class="input-time" @tap="showSinglePicker(3)">{{night!=''?night:'请选择时间'}}</view>
						</view>
						<!-- 						<view class="right">
							<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_del.png"></image>
						</view> -->
					</view>
					<!-- <view class="uni-flex uni-row addTime">
						<image src="http://113.200.212.12/ymshapi/api/location/nav_add_ac.png"></image>
						<view>添加新时间短</view>
					</view> -->
				</view>
			</view>
			<view class="uni-flex uni-column claimList">
				<view class="title">房屋清洁</view>
				<view class="listWrap">
					<view class="uni-flex uni-row list border">
						<view class="left">多久提供打扫卫生</view>
						<view class="  uni-flex uni-row right" @click="showClearPicker(4)">
							<view>{{cleanTime.label}}</view>
							<view>
								<image :src="urlImg+'my_left_icon.png'"></image>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row list">
						<view class="left">多久提供被单更换</view>
						<view class="  uni-flex uni-row right" @click="showClearPicker(5)">
							<view>{{sheetsTime.label}}</view>
							<view>
								<image :src="urlImg+'my_left_icon.png'"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="uni-flex uni-column claimList">
				<view class="title">其他信息</view>
				<view class="listWrap">
					<view class="uni-flex uni-row list border" @tap="openCode">
						<view class="left">房客守则</view>
						<view class="right">
							<text>{{tenantCodeRules}}</text>
							<image src="http://113.200.212.12/ymshapi/api/location/my_left_icon.png" mode=""></image>   
						</view>
					</view>
					<view class="uni-flex uni-row list" @tap="openOther">
						<view class="left">其他守则</view>
						<view class="right">
							<text>{{otherRules}}</text>
							<image src="http://113.200.212.12/ymshapi/api/location/my_left_icon.png" mode=""></image>
						</view>
					</view>
				</view>			
			</view> -->
		</view>

		<!-- 		<uni-popup :show="type === 'bottom'" position="bottom" mode="fixed" @hidePopup="togglePopup('')">
			<view class="uni-flex uni-column paddingWrap">
				<view class="uni-flex uni-row popListTitle">
					<view @tap="togglePopup('')">取消</view>
					<view>{{title}}</view>
					<view @tap="togglePopup('')">确定</view>
				</view>
				<view class="uni-flex uni-column timeWrap">
					<view class="timeList">12:00</view>
					<view class="timeList">13:00</view>
					<view class="timeList">14:00</view>
					<view class="timeList">15:00</view>
					<view class="timeList">16:00</view>
					<view class="timeList">17:00</view>
				</view>
			</view>

		</uni-popup> -->

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :titleText="title" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			// uniPopup,
			mpvuePicker,
			uniNavBar
		},
		data() {
			return {
				token: '',
				title: '',
				current: 0,
				type: '',
				pickerSingleArray: [{
						label: '12:00',
						value: 12
					},
					{
						label: '13:00',
						value: 13
					},
					{
						label: '14:00',
						value: 14
					},
					{
						label: '15:00',
						value: 15
					},
					{
						label: '17:00',
						value: 17
					},
					{
						label: '18:00',
						value: 18
					},
					{
						label: '19:00',
						value: 19
					},
					{
						label: '20:00',
						value: 20
					},
					{
						label: '21:00',
						value: 21
					},
					{
						label: '22:00',
						value: 22
					},
					{
						label: '23:00',
						value: 23
					},
					{
						label: '00:00',
						value: 0
					},
					{
						label: '01:00',
						value: 1
					},
					{
						label: '02:00',
						value: 2
					},
					{
						label: '03:00',
						value: 3
					},
					{
						label: '04:00',
						value: 4
					},
					{
						label: '05:00',
						value: 5
					},
					{
						label: '06:00',
						value: 6
					},
					{
						label: '07:00',
						value: 7
					},
					{
						label: '08:00',
						value: 8
					},
					{
						label: '09:00',
						value: 9
					},
					{
						label: '10:00',
						value: 10
					},
					{
						label: '11:00',
						value: 11
					},
				],
				themeColor: '#45c298',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				houseId: '29',
				checkInTime: '14:00',
				checkOutTime: '12:00',
				receptionTime: '',
				tenantCodeRules: '',
				otherRules: '',
				morning: '',
				night: '',
				cleanTime: {
					label: '一客一扫',
					value: '0'
				},
				sheetsTime: {
					label: '一客一换',
					value: '0'
				},
				cleanTimeList: [],
				sheetsTimeList: [],
				nextStep: false,
				urlImg: '',
				isShow:false
			};
		},
		onLoad(e) {
			// this.tenantCodeRules = e.tenantCodeRules
			this.urlImg = this.getApp.api.urlImage
			this.houseId = uni.getStorageSync('houseId');
			this.token = uni.getStorageSync('token');
			this.getclearList()
		},
		methods: {
			comeBack(){
				uni.navigateBack({})
			},
			save(){
				uni.redirectTo({
					url:'/pages/landlord/resource/guide/guide'
				})
			},
			togglePopup(type) {
				this.type = type;
			},
			showSinglePicker(val) {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				this.current = val
				if (val == 0) {
					this.title = '房客入住时间'
				} else if (val == 1) {
					this.title = '房客离店时间'
				} else if (val == 2) {
					this.title = '接待时间'
				} else if (val == 3) {
					this.title = '接待时间'
				}
			},
			showClearPicker(val) {
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				this.current = val
				if (val == 4) {
					this.pickerValueArray = this.cleanTimeList
					this.title = '打扫卫生'
				} else if (val == 5) {
					this.pickerValueArray = this.sheetsTimeList
					this.title = '床单更换'
				}
			},
			onConfirm(e) {
				if (this.current == 0) {
					this.checkInTime = e.label
				} else if (this.current == 1) {
					this.checkOutTime = e.label
				} else if (this.current == 2) {
					this.morning = e.label
				} else if (this.current == 3) {
					this.night = e.label
				} else if (this.current == 4) {
					this.cleanTime.label = e.label
					this.cleanTime.value = e.value.join('')
					console.log(this.cleanTime.value)
				} else if (this.current == 5) {
					this.sheetsTime.label = e.label
					this.sheetsTime.value = e.value.join('')
					console.log(this.sheetsTime.value)
				}
			},
			onCancel(e) {
				console.log(e)
			},
			getclearList() {
				uni.request({
					url: this.getApp.api.landlord.clearList,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(JSON.stringify(res))
						let cleanList = res.data.cleanTimeAndSheetsTimeList.cleanTime
						let sheetsList = res.data.cleanTimeAndSheetsTimeList.sheetsTime
						for (let i in cleanList) {
							this.cleanTimeList.push({
								'label': cleanList[i].value,
								'value': cleanList[i].code
							})
						}
						for (let i in sheetsList) {
							this.sheetsTimeList.push({
								'label': sheetsList[i].value,
								'value': sheetsList[i].code
							})
						}
						this.isShow=true
					}
				});
			},
			
			openCode() {
				uni.redirectTo({
					url: '/pages/landlord/resource/code/code'
				})
			},
			openOther() {
				uni.navigateTo({
					url: '/pages/landlord/resource/other/other'
				})
			}
		}
	};
</script>

<style scoped>
	view {
		line-height: 1em;
	}

	.reception {
		align-items: center;
	}

	.claim {
		width: 100%;
		height: calc(100vh - 88upx);
		background-color: #ffffff;
	}

	.claimList {
		width: 100%;
		background-color: #ffffff;
		border-bottom: 1upx solid #e8e8e8;

	}

	.claimList .title {
		width: calc(100%-30upx);
		padding-left: 30upx;
		height: 72upx;
		line-height: 72upx;
		/* padding-top: 30upx; */
		background-color: #f8f8fb;
	}

	.listWrap {
		width: calc(100% - 60upx);
		padding: 0 15upx 0 30upx;
		background-color: #ffffff;
	}

	.border {
		border-bottom: 1upx solid #e8e8e8;
	}

	.claimList .list {
		width: 100%;
		height: 88upx;
		justify-content: space-between;
	}

	.claimList .list .left {
		height: 88upx;
		line-height: 88upx;
		font-size: 24upx;
		color: #656565;
	}

	.claimList .list .right view:nth-child(1) {
		height: 88upx;
		line-height: 88upx;
		font-size: 24upx;
		color: #3e3e3e;
	}

	.claimList .right image {
		width: 30upx;
		height: 30upx;
		margin-left: 6upx;
		margin-top: 29upx
	}

	.claimList .addTime {}

	.claimList .addTime image {
		width: 30upx;
		height: 30upx;
		margin-top: 29upx;
		margin-right: 20upx;
	}

	.claimList .addTime view {
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 88upx;
	}

	.button {
		margin-left: 24upx;
		margin-right: 24upx;
		margin-bottom: 30upx;
		width: calc(100% - 48upx);
		height: 88upx;
		line-height: 88upx;
		font-size: 26upx;
		text-align: center;
		border-radius: 15upx;
		color: #ffffff;
		background: linear-gradient(to right, rgb(68, 207, 205), rgb(61, 207, 148));
		position: fixed;
		bottom: 0;
		z-index: 5;

	}

	.popListTitle {
		padding: 0 40upx 0 40upx;
		width: calc(100% - 80upx);
		background-color: #ffffff;
		border-bottom: 1upx solid #f8f8f8;
		height: 106upx;
		/* justify-content: space-between; */
	}

	.popListTitle view:nth-child(1) {
		line-height: 106upx;
		font-size: 22upx;
		color: #6d6d6d;
		width: 50upx;
	}

	.popListTitle view:nth-child(3) {
		line-height: 106upx;
		font-size: 22upx;
		color: #45C298;
		width: 50upx;
	}

	.popListTitle view:nth-child(2) {
		line-height: 106upx;
		font-size: 24upx;
		color: #3a3a3a;
		flex: 1;
	}

	.timeList {
		text-align: center;
		width: 100%;
		height: 82upx;
		line-height: 82upx;
		font-size: 22upx;
	}

	.timeWrap {
		width: 100%;
		height: 330upx;
		overflow-y: auto;
		padding: 30upx 0;
		border-bottom: 1upx solid #007AFF;
	}
</style>
