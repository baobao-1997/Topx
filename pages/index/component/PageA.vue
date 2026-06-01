<template>
	<view class="pagesA tn-safe-area-inset-bottom">

		<!-- 父级透视 -->
		<view class="dd-transform">
			<!-- 动画 -->
			<view class="time" :class="showUserModal==true?'tn-height-cur':'tn-height'">

				<!-- 顶部自定义导航 -->
				<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#16181D">
					<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left" @tap.stop="openUserModal">
						<view class="custom-nav__logo" @click="tn('')">
							<view class="game-pic" style="background-image:url('/static/LOGO.png')">
								<view class="game-image ">
								</view>
							</view>
						</view>
						<view class="">
							<text class="tn-icon-down-triangle tn-color-gray--dark"></text>
						</view>
						<view class="tn-flex tn-flex-1 tn-flex-row-right tn-padding-right-lg ">
							<view v-if="user">
								<view class="tn-flex tn-flex-col-center">
									<view class="tn-color-white tn-margin-sm">
										<view @click="toPages('/pages/language/language')"
											style="border-radius: 50%;width: 50rpx;height: 50rpx;line-height: 50rpx;background-color: #343842FF;">
											<text class="tn-icon-font"></text>
										</view>
									</view>
									<tn-avatar src="/static/undraw_young-man-avatar_wgbd.png" size="sm"></tn-avatar> 
								</view>
							</view>
							<view class="tn-bg-bluepurple tn-color-white " v-else
								style="height: 60rpx; text-align: center; line-height:60rpx ; font-size: 28rpx; border-radius: 99999rpx;overflow: hidden;padding: 0 24rpx;">
								<text>{{$t('Login/Register')}}</text>
								<text class=" tn-margin-left-xs tn-icon-login"></text>
							</view>
						</view>
					</view>
				</tn-nav-bar>

				<view class="" :style="{paddingTop: vuex_custom_bar_height + 10 + 'px'}">
					<view class="tn-search-fixed">
						<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-left tn-margin-right">
							<view class="justify-content-item align-content-item "
								style="color: #838383;border-radius: 20rpx;padding: 8rpx;width: 100%;background-color: #9999991a;"
								@click="toPages('/pages/game/search/search')">
								<tn-notice-bar :list="searlist" mode="vertical" leftIconName="search"
									:duration="6000"></tn-notice-bar>
							</view>
							<!-- <view class="align-content-item">
								<view class="justify-content-item tn-text-center"
									style="border-radius: 20rpx;overflow: hidden;">
									<tn-button backgroundColor="#9C75EB" padding="42rpx 20rpx" width="90rpx"
										@tap.stop="openUserModal">
										<text class="tn-color-white tn-icon-menu-set-fill tn-text-xl"></text>
									</tn-button>
								</view>
							</view> -->
						</view>
					</view>

					<swiper class="card-swiper tn-margin-top-lg" :circular="true" :autoplay="true" duration="500"
						interval="12000" @change="cardSwiper">
						<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
							<view class="swiper-item image-banner">
								<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							</view>
							<view class="swiper-item-text">
								<view class="tn-color-white tn-padding-top-xs" style="font-size: 60rpx;">{{item.name}}
								</view>
								<view
									class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">
									{{item.text}}
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="indication">
						<block v-for="(item,index) in swiperList" :key="index">
							<view class="spot" :class="cardCur==index?'active':''"></view>
						</block>
					</view>
					<view class="    ">
						<tn-notice-bar :list="msgList" fontColor="#FFF" mode="horizontal"
							:circular="false"></tn-notice-bar>
					</view>
					<view class=" tn-padding-sm  ">
						<tn-scroll-list indicatorActiveColor="rgb(156, 117, 235)">
							<view class="tn-flex tn-margin-sm">
								<block v-for="(item, index) in categories" :key="index">
									<view class="tn-flex-1 tn-margin-right-xs tn-margin-left-xs  tn-radius"
										@click="toPages('/pages/game/list/list',item)">
										<view
											class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
											<view class="c-icon-tab">
												<image style="width: 120rpx;" :src="$imgUrl(item.image)"
													mode="widthFix">
												</image>
											</view>
											<view class="tn-color-black tn-text-lg tn-text-center">
												<text class="tn-text-ellipsis"
													style="color: #F8f8f8;">{{item.name}}</text>
											</view>
										</view>
									</view>
								</block>
							</view>
						</tn-scroll-list>
					</view>

					<!-- 热门推荐 -->
					<view class="" v-if="false"
						style="padding: 15rpx;margin: 0 30rpx 30rpx 30rpx;border-radius: 20rpx; background-color: #1F2228FF;box-shadow: 0px 2px 4px #17191C12, 0px 0px 0px #171a1f00; border-style: solid;border-color: #343842FF;border-width: 1px;">
						<view class="tn-flex tn-flex-row-between tn-flex-col-center" style="padding: 15rpx;">
							<view class="tn-text-lg tn-text-bold" style="color: #f1f1f1;">
								热门推荐
							</view>
							<view class="tn-color-gray tn-text-sm" style="color:#914F2C">
								每日精选 · 精彩纷呈
								<text class="tn-icon-starry tn-padding-left-sm"></text>
							</view>
						</view>
						<view class="tn-flex tn-flex-wrap">
							<block v-for="(item,index) in content" :key="index">
								<view class="" style="width: 25%" @click="tn('/homePages/xxx')">
									<view class="" style="padding: 15rpx;">
										<view class="coll-pic" :style="'background-image:url(' + item.mainImage + ')'">
											<view class="coll-image">
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<!-- 按钮-->
						<view class="tn-flex" style="padding: 15rpx;">
							<view class="tn-flex-1 justify-content-item tn-text-center">
								<tn-button backgroundColor="#9999991a" padding="40rpx 0" width="100%" :fontSize="28"
									fontColor="#FFF" @click="tn('')">
									<text class="">查看合集</text>
									<text class="tn-icon-right-fill tn-padding-left-xs"></text>
								</tn-button>
							</view>
						</view>
					</view>




				</view>

				<!-- 广告位置 -->
				<view v-if="false">
					<swiper class=" card-swiper  " :circular="true" :autoplay="true" duration="500"
						style=" height:90rpx; " interval="12000">
						<swiper-item>
							<view class="swiper-item" style="border-radius: 10rpx;">
								<image src="@/static/Gemini_Generated_Image_sqnpxmsqnpxmsqnp_06.png" mode="widthFix"
									style="width: 100%;">
								</image>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<!-- 类目 -->
				<block v-for="item in categories">
					<view style=" margin: 40rpx 30rpx 30rpx 30rpx;border-radius: 20rpx;  "
						v-if="item.rows!=null&&item.rows.length>0">
						<view class="tn-flex tn-flex-row-between tn-flex-col-center" style="padding: 15rpx;">
							<view class="tn-text-lg tn-text-bold " style="color: #FFF;position: relative;">
								<view style="z-index: 99;position: relative;"><text class="tn-icon-hotspot"></text>
									{{item.name}}
								</view>
								<view class="title-solid"></view>
							</view>
							<view class="tn-color-gray tn-text-sm" style="color:#914F2C"
								@click="toPages('/pages/game/list/list',item)">
								{{$t('More')}}
								<text class="tn-icon-right tn-padding-left-sm"></text>
							</view>
						</view>
						<view class="tn-flex tn-flex-wrap">
							<block v-if="item.rows!=null">
								<swiperSlideVue :DataList="item.rows"></swiperSlideVue>
							</block>
						</view>
					</view>
				</block>

				<view>
					<text
						style="width: 100%;text-align: center;padding: 24rpx 0;color: #888;display: block;">{{$t('Partner')}}</text>
					<image src="@/static/partners.png" mode="widthFix" style="width: 100%;"></image>
				</view>
				<view class="tn-tabbar-height"></view>
				<!-- <text style="width: 100%;text-align: center;padding: 24rpx 0;color: #888;display: block;">暂无更多</text> -->
			</view>
		</view>

		<!-- popup会有延迟，采用这种方式来优化弹窗的优化体验-->
		<user-modal v-model="showUserModal"></user-modal>

		<view class="tn-tabbar-height"></view>
	</view>
