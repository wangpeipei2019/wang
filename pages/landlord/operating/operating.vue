<template>
	<view class="operWarp" v-if="isShow">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" @click-left="back"   @click-right="scan" right-text="收入明细" title="经营状况"></uni-nav-bar>
		<view class="operatingTop">
			<image :src="urlImage+'nav_report_icon.png'"></image>
			<view>累计收入（元）</view>
			<view>￥<text>{{totalAmount}}.00</text></view>
		</view>
		<view class="operList">
			<view class="uni-flex uni-row">
				<view class="text" @click="showSinglePicker()">
					<view class="uni-flex uni-row textTop">
						<view>当月总收入（元）</view>
						<!-- <view class="triangle-down"></view> -->
					</view>
					<view class="textBtn">{{monthTotalTotalAmount}}</view>
				</view>
				<view class="text">
					<view class="textTop">实住间夜</view>
					<view class="textBtn">{{monthTotalDays}}</view>
				</view>
				<view class="text">
					<view class="textTop">入住率</view>
					<view class="textBtn">{{monthTotalProbability}}%</view>
				</view>
			</view>
		</view>
		<view class="number">房屋经营数据</view>
		<view class="numberList" v-for="item in housingManagement" :key="item.house_id">
			<view class="uni-flex uni-row huoseImg">
				<image :src="urlImage+item.house_img"></image>
				<view>{{item.house_name}}</view>
			</view>
			<view class="operTotal">
				<view class="uni-flex uni-row total">
					<view class="totalList">
						<view>当月总收入（元）</view>
						<view>{{item.totalAmount}}.00</view>
					</view>
					<view class="totalList">
						<view>实住间夜</view>
						<view>{{item.days}}</view>
					</view>
					<view class="totalList">
						<view>入住率</view>
						<view>{{item.probability}}%</view>
					</view>
					<!-- <view class="totalList">
						<view>浏览量</view>
						<view>3</view>
					</view> -->
				</view>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :titleText="title" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-navbar.vue'
	import uniIcon from '@/components/lib/uni-icon/uni-icon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	export default{
		components: {
			uniNavBar,
			uniIcon,
			mpvuePicker
		},
		data(){
			return{
				type: '',
				token:'',
				urlImage:'',
				totalAmount:'0',
				housingManagement:[],
				monthTotalList:[],
				monthTotalDays:'0',
				monthTotalTotalAmount:'0',
				monthTotalProbability:'0',
				pickerSingleArray: [{
						label: '1月',
						value: 1
						},
						{
						label: '2月',
						value: 2
						},
						{
						label: '3月',
						value:3
						},
						{
						label: '4月',
						value: 4
						},
						{
						label: '5月',
						value: 5
						},
						{
						label: '6月',
						value: 6
						},
						{
						label: '7月',
						value: 7
						},
					],
					pickerValueArray:[],
					mode: '',
					deepLength: 1,
					pickerValueDefault: [0],
					pickerText:'',
					isShow:false
			}
		},
		created() {
			
		},
		onLoad(e) {
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token')
			this.getInfo()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			scan() {
				uni.navigateTo({
					url: '/pages/landlord/operating/income',
					})
			},
			showSinglePicker() {
				return
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				console.log(e)
			},
			getInfo(){
				uni.request({
					url: this.getApp.api.operating.cumulative,
					method: 'POST',
					header: {
						 token: this.token, 
					},
					success: res => {
						console.log(res)
						if(res.data.code==0){
							 if(res.data.lEntiy.totalAmount!=''&&res.data.lEntiy.totalAmount!=null){
								this.totalAmount=res.data.lEntiy.totalAmount
								this.monthTotalList=res.data.lEntiy.monthTotal
								this.monthTotalDays=res.data.lEntiy.monthTotal[0].days
								this.monthTotalProbability=res.data.lEntiy.monthTotal[0].probability
								this.monthTotalTotalAmount=res.data.lEntiy.monthTotal[0].totalAmount
								this.housingManagement=res.data.lEntiy.housingManagement
							}
						 }
						 this.isShow=true
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		line-height: 1em;
	}
	.operWarp{
		width: 100%;
		height: 100vh;
		background-color: #fafafa;
	}
	.operatingTop{
		width: 100%;
		height: 400upx;
		background:$uni-color-level-gradual;
		text-align: center;
	}
	.operatingTop image{
		width: 130upx;
		height: 130upx;
		margin:76upx auto 10upx auto;
	}
	.operatingTop view:nth-of-type(1){
		font-size: 24upx;
		color: #ffffff;
		margin:0 0 30upx;
	}
	.operatingTop view:nth-of-type(2){
		font-size:34upx;
		color: #ffffff;
		font-weight: bold;
	}
	.operatingTop view text{
		font-size: 50upx;
		color: #ffffff;
		font-weight: bold;
	}
	.operList{
		width: 690upx;
		height: 145upx;
		background-color: #ffffff;
		border-radius: 15upx;
		margin: 0 30upx;
		box-shadow:0 0 5px #dadada ;
		position: relative;
		margin-top:-58upx;
	}
	.operList .text{
		flex: 1;
		text-align: center;
	}
	.textTop{
		font-size: 24upx;
		color: #474747;
		margin: 45upx 0 10upx 0;
		text-align: center;
		justify-content: center;
	}
	 .textBtn{
		font-size: 30upx;
		color: #313131;
	}
	.textTop view:nth-of-type(1){
		font-size: 24upx;
		color: #474747;
		/* text-align: center; */
	}
	/* .operList .text view:nth-of-type(1){
		font-size: 20upx;
		color: #474747;
		margin: 45upx 0 10upx 0;
	}
	.operList .text view:nth-of-type(2){
		font-size: 30upx;
		color: #313131;
	} */
	.number{
		width: calc(100% - 35upx);
		height:50upx ;
		color: #9b9fa2;
	 	font-size: 26upx; 
		line-height: 50upx;
		padding-left: 35upx;
		background-color: #f8f7fd;
		border-bottom: 10upx solid #f8f7fd;
		border-top: 15upx solid #f8f7fd;
	}
	.huoseImg{
		width: 100%;
		height: 180upx;
		background-color: #ffffff;
		border-bottom:1upx solid #F2F2F2;
	}
	.huoseImg image{
		width: 140upx;
		height: 120upx;
		margin:26upx 0 0 30upx;
	}
	.huoseImg view{
		font-size: 28upx;
		color: #313131;
		padding: 32upx 0 0 8upx;
	}
	.operTotal{
		width: 100%;
	/* 	height: 110upx; */
		background-color: #ffffff;
		/* border-bottom: 15upx solid #f3fcfc; */
	}
	.total{
		width: calc(100% - 28upx);
		padding-left: 28upx;
		height: 110upx;
		border-bottom: 1upx solid #f2f2f2;
	}
	.totalList{
		flex: 1;
		text-align: center;
	}
	.totalList view:nth-of-type(1){
		font-size: 24upx;
		color: #7b7b7b;
		padding: 26upx 0 10upx 0;
	}
	.totalList view:nth-of-type(2){
		font-size: 24upx;
		color: #1d1d1d;
	}
	.triangle-down {
	width: 0;
	height: 0;
	border-left:12upx solid transparent;
	border-right: 12upx solid transparent;
	border-top: 14upx solid #000000;
	}  
	.popListTitle {
		padding: 0 30upx 0 30upx;
		width: calc(100% - 60upx);
		background-color: #ffffff;
		border-bottom: 1upx solid #f8f8f8;
		height: 80upx;
	}
	
	.popListTitle view:nth-child(1) {
		font-size: 22upx;
		color: #6d6d6d;
		width: 50upx;
		line-height: 80upx;
	}
	
	.popListTitle view:nth-child(2) {
		flex: 1;
		color: #3a3a3a;
		font-size: 24upx;
		line-height: 80upx;
	}
	
	.popListTitle view:nth-child(3) {
		font-size: 22upx;
		color:$uni-text-color-green;
		width: 50upx;
		line-height: 80upx;
	}
	.popList {
		text-align: center;
		background-color: #ffffff;
		border-bottom: 1upx solid #f8f8f8;
		height: 84upx;
		line-height: 84upx;
		
	}
	.numberList{
		border-bottom: 20upx solid #f8f7fd;
	}
</style>
