<template>
	<view class="container">
		<uni-nav-bar fixed="true" statusBar="true" title="房源" right-text="发布房源" @click-right="openAddHouse"></uni-nav-bar>
		<view class="uni-padding-wrap" style="position:fixed;background:#fff;z-index: 99;border-bottom: 3upx solid #f0f0f0;">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="added">
			<view v-show="current === 0">
				<view class="uped" v-if="upHouseList.length!=0">
				<!-- <view class="title">已上架({{upHouseList.length}})</view> -->
				<view class="uni-flex uni-column listingList" v-for="item in upHouseList" :key="item.id">
					<view class="uni-flex uni-row listTop">
						<view class="uni-flex uni-row left">
							<view class="leftImg">
								<image :src="urlImage+imgType.house_img" v-if="imgType.house_img_type==0" v-for="imgType in item.img" :key="imgType.house_id"></image>
								<view class="status">{{item.audit_status==3?'审核通过':item.audit_status==2?'审核中':item.audit_status==1?'审核未通过':'未审核'}}</view>
							</view>
							<view class="text">
								<view>{{item.house_name}}</view>
								<view>
								{{'整套'+item.house_type_bedroom+'室'+item.house_type_drawi+'厅'+item.house_type_toilet+'卫 共1套'}}</view>
							</view>
						</view>
						<view class="right" @tap="openHouseCalendar(item.id)">
							<image :src="urlImage+'btn_calendar.png'" v-if="item.audit_status==3"></image>
						</view>
					</view>
					<view class="uni-flex uni-row edit">
						<!-- <view>复制已有房屋</view> -->
						<view @tap="lowerShelf(item.id)">下架</view>
						<view @tap="openGuide(item.id)">查看</view>
					</view>
				</view>
			</view>
			</view>
			<view v-show="current === 1">
				<view class="waitUp" v-if="downHouseList.length!=0">
				<!-- <view class="title">未上架({{downHouseList.length}})</view> -->
				<view class="uni-flex uni-column listingList" v-for="item in downHouseList" :key="item.id">
					<view class="uni-flex uni-row listTop">
						<view class="uni-flex uni-row left">
							<view class="leftImg">
								<image :src="urlImage+imgType.house_img" v-if="imgType.house_img_type==0" v-for="imgType in item.img" :key="imgType.house_id"></image>
								<view class="status">{{item.audit_status==3?'审核通过':item.audit_status==2?'审核中':item.audit_status==1?'审核未通过':'未审核'}}</view>
							</view>
							<view class="text">
								<view>{{item.house_name!=null?item.house_name:'暂无数据'}}</view>
								<view>
								{{item.house_type_bedroom!=null?'整套'+item.house_type_bedroom+'室':'整套'+'0'+'室'}}
								{{item.house_type_drawi!=null?item.house_type_drawi+'厅':'0'+'厅'}}
								{{item.house_type_toilet!=null?item.house_type_toilet+'卫 共1套':'0'+'卫 共1套'}}
								</view>
							</view>
						</view>
						<view class="right" @tap="openHouseCalendar(item.id)">
							<image :src="urlImage+'btn_calendar.png'" v-if="item.audit_status==3"></image>
						</view>
					</view>
					<view class="uni-flex uni-row edit" v-if="item.audit_status==0 || item.audit_status==1 || item.audit_status==null">
						<view @tap="submitAudit(item.id)">提交审核</view>
						<view @tap="openCompletionList(item.id)">编辑房源</view>
						<view @tap="deleteHouse(item.id)">删除</view>
					</view>
					<view class="uni-flex uni-row edit" v-else-if="item.audit_status==2">
						<view @tap="backAudit(item.id)">撤回</view>
						<view @tap="openGuide(item.id)">查看</view>
					</view>
					<view class="uni-flex uni-row edit" v-else-if="item.audit_status==3">
						<view @tap="upperShelf(item.id)">上架</view>
						<view @tap="openCompletionList(item.id)">编辑房源</view>
						<view @tap="deleteHouse(item.id)">删除</view>
					</view>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-navbar.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'

	export default {
		data() {
			return {
				token: '',
				urlImage: '',
				upHouseList: [],
				downHouseList: [],
				allHouseList: [],
				items: [
					'已上架',
					'未上架'
				],
				current: 0,
				colorIndex: 0,
				backgroundColor: '#ffffff',
				styleType: 'button',
			};
		},
		components: {
			uniNavBar,
			uniSegmentedControl
		},
		created() {
			this.token = uni.getStorageSync('token');
			this.urlImage = this.getApp.api.urlImage
		},
		methods: {
			openHouseCalendar(id) {
				// uni.showToast({
				// 	title: '功能正在完善中...',
				// 	icon:'none'
				// });
				this.$store.commit('changeHouseCard',id)
				this.$store.commit('changeHouseType',[])
				this.$store.commit('changeRefundRule',{refundRuleDay:1,refundRulePercentage:10})
				uni.navigateTo({
					url: '/pages/landlord/resource/listingCalendar/listingCalendar'
				})
			},
			openAddHouse() {
				uni.request({
					url: this.getApp.api.landlord.publishHouse,
					method: 'GET',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							// console.log(JSON.stringify(res))
							this.$store.commit('changeHouseCard', res.data.houseId)
							this.$store.commit('changeHouseType',[])
							this.$store.commit('changeRefundRule',{refundRuleDay:1,refundRulePercentage:10})
							this.$store.commit('changeHouseFlag',0)
							uni.navigateTo({
								url: '/pages/landlord/resource/position/position'
							});
						}
					}
				});
			},
			openCompletionList(id) {
				// uni.showToast({
				// 	title: '功能正在完善中...',
				// 	icon:'none'
				// });
				this.$store.commit('changeHouseCard',id)
				this.$store.commit('changeHouseFlag',1)
				this.$store.commit('changeHouseType',[])
				this.$store.commit('changeRefundRule',{refundRuleDay:1,refundRulePercentage:10})
				uni.navigateTo({
					url: '/pages/landlord/resource/verification/verification'
				});
			},
			openGuide(id){
				// uni.showToast({
				// 	title: '功能正在完善中...',
				// 	icon:'none'
				// });
				this.$store.commit('changeHouseCard',id)
				this.$store.commit('changeHouseFlag',2)
				this.$store.commit('changeHouseType',[])
				this.$store.commit('changeRefundRule',{refundRuleDay:1,refundRulePercentage:10})
				uni.navigateTo({
					url: '/pages/landlord/resource/verification/verification'
				});
			},
			submitAudit(id) {
				uni.request({
					url: this.getApp.api.landlord.submitAudit,
					method: 'GET',
					data: {
						houseId: id
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							this.getAuditHouseList()
							uni.showToast({
								title: '房源信息已提交成功',
								icon:'none'
							});
						}
					}
				});
			},
			backAudit(id) {
				uni.request({
					url: this.getApp.api.landlord.backAudit,
					method: 'GET',
					data: {
						houseId: id
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							this.getAuditHouseList()
							uni.showToast({
								title: '房源信息已撤回',
								icon:'none'
							});
						}
					}
				});
			},
			upperShelf(id) {
				uni.request({
					url: this.getApp.api.landlord.upperOperation,
					method: 'GET',
					data: {
						houseId: id
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							this.getAuditHouseList()
							uni.showToast({
								title: '房源信息已上架成功',
								icon:'none'
							});
							// console.log(JSON.stringify(res))
						}
					}
				});
			},
			lowerShelf(id) {
				uni.request({
					url: this.getApp.api.landlord.lowerOperation,
					method: 'GET',
					data: {
						houseId: id
					},
					header: {
						token: this.token
					},
					success: res => {
						if (res.data.code == 0) {
							this.getAuditHouseList()
							uni.showToast({
								title: '房源信息已下架成功',
								icon:'none'
							});
							// console.log(JSON.stringify(res))
						}
					}
				});
			},
			deleteHouse(id){
				uni.request({
					url: this.getApp.api.landlord.deleteHouse,
					method: 'GET',
					data: {
						houseId:id
					},
					header:{
						token:this.token
					},
					success: res => {
						// console.log(JSON.stringify(res))
						if(res.data.code==0){
							this.getAuditHouseList()
							uni.showToast({
								title: '房源信息已删除成功',
								icon:'none'
							});
						}
					}
				});
			},
			getAuditHouseList() {
				uni.request({
					url: this.getApp.api.landlord.auditHouseList,
					method: 'GET',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						// console.log(JSON.stringify(res))
						this.upHouseList = []
						this.downHouseList = []
						this.allHouseList = res.data.auditAndNoAuditHouseList
						for (let i in this.allHouseList) {
							if (this.allHouseList[i].upper_status == 0) {
								this.upHouseList.push(this.allHouseList[i])
							} else {
								this.downHouseList.push(this.allHouseList[i])
							}
						}
						// console.log(JSON.stringify(this.upHouseList))
						// console.log(JSON.stringify(this.downHouseList))
						this.items[0]='已上架'+'('+this.upHouseList.length+')'
						this.items[1]='未上架'+'('+this.downHouseList.length+')'
					}
				});
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}

	.listingList {
		justify-content: space-between;
		width: calc(100% - 60upx);
		padding: 0 30upx;
		border-bottom: 1upx solid #f6f6f6;
	}

	.added {
		width: 100%;
		background-color: #ffffff;
		margin-top:75upx;
	}

	.added .title {
		font-size: 24upx;
		color: 35upx;
		font-weight: bold;
		height: 60upx;
		background-color: #f8f7fc;
		line-height: 60upx;
		padding-left: 30upx;
		border-top: 3upx solid #f0f0f0;
	}

	.added .listTop {
		border-bottom: 1upx solid #F2F2F2;
		justify-content: space-between;
	}

	.added .leftImg {
		margin: 20upx 20upx 30upx 0;
		position: relative;
		background: #eee;
		width: 145upx;
		height: 145upx;
		border-radius: 15upx;
	}

	.added .leftImg view:nth-of-type(1) {
		width: 145upx;
		height: 45upx;
		border-radius: 0 0 15upx 15upx;
		background: red;
		position: absolute;
		top: 100upx;
		color: #fd7a0e;
		text-align: center;
		line-height: 45upx;
		font-size: 22upx;
		background-color: rgba(0, 0, 0, 0.6)
	}

	.added .left image {
		width: 145upx;
		height: 145upx;
		border-radius: 15upx;
		vertical-align: top;

	}

	.added .left .text view:nth-child(odd) {
		font-size: 28upx;
		font-weight: bold;
		color: #353535;
		margin: 30upx 0 0 0;
		height: 30upx;
		/* background: #1AAD19; */
	}

	.added .left .text view:nth-child(even) {
		font-size: 22upx;
		color: #888888;
		margin: 20upx 0 0 0;
		height: 22upx;
		/* background: #00BFFF; */
	}

	.added .right image {
		width: 32upx;
		height: 32upx;
		margin: 16upx 20upx 0 0;
	}

	.listingList {
		border-bottom: 20upx solid #f8f7fc;
	}

	.listingList:nth-last-of-type(1) {
		border-bottom: 0;
	}

	.listingList .edit {
		width: 100%;
		height: 88upx;
		justify-content: flex-end;

	}

	.listingList .space-between {
		justify-content: space-between;
	}

	.listingList .edit view {
		font-size: 26upx;
		min-width: 145upx;
		height: 56upx;
		border-radius: 15upx;
		line-height: 56upx;
		text-align: center;
		padding: 0 15upx;
		margin: 16upx 0 0 12upx;
		box-sizing: border-box;
	}

	.listingList .edit view:nth-child(odd) {
		border: 1upx solid $uni-border-color-green;
		background-color: #Ffffff;
		color: $uni-text-color-green;
	}

	.listingList .edit view:nth-child(even) {
		color: #FFFFFF;
		background: $uni-color-level-gradual;
	}
</style>
