<template>
	<view class="content">
		<view class="item">
			<view class="title">每晚价格</view>
			<view class="text-center">
				<view class="text-center">
					<text>¥{{rangeValues[0]}}</text>
					<text>-</text>
					<text>{{rangeValues[1]}}+</text>
				</view>
			</view>
			<view class="rowBox">
				<view class="sliderBox">
					<RangeSlider :width='slideWidth' :height='slideHeight' :blockSize='slideBlockSize' :min='slideMin' :max='slideMax'
					 :values='rangeValues' @rangechange='onRangeChange'>
						<view slot='minBlock' class='range-slider-block'></view> //左边滑块的内容
						<view slot='maxBlock' class='range-slider-block'></view> //右边滑块的内容
					</RangeSlider>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="title">人数</view>
			<uni-number-box :min="1" :value="val" @change="onNumberChange"></uni-number-box>
		</view>
		<!-- <button @tap="test" class="testBtn">手动设置为10~60</button> -->
	</view>
</template>

<script>
	import RangeSlider from '@/components/range-slider/range-slider.vue'
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		data() {
			return {
				rangeValues: [60, 1000], //当前区间值
				slideWidth: 650, //宽度
				slideHeight: 80, //高度
				slideBlockSize: 56, //圆形按钮大小
				slideMin: 60, //slider最小值
				slideMax: 2000, //slider最大值
				val:1
			}
		},
		components: {
			RangeSlider,
			uniNumberBox
		},
		onLoad() {

		},
		methods: {
			onRangeChange: function(e) {
				this.rangeValues = [Math.round(e.minValue), Math.round(e.maxValue)];
				this.$emit('getPrice',Math.round(e.minValue), Math.round(e.maxValue))
			},
			onNumberChange(num){
				// this.val = num
				this.$emit('getNum',num)
			},
			test: function() {
				this.rangeValues = [10, 60];
			}
		}
	}
</script>

<style scoped>
	view {
		display: flex;
	}
	.title{
		font-size:32upx;
		color:#333;
		font-weight:bold;
		line-height:1em;
		margin:20upx 0 30upx;
	}
	.content {
		width:750upx;
		box-sizing: border-box;
		padding:0 50upx;
		justify-content: center;
		flex-direction: column;
	}
	.item{
		display: block;
		margin:0 0 20upx;
	}

	.sliderBox {
		justify-content: center;
		margin-right: 50upx;
	}

	.text-center {
		justify-content: center;
	}

	.rowBox {
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.mrg50T {
		margin-top: 50upx;
	}

	.tips {
		color: #999;
		font-size: 24upx;
		text-align: center;
		margin-top: 100upx;
	}

	.testBtn {
		margin-top: 100upx;
	}
</style>
