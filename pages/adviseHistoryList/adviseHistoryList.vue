<template>
	<!-- 历史投诉建议 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="历史投诉建议" @clickLeft="goBack"></uni-nav-bar>
		<tabs :tabsList="tabsList" :cur="cur" @onClick="getList"></tabs>
		<uni-swipe-action>
			<uni-swipe-action-item :options="options" @click="onClick($event,item.id)" @change="change" v-for="(item,index) in list"
			 :key="index">
				<view class="cellMain" @click="goDetail(item.id)">
					<cell :title="item.sketch" :value="item.createTime"></cell>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSwipeAction from './component/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from './component/uni-swipe-action-item/uni-swipe-action-item.vue';
	import cell from '@/components/cell.vue';
	import tabs from './component/tabs';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {
		backTo,
		linkTo,
		setDateType,
		showMsg
	} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			cell,
			uniNavBar,
			tabs
		},
		data() {
			return {
				goBack: backTo,
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				tabsList: [{
						name: '已处理'
					},
					{
						name: '未处理'
					}
				],
				cur: 0,
				list: []
			};
		},
		onLoad() {
			let _this = this
			this.queryAppSuggestList(_this)
		},
		methods: {
			onClick(e, id) {
				console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
				let _this = this;
				if (e.index == 0) {
					linkTo('../adviseForm/adviseForm?id=' + id)
				} else {
					uni.showModal({
						title: '提示',
						content: '是否确定删除',
						success(res) {
							if (res.confirm) {
								_this.queryAppSuggestDelete(_this,id)
							}
						}
					})
					
				}
			},
			change(open) {
				console.log('当前开启状态：' + open)
			},
			goDetail(id) {
				linkTo('/pages/adviseDetail/adviseDetail?id='+id)
			},
			getList(index) {
				let _this = this
				this.cur = index
				this.queryAppSuggestList(_this)
			},
			queryAppSuggestList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppSuggestList",
					payload: {
						param: _this.cur
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						_this.list = setDateType(response.data)
					}
				})
			},
			queryAppSuggestDelete(_this, id) {
				const paramsPayload = {
					apixkey: "queryAppSuggestDelete",
					payload: {
						id: id
					}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						showMsg('删除成功', 'success')
						_this.queryAppSuggestList(_this)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.cellMain {
		width: 100%;
		padding: 0 28rpx;
	}
</style>
