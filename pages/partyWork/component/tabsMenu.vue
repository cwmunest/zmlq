<template>
	<view class="tabsMenuBox">
		<scroll-view scroll-x="true" class="scrollH">
			<view class="menuBox" :class="cur == index?'active':''" v-for="(item,index) in tabsList" :key="index" @click="onTabs(index,item.category)">{{item.name}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'tabsMenu',
		props: {
			tabsList: {
				type: Array,
				default () {
					return []
				}
			},
			cur: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {


			};
		},
		methods:{
			onTabs(index,category) {
				this.$emit('onClick',{cur:index,category:category})
			}
		}
	}
</script>

<style lang="scss">
	.tabsMenuBox {
		.scrollH {
			overflow: hidden;
			white-space: nowrap;
			height: 98rpx;
			background-color: #fff4f4;

			.menuBox {
				width: 23%;
				height: 100%;
				line-height: 98rpx;
				display: inline-block;
				font-size: 30rpx;
				color: #f30b0b;
				text-align: center;
				position: relative;
			}
			.active {
				&:after {
					position: absolute;
					content: '';
					width: 77rpx;
					height: 9rpx;
					background-color: #f30b0b;
					bottom: 0;
					left: calc(50% - 38.5rpx);
				}
			}
		}
	}
</style>
