<template>
	<!-- 琅岐党员行动 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="琅岐党员行动" background-color="#cc0000" @clickLeft="goBack"></uni-nav-bar>
		<view class="videoBox">
			<video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls></video>
		</view>
		<view class="nowPlay">
			<image src="/static/images/common/shipin.png" mode="widthFix"></image>
			<text>正在播放：2018年琅岐区党建回顾视频</text>
		</view>
		<view class="listBox">
			<block v-for="(item,index) in listData" :key="index">
				<item-cell :title="item.title" :date="item.date" :check="item.check"></item-cell>
			</block>
			
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import itemCell from './component/itemCell.vue';
	import {backTo,linkTo} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			itemCell
		},
		data() {
			return {
				goBack:backTo,
				listData:[{
					title:'2018琅岐经济区党建回顾视频',
					date:'09-01',
					check:true
				},
				{
					title:'2018琅岐经济区党建回顾视频',
					date:'09-01',
					check:false
				},
				{
					title:'2018琅岐经济区党建回顾视频',
					date:'09-01',
					check:false
				},
				{
					title:'2018琅岐经济区党建回顾视频',
					date:'09-01',
					check:false
				},
				{
					title:'2018琅岐经济区党建回顾视频',
					date:'09-01',
					check:false
				}]

			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color;
	}
	.videoBox {
		width: 100%;
		height: 541rpx;

		video {
			width: 100%;
			height: 100%;
		}
	}

	.nowPlay {
		height: 98rpx;
		background-color: #fff4f4;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #f30b0b;
		padding: 0 27rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #ebebeb;
		image {
			width: 36rpx;
			margin-right: 18rpx;
		}
	}
</style>
