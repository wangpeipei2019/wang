<template>
	<view class="other">
		
	<view>
		<view class="title">您接待的一下房客</view>
		<radio-group class="uni-flex uni-row" name="gender" @change="radioChange">
			<view  class="uni-flex uni-row radioList">
				<view>儿童</view>
				<radio style="transform:scale(0.8)"  value="儿童" /></label>
			</view>	
			<view  class="uni-flex uni-row radioList">
				<view>老人</view>
				<radio value="老人" style="transform:scale(0.8)"  /></label>
			</view>
		</radio-group>
		
	</view>
	<view>
		<view class="title">您可接待房客的性别</view>
		<radio-group class="uni-flex uni-row" name="gender">
			<view  class="uni-flex uni-row radioList">
				<view>男</view>
				<radio value="男"  style="transform:scale(0.8)"/></label>
			</view>	
			<view  class="uni-flex uni-row radioList">
				<view>女</view>
				<radio value="女" style="transform:scale(0.8)" /></label>
			</view>
		</radio-group>
	</view>
	<view class="title">对客要求</view>
	
	<view class="uni-flex uni-column  check" @change="checkboxChange">
		<label class="uni-flex uni-row otherList" v-for="item in items" :key="item.value">
			
			<view class="left">{{item.name}}</view>
			<view class="right">
				<checkbox  :color="radioColor" style="transform:scale(0.8)" :value="item.value" :checked="item.checked" />
			</view>
		</label>
	</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'checkbox',
				items: [{
						value: 'USA',
						name: '允许吸烟'
					},
					{
						value: 'CHN',
						name: '允许带宠物',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '允许做饭'
					},
					{
						value: 'JPN',
						name: '允许聚会'
					},
					{
						value: 'ENG',
						name: '允许商业拍摄'
					},
					{
						value: 'FRA',
						name: '允许加床'
					},
					{
						value: 'FAA',
						name: '允许额外家人'
					}
				],
				radioColor:'#45c298'
				
			}
		},
		methods: {
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			radioChange: function(e) {
				var checked = e.target.value
				console.log(checked)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other{
		width: 100%;
		height: 100vh;
		background-color: #f8f8fb;
	}
	.check{
		width: calc(100% - 30upx);
		background-color: #ffffff;
		padding: 0 0 0 30upx;
	}
	.otherList{
		justify-content: space-between;
		height: 88upx;
		width: calc(100% - 30upx);
		padding-right: 30upx;
		border-bottom: 1upx solid #f3f3f3;
		
	}
	.otherList .left{
		height: 88upx;
		line-height: 88upx;
		color: #656565;
		font-size: 24upx;
	}
	.otherList .right checkbox {
		margin-top: 15upx;
		border-radius: 50%;
		
	}
	.uni-checkbox .uni-checkbox-input {
		border-radius: 50%;
	}
	.uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: $uni-text-color-red;
	}
	.other .title{
		line-height: 1em;
		font-size: 24upx;
		color: #3d3d3d;
		padding:  45upx 0 24upx 30upx ;
	}
	.radioList:nth-of-type(1){
		margin-left: 35upx;
		margin-right:25upx;
	}
	.radioList{
		justify-content: center;
		width: 214upx;
		height: 60upx;
		border:1upx solid #f3f3f3;
		box-shadow: 4upx 2upx 4upx #e7e7e7;
		border-radius: 30upx;
		background-color: #ffffff;
		margin-right: 20upx;
		color: #656565;
	}
	 .radioList view{
		color:  $uni-text-color-green;
		font-size: 24upx;
		line-height: 60upx;
		margin-right:35upx;
		}
	.radioList radio{
	 	margin-top: 1upx; 
	}
	
</style>
