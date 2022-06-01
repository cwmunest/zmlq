<template>
	<view class="ListItemLRWrap"  @click="navigateTo">
		<view :class="{itemInner:true, borderBLine:showLine }">
			<view class="leftAside">
				<view class="title">{{title}}</view>
				<view class="bttom">
					<view class="see" v-if="seeNum">
						<view class="icon"></view>
						<view class="text">{{seeNum}}</view>
					</view>
					<view class="dateTimer">
						{{date}}
					</view>
				</view>
				
			</view>
			<view class="RightCon">
				<image :src="url" mode="aspectFill" class="imageBox"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'ListItemLR',
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
			url:{
				type:String,
				default(){
					return ''
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
			}
		}

	}
</script>

<style lang="scss">
	.ListItemLRWrap{
		width:100%;
		padding:0rpx 20rpx;
		box-sizing: border-box;
		.itemInner{
			
			display:flex;
			justify-content:space-between;
			width:100%;
			padding:20rpx 0rpx;
			box-sizing:border-box;
			&.borderBLine{
				border-bottom:1px solid $uni-border-color;	
			}
			.leftAside{

				width: calc(100% - 280px);
				padding-right:15rpx;
				box-sizing:border-box;
				display:flex;
				flex-direction:column;
				flex:1;
				.title{
					font-size:30rpx;
					flex:1;
					color:$uni-text-color;
				}
				.bttom{
					width:100%;
					height:60rpx;
					display:flex;
					justify-content:space-between;
					align-items:center;
					box-sizing:border-box;
					padding:0rpx 10rpx;
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
				
			}
			.RightCon{
				width: 280rpx;
				height:170rpx;
				
			}
			.imageBox{
				width: 280rpx;
				height:170rpx;
			}
		}
	}

</style>
