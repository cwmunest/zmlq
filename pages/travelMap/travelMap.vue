<template>
	<!-- 旅游攻略-琅岐一日游 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="行程线路" @clickLeft="goBack"></uni-nav-bar>
		<map :latitude="latitude" :longitude="longitude" class="mapBox" scale="13" :markers="markers" :include-points="markers"></map>
		<uni-popup ref="popup" type="bottom" :isMask="false">
			<view class="popUbox">
				<scroll-view scroll-y="true" class="popContent">
					<step-travel-box :listData="list"></step-travel-box>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import stepTravelBox from './component/stepTravel.vue';
	import {backTo,linkTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			uniPopup,
			stepTravelBox
		},
		data() {
			return {
				goBack:backTo,
				latitude:null,
				longitude:null,
				markers:[],
				list:[]
			};
		},
		onLoad(options) {
			const _this = this
			_this.queryAppPathDetail(_this,options.id)
		},
		mounted() {
			this.$refs.popup.open()
		},
		methods:{
			queryAppPathDetail: async (_this, id) => {
				let markers = _this.markers
				const paramsPayload = {
					apixkey: "queryAppPathDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data
					_this.latitude = data[0].longitude
					_this.longitude = data[0].latitude
					data.forEach(val=>{
						let markerObj = {}
						markerObj.latitude = val.longitude
						markerObj.longitude = val.latitude
						markerObj.iconPath = '/static/images/common/jingdian.png'
						markers.push(markerObj)
					})
					_this.list = response.data
			
				}
			},
		}
	}
</script>

<style lang="scss">
	.mapBox {
		width: 100%;
		height: 670rpx;
	}
	.popUbox {
		width: 100%;
		height: calc(100vh - 670rpx);
		background-color: #fff;
		border-top-left-radius: 16rpx;
		border-top-right-radius:16rpx;
		padding: 30rpx;
		box-sizing: border-box;
		.popContent {
			height: 100%;
		}
	}

</style>
