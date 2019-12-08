<template>
	<view class="landord">
		<view class="landordImg">
			<view>
				<image class="langordIcon" :src="urlImage+userAvatar"></image>
				<view class="landordName">{{landlordName}}</view>
			</view>
		</view>
		<view class="landordWrap">
			<view class="landordAbort">
				<view class="landordTitel">关于房东</view>
				<view class="detail">{{userSocialIntroduction}}</view>
			</view>
			<view class="verification">
				<view class="landordTitel">已验证信息</view>
				<view class="">
					<view style="width: 200upx; display: inline-block;" v-if="idCrad==1">
						<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon2@2x.png'"></image>
						<view class="imgR">身份证</view>
					</view>
					<view style="width: 200upx; display: inline-block;" v-if="phone==1">
						<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon2@2x.png'"></image>
						<view class="imgR">手机号</view>
					</view>
					<view style="width: 200upx; display: inline-block;" v-if="email==1">
						<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon2@2x.png'"></image>
						<view class="imgR">电子邮箱</view>
					</view>
				</view>
			</view>
			<view class="sell">
				<view class="landordTitel" style="">已验证信息</view>
				<view style="">
					<image class="imgIcon" :src="urlImage+'fangdong_wooden_icon@2x.png'"></image>
					<view class="imgR">{{houseCount}}套木屋</view>
				</view>
				<view style="margin:0 0 25upx;" v-for="item in userHouseList" :key="item.id">
					<image class="imgBg" :src="urlImage+item.house_img"></image>
					<view class="detail" style="padding:0 15upx;">
						<view style="line-height: 1em;padding-top: 16upx; color: #313131;font-size: 26upx;">{{item.additional_explanation}}/{{item.house_name}}</view>
						<view style="line-height: 1em;padding-top: 16upx; color: #313131;font-size: 24upx;">
							<text style="margin-right:10upx;">{{item.house_type_bedroom}}居/{{item.house_area}}平米/宜住{{item.fit_number}}人</text>
							<text>{{item.area}}</text>
						</view>
						<view style="line-height: 1em;padding-top: 20upx; color: #313131;font-size: 26upx;">￥{{item.price}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				urlImage: '',
				userAvatar: '',
				landlordName: '',
				idCrad: 0,
				phone: 0,
				email: 0,
				userSocialIntroduction: '',
				houseCount: '',
				userHouseList: [],
			}
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.id = e.id
			this.landlordHouseInfo()
		},
		methods: {
			landlordHouseInfo() {
				uni.request({
					url: this.getApp.api.index.landlordHouseInfo,
					method: 'GET',
					data: {
						houseId: this.id
					},
					success: res => {
						this.userAvatar = res.data.userAvatar
						this.landlordName = res.data.landlordName
						this.idCrad = res.data.idCrad
						this.phone = res.data.phone
						this.email = res.data.email
						this.userSocialIntroduction = res.data.userSocialIntroduction
						this.houseCount = res.data.houseCount
						this.userHouseList = res.data.userHouseList
					},
					fail: () => {},
					complete: () => {}
				});
			},
			landlordData() {
				uni.navigateTo({
					url: "/pages/tenant/landlord/landlord-data"
				})
			}
		}
	}
</script>

<style>
	.landordImg {
		width: 100%;
		height: 412upx;
		background-image: url("http://113.200.212.12/ymshapi/api/location/Landlord20_bg.jpg");
		background-size: contain;
	}

	.langordIcon {
		width: 98upx;
		height: 98upx;
		position: relative;
		top: 120upx;
		left: calc(50% - 49upx);
		border-radius: 50%;
	}

	.landordName {
		position: absolute;
		top: 240upx;
		width: 100%;
		text-align: center;
	}

	.landordWrap {
		width: calc(100% - 60upx);
		margin: 0 auto;
	}

	.landordAbort {
		width: calc(100% - 60upx);
		width: 100%;
		height: 300upx;
		background: #ffffff;
		padding-bottom: 24upx;
		border-bottom: 1upx solid #cccccc;
	}

	.landordTitel {

		font-size: 28upx;
		color: #434343;
		line-height: 1em;
		padding-top: 48upx;
		padding-bottom: 38upx;
	}

	.landordAbort .detail {
		font-size: 26upx;
		color: #535353;
	}

	.verification {
		width: calc(100% - 60upx);
		width: 100%;
		height: 180upx;
		border-bottom: 1upx solid #CCCCCC;
	}

	.verification image {
		width: 32upx;
		height: 32upx;
		display: inline-block;
		position: relative;
		top: 0;
	}

	.imgR {
		display: inline-block;
		font-size: 22upx;
		line-height: 1em;
		position: relative;
		top: -16upx;
		margin: 0;
	}

	.verification .imgIcon {
		width: 32upx;
		height: 32upx;
		display: inline-block;
		position: relative;
		top: -8upx;
	}

	.sell .imgIcon {
		width: 32upx;
		height: 32upx;
		display: inline-block;
		position: relative;
		top: -8upx;

	}

	.sell {
		padding-bottom: 30upx;
	}

	.sell .imgBg {
		width: 100%;
		height: 402upx;
		vertical-align: top;
		border-radius: 15upx;
	}
</style>
