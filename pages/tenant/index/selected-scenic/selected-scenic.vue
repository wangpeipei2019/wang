<template>
	<view v-if="isShow">
		<image class="img" :src="urlImage+scenicSpotInfo.img" mode="widthFix"></image>
		<view class="content">
			<view class="title">{{ scenicSpotInfo.title }}</view>
			<view class="text uni-flex uni-column">
				<rich-text :nodes="scenicSpotInfo.content" class="rich-text"></rich-text>
			</view>
		</view>
		<div class="recommend-title">推荐木屋</div>
		<view class="product-list">
			<view class="product" @tap="chalet(item.id)" v-for="item in scenicRecommendList" :key="item.id">
				<view class="image-view">
					<image class="product-image" :src="urlImage+item.house_img"></image>
				</view>
				<view class="product-title">{{item.additional_explanation}}/{{item.house_name}}</view>
				<view class="uni-flex uni-row product-desc">
					<text>{{item.house_type_bedroom}}居/{{item.house_area}}平/{{item.fit_number}}人</text>
					<text>{{item.area}}</text>
				</view>
				<view class="product-price">
					<text class="product-price-favour">￥{{item.float_price!=null?item.float_price:item.base_price}}</text>
				</view>
			</view>
		</view>
		<!-- <uni-load-more></uni-load-more> -->
	</view>
</template>

<script>
	// import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				id: '',
				cityId: '',
				scenicSpotInfo: {},
				scenicRecommendList: [],
				urlImage:'',
				isShow:false
			};
		},
		methods: {
			getDetails() {
				// 精选景点软文
				uni.request({
					url: this.getApp.api.index.scenicSpotManage,
					method: 'GET',
					data: {
						id: this.id
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.scenicSpotInfo = res.data.scenicSpotInfo[0]
					}
				});
			},
			chalet(id) {
				this.$store.commit('changeHouseCard', id)
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail?id=' + id + '&cityId=' + this.cityId
				});
			},
			getHouseList() {
				uni.request({
					url: this.getApp.api.index.scenicHouseList,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						this.scenicRecommendList = res.data.scenicRecommendList
						// console.log(JSON.stringify(res))
						this.isShow=true
					}
				});
			}
		},
		components: {
			// uniLoadMore
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.id = e.id
			this.cityId = e.cityId
			uni.setNavigationBarTitle({
				title: e.title,
			});
			this.getDetails()
			this.getHouseList()
		}
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 100%;
		height: 428upx;
	}

	.content {
		padding: 16upx 30upx 10upx;
		margin-bottom: 30upx;
		box-shadow: 0 1px 6px #ccc;

		.photo {
			width: 100%;
			height: 460upx;
			margin-bottom: 10upx;
		}

		.title {
			color: $uni-text-color-green;
			font-size: 38upx;
			margin-bottom: 20upx;
		}
	}

	.product-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.product {
		padding: 20upx 0 20upx 30upx;
		display: flex;
		flex-direction: column;
	}

	.image-view {
		height: 230upx;
		width: 330upx;
		margin: 12upx 0;
	}

	.product-image {
		height: 230upx;
		width: 330upx;
		border-radius: 15upx;
	}

	.product-title {
		width: 300upx;
		padding-left: 15upx;
		padding-left: 15upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 30rpx;
		color: #1B1B1B;
	}

	.product-desc {
		width: 300upx;
		line-height: 1.5;
		font-size: 24upx;
		color: #707070;
		 justify-content: space-between;
		 padding-left: 15upx;
		 padding-right: 15upx;
	}

	/* .product-desc text {
		margin-right: 15upx;
	} */

	.product-price {
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.product-price-original {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;

	}

	.product-price-favour {
		color: $uni-text-color-pay;
	}

	.product-tip {
		position: absolute;
		right: 10upx;
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.recommend-title {
		color: $uni-text-color-green;
		font-size: 32upx;
		padding: 0 30upx;
	}
</style>
