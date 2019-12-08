
<template><!-- 添加数据 -->
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		
		<view class="content">
			<view v-show="current === 0">
				<view class="uni-flex uni-column listWrap" @tap="openProblemList">
					<view class="uni-flex uni-column settingList">
						<view class="title">民俗经营</view>
						<view class="bottom">旺季才是民宿获取曝光量的绝佳机会</view>
					</view>
					
				</view>
			</view>
			<view v-show="current === 1">
				<view class="uni-flex uni-column listWrap" @tap="openProblemList">
					<view class="uni-flex uni-column settingList">
						<view class="title">民俗经营</view>
						<view class="bottom">旺季才是民宿获取曝光量的绝佳机会</view>
					</view>
					<view class="uni-flex uni-column settingList">
						<view class="title">房子空了怎么办，快用"甩房摔卖"</view>
						<view class="bottom">旺季才是民宿获取曝光量的绝佳机会</view>
					</view>
				</view>
			</view>
			<view v-show="current === 2">
			<view class="uni-flex uni-column listWrap">
				<view class=" uni-flex uni-column settingList" @tap="openProblemList" >
					<view class="title">民俗经营季才是民宿获取曝光量的绝佳机会</view>
					<view class="bottom">旺季才是民宿获取曝光量的绝佳机会季才是民宿获</view>
				</view>
				<view class="uni-flex uni-column settingList">
					<view class="title">民俗经营</view>
					<view class="bottom">旺季才是民宿获取曝光量的绝佳机会</view>
				</view>
				<view class="uni-flex uni-column settingList">
					<view class="title">房子空了怎么办，快用"甩房摔卖"</view>
					<view class="bottom">旺季才是民宿获取曝光量的绝佳机会</view>
				</view>

			</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniSegmentedControl,
			uniNavBar
		},
		data() {
			return {
				items: [
					
					'重要操作指南',
					'新手注意事项',
					'订单多多技巧'
				],
				current: 2,
				colorIndex: 2,
				backgroundColor: '#ffffff',
				styleType: 'button',
				token:'',
				landlordOrderList:''
			
			}

		},
		methods: {
			
			 openProblemList(){
				uni.navigateTo({
					url:'/pages/tenant/index/tenant-main/commonProblemList'
				})			 
			},
			 onClickItem(index) {
			 	if (this.current !== index) {
			 		this.current = index;
			 	}
			 },
			 styleChange(evt) {
			 	if (this.styleType !== evt.target.value) {
			 		this.styleType = evt.target.value;
			 	}
			 },
			 colorChange(evt) {
			 	if (this.styleType !== evt.target.value) {
			 		this.activeColor = evt.target.value;
			 	}
			 }
			
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #ecf1f2;
	}
	
	
	.uni-common-mt {
		margin-top: 0;
		border-bottom: 2px solid #eee;
		background: #fff;
		width: 750upx;
		box-sizing: border-box;
	}
	
	.uni-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.listWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		background-color: #ffffff;
		
	}
	
	.settingList {
		background-color: #ffffff;
		height: 138upx;
		border-bottom: 1upx solid #F7F7F7;
	}
	.settingList .title{
		width: 80%;
		line-height: 1em;
		font-size: 28upx;
		color: #000;
		margin-top: 38upx;
		margin-left: 15upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.settingList .bottom{
		width: 80%;
		font-size: 22upx;
		line-height: 1em;
		margin-top: 12upx;
		margin-left: 15upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.orderOff {
		border-bottom: none;
	}
</style>
