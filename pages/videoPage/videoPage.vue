<template>
	<view class="content">
		<view class=""  style="margin-top: 300rpx;align-items: center;
		justify-content: center;display: flex;">
			<audio style="text-align: left;" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author"
			 :action="audioAction" controls></audio>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: {
					poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
					name: '我在琅岐等你来',
					author: '暂无',
					src: '/static/audio/lq.mp3',
				},
				audioAction: {
					method: 'pause'
				}

			};
		}
	}
</script>

<style lang="scss">

</style>
