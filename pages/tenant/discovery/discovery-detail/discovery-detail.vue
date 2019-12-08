<template>
	<view class="find" v-if="isShow">
		<!-- <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<image class="find-image" src="http://113.200.212.12/ymshapi/api/location/img_top_1@3x.png"></image>
			</swiper-item>
			<swiper-item>
				<image class="find-image" src="http://113.200.212.12/ymshapi/api/location/img_top_2@3x.png"></image>
			</swiper-item>
			<swiper-item>
				<image class="find-image" src="http://113.200.212.12/ymshapi/api/location/img_top_1@3x.png"></image>
			</swiper-item>
		</swiper> -->
		<image class="find-image" :src="urlImg+findText.img" mode="widthFix"></image>
		<view class="uni-flex uni-row uni-padding-wrap" style="margin-bottom:15upx;">
			<view class="img" style="width: 80upx;height: 80upx;display: flex; justify-content: center;align-items: center;">
				<image :src="urlImg+'fanfdong_pho@2x.png'" style="width: 80upx;height: 80upx;"></image>
			</view>
			<view class="uni-flex uni-column" style="justify-content: space-between;">
				<view style=" line-height:1em;font-size: 32upx;color: #1B1B1B;text-align: left;padding-left: 20upx;padding-top: 52upx;">
					{{findList.findName}}
				</view>
				<view>
					<view style="line-height: 1em; font-size: 22upx;color: #707070; text-align: left;padding-left: 20upx;padding-top: 12upx;">
						{{findText.createTime | moment}}</view>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-flex uni-column" style="">
			<rich-text :nodes="findText.content" class="rich-text"></rich-text>
		</view>
		<!-- 推荐木屋 -->
		<view class="uni-padding-wrap discoveryHouseTitle">推荐木屋</view>
		<view class="uni-flex uni-column uni-padding-wrap">
			<view class="uni-flex uni-column" @tap="chalet" v-for="item in houseList" :key="item.id" style="padding-bottom:12upx; border-bottom: 1upx solid #CCCCCC;">
				<view>
					<image style="width: 100%; height: 450upx;border-radius: 30upx;" :src="urlImg+item.house_img"></image>
					<view class="uni-flex uni-row" style="justify-content: space-between;">
						<view class="left">
							<view style="font-size: 32upx;color: #434343;line-height: 1em;margin-top: 18upx;">{{item.house_name}}/{{ item.house_type_bedroom }}室{{ item.house_type_drawi }}厅{{ item.house_type_toilet }}卫</view>
							<text style="font-size: 26upx;color: #707070;display: block;line-height: 1em;margin-top: 16upx;">{{value.discoveryHouse}}</text>
							<text style="font-size: 30upx;color: #4ccc92;margin-top: 18upx; line-height:1em;">￥{{item.float_price!=null?item.float_price:item.base_price}}</text>
						</view>
						<view class="right">
							<image :src="urlImg+item.user_pic" style="border-radius: 50%;width: 80upx;height: 80upx;margin-top: 18upx; margin-right: 10upx;"></image>
						</view>

					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				id: '',
				urlImg:'',
				cityId:'',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				findList: {
					findName: "小新",
				},
				findText: {},
				title: "推荐木屋",
				houseList: [],
				isShow:false
			}
		},
		components: {
			uniNavBar
		},
		onLoad(option) {
			this.urlImg = this.getApp.api.urlImage
			this.id = option.id
			this.cityId = option.cityId
			console.log(this.cityId)
			this.getDetails()
			this.getHouseList()
		},
		methods: {
			comeBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			getDetails() {
				uni.request({
					url: this.getApp.api.find.findAreaById + this.id,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(JSON.stringify(res));
						this.findText = res.data.findAreaById
						console.log(this.findText)
						this.isShow=true
					}
				})
			},
			chalet(){
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail'
				});
			},
			getHouseList(){
				uni.request({
					url: this.getApp.api.index.houseSerachList,
					method: 'GET',
					data: {
						cityId:this.cityId
					},
					success: res => {
						console.log(JSON.stringify(res))
						this.houseList = res.data.houseListByCityId
					}
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.swiper {
		width: 100%;
		height: 416upx;
	}

	.icon-back {
		width: 40upx;
		height: 40upx;
		left: 30upx;
		top: 20upx;
	}

	.find-image {
		width: 100%;
		height: 416upx;
	}

	.find .img {
		margin-top: 38upx;
	}

	.discoveryHouseTitle {
		line-height: 1em;
		color: $uni-text-color-green;
		font-size: 32upx;
		/* padding-top: 24upx; */
		margin-top:-30upx;
		margin-bottom: 34upx;
		
	}
</style>
