<template>
	<view class="tenant">
		<uni-nav-bar fixed="true" statusBar="true" title="发现"></uni-nav-bar>
		<view class="discovery-content-box">
			<view class="uni-flex uni-column discovery-content" @tap="discoveryDetail(value.id,value.cityId)" v-for="value in list" :key="value.id">
				<view class="discovery-image-box"> 
					<image class="discovery-image-left" :src="urlImage+value.img"></image>
					<view class="discovery-image-right">
						<image :src="urlImage+value.imgTwo"></image>
						<image :src="urlImage+value.imgThree"></image>
					</view>
				</view>
				<view class="discovery-text-box" >
					<view class="uni-flex uni-row discovery-text-top"> 
						<view class="discovery-text-left">
							<image :src="urlImage+'city_location@2x.png.png'"></image>
							<view>{{value.cityName}}</view>
						</view>
						<view class="discovery-text-right">
							<image :src="urlImage+'fanfdong_pho@2x.jpg'"></image>
						</view>
					</view>
					<text class="discovery-tex">{{value.introduce}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
	export default {
		data() {
			return {
				title: '发现',
				list:[],
				isShow:false,
				urlImage:''
			};
		},
		created(){
			this.urlImage = this.getApp.api.urlImage
			this.getList()
		},
		components:{
			uniNavBar
		},
		 methods: {
			 getList(){
			 	uni.request({
					url:this.getApp.api.find.index,
			 		method: 'GET',
			 		data: {},
			 		success: res => {
			 			 console.log(res);
			 			this.list = res.data.findArea
						this.isShow=true
			 		}
			 	});
			 },
			discoveryDetail(id,cityId){
				uni.navigateTo({
					url: '/pages/tenant/discovery/discovery-detail/discovery-detail?id='+id+'&cityId='+cityId
				});
			}
		} 
	}
</script>

<style lang="scss" scoped>
	.tenant {
		background: #fafafa;
	}
	.discovery-content-box{
		padding:0 25upx 18upx 25upx;
	}
	.discovery-content{
		box-shadow:4upx 4upx 30upx #dcdcdc;
		background-color: #FFFFFF;
		border-radius:15upx; 
		margin-top: 18upx;
		border-top:3upx solid #f0f0f0;
	}
	.discovery-image-box{
		padding:18upx;
		display:flex;
		justify-content: space-between;
	}
	.discovery-image-left{
		width: 340upx; 
		height: 344upx;
		border-radius:15upx;
		vertical-align: top;
	}
	.discovery-image-right{
		display:flex;
		flex-direction: column;
	}
	.discovery-image-right image:nth-of-type(1){
		margin-bottom:8upx;
		width: 310upx; 
		height:169upx;
		border-radius:15upx;
		vertical-align:top;
	}
	.discovery-image-right image:nth-of-type(2){
		width: 310upx; 
		height: 169upx;
		border-radius:15upx;
		vertical-align: top;
	}
	.discovery-text-box{
		padding:0 40upx;
	}
	.discovery-text-top{
		justify-content: space-between;
	}
	.discovery-text-left{
		display:flex;
		align-items:center;
	}
	.discovery-text-left image{
		width: 40upx;
		height:40upx;
		vertical-align: top;
		margin-right:8upx;
	}
	.discovery-text-left view{
		font-size: 32upx; 
		color: #1b1b1b;
		line-height: 1em;
	}
	.discovery-text-right{
		display:flex;align-items:center;
	}
	.discovery-text-right image{
		border-radius: 50%; 
		width: 80upx;
		height: 80upx;
		vertical-align: top;
	}
	.discovery-tex{
		font-size:28upx; 
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3; 
		line-height:1.5em;
		color: #434343;
		margin-bottom: 40upx;
		margin-top:20upx;
	}
</style>
