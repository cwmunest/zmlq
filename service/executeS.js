import apix from './apixConfig.js';
import {getStorage} from '../utils/utils.js';

const executeS = (params) => {
	const { apixkey, payload, requestOptions = {},param } = params;
	const reqconfig = apix[apixkey];
	if (reqconfig) {
		const paramsPayload = payload || {};
		const resoponse = new Promise((resove,reject)=>{
			return uni.request({
				url:reqconfig.url+(param?"?"+param:""),
				method:reqconfig.method,
				responseType:'Object',
				header: {
					'content-Type': 'application/json',
					'token':getStorage('userInfo')?getStorage('userInfo').token:'8_TOKEN@@@6os1a0LQF38CgDMDLHrse5hk6IjCm6i5CM6dcvhKEg5ALNfr13'
				},
				data:paramsPayload,
				...requestOptions,
				success:(res) => { 
					if(res.statusCode===200){
					 resove(res.data)
					}
				 },
				 fail:res=>{
					 uni.showToast({
						title: res.errMsg,
						mask:true,
						duration:1500,
					 })
					 reject(res)
					// return res.data
				 },
			})
		}).catch(error=>error);
		return resoponse
		
	}
	  const error = new Error(`没有找到[${params.apixkey}]下的对应请求配置`);
	  console.error(error);
	  return error
}
export default executeS;