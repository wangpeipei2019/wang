<template>
	<view class="range-slider" :style="'width:' + width + 'rpx;height:' + height + 'rpx'">
		<view class="range-bar" :style="'width:100%;height:' + barHeight + 'rpx'">
			<view class="range-bar-bg" :style="'background-color:' + backgroundColor + ''"></view>
			<view class="range-bar-progress" :style="'margin-left:' + progressBarLeft + 'rpx;width:' + progressBarWidth + 'rpx;background-color:' + activeColor + ''"></view>
		</view>

		<view
			class="block"
			:style="'width:' + blockSize + 'rpx;height:' + blockSize + 'rpx;margin-left:' + minBlockLeft + 'rpx;'"
			@touchstart="_onBlockTouchStart"
			@touchmove="_onBlockTouchMove"
			@touchend="_onBlockTouchEnd"
			:data-left="minBlockLeft"
			data-tag="minBlock"
		>
			<slot name="minBlock"></slot>
		</view>
		<view
			class="block"
			:style="'width:' + blockSize + 'rpx;height:' + blockSize + 'rpx;margin-left:' + maxBlockLeft + 'rpx;'"
			@touchstart="_onBlockTouchStart"
			@touchmove="_onBlockTouchMove"
			@touchend="_onBlockTouchEnd"
			:data-left="maxBlockLeft"
			data-tag="maxBlock"
		>
			<slot name="maxBlock"></slot>
		</view>
	</view>
</template>
<script>
/**
 * range-slider v1.0.5
 */
const _windowWidth = uni.getSystemInfoSync().windowWidth;

