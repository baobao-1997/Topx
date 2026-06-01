import qs from 'qs';
module.exports = {
	data(){
		return { 
		}
	},
	onLoad(){
		// this.setting=uni.getStorageSync("setting")||null;
	},
	methods: {
		// 返回上一级
		goBack() {
			uni.navigateBack();
		},
		// 前往游戏详情
		goToGame(id) { 
			uni.navigateTo({
				url: "/pages/game/default/default?gameId=" + id
			})
		},
		// 前往充值
		goToRecharge() {
			uni.navigateTo({
				url: "/pages/wallet/recharge/recharge",
			})
		},
		// 前往提现
		goToWithdrawal() {
			uni.navigateTo({
				url: "/pages/wallet/withdrawal/withdrawal",
			})
		},
		toPages(url, params) {
			if (params) {
				url += `?${qs.stringify(params)}`;
			}
			uni.navigateTo({
				url: url,
			})
		}
	}
}