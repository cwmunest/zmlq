<template>
	<view class="tourismBox">
		<view class="itemBox" v-for="(item,index) in list" :key="index" @click="onDetail(item.tag)">
			<!-- <view class="name">{{item.name}}</view> -->
			<view class="info" :style="{backgroundColor:item.bgColor}">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tourismBox',
		props: {
			list: {
				type: Array,
				default () {
					return [{
						name:'海滨度假',
						tag:'seaside_holiday',
						bgColor:'#71a3ff'
					},
					{
						name:'人气一日游',
						tag:'popular_day_tour',
						bgColor:'#00e4b7'
					},
					{
						name:'漫步琅岐',
						tag:'roaming_langqi',
						bgColor:'#fec900'
					},
					{
						name:'亲子娱乐',
						tag:'parent_child_entertainment',
						bgColor:'#c9b1fd'
					},
					{
						name:'高端精选',
						tag:'high_grade_selection',
						bgColor:'#ff8a40'
					},
					{
						name:'吃玩方便',
						tag:'eat_and_play',
						bgColor:'#71a3ff'
					}]
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			onDetail(tag) {
				this.$emit('onClick',{tag:tag})
			}
		}
	}
</script>

<style lang="scss">
	.tourismBox {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.itemBox {
			width: 33.33333%;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: 40rpx;

			.name {
				font-size: 28rpx;
				color: #3d4042;
				margin-bottom: 18rpx;
			}

			.info {
				text-align: center;
				color: #fff;
				font-size: 26rpx;
				width: 140rpx;
				height: 140rpx;
				line-height: 140rpx;
				border-radius: 50%;
			}
		}
	}
</style>
