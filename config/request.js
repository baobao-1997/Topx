import BaseConfig from "./config";
import qs from 'qs';
// 全局配置
const config = {
	baseURL: BaseConfig.RequestBaseURL, // 替换为实际接口前缀
	timeout: 30000, // 超时时间（毫秒）
	header: {
		// 'Content-Type': 'application/json',
	},
};

// 存储当前活跃的请求，用于取消重复请求
const pendingRequests = new Map();

/**
 * 生成请求唯一标识
 * @param {Object} options 请求参数
 * @returns {string} 唯一key
 */
function getRequestKey(options) {
	const {
		url,
		method,
		data,
		params
	} = options;
	// 注意：params 会被 uni.request 自动拼接到 url，这里仅作为标识的一部分
	let key = `${method}&${url}`;
	if (data) key += `&${JSON.stringify(data)}`;
	if (params) key += `&${JSON.stringify(params)}`;
	return key;
}

/**
 * 添加请求记录
 * @param {string} key 请求标识
 * @param {AbortController} controller 取消控制器
 */
function addPendingRequest(key, controller) {
	if (pendingRequests.has(key)) {
		// 如果已有相同请求，可决定是否取消旧请求（此处选择取消旧请求）
		const prevController = pendingRequests.get(key);
		prevController.abort();
		pendingRequests.delete(key);
	}
	pendingRequests.set(key, controller);
}

/**
 * 移除请求记录
 * @param {string} key 请求标识
 */
function removePendingRequest(key) {
	pendingRequests.delete(key);
}

/**
 * 取消所有请求（如页面卸载时调用）
 */
export function cancelAllRequests() {
	for (const controller of pendingRequests.values()) {
		controller.abort();
	}
	pendingRequests.clear();
}

/**
 * 核心请求函数
 * @param {Object} options uni.request 参数
 * @param {boolean} showLoading 是否显示加载提示（默认 false）
 * @param {string} loadingText 加载提示文字（默认 "加载中..."）
 * @returns {Promise}
 */
export function request(options, {
	showLoading = false,
	loadingText = '加载中...'
} = {}) {
	// 合并请求配置
	const requestOptions = {
		url: config.baseURL + options.url,
		method: options.method || 'GET',
		header: {
			...config.header,
			...options.header,
		},
		data: options.data,
		params: options.params, // uni.request 支持 params 自动序列化，但为了取消标识我们保留
		timeout: options.timeout || config.timeout,
		dataType: options.dataType || 'json',
		responseType: options.responseType || 'text',
	};
	if (options.method == "GET") {
		let params = qs.stringify(options.params)
		if (params) {
			requestOptions.url += "?" + params;
		}
	}

	// 请求前拦截：添加 token
	const token = uni.getStorageSync('token'); // 根据实际存储方式获取
	if (token) {
		requestOptions.header['Authorization'] = `Bearer ${token}`;
	}

	// 生成请求唯一标识（用于取消重复请求）
	const requestKey = getRequestKey(requestOptions);
	const controller = new AbortController(); // uni-app 从 3.7.0+ 开始支持 AbortController
	requestOptions.signal = controller.signal;

	// 取消之前的相同请求
	addPendingRequest(requestKey, controller);

	let loadingTimeout = null;
	if (showLoading) {
		loadingTimeout = setTimeout(() => {
			uni.showLoading({
				title: loadingText,
				mask: true
			});
		}, 200); // 延迟显示，避免短时间请求闪烁
	}

	// 返回 Promise
	return new Promise((resolve, reject) => {
		uni.request({
			...requestOptions,
			success: (res) => {
				// 请求成功，但需要根据业务状态码判断
				if (res.statusCode >= 200 && res.statusCode < 300) {
					if ("error" in res.data) {
						uni.showToast({
							title: res.data.error,
							icon: "none"
						})
						reject(error);
					} else {
						resolve(res.data); // 直接返回业务数据
					}
				} else {
					// HTTP 错误
					const error = {
						statusCode: res.statusCode,
						message: res.errMsg || '服务器错误'
					};
					if (res.statusCode == 401) {
						uni.showToast({
							title: error.message,
							success() {
								uni.navigateTo({
									url: "/pages/login/login?type=1"
								})
							}
						})
					}
					if (res.statusCode == 400) {
						for (let i in res.data) {
							uni.showToast({
								title: res.data[i][0],
								icon: "none"
							})
						}
					} else {
						console.log('非200请求：：：', res);
						uni.showToast({
							title: res.data.error || error.message,
							icon: 'none'
						});
					}
					reject(error);
				}
			},
			fail: (err) => {
				// 网络错误或请求被取消
				if (err.errMsg && err.errMsg.includes('abort')) {
					// 主动取消，不处理错误提示
					reject({
						...err,
						isCancel: true
					});
					return;
				}
				uni.showToast({
					title: err.errMsg || '网络异常',
					icon: 'none'
				});
				reject(err);
			},
			complete: () => {
				// 清理
				removePendingRequest(requestKey);
				if (loadingTimeout) clearTimeout(loadingTimeout);
				if (showLoading) {
					uni.hideLoading();
				}
			},
		});
	});
}

/**
 * 封装常用方法
 */
export const get = (url, params, options = {}) => {
	return request({
		url,
		method: 'GET',
		params
	}, options);
};

export const post = (url, data, options = {}) => {
	return request({
		url,
		method: 'POST',
		data
	}, options);
};

export const put = (url, data, options = {}) => {
	return request({
		url,
		method: 'PUT',
		data
	}, options);
};

export const del = (url, data, options = {}) => {
	return request({
		url,
		method: 'DELETE',
		data
	}, options);
};