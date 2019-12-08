<template>
	<view class="uni-indexed">
		<scroll-view :scroll-into-view="scrollViewId" :style="{ height: winHeight + 'px' }" class="uni-indexed__list"
		 scroll-y>
			<view class="frame first-frame">
				<view class="title">当前城市</view>
				<view class="uni-flex uni-row current-city" @tap="openIndex">
					<view class="imgBox">
						<image class="img" src="http://113.200.212.12/ymshapi/api/location/city_location@2x.png.png"></image>
					</view>
					<view class="txt-green">{{city}}</view>
				</view>
			</view>
			<view class="frame two-frame">
				<view class="title">热门城市</view>
				<view class="hot-list">
					<view class="item" v-for="item in recommendCityList" @tap="changeCityName(item.city)" :key="item.city_id">{{ item.city }}</view>
				</view>
			</view>
			<view class="frame three-frame">
				<view class="title">
					<view class="title-text">全部城市</view>
					<!-- <view class="txt-green">当前</view> -->
				</view>
			</view>
			<block v-for="(list, idx) in lists" :key="idx">
				<view v-if="list.items && list.items.length > 0" :id="'uni-indexed-list-' + list.key" class="uni-indexed__list-title">{{ list.key }}</view>
				<view v-if="list.items && list.items.length > 0" class="uni-list">
					<view v-for="(item, index) in list.items" :key="index" class="uni-list-item" hover-class="uni-list-item--hover">
						<view class="uni-list-item__container" @click="onClick(idx, index)">
							<!-- <view v-if="showSelect" style="margin-right: 20upx;"> -->
							<!-- <uni-icon :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" /> -->
							<!-- </view> -->
							<view class="uni-list-item__content">{{ item.name!=null?item.name:'' }}</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view :class="touchmove ? 'active' : ''" :style="{ height: winHeight + 'px' }" class="uni-indexed__menu" @touchstart="touchStart"
		 @touchmove.stop.prevent="touchMove" @touchend="touchEnd">
			<text v-for="(list, key) in lists" :key="key" :class="touchmoveIndex == key ? 'active' : ''" :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
			 class="uni-indexed__menu-item">
				{{ list.key }}
			</text>
		</view>
		<view v-if="touchmove" class="uni-indexed--alert">{{ lists[touchmoveIndex].key }}</view>
	</view>
