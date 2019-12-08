<template><!-- 需填写设施列表（房东选过的显示绿色） -->
	<view class="sheshi">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="您有哪些设施可以提供" right-text="保存" @click-right="save"></uni-nav-bar>
		<!-- <view class="paddingBot">
			<view class="uni-flex uni-column lastPadding">
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.kitchenList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="kitchenChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.kitchenList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.safeList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="safeListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.safeList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.dispList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="dispListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.dispList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.buildList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="buildListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.buildList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.toiletriesList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="toiletriesListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.toiletriesList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-flex uni-column">
					<view class="sheshiTitle" style="padding-left: 30upx;">{{facilitiesList.homeList[0].name}}</view>
					<view class="sheshiWrap">
						<checkbox-group @change="homeListChange" class="uni-flex uni-row sheshiList">
							<label v-for="item in facilitiesList.homeList" :key="item.code" class="label">
								<view style="padding-left:66upx;">
									<view class="sheshiList" :class="{active:item.checked==true}">
										<view class="imgBg">
											<image style="width: 72upx;height: 72upx;margin: 0 auto;padding-top: 17upx;" :src="urlImage+item.remark"></image>
										</view>
										<view class="imgName">{{item.value}}</view>
									</view>
								</view>
								<checkbox :value="item.code" :checked="item.checked" class="hide" />
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view> -->
		<view class="facility">
			<view class="title">设置使用指南</view>
			<view>该信息不会在平台展示，通过“入住指引”发送给房客可见</view>
			 <view class="text">
				<view class="textBox">
					<textarea type="text" placeholder-style="color:#2b2b2b; font-siz:24upx;" placeholder="天然气,热水器通电打开,开水自动加热,用完记得关闭,安全第一"></textarea>
					<view>0/300</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				token: '',
				build: '',
				disp: '',
				home: '',
				houseId: '29',
				kitchen: '',
				safe: '',
				toiletries: '',
				facilitiesList: [],
				urlImage: '',
				nextStep: false
			}
		},
		onLoad(e) {
			/* this.houseId = uni.getStorageSync('houseId');
			this.token = uni.getStorageSync('token');
			this.urlImage = this.getApp.api.urlImage
			this.getFacility() */
		},
		methods: {
		
			checkboxChange(e, list) {
				let values = e.detail.value;
				for (let i = 0, lenI = list.length; i < lenI; ++i) {
					const item = list[i]
					if (values.includes(item.code)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				// console.log(JSON.stringify(list))
			},
			kitchenChange(e) {
				this.kitchen = e.detail.value.join(',')
				// console.log(this.kitchen)
				this.checkboxChange(e, this.facilitiesList.kitchenList)
			},
			safeListChange(e) {
				this.safe = e.detail.value.join(',')
				// console.log(this.safe)
				this.checkboxChange(e, this.facilitiesList.safeList)
			},
			dispListChange(e) {
				this.disp = e.detail.value.join(',')
				// console.log(this.disp)
				this.checkboxChange(e, this.facilitiesList.dispList)
			},
			buildListChange(e) {
				this.build = e.detail.value.join(',')
				// console.log(this.build)
				this.checkboxChange(e, this.facilitiesList.buildList)
			},
			toiletriesListChange(e) {
				this.toiletries = e.detail.value.join(',')
				// console.log(this.toiletries)
				this.checkboxChange(e, this.facilitiesList.toiletriesList)
			},
			homeListChange(e) {
				this.home = e.detail.value.join(',')
				// console.log(this.home)
				this.checkboxChange(e, this.facilitiesList.homeList)
			},
			comeBack(){
				uni.navigateBack({})
			},
			saveHouseType() {
				uni.request({
					url: this.getApp.api.landlord.houseInfoFour,
					method: 'POST',
					data: {
						build: this.build,
						disp: this.disp,
						home: this.home,
						houseId: this.houseId,
						kitchen: this.kitchen,
						safe: this.safe,
						toiletries: this.toiletries
					},
					header: {
						token: this.token
					},
					success: res => {
						// console.log(JSON.stringify(res))
						if (res.data.code == 0) {
							this.openClaim()
						} else {
							uni.showToast({
								title: '保存失败，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			getFacility() {
				uni.request({
					url: this.getApp.api.landlord.facilityList,
					method: 'GET',
					data: {},
					success: res => {
						this.facilitiesList = res.data.facilitiesList
						// console.log(JSON.stringify(res))
					}
				});
			},
			save(){
				uni.redirectTo({
					url:'/pages/landlord/resource/guide/newest'
				})
			},
		},
		components: {
			uniNavBar
		}
	}
</script>

<style lang="scss" scoped>
	.label {
		padding: 0;
	}

	.hide {
		display: none;
	}

	.sheshi {
		width: 100%;

	}

	.sheshi-padding {
		padding: 0 30upx;
	}

	.paddingBot {
		width: 100%;
		padding-bottom: 118upx;
	}

	.sheshiTitle {
		font-size: 28upx;
		padding-top: 28upx;
		padding-bottom: 16upx;
		color: #111015;
		line-height: 1em;
		background-color: #f8f7fc;

	}

	.sheshiWrap {
		padding-top: 46upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #e8e8e8;
	}

	.sheshiList {
		flex-wrap: wrap;
		text-align: center;
		background: #ffffff;


	}

	.sheshi .imgBgHide {
		width: 106upx;
		height: 106upx;
		background: #f8f7fc;
		border-radius: 50%;
		display: none;

	}

	.sheshi .imgBgHide image {
		width: 106upx;
		height: 106upx;
	}

	.sheshi .imgBg {
		display: block;
		width: 106upx;
		height: 106upx;
		border-radius: 50%;
		background-color: #ecf1f2;

	}

	// .sheshi .active {
	// 	background-color: #FFFFFF;
	// 	box-shadow: 3upx 4upx 5upx 4upx #e7eaea;
	// }

	.sheshi .imgBg image {
		width: 106upx;
		height: 106upx;
	}

	.imgName {
		width: 106upx;
		font-size: 22upx;
		color: #999999;
		text-align: center;
		line-height: 1em;
		padding-top: 10upx;
		padding-bottom: 48upx;
	}

	.imgName-active {
		color: #45C298;
	}

	.bottom {
		margin-left: 24upx;
		margin-right: 24upx;
		margin-bottom: 30upx;
		width: calc(100% - 48upx);
		height: 88upx;
		line-height: 88upx;
		font-size: 26upx;
		text-align: center;
		border-radius: 15upx;
		color: #ffffff;
		background: linear-gradient(to right, rgb(68, 207, 205), rgb(61, 207, 148));
		position: fixed;
		bottom: 0;
		z-index: 5;
	}

	.but {
		width: 100%;
		height: 118upx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}

	.active {
		.imgBg {
			background-color: #FFFFFF;
			box-shadow: 3upx 4upx 5upx 4upx #e7eaea;
		}

		.imgName {
			color: $uni-text-color-green;
		}
	}
	.facility{
		width: calc(100% - 60upx);
		padding: 0 30upx; 
		
		background-color: #ffffff;
		border-top:16upx solid #f8f8f8;
	}
	.facility .title{
		font-size: 26upx;
		color: #2b2b2b;
		padding-top:40upx;
	}
	.facility view:nth-of-type(2){
		font-size: 22upx;
		color: #959595;
		padding: 18upx 0 20upx 0;
	}
	.text{
		width: 100%;
		height: 258upx;
	}
	.textBox{
		width: calc(100% - 40upx);
		
		height: 208upx;
		padding: 26upx 24upx 0 16upx;
		background-color: #f5f9fc;
		border: 1upx solid #f3f3f3;
	}
	.textBox textarea{
		width: calc(100% - 40upx);
		height: 166upx;
		font-size: 24upx;
		color: #3d3d3d;
	}
	.textBox view{
		font-size: 18upx;
		padding-bottom: 24upx;
		position: absolute;
		right:54upx;
	} 
</style>
