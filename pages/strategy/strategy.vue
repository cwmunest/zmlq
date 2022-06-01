<template>
	<!-- 旅游攻略 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="旅游攻略" @clickLeft="goBack"></uni-nav-bar>
		<lay-out-box :chineseTitle="'琅岐速览'" :englishTitle="'SCANNING'" :num="'01'" :iconUrl="icon01" :iconIsBg="true" :isMore="false">
			<view class="videoContent" slot="content">
				<video src="http://112.49.38.88:15008/examples/琅岐宣传片1.mp4" controls></video>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'畅游琅岐'" :englishTitle="'TOURISM'" :num="'02'" :iconUrl="icon02" :isMore="false">
			<view class="tourismContent" slot="content">
				<tourism-box @onClick="goDetail('02',$event)"></tourism-box>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'行程路线'" :englishTitle="'ROUTE'" :num="'03'" :iconUrl="icon03" :isMore="false">
			<view class="routeContent" slot="content">
				<scroll-view scroll-x="true" class="scrollH">
					<block v-for="(item,index) in routeData" :key="index">
						<item-route :imgUrl="item.image" :num="index+1" :name="item.name" @onClick="goDetail('03',item.id)"></item-route>
					</block>
				</scroll-view>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'最热景点'" :englishTitle="'SCENERY'" :num="'04'" :iconUrl="icon04" @onClick="goMore('04')">
			<view class="scenryContent" slot="content">
				<block v-for="(item,index) in listHotelData" :key="index">
					<item-hotel @onClick="goDetail('04',item.id)" :imgUrl="item.image" :title="item.name" :desc="item.address"
					 :starsBg="'#ff9c00'" :stars="item.time"></item-hotel>
				</block>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'美食推荐'" :englishTitle="'FOOD'" :num="'05'" :iconUrl="icon05" @onClick="goMore('05')">
			<view class="foodContent" slot="content">
				<view class="foodBox">
					<view class="footMenu">
						<view class="footMenuItem" v-for="(item,index) in foodInfo" :key="index" @click="tapFoodMenu(index)">
							<image class="foodLogo" :src="item.image" mode="aspectFill" :class="{'foodActive':foodActive == index}"></image>
							<text v-show="foodActive == index">{{item.name}}</text>
							<image src="/static/images/zmlq/taste/icon-up1-2.png" v-show="foodActive == index" mode="widthFix" class="upIcon"></image>
						</view>
					</view>
					<view class="introBox" :style="{backgroundImage:'url('+info.image+')'}" @click="goDetail('05',info.id)">

						<!-- <view class="title">
							<text>{{info.name}}</text>
							<image src="/static/images/zmlq/taste/yinhao.png" mode="widthFix"></image>
						</view>
						<view class="intro">{{info.intro}}</view> -->
					</view>
				</view>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'购物推荐'" :englishTitle="'SHOPPING'" :num="'06'" :iconUrl="icon06" @onClick="goMore('06')">
			<view class="shoppingContent" slot="content">
				<block v-for="(item,index) in listShoppingData" :key="index">
					<item-shopping :imgUrl="item.image" :title="item.name" @onClick="goDetail('06',item.id)"></item-shopping>
				</block>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'酒店推荐'" :englishTitle="'HOTEL'" :num="'07'" :iconUrl="icon07" @onClick="goMore('07')">
			<view class="hotelContent" slot="content">
				<block v-for="(item,index) in hotelData" :key="index">
					<item-hotel @onClick="goDetail('07',item.id)" :imgUrl="item.image" :title="item.name" :desc="item.address" :price="item.price"
					 :stars="item.levelTxt"></item-hotel>
				</block>
			</view>
		</lay-out-box>
		<lay-out-box :chineseTitle="'娱乐推荐'" :englishTitle="'ENJOY'" :num="'08'" :iconUrl="icon08" @onClick="goMore('08')">
			<view class="enjoyContent" slot="content">
				<block v-for="(item,index) in foodData" :key="index">
					<item-food @onClick="goDetail('08',item.id)" :imgUrl="item.image" :title="item.viewCount?item.viewCount:0+'篇文章提及'" :infoTxt="item.name"></item-food>
				</block>
			</view>
		</lay-out-box>
		<view class="footerBox">
			<image src="/static/images/strategy/icon.png" mode="widthFix"></image>
			<text>琅 ／ 岐 ／ 欢 ／ 迎 ／ 您</text>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import layOutBox from './component/layout.vue';
	import tourismBox from './component/tourism.vue';
	import itemRoute from './component/itemRoute.vue';
	import itemHotel from '@/components/itemHotel.vue';
	import itemShopping from '@/components/itemShopping.vue';
	import itemFood from '@/components/itemFood.vue';
	import {
		backTo,
		linkTo
	} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	import icon01 from '@/static/images/strategy/vbg.png';
	import icon02 from '@/static/images/strategy/gouwu.png';
	import icon03 from '@/static/images/strategy/gouwu.png';
	import icon04 from '@/static/images/strategy/jingdian.png';
	import icon05 from '@/static/images/strategy/meishi.png';
	import icon06 from '@/static/images/strategy/gouwu.png';
	import icon07 from '@/static/images/strategy/jiudian.png';
	import icon08 from '@/static/images/strategy/yule.png';
	export default {
		components: {
			uniNavBar,
			layOutBox,
			tourismBox,
			itemRoute,
			itemHotel,
			itemShopping,
			itemFood
		},
		data() {
			return {
				goBack: backTo,
				icon01: icon01,
				icon02: icon02,
				icon03: icon03,
				icon04: icon04,
				icon05: icon05,
				icon06: icon06,
				icon07: icon07,
				icon08: icon08,
				routeData: [],
				listHotelData: [],
				hotelData: [],
				foodInfo: [],
				info: {},
				foodActive: 0,
				listShoppingData: [],
				foodData: [],

			};

		},
		watch: {
			foodInfo(newInfo, oldInfo) {
				this.info = this.foodInfo[0]
			}
		},
		async onLoad() {
			this.info = this.foodInfo[0]
			const _this = this;
			_this.listHotelData = await _this.queryAppHotelsList(_this, 2, 'scenic')
			_this.foodInfo = await this.queryAppHotelsList(_this, 4, 'cate')
			_this.listShoppingData = await this.queryAppHotelsList(_this, 2, 'shop')
			_this.hotelData = await this.queryAppHotelsList(_this, 2, 'hotels')
			_this.foodData = await this.queryAppHotelsList(_this, 4, 'recreation')
			_this.routeData = await this.queryAppPathList(_this, 15)
		},
		methods: {
			tapFoodMenu(index) {
				let foodInfo = this.foodInfo;
				this.info = foodInfo[index];
				this.foodActive = index;
			},
			goRouteDetail() {
				linkTo('../travelMap/travelMap')
			},
			goDetail(num, id) {
				switch (num) {
					case '02':
						linkTo('/pages/travelList/travelList?tag=' + id.tag)
						break;
					case '03':
						linkTo('/pages/travelMap/travelMap?id=' + id)
						break;
					case '04':
						linkTo('/pages/travelDetail/travelDetail?id=' + id)
						break;
					case '05':
						linkTo('/pages/foodDetail/foodDetail?id=' + id)
						break;
					case '06':
						linkTo('/pages/shoppingDetail/shoppingDetail?id=' + id)
						break;
					case '07':
						linkTo('/pages/hotelDetail/hotelDetail?id=' + id)
						break;
					case '08':
						linkTo('/pages/shoppingDetail/shoppingDetail?id=' + id)
						break;
					default:
						break;
				}
			},
			goMore(num) {
				switch (num) {
					case '04':
						linkTo('/pages/travelList/travelList')
						break;
					case '05':
						linkTo('/pages/tastePage/tastePage?cur=0')
						break;
					case '06':
						linkTo('/pages/tastePage/tastePage?cur=1')
						break;
					case '07':
						linkTo('/pages/tabsList/tabsList')
						break;
					case '08':
						linkTo('/pages/tastePage/tastePage?cur=2')
						break;
					default:
						break;
				}
			},
			//04最热景点、05美食推荐、06购物推荐、07酒店推荐、08娱乐推荐
			queryAppHotelsList: async (_this, size, type) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsList",
					payload: {
						pageSize: size,
						pageNum: 1,
						type: type
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data.records
					data.forEach(val => {
						val.levelTxt = _this.getLevelTxt(val.level) + '星级酒店'
					})
					return data
				}
			},
			//03行程路线
			queryAppPathList: async (_this, size) => {
				const paramsPayload = {
					apixkey: "queryAppPathList",
					payload: {
						pageSize: size,
						pageNum: 1
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data.records
					return data
				}
			},
			getLevelTxt(level) {
				const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				return zh[level]
			},

		}

	}
</script>

<style lang="scss">
	.videoContent {
		padding: 40rpx 0;
		box-sizing: border-box;
		width: 700rpx;
		margin: 0 auto;

		video {
			width: 100%;
			height: 505rpx;

		}
	}

	.tourismContent {
		padding-top: 40rpx;
	}

	.routeContent {
		padding: 40rpx 0 28rpx;

		.scrollH {
			overflow: hidden;
			white-space: nowrap;
		}
	}

	.scenryContent,
	.hotelContent {
		padding: 0 28rpx;
	}

	.foodContent {
		padding: 28rpx 0;

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
					height: 28rpx;
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
	}

	.shoppingContent {
		padding: 0 28rpx;
	}

	.enjoyContent {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 28rpx;
	}

	.footerBox {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #bababa;
		margin-bottom: 30rpx;

		image {
			width: 50rpx;
			margin-right: 20rpx;
		}
	}
</style>
