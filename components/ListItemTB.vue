<template>
	<view class="ListItemTBWrap"  @click="navigateTo">
		<view :class="{itemInner:true, borderBLine:showLine }">
			<view class="itemHd"><view class="title">{{title}}</view></view>
			<view class="itemBd" v-if="thumbs.length > 0">
				<image :src="item" v-for="(item,index) in thumbs" :key="index" mode="aspectFill" class="imageBox"></image>
			</view>
			<view class="itemFd">
				<view class="see">
					<view class="icon"></view>
					<view class="text">{{seeNum}}</view>
				</view>
				<view class="dateTimer">
					{{date}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'ListItemTB',
		props:{
			title:{
				type:String,
				default(){
					return "琅岐花海基本完工 带你追寻海丝文化魅力"
				}
			},
			showLine:{
				type:Boolean,
				default(){
					return false
				}
			},
			thumbs:{
				type:Array,
				default(){
					return []
				}
			},
			date:{
				type:String,
				default(){
					return "2019-12-22"
				}
			},
			seeNum:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		methods:{
			navigateTo(){
				this.$emit('onClick')
			},
			
		}

	}
</script>

<style lang="scss">
	.ListItemTBWrap{
		width:100%;
		padding:0rpx 20rpx;
		box-sizing: border-box;
		.itemInner{
			padding:10rpx 0rpx;
			&.borderBLine{
				border-bottom:1px solid $uni-border-color;	
			}
			.itemHd{
				width:100%;
				height:80rpx;
				white-space:nowrap;
				align-items:center;
				display:flex;
				.title{
					font-size:30rpx;
					width:100%;
					white-space:nowrap;
					text-overflow:ellipsis;
					overflow:hidden;
					color:$uni-text-color;
				}
			}
			.itemBd{
				display:flex;
				
			}
			.itemFd{
				width:100%;
				height:60rpx;
				display:flex;
				justify-content:space-between;
				align-items:center;
				box-sizing:border-box;
				padding:10rpx 10rpx 0rpx 10rpx;
				.see{
					display:flex;
					align-items:center;
					font-size:30rpx;
					.icon{
						width:30rpx;
						height:30rpx;
						background:url("../static/images/zmlq/see.png") no-repeat left center;
						background-size:100%;
					}
					.text{
						color:$uni-text-color-grey;
						padding-left:10rpx;
					}
				}
				.dateTimer{
					font-size:30rpx;
					color:$uni-text-color-grey;
				}
			}
			
			
			.imageBox{
				width: 100%;
				height:135rpx;
				padding-right:10rpx;
				box-sizing:border-box;
				&:last-child{
					padding-right:0rpx;
				}
			}
		}
	}

</style>
