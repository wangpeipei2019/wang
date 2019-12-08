<view class="setting">
		<view class="uni-flex uni-column listWrap">
			<view class="title">账号绑定</view>
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">手机</view>
				<view class="right" style="height: 102upx;line-height: 102upx;">
					
					<image src="http://113.200.212.12/ymshapi/api/location/my_left_icon.png" @tap='openMainAccount'></image>
				</view>
			</view>
			
			<view class=" uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">邮箱</view>
				<view class="right" style="height: 102upx;line-height: 102upx;">
					<image src="http://113.200.212.12/ymshapi/api/location/my_left_icon.png" @tap='openMainAccount'></image>
				</view>
			</view>
			
			<view class="uni-flex uni-row settingList">
				<view class="left" style="height: 102upx;line-height: 102upx;">清除缓存</view>
				<view class="right" style="height: 102upx;line-height: 102upx;">39.80MB</view>
			</view>
			
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}

		},
		methods: {
			logout() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/main/tabbar0/tabbar0'
				});
			},
			openMainAccount(){
				 uni.navigateTo({
					url: '/pages/setting/main/main-accoumnt'
				}); 
			},
		}
	}
</script>

<style scoped>
	.setting {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;
	}

	.listWrap {
		width: calc(100% - 60upx);
		padding: 0 30upx;
		background-color: #ffffff;
		border-top: 14upx solid #F7F7F7;
		box-shadow: 0 5upx 4upx #e1e4e2;
		margin-bottom: 24upx;
	}
	.listWrap .title{
		font-size: 32upx;
		color: #353535;
		line-height: 102upx;
		height: 102upx;
	}
	.settingList {
		background-color: #ffffff;
		height: 84upx;
		line-height: 84upx;
		width: 100%;
		justify-content: space-between;
		border-bottom: 1upx solid #f5f5f8;
	}

	.settingList image {
		width: 30upx;
		height: 30upx;
		vertical-align: top;
		margin-top: 24upx;
	}

	.settingList .left {
		font-size: 28upx;
		color: #656565;
		line-height: 84upx;
	}

	.settingList .right {
		font-size: 28upx;
		color: #353535;
		line-height: 84upx;
	}

	.orderOff {
		border-bottom: none;
	}

	.setting .bottom {
		width: 100%;
		height: 78upx;
		background-color: #ffffff;
		color: #45C298;
		line-height: 78upx;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		box-shadow: 0 5upx 4upx #e1e4e2;
	}
</style>
