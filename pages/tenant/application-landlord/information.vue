<template>
	<view class="information" v-if="isShow">
		<view class="imgTop">
			<view>

			</view>
			<image :src="imageUrl+'nav_images_bg.jpg'"></image>
		</view>

		<view class="uni-flex uni-column">
			<!-- <view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_phone.png"></image>
				</view>
				<view class="uni-flex uni-row imgRight" >
					<view>
						<view class="leftTop">手机号码</view>
						<view class="leftBot">86&nbsp;183****1231</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">已完成</view>
						<view>
							<image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row infList" @tap="togglePopup('bottom')">
				<view class="imgLeft">
					<image src="http://113.200.212.12/ymshapi/api/location/nav_icon_head.png"></image>
				</view>
				<view class="uni-flex uni-row imgRight">
					<view>
						<view class="leftTop">真实头像</view>
						<view class="leftBot">已上传</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">已完成</view>
						<view>
							<image src="http://113.200.212.12/ymshapi/api/location/nav_right_icon@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
			<uni-popup :show="type === 'bottom'" position="bottom" mode="fixed" @hidePopup="togglePopup('')">
				<view class="viewList" @tap="togglePopup('')">相册</view>
				<view class="viewList" @tap="togglePopup('')">拍照</view>
				<view class="viewList" @tap="togglePopup('')">取消</view>

			</uni-popup> -->
			<view class="uni-flex uni-row infList" @tap="openMobileNumber">
				<view class="imgLeft">
					<image :src="imageUrl+'nav_icon_head.png'"></image>
				</view>
				<view class="uni-flex uni-row imgRight">
					<view>
						<view class="leftTop">认证头像与手机号码</view>
						<view class="leftBot">{{headPricStatus==1?'已上传':'请完善认证头像与手机号码'}}</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">{{headPricStatus==1?'已完成':'未完成'}}</view>
						<view>
							<image :src="imageUrl+'nav_right_icon@2x.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image :src="imageUrl+'nav_icon_cardid.png'"></image>
				</view>
				<view class="uni-flex uni-row imgRight" @tap="openRealID">
					<view>
						<view class="leftTop">真实身份</view>
						<view class="leftBot">{{identityStatus==1?'已上传':'请完善真实身份'}}</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">{{identityStatus==1?'已完成':'未完成'}}</view>
						<view>
							<image :src="imageUrl+'nav_right_icon@2x.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row infList">
				<view class="imgLeft">
					<image :src="imageUrl+'nav_icon_cards.png'"></image>
				</view>
				<view class="uni-flex uni-row imgRight" @tap="openReceipt">
					<view>
						<view class="leftTop">收款方式</view>
						<view class="leftBot">{{payModeStatus==1?'已上传':'请完善收款方式'}}</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="right">{{payModeStatus==1?'已完成':'未完成'}}</view>
						<view>
							<image :src="imageUrl+'nav_right_icon@2x.png'"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="uni-flex uni-row footer" @tap="changeRole">开始发布房源 </view> -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type: '',
				token: '',
				headPricStatus:'',
				identityStatus:'',
				payModeStatus:'',
				imageUrl:'',
				isShow:false
			}
		},
		onShow() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.landLordInfo()
		},
		methods: {
			landLordInfo() {
				uni.request({
					url: this.getApp.api.attestation.queryAuthenstatus,
					method: 'POST',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						this.headPricStatus = res.data.lEntity.headPricStatus
						this.identityStatus = res.data.lEntity.identityStatus
						this.payModeStatus = res.data.lEntity.payModeStatus
						this.isShow=true
					}
				});
			},
			openMobileNumber() {
				uni.navigateTo({
					url: "/pages/tenant/application-landlord/mobileNumber"
				})
			},
			openRealID() {
				uni.navigateTo({
					url: "/pages/tenant/application-landlord/RealID"
				})
			},
			openReceipt() {
				uni.navigateTo({
					url: "/pages/tenant/application-landlord/receipt"
				})
			},
			togglePopup(type) {
				this.type = type;
			}
		}
	}
</script>

<style scoped>
	view {
		line-height: 1em;
	}

	.information {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.information .imgTop {
		width: 100%;
		height: 240upx;
	}

	.information .imgTop image {
		width: 100%;
		height: 240upx;
	}

	.infList {
		width: 100%;
		height: 104upx;
	}

	.infList .imgLeft {
		width: 48upx;
		height: 48upx;
		/* 	margin:38upx 18upx 0 30upx */
		/* 设计标准 */
		margin: 30upx 18upx 0 30upx;
	}

	.infList .imgLeft image {
		width: 48upx;
		height: 48upx;
	}

	.infList .imgRight {
		width: calc(100% - 129upx);
		justify-content: space-between;
		padding-right: 30upx;
		border-bottom: 1upx solid #e8e8e8;
	}

	.infList .imgRight .leftTop {
		font-size: 26upx;
		color: #333333;
		margin: 22upx 0 10upx 0;
	}

	.infList .imgRight .leftBot {
		font-size: 24upx;
		color: #7e7e7e;
	}

	.infList .imgRight .right {
		font-size: 26upx;
		color: #333333;
		line-height: 104upx;
	}

	.infList .imgRight image {
		width: 22upx;
		height: 22upx;
		margin: 40upx 0 0 8upx;
	}

	.information .footer {
		width: 100%;
		height: 98upx;
		position: fixed;
		bottom: 0;
		background-color: #45C298;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 98upx;
		justify-content: center;
		background: linear-gradient(to right, rgb(68, 207, 205), rgb(61, 207, 148));
	}

	/* uni-popup{
			height: 267upx;
		} */
	uni-popup uni-view {
		/* width: 100%;
			height: 88upx;
			font-size: 24upx;
			color: #000000;
			text-align: center;
			border-bottom: 1upx solid #e8e8e8;
			line-height: 88upx; */
	}

	.viewList {
		width: 100%;
		height: 88upx;
		font-size: 24upx;
		color: #000000;
		text-align: center;
		border-bottom: 1upx solid #e8e8e8;
		line-height: 88upx;
	}

	.viewList:nth-child(3) {
		background-color: #f6f6f6;
	}
</style>
