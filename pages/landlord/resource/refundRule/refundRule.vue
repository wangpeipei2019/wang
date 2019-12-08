<template>
	<view>
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="退款规则" right-text="保存"
		 @click-right="keep"></uni-nav-bar>
		<view class="uni-flex uni-column refundRule">
			<view class="title">宽松的退款规则会让更多的人预定您的房屋</view>
			<view class="uni-flex uni-row refundList">
				<view>入住</view>
				<view class="uni-flex choice" @click="showSinglePicker(0)">
					<view>前{{valList.refundRuleDay}}天</view>
					<view class="triangle-down"></view>
				</view>
				<view>12点前取消订单，房费可全额退还；</view>
			</view>
		</view>
		<view class="uni-flex uni-column refund">
			<view class="uni-flex uni-row refundBot">
				<view>之后取消订单收取未住房费的</view>
				<view class="uni-flex choice" @click="showSinglePicker(1)">
					<view>{{valList.refundRulePercentage}}%</view>
					<view class="triangle-down"></view>
				</view>
			</view>
			<view class="refundLast">作为违约金支付给房东。（包含未入住和提前离店）</view>
		</view>
		<uni-popup :show="type === 'bottom'" position="bottom" mode="fixed" @hidePopup="togglePopup('')">
			<view class="uni-flex uni-column paddingWrap">
				<view class="uni-flex uni-row popListTitle">
					<view @tap="togglePopup('')">取消</view>
					<view>房客入住时间</view>
					<view @tap="togglePopup('')">确定</view>
				</view>
				<view class="uni-flex uni-column timeWrap">
					<view class="timeList">前1天</view>
					<view class="timeList">前2天</view>
					<view class="timeList">前3天</view>
					<view class="timeList">前4天</view>
					<view class="timeList">前5天</view>

				</view>
			</view>

		</uni-popup>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniPopup,
			mpvuePicker,
			uniNavBar
		},
		data() {
			return {
				current:0,
				type: '',
				pickerSingleArray: [{
						label: '前1天',
						value: 1
					},
					{
						label: '前2天',
						value: 2
					},
					{
						label: '前3天',
						value: 3
					},
					{
						label: '前4天',
						value: 4
					},
					{
						label: '前5天',
						value: 5
					}
				],
				pickerPercentageArray: [{
						label: '10%',
						value: 10
					},
					{
						label: '20%',
						value: 20
					},
					{
						label: '30%',
						value: 30
					},
					{
						label: '40%',
						value: 40
					},
					{
						label: '50%',
						value: 50
					},
					{
						label: '60%',
						value: 60
					},
					{
						label: '70%',
						value: 70
					},
					{
						label: '80%',
						value: 80
					},
					{
						label: '90%',
						value: 90
					},
					{
						label: '100%',
						value: 100
					},
					{
						label: '0%',
						value: 0
					},
				],
				themeColor: '#45c298',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				valList:{
					refundRuleDay:1,
					refundRulePercentage:10
				}
			};
		},

		methods: {
			togglePopup(type) {
				this.type = type;
			},
			showSinglePicker(val) {
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				this.current=val
				if(val==0){
					this.pickerValueArray = this.pickerSingleArray
				}else if(val==1){
					this.pickerValueArray = this.pickerPercentageArray
				}
			},
			onConfirm(e) {
				if(this.current==0){
					this.valList.refundRuleDay = e.value[0]
				}else if(this.current==1){
					this.valList.refundRulePercentage = e.value[0]
				}
			},
			onCancel(e) {
				console.log(e)
			},
			comeBack(){
				uni.navigateBack({});
			},
			keep(){
				this.$store.commit('changeRefundRule',this.valList)
				this.comeBack()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.choice{
		margin:0 12upx !important;
		align-items:center;
		view{
			color:$uni-text-color-green !important;
		}
	}
	.triangle-down {
		width: 0;
		height: 0;
		border-left: 10upx solid transparent;
		border-right: 10upx solid transparent;
		border-top: 14upx solid $uni-border-color-green;
		margin: 45upx 12upx 0 6upx;
	}

	.refundRule .title {
		color: #3d3d3d;
		font-size: 24upx;
		font-weight: bold;
		width: calc(100% - 30upx);
		line-height: 1em;
		padding: 30upx 0 18upx 30upx;
		background-color: #f8f8fb;
	}

	.refundRule {
		width: 100%;
		background-color: #ffffff;
	}

	.refundList {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		height: 102upx;
		line-height: 102upx;
		border-bottom: 1upx solid #e8e8e8;
	}

	.refundList view {
		line-height: 102upx;
		font-size: 24upx;
		color: #656565;
	}

	.refundList view:nth-of-type(2) {
		margin: 0 0 0 12upx;
		color: $uni-text-color-green;
	}

	.refund {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		line-height: 1em;
		background-color: #ffffff;
	}


	.refundBot view:nth-of-type(1),
	.refundBot view:nth-child(2) {
		margin: 38upx 0 27upx 0;
		font-size: 24upx;
		color: #656565;
	}

	.refundBot view:nth-child(2) {
		color:  $uni-text-color-green;
		margin-left: 12upx;
	}

	.refundBot view:nth-child(3) {
		margin-top: 52upx;
	}

	.refund .refundLast {
		line-height: 1upx;
		margin-bottom: 38upx;
		font-size: 24upx;
		color: #656565;
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
