<template>
	<view class="landlordDta" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true"  left-icon="back" right-text="保存"  @click-left="comeBack" @click-right="expFn"  title="编辑资料"></uni-nav-bar>
		<view class="uni-flex uni-row imgIcon">
			<view class="left">
				<image :src="imageUrl+defaultPic"></image>
			</view>
			<view class="inp">
				<input :disabled="isDisabled"  maxlength="20" placeholder-style="color:#cdcdcd" v-model="userName" placeholder="修改昵称" :focus="isFocus" />
			</view>
			<view class="textImg" @tap="getFocus">
				<image :src="imageUrl+'menu_icon_edit2@xxxhdpi.png'"></image>
			</view>
			<view class="picWarp">
			 <view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						</view>
					</block>
					<view class="uni-uploader__input-box pickerPort">
						<view  id="haderImg" :range="haderImg" class="uni-uploader__input" @tap="chooseImage"></view>
					</view>
				</view>
			</view>
		</view>
		 <uni-popup :show="type === 'bottom'" position="bottom" mode="fixed" @hidePopup="togglePopup('')">
			<view class="viewList" @tap="togglePopup('')">相册</view>
			<view class="viewList" @tap="togglePopup('')">拍照</view>
			<view class="viewList" @tap="togglePopup('')">取消</view>
		
		</uni-popup>
		<view class="uni-flex uni-column dataWarp">
			<view class="top border-top" @tap="addInfo">个人信息</view>
			<view class="topText" v-if="id=='tenant'">完善的个人信息有助于获得房东的信任</view>
			<view class="topText" v-if="id=='landlord'">完善的个人信息有助于获得房客的信任</view>
			<view class="uni-flex uni-row geren">
				<view class="left">性别</view>
				<view class="right">
					<input @click="showSinglePicker()" disabled placeholder-style="color:#a8a8a8;" type="text" v-model="gender" placeholder="请选择性别" />
				</view>
			</view>
			<view class="uni-flex uni-row geren">
				<view class="left">年龄</view>
				<view class="right"><input maxlength="3" @input="watchAge" placeholder-style="color:#a8a8a8;" v-model="age" type="number" placeholder="你的年龄" /></view>
			</view>
			<view class="uni-flex uni-row geren">
				<view class="left">家乡</view>
				<view class="right"><input placeholder-style="color:#a8a8a8;" v-model="hometown" type="text" placeholder="你的家乡" /></view>
			</view>
			<view class="uni-flex uni-row geren">
				<view class="left">所在城市</view>
				<view class="right"><input placeholder-style="color:#a8a8a8;" v-model="city" type="text" placeholder="你所在城市" /></view>
			</view>
			<view class="uni-flex uni-row geren">
				<view class="left">教育</view>
				<view class="right"><input placeholder-style="color:#a8a8a8;" v-model="education" type="text" placeholder="你的教育背景" /></view>
			</view>
			<view class="uni-flex uni-row geren">
				<view class="left">行业</view>
				<view class="right"><input placeholder-style="color:#a8a8a8;" v-model="industry" type="text" placeholder="你工作的行业" /></view>
			</view>
			<view class="uni-flex uni-row geren hobby">
				<view class="left">兴趣爱好</view>
				<view class="right"><input placeholder-style="color:#a8a8a8;" v-model="hobby" type="text" placeholder="添加兴趣爱好,结识兴趣相投的朋友" /></view>
			</view>
			<view v-if="id=='landlord'">
				<view class="top">社交介绍</view>
				<view class="social">
					<textarea type="text" v-model="Introduction" placeholder="对自己做一个有趣的介绍吧"></textarea>
				</view>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :titleText="title" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>  
import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import landlordSpare from '@/components/landlord-spare.vue'
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'

