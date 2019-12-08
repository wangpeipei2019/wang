<template>
	<view>
		<view class="uni-common-mt">
			<view class="uni-form-item">
				<view class="title">真实姓名</view>
				<input type="text" class="uni-input" maxlength="12" v-model="name" placeholder="请填写真实姓名" placeholder-style="color:#a8a8a8" />
			</view>
			<view class="uni-form-item">
				<view class="title">身份证</view>
				<input type="idcard" class="uni-input" @input="watchNum" maxlength="18" v-model="card" placeholder="请填写正确的证件信息" placeholder-style="color:#a8a8a8" />
			</view>
			<button type="primary" class="add-btn" @tap="addFriendInfo">新增入住人</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				card:'',
				value:''
			};
		},
		onLoad(){
			this.value = uni.getStorageSync('token');
		},
		methods:{
			watchNum(){
				setTimeout(() => { this.card =this.card.replace(/[^A-Za-z0-9]/g,'') ; }, 3)
			},
			addFriendInfo(){
				var reg= /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				var regName = /^[\u4e00-\u9fa5]+$/; 
				if(this.name==''){
					uni.showToast({
						title: '真实姓名不能为空',
						icon:'none'
					});
					return
				}if(this.name!=''&&!regName.test(this.name)){
					
						uni.showToast({
							title: '姓名输入有误',
							icon:'none'
						});
						return
				}
				if(this.card==''){
					uni.showToast({
						title: '身份证号不能为空',
						icon:'none'
					});
					return
				}if(this.card!=''&&!reg.test(this.card)){
					
						console.log(this.card)
						uni.showToast({
							title: '身份证号输入有误',
							icon:'none'
						});
						return
				}		
				else{
						uni.request({
							url: this.getApp.api.friendInfo.addFriendInfo,
							method: 'POST',
							data: {
								friendName:this.name,
								friendCard:this.card,
							},
							header:{
								token:this.value
							},
							success: res => {
								// console.log(JSON.stringify(res))
								if(res.data.code==0){
									uni.redirectTo({
										url:'check-list'
									})
								}else{
									uni.showToast({
										title: '失败，请重试',
										mask: false,
										icon: 'none',
										duration: 1500
									});
								}
							}
						});
					}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-common-mt {
		margin-top: 38upx;
		box-sizing: border-box;
		padding: 0 30upx;

		.add-btn {
			background: $uni-color-level-gradual;
			width: 100%;
			border-radius: 15upx;
			height: 78upx;
			color: #fff;
			line-height: 78upx;
			// font-weight: bold;
			font-size: 30upx;
			margin-top: 80upx;

			&.add-btn:after {
				border: none;
			}
		}
	}

	.uni-form-item {
		justify-content: space-between;
		border-bottom: 1px solid #e7e7e7;
		height: 90upx;
		align-items: center;
		padding: 0;

		.title {
			padding: 0;
			font-size: 28upx;
			color: #656565;
		}

		.uni-input {
			font-size: 26upx;
			color: #333;
			padding: 0 52upx;
			text-align: right;
		}
	}
</style>
