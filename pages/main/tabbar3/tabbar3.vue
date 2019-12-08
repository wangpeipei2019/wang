<template>
	<view>
		 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
		<uni-nav-bar v-if="role == 'tenant'" z-index="99" :backgroundColor="bg"  fixed="true" statusBar="true" @click-left="openNews" @click-right="setting">
			<block slot="left">
				<view>
					<view class="chat" style="padding-left: 30upx;">
						<uni-icon type="chat"  :color="color1" size="22"></uni-icon>
						<view  v-if="appMessage>0" class="box"></view>
					</view> 
					
				</view>
			</block>
			<block slot="right">
				<view  class="gear" style="z-index: 10;">
					<uni-icon type="gear" :color="color2" size="25"></uni-icon>
				</view>
			</block>
		</uni-nav-bar>
	 
		<view class="uni-flex uni-column">
			<tenant-mine v-if="role == 'tenant'" ref='tenantMine' :checkInNum="checkInNum" :footprint="footprint"></tenant-mine>
			<landlord-mine v-if="role == 'landlord'" ref='landlordMine'></landlord-mine>
			<view class="uni-flex uni-row" @click="changeRole" style="align-items:center; justify-content: center; background-color:#FFFFFF; margin: 28upx 30upx; border-radius:15upx;padding: 30upx 36upx 30upx 32upx;box-shadow: 0 0 5px #f0f0f0;">
				<image src="/static/tenant-mine/tab_icon_landlord@xxxhdpi.png" style="height: 22px; width: 22px;"></image>
				<text class="checkStyle" style="font-size: 15px; line-height: 1;margin-left: 22px;">{{changeTitle}}</text>
			</view>
			<view class="ssbu-bottom"></view>
		</view>
	</scroll-view> 
	</view>
</template>

<script>
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue';
	import uniBadge from '@/components/lib/uni-badge/uni-badge.vue';
	import uniNavBar from '@/components/lib/uni-nav-bar//uni-nav-bartab.vue';
	import tenantMine from '@/components/tenant-mine.vue';
	import landlordMine from '@/components/landlord-mine.vue';

	export default {
		components: {
			'uniIcon':uniIcon,
			'uniBadge':uniBadge,
			'uniNavBar':uniNavBar,
			'tenant-mine': tenantMine,
			'landlord-mine': landlordMine
		},
		data() {
			return {
				value: '',
				token: '',
				 bg:"rgba(255,255,255,0)", 
				scrollTop: 0,
				 old: {
					scrollTop: 0
				}, 
				color1:'#ffffff',
				color2:'#ffffff',
				appMessage:0,
				checkInNum:0,
				footprint:0,
			}
		},
		computed: {
			changeTitle: function() {
				if (this.$store.state.role == 'tenant') {

					return '切换成为房东';
				} else {

					return '切换成为房客';
				}
			},
			role: function() {
				return this.$store.state.role;
			}
		},
		onShow() {
			if (this.$store.state.role == 'tenant') {
				this.$refs.tenantMine.tenantCheck()
				this.getCheckInNum()
				this.queryFootprintList()
			} else {
				this.$refs.landlordMine.landlordCheck()
			}
		},
		created() {
			this.imageUrl=this.getApp.api.urlImage
			this.token = uni.getStorageSync('token');
			this.getMessage(); 
		},
		methods: {
			changeRole: function() {
				if (this.$store.state.role == 'tenant') {
					uni.request({
						url: this.getApp.api.attestation.checkUserAudit,
						method: 'POST',
						data: {},
						header: {
							token: this.token
						},
						success: res => {
							if (res.data.code == 0) {
								if (res.data.status == 1) {
									this.$store.commit('changeRole', 'landlord');
									uni.setTabBarItem({
										index: 0,
										text: '订单',
										iconPath: "static/tabIcon/tab_order_normal.png",
										selectedIconPath: "static/tabIcon/tab_order_selected.png"
									});
									uni.setTabBarItem({
										index: 1,
										text: '房源',
										iconPath: "static/tabIcon/tab_house_normal.png",
										selectedIconPath: "static/tabIcon/tab_house_selected.png"
									});
									uni.setTabBarItem({
										index: 2,
										text: '消息',
										iconPath: "static/tabIcon/tab_message_normal.png",
										selectedIconPath: "static/tabIcon/tab_message_selected.png"
									});
								} else if(res.data.status == 0) {
									uni.showToast({
										title: '审核中，请耐心等待',
										icon:'none'
									});
								}else if(res.data.status == 2){
									uni.showModal({
										content: '很遗憾审核不通过！请填写真实信息',
										confirmColor:'#45c298',
										success: res => {
											if(res.confirm){
												this.openInformation()
											}
										},
									});
								}else{
									this.openInformation()
								}
							}
						}
					});
				} else {
					this.$store.commit('changeRole', 'tenant');
					uni.setTabBarItem({
						index: 0,
						text: '首页',
						iconPath: "static/tabIcon/tab_home_normal@xxxhdpi.png",
						selectedIconPath: "static/tabIcon/tab_home_selected@xxxhdpi.png"
					});
					uni.setTabBarItem({
						index: 1,
						text: '发现',
						iconPath: "static/tabIcon/tab_discover_normal@xxxhdpi.png",
						selectedIconPath: "static/tabIcon/tab_discover_selected@xxxhdpi.png"
					});
					uni.setTabBarItem({
						index: 2,
						text: '众筹',
						iconPath: "static/tabIcon/tab_crowdfunding_normal@xxxhdpi.png",
						selectedIconPath: "static/tabIcon/tab_crowdfunding_selected@xxxhdpi.png"
					})
				}
			},
			openInformation() {
				uni.navigateTo({
					url: "/pages/tenant/application-landlord/information"
				})
			},
			 scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			//	console.log(this.old.scrollTop)
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
			 getMessage(){
				uni.request({
					url: this.getApp.api.smsmessage.HomePageMessage,
					method: 'POST',
					header: {
						token: this.token
					},
					success: res => {
				//		console.log(res)
						if(res.data.code==0){
							if(res.data.unreadNumber!=''&&res.data.unreadNumber!=null)
							this.appMessage=res.data.unreadNumber
						}
					}
				});
			},
			setting() {
				uni.navigateTo({
					url: '/pages/setting/main/main-setting'
				});
			},
			openNews() {
				uni.redirectTo({
					url: '/pages/tenant/index/index-message/index-message'
				});
			},
			getCheckInNum(){
				uni.request({
					url: this.getApp.api.friendInfo.friendList,
					method: 'POST',
					data: {},
					header: {
						token: this.token
					},
					success: res => {
						this.checkInNum = res.data.lEntities.length
					},
					fail: () => {},
					complete: () => {}
				});
			},
			queryFootprintList(){
				uni.request({
					url: this.getApp.api.footprint.queryFootprintList,
					method: 'POST',
					data: {},
					header:{
						token:this.token
					},
					success: res => {
						this.footprint = res.data.footprint.length
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: auto;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #FAFAFA;
	}
	.scroll-Y{
		height:100vh; 
	} 
	.iconStatus{
		position: relative;
	}
	.iconStatus image{
		width: 30upx;
		height: 30upx;
	}
	.box{
		width: 22upx;
		z-index: 999; 
		height: 22upx;
		border-radius: 50%;
		background:red;
		position: absolute;
		top:62upx;
		left:71upx;
		
	} 
	 .checkStyle{
		color:$uni-text-color-green;
	} 
</style>
