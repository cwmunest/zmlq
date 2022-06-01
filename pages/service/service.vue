<template>
	<!-- 便民服务 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="便民服务" @clickLeft="goBack"></uni-nav-bar>
		<view class="phoneBox">
			<image src="/static/images/common/s1.png" mode="widthFix" class="pImg"></image>
			<view class="phoneInfo">
				<text>琅岐便民服务中心</text>
				<view class="number">0591-2220222</view>
			</view>
			<image src="/static/images/common/dianhua1.png" mode="widthFix" class="phoneImg"></image>
		</view>
		<lay-out-wrap :title="'公交信息'" :isMoreShow="false">
			<view class="content" slot="content">
				<block v-for="(item,index) in busData" :key="index">
					<item-bus-box @onClick="getOpen(index)" :busList="item.busList" :name="item.name" :desc="item.desc" :openState="item.openState" :beginBus="item.beginBus" :endBus="item.endBus" :beginDate="item.beginBus" :endDate="item.endDate"></item-bus-box>
				</block>
			</view>
		</lay-out-wrap>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import LayOutWrap from'@/components/layout.vue';
	import itemBusBox from './component/itemBus.vue';
	import {
		backTo,
		linkTo
	} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			itemBusBox
		},
		data() {
			return {
				goBack: backTo,
				busData:[
					{
						name:'福州市区专线',
						desc:'云龙礼堂-公交德仁站',
						openState:true,
						beginDate:'6:50/12:50',
						endDate:'05:30 06:30 07:30 08:30 09:30 10:30 11:30 12:30 13:30 14:30 15:30 16:30 17:30',
						beginBus:'云龙礼堂',
						endBus:'公交德仁站',
						busList:[
							{name:'云龙礼堂'},
							{name:'高官'},
							{name:'陈厝'},
							{name:'海云中学'},
							{name:'海屿'},
							{name:'海屿门亭'},
							{name:'海屿境下'},
							{name:'琅岐经济区管委会'},
							{name:'通吴路'},
							{name:'三门乐'},
							{name:'土尊王'},
							{name:'中国银行'},
							{name:'琅岐商业街'},
							{name:'工商银行'},
							{name:'琅岐镇政府'},
							{name:'三平'},
							{name:'前锋环岛'},
							{name:'琅岐加油站'},
							{name:'琅岐中心幼儿园'},
							{name:'长柄'},
							{name:'东街'},
							{name:'亭江中学'},
							{name:'亭江'},
							{name:'闽安'},
							{name:'君竹'},
							{name:'儒江(福州新莲花医院)'},
							{name:'远洋 2号线'},
							{name:'恒宇国际公园(福兴妇产医院)'},
							{name:'前屿 2号线'},
							{name:'肿瘤医院'},
							{name:'地铁五里亭站 2号线'},
							{name:'大名城'},
							{name:'紫阳 2号线'},
							{name:'古田六一路口 2号线'},
							{name:'水部'},
						]
					},
					// {
					// 	name:'马尾琅岐码头专线',
					// 	desc:'马尾琅岐码头-廨院公交总站',
					// 	openState:false,
					// 	beginDate:'6:50/12:50',
					// 	endDate:'12:50/15:50',
					// 	beginBus:'廨院公交总站',
					// 	endBus:'马尾琅岐码头'
					// }
				]
				
			};
		},
		methods:{
			getOpen(index) {
				let busData = this.busData;
				busData[index].openState = !busData[index].openState
			}
		}
	}
</script>

<style lang="scss">
	.phoneBox {
		padding: 77rpx 70rpx;
		box-sizing: border-box;
		position: relative;
		background-color: $uni-bg-color;
		height: 382rpx;
		margin-bottom: 20rpx;
		.pImg {
			position: absolute;
			width: 141rpx;
			right: 88rpx;
			top: 40rpx;
		}
		.phoneImg {
			position: absolute;
			width: 181rpx;
			left: 0;
			bottom: 12rpx;
		}
		.phoneInfo {
			display: flex;
			flex-direction: column;
			text {
				font-size: 30rpx;
			}
			.number {
				font-size: 52rpx;
				color: #f74f2a;
			}
		}
	}

</style>
