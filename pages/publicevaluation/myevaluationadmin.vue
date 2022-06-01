<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="我的评价" @clickLeft="goBack"></uni-nav-bar>
		<view class="list x-panel-content x-top-navbar">
			<block v-for="(item,index) in list" :key="index">
				<view class="list-item flex-column">					
					<view class="uni-padding-wrap uni-common-mt star">
						<view class="uni-flex uni-row">
							<view :class="{starActive:item2}" class="flex-item iconfont" v-for="(item2,index) in getItemStarList(item.grade)">
								<view v-if="item2" class="starIcon">
									&#xe601;
								</view>
								<view v-else class="starIcon">
									&#xe602;
								</view>
							</view>
						</view>
					</view>
					<view style="padding:30rpx 0 0;">{{item.content}}</view>
					<view style="padding:20rpx 0 0;color:#999;">{{item.evaluateTime}}</view>
				</view>
			</block>
			<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniLoadMore from '@/components/uni-load-more.vue';
	import executeS from '@/service/executeS.js';
	import {backTo,setDateType,linkTo,showMsg, getStorage} from '@/utils/utils.js';
	export default{		
		components: {
			uniNavBar,
			uniLoadMore
		},
		data() {
			return {
				goBack: backTo,
				params: {
					pageSize: 10,
					pageNum: 1,
					//userId:Shell.UserInfo.id,
				},
				pageCount: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [
					/* {grade:4,content:"政府为民办实事比以前好多了！"},
					{grade:5,content:"好的不能再好了，共产党万岁！"}, */
				],
			};
		},
		onLoad() {
			this.queryAppPublicEvluationList();
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
			params = this.params;
			params.pageIndex++;
			const paramsPayload = {
				apixkey: "queryAppPublicEvluationList",
				payload: params,
				param:"userId="+Shell.UserInfo.id,
			}
			setTimeout(async () => {
				if (params.pageIndex > this.pageCount) {
					this.loadingType = 2;
					return;
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					list = setDateType(response.data.records);
					console.log(list)
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		methods:{
			queryAppPublicEvluationList () {
				const paramsPayload = {
					apixkey: "queryAppPublicEvluationList",
					payload: this.params,
					param:"userId="+Shell.UserInfo.id,
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						this.list = setDateType(response.data.records)
						this.pageCount = response.data.pages
						if(response.data.total <= 10) {
							this.loadingType = 2;
						}
					}
				})
			},
			getItemStarList:(grade)=>{
				switch(parseInt(grade||5)){
					case 1:return [true, false, false, false, false] ;
					case 2:return [true, true, false, false, false] ;
					case 3:return [true, true, true, false, false] ;
					case 4:return [true, true, true, true, false] ;
					case 5:
					default:return [true, true, true, true, true] ;
				}
			},
			goDetail(id) {
				let itemAddr=this.list.find((o,i)=>{return o.id==id;});
				//linkTo('./addressedit/addressedit?data='+encodeURIComponent(JSON.stringify(itemAddr)))
			},
			viewImg(imgList,path) {
				uni.previewImage({
					urls: imgList,
					current: path
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.star.uni-common-mt {
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
		padding: 0upx;
		margin-top: 20upx;

		.flex-item {
			display: inline-block;
			/* width: 20%; */
			color: #999;

			.starIcon {
				font-size: 36upx;
			}
		}

		.starActive {
			color: #ff8000;
		}
	}

	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.eot');
		src: url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.svg#font_family') format('svg');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 12px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
		margin-right: 30upx;
	}
	
	.list {
		background-color: $uni-bg-color;
		/* padding: 0 28rpx; */
	}
	.list-item{
		background-color: $uni-bg-color;
		padding: 20rpx 20rpx;
		border-bottom: 3rpx solid $uni-border-color;
	}
</style>