</template>

<script>
	import UserModal from '@/components/user/user.vue'
	import swiperSlideVue from '../../../components/swiper-slide/swiper-slide.vue';
	export default {
		components: {
			UserModal,
			swiperSlideVue
		},
		name: 'PageA',
		data() {
			return {
				user: null,
				msgList: [],
				categories: [],
				/* 选择弹窗*/
				showUserModal: false,
				content: [{
						mainImage: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png',
					},
					{
						mainImage: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png',
					},
					{
						mainImage: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png',
					},
					{
						mainImage: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png',
					}
				],

				/* 搜索*/
				searlist: [
					'搜索 关键词',
				],
				barStyle: {
					color: '#AFE558'
				},
				current: 0,
				fixedList: [{
						name: '推荐'
					},
					{
						name: '热门'
					},
					{
						name: '独家'
					},
					{
						name: '热卖'
					}
				],

				cardCur: 0,
				swiperList: [],

				groupList: [{
						src: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png'
					},
					{
						src: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png'
					},
					{
						src: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png'
					},
					{
						src: 'https://pc.topx666888.com/livewire-tmp/01K9MAT4K9EVSRMCSFGWH7M7KD.png'
					},
				],

				/* 瀑布流*/
				loadStatus: 'loadmore',
				list: [],
				data: [{
						title: '纪念碑谷打卡',
						userName: '试试就逝世',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716014593433-assets/web-upload/6e1ba4f3-4757-4693-b827-b8803072c5c9.jpeg',
						userImage: 'https://cdn.nlark.com/yuque/0/2022/jpeg/280373/1664005699098-assets/web-upload/e8b29292-72fc-4c1e-9d7c-fd9dba31cb62.jpeg',
						tags: ['解谜', '简约'],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 338
						},
					},
					{
						title: '王国保卫战-塔防启动',
						userName: '你的名字',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716025891640-assets/web-upload/8b4440ce-710b-4d3c-afff-5d49e6c7a16a.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 289
						},
					},
					{
						title: '',
						userName: '青梅煮马',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/png/280373/1715960090731-assets/web-upload/156084cd-aa5a-41dc-98ca-eb681d4afcc5.png',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
						tags: ['钓鱼', '萝卜'],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 381
						},
					},
					{
						title: '钓鱼模式，启动',
						userName: '你的名字',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1715959853964-assets/web-upload/2c4f9b49-0014-4714-a9c6-60b2e5c06d94.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 526
						},
					},
					{
						title: '',
						userName: '凶一下试试',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716025506668-assets/web-upload/b6d123a2-4f1d-46c9-9474-f62a87d05a74.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 526
						},
					},
					{
						title: '春暖花开',
						userName: '凶一下试试',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716039015216-assets/web-upload/ff424f75-5d37-4b80-8242-bb21e415875e.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 526
						},
					},
					{
						title: '',
						userName: '坟头草三米高',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716039015239-assets/web-upload/3f22e659-42d3-4106-be67-46521c22eb99.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 372
						},
					},
					{
						title: '来一局蛋仔派对',
						userName: '你的猪猪',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716039722992-assets/web-upload/ae74a7d3-dc20-4cb5-9178-c77f9aa10462.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg',
						tags: ['蛋仔', '活动'],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 694
						},
					},
					{
						title: '',
						userName: '试试就逝世',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716040399113-assets/web-upload/6ebf5f25-4c3a-488a-b221-0497f2945549.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 508
						},
					},
					{
						title: '',
						userName: '你的名字',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716047166485-assets/web-upload/ee3aa0c0-8589-41d6-b920-fae1a90a67d8.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 923
						},
					},
					{
						title: '',
						userName: '图鸟东东',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716039015493-assets/web-upload/d949d756-59ea-4047-8edb-afa72d2ff8af.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 989
						},
					},
					{
						title: '',
						userName: '抓住那只猪吖',
						mainImage: 'https://cdn.nlark.com/yuque/0/2024/jpeg/280373/1716040399125-assets/web-upload/f75e889a-57a6-418a-9315-2814e3441ec1.jpeg',
						userImage: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg',
						tags: [],
						viewUser: {
							latestUserAvatar: [{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
								},
								{
									src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
								},
							],
							viewUserCount: 129
						},
					}
				],
			}
		},
		created() {
			this.getBanner();
			this.HomeCategories();
			this.popupPaomadeng();
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				console.log("获取用户信息");
				this.user = uni.getStorageSync("user");
			},
			popupPaomadeng() {
				this.msgList = [];
				this.$http.popupPaomadeng().then((res) => {
					if (res.msgShow) {
						res.msgShow.forEach((item) => {
							this.msgList.push(item.msg_description);
						})
					}
				})
			},
			// 请求游戏列表
			gameList(type, index) {
				console.log(type, index);
				let res = this.$http.CasinosGames({
					page: 1,
					searchTerm: "",
					category: type,
					provider: "all",
					numPerPage: 18
				}).then((res) => {
					if (res.games) {
						this.categories[index].rows = res.games.data;
						this.$forceUpdate();
					}
				})

			},
			// 首页分类请求
			HomeCategories() {
				var that = this;
				this.$http.HomeCategories().then(res => {
					if (res.categories) {
						uni.setStorageSync("categories", res.categories);
					}
					this.categories = res.categories.map((item, index) => {
						item.rows = null;
						// 请求对应类目数据；
						that.gameList(item.name, index);
						return item;
					});
				})
			},
			// banner请求
			getBanner() {
				this.swiperList = [];
				this.$http.BannersList().then(res => {
					res.banners.forEach(item => {
						this.swiperList.push({
							id: item.id,
							type: 'image',
							name: "",
							text: '',
							url: this.$imgUrl(item.image),
						})
					})

				})
			},
			// 打开选择弹框
			openUserModal() {
				// wx.vibrateShort();
				// this.showUserModal = true
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// tab选项卡切换
			tabChange(index) {
				this.current = index
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			/* 瀑布流*/
			// 获取随机数据
			getRandomData() {
				console.log(13);
				this.loadStatus = 'loading'
				for (let i = 0; i < 10; i++) {
					let index = this.$tn.number.randomInt(0, this.data.length - 1)
					let item = JSON.parse(JSON.stringify(this.data[index]))
					item.id = this.$tn.uuid()
					this.list.push(item)
				}
			},
			// 瀑布流加载完毕事件
			handleWaterFallFinish() {
				this.loadStatus = 'loadmore'
			}
		}
	}
