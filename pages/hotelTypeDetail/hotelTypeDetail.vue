<template>
	<!-- 酒店详情 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="房型详情" @clickLeft="goBack"></uni-nav-bar>
		<view class="bannerBox">
			<image :src="info.image" mode="aspectFill"></image>
		</view>
		<view class="infoBox">
			<view class="detailInfo">
				<view class="dItem nameInfo">
					<text>{{info.name}}</text>
					<label>{{info.intro}}</label>
				</view>
			</view>
			<view class="produce" v-html="info.detail"></view>
		</view>
		<view class="listBox">
			<lay-out-wrap :title="'其他房型'" @onClick="goMore">
				<view slot="content">
					<view class="hotelMain">
						<block v-for="(item,index) in listHotelData" :key="index">
							<item-hotel @onClick="goDetail(item.id)" :imgUrl="item.image" :title="item.name" :desc="item.intro" :price="item.price"></item-hotel>
						</block>
					</view>
					
				</view>
			</lay-out-wrap>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import LayOutWrap from '@/components/layout.vue';
	import itemHotel from '@/components/itemHotel.vue';
	import {backTo,linkTo} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			itemHotel
		},
		data() {
			return {
				goBack:backTo,
				info:{},
				listHotelData: [],
				id:null,
				hotelsId:null

			};
		},
		onLoad(options) {
			const _this = this;
			this.id = options.id
			this.queryAppHotelsRoomTypeDetail(_this, options.id)
			
		},
		methods: {
			queryAppHotelsRoomTypeDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsRoomTypeDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					_this.queryAppHotelsRoomTypeList(_this,response.data.hotelsId)
					_this.hotelsId = response.data.hotelsId
					_this.info = response.data
			
				}
			},
			queryAppHotelsRoomTypeList: (_this,id) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsRoomTypeList",
					payload: {
						pageSize:6,
						pageNum:1,
						hotelsId:id
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.listHotelData = response.data.records
					}
				})
			},
			goMore() {
				linkTo('/pages/hotelTypeList/hotelTypeList?id='+this.hotelsId)
			},
			goDetail(id) {
				const _this = this;
				this.queryAppHotelsRoomTypeDetail(_this, id)
			}
		}
	}
</script>

<style lang="scss">
	.pageHomeWrap {
		.bannerBox {
			height: 319rpx;
			width: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.infoBox {
			background-color: $uni-bg-color;
			padding: 0 30rpx 75rpx;
			position: relative;

			.detailInfo {
				width: 693rpx;
				background-color: $uni-bg-color;
				border-radius: 26rpx;
				position: absolute;
				top: -48rpx;
				box-shadow: 0 0 10rpx rgba($color: #000, $alpha: 0.1);
				.dItem {
					padding: 22rpx 36rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.dItemL {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						color: #141414;
						image {
							width: 18rpx;
							margin-right: 15rpx;
						}
					}
					image {
						width: 11rpx;
					}
				}
				.nameInfo {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					text {
						font-size: 32rpx;
						color: #1b1b1b;
						margin-bottom: 20rpx;
					}
					label {
						font-size: 26rpx;
						color: #999999;
					}
				}
				>view{
					&:not(:last-child) {
						border-bottom: 1rpx solid #f5f5f5;
					}
				}
			}
			.produce {
				font-size: 28rpx;
				color: #1b1b1b;
				padding-top: 148rpx;
				text-indent: 56rpx;
				line-height: 48rpx;
			}
		}
		.listBox {
			.hotelMain {
				padding: 0 30rpx;
			}
		}
	}
</style>
