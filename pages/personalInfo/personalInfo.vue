<template>
	<!-- 个人信息编辑 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="个人中心" @clickLeft="goBack"></uni-nav-bar>
		<view class="formBox">
			<cell title="头像">
				<view class="headerBox" slot="value" @click="getImg">
					<image :src="userInfo.images"></image>
				</view>
			</cell>
			<cell title="姓名">
				<view class="headerBox" slot="value">
					<input type="text" placeholder="请输入姓名" v-model="userInfo.name" />
				</view>
			</cell>
			<cell title="性别">
				<view class="headerBox" slot="value">
					<picker mode="selector" :range="sexArr" @change="getSex">
						<view>{{sexArr[sexIndex]}}</view>
					</picker>
				</view>
			</cell>
			<cell title="出生日期">
				<view class="headerBox" slot="value">
					<picker mode="date" @change="bindDateChange">
						<view>{{dete}}</view>
					</picker>
				</view>
			</cell>
			<cell title="居住地址">
				<view class="headerBox" slot="value">
					<input type="text" placeholder="请输入居住地址" v-model="userInfo.city" />
				</view>
			</cell>
			<cell title="联系电话">
				<view class="headerBox" slot="value">
					<input type="number" placeholder="请输入联系电话" v-model="userInfo.mobile" />
				</view>
			</cell>
		</view>
		<view class="btnFixed" @click="onReserve">保存</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import cell from '@/components/cell.vue';
	import executeS from '@/service/executeS.js';
	import {
		linkTo,
		backTo,
		upLoad,
		showMsg
	} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			cell
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				goBack: backTo,
				sexArr: ['男', '女'],
				sexIndex: 0,
				dete:currentDate,
				userInfo:{},
				images:'',
			};
		},
		onLoad() {
			let _this = this
			this.queryAppUserDetail(_this)
		},
		methods: {
			onReserve() {
				let userInfo = this.userInfo,
					_this = this,
					sexIndex = this.sexIndex;
				userInfo.sex = sexIndex == 0?'男':'女'
				userInfo.brithday = this.dete
				this.queryAppUserEdit(_this,userInfo)
			},
			getImg() {
				let userInfo = this.userInfo;
				uni.chooseImage({
					count:1,
					success: (res) => {
						if(res.errMsg == 'chooseImage:ok') {
							userInfo.images = res.tempFilePaths[0]
						}
					}
				})
			},
			queryAppUserDetail(_this) {
				const paramsPayload = {
					apixkey: "queryAppUserDetail",
					payload: {}
				}
				executeS(paramsPayload).then(response=>{
					if(response.success) {
						let userInfo = response.data
						_this.sexIndex = userInfo.sex == '男'?0:1
						_this.dete = userInfo.brithday?userInfo.brithday:userInfo.currentDate
						_this.userInfo =  userInfo
					}
				})
			},
			async upLoadImg(img) {
				if(img && img.indexOf('blob:') != -1) {
					await upLoad(img).then(rs=>{
						this.userInfo.images = rs.url
					})
				}
			},
			async queryAppUserEdit(_this,userInfo) {
				await _this.upLoadImg(userInfo.images)
				const paramsPayload = {
					apixkey: "queryAppUserEdit",
					payload: userInfo
				}
				executeS(paramsPayload).then(response=>{
					if(response.success) {
						showMsg('保存成功','success')
						_this.queryAppUserDetail(_this)
					}
				})
			},
			getSex(e) {
				this.sexIndex = e.detail.value
			},
			bindDateChange(e) {
				this.dete = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	.formBox {
		background-color: $uni-bg-color;
		padding: 0 28rpx;
	}

	.headerBox {
		font-size: 28rpx;

		image {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}

		input {
			text-align: right;
		}
	}
	.btnFixed {
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
