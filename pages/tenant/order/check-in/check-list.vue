<template>
	<view v-if="isShow">
		<uni-nav-bar color="#535353" fixed="true" statusBar="true" left-icon="back" title="添加入住人" @click-right="openAddCheck"
		 right-text="+ 新增" @click-left="comeBack"></uni-nav-bar>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-flex uni-list-item uni-list-cell" v-for="item in friendList" :key="item.id">
					<view class="ckeck-height">
						<checkbox :color="checkColor"  :value="[item.id,item.friendName,item.friendCard]" :checked="item.checked" />
					</view>
					<view class="uni-flex uni-column item-text">
						<view class="name-title">{{item.friendName}}</view>
						<view class="uni-flex">
							<view class="identity-label">身份证号</view>
							<view>{{item.friendCard}}</view>
						</view>
					</view>
					<image class="del" @click.stop="delModal(item.checked,item.id)" :src="urlImage+'nav_icon_delete.png'"
					 mode="widthFix"></image>
				</label>
			</checkbox-group>
		</view>
		<button type="primary" class="add-btn" v-if="active" @tap="addFriend">添加入住人</button>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				ids: [],
				allList: [],
				token: '',
				active: true,
				title: 'checkbox 复选框',
				friendList: [],
				urlImage:'',
				isShow:false,
				checkColor:'#45c298'
			}
		},
		components: {
			uniNavBar,
			uniIcon
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.active = e.active === "false" ? false : true
			this.token = uni.getStorageSync('token');
			this.getfriendList()
		},
		computed: {
			checkIn: function() {
				return this.$store.state.checkIn
			}
		},
		methods: {
			openAddCheck() {
				uni.redirectTo({
					url: 'add-check'
				});
			},
			checkboxChange: function(e) {
				var items = this.friendList,
					values = e.detail.value;
				this.allList = values
				// console.log(values)
				// console.log(this.allList)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id + ',' + item.friendName + ',' + item.friendCard)) {
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
						name: this.allList[i][1],
						card: this.allList[i][2]
					})
				}
				if(this.checkIn.length>0){
					for (let i in this.checkIn) {
						for(let j in newList){
							if(this.checkIn[i].id == newList[j].id){
								newList.splice(j,1)
							}
						}
					}
				}
				newList = this.checkIn.concat(newList)
				this.$store.commit('addFriend', newList)
				this.$store.commit('checkInNumChange', newList.length)
				uni.navigateBack({
					delta: 1
				});
			},
			delModal(checked, id) {
				console.log(checked)
				if (checked) {
					// this.ids = []
					// this.ids.push(id)
					// console.log(id)
					uni.showModal({
						content: "确定删除此入住人吗",
						confirmText: "确定",
						confirmColor: '#45c298',
						cancelText: "取消",
						success: res => {
							console.log(res)
							if (res.confirm) {
								uni.request({
									url: this.getApp.api.friendInfo.friendDelete,
									method: 'POST',
									data: {
										id: id
									},
									header: {
										token: this.token
									},
									success: res => {
										// console.log(JSON.stringify(res))
										if (res.data.code == 0) {
											uni.showToast({
												title: '删除成功'
											});
											this.getfriendList()
										}
									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			getfriendList() {
				// console.log(this.token)
				uni.request({
					url: this.getApp.api.friendInfo.friendList,
					method: 'POST',
					header: {
						token: this.token
					},
					data: {},
					success: res => {
						// console.log(JSON.stringify(res))
						this.friendList = res.data.lEntities
						this.isShow=true
					}
				});
			},
			comeBack() {
				uni.navigateBack({});
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		line-height: 1em;
	}
.col{
	color:red;
}
	.add-people {
		line-height: 44px;
		font-size: 30upx;
		position: relative;
		right: 15upx;
		color: $uni-text-color-green;
	}

	.uni-list {
		margin: 20upx 0 80upx;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.uni-list-cell {
		justify-content: flex-start;
		flex: 1;
		padding: 0;
	}

	.del {
		width: 40upx;
		height: 40upx;
		margin-left: 50upx;
	}

	.uni-list-cell:after,
	.uni-list:after,
	.uni-list:before {
		height: 0;
	}

	.uni-list-item {
		position: relative;
		align-items: center;
		box-sizing: border-box;
		padding: 0 10upx;
		height: 160upx;
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
		flex: 1;

		.name-title {
			margin: 0 0 20upx;
			color: #333;
			font-weight: bold;
		}
	}

	.identity-label {
		margin-right: 20upx;
	}

	.ckeck-height {
		position: relative;
		top: -18upx;
		margin-right: 15upx;
	}
	
.ckeck-height checkbox{
	color: red;
}
	.add-btn {
		background: $uni-color-level-gradual;
		width: calc(100% - 60upx);
		height: 72upx;
		color: #fff;
		// font-weight:bold;
		font-size: 30upx;
		border-radius: 15upx;
	}

	.add-btn:after {
		border: none;
	}
</style>
