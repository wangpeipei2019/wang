<template>
	<view v-if="isShow">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view class="" v-for="item in dataList" :key="item.id">
				<view>
					<view class="uni-flex uni-column page-content">
						<view class="uni-flex uni-row" style="justify-content: space-between;">
							<view class="orderName">{{item.order_status==0?'待付款':item.order_status==1?'待确认':item.order_status==2?'待入住':item.order_status==3?'进行中':item.order_status==4?'已取消':item.order_status==5?'已结束':'订单异常'}}</view>
							<view class="orderTime" v-if="item.order_status==0">付款剩余时间：30分钟</view>
						</view>
						<view class="uni-flex uni-row" @tap="orderPay(item.order_number)">
							<view class="orderImg">
								<image :src="urlImage+item.house_img"></image>
							</view>
							<view class="orderDetail">
								<view class="orderTitle">{{item.house_name}}</view>
								<view class="orderCont">{{item.start_time}} / {{item.end_time}} 共{{item.check_in_count}}晚</view>
								<view class="orderCont">{{item.rental_Mode}}</view>
								<view class="orderCont">订单总额：￥{{item.order_total_money}}</view>
							</view>
						</view>
						<view class="uni-flex uni-row orderPay" style="justify-content: flex-end;text-align: center;">
							<view class="orderBtn btnActive" v-if="item.order_status==0" @tap="orderPay(item.order_number)">去支付</view>
							<view class="orderBtn"  v-else-if="item.order_status==2" @tap="orderPay(item.order_number)">确认入住</view>
							<view class="orderBtn"  v-else-if="item.order_status==4 || item.order_status==5" @tap="openIndex(item.house_id)">再次预定</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					'待付款',
					'待入住',
					'进行中',
					'已结束',
					'全部'
				],
				urlImage:'',
				current: 4,
				colorIndex: 4,
				backgroundColor: '#ffffff',
				styleType: 'button',
				dataList: [],
				token: '',
				isShow:false
			}
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.current = e.index
			this.getOrderList()
		},
		methods: {
			openIndex(id){
				this.$store.commit('changeHouseCard',id)
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail?id='+id,
				});
			},
			getOrderList() {
				console.log(this.current)
				uni.request({
					url: this.getApp.api.tenant.orderList,
					method: 'POST',
					data: {
						orderStatus: this.current
					},
					header: {
						token: this.token
					},
					success: res => {
						console.log(JSON.stringify(res))
						this.dataList = res.data.lInfoEntities
						this.isShow=true
					}
				});
			},
			onClickItem(index) {
				this.current = index;
				this.getOrderList()
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
			},
			orderPay(order_number) {
				// // console.log(e)
				// console.log(e.currentTarget.id)
				uni.navigateTo({
					url: "main-orderPay?order_number="+order_number
				})
			},
			cancel() {
				uni.navigateTo({
					url: "cancel"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #ecf1f2;
		padding-top:70upx;
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}

	uni-radio-group uni-label {
		padding: 0;
	}

	.uni-list-item__container {
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-common-mt {
		margin-top: 0;
		position:fixed;
		background:#fff;
		z-index: 99;
		border-bottom: 3upx solid #f0f0f0;
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

	.page-content {
		width: calc(100% - 60upx);
		height: 100%;
		padding: 0 30upx 28upx 30upx;
		position: relative;
		margin-bottom: 2upx;
		background-color: #ffffff;

	}

	.orderName {
		font-size: 28upx;
		color: #333333;
		line-height: 1em;
		padding-top: 24upx;
		padding-bottom: 24upx;
	}

	.orderTime {
		font-size: 22upx;
		color: $uni-text-color-green;
		line-height: 1em;
		padding-top: 26upx;
	}

	.orderImg {
		width: 180upx;
		height: 180upx;
		border-radius: 15upx;
		margin-right: 18upx;
	}

	.orderImg image {
		width: 180upx;
		height: 180upx;
		border-radius: 15upx;
	}

	.orderTitle {
		font-size: 26upx;
		color: #333333;
		padding-top: 26upx;
		line-height: 1em;


	}

	.orderCont {
		font-size: 24upx;
		color: #666666;
		line-height: 1em;
		padding-top: 16upx;
	}

	.orderPay {
		width: 100%;
		/* height: 104upx; */
		/* align-items: center; */
	}

	.orderBtn {
		width: 170upx;
		height: 56upx;
		color: $uni-text-color-green;
		font-size: 26upx;
		border-radius: 50upx;
		background-color: #FFFFFF;
		line-height: 52upx;
		border: 1upx solid $uni-border-color-green;
		margin: 28upx 0 0 0;
	}

	.btnActive {
		background: $uni-color-level-gradual;
		color: #ffffff;

	}
</style>
