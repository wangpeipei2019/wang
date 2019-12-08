<template>
	<view v-if="isShow">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
			 <uni-nav-bar fixed="true" z-index="999" display=none backgroundColor="rgba(255,255,255,0)" statusBar="true" @click-left="comeBack">
				<block slot="left">
					<view class="arrowleft arrStyle">
						<uni-icon type="arrowleft" color="#fff" size="22"></uni-icon>
					 </view> 
				 </block>
			 </uni-nav-bar>
			<view class="container">
				<view class="slideWarp" :class="{'isOpen':isOpen}">
					<slide-frame @specificSerach="specificSerach" :isListShow="0"></slide-frame><strong></strong>
				</view>
				<view class="position">
					<view class="banner">
						<image class="img" :src="urlImage+themeInfo.img"></image>
						<view class="text">
							<view class="title">{{ themeInfo.title }}</view>
							<view class="txt">{{ themeInfo.introduce }}</view>
						</view>
					</view>
					<slide-frame @specificSerach="specificSerach"></slide-frame><strong></strong>
				</view>
				<view class="content">
					<goods-list :houseList="themeHouselist"></goods-list>
				</view>
			</view>
		</scroll-view> 
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar-hot.vue';
	import slideFrame from "@/components/slide-frame/slide-frame.vue"
	import goodsList from "@/components/goods-list/goods-list.vue"
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				id: '',
				cityId: '',
				themeInfo: {},
				themeHouselist: [],
				urlImage: '',
				content: '',
				scrollTop: 0,
				 old: {
					scrollTop: 0
				}, 
				isOpen:false,
				isShow:false
			};
		},
		onLoad(e) {
			this.id = e.id
			this.cityId = e.cityId
			// console.log(this.id)
			// console.log(this.cityId)
			this.getDeatils()
			this.getHouseList()
			this.urlImage = this.getApp.api.urlImage
		},
		components: {
			slideFrame,
			goodsList,
			uniNavBar,
			 uniIcon
		},
		methods: {
			comeBack() {
				// var num = getCurrentPages()
				// console.log(num)
				console.log(1)
				uni.navigateBack({
					delta: 1
				});
			},
			getDeatils() {
				// 特色主题软文
				uni.request({
					url: this.getApp.api.index.themeInfo,
					method: 'GET',
					data: {
						id: this.id
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.themeInfo = res.data.themeInfo
					}
				});
			},
			getHouseList() {
				uni.request({
					url: this.getApp.api.index.themeHouseList,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						this.themeHouselist = res.data.themeRecommendList
						// console.log(JSON.stringify(res))
						this.isShow=true
					}
				});
			},
			specificSerach(checkInTime, checkOutTime, personCount, startPrice, endPrice) {
				console.log(checkInTime + '-' + checkOutTime + '-' + personCount + '-' + startPrice + '-' + endPrice)
				uni.request({
					url: this.getApp.api.index.specificSerach,
					method: 'GET',
					data: {
						checkInTime: checkInTime,
						checkOutTime: checkOutTime,
						personCount: personCount,
						startPrice: startPrice,
						endPrice: endPrice,
						content: this.content,
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.themeHouselist = res.data.houseListByCityId
					}
				});
			},
			 scroll: function(e) {
					this.old.scrollTop = e.detail.scrollTop
					//console.log(this.old.scrollTop)
					if(e.detail.deltaY<0){
						if(this.old.scrollTop>206){
							this.isOpen=true
						} 
					}if(e.detail.deltaY>0){
						if(this.old.scrollTop<235){
							this.isOpen=false
						}
					}
							
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y{
		height:100vh; 
	} 
	.position {
		background:#fff;
	}
	.arrStyle{
		margin: 10upx 0 0 10upx;
		border-radius: 50%;
		background-color: rgba(0,0,0,0.3);
		height:70upx;
		width: 60upx;
		padding-left: 10upx;
	}
	.container {
		position: relative;
		box-sizing: border-box;
		.icon-back {
			// position:relative;
			width: 40upx;
			height: 40upx;
			position: absolute;
			left: 30upx;
			top: 40upx;
			z-index: 10;
		}
		.banner {
			line-height: 1em;
			position:relative;
			margin-top: -142upx;
			.img {
				width: 750upx;
				height: 480upx;
				vertical-align: top;
			}
			.text {
				width: 480upx;
				min-height: 190upx;
				box-sizing: border-box;
				padding: 30upx;
				background: $uni-text-color-green;
				opacity: .8;
				color: #fff;
				position: absolute;
				left: 0;
				bottom: 0;
				.title {
					font-size: 40upx;
				}
				.txt {
					font-size: 22upx;
					line-height: 1.4em;
				}
			}
		}
		.content {
			padding: 0 30upx;
			box-sizing: border-box;
		}
		.slideWarp{
			width: 100%;
			height: 100upx;
			padding-top: 44upx;
			position: fixed;
			top: 0;
			z-index: 999999;
			background-color: #ffffff;
			display: none;
		}
		.isOpen{
			display: block
		}
	}
</style>
