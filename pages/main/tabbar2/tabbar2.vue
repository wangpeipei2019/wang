<template>
	<view>
		<tenant-crowdfunding v-if="role == 'tenant'"></tenant-crowdfunding>
		<landlord-message v-if="role == 'landlord'"></landlord-message>
		<!-- <landlord-message></landlord-message> -->
	</view>
</template>

<script>
	import tenantCrowdfunding from '@/components/tenant-crowdfunding.vue'
	import landlordMessage from '@/components/landlord-message.vue'
	
	export default {
		components: {
			'tenant-crowdfunding': tenantCrowdfunding,
			'landlord-message': landlordMessage
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
		methods: {
			
		}
	}
</script>

<style>

</style>
