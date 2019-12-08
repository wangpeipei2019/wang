<template>
	<view v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack()"  @click-right="addAddress" title="新增收件地址" rightText="新增"></uni-nav-bar>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-flex uni-list-item" v-for="item in inputAddress" :key="item.id">
					<view class="ckeck-height">
						<checkbox :value="[item.id,item.addresseeName,item.contactNumber,item.detailedAddress]" style="transform:scale(0.7)" color="#45c298" :checked="item.checked" />
					</view>
					<view class="uni-flex uni-column item-text">
						<view class="name-title">{{item.addresseeName}} <span>{{item.contactNumber}}</span></view>
						<view class="identity-label">{{item.detailedAddress}}</view>
					</view>
					<image class="del" @click.stop="delModal(item.checked,item.id)" :src="imageUrl+'nav_icon_delete.png'" mode="widthFix"></image>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	export default{
		data(){
			return{
				token:'',
				allList: [],
				inputAddress:[],
				imageUrl:'',
				isShow:false
			}
		},
		components: {
			uniNavBar,
			uniIcon
		},
		computed:{
			receipt(){
				return this.$store.state.receipt
			}
		},
		onLoad(){
			this.token = uni.getStorageSync('token')
			this.imageUrl = this.getApp.api.urlImage
			this.getAddressList()
		},
		methods:{
			addAddress(){
				uni.redirectTo({
					url:'/pages/setting/main/address'
					})
				},
			comeBack(){
					/* uni.redirectTo({
						url:'/pages/setting/main/main-setting'
					}) */
					uni.navigateBack({})
			},
			getAddressList(){
				uni.request({
					url: this.getApp.api.crowdFunding.addressList,
					method: 'POST',
					data: {},
					header:{
						token:this.token
					},
					success: res => {
						console.log(res)
						this.inputAddress = res.data.inputAddress
						this.isShow=true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			checkboxChange(e) {
				var items = this.inputAddress,
					values = e.detail.value;
				this.allList = values
				console.log(e)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id + ',' + item.addresseeName + ',' + item.contactNumber + ',' + item.detailedAddress)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				// console.log(JSON.stringify(this.friendList))
			},
			addFriend() {
				let newList = []
				for (let i in this.allList) {
					this.allList[i] = this.allList[i].split(',')
					newList.push({
						id: this.allList[i][0],
						addresseeName: this.allList[i][1],
						contactNumber: this.allList[i][2],
						detailedAddress: this.allList[i][3],
					})
				}
				if(this.receipt.length>0){
					for (let i in this.receipt) {
						for(let j in newList){
							if(this.receipt[i].id == newList[j].id){
								newList.splice(j,1)
							}
						}
					}
				}
				newList = this.receipt.concat(newList)
				this.$store.commit('changeReceipt', newList)
				this.comeBack()
			},
			delModal(checked,id){
				if(checked){
					uni.showModal({
						content: "确定删除此收件地址吗",
						confirmText: "确定",
						confirmColor: '#45c298',
						cancelText: "取消",
						success: res => {
							if(res.confirm){
								uni.request({
									url: this.getApp.api.crowdFunding.deleteAddress,
									method: 'POST',
									data: {
										id:id
									},
									header:{
										token:this.token
									},
									success: res => {
										if(res.data.code==0){
											uni.showToast({
												title: '删除成功',
												icon:'none'
											});
											this.getAddressList()
										}else{
											uni.showToast({
												title: '删除失败，请重试',
												icon:'none'
											});
										}
									},
									fail: () => {
										uni.showToast({
											title: '系统内部错误，请联系客服',
											icon:'none'
										});
									},
									complete: () => {}
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}
	
	.add-people {
		line-height: 44px;
		font-size: 30upx;
		position: relative;
		right: 15upx;
		color: $uni-text-color-green;
	}
	
	.uni-list {
		padding: 20upx 30upx 0 30upx;
		box-sizing: border-box;
		border-top: 5upx solid #ededed;
	}
	
	.uni-list-item {
		justify-content: flex-start;
		flex: 1;
		// border-bottom: 1upx solid #e7e7e7;
	}
	
	.del {
		width: 40upx;
		height: 40upx;
		margin-left: 50upx;
	}
	
	.uni-list-item:after,
	.uni-list:after,
	.uni-list:before {
		height: 0;
	}
	
	.uni-list-item {
		position: relative;
		align-items: center;
		box-sizing: border-box;
		padding:10upx;
		min-height: 160upx;
	}
	
	.uni-list-item:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		-ms-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.item-text {
		font-size: 26upx;
		color: #3d3d3d;
		width:510upx;
		.name-title {
			margin: 0 0 20upx;
			color: #333;
			font-weight: bold;
			word-wrap: break-word;
		}
	}
	
	.identity-label {
		margin-right: 20upx;
		word-wrap: break-word;
		line-height:1.3em;
	}
	
	.ckeck-height {
		position: relative;
		top: -18upx;
		margin-right: 15upx;
	}
	
	.add-btn {
		background: $uni-color-level-gradual;
		width: calc(100%-60upx);
		height: 78upx;
		line-height:78upx;
		color: #fff;
		font-weight:bold;
		font-size: 32upx;
		border-radius: 15upx;
		margin:30upx;
	}
	
	.add-btn:after {
		border: none;
	}
</style>

