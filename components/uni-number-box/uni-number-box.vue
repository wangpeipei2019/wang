<template>
	<view class="uni-numbox">
		<view :class="{'uni-numbox--disabled': inputValue <= min || disabled}" class="uni-numbox__minus" @click="_calcValue('minus')">
		<view>-</view>
		</view>
		<view v-model="inputValue" class="uni-numbox__value">{{inputValue}}</view>
		<!-- <input :disabled="disabled" v-model="inputValue" class="uni-numbox__value" type="number" @blur="_onBlur"> -->
		<view :class="{'uni-numbox--disabled': inputValue >= max || disabled}" class="uni-numbox__plus" @click="_calcValue('plus')">
		<view>+</view>  
		</view>
	</view>
</template>
<script>
	export default {
		name: 'uni-number-box',
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			inputValue: this.value
				
			}
		},
		computed: {
			disableSubtract() {
				return this.inputValue <= this.min
			},
			disableAdd() {
				return this.inputValue >= this.max
			}
		},
		watch: {
			value(val) {
				this.inputValue = val;
			},
			inputValue(val) {
				this.$emit('change', val);
			}
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					this.open=false
					return
				}
				const scale = this._getDecimalScale()
				let value = this.inputValue * scale
				let step = this.step * scale
				if (type === 'minus') {
					value -= step
				} else if (type === 'plus') {
					value += step
				}
				if (value < this.min || value > this.max) {
					return
				}
				this.inputValue = value / scale
			},
			_getDecimalScale() {
				let scale = 1
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length)
				}
				return scale
			},
			_onBlur(event) {
				let value = event.detail.value
				if (!value) {
					this.inputValue = 0
					return
				}
				value = +value
				if (value > this.max) {
					value = this.max
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
			}
		}
	}
</script>
<style lang="scss" scoped>
	@charset "UTF-8";
		.act{
			display: block;
		}
		view{
			line-height: 1em;
		}
	.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 38upx;
		position: relative;
		/* background-color:#66AAFF; */
	}

	.uni-numbox:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
	/* 	border: 1px solid #c8c7cc;
		border-radius: 12upx; */
		transform: scale(.5)
	}

	.uni-numbox__minus,
	.uni-numbox__plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 38upx;
		font-size: 45upx;
		height: 38upx;
		line-height: 1em;
		border-radius: 50%;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: $uni-text-color-green;
		border:1upx solid $uni-border-color-green;
		overflow: hidden;
	
	}
.uni-numbox__minus view,
.uni-numbox__plus view{
		width: 38upx;
		height:38upx;
		line-height: 1em;
		border-radius: 50%;	
		font-size: 45upx;
		margin: -10upx 0 0 0;
	}
	.uni-numbox__value {
		position: relative;
		bottom: 0;
		background-color: #fff;
		width: 60upx; 
		min-height: 38upx;
		height:38upx;
		line-height:38upx;
		text-align: center;
		box-sizing:border-box;
		color:#333;
		flex:1;
		overflow: visible;
	}
	.uni-numbox__value:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		transform: scale(.5);
	}
	.uni-numbox--disabled {
		color: silver;
		border:1upx solid silver;
		
	}
</style>