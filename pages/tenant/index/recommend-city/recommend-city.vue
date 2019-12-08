<template>
	<view v-if="isShow">
		<image class="img" :src="urlImage+targetRecommendInfo.img" mode="widthFix"></image>
		<view class="text uni-flex uni-column">
			<rich-text :nodes="targetRecommendInfo.content" class="rich-text"></rich-text>
		</view>
		<view class="content">
			<view class="title">推荐木屋</view>
			<goods-list :houseList="targetHouseList"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from "@/components/goods-list/goods-list.vue"
	export default {
		data() {
			return {
				targetRecommendInfo: {},
				targetHouseList: [],
				id: '',
				cityId: '',
				urlImage:'',
				isShow:false
			};
		},
		onLoad(option) {
			this.urlImage = this.getApp.api.urlImage
			this.id = option.id
			this.cityId = option.cityId
			console.log(this.id)
			console.log(this.cityId)
			uni.setNavigationBarTitle({
				title: option.name
			});
			this.getDetails()
			this.getHosueList()
			
		},
		components: {
			goodsList
		},
		methods: {
			getDetails() {
				// 推荐城市软文
				uni.request({
					url: this.getApp.api.index.targetRecommend,
					method: 'GET',
					data: {
						id: this.id
					},
					success: res => {
						console.log(JSON.stringify(res))
						this.targetRecommendInfo = res.data.targetRecommendInfo
					}
				});
			},
			getHosueList() {
				uni.request({
					url: this.getApp.api.index.targetHouseList,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.targetHouseList = res.data.targetRecommendList
						this.isShow=true
					}
				});
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.img {
		width: 750upx;
		height: 428upx;
		margin-bottom: 58upx;
	}

	.text {
		padding: 0 30upx;

		.title {
			color: #000;
			font-size: 34upx;
			font-weight: bold;
			line-height: 1em;
			text-align: center;
			margin-bottom: 42upx;
		}

		p {
			color: #232323;
			font-size: 28upx;
			line-height: 1.8;
			margin-bottom: 36upx;
		}
	}

	.content {
		padding: 0 30upx;
		.title{
			font-size: 32upx;
			color:$uni-text-color-green;
			/* margin-top:26upx; */
		}
	}
</style>
