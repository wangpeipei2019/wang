<template>
	<view class="uni-flex uni-column indexWarp" v-if="isShow">
		<uni-nav-bar color="#535353" fixed="true" v-if="isNavShow" statusBar="true" @click-left="openPickCity" @click-right="openLogin">
			<block slot="left">
				<view class="city">
					<image :src="urlImage+'nav_posing@3x.png'" style="width:60upx;height:60upx;" mode="widthFix"></image>
					<view>{{ cityName }}</view>
				</view>
			</block>
			<view class="input-view">
				<input confirm-type="search" class="input" type="text" disabled placeholder="输入搜索内容" @tap="openSearch(cityId)" />
				<uni-icon type="search" size="22" color="#535353"></uni-icon>
			</view>
			<block slot="right" style="display:flex;align-items:center;">
				<view class="chat">
					<image :src="urlImage+'nav_messages@3x.png'" style="width:64upx;height:64upx;" mode="widthFix"></image>
				</view>
			</block>
		</uni-nav-bar>
		<view class="swiper-frame">
			<swiper class="swiper" autoplay="true" :current="advertIndex" @change="changeSwiper" interval="3000" duration="500"
			 circular="true">
				<swiper-item v-for="(item,id) in advertList" :key="id">
					<image class="swiper-item" :src="urlImage+item.img" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="uni-flex subscript" v-if="advertList.length>1">
				<view class="subscript-item" :class="{active:advertIndex==index}" v-for="(item,index) in advertList" :key="index"></view>
			</view>
		</view>
		<scroll-view class="scroll-h" :scroll-top="scrollTop" scroll-y="true"
		 @scroll="scroll">
			<view class="search-frame">
				<view class="search-content">
					<view class="uni-flex search-item">
						<view @tap="openPickCity" class="uni-flex search-address" >
							<image :src="urlImage+'nav_posing@3x.png'"></image>
							<text>{{ cityName }}</text>
						</view>
						<view class="text-right">当前位置</view>
					</view>
					<view class="uni-flex search-item">
						<view class="date">
							<text @tap="pickDate" class="text-data">{{ startTime }}</text>
							<text class="text-right">入住</text>
						</view>
						<view :style="{backgroundImage:'url('+urlImage+'nav_bground.png)'}" class="night">{{checkInCount}}晚</view>
						<view class="date">
							<text @tap="pickDate" class="text-data">{{ endTime }}</text>
							<text class="text-right">离店</text>
						</view>
					</view>
					<view class="uni-flex search-item search-input-box">
						<image :src="urlImage+'nav_search2@3x.png'" mode="widthFix"></image>
						<input type="text" class="search-input" v-model="content"
						 placeholder-style="color:#c2c2c2;" placeholder='搜索“ 景区名称 ”+“ 房屋名称 ”' />
					</view>
					<view class="btn-search" @tap="openSearch(cityId)">搜索民宿</view>
				</view>
				<slide-frame :isListShow="1" @confirmDate="confirmDate" ref="slideFrame"></slide-frame>
			</view>
			<view class="content">
				<view class="characteristic">
					<view class="uni-flex characteristic-box">
						<view class="characteristic-box-left">木屋推荐</view>
						<view class="characteristic-box-right">
							<text space="emsp">{{muwuCurrent + 1}}</text>
							<text space="emsp"> /{{ houseList.length }}</text>
						</view>
					</view>
					<view class="uni-flex characteristic-box-bottom">
						<text space="emsp">情怀人生 一触动心 非凡体验</text>
					</view>
				</view>
				<swiper class="swiper-muwu" circular="true" :current="muwuCurrent" @change="muChange">
					<swiper-item @tap="chalet(item.id,cityId)" v-for="item in houseList" :key="item.id">
						<view class="uni-flex uni-justify-between">
							<view class="swiper-box-muwu">
								<swiper circular="true" autoplay="true" @change="itemChange" interval="3000" duration="500" style="width:520upx;height:430upx;">
									<swiper-item v-for="itemImg in item.imgList" :key="itemImg.house_img_type">
										<image class="swiper-item-muwu" :src="urlImage+itemImg.house_img" mode=""></image>
									</swiper-item>
								</swiper>
								<view class="swiper-content-muwu-top"></view>
								<!-- <image class="swiper-item-muwu" :src="urlImage+item.house_img"></image> -->
								<view class="swiper-content-muwu">
									<view class="swiper-title-muwu">{{ item.house_name }}</view>
									<view class="uni-flex uni-justify-between swiper-text-muwu">
										<view class="uni-inline-item">
											<view class="item-text">“{{ item.house_area }}平{{ item.house_type }}宜居{{ item.fit_number }}人，适合聚会”</view>
										</view>
										<!-- <view class="uni-flex">
											<view class="uni-inline-item" v-for="(val,index) in item.dispList" v-if="index < 3" :key="val.code">
												<image style="height: 70upx; width: 70upx;" :src="urlImage+val.remark"></image>
											</view>
										</view> -->
									</view>
								</view>
							</view>
							<view class="uni-flex uni-column swiper-box">
								<view class="swiper-item-box" :class="{active:itemCurrent==index}" v-for="(itemImg,index) in item.imgList" :key="itemImg.house_img_type">
									<image class="swiper-item-img" :src="urlImage+itemImg.house_img" mode=""></image>
									<view class="house-type">{{ itemImg.house_img_type==0?'封面':itemImg.house_img_type==1?'卧室':itemImg.house_img_type==2?'卫生间':itemImg.house_img_type==3?'客厅':itemImg.house_img_type==4?'厨房':itemImg.house_img_type==5?'其他':'' }}</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>

				<view class="characteristic city-recommend">
					<view class="uni-flex characteristic-box">
						<view class="characteristic-box-left">推荐城市</view>
						<view class="characteristic-box-right">
							<text space="emsp">{{hotCityCurrent + 1}}</text>
							<text space="emsp"> /{{ hotCitys.length }}</text>
						</view>
					</view>
					<view class="uni-flex characteristic-box-bottom">
						<text space="emsp">我们为您推荐了一些城市</text>
					</view>
				</view>
				<swiper class="swiper-tall-lv" previous-margin="70px" next-margin="70px" circular="true" :current="hotCityCurrent"
				 @change="hotCityChange">
					<swiper-item class="swiper-container-lv" v-for="(city,index) in hotCitys" :key="city.id"
					 :item-id="String(index)" :data-year="index" @tap="openRecommendCity(city.id,city.city_id,city.city_name)">
						<view class="swiper-item-lv" :style="{background:city.img? ('url('+ urlImage + city.img +') center no-repeat'):'',backgroundSize:'cover'}"
						 :animation="animationData[index]">
							<view class="swiper-city-text">
								<text>{{city.city_name}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="uni-flex uni-column city-recommend-text">
					<view class="city-rec-title">
						{{hotCitys[hotCityCurrent].title}}
					</view>
					<view class="city-rec-text">
						{{hotCitys[hotCityCurrent].introduce}}
					</view>
				</view>

				<view class="characteristic">
					<view class="uni-flex characteristic-box">
						<view class="characteristic-box-left">特色主题</view>
						<view class="characteristic-box-right">
							<text space="emsp">{{topicCurrent + 1}}</text>
							<text space="emsp"> /{{themeList.length}}</text>
						</view>
					</view>
					<view class="uni-flex characteristic-box-bottom">
						<text space="emsp">每一套都是为您精挑细选的优质木屋，了解木屋详情</text>
					</view>
				</view>
				<swiper class="swiper-characteristic" autoplay="true" circular="true" 
				indicator-dots="true" interval="3000" indicator-color="rgba(255,255,255,.6)"
				 indicator-active-color="rgba(255,255,255,1)" :current="topicCurrent" @change="topicChange">
					<swiper-item class="swiper-characteristic-card" @tap="openTheme(item.id,item.city_id)" v-for="item in themeList" :key="item.id">
						<image :src="urlImage+item.img"></image>
						<view class="featured-text">
							<view class="title">{{item.title}}</view>
							<view class="txt">{{item.introduce}}</view>
						</view>
					</swiper-item>
				</swiper>

				<view class="characteristic">
					<view class="uni-flex characteristic-box">
						<view class="characteristic-box-left">精选景点</view>
						<view class="characteristic-box-right">
							<text space="emsp">{{jindianCurrent + 1}}</text>
							<text space="emsp"> /{{ scenicSpotList.length }}</text>
						</view>
					</view>
					<view class="uni-flex characteristic-box-bottom">
						<text space="emsp">为您规划更独特，安心，更舒适的旅行</text>
					</view>
				</view>
				<view class="scenic-spot">
					<swiper class="swiper-jindian" circular="true" next-margin="66px" previous-margin="5px" @change="jindianChange">
						<swiper-item style="overflow:visible;" @tap="openSelectedScenic(item.id,item.city_id,item.title)" v-for="item in scenicSpotList"
						 :key="item.id">
							<view class="jindian-card">
								<image class="jindian-card-img" :src="urlImage+item.img"></image>
								<view class="jingdian-card-bottom">
									<image :src="urlImage+'pho_1@3x.jpg'" mode=""></image>
									<view class="jingdian-card-bottom-title">{{ item.title }}</view>
									<view class="uni-flex jingdian-card-label">
										<view v-for="(label,index) in item.scenic_label" :key="index">{{ label.route }}</view>
									</view>
									<view class="jingdian-card-bottom-text">{{ item.introduce }}</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view class="offer">
					<view class="offer-top">超级优惠</view>
					<view class="uni-flex offer-bottom">
						<view class="uni-flex uni-column offer-bottom-tab1" :class="[youhuiCurrent == 0? 'selectedTab' : 'unselectedTab']"
						 @tap="youhuiChange(0)">
							<view class="offer-bot-title">新房特惠</view>
							<view :class="[youhuiCurrent == 0? 'selectedTabLine' : 'unselectedTabLine']"></view>
						</view>
						<view class="uni-flex uni-column offer-bottom-tab2" :class="[youhuiCurrent == 1? 'selectedTab' : 'unselectedTab']"
						 @tap="youhuiChange(1)">
							<view class="offer-bot-tilte">低价好房</view>
							<view :class="[youhuiCurrent == 1? 'selectedTabLine' : 'unselectedTabLine']"></view>
						</view>
					</view>
				</view>
				<view v-if="youhuiCurrent === 0" class="product-list">
					<view class="product" @tap="chalet(item.id,cityId)" v-for="item in newHouseList" :key="item.id">
						<view class="image-view">
							<image class="product-image" :src="urlImage+item.house_img"></image>
						</view>
						<view class="product-text">
							<view class="product-title">{{item.additional_explanation}}/{{item.house_name}}</view>
							<view class="product-desc">
								<text>{{item.house_type_bedroom}}居/{{item.house_area}}平米/宜住{{item.fit_number}}人</text>
								<text>{{item.area}}</text>
							</view>
							<view class="product-price">
								<text class="product-price-favour">￥{{item.float_price!=null?item.float_price:item.base_price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="youhuiCurrent === 1" class="product-list">
					<view class="product" @tap="chalet(item.id,cityId)" v-for="item in lowerList" :key="item.id">
						<view class="image-view">
							<image class="product-image" :src="urlImage+item.house_img"></image>
						</view>
						<view class="product-text">
							<view class="product-title">{{item.additional_explanation}}/{{item.house_name}}</view>
							<view class="product-desc">
								<text>{{item.house_type_bedroom}}居/{{item.house_area}}平米/宜住{{item.fit_number}}人</text>
								<text>{{item.area}}</text>
							</view>
							<view class="product-price">
								<text class="product-price-favour">￥{{ item.float_price }}</text>
								<text class="product-price-original">原价￥{{ item.base_price }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<upgrade-modal></upgrade-modal>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar-index.vue';
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue';
	import uniSegmentedControl from '@/components/lib/uni-segmented-control/uni-segmented-control.vue';
	import slideFrame from "@/components/slide-frame/slide-frame.vue"
	import upgradeModal from "@/components/upgrade-modal/upgrade-modal.vue"
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSegmentedControl,
			slideFrame,
			upgradeModal
		},
		props: {

		},
		data() {
			return {
				address: '',
				hasLocation: false,
				urlImage: '',
				advertList: [],
				houseList: [],
				houseData: [],
				houseType: '',
				scenicSpotList: [],
				lowerList: [],
				newHouseList: [],
				scenicLabelList: [],
				themeList: [],
				labelArr: [],
				facilities: [],
				dispList: [],
				muwuCurrent: 0,
				hotCityCurrent: 0,
				animationData: {
					0: {},
					1: {},
					2: {}
				},
				zoomParam: 1.30,
				hotCitys: [],
				topicCurrent: 0,
				jindianCurrent: 0,
				youhuiCurrent: 0,
				youhuiItems: [
					'新房特惠',
					'低价好房'
				],
				activeColor: '#91E5C1',
				styleType: 'text',
				value: '',
				cityId: '',
				err: '',
				success: '',
				cityName: '',
				amapPlugin: null,
				isShow: false,
				isNavShow: false,
				frame: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				checkInTime: '',
				checkOutTime: '',
				startTime: '',
				endTime: '',
				checkInCount: 6,
				content: '',
				advertIndex: 0,
				itemCurrent: 0,
			};
		},
		mounted: function() {
			//#ifdef APP-PLUS || MP-WEIXIN
			this.animation = uni.createAnimation();
			this.animation.scale(this.zoomParam).step();
			this.animationData[0] = this.animation.export();
			//#endif
		},
		created() {
			this.urlImage = this.getApp.api.urlImage
			// #ifdef APP-PLUS
			plus.geolocation.getCurrentPosition(p => {
				this.$store.commit('changeLocation', p.address.city);
				this.getCityId();
			}, (p) => {
				this.getCityId();
			})
			// #endif
			// #ifdef MP-WEIXIN
			this.getCityId();
			// #endif 
			this.sortfn();
		},
		computed: {
			city: function() {
				return this.$store.state.location
			},
			pickCity: function() {
				return this.$store.state.cityName
			}
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
				if (this.old.scrollTop >= 270) {
					this.isNavShow = true
				} else {
					this.isNavShow = false
				}
			},
			changeSwiper(e) {
				this.advertIndex = e.detail.current;
			},
			itemChange(e) {
				this.itemCurrent = e.detail.current
			},
			getDateTime() {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1;
				if (month <= 9) {
					month = '0' + month
				}
				let day = date.getDate();
				if (day <= 9) {
					day = '0' + day
				}
				this.startTime = month + '月' + day + '日'
				this.checkInTime = year + '-' + month + '-' + day
				let endDate = new Date().getTime() + 24 * 60 * 60 * 1000 * 6
				let endYear = new Date(endDate).getFullYear()
				let endMonth = new Date(endDate).getMonth() + 1;
				if (endMonth <= 9) {
					endMonth = '0' + endMonth
				}
				let endDay = new Date(endDate).getDate();
				if (endDay <= 9) {
					endDay = '0' + endDay
				}
				this.endTime = endMonth + '月' + endDay + '日'
				this.checkOutTime = endYear + '-' + endMonth + '-' + endDay
			},
			pickDate() {
				this.$refs.slideFrame.openDate()
			},
			confirmDate(checkInTime, checkOutTime, startTime, endTime, count) {
				this.checkInTime = checkInTime
				this.checkOutTime = checkOutTime
				this.startTime = startTime
				this.endTime = endTime
				this.checkInCount = count
			},
			muChange: function(e) {
				this.muwuCurrent = e.detail.current;
			},
			hotCityChange: function(e) {
				this.hotCityCurrent = e.detail.current;
				//#ifdef APP-PLUS || MP-WEIXIN
				for (let key in this.animationData) {
					if (e.detail.currentItemId == key) {
						this.animation.scale(this.zoomParam).step();
						this.animationData[key] = this.animation.export();
					} else {
						this.animation.scale(1.0).step();
						this.animationData[key] = this.animation.export();
					}
				}
				//#endif
			},
			topicChange: function(e) {
				this.topicCurrent = e.detail.current;
			},
			jindianChange: function(e) {
				this.jindianCurrent = e.detail.current;
			},
			onClickItem: function(index) {
				if (this.youhuiCurrent !== index) {
					this.youhuiCurrent = index;
				}
			},
			youhuiChange: function(index) {
				if (this.youhuiCurrent != index) {
					this.youhuiCurrent = index
				}
			},
			openPickCity() {
				uni.navigateTo({
					url: '/pages/tenant/index/pick-city/pick-city'
				});
			},
			openSearch(id) {
				uni.navigateTo({
					url: '/pages/tenant/index/search/search?id=' + id + '&content=' + this.content + '&checkInTime=' + this.checkInTime +
						'&checkOutTime=' + this.checkOutTime
				});
			},
			openTheme(id, cityId) {
				uni.navigateTo({
					url: '/pages/tenant/index/hot-theme/hot-theme?id=' + id + '&cityId=' + cityId
				});
			},
			openRecommendCity(id, cityId, name) {
				uni.navigateTo({
					url: '/pages/tenant/index/recommend-city/recommend-city?id=' + id + '&cityId=' + cityId + '&name=' + name
				});
			},
			chalet(id, cityId) {
				this.$store.commit('changeHouseCard', id)
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail?id=' + id + '&cityId=' + cityId
				});
			},
			message() {
				uni.navigateTo({
					url: '/pages/tenant/index/index-message/index-message'
				});
			},
			openSelectedScenic(id, cityId, title) {
				uni.navigateTo({
					url: '/pages/tenant/index/selected-scenic/selected-scenic?id=' + id + '&cityId=' + cityId + '&title=' + title
				});
			},
			openLogin() {
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
				}else{
					this.message()
				}
			},
			getCityId() {
				if (this.pickCity != '') {
					this.cityName = this.pickCity
					// console.log(this.cityName + '选择')
				} else if (this.city == '') {
					this.$store.commit('changeLocation', '西安市');
					this.cityName = '西安市'
				} else {
					this.cityName = this.city
					// console.log(this.cityName + '定位')
				}
				uni.request({
					url: this.getApp.api.getCityId,
					method: 'GET',
					data: {
						city: this.cityName
					},
					success: res => {
						if (res.data.code == 0) {
							this.cityId = res.data.cityId[0].cityid
							// console.log(this.cityId)
							this.$store.commit('changeCityId', this.cityId)
							this.getDateTime()
							this.getAdvert()
							this.getHouse()
							this.getHotCity()
							this.getScenicSpot()
							this.getlowerPriceHouse()
							this.getnewHouse()
							this.getThemeRecommend()
						}
					}
				});
			},
			getAdvert() {
				// 广告轮播
				uni.request({
					url: this.getApp.api.index.advert,
					method: 'GET',
					data: {
						advertType: '0'
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.advertList = res.data.advertList
					}
				})
			},
			getHouse() {
				// 木屋类型字典
				uni.request({
					url: this.getApp.api.dict,
					method: 'GET',
					data: {
						type: 'house_type'
					},
					success: res => {
						this.houseData = res.data.dictData
						// console.log(JSON.stringify(res))
					}
				});
				// 木屋推荐
				uni.request({
					url: this.getApp.api.index.houseRecommend,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.houseList = res.data.houseRecommendList
						for (let i in this.houseList) {
							this.houseType = String(this.houseList[i].house_type)
							this.houseList[i].house_type = ''
							for (let k in this.houseType) {
								for (let j in this.houseData) {
									if (this.houseType[k] == this.houseData[j].code) {
										this.houseList[i].house_type = this.houseData[j].value
									}
								}
							}

						}
						this.isShow = true
					}
				});
			},
			getHotCity() {
				// 推荐城市
				uni.request({
					url: this.getApp.api.index.hotCity,
					method: 'GET',
					data: {},
					success: res => {
						this.hotCitys = res.data.targetRecommendList
						// console.log(JSON.stringify(res))
					}
				});
			},
			getScenicSpot() {
				// 景点数据字典
				uni.request({
					url: this.getApp.api.dict,
					method: 'GET',
					data: {
						type: 'scenic_label'
					},
					success: res => {
						this.scenicLabelList = res.data.dictData
					}
				});
				// 精选景点
				uni.request({
					url: this.getApp.api.index.scenicSpot,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.scenicSpotList = res.data.scenicSpotList
						for (let i in this.scenicSpotList) {
							this.labelArr = this.scenicSpotList[i].scenic_label.split(',')
							this.scenicSpotList[i].scenic_label = []
							for (let j in this.labelArr) {
								for (let g in this.scenicLabelList) {
									if (this.labelArr[j] == this.scenicLabelList[g].code) {
										this.scenicSpotList[i].scenic_label.push({
											'route': this.scenicLabelList[g].value
										})
									}
								}
							}
						}
					}
				});
			},
			getlowerPriceHouse() {
				// 低价好房
				uni.request({
					url: this.getApp.api.index.lowerPriceHouse,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.lowerList = res.data.lowerPriceHouse
					}
				});
			},
			getnewHouse() {
				// 新房特惠
				uni.request({
					url: this.getApp.api.index.newHouse,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.newHouseList = res.data.newHouseList
					}
				});
			},
			getThemeRecommend() {
				// 特色主题
				uni.request({
					url: this.getApp.api.index.themeRecommend,
					method: 'GET',
					data: {
						cityId: this.cityId
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.themeList = res.data.themeList
					}
				});
			},
			getLocation() {},
			sortfn(){
				var Arr=[12,33,4,13,32,44,33,16,16,27,24]
				Arr.sort(function(num1,num2){
					console.log(num1-num2)
					return num1-num2
				})
			//	return Arr
				console.log(Arr)  //[4, 12, 13, 16, 16, 24, 27, 32, 33, 33, 44]
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.indexWarp{
		z-index: 0;
		background:#fff;
		position:relative;
	}
	.scroll-h{
		height:100vh;
		position:absolute;
		top:0;
	}
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 8px;
		white-space: nowrap;
	}
	
	.chat {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-right: 18px;
		white-space: nowrap;
	}
	
	.input-view {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #EEEEEE;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}
	
	.input-view .uni-icon {
		line-height: 30px !important;
	}
	
	.input-view .input {
		flex: 1;
		height: 30px;
		line-height: 30px;
		padding: 0 3%;
	}
	.swiper-frame {
		width: 750upx;
		position: relative;

		.subscript {
			position: absolute;
			top: 250upx;
			right: 15upx;
			line-height: 1;
			padding: 10upx 16upx;
			background: rgba(0, 0, 0, .5);
			border-radius: 30upx;

			.subscript-item {
				width: 14upx;
				height: 14upx;
				background: #fff;
				border-radius: 50%;
				margin-right: 12upx;
				transition: all .3s linear;

				&.active {
					width: 28upx;
					border-radius: 28upx;
				}

				&:last-child {
					margin: 0;
				}
			}
		}
	}

	.content {
		padding: 100upx 25upx 0;
		// padding: 0 25upx;
		margin-top: -100upx;
		box-sizing: border-box;
		background: #fff;
		
	}

	.search-frame {
		padding: 0 25upx;
		margin-top: 300upx;
		.search-content {
			width: 700upx;
			height: 400upx;
			border-radius: 15upx;
			background: #fff;
			z-index: 9;
			position: relative;
			box-shadow: 4upx 4upx 30upx #cacaca;
			padding: 30upx 32upx 25upx;
			box-sizing: border-box;

			.search-item {
				justify-content: space-between;
				align-items: center;
				border-top: 1upx solid #fafafa;
				border-bottom: 1upx solid #f3f3f3;
				height: 80upx;

				&:first-child {
					border-top: 0;
				}

				&:nth-child(3) {
					border-bottom: 0;
				}

				view {
					line-height: 80upx;
					color: #494949;
				}
				.search-address{
					align-items:center;
					justify-content:space-between;
					image{
						width:60upx;
						height:60upx;
						margin-right:7upx;
					}
					text{
						font-size:32upx;
					}
				}
				.text-right{
					font-size:26upx;
				}
				.text-data{
					font-size:32upx;
					margin-right:10upx;
				}
				.search-input {
					width: 100%;
					height: 100%;
					color: #424242;
					font-size:32upx;padding-left:50upx;
				}

				.night {
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 92upx;
					height: 40upx;
					line-height: 40upx;
					font-size: 22upx;
					text-align: center;
				}
			}
			.search-input-box{
				position:relative;
				image{
					width:40upx;
					height:40upx;
					position:absolute;
					top:18upx;
					left:0;
				}
			}
			.btn-search {
				border: 0;
				padding: 0;
				color: #fff;
				background: $uni-text-color-green;
				border-radius: 60upx;
				height: 80upx;
				line-height: 80upx;
				font-size: 34upx;
				margin-top: 18upx;
				text-align: center;
				letter-spacing: 3upx;
			}
		}
	}
	.characteristic{
		height: 120upx;
		margin-top: 40upx;
		.characteristic-box{
			justify-content: space-between;
			align-items: center;
			.characteristic-box-left{
				font-size: 38upx;
				line-height: 1.3;
				color: #1B1B1B;
			}
			.characteristic-box-right{
				align-items: center;
				text:nth-of-type(1){
					font-size: 16px;
					color: #1B1B1B;
					margin: 0 3px;
				}
				text:nth-of-type(2){
					font-size: 13px;
					color: #7D7D7D;
				}
			}
		}
		.characteristic-box-bottom{
			font-size: 28upx;
			color: #434343; 
			margin-bottom: 20upx;
		}
	}
	.city-recommend{
	 	margin-top: 15upx; 
	}
	.city-recommend-text{
		margin: 30upx;
		.city-rec-title{
			font-size: 32upx;
			color: #1B1B1B;
		}
		.city-rec-text{
			font-size: 26upx;
			color: #626262;
			height:126upx;
			line-height: 1.6;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
		}
	}
	
	.swiper-characteristic{
		height: 450upx;
		background:transparent;
		border-radius:15upx;
		box-shadow:4upx 4upx 32upx #c2c2c2;
		.swiper-characteristic-card{
			border-radius:15upx;
			image{
				display: block;
				width:100%;
				border-radius:15upx; 
				height: 450upx;
			}
		}
	}
	.scenic-spot{
		width: 100%;
		height: 600upx;
	}
	.swiper-jindian {
		height: 600upx;
	}
	.jindian-card {
		display: block;
		width: 530upx;
		height: 570upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		line-height: 1;
		box-shadow: 0upx 2upx 15upx #dcdcdc;
			.jindian-card-img{
				width: 530upx; 
				height: 300upx;
				border-radius: 15upx 15upx 0 0;
			}
			.jingdian-card-bottom{
				padding:0 25upx;
				position:relative;
				image{
					position:absolute;
					top:-50upx;
					right:20upx;
					width:80upx;
					height:80upx;
					border-radius:50%;
					box-shadow:2upx 2upx 15upx #dcdcdc;
				}
				.jingdian-card-bottom-title{
					width:420upx;
					margin: 10upx 0;
					font-size: 32upx;
					color: #1B1B1B;
					overflow:hidden;
					white-space: nowrap; 
					text-overflow :ellipsis;
				}
				.jingdian-card-label{
					justify-content: flex-start;
					margin:0 0 20upx;
					view{
						background: $uni-bg-color-green;
						color: #64ca9d;
						color:$uni-text-color-green;
						text-align:center;
						font-size: 23upx;
						min-width:100upx;
						height:40upx;
						line-height:40upx;
						padding:0 12upx;
						margin-right:12upx;
						border-radius: 10upx;
					}
				}
				.jingdian-card-bottom-text{
					font-size: 26upx;
					line-height:1.5; 
					color: #626262;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}
	
	}
	.swiper {
		height: 620upx;
	}

	.swiper-item {
		display: block;
		width: 100%;
		height: 620upx;
		line-height: 620upx;
		text-align: center;
	}

	.swiper-muwu {
		height: 470upx;
	}

	.swiper-item-muwu {
		display: block;
		width: 520upx;
		height: 430upx;
		border-radius: 10upx;
	}

	.swiper-item-box {
		margin-bottom: 10upx;
		position: relative;

		.house-type {
			position: absolute;
			bottom: 16upx;
			right: 16upx;
			color: $uni-text-color-inverse;
			font-size: 26upx;
			line-height: 1;
		}

		&:after {
			content: '';
			position: absolute;
			bottom: 7upx;
			left: 16upx;
			display: block;
			width: 0upx;
			border-bottom: 4upx solid rgba(255, 255, 255, .7);
		}

		&.active:after {
			width: 142upx;
			transition: all .5s linear;
		}

		&:last-child {
			margin: 0;
		}
	}

	.swiper-box-muwu {
		position: relative;
		line-height: 1;
		.swiper-content-muwu-top{
			position:absolute;
			top:0;
			left:0;
			width:520upx;
			height:430upx;
		}
		.swiper-content-muwu {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 520upx;

			.swiper-title-muwu {
				background: #fff;
				border-radius: 30upx;
				display: inline-block;
				font-size: 30upx;
				line-height: 1;
				padding: 7upx 16upx;
				margin: 0 20upx 16upx;
			}

			.swiper-text-muwu {
				background: rgba(0, 0, 0, .5);
				padding: 0 20upx;
				height: 80upx;
				border-bottom-left-radius: 10upx;
				border-bottom-right-radius: 10upx;

				.item-text {
					color: $uni-text-color-inverse;
					font-size: 24upx;
					line-height: 80upx;
				}
			}
		}
	}

	.swiper-item-img {
		display: block;
		width: 170upx;
		height: 100upx;
		border-radius: 15upx;
	}

	.swiper-muwu-t {
		height: 470upx;
	}

	.swiper-item-muwu-t {
		display: block;
		width: 620upx;
		height: 470upx;
		line-height: 470upx;
		text-align: center;
	}

	.muwu-card {
		display: block;
		width: 565upx;
		height: 320upx;
		line-height: 290upx;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		background-image: url('~@/static/picture/home_First_recommended_2@3x.png'), url('~@/static/picture/white.png');
		/* #endif */
		/* #ifdef H5 */
		background-image: url(/static/picture/home_First_recommended_2@3x.png), url(/static/picture/white.png);
		/* #endif */
		background-size: 100% 30upx, 100% 100%;
		background-repeat: no-repeat, repeat;
		border-radius: 15upx;
		box-shadow: 2upx 2upx 15upx #f0f0f0;
		margin-bottom: 50upx;
	}

	.swiper-tall-lv {
		display: flex;
		align-items: center;
		height: 600upx;
	}

	.swiper-container-lv {
		display: flex;
		align-items: center;
		overflow: visible;
	}

	.swiper-item-lv {
		height: 460upx;
		width: 320upx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		border-radius: 15upx;
		box-shadow:4upx 4upx 23upx #eaeaea;
	}
	.swiper-city-text{
		margin: 12upx;
		font-size: 11px;
		line-height: 11px; 
		color: #434343; 
		background-color: #FFFFFF; 
		padding: 3px; 
		border-radius: 3px;
	}
	.offer{
		height: 120upx;
		margin-top: 20upx;
		.offer-top{
			font-size: 38upx;
			line-height: 1.3;
			color: #1B1B1B;
		}
		.offer-bottom{
			font-size: 13px;
			margin-bottom: 20upx;
			.offer-bottom-tab1{
				align-items:center;
				margin-left: 15upx;
			}
			.offer-bottom-tab2{
				align-items:center;
				margin-left: 30upx;
			}
			.offer-bot-tltle{
				font-size: 32upx;
				line-height:1.5;
			}
		}
	}
	.selectedTab {
		color: #434343;
	}

	.unselectedTab {
		color: #707070;
	}

	.selectedTabLine {
		background: $uni-text-color-green;
		border-radius: 10upx;
		width: 80upx;
		height: 6upx;
	}

	.unselectedTabLine {
		background: #fff;
	}


	.product-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
	}

	.product {
		margin: 0 0 20upx;
		display: flex;
		flex-direction: column;
		box-shadow: 2upx 2upx 16upx #dcdcdc;
		border-radius: 15upx;
	}

	.image-view {
		line-height: 1em;
	}

	.product-image {
		height: 225upx;
		width: 345upx;
		border-radius: 15upx;
	}

	.product-text {
		width: calc(345upx - 30upx);
		padding-left: 15upx;
		padding-right: 15upx;
		margin-top: 30upx;
	}

	.product-title {
		width: 330upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.3;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 30upx;
		color: #1B1B1B;
		margin: 0 0 15upx;
	}

	.product-desc {
		width: 330upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.3;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 24upx;
		color: #707070;
		margin: 0 0 15upx;
	}

	.product-desc text {
		margin-right: 15upx;
	}

	.product-desc text:last-child {
		margin: 0;
	}

	.product-price {
		font-size: 28upx;
		line-height: 1.3;
		position: relative;
		margin: 0 0 15upx;
	}

	.product-price-original {
		color: #b3b3b3;
		text-decoration: line-through;
		margin-left: 16upx;
		font-size: 20upx;
	}

	.product-price-favour {
		color: #F36B64;
		font-weight: bold;
	}

	.product-tip {
		position: absolute;
		right: 10upx;
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.featured-text {
		width: 560upx;
		height: 200upx;
		box-sizing: border-box;
		padding: 18upx 30upx;
		background: #fafafa;
		opacity: .9;
		position: absolute;
		left: 50%;
		bottom: 60upx;
		transform: translateX(-50%);
		border-radius: 15upx;

		.title {
			font-size: 36upx;
			color:#1B1B1B;
			text-align: center;
			line-height: 1;
			margin: 0 0 22upx;
		}

		.txt {
			font-size: 26upx;
			color: #626262;
			line-height: 1.4em;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
		}
	}
	
</style>
