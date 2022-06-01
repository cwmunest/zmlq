/**
 * 链接跳转
 * */
export const linkTo = (url) => {
	console.log(url, 'url')
	uni.navigateTo({
		url
	})
}
// 返回
export const backTo = (delta = 1) => {
	uni.navigateBack({
		delta: delta
	})
}
// 返回刷新
export const refreshPrevPage = (cb) => {	
	let pages = getCurrentPages(); //获取页面栈
	//var currPage = pages[pages.length - 1]; //当前页面
	var prevPage = pages[pages.length - 2]; //上一个页面   
	prevPage[cb||"refreshData"]();//调用列表页面方法
}
// 时间格式转换
export const formatTime = (time, format) => {
	format = format ? format : "yyyy-MM-dd hh:mm:ss";
	let date = new Date(time);
	const yyyy = date.getFullYear();
	const MM = addZero(date.getMonth() + 1);
	const dd = addZero(date.getDate());
	const hh = addZero(date.getHours());
	const mm = addZero(date.getMinutes());
	const ss = addZero(date.getSeconds());

	return format.replace("yyyy", yyyy)
		.replace("MM", MM)
		.replace("dd", dd)
		.replace("hh", hh)
		.replace("mm", mm)
		.replace("ss", ss)
}
const addZero = function(num) {
	num = num + '';
	if (num.length < 2) {
		return '0' + num;
	}
	return num;
}
export const setDateType = (list, key = 'createTime', format = 'yyyy-MM-dd') => {
	list.forEach(val => {
		let regTime = val[key].replace(/\-/g, "/");
		val[key] = formatTime(regTime, format)
	})
	return list
}
export const showMsg = (title, icon = 'none') => {
	//icon值只有success，loading，none三种显示，失败没有图标。如果失败时需要显示图标，就要用到自定义图标 image 了	
	/* uni.showToast({
		title: '扫码失败',
		image:'/static/lost.png',   //要写根路径，不要写相对路径
		duration: 3000,
	}) */
	uni.showToast({
		title: title,
		icon: icon,
		duration: 1500,
		mask: true
	})
};

//设置缓存
export const setStorage = (key, data) => uni.setStorage({
	key: key,
	data: data
})

//读取缓存
export const getStorage = key => {
	try {
		//if(Shell.IsTest) if(key=="userInfo") return {user:{"id":8,"createTime":null,"updateTime":"2020-08-10 14:58:06","images":"http://conv.zuimeilangqi.com/cms//ueditor/fget?fileId=5f30efd03c061b71cc2b1b97","name":"miao.","mobile":"10086","identitycard":null,"pass":null,"password":null,"sex":"男","brithday":"2020-08-07","city":"福州","education":null,"work":null,"openId":"oJY2F0vqx7rzkXODSgd9NcFanUWk"}}
		var value = uni.getStorageSync(key)
		if (value) {
			return value
		}
	} catch (e) {
		console.log(e)
	}
}

//上传文件
export const upLoad = async url => {
	return await new Promise((resove, reject) => {
		uni.uploadFile({
			url: 'http://139.9.55.128:8081/cms/upload/upload',
			filePath: url,
			name: 'file',
			success: res => {
				if (res.statusCode === 200) {
					resove(JSON.parse(res.data))
				}
			},
			fail: res => {
				uni.showToast({
					title: res.msg,
					mask: true,
					duration: 1500,
				})
				reject(res)
			},
		})
	})

}

Array.prototype.removeAt = function (i) {
    this.splice(i, 1);
};
Array.prototype.remove = function (o) {
    var i = this.indexOf(o);
    if (i != -1) this.splice(i, 1);
    return this;
};
Array.prototype.find = function (f, obj) {
    var l = this.length;
    for (var i = 0; i < l; i++) if (f.call(obj, this[i], i, this)) {
        return this[i];
    }
    return null;
};
