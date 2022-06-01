<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="收货地址" @clickLeft="goBack"></uni-nav-bar>
		<view class="x-list x-panel-content x-top-navbar x-bottom-btn">
			<block v-for="(item,index) in list" :key="index">
				<item-address @onClick="goDetail(item.id)" @onEdit="goDetail(item.id)" @onSetDefault="setDefault(item.id)" @onDelete="hDelete(item.id)" :name="item.name" :phone="item.phone" :address="item.addressName" :isDefault="item.isDefault"></item-address>
			</block>
			<view v-show="recordCount==0" class="x-no-data">暂无地址</view>
		</view>
		<!-- <uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more> -->
		<view class="x-btn-submit" @click="onAdd">新增地址</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import itemAddress from "./component/itemAddress.vue";
	//import uniLoadMore from '@/components/uni-load-more.vue';
	import executeS from '@/service/executeS.js';
	import {backTo,setDateType,linkTo, showMsg, getStorage} from '@/utils/utils.js';
	export default{		
		components: {
			uniNavBar,
			itemAddress,
			//uniLoadMore
		},
		data() {
			return {
				userId:Shell.UserInfo.id,
				goBack: backTo,
				list: [
					/* {id:1,name:"周小二",mobile:"1335822955",address:"福建火炬高新技术创业园主楼1号楼3层南4-2",isDefault:0},
					{id:2,name:"周小三",mobile:"1335822955",address:"福建火炬高新技术创业园主楼1号楼3层南4-2",isDefault:1}, */
				],
				params: {
					pageSize: 10,
					pageNum: 1,
				},
				pages: 0,
				recordCount:0,
				/* loadingType: 0,
				contentText: {
					contentdown: "上拉加载更多信息",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}, */
			};
		},
		onLoad() {
			this.queryAppAddressList();
		},
		methods:{
			refreshData() {
				this.queryAppAddressList();
			},
			queryAppAddressList() {
				const paramsPayload = {
					apixkey: "queryAppAddressList",
					payload: this.params,
					param:"userId="+Shell.UserInfo.id,
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						this.list = setDateType(response.data.records)
						this.pages = response.data.pages;
						this.recordCount=this.list.length;
						/* if(response.data.total <= 10) {
							this = 2;
						} */
					}
				})
			},
			goDetail(id) {
				let itemAddr=this.list.find((o,i)=>{return o.id==id;});
				linkTo('./addressEdit?data='+encodeURIComponent(JSON.stringify(itemAddr)))
			},
			onAdd() {
				linkTo('./addressEdit')
			},
			setDefault(id) {						
				let itemAddr=this.list.find((o,i)=>{return o.id==id;});
				if(itemAddr.isDefault) return;
				/* let itemDef=this.list.find((o,i)=>{return o.isDefault;});
				if(itemDef) itemDef.isDefault=0;
				itemAddr.isDefault=1;
				return; */
				
				let _this=this;
				const paramsPayload = {
					apixkey: "queryAppAddressSetDefault",
					payload: params,
					param:"userId="+Shell.UserInfo.id,
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						showMsg('设置成功','success');
						let itemDef=this.list.find((o,i)=>{return o.isDefault;});
						if(itemDef) itemDef.isDefault=0;
						itemAddr.isDefault=1;
					}else{
						showMsg('设置失败');
					}
				})
			},
			hDelete(id) {
				let _this=this;
				const paramsPayload = {
					apixkey: "queryAppAddressDel",
					payload: {id:id}
				}
				executeS(paramsPayload).then(response => {
					if (response.success) {
						showMsg('删除成功','success');
						this.list.remove(this.list.find((o,i)=>{return o.id==id;}));						
						this.recordCount=this.list.length;
					}else{
						showMsg('删除失败');
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		background-color: $uni-bg-color;
		/* padding: 0 28rpx; */
	}
	.btnNew {
		width: 100%;
		height: 92rpx;
		background-color: #4cd964;
		position: fixed;
		bottom: 0;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		line-height: 92rpx;
	}

</style>
