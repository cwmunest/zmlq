<template>
	<view class="shoppingBox" @click="onDetail">
		<image :src="imgUrl" mode="aspectFill"></image>
		<view class="sInfo">
			<view class="title">{{title}}</view>
			<view class="descBox">
				<view class="descInfo">
					<view class="typeList" v-if="typeList.length > 0">
						<text v-for="(i,idx) in typeList" :key="idx">{{i.type}}</text>
					</view>
					<view class="desc" v-if="desc">{{desc}}</view>
				</view>
				<view class="price" v-if="price">
					<label>¥</label>{{price}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'itemShopping',
		props: {
			
			imgUrl:{
				type:String,
				default() {
					return ''
				}
			},
			title:{
				type:String,
				default() {
					return ''
				}
			},
			typeList:{
				type:Array,
				default() {
					return []
				}
			},
			desc:{
				type:String,
				default() {
					return ''
				},
			},
			price:{
				type:String,
				default() {
					return ''
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			onDetail() {
				this.$emit('onClick')
			}
		}
	}
</script>

<style lang="scss">
	.shoppingBox {
		width: 100%;
		background-color: #ffffff;
		border-radius: 26rpx;
		box-shadow: 0 0 7px #e3e3e3;
		overflow: hidden;
		margin-bottom: 23rpx;
	
		image {
			width: 100%;
			height: 373rpx;
		}
	
		.sInfo {
			padding: 22rpx 32rpx 32rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
	
			.title {
				font-size: 30rpx;
				margin-bottom: 31rpx;
			}
			.descBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.desc {
					font-size: 26rpx;
					color: #999999;
				}
			}
			.price {
				color: #f74f2a;
				font-size: 44rpx;
				label {
					font-size: 24rpx;
				}
			}
	
			.typeList {
				display: flex;
				align-items: center;
	
				text {
					display: block;
					width: 104rpx;
					height: 30rpx;
					background-color: #f8efff;
					font-size: 22rpx;
					color: #9f47ed;
					text-align: center;
					line-height: 30rpx;
					margin-right: 12rpx;
				}
			}
		}
	}
</style>
