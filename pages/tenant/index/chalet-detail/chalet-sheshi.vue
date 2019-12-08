<template>
	<view class="sheshi" v-if="isShow">
		<!-- <view style="font-size: 32upx;color:#111015;line-height: 1em;padding-top: 36upx; padding-left: 30upx;">房屋设施</view> -->
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-column">
				<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.kitchenList[0].name}}</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;text-align: center;">
					<view v-for="item in facilitiesList.kitchenList" :key="item.code" style="padding-left:66upx;">
						<view class="sheshiList">
							<view class="imgBg">
								<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
							</view>
							<view class="imgName">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.safeList[0].name}}</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;text-align: center;">
					<view v-for="item in facilitiesList.safeList" :key="item.code" style="padding-left:66upx;">
						<view class="sheshiList">
							<view class="imgBg">
								<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
							</view>
							<view class="imgName">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.dispList[0].name}}</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;text-align: center;">
					<view v-for="item in facilitiesList.dispList" :key="item.code" style="padding-left:66upx;">
						<view class="sheshiList">
							<view class="imgBg">
								<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
							</view>
							<view class="imgName">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.buildList[0].name}}</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;text-align: center;">
					<view v-for="item in facilitiesList.buildList" :key="item.code" style="padding-left:66upx;">
						<view class="sheshiList">
							<view class="imgBg">
								<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
							</view>
							<view class="imgName">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.toiletriesList[0].name}}</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;text-align: center;">
					<view v-for="item in facilitiesList.toiletriesList" :key="item.code" style="padding-left:66upx;">
						<view class="sheshiList">
							<view class="imgBg">
								<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
							</view>
							<view class="imgName">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-column">
				<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.homeList[0].name}}</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;text-align: center;">
					<view v-for="item in facilitiesList.homeList" :key="item.code" style="padding-left:66upx;">
						<view class="sheshiList">
							<view class="imgBg">
								<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
							</view>
							<view class="imgName">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				facilitiesList: [],
				urlImage: '',
				isShow:false
			}

		},
		onLoad(e) {
			this.id = e.id
			// console.log(this.id)
			this.urlImage = this.getApp.api.urlImage
			this.getHouseFacility()
		},
		methods: {
			getHouseFacility() {
				uni.request({
					url: this.getApp.api.index.houseFacility,
					method: 'GET',
					data: {
						houseId: this.id
					},
					success: res => {
						this.facilitiesList = res.data.facilitiesList[0]
						this.isShow=true
						// console.log(JSON.stringify(res))
					}
				});
			}
		}
	}
</script>

<style>
	.sheshi {
		width: 100%;

	}

	.sheshi-padding {
		padding: 0 30upx;
	}

	.sheshiTitle {
		font-size: 28upx;
		color: #111015;
		line-height: 1em;
		padding-top: 36upx;
		padding-bottom: 58upx;
	}

	.sheshi .imgBg {
		width: 106upx;
		height: 106upx;
		background: #f8f8f8;
		border-radius: 50%;
		background: #ECF1F2;

	}

	.sheshi .imgBg image {
		width: 106upx;
		height: 106upx;
	}

	.imgName {
		width: 106upx;
		font-size: 22upx;
		color: #999999;
		text-align: center;
		line-height: 1em;
		padding-top: 6upx;
		padding-bottom: 48upx;
	}

	.sheshiList {}
</style>
