<template>
	<!-- 品味琅岐 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="品味琅岐" @clickLeft="goBack"></uni-nav-bar>
		<view class="menuBoxWrap">
			<tabs-menu @onClick="onCur" :cur="cur"></tabs-menu>
		</view>
		<view class="pageWrap" v-if="cur == 0">
			<cata-page :foodData="foodData" :foodList="foodList"></cata-page>
		</view>
		<view class="pageWrap shopWrap" v-else-if="cur == 1">
			<block v-for="(item,index) in listShoppingData" :key="index">
				<item-shopping :imgUrl="item.image" :title="item.name" @onClick="goShoppingDetail(item.id)"></item-shopping>
			</block>
		</view>
		<view class="pageWrap" v-else-if="cur == 2">
			<play-page :playData="playData" :playList="playList"></play-page>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import tabsMenu from './component/tabsMenu.vue';
	import cataPage from './catePage/index.vue';
	import playPage from './playPage/index.vue';
	import itemShopping from '@/components/itemShopping.vue';
	import executeS from '@/service/executeS.js';
	import {
		backTo,
		linkTo,
		setDateType
	} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			tabsMenu,
			cataPage,
			playPage,
			itemShopping

		},
		data() {
			return {
				goBack: backTo,
				cur: 0,
				foodData: [],//特色美食
				foodList: [],//不可错过的特色美食
				listShoppingData: [], //购物专题
				playData:[],//娱乐
				playList:[],//不可错过的琅岐娱乐

			};
		},
		async onLoad(options) {
			const _this = this;
			this.cur = parseInt(options.cur)
			this.foodData = await this.queryAppHotelsList(_this,1000,'cate');
			this.listShoppingData = await this.queryAppHotelsList(_this,1000,'shop');
			this.playData = await this.queryAppHotelsList(_this,1000,'recreation');
			this.foodList = await this.queryAppHotelsList(_this,1000,'cate','unmissable');
			this.playList = await this.queryAppHotelsList(_this,1000,'recreation','unmissable');
		},
		methods: {
			onCur(index) {
				this.cur = index
			},
			queryAppHotelsList: async (_this,pageSize, type,tag) => {
				const paramsPayload = {
					apixkey: "queryAppHotelsList",
					payload: {
						pageSize: pageSize,
						pageNum: 1,
						type: type,
						tag:tag
					}
				}
				const response= await executeS(paramsPayload);
				if(response.success){
					let data = setDateType(response.data.records)
					return data
				}
			},
			queryAppArticleList: async (_this,pageSize, type) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: {
						pageSize: pageSize,
						pageNum: 1,
						category: type
					}
				}
				const response= await executeS(paramsPayload);
				if(response.success){
					let data = response.data.records
					return data
				}
			},
			goShoppingDetail(id) {
				linkTo('/pages/shoppingDetail/shoppingDetail?id='+id)
			}
		}
	}
</script>

<style lang="scss">
	.pageWrap {
		margin-top: 11rpx;
	}

	.shopWrap {
		background-color: $uni-bg-color;
		padding: 34rpx 29rpx;
	}
</style>
