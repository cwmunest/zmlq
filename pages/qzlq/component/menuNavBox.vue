<template>
	<view class="menuBoxWrap">
		<navigator :url="item.path" hover-class="none" class="iconBox" v-for="(item, index) in menuData" :key="index" @click="checkLogin(item.name)">
			<image :src="item.url" mode="scaleToFill" class="iconImg"></image>
			<view class="text">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
	import icon01 from '@/static/images/qzlq/icon01.png';
	import icon02 from '@/static/images/qzlq/icon02.png';
	import icon03 from '@/static/images/qzlq/icon03.png';
	import icon04 from '@/static/images/qzlq/icon04.png';
	import bmfw from '@/static/images/qzlq/bmfw.png';
	import cjwt from '@/static/images/qzlq/cjwt.png';
	import gzpj from '@/static/images/qzlq/gzpj.png';
	import ssp from '@/static/images/qzlq/ssp.png';
	import {showMsg, getStorage} from '@/utils/utils.js';
	export default {
		name:"menuNavBox",
		data() {
			return {
				menuData:[
					// {name:'重大项目',url:icon01,path:'/pages/pageList/pageList?title=重大项目&category=major_project'},
					{name:'政务公开',url:icon02,path:'/pages/pageList/pageList?title=政务公开&category=openness_affairs'},
					{name:'招商引资',url:icon03,path:'/pages/attract/attract'},
					{name:'投诉建议',url:icon04,path:'/pages/advise/advise'},
					{name:'便民服务',url:bmfw,path:'/pages/service/service'},
					{name:'常见问题',url:cjwt,path:'/pages/FAQ/FAQ'},
					{name:'随手拍',url:ssp,path:'/pages/takephotoatwill/takephotoatwill'},
					{name:'公众评价',url:gzpj,path:'/pages/publicevaluation/publicevaluation'},
					{name:'项目管理',url:icon01,path:'#'},
				],
			}
		},
		methods: {
			checkLogin(name){
				if(!Shell.UserInfo.id ){
					if(name=="随手拍" || name=="公众评价" ){						
							showMsg('未授权！')
					}
				}
				if(name=="项目管理"){
					window.open('http://112.49.38.88:15008/mpro/mobileLoginController.do?login')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.menuBoxWrap{
	width:100%;
	display:flex;
	justify-content: start;
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
