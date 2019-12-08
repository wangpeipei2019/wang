<template>
	<view class="container">
		<view class="head-tab uni-flex" v-if="isListShow==0">
			<view class="item" :class="{active:index==iscurrent}" @tap="tab(index)" v-for="(item,index) in tablist" :key="index">
				<text>{{ item.text }}</text>
			</view>
		</view>
		<!-- :animation="animationData" -->
		<view class="calendar-layer" :class="isShow?'show':'hide'">
			<!-- 遮罩层 -->
			<view class="layer-white-space" @tap="hideCalendar(false)"></view>
			<view class="layer-content choiceDate">
				<view class="layer-header">
					<view class="layer-close" @tap="hideCalendar(false)"></view>
					<text class="layer-title">{{ layerTitle }}</text>
				</view>
				<!-- -->
				<calendar 
				v-if="iscurrent==0"
				@pickData="parentData" 
				@click-left="leftTab"
				@click-right="rightTab"
				:isFlag="0"
				left-icon="arrowleft" 
				right-icon="arrowright" 
				startDate="2019-06-01" 
				endDate="2019-06-05" 
				daysCount="365"></calendar>
				<screen-picker v-else @getPrice="getPrice" @getNum="getNum"></screen-picker>
				<!-- -->
				<view class="layer-footer">
					<view class="submitBtn" @tap="submitbtn">完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import calendar from "@/components/date-picker/date-picker.vue"
	import screenPicker from "@/components/screen-picker/screen-picker.vue"
	export default {
		data() {
			return {
				iscurrent: -1,
				layerTitle: '',
				tablist: [{
						text: '入离时间'
					},
					{
						text: '入住人数'
					},
					{
						text: '房屋价格'
					}
				],
				isShow: false,
				// animationData: null,
				// animation: null,
				choiceDate: [],
				checkInTime:'',
				checkOutTime:'',
				personCount:'',
				startPrice:'',
				endPrice:'',
				startTime:'',
				endTime:'',
				count:0
			};
		},
		components: {
			calendar,
			screenPicker
		},
		props:{
			isListShow:{
				type:Number,
				default:0
			}
		},
		computed:{
			
		},
		methods: {
			leftTab(){
				console.log('左')
			},
			rightTab(){
				console.log('右')
			},
			showCalendar: function() {
				this.isShow = true;
			},
			hideCalendar: function(isBtnClick) {
				this.isShow = false;
				//SubmitisBtnClick判断是否为按钮点击
				if (isBtnClick) return;

				//非按钮点击则重置已选择的
				// this.dateFlag = {};
				// this.choice = '';
				// this.dayCount = 1;
				// this.dayCount2 = '共' + this.dayCount + '晚';
				// //
				// this.date = JSON.parse(JSON.stringify(this.bak_date));
				// this.weeks = JSON.parse(JSON.stringify(this.bak_weeks));
				// this.choiceDate = JSON.parse(JSON.stringify(this.bak_choiceDate));
				// this.choiceDateArr = JSON.parse(JSON.stringify(this.bak_choiceDateArr));
			},
			getPrice(startPrice,endPrice){
				this.startPrice = startPrice
				this.endPrice = endPrice
			},
			getNum(personCount){
				this.personCount = personCount
			},
			submitbtn: function() {
				this.hideCalendar(true);
				if(this.isListShow==0){
					if (this.iscurrent == 0) {
						this.tablist[0].text = this.choiceDate[0].month + '.' + this.choiceDate[0].day + '-'  +this.choiceDate[1].month + '.' + this.choiceDate[1].day
						this.checkInTime = this.choiceDate[0].re 
						this.checkOutTime = this.choiceDate[1].re
						this.$emit('specificSerach',this.checkInTime,this.checkOutTime,this.personCount,this.startPrice,this.endPrice);
					}else{
						this.personCount== ''?this.personCount= '1': this.personCount
						this.startPrice== ''?this.startPrice= '60': this.startPrice
						this.endPrice== ''?this.endPrice= '1000': this.endPrice
						this.$emit('specificSerach',this.checkInTime,this.checkOutTime,this.personCount,this.startPrice,this.endPrice)
					}
				}else	if(this.isListShow==1){
					this.checkInTime = this.choiceDate[0].re 
					this.checkOutTime = this.choiceDate[1].re
					this.startTime = this.choiceDate[0].month + '月' + this.choiceDate[0].day + '日'
					this.endTime = this.choiceDate[1].month + '月' + this.choiceDate[1].day + '日'
					this.$emit('confirmDate',this.checkInTime,this.checkOutTime,this.startTime,this.endTime,this.count);
				}
			},
			parentData(data,count) {
				this.choiceDate = data
				this.count = count
				console.log(this.choiceDate[0].re)
				console.log(this.choiceDate[1].re)
				console.log(count)
				// console.log(this.choiceDate)
			},
			tab(i) {
				this.iscurrent = i
				if (i == 0) {
					this.layerTitle = '选择日期'
				} else {
					this.layerTitle = '筛选'
				}
				this.showCalendar()
			},
			openDate(){
				this.iscurrent = 0
				this.layerTitle = '选择日期'
				this.showCalendar()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		display: block;

		.head-tab {
			justify-content: center;
			margin-top: 32upx;
			margin-bottom:10upx;
			padding: 0 30upx;

			.item {
				width: 33.33%;
				color: #777;
				font-size: 26upx;
				display: flex;
				justify-content: center;
				line-height: 1em;

				&:after {
					content: '';
					background-image: url("http://113.200.212.12/ymshapi/api/location/search_select_default@2x.png");
					width: 36upx;
					height: 36upx;
					margin-left: 6upx;
					background-size: 100% 100%;
				}

				&.active {
					color: $uni-text-color-green;
				}

				&.active:after {
					background-image: url("http://113.200.212.12/ymshapi/api/location/search_select_sele@2x.png");
				}
			}
		}

		.calendar-layer {
			position: fixed;
			bottom: -100%;
			left: 0;
			height: 0;
			width: 100%;
			overflow: hidden;
			z-index: 1111;

			&.show {
				bottom: 0;
				height: 100%;
				// transition: bottom 0.4s;
				.choiceDate{
					transition: bottom 0.4s;
					bottom: 0;
				}
			}

			&.hide {
				bottom: -100%;
				height: 100%;
				// transition: bottom 0.4s;
				.choiceDate{
					bottom: -100%;
					transition: bottom 0.4s;
				}
			}

			.layer-content.choiceDate {
				position:absolute;
				.layer-footer {
					display: block;
				}
			}

			.layer-white-space {
				position: fixed;
				height: 100%;
				width: 100%;
				background-color: #000;
				opacity: 0.5;
			}

			.layer-content {
				position: absolute;
				bottom: 0;
				width: 750upx;
				font-size: 26upx;
				flex-direction: column;
				background-color: #fff;
				border-top-left-radius: 20upx;
				border-top-right-radius: 20upx;

				.layer-header {
					height: 70upx;
					display: flex;
					align-items: center;
					position: relative;

					.layer-close {
						width: 34upx;
						height: 34upx;
						position: absolute;

						left: 25upx;
						top: 50%;
						transform: translateY(-50%);

						&:before {
							content: '';
							width: 34upx;
							height: 1upx;
							background-color: #333;
							position: absolute;
							top: 16upx;
							left: 0;
							transform: rotate(45deg);
						}

						&:after {
							content: '';
							width: 1upx;
							height: 34upx;
							background-color: #333;
							position: absolute;
							top: 0;
							left: 16upx;
							transform: rotate(45deg);
						}
					}

					.layer-title {
						text-align: center;
						flex: 1;
						font-size: 36upx;
					}
				}

				.layer-footer {
					width: 100%;
					align-items: center;
					justify-items: center;
					display: none;
				}

				.submitBtn {
					height: 80upx;
					line-height: 80upx;
					color: #fff;
					border-radius: 35upx;
					margin: 35upx 50upx;
					display: flex;
					justify-content: center;
					font-size: 32upx;
					background: $uni-color-level-gradual;
				}
			}
		}


	}
</style>
