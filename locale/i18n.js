import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./index";
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: uni.getStorageSync('lang') || "zh-Hans", // 默认语言
	fallbackLocale: "zh-Hans", // 后备语言
	messages,
});
export default i18n;