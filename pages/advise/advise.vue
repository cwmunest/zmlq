<template>
	<!-- 投诉建议 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="投诉建议" right-text="历史" @clickLeft="goBack" @clickRight="goHistory"></uni-nav-bar>
		<view class="listBox">
			<view class="itemBox" v-for="(item,index) in listData" :key="index" @click="goAdvise(item.name)">
				<image :src="item.imgUrl" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {backTo,linkTo} from '@/utils/utils.js';
	import icon1 from '@/static/images/advise/icon1.png'
	import icon2 from '@/static/images/advise/icon2.png'
	import icon3 from '@/static/images/advise/icon3.png'
	import icon4 from '@/static/images/advise/icon4.png'
	import icon5 from '@/static/images/advise/icon5.png'
	import icon6 from '@/static/images/advise/icon6.png'
	import icon7 from '@/static/images/advise/icon7.png'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				goBack:backTo,
				listData:[{
					imgUrl:icon3,
					path:'',
					name:'路面保洁'
				},
				{
					imgUrl:icon7,
					path:'',
					name:'道路养护'
				},
				{
					imgUrl:icon1,
					path:'',
					name:'琅岐闽江大桥养护'
				},
				{
					imgUrl:icon4,
					path:'',
					name:'绿化养护'
				},
				{
					imgUrl:icon2,
					path:'',
					name:'机电设备维护'
				},
				{
					imgUrl:icon6,
					path:'',
					name:'雨污水管网养护'
				},
				{
					imgUrl:icon5,
					path:'',
					name:'其他'
				}]
				
			};
		},
		methods:{
			goAdvise(name) {
				linkTo('/pages/adviseForm/adviseForm?name='+name)
			},
			goHistory() {
				linkTo('/pages/adviseHistoryList/adviseHistoryList')
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}
	.listBox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.itemBox {
			width: 33%;
			height: 212rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1rpx solid $uni-border-color;
			image {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 25rpx;
			}
			text {
				font-size: 24rpx;
				color: #1b1b1b;
			}
		}
		view {
			&:not(:nth-child(3n)) {
				border-right: 1rpx solid $uni-border-color;
			}
		}
	}
</style>
