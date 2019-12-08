<template>
	<view class="types">
		<uni-nav-bar fixed="true" statusBar="true" @click-left="comeBack" right-text="保存" @click-right="saveHouseType" left-icon="back" title="房屋类型"></uni-nav-bar>
		<view class="uni-flex uni-column">
			<radio-group class="uni-flex uni-column" @change="radioChange">
				<view class="uni-flex uni-column typesListWrap" v-for="item in dictData" :key="item.code">
					<view class="uni-flex uni-row typesList">
						<view class="left">
							<view>{{ item.value }}</view>
						</view>
						<view class="right">
							<label>
								<radio :color="radioColor" :value="[item.code,item.value]" style="transform:scale(0.8)"></radio>
							</label>
						</view>
					</view>
				</view>
			</radio-group>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				dictData: [],
				value:[],
				radioColor:'#45c298'
			}
		},
		methods: {
			comeBack(){
				uni.navigateBack({});
			},
			saveHouseType(){
				this.$store.commit('changeHouseType',this.value);
				uni.navigateBack({});
			},
			radioChange: function(e) {
				this.value = e.target.value.split(',')
			},
			getHouseType() {
				uni.request({
					url: this.getApp.api.dict,
					method: 'GET',
					data: {
						type: 'house_type'
					},
					success: res => {
						this.dictData = res.data.dictData
						// console.log(JSON.stringify(res))
					}
				});
			}
		},
		onLoad() {
			this.getHouseType()
		},
		components:{
			uniNavBar
		}
	}
</script>

<style scoped>
	view {
		line-height: 1em;
	}

	.typesTitle {
		width: calc(100% - 30upx);
		height: 42upx;
		background-color: #f4f9fc;
		border-top: 4upx solid #f6f6f6;
		border-bottom: 4upx solid #f6f6f6;
		font-size: 24upx;
		color: #a1a1a1;
		padding-top: 40upx;
		padding-left: 30upx;
	}

	.typesListWrap {
		width: 100%;
		background: #ffffff;
		border-bottom: 1upx solid #f6f6f6;
	}

	.typesList {
		justify-content: space-between;
		margin-left: 30upx;
		padding-right: 0;
		width: calc(100% - 30upx);
		height: 88upx;
		background-color: #ffffff;
		border-bottom: 1upx solid #efefef;
	}

	.typesListWrap .typesList:nth-last-child(1) {

		border-bottom: 0;
	}

	.typesList .left view:nth-child(1) {
		color: #252525;
		font-size: 24upx;
		line-height: 88upx;
	}
	.typesList .left view:nth-child(2) {
		color: #656565;
		font-size: 22upx;
	}

	.typesList .right radio {
		margin-top: 18upx;
		/* line-height: 88upx; */
	}

	.uni-radio-input {}
</style>
