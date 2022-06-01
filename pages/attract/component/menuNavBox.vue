<template>
	<view class="menuBoxWrap">
		<navigator :url="item.path" hover-class="none" class="iconBox" v-for="(item, index) in menuData" :key="index">
			<image :src="item.url" mode="scaleToFill" class="iconImg"></image>
			<view class="text">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
	import icon01 from '@/static/images/attract/icon01.png';
	import icon02 from '@/static/images/attract/icon02.png';
	import icon03 from '@/static/images/attract/icon03.png';
	import icon04 from '@/static/images/attract/icon04.png';
	import icon05 from '@/static/images/attract/icon05.png';
	import icon06 from '@/static/images/attract/icon06.png';
	import icon07 from '@/static/images/attract/icon07.png';
	import icon08 from '@/static/images/attract/icon08.png';
	export default {
		name:"menuNavBox",
		data() {
			return {
				menuData:[ 
					{name:'投资指南',url:icon01,path:"/pages/pageList/pageList?category=invest_guide&title=投资指南"},
					{name:'投资现状',url:icon02,path:"/pages/pageList/pageList?category=invest_now&title=投资现状"},
					{name:'投资环境',url:icon03,path:"/pages/pageList/pageList?category=invest_environment&title=投资环境"},
					{name:'城市总体规划',url:icon04,path:"/pages/pageList/pageList?category=city_total_plan&title=城市总体规划"},
					{name:'土地资源',url:icon05,path:"/pages/pageList/pageList?category=land_source&title=土地资源"},
					{name:'产业结构',url:icon06,path:"/pages/pageList/pageList?category=industrial_structure&title=产业结构"},
					{name:'政策法规',url:icon07,path:"/pages/pageList/pageList?category=policies_regulations&title=政策法规"},
					{name:'我要咨询',url:icon08,path:'/pages/information/information'},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
