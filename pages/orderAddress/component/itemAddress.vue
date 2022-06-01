<template>
	<view class="list-item flex-column">
		<view class="flex-column flex-a-start pb-10" @click="onDetail">
			<view class="cell-item"><view class="title">姓名：</view><view class="value">{{name}}</view></view>
			<view class="cell-item"><view class="title">手机号：</view><view class="value">{{phone}}</view></view>
			<view class="cell-item"><view class="title">收货地址：</view><view class="value">{{address}}</view></view>
		</view>
		<view class="flex-row flex-a-center flex-j-end w-fill">
			<view>
				<button v-show="false" :type="isDefault?'primary':'default'" class="mr-15" size="mini" @click="onSetDefault">{{isDefault?'默认地址':'设为默认'}}</button>
				<button class="mr-15"size="mini" @click="onEdit">编辑</button>
				<button size="mini" @click="onDelete">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'itemAddress',
		props:{
			/* imgUrl:{
				type:String,
				default() {
					return 'https://himg2.huanqiucdn.cn/attachment2010/2020/0107/20200107073359569.jpg'
				}
			}, */
			name:{
				type:String,
				default() {
					return ''
				}
			},
			phone:{
				type:String,
				default() {
					return ''
				}
			},
			address:{
				type:String,
				default() {
					return ''
				}
			},
			isDefault:{
				type:Number,
				default() {
					return 1
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
			},
			onSetDefault() {
				this.$emit('onSetDefault')
			},
			onEdit() {
				this.$emit('onEdit')
			},
			onDelete() {
				this.$emit('onDelete')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itemBox {
		background-color: $uni-bg-color;
		padding: 20rpx 14px;
		display: flex;
		flex-flow: column nowrap;
		align-items: start;
		border-bottom: 1rpx solid $uni-border-color;
		font-size: 24rpx;
		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 15rpx;
		}
		.name {
		}
		.phone {
		}
		.address {
		}
	}

</style>
