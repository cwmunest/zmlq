<template>
	<view class="customerWrap">
		<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotStyle" field="content" class="uni-swiper__warp">
			<swiper class="swiper-box" @change="change" :interval="3000" :autoplay="true">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view :class="item.colorClass" class="swiper-item">
						<image class="image" :src="item.coverImage" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view> 
</template>
<script>
	import uniSwiperDot from '@/components/uni-swiper-dot.vue';
	export default {
		name:"SwiperBanner",
		components: {
			uniSwiperDot,
		},
		props:{
			info: {
				type: Array,
				default () {
					return [{url:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg'}]
				}
			},
		},
		data() {
			return {
				current: 0,
				mode: 'round',
				dotStyle:{
					backgroundColor: 'rgba(255, 255, 255,0.9)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(2, 137, 277,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0) solid',
					bottom:60,
					
				}
			}
			
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
		},
		onLoad() {
		
		},
	}
</script>
<style lang="scss" scoped>
	.customerWrap{
		width:100%;
		height: 100%;
		.uni-swiper__warp ,.swiper-box {
			height: 100%;
		}
		.image{width: 100%;height: 320rpx;}
	}
	
</style>