</template>
<script>
	// import uniIcon from '@/components/lib/uni-icon/uni-icon.vue';
	export default {
		name: 'UniIndexedList',
		components: {
			// uniIcon
		},
		props: {
			// options: {
			// type: Array,
			// default () {
			// 	return [];
			// }
			// },
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				lists: [],
				recommendCityList: [],
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: '',
				options: [{
					"letter": "A",
					"data": [

					]
				}, {
					"letter": "B",
					"data": [

					]
				}, {
					"letter": "C",
					"data": [

					]
				}, {
					"letter": "D",
					"data": [

					]
				}, {
					"letter": "E",
					"data": [

					]
				}, {
					"letter": "F",
					"data": [

					]
				}, {
					"letter": "G",
					"data": [

					]
				}, {
					"letter": "H",
					"data": [

					]
				}, {
					"letter": "J",
					"data": [

					]
				}, {
					"letter": "K",
					"data": [

					]
				}, {
					"letter": "L",
					"data": [

					]
				}, {
					"letter": "M",
					"data": [

					]
				}, {
					"letter": "N",
					"data": [

					]
				}, {
					"letter": "P",
					"data": [

					]
				}, {
					"letter": "Q",
					"data": [

					]
				}, {
					"letter": "R",
					"data": [

					]
				}, {
					"letter": "S",
					"data": [

					]
				}, {
					"letter": "T",
					"data": [

					]
				}, {
					"letter": "W",
					"data": [

					]
				}, {
					"letter": "X",
					"data": [

					]
				}, {
					"letter": "Y",
					"data": [

					]
				}, {
					"letter": "Z",
					"data": [

					]
				}],
				cityList: [],
				cityListAll: []
			};
		},
		created() {
			this.getRecommendCity()
		},
		computed: {
			city: function() {
				return this.$store.state.location
			}
		},
		methods: {
			getCityAll() {
				uni.request({
					url: this.getApp.api.index.cityAll,
					method: 'GET',
					data: {},
					success: res => {
						this.cityListAll = res.data.cityList
						for (let i in this.cityListAll) {
							for (let j in this.options) {
								if (this.cityListAll[i].city_initials == this.options[j].letter) {
									this.options[j].data.push(this.cityListAll[i].city)
								}
							}
						}
						let winHeight = uni.getSystemInfoSync().windowHeight;
						this.itemHeight = (winHeight-160) / this.options.length;
						// console.log(this.itemHeight)
						this.winHeight = winHeight;
						// console.log(this.winHeight)
						this.lists = this.options.map(value => {
							let items = value.data.map(item => {
								let obj = {};
								obj['key'] = value.letter;
								obj['name'] = item
								return obj;
							});
							return {
								title: value.letter,
								key: value.letter,
								items: items
							};
						});
						// console.log(JSON.stringify(this.options))
						// console.log(this.options.length)
					}
				});
			},
			openIndex() {
				this.$store.commit('changeCityName', this.city);
				uni.reLaunch({
					url: '/pages/main/tabbar0/tabbar0'
				});
			},
			getRecommendCity() {
				uni.request({
					url: this.getApp.api.index.recommendCity,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(JSON.stringify(res))
						this.recommendCityList = res.data.recommendCityList
						this.getCityAll()
					}
				});
			},
			changeCityName(cityName) {
				this.$store.commit('changeCityName', cityName);
				uni.reLaunch({
					url: '/pages/main/tabbar0/tabbar0'
				})
			},
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY - 160;
				// console.log('pageY---' + pageY)
				let index = Math.floor(pageY / this.itemHeight);
				let itemHeight = Math.floor(this.itemHeight);
				// console.log('index---' + index)
				// console.log('itemHeight---' + itemHeight)
				let item = this.lists[index];
				// console.log(item)
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + item.key;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY - 160;
				let index = Math.floor(pageY / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + item.key;
					this.touchmoveIndex = index;
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			onClick(idx, index) {
				let obj = {};
				for (let key in this.lists[idx].items[index]) {
					obj[key] = this.lists[idx].items[index][key];
				}
				let select = [];
				if (this.showSelect) {
					this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked;
					this.lists.forEach((value, idx) => {
						value.items.forEach((item, index) => {
							if (item.checked) {
								let obj = {};
								for (let key in this.lists[idx].items[index]) {
									obj[key] = this.lists[idx].items[index][key];
								}
								select.push(obj);
							}
						});
					});
				}
				this.$emit('click', {
					item: obj,
					select: select
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.uni-list {
		background-color: $uni-bg-color;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;

		&::after {
			position: absolute;
			z-index: 10;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			background-color: $uni-border-color;
		}

		&::before {
			position: absolute;
			z-index: 10;
			right: 0;
			top: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			background-color: $uni-border-color;
		}

		&-item {
			font-size: $uni-font-size-lg;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			&__container {
				// padding: $uni-spacing-col-lg $uni-spacing-row-lg;
				height: 86upx;
				line-height: 86upx;
				padding: 0 30upx;
				color: #434343;
				font-size: 26upx;
				width: 100%;
				box-sizing: border-box;
				flex: 1;
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				&:after {
					position: absolute;
					z-index: 3;
					right: 50upx;
					bottom: 0;
					left: 30upx;
					height: 1px;
					content: '';
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					background-color: $uni-border-color;
				}
			}
		}
	}

	.uni-indexed {
		// display: flex;
		// flex-direction: row;
		position: relative;

		&__list {
			flex: 1;
			height: 100vh;

			&-title {
				padding: 0 30upx;
				line-height: 42upx;
				height: 42upx;
				background-color: #f1f1f1;
				font-size: 30upx;
				color: #434343;
			}
		}

		&__menu {
			width: 50upx;
			// height: 100vh;
			// background-color: lightgrey;
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 160px;
			right: 0;

			&.active {
				// background-color: rgb(200, 200, 200);

				.uni-indexed__menu-item {
					// color: #333;

					&.active {
						// color: #007aff;
					}
				}
			}

			&-item {
				color: $uni-text-color-green;
				font-size: 28upx;
				// padding: 0 15upx 0 0;
				text-align: center;
			}
		}

		&--alert {
			position: absolute;
			z-index: 20;
			width: 160upx;
			height: 160upx;
			left: 50%;
			top: 50%;
			margin-left: -80upx;
			margin-top: -80upx;
			border-radius: 80upx;
			text-align: center;
			line-height: 160upx;
			font-size: 70upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	.frame {
		padding: 0 30upx;
		background:#fff;
		&.first-frame {
			padding-top: 40upx;
			padding-bottom: 52upx;
		}
		&.two-frame{
			padding-bottom: 52upx;
		}
		&.three-frame {
			.title {
				margin:0;
				padding: 0 0 20upx;
				display: flex;
				justify-content: space-between;

				.title-text {
					line-height: 1em;
					font-size: 32upx;
					color: #333;
				}

				.txt-green {
					line-height: 1em;
					font-size: 24upx;
					color: $uni-text-color-green;
				}
			}
		}

		.title {
			line-height: 1em;
			font-size: 32upx;
			font-weight: 500;
			color: #333;
			margin-bottom: 26upx;
		}

		.hot-list {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: -34upx;

			// align-content: space-around;
			.item {
				width: 126upx;
				height: 56upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #434343;
				font-size: 28upx;
				border-radius: 10upx;
				background-color: #eee;
				margin: 0 55upx 34upx 0;
			}

			.item:nth-child(4n) {
				margin-right: 0;
			}
		}

		.current-city {
			height: 56upx;
			border-radius: 10upx;
			background: #eee;
			justify-content: center;
			align-items: center;
			display: inline-block;
			padding: 0 10upx 0 10upx;
			line-height: 1em;

			.txt-green {
				font-size: 28upx;
				color: $uni-text-color-green;
				line-height: 1em;

				display: inline;
			}

			.imgBox {
				display: inline;
			}

			.img {
				width: 29upx;
				height: 29upx;
				margin: 0 10upx 8upx 0;
				vertical-align: bottom;
			}
		}
	}
</style>
