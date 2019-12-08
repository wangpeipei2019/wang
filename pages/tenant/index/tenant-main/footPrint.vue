<template><!-- 添加动态数据-->
	<view class="tenant" v-if="isShow">
		<view class="uni-flex uni-column" @tap="chalet(item.house_id)" v-for="item in footprint" :key="item.id">
			<view class="imgTop"> 
				<image class="imgBig" :src="urlImage+item.house_img"></image>
				<view class="sell">￥{{item.price}}</view>
			</view>
			<view class="uni-flex uni-row list"> 
				<view class="left">
					<view class="title">{{item.additional_explanation}}/{{item.house_name}}</view>
					<view class="specification">
						<text style="margin-right:16upx;">{{item.house_type_bedroom}}居/{{item.house_area}}平米/宜住{{item.fit_number}}人</text>
						<text>{{item.area}}</text>
					</view>
					<!-- <view class="uni-flex uni-row mandatory">
						<view>智能门锁</view>
						<view>速订</view>
						<view>实拍</view>
					</view> -->
				</view>
				<view class="right">
					<image :src="urlImage+'fanfdong_pho@2x.jpg'" ></image>
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
				urlImage:'',
				isShow:false,
				token:'',
				footprint:[],
			};
		},
		onLoad(){
			this.urlImage = this.getApp.api.urlImage
			this.token = uni.getStorageSync('token')
			this.queryFootprintList()
		},
		methods:{
			queryFootprintList(){
				uni.request({
					url: this.getApp.api.footprint.queryFootprintList,
					method: 'POST',
					data: {},
					header:{
						token:this.token
					},
					success: res => {
						this.footprint = res.data.footprint
						this.isShow = true
					},
					fail: () => {},
					complete: () => {}
				});
			},
			chalet(id){
				this.$store.commit('changeHouseCard',id)
				uni.navigateTo({
					url: '/pages/tenant/index/chalet-detail/chalet-detail?id='+id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tenant {
		background-color: #FFFFFF; 
		margin-top: 33upx;
		padding:33upx 30upx 0 30upx;
		border-top:3upx solid #f0f0f0;
	}

	.imgTop .imgBig{
		width: 100%;
		height: 450upx;
		vertical-align: top;
		border-radius: 15upx;
	}
	.sell{
		width: 100upx;
		height: 58upx;
		border-radius: 10upx;
		background-color: #45c298;
		color: #ffffff;
		font-size: 32upx;
		line-height: 58upx;
		text-align: center;
		position: absolute;
		/* top: 450upx; */
		margin-top:-56upx;
	}
	.list{
		height: 150upx;
		justify-content: space-between;
		align-items: center;
	}
	.list .left{
		line-height: 1em;
		
		// display:flex;
		// justify-items: center;
	}
	.right image{
		width: 95upx;
		height: 95upx;
		border-radius: 50%;
		vertical-align: top;
	}
	.list .left .title{
		line-height: 1em;
		font-size: 30upx;
		color: #1a1a1a;
	}
	.list .left .specification{
		line-height: 1em;
		font-size: 24upx;
		color: #1a1a1a;
		margin-top:13upx;
	}
	
	 .mandatory view{
		line-height: 1em;
		font-size: 24upx;
		color: #888888;
		margin-top:13upx;
	}
</style>
