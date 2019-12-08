<template>
	<view class="uni-flex uni-column mine-box" v-if="isShow">
		<!-- 背景层 -->
		<view class="uni-flex uni-row mine-image-top">
			<image :src="imageUrl+'my_top_bg.jpg'"></image>
		</view>
		<view class="uni-flex uni-column mine-title-box">
			<view class="status_bar"></view>
			<view class="uni-flex uni-row image-user">
				<view class="image-user-box">
					<image :src="imageUrl+'top_right_Settings@xxxhdpi.png'" @tap="setting"></image>
				</view>
			</view>
			<view class="uni-flex uni-row mine-userInfo-box">
				<view class="uni-flex uni-row mine-userInfo">
				<image :src="imageUrl+landlordPic"></image>
				</view>
			</view>
			<view class="uni-flex uni-row mine-userInfo-text">
				<text class="uni-h4" space="ensp">{{landlordName}}</text>
				<image id="landlord" @tap="editData" :src="imageUrl+'menu_icon_edit@xxxhdpi.png'"></image>
			</view>
			<view class="uni-flex uni-row mine-order-title">
				<view class="uni-flex uni-column order-button" style="margin-left: 0;" @click="order(0)">
					<image :src="imageUrl+'orderstatus-icon_confirm.png'"></image>
					<image :src="imageUrl+'alert_icon_dot@xxxhdpi.png'" class="iconStatus" :class="{iconActive:landlordStatus.statusOne}"></image>
					<view></view>
					<text>待确认</text>
				</view>
				<view class="uni-flex uni-column order-button" @click="order(1)">
					<image :src="imageUrl+'orderstatus_icon_checkin@xxhdpi.png'"></image>
					<image :src="imageUrl+'alert_icon_dot@xxxhdpi.png'" class="iconStatus" :class="{iconActive:landlordStatus.statusTwo}"></image>
					<view></view>
					<text>待入住</text>
				</view>
				<view class="uni-flex uni-column order-button" @click="order(2)">
					<image :src="imageUrl+'orderstatus_icon_stayin.png'"></image>
					<image :src="imageUrl+'alert_icon_dot@xxxhdpi.png'" class="iconStatus" :class="{iconActive:landlordStatus.statusThree}"></image>
					<view></view>
					<text>已入住</text>
				</view>

				<view class="uni-flex uni-column order-button" @click="order(3)">
					<image :src="imageUrl+'orderstatus_icon_end@xxhdpi.png'"></image>
					<view></view>
					<text>已结束</text>
				</view>
				<view class="uni-flex uni-column order-button" @click="order(4)">
					<image :src="imageUrl+'orderstatus_icon_totali.png'"></image>
					<view></view>
					<text>全部订单</text>
				</view>
			</view>
			<view class="matlab matlab-title">
				<view class="title">房东必备</view>
				<view class="uni-flex content">
					<view class="item" @tap="openCollection">
						<image class="img" :src="imageUrl+'middle_icon_receivingset.png'" mode="widthFix"></image>
						<view class="txt">收款设置</view>
					</view>
					<view class="item" @tap="openOperating">
						<image class="img" :src="imageUrl+'middle_icon_report.png'" mode="widthFix"></image>
						<view class="txt">经营概况</view>
					</view>
					<view class="item" @tap="test">
						<image class="img" :src="imageUrl+'middle_icon_smartdoor.png'" mode="widthFix"></image>
						<view class="txt">智能门锁</view>
					</view>
				</view>
				<view class="matlab">
					<image class="photo" :src="imageUrl+'message_activity3_img@2x.jpg'" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				token: '',
				landlordStatus: {
					statusOne: false,
					statusTwo: false,
					statusThree: false
				},
				lInfoEntities: [],
				imageUrl:'',
				landlordPic:'pho_1@3x.png',
				landlordName:'',
				isShow:false
			};
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.landlordCheck()
			this.getImg();
		},
		methods: {
			order(index) {
				this.$store.commit('order', index);
				uni.switchTab({
					url: '/pages/main/tabbar0/tabbar0'
				})
				// console.log('传入的参数'+index)
			},
			setting() {
				uni.navigateTo({
					url: '/pages/setting/landlord/setting'
				});
			},
			editData(e) {
				uni.navigateTo({
					url: '/pages/tenant/landlord/landlord-data?id=' + e.target.id
				});
			},
			landlordCheck() {
				uni.request({ //房东订单提示查询
					url: this.getApp.api.landlordData.landLordOrderPrompt,
					method: 'POST',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						this.token = uni.getStorageSync('token');
						this.lInfoEntities = res.data.lInfoEntities
						this.landlordStatus.statusOne = false
						this.landlordStatus.statusTwo = false
						this.landlordStatus.statusThree = false
						for (let i in this.lInfoEntities) {
							if (this.lInfoEntities[i].orderStatus == 1) {
								this.landlordStatus.statusOne = true
							} else if (this.lInfoEntities[i].orderStatus == 2) {
								this.landlordStatus.statusTwo = true
							} else if (this.lInfoEntities[i].orderStatus == 3) {
								this.landlordStatus.statusThree = true
							}
						}
						// console.log(this.landlordStatus.statusOne)
						// console.log(JSON.stringify(res))
					}
				});
			},
			openOperating() {
				uni.navigateTo({
					url: '/pages/landlord/operating/operating'
				})
			},
			test() {
				uni.showToast({
					title: '功能正在完善中...',
					icon: 'none'
				});
			},
			openCollection() {
				uni.navigateTo({
					url: '/pages/landlord/collectionSetting/receipt'
				})
			},
			getImg(){
				uni.request({
					url: this.getApp.api.mainData.userPersonal,
					method: 'POST',
					header: {
						token: this.token
					},
					success: res => {
						if(res.data.code==0){
							this.landlordPic=res.data.uEntity.landlordPic
							this.landlordName=res.data.uEntity.landlordName
						}
						this.isShow=true
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-box{
		z-index: 0;
	}
	.mine-image-top{
		z-index: -10; 
		position: absolute; 
		left: 0px; 
		top: 0px;
		height: 395upx; 
		width: 100%;
	}
	.mine-image-top image{
		height: 395upx; 
		width: 100%;
	}
	.mine-title-box{
		width: 92%; 
		margin: 30upx;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.image-user{
		height: 52upx; 
		justify-content: flex-end;
	}
	.image-user-box{
		height: 52upx; 
		width: 52upx;
		display: flex; 
		justify-content: flex-end; 
		align-items: flex-end;
	}
	.image-user-box image{
		height: 45upx;
		width: 45upx;
	}
	.mine-userInfo-box{
		margin-top: 28upx; 
		justify-content: center;
	}
	.mine-userInfo{
		width: 130upx; 
		height:130upx; 
		background-color:#FFFFFF; 
		border-radius:65upx; 
		justify-content: center;
		align-items: center;
	}
	.mine-userInfo image{
		height: 120upx; 
		width: 120upx; 
		border-radius: 60upx;
	}
	.mine-userInfo-text{
		justify-content: center;
		align-items: center;
	}
	.mine-userInfo-text text{
		color: #FFFFFF;
	}
	.mine-userInfo-text image{
		margin-left: 22upx; 
		height: 45upx; 
		width: 45upx;
	}
	.mine-order-title{
		justify-content: space-around; 
		background-color:#FFFFFF; 
		border-radius:15upx;
		padding: 40upx 20upx;
		box-shadow: 0 0 12upx #f0f0f0;
	}
	.iconStatus {
		z-index: 10;
		position: absolute;
		right: 18upx;
		top: 0;
		height: 20upx;
		width: 20upx;
		display: none;
	}

	.iconActive {
		display: block;
	}
	.order-button {
		height: 90upx;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		line-height: 26upx;
		color: #535353;
		position: relative;
	}
	.order-button image:nth-of-type(1){
		height: 52upx; 
		width: 52upx;
	}
	.order-button view{
		height: 20upx;
		width: 20upx;
	}
	.order-button text{
		font-size: 28upx;	
	}
	.matlab-title{
		background-color:#FFFFFF; 
		border-radius:15upx;
		padding: 40upx 30upx;
		box-shadow: 0 0 12upx #f0f0f0;
	}
	.matlab {
		margin-top: 30upx;

		.photo {
			border-radius: 15upx;
			width: 100%;
			height: 250upx;
		}

		.title {
			font-size: 28upx;
			/* color: #999; */
			margin: 0 0 30upx;
			line-height: 1em;
		}

		.content {
			justify-content: space-around;

			.item {
				text-align: center;
				line-height: 1em;

				.img {
					width: 42upx;
					height: 42upx;
					margin-bottom: 16upx;
				}

				.txt {
					font-size: 24upx;
					/* color: #333; */
					line-height: 1em;
				}
			}
		}
	}
</style>
