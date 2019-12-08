<template>
	<view class="uni-flex uni-column">
		<tenant-index v-if="role == 'tenant'" ref="tenantIndexRef"></tenant-index>
		<landlord-order v-if="role == 'landlord'" ref="landlordOrder"></landlord-order>
		<!-- <view class="ssbu-bottom"></view> -->
	</view>
</template>

<script>
	import tenantIndex from "@/components/tenant-index.vue"
	import landlordOrder from "@/components/landlord-order.vue"
	import amap from '@/common/lib/amap-wx.js';

	export default {
		components: {
			'tenant-index': tenantIndex,
			'landlord-order': landlordOrder
		},
		data() {
			return {
				landlordOrderList: {},
				token: ''
			}
		},
		onShow() {
			if (this.$store.state.role == 'landlord') {
				this.$refs.landlordOrder.landlordInfo()
			}
		},
		computed: {
			role: function() {
				return this.$store.state.role;
			},
			location: function() {
				return this.$store.state.location
			}
		},
		methods: {

		},
		onLoad: function() {
			var token1 = uni.getStorageSync('token');
			var token2 = this.$store.state.token;
			// console.log(token1);
			// console.log(token2);
			if (token1 != '' && token2 == '') {
				this.$store.commit('changeToken', uni.getStorageSync('token'));
				uni.request({ //用户信息
					url: this.getApp.api.querylandLordInfo,
					method: 'POST',
					data: {},
					header: {
						token: uni.getStorageSync('token')
					},
					success: res => {
						this.$store.commit('changeUserInfo', res.data);
					}
				});
			}
		}
	}
</script>

<style>
	page {
		/* height: auto;
		min-height: 100%; */
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #FAFAFA;
	}
</style>