export default {
	data() {
		return {
			//#ifdef H5
			MAX_LENGTH: 294,
			maxBlockLeft: 300,
			//#endif

			// #ifndef H5
			MAX_LENGTH: 700,
			maxBlockLeft: 350,
			// #endif

			minBlockLeft: 0,
			progressBarLeft: 0,
			progressBarWidth: 350
		};
	},
	components: {},
	props: {
		//组件宽度
		width: {
			type: Number,
			default: 750
		},
		//组件高度
		height: {
			type: Number,
			default: 100
		},
		//滑块大小
		blockSize: {
			type: Number,
			default: 50
		},
		//区间进度条高度
		barHeight: {
			type: Number,
			default: 10
		},
		//背景条颜色
		backgroundColor: {
			type: String,
			default: '#e9e9e9'
		},
		//已选择的颜色
		activeColor: {
			type: String,
			default: '#45c298'
		},
		//最小值
		min: {
			type: Number,
			default: 60
		},
		//最大值
		max: {
			type: Number,
			default: 1000
		},
		//设置初始值
		values: {
			type: Array,
			default: function() {
				return [60, 1000];
			}
		}
	},
	//////////////////H5平台，不支持onload，支持created/////////////////
	//#ifdef H5
	created: function() {
		this._refresh();
	},
	//#endif
	/////////////////////////////////////////////////////////////////

	//////////////////非H5平台，支持onload////////////////////////////
	// #ifndef H5
	onLoad: function(option) {
		this._refresh();
	},
	onUnload: function() {},
	// #endif
	/////////////////////////////////////////////////////////////////
	watch: {
		//组件宽度
		width: function(newVal, oldVal, changedPath) {
			var that = this;
			if (newVal != that.width) {
				this._refresh();
			}
		},
		//滑块大小
		blockSize: function(newVal, oldVal, changedPath) {
			var that = this;
			if (newVal != that.blockSize) {
				this._refresh();
			}
		},
		//最小值
		min: function(newVal, oldVal, changedPath) {
			var that = this;
			if (newVal != that.min) {
				that._refresh();
			}
		},
		//最大值
		max: function(newVal, oldVal, changedPath) {
			var that = this;
			if (newVal != that.max) {
				that._refresh();
			}
		},
		//设置初始值
		values: function(newVal, oldVal, changedPath) {
			var that = this;
			var values = that.values;
			if (that._isValuesValid(newVal) && that._isValuesValid(values)) {
				if (values[0] != oldVal[0] || values[1] != oldVal[1]) that._refresh();
			}
		}
	},
	methods: {
		_pxToRpx: function(px) {
			return (750 * px) / _windowWidth;
		},
		_onBlockTouchStart: function(e) {
			let tag = e.target.dataset.tag;
			if (tag == 'minBlock' || tag == 'maxBlock') {
				//兼容h5平台及某版本微信
				if (e.hasOwnProperty('changedTouches')) {
					this._blockDownX = e.changedTouches[0].pageX;
				} else {
					this._blockDownX = e.pageX;
				}

				//#ifdef H5
				this._blockLeft = parseFloat(e.target.dataset.left);
				//#endif
				// #ifndef H5
				this._blockLeft = e.target.dataset.left;
				// #endif

				this._curBlock = e.target.dataset.tag;
			}
		},
		_onBlockTouchMove: function(e) {
			let tag = e.target.dataset.tag;
			if (tag == 'minBlock' || tag == 'maxBlock') {
				var that = this;
				var values = that._calculateValues(e);
				that._refreshProgressBar(values[2], values[3]);
				that._refreshBlock(values[2], values[3]);
				//拖动时也触发事件
				var eventDetail = {
					minValue: values[0],
					maxValue: values[1],
					fromUser: true
				};
				var eventOption = {};
				that.$emit('rangechange', eventDetail, eventOption);
			}
		},
		_onBlockTouchEnd: function(e) {
			let tag = e.target.dataset.tag;
			if (tag == 'minBlock' || tag == 'maxBlock') {
				var that = this;
				var values = that._calculateValues(e.mp.changedTouches[0]);
				that._refreshProgressBar(values[2], values[3]);
				that._refreshBlock(values[2], values[3]);
				var eventDetail = {
					minValue: values[0],
					maxValue: values[1],
					fromUser: true
				};
				var eventOption = {};
				that.$emit('rangechange', eventDetail, eventOption);
			}
		},
		_isValuesValid: function(values) {
			return values != null && values != undefined && values.length == 2;
		},
		/**
		 * 根据手势计算相关数据
		 */
		_calculateValues: function(e) {
			var pageX = e.pageX;
			//兼容h5平台
			if (e.hasOwnProperty('changedTouches')) {
				pageX = e.changedTouches[0].pageX;
			}

			var that = this;
			var moveLength = pageX - that._blockDownX;
			var left = that._blockLeft + that._pxToRpx(moveLength);
			left = Math.max(0, left);
			left = Math.min(left, that.MAX_LENGTH);
			var minBlockLeft = that.minBlockLeft;
			var maxBlockLeft = that.maxBlockLeft;
			if (that._curBlock == 'minBlock') {
				minBlockLeft = left;
			} else {
				maxBlockLeft = left;
			}
			var range = that.max - that.min;
			var minLeft = Math.min(minBlockLeft, maxBlockLeft);
			var maxLeft = Math.max(minBlockLeft, maxBlockLeft);
			var minValue = (minLeft / that.MAX_LENGTH) * range + that.min;
			var maxValue = (maxLeft / that.MAX_LENGTH) * range + that.min;
			return [minValue, maxValue, minLeft, maxLeft];
		},
		/**
		 * 计算滑块坐标
		 */
		_calculateBlockLeft: function(minValue, maxValue) {
			var that = this;
			var blockSize = that.blockSize;
			var range = that.max - that.min;
			var minLeft = ((minValue - that.min) / range) * that.MAX_LENGTH;
			var maxLeft = ((maxValue - that.min) / range) * that.MAX_LENGTH;
			return [minLeft, maxLeft];
		},
		/**
		 * 刷新进度条视图
		 */
		_refreshProgressBar: function(minBlockLeft, maxBlockLeft) {
			var that = this;
			var blockSize = that.blockSize;
			that.progressBarLeft = minBlockLeft + blockSize / 2;
			that.progressBarWidth = Math.abs(maxBlockLeft - minBlockLeft);
		},
		/**
		 * 刷新滑块视图
		 */
		_refreshBlock: function(minBlockLeft, maxBlockLeft) {
			var that = this;
			that.minBlockLeft = minBlockLeft;
			that.maxBlockLeft = maxBlockLeft;
		},
		/**
		 * 刷新整个视图
		 */
		_refresh: function() {
			console.log('refresh');
			var that = this;
			var MAX_LENGTH = that.width - that.blockSize;
			that.MAX_LENGTH = MAX_LENGTH;
			that.maxBlockLeft = MAX_LENGTH;
			that.progressBarWidth = MAX_LENGTH;
			var values = that.values;
			if (that._isValuesValid(values)) {
				values[0] = Math.max(that.min, values[0]);
				values[0] = Math.min(values[0], that.max);
				values[1] = Math.max(that.min, values[1]);
				values[1] = Math.min(values[1], that.max);
				var leftValues = that._calculateBlockLeft(values[0], values[1]);
				that._refreshProgressBar(leftValues[0], leftValues[1]);
				that._refreshBlock(leftValues[0], leftValues[1]);
			}
		}
	}
};
</script>

<style>
.range-slider {
	position: relative;
}

.range-bar {
	position: absolute;
}

.range-bar {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	border-radius: 10000upx;
}

.range-bar-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 10000upx;
}

.range-bar-progress {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: blueviolet;
}

.block {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	background: #fff;
	border-radius: 50%;
	box-shadow: 0upx 0upx 6upx #ccc;
}
</style>
