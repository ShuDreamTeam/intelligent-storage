/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import QS from 'qs';
import qs from 'qs';
import {Message} from 'element-ui';
import store from '../store/store.js'

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		const token = store.state.token;
		token && (config.headers.Authorization = token);
		return config;
	},
	error => {
		return Promise.error(error);
	})

// 响应拦截器
axios.interceptors.response.use(
	response => {
		if (response.data.code === 200) {
			// Message({
			// 	message: response.data.msg,
			// 	duration: 1000,
			// 	type: 'success'
			// });
			return Promise.resolve(response);
		} else {
			Message({
				message: response.data.msg,
				duration: 1000,
				type: 'warning'
			});
			return Promise.resolve(response);
		}
	},
	// 服务器状态码不是200的情况
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 401:
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					});
					break;
					// 403 token过期
					// 登录过期对用户进行提示
					// 清除本地token和清空vuex中token对象
					// 跳转登录页面
				case 403:
					Message({
						message: '登录过期，请重新登录',
						duration: 1000,
						forbidClick: true,
					});
					// 清除token
					sessionStorage.removeItem('state')
					store.state.token = '';
					// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
					setTimeout(() => {
						router.replace({
							path: '/home/login',
							query: {
								redirect: router.currentRoute.fullPath
							}
						});
					}, 1000);
					break;
					// 404请求不存在
				case 404:
					Message({
						message: '网络请求不存在',
						duration: 1500,
						forbidClick: true
					});
					break;
					// 其他错误，直接抛出错误提示
				default:
					Message({
						message: error.response.data.message,
						duration: 1500,
						forbidClick: true
					});
			}
			return Promise.reject(error.response);
		}
	}
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function postFile(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function putFile(url, params) {
	return new Promise((resolve, reject) => {
		axios.put(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function put(url, params) {
	return new Promise((resolve, reject) => {
		axios.put(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function delet(url, params) {
	return new Promise((resolve, reject) => {
		console.log('params_1 =', params)
		axios.delete(url, {data: qs.stringify(params)})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