var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
export default {
	components: {
		uniNavBar,
		uniIcon,
		uniPopup,
		landlordSpare,
		mpvuePicker
	},
	
	data() {
		return {
			type: '',
			id:"",
			imageList: [],
			"haderImg":[],
			"livingrRoom":[], 
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 1,
			count: [1],
			defaultPic:'pho_1@3x.png', 
			isFocus: false,
			isDisabled:true,
			userName:'',
			imageUrl:'',
			gender:'',
			genderId:'',
			age:"",
			hometown:'',
			city:'',
			education:'',
			industry:'',
			hobby:'',
			Introduction:'',
			saveUrl:'',
			pickerSingleArray: [{
					label: '男',
					value: 0
					},
					{
					label: '女',
					value: 1
					}
				],
				pickerValueArray:[],
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				isShow:false
		};
	},
	created(){
		this.imageUrl = this.getApp.api.urlImage
		this.token = uni.getStorageSync('token')
		this.tenantInfo()
	},
	onLoad(e) {
		this.id = e.id
		if( e.id=='landlord'){
			this.saveUrl= this.getApp.api.mainData.updateLandlordPersonal
		} else if(e.id=='tenant'){
			this.saveUrl= this.getApp.api.mainData.updateUserPersonal
		}
	},
	
	onUnload() {
			this.imageList=[],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 2,
			this.sizeType = ['压缩', '原图', '压缩或原图']
			this.countIndex = 8; 
	},
	methods:{
		togglePopup(type) {
			this.type = type;
		},
		chooseImage: async function(e) {
				if (this.imageList.length === 1) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[0],
					count: this.imageList.length + this.count[this.countIndex] > 1 ? 1 - this.imageList.length : this.count[this.countIndex], 
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						var index = this.imageList.length - 1
						 uni.uploadFile({
							url: this.getApp.api.uploadFile,
							filePath: this.imageList[index],
							name: 'file',
							formData: {
								type: 4
							},
							header: {
								token: this.token
							},
							success: (uploadFileRes) => {
								let imgData = JSON.parse(uploadFileRes.data)
								if (imgData.code == 0) {
									this.defaultPic = imgData.newFileName
								}
							}
						}); 
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					 this.imageList = []; 
					 res(true);
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
					console.log(e);
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			getFocus(){
				this.isFocus='focus'
				this.isDisabled=false
			},
			comeBack(){
				uni.reLaunch({
					url: '/pages/main/tabbar3/tabbar3'
				});
			},
			tenantInfo(){
				uni.request({
					url: this.getApp.api.mainData.userPersonal,
					method: 'POST',
					header: {
						token: this.token
					},
					success: res => {
						console.log(res)
						if(res.data.code==0){
							if(this.id=='tenant'){
								this.defaultPic=res.data.uEntity.userPic
								if(res.data.uEntity.userName!=''&&res.data.uEntity.userName!=null){
									this.userName=res.data.uEntity.userName
								}
							}else if(this.id=='landlord'){
								this.defaultPic=res.data.uEntity.landlordPic
								if(res.data.uEntity.landlordName!=''&&res.data.uEntity.landlordName!=null){
									this.userName=res.data.uEntity.landlordName
								}
							}
							if(res.data.uEntity.userSex==0){
								this.genderId=0
								this.gender='男'
							}else if(res.data.uEntity.userSex==1){
								this.gender='女'
								this.genderId=1
								}
							
							if(res.data.uEntity.userAge!=''&&res.data.uEntity.userAge!=null){
								this.age=res.data.uEntity.userAge
							}
							if(res.data.uEntity.userCity!=''&&res.data.uEntity.userCity!=null){
								this.city=res.data.uEntity.userCity
							}
							if(res.data.uEntity.hometown!=''&&res.data.uEntity.hometown!=null){
								this.hometown=res.data.uEntity.hometown
							}
							if(res.data.uEntity.education!=''&&res.data.uEntity.education!=null){
								this.education=res.data.uEntity.education
							}
							if(res.data.uEntity.industry!=''&&res.data.uEntity.industry!=null){
								this.industry=res.data.uEntity.industry
							}
							if(res.data.uEntity.hobby!=''&&res.data.uEntity.hobby!=null){
								this.hobby=res.data.uEntity.hobby
							}
							if(res.data.uEntity.userSocialIntroduction!=''&&res.data.uEntity.userSocialIntroduction!=null){
								this.Introduction=res.data.uEntity.userSocialIntroduction
							}
						}
						this.isShow = true
					}
					
				});
			},
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.gender=e.label
				this.genderId=e.value[0]
			},
			watchAge(){
				setTimeout(() => { this.age =this.age.replace(/\D/g,'') ; }, 3)
			},
			expFn(){
				var reg = /^[a-zA-Z*\u4e00-\u9fa5\d]+$/; 
				var regAge=/^[1-9][0-9]*$/;
				var regHometown=/^[\u4E00-\u9FA5A-Za-z\d\-\_]{1,20}$/;
				var regHobby=/^[\u4E00-\u9FA5，.。！、……A-Za-z\d\-\_]{0,500}$/;
				if(this.userName!=''&&!reg.test(this.userName)){
							uni.showToast({
							title: '输入昵称错误',
							icon:'none'
						});
						return
				}if(this.age!=''&&!regAge.test(this.age)){
						uni.showToast({
							title:'输入年龄错误',
							icon:'none'
						});
						return
				}if(this.age>100){
					uni.showToast({
						title:'输入年龄错误',
						icon:'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if(this.hometown!=''&&!regHometown.test(this.hometown)){
						uni.showToast({
							title:'输入家乡错误',
							icon:'none'
						});
						return
				}if(this.city!=''&&!regHometown.test(this.city)){
						uni.showToast({
						title:'城市输入内容有误',
						icon:'none'
					});
						return
					
				}if(this.education!=''&&!regHometown.test(this.education)){
						uni.showToast({
							title:'输入教育错误',
							icon:'none'
						});
							return
				}if(this.industry!=''&&!regHometown.test(this.industry)){
						uni.showToast({
							title:'输入行业错误',
							icon:'none'
						});
						return
					
				}if(this.hobby!=''&&!regHobby.test(this.hobby)){
						uni.showToast({
							title:'输入爱好错误',
							icon:'none'
						});
						return
				}if(this.Introduction!=''&&!regHobby.test(this.Introduction)){
						uni.showToast({
							title:'输入社交介绍错误',
							icon:'none'
						});
						return
				}else{
					uni.request({
						url: this.saveUrl,
						method: 'POST',
						header: {
							token: this.token
						},
						data:{
							userPic:this.defaultPic,
							landlordPic:this.defaultPic,
							userName:this.userName,
							landlordName:this.userName,
							userSex:this.genderId,
							userAge:this.age,
							userCity:this.city,
							hometown:this.hometown,
							education:this.education,
							industry:this.industry,
							hobby:this.hobby,
							userSocialIntroduction:this.Introduction
						}, 
						success: res => {
						//	console.log(res)
							if(res.data.code==0){
								uni.showToast({
									title: '个人信息修改成功', 
									icon:'none'
								});
							}
						},
						fail: (res) => {
							/* console.log(res) */
						}
					})
				}
			}
	}
	
}


</script>

<style scoped>	
	view{
		line-height: 1em;
	}
	.landlordDta{
		width: 100%;
		background-color:#FFFFFF;
	}
		
.landlordDta .imgIcon{
	width:calc( 100% - 60upx);
	padding: 0 30upx 0 30upx;
	height: 190upx;
	background-color: #f7f9fb;
	background: #ffffff;
	border-top: 10upx solid #f7f9fb;
	}
	.imgIcon .left{
		width: 110upx;
		height: 110upx;
		margin-top: 40upx;
		border-radius: 50%;
		box-shadow:0 0 3px 3px #d5d5d5;
	}
	.imgIcon .left image{
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
		vertical-align: top;
	}
	.imgIcon{
		color: #3d3d3d;
		font-size: 30upx;
		font-weight: bold;
	}
	.picWarp{
		position: absolute;
		margin-top: 40upx;
		left:30upx;
	}
	.uni-uploader__file{
		width: 110upx;
		height: 110upx;
		margin:0;
	}
	.picWarp image{
		position: absolute;
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
	}
	.pickerPort{
		position: absolute;
		left:0;
		width: 110upx;
		height: 110upx;
		margin: 0;
		opacity: 0;
	}
	.imgIcon .name{
		margin: 80upx 35upx 0 35upx; 
		width: 200upx;
		/* background: #00CE47; */
	}
	.imgIcon .inp input{
		margin: 67upx 35upx 0 35upx; 
		width: 200upx;
		width: 200upx;
		line-height: 1em;
	}
	
	.imgIcon .textImg{
		margin: 72upx 0 0 0; 
		width: 44upx;
		height: 44upx;
	}
	.imgIcon .textImg image{
		width: 44upx;
		height: 44upx;
		vertical-align: top;
	}
	.viewList {
		width: 100%;
		height: 88upx;
		font-size: 24upx;
		color: #000000;
		text-align: center;
		border-bottom: 1upx solid #e8e8e8;
		line-height: 88upx;
	}
	
	.viewList:nth-child(3) {
		background-color: #f6f6f6;
	}
	.dataWarp{
		width: calc(100% - 60uox);
		padding: 0 30upx;
		background: #ffffff;
	}
	.dataWarp .top{
		line-height: 64upx;
		font-size: 30upx;
		color: #3d3d3d;
		font-weight: bold;
	}
	.topText{
		font-size: 24upx;
		color: #6b6b6b;
		margin-bottom: 20upx;
	}
	.border-top{
		padding-left: 5upx;
		border-top: 1upx solid #f7f9fb;
	}
	.geren{
		width: 100%;
		justify-content: space-between;
		border-bottom: 1upx solid #f4f4f8;
		height: 102upx;
		line-height: 102upx;
		
		}
	.geren .left{
		font-size:26upx;
		color: #6b6b6b;
		line-height: 102upx;
	}
	
	.geren .right input{
		text-align: right;
		font-size:26upx;
		color: #3d3d3d;
		padding-right: 40upx;
	}
	.hobby input{
		width: 395upx;
	}
	
	.geren .right {
		height: 102upx;
		font-size:26upx;
		 color: #3d3d3d;
		line-height: 102upx;
		padding: 30upx 0;
	}
	
	.geren image{
		width: 30upx;
		height: 30upx;
		margin: 36upx 0 0 10upx;
	}
	
	.social{
	width: 100%;
	height: 300upx;
	border: 1upx solid #f4f4f8;
	border-radius: 8upx;
	margin: 30upx 0;
	}
	.social textarea{
	width: calc(100% - 32upx);
	font-size:26upx;
	color: #6b6b6b;
	padding: 15upx;
	height: 270upx;
	overflow-y: auto;
	background: #ffffff;
	}
</style>