</script>


<style lang="scss" scoped>
	.pagesA {
		min-height: 100vh;
		max-height: 100vh;
		background-color: #1E1E1E80;
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__logo {
			margin: auto 5rpx;
			font-size: 60rpx;
			margin-right: 10rpx;
			margin-left: 30rpx;
			flex-basis: 5%;
		}
	}

	.game-image {
		z-index: 9999 !important;
		width: 110rpx;
		height: 60rpx;
		position: relative;
	}

	.game-pic {
		z-index: 9999 !important;
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
	}

	/* 自定义导航栏内容 end */

	/* 搜索 */
	.search-fixed {
		position: relative;
		width: 100%;
	}

	/* 轮播视觉差 start */
	.card-swiper {
		// height: 300rpx !important;
	}

	.card-swiper swiper-item {
		width: 750rpx !important;
		left: 0rpx;
		box-sizing: border-box;
		padding: 0rpx 30rpx 0rpx 30rpx;
		overflow: initial;
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 20rpx;
		transform: scale(1);
		transition: all 0.2s ease-in 0s;
		overflow: hidden;
		// border: 8rpx solid #FFFFFF;
	}

	.card-swiper swiper-item.cur .swiper-item {
		transform: none;
		transition: all 0.2s ease-in 0s;
	}

	.card-swiper swiper-item .swiper-item-text {
		margin-top: -140rpx;
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 10rpx;
		transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item-text {
		margin-top: -200rpx;
		width: 100%;
		text-shadow: 0 0 6rpx #AFE558;
		transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
	}

	.image-banner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-banner image {
		width: 100%;
		height: 100%;
	}

	/* 轮播指示点 start*/
	.indication {
		z-index: 0;
		width: 100%;
		height: 36rpx;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.spot {
		background-color: #FFFFFF;
		opacity: 0.6;
		width: 10rpx;
		height: 10rpx;
		border-radius: 20rpx;
		top: -40rpx;
		margin: 0 8rpx !important;
		position: relative;
	}

	.spot.active {
		opacity: 1;
		width: 30rpx;
		background-color: #FFFFFF;
	}

	/* 用户头像 start */
	.logo-image {
		width: 36rpx;
		height: 36rpx;
		position: relative;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
		border: 1rpx solid rgba(255, 255, 255, 0.05);
		// box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 图标容器 start */
	.icon {
		&__item {
			&--icon {
				width: 160rpx;
				height: 160rpx;
				position: relative;
				z-index: 1;
			}
		}
	}


	.bg-linear-1 {
		background: linear-gradient(120deg, #FFF8DE, #FFF8E0);
		border-radius: 20rpx;
		border: 8rpx solid #FFFFFF;
	}

	.bg-linear-2 {
		background: linear-gradient(120deg, #FFE4E0, #FFF1EF);
		border-radius: 20rpx;
		border: 8rpx solid #FFFFFF;
	}

	.bg-linear-3 {
		background: linear-gradient(120deg, #E6F7E7, #EEF7EF);
		border-radius: 20rpx;
		border: 8rpx solid #FFFFFF;
	}

	.bg-linear-4 {
		background: linear-gradient(120deg, #E5F0FF, #E8F0FF);
		border-radius: 20rpx;
		border: 8rpx solid #FFFFFF;
	}

	.coll-image {
		padding: 65rpx 0rpx;
		font-size: 16rpx;
		position: relative;
	}

	.coll-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
		border-radius: 10rpx;
		border: 1rpx solid #FFFFFF;
	}

	/* 广告*/
	.advertise {
		width: 100%;
		height: 200rpx;
		border-radius: 15rpx;
		position: relative;
		z-index: 1;

		&::after {
			content: " ";
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 90rpx;
			left: 0;
			top: 0rpx;
			// border-radius: inherit;
			opacity: 1;
			transform: scale(1, 1);
			background-size: 100% 100%;
			background-image: url(https://cdn.nlark.com/yuque/0/2022/png/280373/1666688018137-assets/web-upload/577717f2-70eb-4cec-9c23-bcce95d34fb5.png);
		}
	}

	/* 胶囊banner*/
	.image-capsule {
		padding: 102rpx 0rpx;
		position: relative;
	}

	.image-piccapsule {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
		border-radius: 15rpx;
	}

	/* 瀑布流*/
	.game__item {
		background-color: #FFFFFF;
		overflow: hidden;
		border-radius: 18rpx;
		padding: 6rpx;
		margin: 0 10rpx 20rpx 10rpx;
		// box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);

		.item {

			/* 图片 start */
			&__image {
				width: 100%;
				height: auto;
				background-color: #FFFFFF;
				border: 1rpx solid #F8F7F8;
				border-radius: 16rpx;
				overflow: hidden;
			}

			/* 图片 end */

			/* 内容 start */
			&__data {
				padding: 14rpx 10rpx;
			}

			/* 标题 start */
			&__title-container {
				text-align: justify;
				line-height: 38rpx;
				vertical-align: middle;
			}

			&__title {
				font-size: 26rpx;
			}

			/* 标题 end */

			/* 标签 start */
			&__tags-container {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				justify-content: flex-start;
			}

			&__tag {
				margin: 10rpx;
				color: #7C8191;
				background-color: #F3F2F7;
				padding: 4rpx 14rpx 6rpx;
				border-radius: 10rpx;
				font-size: 20rpx;

				&:first-child {
					margin-left: 0rpx !important;
				}
			}

			/* 标签 end */

			/* 内容 end */
		}
	}

	/* 编辑内容 start*/
	.image-design {
		padding: 200rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-pic {
		// border: 1rpx solid rgba(0, 0, 0, 0.04);
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		margin: 0 10rpx 20rpx 10rpx;
		border-radius: 18rpx;
	}

	/* 编辑内容 end*/

	/* 文字截取*/
	.clamp-text-1 {
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.clamp-text-2 {
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.dd-transform {
		-webkit-perspective: 1800px;
		perspective: 1800px; //透视太大会超过屏幕就不好了吖
		transform-style: preserve-3d;
		overflow: hidden;
	}

	.time {
		transition: all 0.3s ease-in-out;
		overflow: hidden;
	}

	/* 高度宽度 */
	.tn-height {
		// max-height: 100vh;
		background-color: #16181D;
		margin: 0 auto 0;
		// transform: scale(1) translateX(0px) rotateY(0deg);
		// will-change: transform;
		transform-style: preserve-3d;
		border-radius: 0rpx;
		overflow: hidden;
	}

	.tn-height-cur {
		// max-height: 100vh;
		background-color: #16181D;
		margin: 0 auto 0;
		transform-style: preserve-3d;
		transform: scale(0.9) translateX(50px) rotateY(-45deg);
		-webkit-transform: scale(0.9) translateX(50px) rotateY(-45deg);
		-moz-transform: scale(0.9) translateX(50px) rotateY(-45deg);
		// will-change: transform;
		border-radius: 80rpx;
		overflow: hidden;
	}

	.tn-con-hide {
		opacity: 0;
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		background-color: #16181D;
		min-height: 60rpx;
		height: calc(80rpx + env(safe-area-inset-bottom) / 2);
		height: calc(80rpx + constant(safe-area-inset-bottom));
	}
</style>