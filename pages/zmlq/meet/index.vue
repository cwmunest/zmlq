<template>
	<view class="meetIndexWrap">
		<!--阅读 Start-->
		<view class="mettBannerWrap">
			<navigator :url="item.path" hover-class="none" class="imageBoxItem" v-for="(item, index) in imageDatas" :key="index">
				<image :src="item.url" mode="scaleToFill"></image>
				<view class="tagBox" v-if="item.tag"></view>
			</navigator>
		</view>
		<!--精彩放送 Start-->
		<view class="wonderfulNewWrap">
			<lay-out-wrap :title="'精彩放送'" @onClick="goMore('精彩放送','wonderful_release')">
				<view slot="content">
					<block v-for="(item,index) in list" :key="index">
						<block>
							<list-item-l-r :url="item.coverImage" :showLine="true" :title="item.title" :seeNum="item.lookCount" :date="item.createTime"
							 @onClick="goPage(item.id,'精彩放送')"></list-item-l-r>
						</block>
						<!-- <block v-else>
							<list-item-t-b :thumbs="thumbs" :title="item.title" :seeNum="item.lookCount" :date="item.updateTime" :showLine="true"  @onClick="goPage(item.id)"></list-item-t-b>
						</block> -->
					</block>
				</view>
			</lay-out-wrap>
		</view>

		<!--实时视频 Start-->
		<view class="wonderfulNewWrap">
			<lay-out-wrap :title="'实时视频'" @onClick="goMore('实时视频','live_video')">
				<view slot="content">
					<block v-for="(item,index) in videoList" :key="index">
						<block>
							<list-item-l-r :url="item.coverImage" :showLine="true" :title="item.title" :seeNum="item.lookCount" :date="item.createTime"
							 @onClick="goPage(item.id,'实时视频')"></list-item-l-r>
						</block>
					</block>
				</view>
			</lay-out-wrap>
		</view>


	</view>
</template>

<script>
	import readTagpng from '@/static/images/zmlq/readTag.png';
	import pic01png from '@/static/images/zmlq/pic01.png';
	import audioPic from '@/static/images/zmlq/audioPic.png';
	import read2 from '@/static/images/zmlq/read/read2.jpg';
	import LayOutWrap from '@/components/layout.vue';
	import ListItemLR from '@/components/ListItemLR.vue';
	import ListItemTB from '@/components/ListItemTB.vue';
	import {
		linkTo,
		setDateType
	} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';

	export default {
		name: 'meetPageCur',
		props: {
			imageDatas: {
				type: Array,
				default: () => {
					return [{
							url: pic01png,
							tag: true,
							path: '/pages/pageList/pageList?title=琅岐文苑&category=lq_lyceum',
						},
						{
							url: audioPic,
							tag: true,
							path: '/pages/videoPage/videoPage',
						},
						{
							url: read2,
							path: '/pages/homesick/homesick',
							tag: true,
							title: '琅岐乡愁',
							type: 2
						}
					]
				}
			}
		},
		data() {
			return {
				tagImg: readTagpng,
				thumbs: [
					'http://www.ks5u.com/Article/Article/20150228165421843.jpg',
					'http://www.mwnews.cn/uploaded/c20ad12/20191126/15747670219503.jpg',
					'http://www.mwnews.cn/uploaded/c20ad12/20191126/15747670341319.jpg'
				],
				list: [],
				videoList:[]
			}
		},
		async mounted() {
			const _this = this;
			this.list = await _this.queryAppArticleList(_this,3,'wonderful_release')
			this.videoList = await _this.queryAppArticleList(_this,3,'live_video')
		},
		methods: {
			queryAppArticleList: async (_this,size,type) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: {
						pageSize: size,
						pageNum: 1,
						category: type
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = setDateType(response.data.records, 'createTime')
					return data
				}
			},
			goMore(title,port) {
				linkTo('/pages/pageList/pageList?title='+title+'&category='+port)
			},
			goPage(id,title) {
				linkTo('/pages/pageDetail/pageDetail?id=' + id + '&title='+title)
			}
		},
		components: {
			LayOutWrap,
			ListItemLR,
			ListItemTB
		}
	}
</script>

<style lang="scss">
	.meetIndexWrap {
		width: 100%;
		box-sizing: border-box;

		.mettBannerWrap {
			width: 100%;
			background: $uni-bg-color;
			padding: 0 30rpx;
			padding-bottom: 10rpx;
			box-sizing: border-box;

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
					background: url("../../../static/images/zmlq/readTag.png") no-repeat left top;
					background-size: 100%;
				}
			}
		}

		.wonderfulNewWrap {
			padding-top: 20rpx;
		}

		uni-image {
			width: 100%;
			height: 100%;
		}
	}
</style>
