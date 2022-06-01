<template>
	<view class="pageHomeWrap">
		<view class="pageHdWrap" :class="{'pb440': 'overnight' == currentKey,'pb345': 'taste' == currentKey}">
			<!--banner Start-->
			<view class="bannerBox">
				<swiper-banner :info="info"></swiper-banner>
			</view>
			<!--banner End-->
			<view class="NavTabWrap">
				<view class="NavTabWCon">
					<tabNav-bar v-on:curTabkey="tabChangeVal" :walkIntoData="walkIntoData" :overNightData="overNightData[0]" />
				</view>
			</view>
		</view>
		<view class="pageBdWrap">
			<view :class="{'pageBdCon':true, 'hidden': 'meet'!==currentKey }">
				<meet-page-cur></meet-page-cur>
			</view>
			<view :class="{'pageBdCon':true,'hidden': 'walkInto' !== currentKey }">
				<walk-into-page-cur :popViewData="popViewData" :list="activityList"></walk-into-page-cur>
			</view>
			<view :class="{'pageBdCon':true,'hidden': 'overnight' !== currentKey }">
				<over-night-page-cur :listHotelData="listHotelData"></over-night-page-cur>
			</view>
			<view :class="{'pageBdCon':true,'hidden': 'taste' !== currentKey }">
				<taste-page-cur :listShoppingData="listShoppingData" :listFoodData="listFoodData" :listPlayData="listPlayData" :tasteData="tasteData[0]"></taste-page-cur>
			</view>
		</view>
	</view>
</template>

<script>
	import swiperBanner from '@/components/swiper/index.vue';
	import tabNavBar from './component/tabNavBar/index.vue';
	import meetPageCur from './meet/index.vue';
	import walkIntoPageCur from './walkInto/index.vue';
	import overNightPageCur from './overnight/index.vue';
	import tastePageCur from './taste/index.vue';
	import executeS from '@/service/executeS.js';
	import {setStorage,setDateType} from '@/utils/utils.js';

	export default {
		data() {
			return {
				info: [],//banner
				currentKey: 'meet',
				meetDataList: {},
				listHotelData: [], //热门酒店
				popViewData: [], //热门景点
				listShoppingData: [], //购物中心
				listFoodData: [], //美食推荐
				listPlayData: [], //休闲娱乐
				walkIntoData: {}, //天气信息
				overNightData:[], //夜宿琅岐广告
				tasteData:[], //品味琅岐广告
				activityList:[],//活动预告列表
			}
		},
		async onLoad(options) {
			//setStorage('userInfo',null);
			const _this = this
			/* if (Shell.IsTest || this.getQueryString('code')) {
				await this.queryAppUserCouponGetUserInfo(_this,Shell.IsTest?"test":this.getQueryString('code'))
			}else{
				await this.queryAppUserCouponGetUserInfo(_this,this.getQueryString('code'))
			} */
			_this.listHotelData = await this.queryAppHotelsList(_this, 3, 'hotels')
			_this.popViewData = await this.queryAppHotelsList(_this, 6, 'scenic')
			_this.listShoppingData = await this.queryAppHotelsList(_this, 2, 'shop')
			_this.listFoodData = await this.queryAppHotelsList(_this, 4, 'cate')
			_this.listPlayData = await this.queryAppHotelsList(_this, 4, 'recreation')
			_this.overNightData = await this.queryAppAdList(_this,1,'夜宿琅岐')
			_this.tasteData = await this.queryAppAdList(_this,1,'品味琅岐')
			_this.info = await this.queryAppAdList(_this,10,'醉美琅岐')
			_this.activityList = await this.queryAppActivityNoticeList(_this,4)
			_this.queryWeatherInfo()
			
		},
		methods: {
			getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
			queryAppUserCouponGetUserInfo: async (_this,code) => {
				const paramsPayload = {
					apixkey: "queryAppUserCouponGetUserInfo",
					payload: {code:code},
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					setStorage('userInfo',response.data)
					Shell.UserInfo=response.data.user||{};
				}
			},
			queryAppArticleList: async (_this) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: {
						pageSize: 15,
						pageNum: 1
					},
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					_this.meetDataList = response.data
				}

				// return aa
			},
			//夜宿琅岐-热门酒店
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
					// _this.listHotelData = data
					return data
				}
			},
			getLevelTxt(level) {
				const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				return zh[level]
			},

			tabChangeVal: function(childValue) {
				this.currentKey = childValue
			},
			queryWeatherInfo() {
				this.$jsonp('http://api.map.baidu.com/telematics/v3/weather',{
					location:'马尾',
					output:'json',
					ak:'ohA7QHfg0BBrpiY4kyuIAAsD'
				}).then(res=>{
					console.log(res)
					let data = res.results[0].weather_data
					this.walkIntoData = data[0]
				})
			},
			queryAppAdList:async (_this,size,adTitle) => {
				const paramsPayload = {
					apixkey: "queryAppAdList",
					payload: {
						pageSize: size,
						pageNum: 1,
						adType: adTitle
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data.records
					return data
				}
			},
			queryAppActivityNoticeList:async(_this,size) => {
				const paramsPayload = {
					apixkey: "queryAppActivityNoticeList",
					payload: {
						pageSize: size,
						pageNum: 1
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = setDateType(response.data.records, 'createTime')
					return data
				}
			}
			

		},
		components: {
			swiperBanner,
			tabNavBar,
			meetPageCur,
			walkIntoPageCur,
			overNightPageCur,
			tastePageCur
		},
	}
</script>

<style lang="scss">
	@import "@/uni.scss";

	.pageHomeWrap {
		width: 100%;
		height: 100%;

		.pageHdWrap {
			position: relative;
			padding-bottom: 300rpx;
			background: $uni-bg-color;
			z-index: 2;
			.bannerBox {
				height: 320rpx;
			}

			.NavTabWrap {
				position: absolute;
				;
				z-index: 1;
				left: 0;
				top: 270rpx;
				width: 100%;
				padding: 0rpx 30rpx;
				box-sizing: border-box;

				.NavTabWCon {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
					background: linear-gradient(#eff9fb 0%, #ffffff 15%, #ffffff 100%);
					box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.3);

				}
			}
		}

		.pageBdWrap {
			.pageBdCon {
				width: 100%;

				&.hidden {
					display: none;
				}
			}
		}

		.pb440 {
			padding-bottom: 440rpx;
		}

		.pb345 {
			padding-bottom: 345rpx;
		}
	}
</style>
