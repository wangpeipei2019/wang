<template><!--未添加字数校验-->
	<view class="checkWarp">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="comeBack" title="入住方式" right-text="保存" @click-right="save"></uni-nav-bar>
		 <view class="check">
			 <radio-group @change="radioChange">
			 	<view class="radioBox">
			 		<label class="uni-flex uni-row radioList border"  @click="triggerCollapse(0)"  key="">
			 				<view class="left">智能门锁</view>
			 				<view class="right">
			 					<radio value="智能门锁" :checked="index === current" style="transform:scale(0.8)"/>
			 				</view>
			 		</label>
					 <view class="text" :class="{'hide':list[0].display}">
						 <view class="textBox">
							<textarea type="text" maxlength="200" :value="transOne" @input="watchOne()"
							 placeholder-style="color:#656565; font-siz:24upx;"
							 placeholder="请说明门锁的使用方法,以及何时发送门锁密码"></textarea>
							<view>{{changeOne}}/200</view>
						</view>
					</view>
			 	</view>
			 	<view class="radioBox">
			 		<label class="uni-flex uni-row radioList" @click="triggerCollapse(1)" key="">
			 				<view class="left">密码锁</view>
			 				<view class="right">
			 					<radio value="密码锁" :checked="index === current" style="transform:scale(0.8)"/>
			 				</view>
			 		</label>
					<view class="text" :class="{'hide':list[1].display}">
						<view class="textBox">
							<textarea type="text" maxlength="200" @input="watchTow()"
							 placeholder-style="color:#656565; font-siz:24upx;" :value="transTow"
							 placeholder="请说明门锁的使用方法,以及何时发送门锁密码"></textarea>
							 <view>{{changeTow}}/200</view>
						</view>
					</view> 
			 	</view>
				<view class="radioBox">
					<label class="uni-flex uni-row radioList"  @click="triggerCollapse(2)" key="">
							<view class="left">钥匙盒子</view>
							<view class="right">
								<radio value="钥匙盒子" :checked="index === current" style="transform:scale(0.8)"/>
							</view>
					</label>
					 <view class="text" :class="{'hide':list[2].display}">
						<view class="textBox">
							<textarea type="text" maxlength="200" v-model="transThree" @input="watchThree()" 
							placeholder-style="color:#656565; font-siz:24upx;" placeholder="请填写取钥匙方法"></textarea>
							<view>{{changeThree}}/200</view>
						</view>
					</view> 
				</view>
				<view class="radioBox">
					<label class="uni-flex uni-row radioList"  @click="triggerCollapse(3)" key="">
							<view class="left">前台办理</view>
							<view class="right">
								<radio value="前台办理" :checked="index === current" style="transform:scale(0.8)"/>
							</view>
					</label>
				 <view class="text" :class="{'hide':list[3].display}">
						<view class="textBox">
							<textarea type="text" maxlength="200" :value="transFour" @input="watchFour()"
							 placeholder-style="color:#656565; font-siz:24upx;" placeholder="请填写前台办理方式"></textarea>
							 <view>{{changeFour}}/200</view> 
						</view>
					</view> 
				</view>
				<view class="radioBox">
					<label class="uni-flex uni-row radioList"  @click="triggerCollapse(4)" key="">
							<view class="left">其他</view>
							<view class="right">
								<radio value="其他" :checked="index === current" style="transform:scale(0.8)"/>
							</view>
					</label>
					 <view class="text" :class="{'hide':list[4].display}">
						<view class="textBox">
							<textarea type="text" maxlength="200" :value="transfive" @input="watchFive()"
							 placeholder-style="color:#656565; font-siz:24upx;" placeholder="请填写其他入住方式"></textarea>
							 <view>{{changeFive}}/200</view>
						</view>
					</view> 
				</view>
			 </radio-group>
		 </view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default{
		data(){
			return{
				transnum:'',
				Surplus:0,
				changeNum:0,
				transOne:'',
				transTow:'',
				transThree:'',
				transFour:'',
				transFive:'',
				changeOne:'0',
				changeTow:'0',
				changeThree:'0',
				changeFour:'0',
				changeFive:'0',
				list:[
					{
						display:true
					},
					{
						display:true
					},
					{
						display:true
					},
					{
						display:true
					},
					{
						display:true
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			comeBack(){
				uni.navigateBack({})
			},
			save(){
				console.log("保存")
				var reg=/^[\u4E00-\u9FA5，.。！、……A-Za-z\d\-\_]{0,1000}$/;
				if(this.transOne!=''&&reg.test(this.transOne)){
					uni.showToast({
						title: '智能门锁格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else if(this.transTow!=''&&reg.test(this.transTow)){
					uni.showToast({
						title: '密码锁格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else if(this.transThree!=''&&reg.test(this.transThree)){
					uni.showToast({
						title: '钥匙盒子格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else if(this.transFour!=''&&reg.test(this.transFour)){
					uni.showToast({
						title: '前台办理格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}else if(this.transFive!=''&&reg.test(this.transFive)){
					uni.showToast({
						title: '其他格式不正确',
						icon: 'none',
						mask: false,
						duration: 1500
					});
				}
			},
			radioChange(evt) {
				console.log(evt)
			},
			triggerCollapse(e) {
			 	this.display=!this.display 
				 for (var i = 0; i < this.list.length; ++i) {
				 	if (e === i) {
				 		this.list[i].display = !this.list[e].display;
				 	} else {
				 		this.list[i].display = true;
				 	}
				 } 
			},
			watchOne(){
				this.changeOne=this.transOne.length
			},
			watchTow(){
				this.changeTow=this.transTow.length
			},
			watchThree(){
				this.changeThree=this.transThree.length
			},
			watchFour(){
				this.changeFour=this.transFour.length
			},
			watchFive(){
				this.changeFive=this.transFive.length
			}
		}
	}
	
	
</script>

<style scoped>
	 .hide{
		display: none;
	} 
	.checkWarp{
		width: 100%;
		height: 100vh;
		background-color: #f8f8fb;
	}
	.check{
		width: calc(100% - 30upx);
		padding: 0 0 0 30upx;
		background-color: #ffffff;
		margin-top: 12upx;
	}
	.radioBox{
		width: 100%;
		border-bottom: 1upx solid #f3f3f3;
	}
	.radioList{
		justify-content: space-between;
	}
	.radioBox .left{
		font-size: 24upx;
		color: #3d3d3d;
		line-height: 88upx;
	}
	.radioBox .right{
		margin-top:18upx;
	}
	.radioBox .text{
		width:calc(100% - 30upx);
		height: 238upx;
	}
	.textBox{
		width: 100%;
		width: calc(100% - 40upx);
		height: 188upx;
		padding: 20upx 24upx 0 16upx;
		background-color: #f5f9fc;
		border: 1upx solid #f3f3f3;
	}
	.textBox textarea{
		width: 100%;
		height: 146upx;
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
