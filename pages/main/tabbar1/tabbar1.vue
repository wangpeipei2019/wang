<template>
	<view>
		<tenant-discovery v-if="role == 'tenant'"></tenant-discovery>
		<landlord-hourse v-if="role == 'landlord'" ref="landlordHouse"></landlord-hourse>
	</view>
</template>

<script>
	import tenantDiscovery from '@/components/tenant-discovery.vue'
	import landlordHouse from '@/components/landlord-house.vue'
	
	export default {
		components: {
			'tenant-discovery': tenantDiscovery,
			'landlord-hourse': landlordHouse
		},
		data() {
			return {
				
			}
		},
		computed: {
			role: function() {
				return this.$store.state.role;
			} 
		},
		onShow(){
			if(this.$store.state.role=='landlord'){
				this.$refs.landlordHouse.getAuditHouseList()
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>
