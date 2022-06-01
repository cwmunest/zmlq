<template>
	<view class="walkIntoIndexWrap">
		<!--阅读 Start-->
		<view class="menuBoxWrap">
			<view @click="goPath(item.type,item.path)" class="iconBox" v-for="(item, index) in menuIconData" :key="index">
				<image :src="item.url" mode="scaleToFill" class="iconImg"></image>
				<view class="text">{{item.name}}</view>
			</view>
		</view>
		<view class="popularViewpointWrap mt20">
			<lay-out-wrap :title="'热门景点'" @onClick="goMore">
				<view slot="content">
					<view class="popularViewpointBox">
						<navigator hover-class="none" :url="'/pages/travelDetail/travelDetail?id='+item.id" class="PVItemWrap" v-for="(item, index) in popViewData" :key="index">
							<view class="PVItem">
								<view class="imgCon"><image :src="item.image" mode="scaleToFill" class="curImg"></view>
								<view class="text">{{item.name}}</view>
							</view>
						</navigator>
					</view>
				</view>
			</lay-out-wrap>	
		</view>
		<!--精彩放送 Start-->
		<view class="wonderfulNewWrap">
			<lay-out-wrap :title="'活动预告'" @onClick="goMore2">
				<view slot="content">
					<block v-for="(item,index) in list" :key="index">
						<block>
							<list-item-l-r :url="item.coverImage" :showLine="true" :title="item.title" :date="item.createTime"
							 @onClick="goPage(item.id)"></list-item-l-r>
						</block>
					</block>
				</view>
			</lay-out-wrap>
		</view>
	</view>	
</template>

<script>
	import icon01 from '@/static/images/zmlq/walkinto/icon01.png';
	import icon02 from '@/static/images/zmlq/walkinto/icon02.png';
	import icon03 from '@/static/images/zmlq/walkinto/icon03.png';
	import icon04 from '@/static/images/zmlq/walkinto/icon04.png';
	import icon05 from '@/static/images/zmlq/walkinto/icon05.png';
	import icon06 from '@/static/images/zmlq/walkinto/icon06.png';
	import icon07 from '@/static/images/zmlq/walkinto/icon07.png';
	import icon08 from '@/static/images/zmlq/walkinto/icon08.png';
	import {
		linkTo
	} from '@/utils/utils.js';
	import LayOutWrap from'@/components/layout.vue';
	import ListItemLR from '@/components/ListItemLR.vue';
	
	export default {
		name:'walkIntoPageCur',
		components:{LayOutWrap,ListItemLR},
		props:{
			popViewData:{
				type:Array,
				default(){
					return []
				}
			},
			list:{
				type:Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				menuIconData:[
					{name:'琅岐景点',url:icon01,path:'/pages/travelList/travelList?type=scenic',type:'location'},
					{name:'360实景',url:icon02,path:'http://112.49.38.63/mediaLibrary/vtour/tour.html', type:'http'},
					{name:'旅游攻略',url:icon03,path:'/pages/strategy/strategy',type:'location'},
					{name:'特产预定',url:icon04,path:'/pages/productReserve/productReserve',type:'location'},
					{name:'周边推荐',url:icon05,path:'/pages/rimRecommendMap/rimRecommendMap',type:'location'},
					{name:'精彩回顾',url:icon06,path:'/pages/pageList/pageList?title=精彩回顾&category=wonderful_review',type:'location'},
					{name:'特色农庄',url:icon07,path:'/pages/travelList/travelList?type=farm',type:'location'},
					{name:'光影效果',url:icon08,path:'/pages/shadowList/shadowList',type:'location'},
				],
			}
		},
		onLoad() {

		},
		methods: {
			goMore() {
				linkTo('/pages/travelList/travelList?type=scenic')
			},
			goMore2() {
				linkTo('/pages/activityList/activityList')
			},
			goPage(id,title) {
				linkTo('/pages/activityDetail/activityDetail?id=' + id)
			},
			goPath(type,path) {
				if(type == 'location') {
					linkTo(path)
				}else {
					window.location.href = path
				}
			}

		}
	}
</script>

<style lang="scss">
	.walkIntoIndexWrap{
		width: 100%;
		box-sizing: border-box;
		.menuBoxWrap{
			width:100%;
			display:flex;
			flex-wrap:wrap;
			background:$uni-bg-color;
			.iconBox{
				width:25%;
				display:flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding:10rpx 0;
				.iconImg{
					width:90rpx;
					height:90rpx;
				}
				.text{
					font-size:24rpx;
					width:100%;
					height:60rpx;
					line-height:60rpx;
					text-align:center;
				}
			}
		}
		.popularViewpointBox{
			display:flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			.PVItemWrap{
				width:50%;
				display:flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding-bottom:10rpx;
				.PVItem{
					width:340rpx;
					
					.imgCon{
						width:340rpx;
						height:245rpx;
					}
					.curImg{
						width:100%;
						height:100%;
						border-radius:10rpx;
					}
					.text{
						width:100%;
						text-align:left;
						font-size:28rpx;
						height:70rpx;
						line-height:70rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						
					}
				}
			}

		}
	}	
	
</style>
