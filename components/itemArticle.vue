<template>
	<view class="itemArticleBox" @click="onDetail">
		<image :src="articleInfo.image" mode="aspectFill"></image>
		<view class="info">
			<view class="title">
				{{articleInfo.name}}
			</view>
			<view class="intro">{{articleInfo.intro}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'itemArticle',
		props: {
			articleInfo: {
				type: Object,
				default () {
					return {}
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
	.itemArticleBox {
		display: flex;
		align-items: center;
		width: 100%;

		image {
			width: 247rpx;
			height: 166rpx;
			border-radius: 14rpx;
			margin-right: 18rpx;
		}
		.info {
			height: 166rpx;
			width: calc(100% - 265rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				font-size: 28rpx;
				color: #1b1b1b;
				margin-top: 22rpx;
			}
			.intro {
				font-size: 24rpx;
				color: #6f6565;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
	}
</style>
