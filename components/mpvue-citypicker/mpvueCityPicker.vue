<template>
	<div class="mpvue-picker">
		<div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
		<div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<div class="mpvue-picker__hd" catchtouchmove="true">
				<div class="mpvue-picker__action" @click="pickerCancel">取消</div>
				<div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
			</div>
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
				<block>
					<!-- /*@click="getCities(item.provinceid)"@click="getAreas(item.cityid)"*/ -->
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.province}}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in cityDataList" :key="index">{{item.city}}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in areaDataList" :key="index">{{item.area}}</div>
					</picker-view-column>
				</block>
			</picker-view>
		</div>
	</div>
</template>

<script>
	// import provinceData from './city-data/province.js';
	// import cityData from './city-data/city.js';
	// import areaData from './city-data/area.js';
	export default {
		data() {
			return {
				pickerValue: [0, 0, 0],
				// provinceDataList: provinceData,
				// cityDataList: cityData[0],
				// areaDataList: areaData[0][0],
				provinceDataList: [],
				cityDataList: [],
				areaDataList: [],
				provinceid: '110000',
				cityid: '110100',
				/* 是否显示控件 */
				showPicker: false,
			};
		},
		created() {
			// this.init()
			this.getProvinces()
		},
		props: {
			/* 默认值 */
			pickerValueDefault: {
				type: Array,
				default () {
					return [0, 0, 0]
				}
			},
			/* 主题色 */
			themeColor: String
		},
		watch: {
			// pickerValueDefault() {
			// 	this.init();
			// }
		},
		methods: {
			// 			init() {
			// 				this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
			// 
			// 				const pickerValueDefault = this.pickerValueDefault
			// 
			// 				this.cityDataList = cityData[pickerValueDefault[0]];
			// 				this.areaDataList = areaData[pickerValueDefault[0]][pickerValueDefault[1]];
			// 				this.pickerValue = pickerValueDefault;
			// 			},
			getProvinces() {
				uni.request({
					url: this.getApp.api.landlord.getProvinces,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(JSON.stringify(res))
						this.provinceDataList = res.data.provincesList
						if (res.data.code == 0) {
							this.getCities(this.provinceDataList[0].provinceid)
						}
					}
				});
			},
			getCities(id) {
				uni.request({
					url: this.getApp.api.landlord.getCities,
					method: 'GET',
					data: {
						provinceId: id
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.cityDataList = res.data.citiesList
						if (res.data.code == 0) {
							this.getAreas(this.cityDataList[0].cityid)
						}
					}
				});
			},
			getAreas(id) {
				uni.request({
					url: this.getApp.api.landlord.getAreas,
					method: 'GET',
					data: {
						cityId: id
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.areaDataList = res.data.areasList
						// console.log(JSON.stringify(this.areaDataList))
					}
				});
			},
			show() {
				setTimeout(() => {
					this.showPicker = true;
				}, 0);
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerCancel() {
				this.showPicker = false;
				this._$emit('onCancel');
			},
			pickerConfirm(e) {
				this.showPicker = false;
				this._$emit('onConfirm');
			},
			showPickerView() {
				this.showPicker = true;
			},
			// 			handPickValueDefault() {
			// 				const pickerValueDefault = this.pickerValueDefault
			// 
			// 				let provinceIndex = pickerValueDefault[0]
			// 				let cityIndex = pickerValueDefault[1]
			// 				const areaIndex = pickerValueDefault[2]
			// 				if (
			// 					provinceIndex !== 0 ||
			// 					cityIndex !== 0 ||
			// 					areaIndex !== 0
			// 				) {
			// 					if (provinceIndex > provinceData.length - 1) {
			// 						this.pickerValueDefault[0] = provinceIndex = provinceData.length - 1;
			// 					}
			// 					if (cityIndex > cityData[provinceIndex].length - 1) {
			// 						this.pickerValueDefault[1] = cityIndex = cityData[provinceIndex].length - 1;
			// 					}
			// 					if (areaIndex > areaData[provinceIndex][cityIndex].length - 1) {
			// 						this.pickerValueDefault[2] = areaData[provinceIndex][cityIndex].length - 1;
			// 					}
			// 				}
			// 			},
			pickerChange(e) {
				// let changePickerValue = e.mp.detail.value
				// let provinceid = this.provinceDataList[this.pickerValue[0]].provinceid
				// let cityid = this.cityDataList[this.pickerValue[1]].cityid
				// console.log('省:'+provinceid)
				// console.log('市:'+cityid)
				// if(provinceid!=undefined){
				// 	this.getCities(provinceid)
				// }
				// if(cityid!=undefined){
				// 	this.getAreas(cityid)
				// }
				// this.getCities(provinceid)
				// this.getAreas(cityid)

				let changePickerValue = e.mp.detail.value;
				if (this.pickerValue[0] !== changePickerValue[0]) {
					// 第一级发生滚动
					let provinceid = this.provinceDataList[changePickerValue[0]].provinceid;
					this.getCities(provinceid)
					// console.log(provinceid)
					// this.areaDataList = this.areaDataList[changePickerValue[0]][0];
					changePickerValue[1] = 0;
					changePickerValue[2] = 0;
				} else if (this.pickerValue[1] !== changePickerValue[1]) {
					// 第二级滚动
					let cityid = this.cityDataList[changePickerValue[1]].cityid
					this.getAreas(cityid)
				}
				this.pickerValue = changePickerValue;
				this._$emit('onChange');
			},
			_$emit(emitName) {
				let pickObj = {
					province: this._getProvinceLabel(),
					city: this._getCityLabel(),
					area: this._getAreaLabel(),
					value: this.pickerValue,
					provinceCode: this._getProvinceCode(),
					cityCode: this._getCityCode(),
					areaCode: this._getAreaCode()
				};
				this.$emit(emitName, pickObj);
			},
			_getProvinceLabel() {
				return this.provinceDataList[this.pickerValue[0]].province
			},
			_getCityLabel() {
				return this.cityDataList[this.pickerValue[1]].city
			},
			_getAreaLabel() {
				return this.areaDataList[this.pickerValue[2]].area;
			},
			_getProvinceCode() {
				return this.provinceDataList[this.pickerValue[0]].provinceid
			},
			_getCityCode() {
				return this.cityDataList[this.pickerValue[1]].cityid
			},
			_getAreaCode() {
				return this.areaDataList[this.pickerValue[2]].areaid
			},

		}
	};
</script>

<style>
	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 17px;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 40px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 238px;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
