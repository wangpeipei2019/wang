<template>
	<view class="uni-flex uni-column" v-if="isShow">
		<view class="uni-flex uni-column">
			<view class="uni-list">
				<view class="item uni-flex uni-column" @tap="chalet(item.id)" v-for="item in houseList" :key="item.id">
					<image class="img" :src="urlImage+item.house_img" mode=""></image>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-media-list uni-pull-right">
							<view class="uni-media-list-logo">
								<image class="photo" :src="urlImage+item.user_pic" mode=""></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{item.additional_explanation}}/{{item.house_name}}</view>
								<view class="uni-media-list-text-bottom uni-ellipsis">
									<text>{{item.house_type_bedroom}}居/{{item.house_area}}平米/宜住{{item.fit_number}}人</text>
									<text>{{item.area}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="price">￥{{item.float_price!=null?item.float_price:item.base_price}}</view>
				</view>
			</view>
		</view>
		<!-- <uni-load-more status="more"></uni-load-more> -->
	</view>
</template>

<script>
	// import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				urlImage:'',
				isShow:false
				// baseList:this.houseList
			};
		},
		created(){
			this.urlImage = this.getApp.api.urlImage
			this.isShow=true
		},
		props: {
			houseList: {
				type: Array
			}
		},
		components: {
			// uniLoadMore
		},
		methods:{
			chalet(id){
				this.$store.commit('changeHouseCard',id)
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail?id='+id
				});
			},
		}
	}
</script>

<style lang="scss">
	.uni-list:before,
	.uni-list:after,
	.uni-list-cell:after {
		background-color: transparent;
	}

	.item {
		position: relative;
		margin-top: 26upx;
		box-sizing: border-box;
	}

	.item:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		-ms-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.img {
		width: 690upx;
		height: 402upx;
		border-radius: 10upx;
		margin: 0 0 16upx;
	}

	.price {
		color: $uni-text-color-green;
		font-weight: bold;
		font-size: 36upx;
		line-height: 1em;
		margin: 0 0 24upx;
	}

	.uni-list-cell {
		margin: 0 0 18upx;
		background: #fff !important;
	}

	.uni-media-list {
		padding: 0 10upx 0 0;
		box-sizing: border-box;

		.uni-media-list-body {
			height: auto;
			justify-content: normal;
		}

		.uni-media-list-text-top {
			line-height: 1em;
			font-size: 32upx;
			color: #313131;
			margin: 0 0 18upx;
		}

		.uni-media-list-text-bottom {
			line-height: 1em;
			color: #313131;
			font-size: 24upx;

			text {
				margin-right: 16upx;
			}
		}

		.photo {
			border-radius: 50%;
			width: 88upx;
			height: 88upx;
		}

	}
</style>
