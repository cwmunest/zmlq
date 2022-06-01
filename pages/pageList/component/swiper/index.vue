<template>
	<view class="customerWrap">
		<swiper :autoplay="true">
			<swiper-item v-for="(item,index) in info" :key="index">
				<view class="swiper-item" @click="onDetail(item.id)">
					<view class="imgBox">
						<image :src="item.coverImage" mode="aspectFill"></image>
						<view class="bannerTitle">
							<text>{{item.title}}</text>
							<view class="detail">
								<text>详情</text>
								<image src="/static/images/common/arrowR.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"SwiperBanner",
		props:{
			info: {
				type: Array,
				default () {
					return [{url:'http://www.mwnews.cn/uploaded/7f39f61/20190926/28711569484796.jpg'}]
				}
			},
		},
		data() {
			return {
				
			}
			
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			onDetail(id) {
				this.$emit('onClick',id)
			}
		},
	}
</script>

<style lang="scss">
	.customerWrap {
		width: 100%;
		height: 319rpx;
		swiper {
			height: 100%;
			swiper-item {
				height: 100%;
				.swiper-item {
					height: 100%;
					.imgBox {
						width: 100%;
						height: 100%;
						position: relative;
						.bannerTitle {
							position: absolute;
							bottom: 0;
							height: 65rpx;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 0 30rpx;
							box-sizing: border-box;
							color: #fff;
							background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBIAwAAawBnG/9pxgAAAABJRU5ErkJggg==');
							text {
								font-size: 30rpx;
							}
							.detail {
								display: flex;
								align-items: center;
								color: #bebdbd;
								font-size: 24rpx;
								image {
									width: 11rpx;
									margin-left: 7rpx;
								}
							}
						}
						image {
							width: 100%;
							height: 100%;
							
						}
					}
				}
				
			}
		}
	}
	
</style>
