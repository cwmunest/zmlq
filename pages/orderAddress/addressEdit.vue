<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="地址编辑" @clickLeft="goBack"></uni-nav-bar>
		<view class="uni-common-mt form-box x-panel-content x-top-navbar x-bottom-btn">
			<view class="uni-form-item uni-column">
				<view class="title">姓名：</view>
				<input class="uni-input" v-model="name" focus placeholder="请输入收货人姓名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">手机号：</view>
				<input class="uni-input" v-model="phone" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">收货地址：</view>
				<input class="uni-input" v-model="address" confirm-type="search" placeholder="请输入详细收货地址" />
			</view>
		</view>
		<view class="x-btn-submit" @click="onSubmit">提交</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import executeS from '@/service/executeS.js';
	import {backTo,refreshPrevPage,formatTime,showMsg, getStorage} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				goBack:backTo,
				id:'',
				name: '',
				phone:'',
				address:'',
			};
		},
		onLoad(options) {
			const _this = this;
			if(options.data){
				let data=JSON.parse(decodeURIComponent(options.data));
				this.id=data.id;
				this.name=data.name;
				this.phone=data.phone;
				this.address=data.addressName;
			}
		},
		methods: {
			queryAppMessageDetail: async (_this, id) => {
				const paramsPayload = {
					apixkey: "queryAppMessageDetail",
					payload: {
						id: id
					}
				}
				const response = await executeS(paramsPayload);
				if (response.success) {
					let data = response.data;
					let regTime = data.createTime.replace(/\-/g, "/");
					data.createTime = formatTime(regTime,'yyyy-MM-dd')
					_this.info = data
				}
			},
			onSubmit() {
				if (!this.name) return showMsg("请输入收货人姓名！");
				if (!this.phone) return showMsg("请输入手机号！");
				if (!this.address) return showMsg("请输入详细收货地址！");
				let data={
					userId:Shell.UserInfo.id,
					id:this.id||null,
					name:this.name,
					phone:this.phone,
					addressName:this.address
				}
				const paramsPayload = {
					apixkey: this.id?"queryAppAddressEdit":"queryAppAddressAdd",
					payload: data
				}
				executeS(paramsPayload).then(response=>{
					if(response.success) {
						showMsg('保存成功','success');
						refreshPrevPage();
						this.goBack();
					}else{
						showMsg('提交失败','warn')
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.page-root {
		background-color: $uni-bg-color;
        background-color: #F8F8F8;
        padding-bottom: 40rpx;
	}	
	.form-box {
		margin-top: 10rpx;
	}
	.btnSubmit {
		width: 100%;
		height: 92rpx;
		background-color: #f74f2a;
		position: fixed;
		bottom: 0;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		line-height: 92rpx;
	}
</style>
