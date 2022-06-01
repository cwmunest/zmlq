<template>
	<view class="tasteIndexWrap">
		<!--秋冬 Start-->
		<view class="tasteAdBox">
			<image :src="tasteData.coverImage" mode="widthFix"></image>
		</view>
		<view class="popularViewpointWrap mt20">
			<lay-out-wrap :title="'美食推荐'" :blockColor="'#ff7200'" @onClick="goMore(0)">
				<view slot="content">
					<view class="foodBox">
						<view class="footMenu">
							<view class="footMenuItem" v-for="(item,index) in listFoodData" :key="index" @click="tapFoodMenu(index)">
								<image class="foodLogo" :src="item.image" mode="aspectFill" :class="{'foodActive':foodActive == index}"></image>
								<text v-show="foodActive == index">{{item.name}}</text>
								<image src="/static/images/zmlq/taste/icon-up1-2.png" v-show="foodActive == index" mode="widthFix" class="upIcon"></image>
							</view>
						</view>
						<view class="introBox" :style="{backgroundImage:'url('+info.image+')'}" @click="goFoodDetail(info.id)">
							<!-- <view class="title">
								<text>{{info.name}}</text>
								<image src="/static/images/zmlq/taste/yinhao.png" mode="widthFix"></image>
							</view>
							<view class="intro">{{info.intro}}</view> -->
						</view>
					</view>
				</view>
			</lay-out-wrap>
		</view>
		<view class="popularViewpointWrap mt20">
			<lay-out-wrap :title="'购物中心'" :blockColor="'#9f47ed'" @onClick="goMore(1)">
				<view slot="content">
					<view class="shoppingMain">
						<block v-for="(item,index) in listShoppingData" :key="index">
							<item-shopping @onClick="goShoppingDetail(item.id)" :imgUrl="item.image" :title="item.name"></item-shopping>
						</block>
					</view>
				</view>
			</lay-out-wrap>
		</view>
		<view class="popularViewpointWrap mt20">
			<lay-out-wrap :title="'休闲娱乐'" :blockColor="'#fcc707'" @onClick="goMore(2)">
				<view slot="content">
					<view class="articleList">
						<view class="articleItem" v-for="(item,index) in listPlayData" :key="index">
							<image src="/static/images/zmlq/taste/NO.png" mode="widthFix" v-if="index == 0"></image>
							<image src="/static/images/zmlq/taste/NO-2.png" mode="widthFix" v-else-if="index == 1"></image>
							<image src="/static/images/zmlq/taste/NO-3.png" mode="widthFix" v-else-if="index == 2"></image>
							<text v-else>{{index+1}}</text>
							<item-article :articleInfo="item" @onClick="goShoppingDetail(item.id)"></item-article>
						</view>
					</view>

				</view>
			</lay-out-wrap>
		</view>
	</view>
</template>

<script>
	import ad1Png from '@/static/images/zmlq/taste/ad1.png';
	import LayOutWrap from '@/components/layout.vue';
	import itemShopping from '@/components/itemShopping.vue';
	import itemArticle from '@/components/itemArticle.vue';
	import {
		backTo,
		linkTo
	} from '@/utils/utils.js';
	export default {
		name: 'tastePageCur',
		props: {
			tasteData: {
				type: Object,
				default () {
					return {
						ad: ad1Png,
					}
				}
			},
			listShoppingData: {
				type: Array,
				default () {
					return []
				}
			},
			listFoodData: {
				type: Array,
				default () {
					return []
				}
			},
			listPlayData: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				foodActive: 0,
				info: {}
			}
		},
		watch: {
			listFoodData(newInfo, oldInfo) {
				this.info = this.listFoodData[0]
			}
		},
		methods: {
			tapFoodMenu(index) {
				let foodInfo = this.listFoodData;
				this.info = foodInfo[index];
				this.foodActive = index;
			},
			goMore(index) {
				linkTo('/pages/tastePage/tastePage?cur=' + index)
			},
			goFoodDetail(id) {
				linkTo('/pages/foodDetail/foodDetail?id=' + id)
			},
			goShoppingDetail(id) {
				linkTo('/pages/shoppingDetail/shoppingDetail?id=' + id)
			}

		},
		components: {
			LayOutWrap,
			itemShopping,
			itemArticle
		}
	}
</script>

<style lang="scss">
	.tasteIndexWrap {
		width: 100%;
		box-sizing: border-box;

		.tasteAdBox {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 51rpx;
			padding-top: 39rpx;
			background: $uni-bg-color;

			baim image {
				width: 692rpx;
			}
		}

		// 美食推荐
		.foodBox {
			margin: 0 28rpx;

			.footMenu {
				margin-bottom: 28rpx;
				width: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;

				.footMenuItem {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #ff7200;
					font-size: 26rpx;
					position: relative;

					.foodLogo {
						width: 154rpx;
						height: 154rpx;
						border-radius: 50%;
						margin-bottom: 18rpx;
					}

					.upIcon {
						width: 48rpx;
						bottom: -28rpx;
						position: absolute !important;
					}

				}

				.foodActive {
					border: 5rpx solid #ff7200;
					box-sizing: border-box;
				}
			}

			.introBox {
				width: 693rpx;
				height: 303rpx;
				border-radius: 26rpx;
				background-size: cover;
				padding-top: 55rpx;
				padding-left: 39rpx;
				box-sizing: border-box;
				position: relative;

				.title {
					font-size: 30rpx;
					padding-bottom: 28rpx;
					position: relative;

					text {
						position: absolute;
						z-index: 2;
					}

					image {
						position: absolute;
						width: 51rpx;
						left: -9rpx;
						top: -20rpx;
						z-index: 1;

					}
				}

				.intro {
					color: #6f6565;
					font-size: 24rpx;
					width: 406rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
					overflow: hidden;
				}

			}
		}

		// 休闲娱乐
		.articleList {
			padding: 0 30rpx;

			.articleItem {
				display: flex;
				align-items: center;
				margin-bottom: 33rpx;

				image {
					width: 35rpx;
					margin-right: 32rpx;
				}

				text {
					width: 35rpx;
					margin-right: 32rpx;
					font-size: 22rpx;
					text-align: center;
				}
			}
		}

		.shoppingMain {
			padding: 0 30rpx;
		}
	}
</style>
