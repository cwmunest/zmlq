//const PROXY_SYSTEM = 'http://localhost:8081';
const PROXY_SYSTEM = 'http://www.zuimeilangqi.com';
const API_PRE = ''
const configApixs = ({ PROXY_SYSTEM, API_PRE }) => {
	const CMS_SERVICE = `${API_PRE}/cms`;
	return {
		queryAppArticleList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/article/list`, method: 'POST' }, // 获取文章列表
		queryAppArticleDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/article/detail`, method: 'GET' }, // 获取文章详情
		queryAppHotelsList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/hotels/list`, method: 'POST' }, // 获取酒店列表
		queryAppHotelsDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/hotels/detail`, method: 'GET' }, // 获取酒店详情
		queryAppCouponList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/coupon/list`, method: 'POST' }, // 优惠券列表
		queryAppCouponDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/coupon/detail`, method: 'GET' }, // 优惠券详情
		queryAppSpecialtyReservationList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/specialty/reservation/list`, method: 'POST' }, // 特产预定列表
		queryAppArticleTop: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/article/top`, method: 'POST' }, //置顶文章
		queryAppHotelsRoomTypeList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/hotelsRoomType/list`, method: 'POST' }, //酒店房型
		queryAppHotelsRoomTypeDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/hotelsRoomType/detail`, method: 'GET' }, //酒店房型详情
		queryAppAdList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/ad/list`, method: 'POST' }, //广告列表
		queryAppPathList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/path/list`, method: 'POST' }, //路线列表
		queryAppPathDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/path/detail`, method: 'GET' }, //路线景点列表
		queryAppAroundList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/around/list`, method: 'POST' }, //周边推荐
		queryAppAroundDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/around/detail`, method: 'GET' }, //周边推荐详情
		queryAppAdviseAdd: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/advise/add`, method: 'POST' }, //问题反馈
		queryAppProblemList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/problem/list`, method: 'POST' }, //常见问题列表
		queryAppProblemDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/problem/detail`, method: 'GET' }, //常见问题详情
		queryAppMessageList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/message/list`, method: 'POST' }, //消息列表
		queryAppMessageDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/message/detail`, method: 'GET' }, //消息详情
		queryAppUserCouponList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/userCoupon/list`, method: 'POST' }, //“我的”优惠券列表
		queryAppUserCouponAdd: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/userCoupon/add`, method: 'GET' }, //领取“我的”优惠券
		queryAppUserCouponGetUserInfo: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/user/getUserInfo`, method: 'GET' }, //微信授权登录
		queryAppUserGetUserLogin: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/user/getUserLogin`, method: 'GET' }, //判断用户是否已登录
		queryAppUserDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/user/detail`, method: 'GET' }, //查询用户信息
		queryAppUserEdit: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/user/edit`, method: 'POST' }, //更新用户信息
		queryAppActivityNoticeList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/activityNotice/list`, method: 'POST' }, //活动预告列表
		queryAppActivityNoticeDetail: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/activityNotice/detail`, method: 'GET' }, //活动预告详情
		queryAppSuggestAdd: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/suggest/add`, method: 'POST' }, //提交 投诉建议
		queryAppSuggestList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/suggest/list`, method: 'GET' }, //投诉建议 列表
		queryAppSuggestDelete: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/suggest/delete`, method: 'GET' }, //删除 投诉建议
		queryAppSuggestGoEdit: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/suggest/goEdit`, method: 'GET' }, //投诉建议 详情
		queryAppSuggestEdit: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/suggest/edit`, method: 'POST' }, //修改 投诉建议
		
		queryAppUserVideo: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/userVedio/list`, method: 'POST' }, //获取我的视频
		querySystemRecord: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/paymentRecord/listAll`, method: 'POST' }, //获取系统滚动条消息
		queryAppUserResourcesVideo: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/videoResources/list`, method: 'POST' }, //获取资源视频
		queryAppUserUploadVideo: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/userVedio/save`, method: 'POST' }, //上传视频
		queryAppUserBuy: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/paymentRecord/save`, method: 'POST' }, //购买食品
		queryAppUserRecordsList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/app/paymentRecord/list`, method: 'POST' }, //获取购买视频列表
		
		queryAppTakePhotoAtWillAdd: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/saveSnap`, method: 'POST' }, //提交随手拍
		queryAppTakePhotoAtWillList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/selectSnap`, method: 'POST' }, //我的随手拍
		queryAppPublicEvluationAdd: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/saveEvaluate`, method: 'POST' }, //提交公众评价
		queryAppPublicEvluationList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/selectEvaluate`, method: 'POST' }, //我的公众评价
		
		queryAppAddressList: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/address`, method: 'POST' }, //我的收货地址
		queryAppAddressAdd: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/addaddress`, method: 'POST' }, //我的收货地址-新增
		queryAppAddressEdit: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/updateaddress`, method: 'POST' }, //我的收货地址-编辑
		queryAppAddressDel: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/deleteaddress`, method: 'GET'}, //我的收货地址-删除
		queryAppAddressSetDefault: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/advice`, method: 'POST' }, //我的收货地址-设置默认		
		
		queryAppMyExpenseOrder: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/order`, method: 'POST' }, //我的消费订单
		queryAppMyExpenseRecord: { url: `${PROXY_SYSTEM}${CMS_SERVICE}/service/building/expense`, method: 'POST' }, //我的消费记录
	}
};

export default configApixs({ PROXY_SYSTEM, API_PRE })