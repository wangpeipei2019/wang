<template>
		<view class="uni-flex uni-column mine-box" v-if="isShow">
			<!-- 背景层 -->
			<view class="uni-flex uni-row mine-image-top">
				<image :src="imageUrl+'tenant-mine-top.png'"></image>
			</view>
			<view class="uni-flex uni-column mine-title-box">
				<view class="uni-flex uni-row image-user">
					<view class="uni-flex uni-row">
						<image :src="imageUrl+userPic"></image>
					</view>
				</view>
				<view class="uni-flex uni-row mine-userInfo">
					<text class="uni-h4" space="ensp">{{userName}}</text>
					<image id="tenant" @tap="editData" :src="imageUrl+'menu_icon_edit@xxxhdpi.png'"></image>
				</view>
				<view class="uni-flex uni-row mine-order-title">
					<view class="uni-flex uni-column order-button order-button-margin" @click="order(0)">
						<image :src="imageUrl+'orderstatus_icon_pay@xxhdpi.png'"></image>
						<image :src="imageUrl+'alert_icon_dot@xxxhdpi.png'" class="iconStatus" :class="{iconActive:tenantStatus.statusOne}"></image>
						<view ></view>
						<text>待付款</text>
					</view>
					<view class="uni-flex uni-column order-button" @click="order(1)">
						<image :src="imageUrl+'orderstatus_icon_checkin@xxhdpi.png'"></image>
						<image :src="imageUrl+'alert_icon_dot@xxxhdpi.png'" class="iconStatus" :class="{iconActive:tenantStatus.statusTwo}"></image>
						<view></view>
						<text>待入住</text>
					</view>
					<view class="uni-flex uni-column order-button" @click="order(2)">
						<image :src="imageUrl+'tab_icon_ongoing@xxxhdpi.png'"></image>
						<image :src="imageUrl+'alert_icon_dot@xxxhdpi.png'" class="iconStatus" :class="{iconActive:tenantStatus.statusThree}"></image>
						<view></view>
						<text>进行中</text>
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
				<view class="uni-flex uni-column mine-list-box">
					<view class="uni-flex uni-row mine-list" @tap="openCheckIn">
						<image :src="imageUrl+'middle_icon_Contacts@xxxhdpi.png'"></image>
						<view class="uni-flex uni-column mine-list-text">
							<text>常用入住人</text>
							<text>共{{checkInNum}}位入住人</text>
						</view>
						<uni-icon color="#232323" size="20" type="arrowright"></uni-icon>
					</view>
					<view class="uni-flex uni-row mine-list" @tap="test">
						<image :src="imageUrl+'middle_icon_locked@xxxhdpi.png'"></image>
						<view class="uni-flex uni-column mine-list-text">
							<text>智能门锁</text>
							<text>预定后可使用</text>
						</view>
						<uni-icon color="#232323" size="20" type="arrowright"></uni-icon>
					</view>
					<view class="uni-flex uni-row mine-list" @tap="openFootPtint">
						<image :src="imageUrl+'middle_icon_history@xxxhdpi.png'"></image>
						<view class="uni-flex uni-column mine-list-text">
							<text>我的足迹</text>
							<text>{{footprint}}条</text>
						</view>
						<uni-icon color="#232323" size="20" type="arrowright"></uni-icon>
					</view>
					<view class="uni-flex uni-row mine-list" @tap="openCommonProblem">
						<image :src="imageUrl+'middle_icon_help@xxxhdpi.png'"></image>
						<view class="uni-flex uni-column mine-list-text">
							<text>常见问题</text>
							<text>使用中的热门问题</text>
						</view>
						<uni-icon color="#232323" size="20" type="arrowright"></uni-icon>
					</view>
					<view class="uni-flex uni-row mine-list" @tap="openFeedBack">
						<image :src="imageUrl+'middle_icon_opinion@xxxhdpi.png'"></image>
						<view class="uni-flex uni-column mine-list-text">
							<text>意见反馈</text>
							<text>请您提出宝贵的建议</text>
						</view>
						<uni-icon color="#232323" size="20" type="arrowright"></uni-icon>
					</view>
				</view>
				<view class="uni-flex uni-column mine-cro-box" @tap="crowdfunding">
					<view class="uni-flex uni-row mine-cro">
						<image :src="imageUrl+'middle_icon_Personal@xxxhdpi.png'"></image>
						<view class="uni-flex uni-column mine-list-text">
							<text>我的众筹</text>
							<text>暂无众筹订单</text>
						</view>
						<uni-icon color="#232323" size="20" type="arrowright"></uni-icon>
					</view>
				</view>
			</view>
		</view>
