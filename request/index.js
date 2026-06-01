import {
	post,
	get,
	put
} from "../config/request.js";
import qs from 'qs';
export default {
	BannersList() {
		return get('settings/banners')
	},
	HomeCategories() {
		return get("categories")
	},
	CasinosGames(params) {
		return get("casinos/games", params)
	},
	// 活动列表 
	ActivityList(params) {
		return post("activity/list", params)
	},
	// 活动弹窗
	PopupActivityList(params) {
		return post("popup/activity", params)
	},
	//国家语言
	CountriesList(params) {
		return get("settings/countries", params)
	},
	// 登录
	Login(params) {
		return post("auth/login", params)
	},
	// 注册
	Register(params) {
		return post("auth/register", params)
	},
	// 消息列表
	MsgList(params) {
		return post("msg/list", params)
	},
	// 首页滚动通知
	popupPaomadeng(params) {
		return post("popup/paomadeng", params);
	},
	// 游戏详情
	gamesSingle(params) {
		return get("games/single/" + params.id);
	},
	//游戏列表
	gameList(params) {
		// numPerPage=20&page=1&searchTerm=&category=Slots&provider=all 
		return get('casinos/games', params);

	},
	// 配置 
	settings() {
		return get("settings/data");
	},
	// 厂商
	GamesAll() {
		return get("games/all");
	},
	// 钱包
	wall(params) {
		return get("profile/wallet", params);
	},
	// 获取活动详情
	activity(params) {
		return post("activity/get/" + params.id);
	},
	// 银行卡编码
	bankCodeList() {
		return post("inpays/banklist");
	},
	// 储蓄账号确认充值
	inpaysWithdrawal(params) {
		return post("inpays/withdrawal", params);
	},
	// 现金账户提现
	inpayslotterywithdrawal(params) {
		return post("inpays/lotterywithdrawal", params);
	},
	// 充值
	inpaysQrcode(params) {
		return post("inpays/qrcode", params)
	},
	// 更新语言
	updateLanguage(params) {
		return put("profile/updateLanguage", params)
	},




}