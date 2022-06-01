<template>
	<!-- 思想理论 党务知识 党章党规 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="title" background-color="#cc0000" @clickLeft="goBack"></uni-nav-bar>
		<view class="adBox">
			<image src="http://www.dfg.cn/gb/cszd/img/shzr/85-01.jpg" mode="aspectFill"></image>
		</view>
		<view class="menuBox">
			<tabs-menu :tabsList="tabsData" :cur="cur" @onClick="getList"></tabs-menu>
		</view>
		<view class="listBox">
			<block v-for="(item,index) in list" :key="index">
				<block>
					<list-item-l-r :url="item.coverImage" :showLine="true" :title="item.title" :seeNum="item.lookCount" :date="item.createTime"
					 @onClick="goDetail(item.id)"></list-item-l-r>
				</block>
				<!-- <block v-else>
					<list-item-t-b :thumbs="thumbs" :title="item.title" :seeNum="item.lookCount" :date="item.updateTime" :showLine="true"
					 @onClick="goDetail(item.id)"></list-item-t-b>
				</block> -->
			</block>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import tabsMenu from './component/tabsMenu.vue';
	import ListItemLR from '@/components/ListItemLR.vue';
	import ListItemTB from '@/components/ListItemTB.vue';
	import {
		backTo,
		linkTo,
		setDateType
	} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			uniNavBar,
			tabsMenu,
			ListItemLR,
			ListItemTB,
			uniLoadMore
		},
		data() {
			return {
				goBack: backTo,
				tabsData: [],
				title: '',
				cur: 0,
				list: [],
				page: 1,
				params: {
					pageSize: 10,
					pageNum: 1,
					category: ''
				},
				pages: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				thumbs: ['http://www.mwnews.cn/uploaded/c81e72/20191215/15763827255714.jpg',
					'http://www.mwnews.cn/uploaded/c81e72/20191215/15763825315259.jpg',
					'http://www.mwnews.cn/uploaded/c81e72/20191215/1576382548280.jpg'
				],
			};
		},
		onLoad(option) {
			const _this = this;
			_this.getInfo(option.title);

		},
		// 上拉加载更多
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
				params = this.params;
			params.pageNum++;
			const paramsPayload = {
				apixkey: "queryAppArticleList",
				payload: params
			}
			setTimeout(async () => {
				if (params.pageNum > this.pages) {
					this.loadingType = 2;
					return;
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					list = setDateType(response.data.records);
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		methods: {
			goDetail(id) {
				linkTo('../pageDetail/pageDetail?type=red&id=' + id + '&title=' + this.title)
			},
			getInfo(title) {
				const _this = this
				let params = this.params
				uni.setNavigationBarTitle({
					title: title
				})
				this.title = title;
				switch (title) {
					case '思想理论':
						params.category = 'ideological_theory'
						this.tabsData = [{
							name: '习近平新时代中国特色社会主义思想',
							category: 'ideological_theory'
						}]
						break;
					case '党务知识':
						params.category = 'party_member'
						this.tabsData = [{
							name: '党员',
							category: 'party_member'
						}, {
							name: '党的组织',
							category: 'party_organization'
						}, {
							name: '党的干部',
							category: 'party_cadres'
						}, {
							name: '党的纪律',
							category: 'party_discipline'
						}, {
							name: '党的知识',
							category: 'party_knowledge'
						}]
						break;
					case '党章党规':
						params.category = 'party_constitution'
						this.tabsData = [{
							name: '党章',
							category: 'party_constitution'
						}, {
							name: '准则',
							category: 'party_criterion'
						}, {
							name: '条例',
							category: 'party_ordinances'
						}, {
							name: '规则',
							category: 'party_rule'
						}, {
							name: '规定',
							category: 'party_regulations'
						}]
						break;
				}
				this.queryAppArticleList(_this)
			},
			getList(e) {
				const _this = this
				let params = this.params
				this.cur = e.cur
				params.pageNum = 1
				params.category = e.category
				this.queryAppArticleList(_this)
			},
			queryAppArticleList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppArticleList",
					payload: _this.params
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.list = setDateType(response.data.records)
						_this.pages = response.data.pages
						if (response.data.total <= 10) {
							_this.loadingType = 2;
						}
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.adBox {
		width: 100%;
		height: 329rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.listBox {
		background-color: $uni-bg-color;
	}
</style>
