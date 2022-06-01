<template>
	<!-- 琅岐乡愁 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="琅岐乡愁" @clickLeft="goBack"></uni-nav-bar>
		<!--阅读 Start-->
		<view class="mettBannerWrap">
			<view @click="goPath(item)" hover-class="none" class="imageBoxItem" v-for="(item, index) in imageDatas"
			 :key="index">
				<image :src="item.url" mode="scaleToFill"></image>
				<view class="tagBox" v-if="item.tag"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import read2 from '@/static/images/zmlq/read/read2.jpg';
	import read3 from '@/static/images/zmlq/read/read3.jpg';
	import read4 from '@/static/images/zmlq/read/read4.jpg';
	import read5 from '@/static/images/zmlq/read/read5.jpg';
	import read6 from '@/static/images/zmlq/read/read6.jpg';
	import read7 from '@/static/images/zmlq/read/read7.jpg';
	import read8 from '@/static/images/zmlq/read/read8.jpg';
	import read9 from '@/static/images/zmlq/read/read9.jpg';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {backTo,linkTo} from '@/utils/utils.js';
	export default {
		components: {uniNavBar},
		data() {
			return {
				imageDatas: [{
					url: read2,
					tag: true,
					path: 'https://flbook.mwkj.net/c/5eFhXFrAJw',
					type:2
				},
				{
					url: read3,
					tag: true,
					path: 'https://flbook.mwkj.net/c/zkJ2JME3G3',
					type:2
				},
				{
					url: read4,
					tag: true,
					path: 'https://flbook.mwkj.net/c/c6M6Bys2bp',
					type:2
				},
				{
					url: read5,
					tag: true,
					path: 'https://flbook.mwkj.net/c/CZJTp8wrcP',
					type:2
				},
				{
					url: read6,
					tag: true,
					path: 'https://flbook.mwkj.net/c/x5zTrRw8Wi',
					type:2
				},
				{
					url: read7,
					tag: true,
					path: 'https://flbook.mwkj.net/c/cznQYadce8',
					type:2
				},
				{
					url: read8,
					tag: true,
					path: 'https://flbook.mwkj.net/c/fmGR4FEw3f',
					type:2
				},
				{
					url: read9,
					tag: true,
					path: 'https://flbook.mwkj.net/c/ZwjrhrBzKF',
					type:2
				}],
				goBack:backTo
			};
		},
		methods:{
			goPath(info) {
				switch (info.type){
					case 1:
						linkTo(info.path)
						break;
					case 2:
						window.location = info.path
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.pageHomeWrap {
		width: 100%;
		box-sizing: border-box;

		.mettBannerWrap {
			width: 100%;
			background: $uni-bg-color;
			padding: 39rpx 30rpx;
			padding-bottom: 10rpx;
			box-sizing: border-box;
			image {
				width: 100%;
				height: 100%;
			}

			.imageBoxItem {
				width: 100%;
				border-radius: 20rpx;
				overflow: hidden;
				height: 270rpx;
				position: relative;
				margin-bottom: 20rpx;

				.tagBox {
					position: absolute;
					z-index: 1;
					left: 0;
					top: 20rpx;
					width: 80rpx;
					height: 36rpx;
					background: url("/static/images/zmlq/readTag.png") no-repeat left top;
					background-size: 100%;
				}
			}
		}
	}
</style>
