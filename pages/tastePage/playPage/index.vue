<template>
	<view class="catePageWrap">
		<view class="foodBox">
			<view class="content">
				<block v-for="(item,index) in playData" :key="index">
					<item-food :imgUrl="item.image" :title="item.name" :infoTxt="item.intro" @onClick="goPlayDetail(item.id)"></item-food>
				</block>
			</view>
		</view>
		<view class="foodList">
			<lay-out-wrap :title="'不可错过的琅岐娱乐'" :isMoreShow="false">
				<view slot="content">
					<block v-for="(item,index) in playList" :key="index">
						<list-item-l-r :url="item.image" :title="item.name" :showLine="true" :date="item.createTime" @onClick="goPlayDetail(item.id)"></list-item-l-r>
					</block>

				</view>
			</lay-out-wrap>
		</view>
	</view>
</template>

<script>
	import LayOutWrap from '@/components/layout.vue';
	import itemFood from '@/components/itemFood.vue';
	import ListItemLR from '@/components/ListItemLR.vue';
	import {
		linkTo
	} from '@/utils/utils.js';
	export default {
		name: 'catePage',
		components: {
			itemFood,
			ListItemLR,
			LayOutWrap
		},
		props:{
			playData:{
				type:Array,
				default() {
					return []
				}
			},
			playList:{
				type:Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			goPlayDetail(id) {
				linkTo('/pages/shoppingDetail/shoppingDetail?id='+id)
			}
		}
	}
</script>

<style lang="scss">
	.foodBox {
		background-color: $uni-bg-color;
		.content {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 29rpx;
		}
	}
	.foodList {
		margin-top: 36rpx;
	}
</style>
