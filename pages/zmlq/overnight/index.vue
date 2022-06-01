<template>
	<view class="overNightIndexWrap">
		<!--领券 Start-->
		<navigator url="/pages/coupon/coupon" hover-class="none" class="drawBoxWrap">
			<image :src="overNightData.ticketPic" mode="widthFix"></image>
		</navigator>
		<view class="popularViewpointWrap mt20">
			<lay-out-wrap :title="'热门酒店'" @onClick="goMore">
				<view slot="content">

					<view class="listHotel">
						<block v-for="(item,index) in listHotelData" :key="index">
							<item-hotel @onClick="goDetail(item.id)" :imgUrl="item.image" :title="item.name" :desc="item.address"  :stars="item.levelTxt" :price="item.price"></item-hotel>
						</block>
					</view>

				</view>
			</lay-out-wrap>
		</view>
	</view>
</template>

<script>
	import ticketPng from '@/static/images/zmlq/overnight/ticket.png';
	import LayOutWrap from '@/components/layout.vue';
	import itemHotel from '@/components/itemHotel.vue';
	import {linkTo} from '@/utils/utils.js';
	export default {
		name: 'overNightPageCur',
		props: {
			overNightData: {
				type: Object,
				default () {
					return {
						ticketPic: ticketPng,
					}
				}
			},
			listHotelData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			goMore() {
				linkTo('/pages/tabsList/tabsList')
			},
			goDetail(id) {
				linkTo('/pages/hotelDetail/hotelDetail?id='+id)
			}

		},
		components: {
			LayOutWrap,
			itemHotel
		}
	}
</script>

<style lang="scss">
	.overNightIndexWrap {
		width: 100%;
		box-sizing: border-box;

		.drawBoxWrap {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 31rpx;
			background: $uni-bg-color;

			image {
				width: 692rpx;
			}
		}
		.listHotel {
			padding: 0 20rpx;
		}
	}
</style>
