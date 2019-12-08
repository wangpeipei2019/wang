<template>
	<view class="segmented-control" :class="{ text: styleType === 'buttom' }" :style="{ borderColor: styleType === 'button' ? '' : activeColor }">
		<view v-for="(item, index) in values" class="segmented-control-item text" :class="[{ text: index === currentIndex }, { active: index === currentIndex }]" :key="index" @click="_onClick(index)"
		 :style="{color:
			index === currentIndex
				? activeColor
					: '#000'
				}">{{ item }}
		</view>	
	</view>
</template>

<script>
	export default {
		name: 'uni-segmented-control',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return [];
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			styleType: {
				type: String,
				default: 'button'
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val;
				}
			}
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index;
					this.$emit('clickItem', index);
					this.act=true
				}
			}
		},
		created() {
			this.currentIndex = this.current;
		}
	};
</script>

<style lang="scss" scoped>
	@charset "UTF-8";

	.segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 28upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
	}
	.segmented-control.text {
		border: 0;
		border-radius: 0;
	}
	.segmented-control-item {
		flex: 1;
		text-align: center;
		line-height: 60upx;
		box-sizing: border-box;
		border-left: 1px solid;
		line-height: 1em;
		padding: 30upx 0 14upx 0;
	}
	.segmented-control-item.active {
		color: #fff;
		color: $uni-text-color-green;
	}
	.segmented-control-item.text {
		border-left: 0;
		color: $uni-text-color-green;
	}
	.segmented-control-item.text.active {
		border-bottom: 2upx solid $uni-text-color-green;
	}
	.segmented-control-item:first-child {
		border-left-width: 0
	}
</style>