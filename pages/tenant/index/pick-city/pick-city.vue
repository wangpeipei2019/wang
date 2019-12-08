<template>
	<view class="container">
		<uni-nav-bar fixed="true" statusBar="true" left-icon="back" title="城市定位" @click-left="comeBack"></uni-nav-bar>
		<uni-indexed-list :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
	import uniNavBar from '@/components/lib/uni-nav-bar/uni-nav-bar.vue';
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	export default {
		data() {
			return {

			};
		},
		components: {
			uniIndexedList,
			uniNavBar
		},
		methods: {
			bindClick(e) {
				console.log(e)
				this.$store.commit('changeCityName', e.item.name);
				uni.reLaunch({
					url: '/pages/main/tabbar0/tabbar0'
				});
			},
			comeBack() {
				uni.navigateBack({});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fafafa;
	}
</style>
