<template>
	<view class="content">
		<view class="userInfo">
			<user-info-box :info="userInfo"></user-info-box>
		</view>
		<view class="menuList">
			<menu-list-box></menu-list-box>
		</view>
	</view>
</template>

<script>
	import userInfoBox from './component/userInfoBox.vue';
	import menuListBox from './component/menuListBox.vue';
	import executeS from '@/service/executeS.js';
	import {
		getStorage
	} from '@/utils/utils.js';
	export default {
		components: {
			userInfoBox,
			menuListBox
		},
		data() {
			return {
				title: 'Hello',
				userInfo:{}
			}
		},
		onLoad() {
			const _this = this;
			this.queryAppUserGetUserLogin(_this)
		},
		methods: {
			queryAppUserGetUserLogin: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppUserGetUserLogin",
					payload: {}
				}
				executeS(paramsPayload).then(response=>{
					if(response.success) {
						_this.userInfo =  response.data;
						Shell.UserInfo=response.data||{};
					}else {						
						if(!Shell.IsTest)window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxac148eba0de2070b&redirect_uri=http%3A%2F%2Fwww.zuimeilangqi.com/pubcms/index.html&response_type=code&scope=snsapi_userinfo#wechat_redirect'
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background:$uni-bg-color;
	}
	.content {
		.userInfo {
			width: 100%;
		}
	}
</style>
