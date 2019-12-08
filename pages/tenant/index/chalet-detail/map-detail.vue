<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width:100vh;height:100vh;" @markertap="openMap" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				latitude: 34.2142900000,
				longitude: 108.8794500000,
				position:'',
				covers: [{
					id: 0,
					latitude: 39.9085,
					longitude: 116.39747,
					// #ifdef APP-PLUS
					iconPath: '../../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../../static/location.png',
					// #endif
				}, {
					id: 1,
					latitude: 39.90,
					longitude: 116.39,
					// #ifdef APP-PLUS
					iconPath: '../../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../../static/location.png',
					// #endif
				}]
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.position
			});
			this.latitude = option.latitude
			this.longitude = option.longitude
			this.position = option.position
			this.covers[0].latitude = option.latitude
			this.covers[0].longitude = option.longitude
			this.covers[1].latitude = option.latitude
			this.covers[1].longitude = option.longitude
		},
		methods:{
			openMap(){
				var url = "";
				if (plus.os.name=="Android") {
					var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});
					var hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'});
					var urlBaiduMap = "baidumap://map/marker?location="+this.latitude+","+this.longitude+"&title="+this.position+"&src=Hello%20uni-app";
					var urlAmap = "androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname="+this.position+"&lat="+this.latitude+"&lon="+this.longitude+"&dev=0"
					if (hasAmap && hasBaiduMap) {
						plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"百度地图"},{title:"高德地图"}]}, function(e){
							switch (e.index){
								case 1:
									plus.runtime.openURL(urlBaiduMap);
									break;
								case 2:
									plus.runtime.openURL(urlAmap);
									break;
							}
						})
					}
					else if (hasAmap) {
						plus.runtime.openURL(urlAmap);
					}
					else if (hasBaiduMap) {
						plus.runtime.openURL(urlBaiduMap);
					}
					else{
						url = "geo:"+this.latitude+","+this.longitude+"?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
						plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差
					}
				} else{
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）
					plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"Apple地图"},{title:"百度地图"},{title:"高德地图"}]}, function(e){
						console.log("e.index: " + e.index);
						switch (e.index){
							case 1:
								url = "http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll="+this.latitude+","+this.longitude+"&spn=0.008766,0.019441";
								break;
							case 2:
								url = "baidumap://map/marker?location="+this.latitude+","+this.longitude+"&title="+this.position+"&src=Hello%20uni-app";
								break;
							case 3:
								url = "iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname="+this.position+"&lat="+this.latitude+"&lon="+this.longitude+"&dev=0";
								break;
							default:
								break;
						}
						if (url!="") {
							plus.runtime.openURL( url, function( e ) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