</template>
<script>
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	import uniBadge from '@/components/lib/uni-badge/uni-badge.vue';
	import uniList from '@/components/lib/uni-list/uni-list.vue'
	import uniListItem from '@/components/lib/uni-list-item/uni-list-item.vue'
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniIcon,
			uniBadge,
			uniList,
			uniListItem,
			uniNavBar
		},
		data() {
			return {
				showSwiper: false,
				tenantStatus: {
					statusOne: false,
					statusTwo: false,
					statusThree: false,
					col:"#45c298",
				},
				imageUrl:'',
				userPic:'',
				lInfoEntities: [],
				bg:"rgba(255,255,255,0)", 
				scrollTop: 0,
				 old: {
					scrollTop: 0
				}, 
				color1:'#ffffff',
				color2:'#ffffff',
				userName:'',
				isShow:false,
			};
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.getImg();
		},
		props: {
			checkInNum:{
				type:Number,
				default:0
			},
			footprint:{
				type:Number,
				default:0
			}
		},
		methods: {
			order(index) {
				uni.navigateTo({
					url: '/pages/tenant/order/main-order?index='+index
				});
			},
			setting() {
				uni.navigateTo({
					url: '/pages/setting/main/main-setting'
				});
			},
			openCheckIn() {
				uni.navigateTo({
					url: '/pages/tenant/order/check-in/check-list?active=false'
				});
			},
			openNews() {
				uni.navigateTo({
					url: '/pages/tenant/index/index-message/index-message'
				});
			},
			editData(e) {
				uni.navigateTo({
					url: '/pages/tenant/landlord/landlord-data?id=' + e.target.id
				});
			},
			/* openSelectedScenic(id,title) {
				uni.navigateTo({
					url: '/pages/tenant/index/selected-scenic/selected-scenic?id='+id+'&title='+title
				});
			}, */
			tenantCheck() {
				this.token = uni.getStorageSync('token');
				uni.request({ //用户订单提示查询
					url: this.getApp.api.tenant.userOrderPrompt,
					method: 'POST',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
					//	 console.log(JSON.stringify(res))
						if(res.data.code==0){
							this.lInfoEntities = res.data.lInfoEntities
							this.tenantStatus.statusOne = false
							this.tenantStatus.statusTwo = false
							this.tenantStatus.statusThree = false
							for (let i in this.lInfoEntities) {
								if (this.lInfoEntities[i].orderStatus == 0) {
									this.tenantStatus.statusOne = true
								} else if (this.lInfoEntities[i].orderStatus == 1 || this.lInfoEntities[i].orderStatus == 2) {
									this.tenantStatus.statusTwo = true
								} else if (this.lInfoEntities[i].orderStatus == 3) {
									this.tenantStatus.statusThree = true
								}
							}
						}else{
							this.$store.commit('changeBackIndex',1)
							uni.redirectTo({
								url: '/pages/login/login'
							});
						}
					}
				});
			},
			openFootPtint(){
				uni.navigateTo({
					url:'/pages/tenant/index/tenant-main/footPrint'
				})
			},
			openLogin(){
				var res = global.isLogin();
				if (!res) {
					uni.showModal({
						title: '请登录',
						content: "请登录",
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/login/login"
								});
								this.$store.commit('changeBackIndex', 0)
							}
						}
					})
				}
			},
			openCommonProblem(){
				uni.navigateTo({
					url:'/pages/tenant/index/tenant-main/commonProblem'
				})
			},
			openFeedBack(){
				uni.navigateTo({
					url:'/pages/tenant/index/tenant-main/feedBack'
				})
			},
			test(){
				uni.showToast({
					title: '功能正在完善中...',
					icon:'none'
				});
			},
			radioChange(e) {
					this.showSwiper = e.detail.value === "swiper";
				},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
				 if(this.old.scrollTop>=99&&this.old.scrollTop<105){
						this.bg='rgba(255,255,255,0.3)'
						this.color1='rgba(90,88,88, 0.3)'
						this.color2='rgba(90,88,88, 0.3)'
					} 
				else if(this.old.scrollTop>=105&&this.old.scrollTop<115){
						this.bg='rgba(255,255,255,0.7)'
						this.color1='rgba(90,88,88, 0.7)'
						this.color2='rgba(90,88,88, 0.7)'
					} 	
				else if(this.old.scrollTop>=115){
						this.bg='rgba(255,255,255,1)'
						this.color1='rgba(90,88,88, 1)'
						this.color2='rgba(90,88,88, 1)'
					} 	
				 else if(this.old.scrollTop<90){
					this.bg='rgba(255,255,255,0)'
					this.color1='#ffffff'
					this.color2='#ffffff'
				} 
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
							this.userPic=res.data.uEntity.userPic
							this.userName=res.data.uEntity.userName
						}
						this.isShow=true
					}
				});
			},
			crowdfunding(){
				uni.navigateTo({
					url:'/pages/tenant/crowdfunding/crowdfundingOrder'
				})
			},
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
	.mine-title-box .image-user{
		margin-top: 3upx; 
		justify-content: center;
	}
	.mine-title-box .image-user view{
		width: 130upx; 
		height:130upx; 
		background-color:#FFFFFF; 
		border-radius:65upx; 
		justify-content: center;
		align-items: center;
	}
	.mine-title-box .image-user image{
		height: 120upx; 
		width: 120upx; 
		border-radius: 60upx;
	}
	.mine-title-box .mine-userInfo{
		justify-content: center;
		align-items: center;
	}
	.mine-title-box .mine-userInfo text{
		color: #FFFFFF;
	}
	.mine-title-box .mine-userInfo image{
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
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.iconStatus{
		z-index: 10;
		position: absolute;
		right: 18upx;
		top: 0;
		height: 20upx;
		width: 20upx;
		display:none;
	}
	.iconActive {
		display:block;
	}
	.order-button {
		height: 90upx;
		position:relative;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		line-height: 30upx;
		color: #535353;
	}
	.order-button-margin{
		margin-left:0;
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
	.mine-list-box{
		background-color:#FFFFFF; 
		margin-top: 28upx; 
		border-radius:15upx;
		padding: 12upx 36upx 12upx 32upx;
		box-shadow: 0 0 12upx #f0f0f0;
	}
	.mine-list{
		align-items:center;
		height: 118upx; 
		border-bottom: thin solid #F0F0F0;
	}
	.mine-list image{
		height: 50upx; 
		width: 50upx;
	}
	.mine-list-text{
		align-items: flex-start;
		margin-left: 20upx;
		flex: 1;
	}
	.mine-list-text text:nth-of-type(1){
		font-size: 28upx; 
		color: #232323; 
		line-height: 1.3;
	}
	.mine-list-text text:nth-of-type(2){
		font-size: 22upx; 
		color: #595959; 
		line-height: 1.3;
		margin-top: 8upx;
	}
	.mine-cro-box{
		background-color:#FFFFFF; 
		margin-top: 28upx; 
		border-radius:15upx;
		padding: 0 36upx 0 32upx;
		box-shadow: 0 0 12upx #f0f0f0;
	}
	.mine-cro{
		align-items:center;
		height: 118upx;
	}
	.mine-cro image{
		height: 50upx; 
		width: 50upx;
	}
</style>
