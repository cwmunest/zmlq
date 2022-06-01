<template>
	<view class="tabsBox">
		<view class="itemTabs" :class="cur == index?'active':''" v-for="(item,index) in menuData" :key="index" @click="getCur(index)">{{item.name}}</view>
	</view>
</template>

<script>
	export default {
		name: 'tabsMenu',
		props: {
			menuData: {
				type: Array,
				default () {
					return [{
							name: '美食专题',
							key: 'cate'
						}, {
							name: '购物专题',
							key: 'shop'
						},
						{
							name: '娱乐专题',
							key: 'pastime'
						},
					]
				}
			},
			cur:{
				type:Number,
				default () {
					return 0
				}
			}
		},
		methods:{
			getCur(index) {
				this.$emit('onClick',index)
			}
		}

	}
</script>

<style lang="scss">
	.tabsBox {
		height: 93rpx;
		background-color: $uni-bg-color;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #a2a2a2;
		justify-content: space-around;
		.itemTabs {
			height: 100%;
			line-height: 93rpx;
		}
		.active {
			font-size: 30rpx;
			color: #0289e3;
			position: relative;
			&:after {
				position: absolute;
				content: '';
				width: 100%;
				height: 6rpx;
				background-color: #0289e3;
				bottom: 0;
				left: 0;
			}
		}
		
	}
</style>
