<template>
	<view class="menuListWrap">
		<view @click="goPage(item.path,item.type)"  class="listBox" v-for="(item,index) in menuData" :key="index">
			<view class="info">
				<image :src="item.url" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
			<image src="/static/images/user/arrowR.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import icon1 from '@/static/images/user/icon9.png'
	import icon2 from '@/static/images/user/icon3.png'
	import icon3 from '@/static/images/user/icon2.png'
	import icon4 from '@/static/images/user/icon8.png'
	import icon5 from '@/static/images/user/icon7.png'
	import icon6 from '@/static/images/user/icon6.png'
	import icon7 from '@/static/images/user/icon4.png'
	import address from '@/static/images/user/address.png'
	import order from '@/static/images/user/order.png'
	import evaluation from '@/static/images/user/evaluation.png'
	import video from '@/static/images/user/video.png'
	import expense from '@/static/images/user/expense.png'
	import coupon from '@/static/images/user/coupon.png'
	import {
		linkTo, showMsg
	} from '@/utils/utils.js';
	export default {
		name: "menuListBox",
		data() {
			return {
				menuData: [
					// {
					// 	name: '修改密码',
					// 	url: icon1,
					// 	path: '/pages/changePassword/changePassword'
					// },
					// {
					// 	name: '我的收藏',
					// 	url: icon2,
					// 	path: ''
					// },
					{
						name: '消息中心',
						url: icon6,
						path: '/pages/message/message',
						type:1
					},
					{
						name: '我的优惠券',
						url: coupon,
						path: '/pages/coupon/coupon?type=mine',
						type:1
					},
					{
						name: '我的收支',
						url: expense,
						path: '/pages/myexpense/myexpense',
						type:1
					},
					{
						name: '我的订单',
						url: order,
						path: '/pages/myorder/myorder',
						type:1
					},
					{
						name: '收货地址',
						url: address,
						path: '/pages/orderAddress/orderAddress',
						type:1
					},
					{
						name: '我的随手拍',
						url: icon4,
						path: '/pages/takephotoatwill/mytakephotoatwilladmin',
						type:1
					},
					{
						name: '我的评价',
						url: evaluation,
						path: '/pages/publicevaluation/myevaluationadmin',
						type:1
					},
					{
						name: '我的视频',
						url: video,
						path: '/pages/hongguanghu/home/home',
						type:1
					},
					/* {
						name: '常见问题',
						url: icon3,
						path: '/pages/FAQ/FAQ',
						type:1
					}, */
					{
						name: '使用说明',
						url: icon7,
						path: 'http://conv.zuimeilangqi.com/using.html',
						type:2
					},
					{
						name: '意见反馈',
						url: icon5,
						path: '/pages/feedback/feedback',
						type:1
					},
					/* {
						name: '便民服务',
						url: icon6,
						path: '/pages/service/service',
						type:1
					}, */
				]
			}
		},
		methods: {
			goPage(url,type) {
				if(type == 1) {
					if(!Shell.UserInfo.id){		
						showMsg('未授权！');
						return;
					}
					linkTo(url)
				}else {
					window.location=url
				}
			}

		}
	}
</script>
	
<style lang="scss" scoped>
	.menuListWrap {
		padding: 0 20rpx;
		.listBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #1b1b1b;
			font-size: 28rpx;
			padding: 42rpx 0;
			border-bottom: 1rpx solid #f5f5f5;
			.info {
				display: flex;
				align-items: center;
				image {
					width: 34rpx;
					height: 34rpx;
					margin-right: 22rpx;
				}
			}
			image {
				width: 11rpx;
			}
		}
	}
	
</style>
