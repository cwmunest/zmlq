<script>
	import executeS from '@/service/executeS.js';
	import {setStorage} from '@/utils/utils.js';
	export default {
		onLaunch: function() {
			//setStorage('userInfo',null);
			const paramsPayload = {
				apixkey: "queryAppUserGetUserLogin",
				payload: {}
			}
			executeS(paramsPayload).then(response=>{
				if (!response.success) {
					let code = Shell.IsTest?"test":this.getQueryString('code');
					if (code) {
						this.queryAppUserCouponGetUserInfo(code)
						return;
					} else {
						if(!Shell.IsTest)
						window.location.href =
							'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxac148eba0de2070b&redirect_uri=http://dj.zuimeilangqi.com/pubcms/index.html&response_type=code&scope=snsapi_userinfo#wechat_redirect'
						if(!Shell.IsTest)
						window.location.href =
							'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxac148eba0de2070b&redirect_uri=http://dj.zuimeilangqi.com/pubcms/index.html&response_type=code&scope=snsapi_userinfo#wechat_redirect'

						if(!Shell.IsTest) window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxac148eba0de2070b&redirect_uri=http%3A%2F%2Fdj.zuimeilangqi.com/pubcms/index.html&response_type=code&scope=snsapi_userinfo#wechat_redirect'

					}
				}else{
					//console.log(response);	
					if(!Shell.UserInfo.id) Shell.UserInfo=response.data||{};
					//console.log(Shell.UserInfo);	
				}
			})
		},
		methods: {
			queryAppUserCouponGetUserInfo(code) {
				const paramsPayload = {
					apixkey: "queryAppUserCouponGetUserInfo",
					payload: {code:code},
				}
				executeS(paramsPayload).then(response=>{
					if(response.success) {
						setStorage('userInfo',response.data)
						Shell.UserInfo=response.data.user||{};
					}
				});
			},
			getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}
		},
	}
</script>

<style lang="scss">	
	@import "./uni.scss";
    @import './styles/uni.css';//通用组件、模板样式库，可以当作一套ui库应用 
    @import './styles/common.css';
    @import './styles/biz.scss';

	/*每个页面公共css */
	page {
		background: #F8F8F8;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.imgReset {
		width: 100%;
		height: 100%;
	}

	uni-tabbar .uni-tabbar__icon.uni-tabbar__icon__diff {
		width: 42px;
		height: 42px;
	}
</style>
