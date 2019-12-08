<template>
	<view class="chaletDdetail" v-if="isShow">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<uni-swiper-dot :info="houseImg" :current="current" mode="long" :dots-styles="dotsStyles" >
				<swiper class="swiper chaletDdetail-swiper" @change="change">
					<swiper-item v-for="item in houseImg" :key="item.house_id">
						<image class="chaletDdetail-swiper-image" :src="urlImage+item.house_img"></image>
					</swiper-item>
				</swiper>
				</uni-swiper-dot>
			</view>
		</view>
		<view class="chalet">
			<view class="chaletTitel chaletT">
				{{hoouseBaseInfo.area}}/{{hoouseBaseInfo.address}}/{{houseType.house_type_bedroom}}室{{houseType.house_type_drawi}}厅{{hoouseBaseInfo.houseName}}
			</view>
			 <view class="guigeWrap uni-flex uni-row marginBottom">
				 <view class="guige">
				 	<image :src="urlImage+'tab_home_normal@xxhdpi.png'"></image>
					<view class="titlName">整套出租/{{hoouseBaseInfo.houseArea}}m²</view>
				 </view>
				<view class="guige">
					<image :src="urlImage+'wooden_room@2x.png'"></image>
					<view class="titlName">{{houseType.house_type_bedroom}}室{{houseType.house_type_drawi}}厅{{houseType.house_type_toilet}}卫</view>
				</view>
				<view class="guige">
					<image :src="urlImage+'medium_sized.png'"></image>
					<view class="titlName">宜住{{hoouseBaseInfo.fitNumber}}人{{houseBedNumber}}床</view>
				</view>
			</view>
			<view class="userWarp marginBottom">
				<view class="uni-flex uni-row userInfo" @click="landlord(hoouseBaseInfo.id)">
					<view class="uni-flex uni-row left">
						<view>
							<image class="chaletImg" :src="urlImage+userInfo.user_pic"></image>
						</view>
						<view class="uni-media-list-text-top">{{userInfo.user_name}}</view>
					</view>
					<view class="uni-flex uni-row right">
						<view>实名认证</view>
						<view>
							<image :src="urlImage+'my_left_icon.png'"></image>
						</view>
					</view>
				</view>
			</view>
			
			<view>
				<view class="miaoshu"> 
					<view class="chaletTitel">房屋介绍</view>
					<view class="text">
						<text>{{hoouseBaseInfo.houseFeature}}</text>
					</view>
					
				</view>
				<view class="miaoshu" :class="{'isOpen':displayOne}">
					<view class="chaletTitel">交通介绍</view>
					<view class="text">
						<text>{{hoouseBaseInfo.houseAddress}}</text>
					</view>
					
				</view>
				<view class="miaoshu" :class="{'isOpen':displayTwo}">
					<view class="chaletTitel">周边介绍</view>
					<view class="text">
						<text>{{hoouseBaseInfo.houseNearbyIntroduction}}</text>
					</view>
					
				</view>
				<view class="maoll" :class="{'isOpen':displayMaoll}" @tap="openMaoll">查看更多</view>
			</view>
			<view class="sheshi marginBottom">
				<view class="chaletTitel">房屋设施</view>
				<view class="uni-flex uni-column sheshiStyle">
					<view class="uni-flex uni-row sheshiStyle-box">
						<view class="uni-flex uni-column sheshiStyle-image-box" v-for="(item,index) in facilitiesList" v-if="index<4" :key="item.code">
							<view class="imgWrap">
								<image :src="urlImage+item.remark"></image>
							</view>
							<text>{{item.value}}</text>
						</view>
						<view class="uni-flex uni-column sheshiStyle-text-box" @click="sheshi">
							<view class="imgWrap imgBg">{{facility}}+</view>
							<text>全部</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="chaletMap">
				<view class="chaletTitel chalet-padding">房屋位置</view>
				<view class="uni-flex uni-row hoousePos">
					<view>
						<image :src="urlImage+'wooden_location_icon@2x.png'"></image>
					</view>
					<view>
						{{hoouseBaseInfo.houseName}}{{hoouseBaseInfo.additionalExplanation}}{{hoouseBaseInfo.houseNumber!=null?hoouseBaseInfo.houseNumber:''}}
					</view>
				</view>
				<view>
					<!-- <image :src="urlImage+'mappng.jpg'"></image> -->
					<map @tap="openDetail" style="width:750upx;height:400upx;" :latitude="hoouseBaseInfo.latitude" :longitude="hoouseBaseInfo.longitude" :markers="covers">
						<!-- <cover-view class="address" style="font-size: 24upx;color: #1b1b1b;padding:0 10upx;"></cover-view> -->
					</map>
				</view>
			</view>
			<view class="checkCalendar marginBottom">
				<view class="chaletTitel">房源日历</view>
				<!-- <view>日历</view> -->
				<calendar 
				@pickData="parentData" 
				@click-left="leftTab" 
				@click-right="rightTab" 
				left-icon="arrowleft" 
				right-icon="arrowright"
				startDate="2019-06-01" 
				endDate="2019-06-05" 
				daysCount="365"
				:isFlag="1"></calendar>
			</view>
			<view class="informWarp marginBottom">
				<view class="chaletTitel">入住须知</view>
				<view class="inform">
					<view class="uni-flex uni-column">
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList">入住时间：</view>
							<view class="informListRight">{{hoouseBaseInfo.checkInTime!=null?hoouseBaseInfo.checkInTime+'以后':'暂无数据'}}</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList">退房时间：</view>
							<view class="informListRight">{{hoouseBaseInfo.checkOutTime!=null?hoouseBaseInfo.checkOutTime+'以前':'暂无数据'}}</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList">接待时间：</view>
							<view class="informListRight">{{hoouseBaseInfo.receptionTime!=null?hoouseBaseInfo.receptionTime:'暂无数据'}}</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList">最少入住：</view>
							<view class="informListRight">{{hoouseBaseInfo.checkInDays!=null?hoouseBaseInfo.checkInDays+'天':'暂无数据'}}</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList"><text>收押金：</text></view>
							<view class="informListRight">{{hoouseBaseInfo.deposit==0?'￥'+hoouseBaseInfo.depositMoney:'不收取押金'}}</view>
						</view>
						<!-- <view class="uni-flex uni-row">
							<view class="informList">房客守则：</view>
							<view class="informListRight" style="color: #2dca93;">查看详情</view>
						</view> -->
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList">打扫卫生：</view>
							<view class="informListRight">{{houseAllInfo.cleanTime!=null?houseAllInfo.cleanTime:'暂无数据'}}</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="uni-flex uni-row informList">被单更换：</view>
							<view class="informListRight">{{houseAllInfo.sheetsTime!=null?houseAllInfo.sheetsTime:'暂无数据'}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="refund">
				<view class="chaletTitel chalet-padding">退款政策</view>
				<view class="refundWrap marginBottom">
					<view class="line"></view>
					<view class="uni-flex uni-column RefundStandard">
						<view class="uni-flex uni-row">
							<view class="RefundStandard-left-box">
								<view>
									<view class="left">{{hoouseBaseInfo.refundRule!=null?hoouseBaseInfo.refundRule:'如取消订单，全额退款'}}</view>
									<image :src="urlImage+'refund1.png'"></image>
								</view>
							</view>
							<view class="RefundStandard-right-box">
								<view>
									<view class="right">如取消订单，{{hoouseBaseInfo.refundRulePercentage!=null?'扣除未住房费的'+hoouseBaseInfo.refundRulePercentage+'%':'暂无数据'}}</view>
									<image :src="urlImage+'refund2.png'"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="refundList">
						<view class="uni-flex uni-column">
							<view class="uni-flex uni-row" style=" justify-content: space-between;">
								<view class="uni-flex uni-column" style="text-align: center;">
									<view class="" style="width: 100upx;">
										<image style=" width: 60upx; height: 60upx; margin: 0 auto;" :src="urlImage+'wooden_refund_ok@2x.png'"></image>

										<view style="width: 100upx;line-height: 1em;">
											<text style="font-size: 22upx; color: #666666;">订单成功</text>
										</view>
									</view>
								</view>
								<view class="uni-flex uni-column" style="text-align: center;">
									<view class="" style="width: 120upx;">
										<image style=" width: 60upx; height: 60upx; margin: 0 auto;" :src="urlImage+'wooden_refund_time@2x.png'"></image>
										<view style="width: 120upx;line-height: 1em;">
											<text style="font-size: 22upx; color: #666666;">{{hoouseBaseInfo.checkInTime!=null?'入住日前'+hoouseBaseInfo.refundRuleDay+'天'+hoouseBaseInfo.checkInTime:'暂无数据'}}</text>
										</view>
									</view>
								</view>
								<view class="uni-flex uni-column " style="text-align: center;">
									<view class="" style="width: 100upx;">
										<image style="width: 60upx; height: 60upx; margin: 0 auto;" :src="urlImage+'wooden_refund_time@2x.png'"></image>
										<view class="" style="width: 100upx;line-height: 1em;">
											<text style="font-size: 22upx; color: #666666; line-height: 12upx;">{{hoouseBaseInfo.checkOutTime!=null?'离店日'+hoouseBaseInfo.checkOutTime:'暂无数据'}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="nearby">
				<view class="chaletTitel chalet-padding nearbyColor">附近木屋</view>
				<scroll-view class="scroll-view_H scroll" scroll-x :scroll-left="scrollLeft">
					<view class="productWarp" v-for="item in queryHouseListByCityId" @tap="openDeatils(item.id)" :key="item.id" style="">
						<view class="image">
							<image class="product-image" :src="urlImage+item.house_img"></image>
						</view>
						<view class="product-title">{{item.house_name}}</view>
						<view class="uni-flex uni-row product-desc">
							<text>{{item.house_type_bedroom}}居/{{item.house_area}}平/{{item.fit_number}}人</text>
							<text>{{item.area}}</text>
						</view>
						<view class="product-price">
							<text class="product-price-favour">￥{{item.float_price!=null?item.float_price:item.base_price}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="pay" @tap="openConfirmOrder">立即预定</view>
	</view>
	</view>
</template>

<script>
	import calendar from "@/components/date-picker/date-picker.vue"
	import uniSwiperDot from '@/components/lib/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		data() {
			return {
				id: '',
				isShow:false,
				token:'',
				urlImage: '',
				"scrollLeft": 0,
				displayOne:true,
				displayTwo:true,
				displayMaoll:false,
				houseAllInfo: {},
				houseCalendar: [],
				hoouseBaseInfo: {},
				houseType: [],
				facilitiesList: [],
				facility: '',
				houseImg: [],
				userInfo: {},
				queryHouseListByCityId: [],
				startTime: '',
				endTime: '',
				houseBedNumber: 0,
				covers: [{
					latitude: 39.9085,
					longitude: 116.39747,
					// #ifdef APP-PLUS
					iconPath: '../../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../../static/location.png',
					// #endif
				}, {
					latitude: 39.90,
					longitude: 116.39,
					// #ifdef APP-PLUS
					iconPath: '../../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../../static/location.png',
					// #endif
				}],
				current: 0,
				 dotsStyles: {
					backgroundColor: 'rgba(255, 255, 255,0.3)',
					border: '1px rgba(255, 255, 255,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 255, 255,0.9)',
					selectedBorder: '1px rgba(255, 255, 255,0.9) solid'
				}
			}
		},
		onLoad(e) {
			this.token = uni.getStorageSync('token');
			this.id = e.id
			this.urlImage = this.getApp.api.urlImage
			this.getHouseDetails()
			this.getHouseList()
		},
		computed: {
			cityId() {
				return this.$store.state.cityId
			}
		},
		components: {
			calendar,
			uniSwiperDot
		},
		methods: {
			leftTab() {
				console.log('左')
			},
			rightTab() {
				console.log('右')
			},
			landlord(id) {
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/landlord-detail?id='+id
				});
			},
			sheshi() {
				uni.navigateTo({
					url: 'chalet-sheshi?id=' + this.id
				});
			},
			parentData(e,count) {
				if (e.length != 0) {
					this.startTime = e[0].re
					this.endTime = e[1].re
					console.log(this.startTime)
					console.log(this.endTime)
					console.log(count)
				} else {
					this.startTime = ''
					this.endTime = ''
				}
			},
			openDeatils(id) {
				uni.redirectTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail?id=' + id + '&cityId=' + this.cityId
				});
			},
			openConfirmOrder() {
				if (this.token == '') {
					this.openLogin()
				} else {
					if (this.startTime != '' && this.endTime != '') {
						this.count()
					} else {
						uni.showToast({
							title: '请选择入住时间与离店时间',
							icon: 'none',
							duration: 2000
						});
					}
				}
			},
			count() {
				uni.request({
					url: this.getApp.api.tenant.submitData,
					method: 'POST',
					data: {
						startTime: this.startTime,
						endTime: this.endTime
					},
					header: {
						token: this.token
					},
					success: res => {
						if(res.data.code==0){
							uni.navigateTo({
								url: '/pages/tenant/order/confirm-order/confirm-order?id=' + this.id + '&startTime=' + this.startTime +
									'&endTime=' + this.endTime + '&checkInTime=' + this.hoouseBaseInfo.checkInTime + '&checkOutTime=' + this.hoouseBaseInfo
									.checkOutTime
							});
						}else{
							this.openLogin()
						}
					},
					fail: () => {
						uni.showToast({
							title: '网路异常请重试',
							icon: 'none'
						});
					}
				});
			},
			openLogin(){
				var res = global.isLogin();
				if (!res) {
					uni.showModal({
						title: '请登录',
						content: "请登录",
						success: (res) => {
							if(res.confirm){
								uni.navigateTo({
									url: "/pages/login/login"
								});
								this.$store.commit('changeBackIndex', 0)
							}
						}
					})
				}
			},
			openDetail() {
				uni.navigateTo({
					url: 'map-detail?position=' + this.hoouseBaseInfo.locationAddress+'&latitude='+ this.hoouseBaseInfo.latitude +'&longitude='+this.hoouseBaseInfo.longitude
				});
			},
			getHouseDetails() {
				uni.request({
					url: this.getApp.api.index.houseDetails,
					method: 'GET',
					data: {
						houseId: this.id
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.houseAllInfo = res.data.houseAllInfo
						this.hoouseBaseInfo = res.data.houseAllInfo.hoouseBaseInfo
						this.covers[0].latitude =  res.data.houseAllInfo.hoouseBaseInfo.latitude
						this.covers[0].longitude = res.data.houseAllInfo.hoouseBaseInfo.longitude
						this.covers[1].latitude =  res.data.houseAllInfo.hoouseBaseInfo.latitude
						this.covers[1].longitude = res.data.houseAllInfo.hoouseBaseInfo.longitude
						this.houseType = res.data.houseAllInfo.houseType[0]
						if (this.houseType.house_bed_one != null) {
							this.houseBedNumber += parseInt(this.houseType.house_bed_one)
						}
						if (this.houseType.house_bed_two != null) {
							this.houseBedNumber += parseInt(this.houseType.house_bed_two)
						}
						if (this.houseType.house_bed_three != null) {
							this.houseBedNumber += parseInt(this.houseType.house_bed_three)
						}
						if (this.houseType.house_bed_four != null) {
							this.houseBedNumber += parseInt(this.houseType.house_bed_four)
						}
						this.facilitiesList = res.data.houseAllInfo.houseFacilities[0].kitchenList.concat(res.data.houseAllInfo.houseFacilities[
							0].buildList)
						this.facilitiesList = this.facilitiesList.concat(res.data.houseAllInfo.houseFacilities[0].dispList)
						this.facilitiesList = this.facilitiesList.concat(res.data.houseAllInfo.houseFacilities[0].homeList)
						this.facilitiesList = this.facilitiesList.concat(res.data.houseAllInfo.houseFacilities[0].safeList)
						this.facilitiesList = this.facilitiesList.concat(res.data.houseAllInfo.houseFacilities[0].toiletriesList)
						this.facility = res.data.houseAllInfo.houseFacilities[0].kitchenList.length + res.data.houseAllInfo.houseFacilities[
								0].safeList.length + res.data.houseAllInfo.houseFacilities[0].dispList.length + res.data.houseAllInfo.houseFacilities[
								0].buildList.length + res.data.houseAllInfo.houseFacilities[0].toiletriesList.length + res.data.houseAllInfo
							.houseFacilities[0].homeList.length
						// console.log(this.facility)
						this.houseImg = res.data.houseAllInfo.houseImg
						this.userInfo = res.data.houseAllInfo.userInfo[0]
						this.increaseFootprint()
						this.isShow = true
					}
				});
			},
			getHouseList() {
				uni.request({
					url: this.getApp.api.index.houseListByCityId,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						this.queryHouseListByCityId = res.data.queryHouseListByCityId
						for(var i=0;i<res.data.queryHouseListByCityId.length;i++){
							var str=res.data.queryHouseListByCityId[i].additional_explanation+'/'+res.data.queryHouseListByCityId[i].house_name
							this.queryHouseListByCityId[i].house_name=str
							if(this.queryHouseListByCityId[i].house_name.length>20){
								this.queryHouseListByCityId[i].house_name=this.queryHouseListByCityId[i].house_name.slice(0,21)+'...'
							}
						}
					}
				});
			},
			openMaoll(){
				 if(this.hoouseBaseInfo.houseAddress!=''&&this.hoouseBaseInfo.houseAddress!=null){
					this.displayOne=false;
				}
				if(this.hoouseBaseInfo.houseNearbyIntroduction!=''&&this.hoouseBaseInfo.houseNearbyIntroduction!=null){
					this.displayTwo=false;
				}
				this.displayMaoll=true;
			},
			change(e) {
				this.current = e.detail.current
			},
			increaseFootprint(){
				uni.request({
					url: this.getApp.api.footprint.increaseFootprint,
					method: 'POST',
					header:{
						token:this.token
					},
					data: {
						footprintId:this.id
					},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chaletDdetail {
		width: 100%;
		height: 100%; 
		background-color: #2bca93;
		background-color: #f8f6ff;
		overflow-x: auto;
	}
	.isOpen{
		display: none;
	}	
	.chaletDdetail-swiper{
		height: 400upx;
		width: 100%;
	}
	.chaletDdetail-swiper-image{
		width:750upx;
	}
	.marginBottom{
		margin-bottom: 20upx;
	}
	.chalet {
		box-sizing: border-box;
	}
	.chalet-padding {
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.chaletTitel {
		background-color: #ffffff;
		padding-top: 10upx;
		padding: 10upx 30upx 0 20upx;
		font-size: 38upx;
		color: #000000;
		line-height: 72upx;
	}
	.chaletT{
		line-height: 58upx;
		font-size:36upx;
	}
	.chaletImg {
		border-radius: 50%;
		width: 88upx;
		height: 88upx;
	}
	.guigeWrap {
		width: 100%;
		height: 150upx;
		display: flex;
		flex-direction: row;
		padding-bottom: 10upx;
		justify-content: center;
		background-color: #ffffff;
	}
	.guige {
		display: flex;
		width: 30%;
		height: 150upx;
		justify-content: center;
		flex-direction: column;
	}
	.userWarp{
		padding: 27upx 30upx; 
		width: calc(100% - 60upx);
		background-color: #ffffff;
	}
	.userInfo{
		justify-content: space-between;
	}
	.userInfo .left{
		justify-content: start;
	}
	.userInfo .left :nth-of-type(2){
		padding-left: 25upx;
		line-height: 88upx;
	}
	.userInfo .right{
		justify-content: end;
	}
	.userInfo .left image{
		width: 88upx;
		height: 88upx;
		vertical-align: top;
		border-radius: 50%;
	}
	.userInfo .right image{
		width: 30upx;
		height: 30upx;
		vertical-align: top;
		margin:30upx 0 0 15upx;
	}
	.userInfo .right :nth-of-type(1){
		font-size: 22upx;
		color: #707070;
		line-height: 88upx;
	}
	.titlName {
		text-align: center;
		font-size: 28upx;
		color: #1B1B1B;
	}
	.titleText {
		text-align: center;
		font-size: 20upx;
		color: #707070;
	}
	.guige image {
		margin: 0 auto;
		width: 64upx;
		height: 64upx;
	}
	.shehsi text {
		font-size: 22upx;
		color: #707070;
	}
	.imgWrap {
		width: 106upx;
		height: 106upx;
		border-radius: 50%;
		background: #ecf1f2;
	}
	.imgWrap image {
		width: 80upx;
		height: 80upx;
		margin: 13upx auto;
	}
	.imgBg {
		color: $uni-text-color-green;
		font-size: 36upx;
		text-align: center;
		line-height: 100upx;
	}
	.miaoshu{
		background-color: #ffffff;
	}
	.miaoshu .text {
		font-size: 30upx;
		color: #434343;
		padding: 0 30upx 0 30upx;
		background-color: #ffffff;
	}
	.miaoshu .text text{
		line-height: 16upx;
	}
	.maoll{
		color: $uni-text-color-green;
		font-size: 28upx;
		padding-left: 30upx;
		background-color: #ffffff;
		line-height: 70upx;
		height: 70upx;
		}
	.sheshiStyle{
		padding: 15upx 30upx 15upx 30upx;
		background-color: #ffffff;
	}
	.sheshiStyle text{
		color:#686868;
	}
	.sheshiStyle-box{
		justify-content: space-between;
	}
	.sheshiStyle-image-box{
		text-align: center;
	}
	.sheshiStyle-text-box{
		text-align: center;
	}
	.chaletMap {
		position: relative;
	}
	.chaletMap image {
		width: 100%;
		height: 400upx;
		vertical-align: top;
		position: relative;
	}
	.hoousePos{
		padding: 0 30upx 30upx 20upx;
		background-color: #ffffff;
	}
	.hoousePos view:nth-of-type(1){
		width: 30upx;
		height: 30upx;
		margin-right: 10upx;
		margin:16upx 10upx 0 0;
	}
	.hoousePos view:nth-of-type(2){
		font-size: 32upx;
		color: #1b1b1b;
	}
	.hoousePos image{
		width: 30upx;
		height: 30upx;
		
	}
	.address {
		margin: 0 auto;
		margin-left: 16upx;
		padding-left: 30upx;
		background: #FFFFFF;
		width: 670upx;
		width: 90%;
		height: 102upx;
		z-index: 3;
		position: absolute; 
		top: 280upx;
		border-radius: 15upx;
		box-shadow: 8upx 4upx 9upx #C8C7CC;
	}
	.address image {
		width: 62upx;
		height: 62upx;
		position: absolute;
		top: 20upx;
		right: 30upx;
	}
	.checkCalendar {
		width: 100%;
		box-sizing: border-box;
	}
	.informWarp {
		width: 100%;
		background-color: #ffffff;
	}
	.inform {
		margin: 0 auto;
		padding: 0 30upx 20upx 30upx;
		background-color: #ffffff;
	}
	.informList {
		justify-content: end;
		padding-left: 35upx;
		width: 160upx;
		color: #686868;
		font-size: 32upx;
	}
	.informList text{
		padding-left: 28upx;
	}
	.informListRight {
		padding-left: 28upx;
		font-size: 32upx;
		color: #323232;
		width: 50%;
	}
	.refund{
		margin-bottom: 8upx;
	}
	.refundWrap {
		width: 100%;
		height: 280upx;
		background: #FFFFFF;
		position: relative;
	}
	.line {
		width: calc( 100% - 94upx );
		height: 2upx;
		border-bottom: 4upx dashed #adadad;
		position: absolute;
		top: 130upx;
		left: 34upx;
	}
	.RefundStandard {
		width: calc( 100% - 88upx );
		margin: 0 auto;
	}
	.RefundStandard-left-box{
		text-align: center;
		width: 100%;
		height:100upx;
	}
	.RefundStandard-left-box image{
		width: 30upx;
		height: 20upx;
		position: absolute;
		top:92upx;
	}
	.RefundStandard-right-box{
		text-align: center; 
		width: 100%;
	}
	.RefundStandard-right-box image{
		width: 30upx;
		height: 20upx;
		position: absolute;
		top: 118upx;
	}
	.RefundStandard .right{
		width: 280upx;
		padding: 0 16upx;
		height: 76upx;
	 	font-size: 22upx; 
		color: $uni-text-color-green;
		/* background: #e6faf3; */
		/* border: 2upx solid #2BCA93; */
		position: relative;
		top: 40upx;
		margin: 0 auto;
	}
	 .RefundStandard .left{
		width: 260upx;
	/* 	line-height: 50upx;
		height: 50upx; */
		margin: 0 auto;
		position: relative;
		top: 40upx;
		font-size: 22upx;
		color: #555555;
		margin: 0 auto;
	} 
	 .refundList {
		width: calc( 100% - 20upx );
		padding-left: 10upx;
		padding-right: 10upx;
		position: relative;
	} 
	.nearby {
		margin-bottom: 88upx;
	}
	.scroll-view_H{
		white-space: nowrap;
		border-bottom: 0;
		/* height: 480upx; */
		padding:0 0 0 30upx;
		width: calc( 100% - 30upx );
		background-color: #ffffff;
	}
	.nearbyColor {
		line-height: 90upx;
		color: $uni-text-color-green;
	}
	.productWarp{
		width: 400upx;
	 	/* height: 460upx; */
		margin-right: 30upx;
		margin-bottom: 30upx;
		display: inline-block;
		vertical-align: top;
	}
	.productWarp .image{
		width: 400upx;
		height: 270upx;
		margin-bottom: 12upx;
	}
	
	.productWarp :nth-last-of-type(1){
		margin-right: 0;
	}
	.product-image{
		width: 400upx; 
		height: 270upx;
		border-radius: 15upx;
		vertical-align: top;
		
	}
	.product-title{
		font-size: 30upx;
		color: #1B1B1B;
		width: 380upx;
		white-space:normal;
		margin: 0 auto;
		line-height: 1.3; 
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; 
		max-height: 80upx;
	}
	.product-desc{
		justify-content: space-between;
		font-size: 24upx;
		color: #707070;
		margin: 8upx auto 0 auto;
		width: 380upx;
		line-height: 1.5; 
	}
	.product-desc text{
		display: block;
		padding-right: 6upx;
	}
	.product-desc text:nth-of-type(1){
		margin-right:15upx;
	}
	.product-price-favour{
		padding-left: 14upx;
	}
	.pay {
		height: 88upx;
		width: 750upx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;		line-height: 88upx;
		color: #FFFFFF;
		font-size: 34upx;
		z-index: 1999;
		text-align: center;
		background: $uni-color-level-gradual;
	}
</style>
