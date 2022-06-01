<template>
	<view class="catePageWrap">
		<view class="foodBox">
			<lay-out-wrap :title="'特色美食'" :isMoreShow="false">
				<view slot="content">
					<view class="content">
						<block v-for="(item,index) in foodData" :key="index">
							<item-food @onClick="goFoodDetail(item.id)" :imgUrl="item.image" :title="item.name" :infoTxt="item.intro"></item-food>
						</block>
					</view>
				</view>
			</lay-out-wrap>
		</view>
		<view class="foodList">
			<lay-out-wrap :title="'不可错过的特色美食'" :isMoreShow="false">
				<view slot="content">
					<block v-for="(item,index) in foodList" :key="index">
						<list-item-l-r :url="item.image" :title="item.name" :showLine="true" :date="item.createTime" @onClick="goFoodDetail(item.id)"></list-item-l-r>
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
			foodData:{
				type:Array,
				default() {
					return []
				}
			},
			foodList:{
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
			goFoodDetail(id) {
				linkTo('/pages/foodDetail/foodDetail?id=' + id)
			}
		}
	}
</script>

<style lang="scss">
	.foodBox {
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
