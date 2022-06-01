<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="我的随手拍" @clickLeft="goBack"></uni-nav-bar>
		<view class="list x-panel-content x-top-navbar">
			<block v-for="(item,index) in list" :key="index">
				<view class="list-item flex-column">
					<view class="flex-row flex-a-center" >
						<block v-for="(img,idx) in item.image && item.image.split(',')" :key="idx">
							<img :src="img" style="height:200rpx; padding:0 30rpx;" @click="viewImg(item.image.split(','),img)">
						</block>
					</view>
					<view style="padding:30rpx 0 0;">{{item.reportContent}}</view>
					<view style="padding:20rpx 0 0;color:#999;">{{item.reportTime}}</view>
				</view>
			</block>
		</view>
		<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniLoadMore from '@/components/uni-load-more.vue';
	import executeS from '@/service/executeS.js';
	import {backTo,setDateType,linkTo,showMsg, getStorage} from '@/utils/utils.js';
	export default{		
		components: {
			uniNavBar,
			uniLoadMore
		},
		data() {
			return {
				goBack: backTo,
				params: {
					pageSize: 10,
					pageNum: 1,
				},
				pageCount: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [
					/* {image:"http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97,http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97",reportContent:"福建火炬高新技术创业园主楼1号楼3层南4-2"},
					{image:"http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97,http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97",reportContent:"福建火炬高新技术创业园主楼1号楼3层南4-2"}, */
				],
			};
		},
		onLoad() {
			this.queryAppTakePhotoAtWillList();
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
			params = this.params;
			params.pageIndex++;
			const paramsPayload = {
				apixkey: "queryAppTakePhotoAtWillList",
				payload: params,
				param:"userId="+Shell.UserInfo.id,
			}
			setTimeout(async () => {
				if (params.pageIndex > this.pageCount) {
					this.loadingType = 2;
					return;
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					list = setDateType(response.data.records);
					console.log(list)
					this.list = this.list.concat(list);
					this.loadingType = 0;
				}
			}, 800);
		},
		methods:{
			queryAppTakePhotoAtWillList(){
				//let _this=this;
				const paramsPayload = {
					apixkey: "queryAppTakePhotoAtWillList",
					payload: this.params,
					param:"userId="+Shell.UserInfo.id,
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						this.list = setDateType(response.data.records)
						this.pageCount = response.data.pages
						if(response.data.total <= 10) {
							this.loadingType = 2;
						}
					}
				})
			},
			goDetail(id) {
				let itemAddr=this.list.find((o,i)=>{return o.id==id;});
				//linkTo('./addressedit/addressedit?data='+encodeURIComponent(JSON.stringify(itemAddr)))
			},
			viewImg(imgList,path) {
				uni.previewImage({
					urls: imgList,
					current: path
				});
			},
		}
	}
</script>

<style lang="scss">
	.list {
		background-color: $uni-bg-color;
		/* padding: 0 28rpx; */
	}
	.list-item{
		background-color: $uni-bg-color;
		padding: 20rpx 20rpx;
		border-bottom: 3rpx solid $uni-border-color;
	}
</style>
