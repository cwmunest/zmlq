<template>
	<view>
		<view><text>请选择要播放的视频，或者自已上传视频</text></view>
		<wuc-tab :tab-list="tabList" :tabCur.sync="tabCur" @change="tabChange"
		 tab-class="text-center text-black bg-white" select-class="text-orange"></wuc-tab>
		<swiper :current="tabCur" duration="300" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">			
			<uni-grid :column="2">
				<uni-grid-item>
					<text class="text">{{item.name}}</text>
				</uni-grid-item>
				<uni-grid-item>
					<text class="text">{{item.name}}</text>
				</uni-grid-item>
			</uni-grid>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		data() {
			return {
			  tabCur: 0,
			  tabList: [{ name: '动画' }, { name: '我的' }],
			}
		},
		components: { WucTab,uniGrid,uniGridItem },
		methods: {
			tabChange(index) {
				this.tabCur = index;
			},
			swiperChange(e) {
				let { current } = e.target;
				this.tabCur = current;
			},
		}
	}
</script>

<style lang="scss">
div,scroll-view,swiper {
    box-sizing: border-box;
}
div {
  font-size: 28upx;
  background-color: #f1f1f1;
}
.text-center {
    text-align: center;
}
.text-black{
  color:#333333;
}
.bg-white{
    background-color: #ffffff;
}
.text-orange{
  color:#f37b1d
}

</style>