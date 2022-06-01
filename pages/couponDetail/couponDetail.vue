<template>
	<!-- 使用优惠券 -->
	<view class="pageHomeWrap">
		<item-coupon-box :info="info" @onMake="goMake(info.id)"></item-coupon-box>
		<!-- <view class="codeBox">
			<image src="https://qr.api.cli.im/qr?data=abc&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=f7d3f853d033beba9722c71425a015d3" mode="widthFix"></image>
			<text>消费时请出示二维码</text>
		</view> -->
	</view>
</template>

<script>
	import itemCouponBox from '@/components/itemCoupon.vue';
	import executeS from '@/service/executeS.js';
	export default {
		components:{
			itemCouponBox
		},
		data() {
			return {
				info:{
					state:1,
					price:100,
					title:'新手畅游专享红包',
					date:'2019-5-10',
					desc:'满1000可使用'
				}
				
			};
		},
		onLoad(options) {
			const _this = this;
			this.queryAppCouponDetail(_this, options.id)
		},
		methods:{
			queryAppCouponDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppCouponDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					_this.info = response.data.lqCoupon
			
				}
			},
			goMake(id) {
				const _this = this;
				this.queryAppUserCouponAdd(_this,id)
			},
			queryAppUserCouponAdd: (_this,id) => {
				const paramsPayload = {
					apixkey: "queryAppUserCouponAdd",
					payload: {couponId:id}
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						showMsg(response.message,'success')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.codeBox {
		background-color: $uni-bg-color;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 88rpx 0;
		margin-top: 14rpx;
		image {
			width: 498rpx;
			margin-bottom: 59rpx;
		}
		text {
			font-size: 28rpx;
			color: #787878;
		}
	}

</style>
