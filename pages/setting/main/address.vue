<template>
	<view class="addressWarp">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()" title="新增收件地址"></uni-nav-bar>
		<view class="uni-flex uni-column addWarp">
				<view class="uni-flex uni-row addList">
					<view class="left">收件人</view>
					<view class="right">
						<input type="text" v-model="addName" placeholder-style="color:#c1c1c1" placeholder="请输入收件人姓名" />
					</view>
				</view>
				<view class="uni-flex uni-row addList">
					<view class="left">联系电话</view>
					<view class="right">
						<input type="number" v-model="addPhone" placeholder-style="color:#c1c1c1" placeholder="请输入联系电话" />
					</view>
				</view>
				<view class="uni-flex uni-row addImg">
					<view class="uni-flex uni-row" @tap="position">
						<view class="left">所在区域</view> 
						<view class="right">
							<input type="text"  v-model="receiveAddress.addressList"  placeholder-style="color:#c1c1c1" placeholder="请选择城市" />
						</view>
					</view>
					<image src="http://113.200.212.12/ymshapi/api/location/my_left_icon.png"></image>
				</view>
				<view class="uni-flex uni-row addList">
					<view class="left">详细地址</view>
					<view class="right">
						<input type="text"  v-model="address"  placeholder-style="color:#c1c1c1" placeholder="请输入详细街道" />
					</view>
				</view>
			</view>
			<button type="primary" class="add-btn" @tap="addressSave">保存</button>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default{
		data(){
			return{
				receiveAddress: {
					province: '',
					city: '',
					area: '',
					provinceId: '',
					cityId: '',
					areaId: '',
					addressList: '',
					
				},
				address: '',
				addName:'',
				addPhone:''
			}
		},
		components: {
			uniNavBar,
			mpvueCityPicker
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
		},
		methods:{
			comeBack(){
					uni.redirectTo({
						url:'/pages/setting/main/addressList'
					})
			},
			position() {
				this.opende = false
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.receiveAddress.province = e.province
				this.receiveAddress.city = e.city
				this.receiveAddress.area = e.area
				this.receiveAddress.provinceId = e.provinceCode
				this.receiveAddress.cityId = e.cityCode
				this.receiveAddress.areaId = e.areaCode
				this.receiveAddress.addressList = this.receiveAddress.province + '-' + this.receiveAddress.city + '-' + this.receiveAddress.area
				
			},
			onCancel(e) {
				console.log(e)
			},
			save(){
				uni.redirectTo({
					url:'/pages/setting/main/addressList'
				})
			},
			addressSave() {
				let regName = /^[\u4e00-\u9fa5A-Za-z]{0,12}$/;
				let regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				let regAddress = /^[\u4e00-\u9fa5]{0,30}$/
				if (this.addName == '') {
					uni.showToast({
						title: '收件人不能为空',
						icon: 'none'
					});
				} else if (!regName.test(this.addName)) {
					uni.showToast({
						title: '收件人格式错误',
						icon: 'none'
					});
				} else if (this.addPhone == '') {
					uni.showToast({
						title: '联系电话不能为空',
						icon: 'none'
					});
				} else if (!regPhone.test(this.addPhone)) {
					uni.showToast({
						title: '联系电话格式错误',
						icon: 'none'
					});
				} else if (this.receiveAddress.cityId == '') {
					uni.showToast({
						title: '所在区域不能为空',
						icon: 'none'
					});
				} else if (this.address == '') {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none'
					});
				} else if (!regAddress.test(this.address)) {
					uni.showToast({
						title: '详细地址格式错误',
						icon: 'none'
					});
				} else {
					uni.request({
						url: this.getApp.api.crowdFunding.addressSave,
						method: 'POST',
						data: {
							addresseeName: this.addName,
							contactNumber: this.addPhone,
							cityId: this.receiveAddress.cityId,
							detailedAddress: this.address
						},
						header: {
							token: this.token
						},
						success: res => {
							this.save()
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	view{
		line-height: 1em;
	}
	.addressWarp{
		width: 100%;
		height: 100vh;
		background-color: #fafafa;
	}
	.addWarp{
		border-top:5upx solid #ededed;
		width: 100%;
		background-color: #fff;
	}
	.addList , .addImg{
		width: calc(100% - 30upx);
		margin-left: 30upx;
		border-bottom: 1upx solid #e7e7e7;
		height: 100upx;
	}
	.addList .left{
		width: 115upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #656565;
	}
	.addList .right{
		height: 100upx;
		margin-left:30upx;
	}
	.addList input{
		font-size: 28upx;
		color: #353535;
		height: 42upx;
		line-height: 42upx;
		margin-top: 23upx
	}
	.addImg{
		justify-content: space-between;
	}
	.addImg .left{
		width: 115upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #656565;
	}
	.addImg .right{ 
		margin-left:30upx;
		color:#353535;
	}
	.addImg input{
		font-size: 28upx;
		color: #353535;
		height: 100upx;
		line-height: 100upx;
	}
	.addImg image{
		width: 30upx;
		height: 30upx;
		margin-top:40upx;
	}
	.add-btn {
		background: $uni-color-level-gradual;
		width: calc(100% - 60upx);
		margin:90upx auto 0 auto;
		height: 72upx;
		color: #fff;
		font-size: 30upx;
		border-radius: 15upx;
	}
</style>
