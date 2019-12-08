<template>
	<view class="uni-flex uni-column">
		<uni-nav-bar color="#535353" fixed="true" statusBar="true" left-icon="back" @click-left="comeBack">
			<view class="input-view">
				<input confirm-type="search" class="input" type="text" @confirm="searchAll" v-model="content" placeholder='搜索景区名称,房屋名称'
				 placeholder-style="color:#898989" />
				<uni-icon type="search" size="22" color="#535353" @tap="searchAll"></uni-icon>
			</view>
		</uni-nav-bar>
		<view class="content uni-flex uni-column">
			<slide-frame @specificSerach="specificSerach" :isListShow="0"></slide-frame>
			<scroll-view scroll-y="true" class="cont">
				<goods-list :houseList="houseSerachList"></goods-list>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import slideFrame from "@/components/slide-frame/slide-frame.vue"
	import goodsList from "@/components/goods-list/goods-list.vue"
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'

	export default {
		data() {
			return {
				showClearIcon: false,
				content: '',
				houseSerachList: [],
				id: '',
				checkInTime: '',
				checkOutTime: '',
				personCount: '',
				startPrice: '',
				endPrice: '',
			};
		},
		onLoad(e) {
			this.id = e.id
			this.content = e.content
			this.checkInTime = e.checkInTime
			this.checkOutTime = e.checkOutTime
			this.searchAll()
		},
		components: {
			slideFrame,
			goodsList,
			uniNavBar,
			uniIcon
		},
		methods: {
			comeBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			getHouseList() {
				var reg = /^[\u4E00-\u9FA5A-Za-z\d\-\_]{2,60}$/;
				if (this.content != '' && !reg.test(this.content)) {
					uni.showToast({
						title: '搜索内容输入有误',
						icon: 'none'
					});
				} else {
					uni.request({
						url: this.getApp.api.index.houseSerachList,
						method: 'GET',
						data: {
							content: this.content
						},
						success: res => {
							 console.log(JSON.stringify(res))
							this.houseSerachList = res.data.houseListByCityId
						}
					});
				}
			},
			specificSerach(checkInTime, checkOutTime, personCount, startPrice, endPrice) {
				// console.log(checkInTime+'-'+checkOutTime+'-'+personCount+'-'+startPrice+'-'+endPrice)
				this.checkInTime = checkInTime
				this.checkOutTime = checkOutTime
				this.personCount = personCount
				this.startPrice = startPrice
				this.endPrice = endPrice
				this.searchAll()
			},
			searchAll() {
				var reg = /^[\u4E00-\u9FA5A-Za-z\d\-\_]{2,60}$/;
				if (this.content != '' && !reg.test(this.content)) {
					uni.showToast({
						title: '搜索内容输入有误',
						icon: 'none'
					});
				} else {
					uni.request({
						url: this.getApp.api.index.specificSerach,
						method: 'GET',
						data: {
							checkInTime: this.checkInTime,
							checkOutTime: this.checkOutTime,
							personCount: this.personCount,
							startPrice: this.startPrice,
							endPrice: this.endPrice,
							content: this.content,
						},
						success: res => {
							 console.log(JSON.stringify(res))
							this.houseSerachList = res.data.houseListByCityId
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-search {
		width: 34upx;
		height: 34upx;
	}

	.uni-icon-clear {
		font-size: 38upx;
		color: #bbb;
	}

	.input-view {
		width: 550upx;
		position: relative;
		left: -85upx;
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
		font-size: 24upx;
	}

	.content {
		padding: 0 30upx;
		height: calc(100vh - 154upx);
	}

	.cont {
		height: calc(100vh - 222upx);
	}
</style>
