import config from "../config/config"; 
/**
 * 拼接完整图片地址
 * @param {string} path - 图片路径（可能是相对路径、绝对路径、完整URL）
 * @returns {string} 完整的图片URL
 */
export function getFullImageUrl(path) {  
	if (!path) return ''; // 或者返回默认占位图 
	if (/^https?:\/\//i.test(path)) {
		return path;
	}
	// 以 // 开头（协议相对URL）
	if (path.startsWith('//')) {
		return `https:${path}`;
	}
	// 相对路径：拼接基础地址
	// 处理路径开头的斜杠，避免重复
	const normalizedPath = path.startsWith('/') ? path : `/${path}`; 
	return `${config.ImageBaseURL}${normalizedPath}`;
} 