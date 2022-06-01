<template>
	<view class="menuBoxWrap">
		<view @click="goPath(item.type,item.path)" class="iconBox" v-for="(item, index) in menuData" :key="index">
			<image :src="item.url" mode="scaleToFill" class="iconImg"></image>
			<view class="text">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	import icon01 from '@/static/images/redlq/icon01.png';
	import icon02 from '@/static/images/redlq/icon02.png';
	import icon03 from '@/static/images/redlq/icon03.png';
	import icon04 from '@/static/images/redlq/icon04.png';
	import icon05 from '@/static/images/redlq/icon05.png';
	import icon06 from '@/static/images/redlq/icon06.png';
	import icon07 from '@/static/images/redlq/icon07.png';
	import icon08 from '@/static/images/redlq/icon08.png';
	import {
		linkTo
	} from '@/utils/utils.js';
	export default {
		name:"menuNavBox",
		data() {
			return {
				menuData:[ 
					{name:'习总讲话',url:icon01,path:'/pages/talk/talk?category=chairman_speech',type:'location'},
					{name:'琅岐党员行动',url:icon02,path:'/pages/redVideoList/redVideoList',type:'location'},
					{name:'思想理论',url:icon03,path:'/pages/partyWork/partyWork?title=思想理论',type:'location'},
					{name:'党务知识',url:icon04,path:'/pages/partyWork/partyWork?title=党务知识',type:'location'},
					{name:'党章党规',url:icon05,path:'/pages/partyWork/partyWork?title=党章党规',type:'location'},
					{name:'党建应知会',url:icon06,path:'/pages/pageDetail/pageDetail?title=党建应知会&category=party_construction&type=red',type:'location'},
					{name:'纪律处分条例',url:icon07,path:'/pages/pageDetail/pageDetail?title=纪律处分条例&category=disciplinary_ordinance&type=red',type:'location'},
					{name:'知识自测',url:icon08,path:'http://jingda.12371.cn/web/html/index53990.html', type:'http'},
				]
			}
		},
		methods: {
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
			width:110rpx;
			height:110rpx;
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
