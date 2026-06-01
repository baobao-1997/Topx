import App from './App'
import store from './store'
import Vue from 'vue'
import i18n from "./locale/i18n.js";
Vue.config.productionTip = false
App.mpType = 'app'
// 常用函数封装

import {
	getFullImageUrl
} from '@/libs/utils.js';
Vue.prototype.$imgUrl = getFullImageUrl;


import http_list from '@/request/index.js';
Vue.prototype.$http = http_list;

import config_info from '@/config/config.js';
Vue.prototype.$config = config_info;
// 常用函数封装END


// 引入全局TuniaoUI
import TuniaoUI from 'tuniao-ui'
Vue.use(TuniaoUI)
// 引入TuniaoUI提供的vuex简写方法
let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)

// 引入TuniaoUI对小程序分享的mixin封装
let mpShare = require('tuniao-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// 引入常用mixin
let CommomMixin = require('libs/mixin/commom.js');
Vue.mixin(CommomMixin)
const app = new Vue({
	store,
	i18n,
	...App
})


app.$mount()