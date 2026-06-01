<template>
	<view class="index">
		<!-- 活动弹窗 -->
		<block v-for="(item,index) in activityList">
			<tn-popup v-model="activityListShow[index]" mode="center" :closeBtn="true" :closeIconSize="45"
				:maskCloseable="true" :customStyle="{backgroundColor:'rgba(0,0,0,0.08)'}">
				<view style="" class="tn-flex tn-flex-direction-column tn-flex-col-center">
					<image :src="item.publicity_image" mode="widthFix"
						style="width: 620rpx;background-color: transparent;"></image>
					<view style="width: 100%;"
						class=" tn-flex tn-flex-1 tn-color-white tn-flex-row-right tn-margin-top-lg">
						<tn-radio-group v-model="radioGroupChangeValue[index]"
							@change="radioGroupChange({$event,item,index})">
							<tn-radio :key="index" :name="item.id">
								<text class="tn-color-white">今日不再弹出</text>
							</tn-radio>
						</tn-radio-group>
					</view>
					<!-- 	<view>
						<text class="tn-color-white tn-icon-close-circle tn-text-xxl"></text>
					</view> -->
				</view>
			</tn-popup>
		</block>



		<!-- 整体移动背景 -->
		<!-- <view class="bg-contaniner">
		  
		</view> -->

		<!-- 二级页面 -->
		<view v-if="tabberPageLoadFlag[0]" :style="{display: currentTabbarIndex === 0 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<page-a ref="pageA"></page-a>
			</scroll-view>
		</view>
		<view v-if="tabberPageLoadFlag[1]" :style="{display: currentTabbarIndex === 1 ? '' : 'none'}">
			<page-f ref="pageF"></page-f>

		</view>
		<view v-if="tabberPageLoadFlag[2]" :style="{display: currentTabbarIndex === 2 ? '' : 'none'}">
			<Page-g></Page-g>
		</view>
		<view v-if="tabberPageLoadFlag[3]" :style="{display: currentTabbarIndex === 3 ? '' : 'none'}">
			<!-- <scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower"> -->
			<page-d ref="pageD"></page-d>
			<!-- </scroll-view> -->
		</view>
		<view v-if="tabberPageLoadFlag[4]" :style="{display: currentTabbarIndex === 4 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<page-e ref="pageE"></page-e>
			</scroll-view>
		</view>
		<!-- <view class="bg-tabbar-shadow"></view> -->
		<!-- 底部导航栏 -->
		<view class="tabbar">
			<view class="tabbar__bg" :style="[wrapStyle]"></view>
			<view class="tabbar__list">
				<block v-for="(item, index) in tabbar" :key="index">
					<view :id="`tabbar_item_${index}`" class="tabbar__item"
						:class="[{'tabbar__item--active': index === currentTabbarIndex}]" @click="changeTabbar(index)">
						<!-- 可以用字体图标的方式 -->
						<view class="tabbar__item__icon" :class="[item.icon]"></view>

						<!-- 或者放自己喜欢的设计图 -->
						<!-- <image class="tabbar__item__image" :src="item.image"></image> -->
						<!-- 底部文字，需要自行显示出来-->
						<view class="tabbar__item__text">{{ item.name }}</view>
					</view>
				</block>
			</view>
			<!-- <view class="tabbar__select-active-bg" :class="[showActiceBg ? 'tabbar__select-active-bg--show' : 'tabbar__select-active-bg--hide']" :style="[activeBgStyle]"></view> -->
			<view class="tabbar__select-active-bg" :animation="activeBgAnimation"></view>
		</view>
	</view>
</template>

<script>
	import PageA from './component/PageA.vue'
	import PageB from './component/PageB.vue'
	import PageC from './component/PageC.vue'
	import PageD from './component/PageD.vue'
	import PageE from './component/PageE.vue'
	import PageF from './component/PageF.vue'
	import PageG from './component/PageG.vue'

	export default {
		components: {
			PageA,
			PageB,
			PageC,
			PageD,
			PageE,
			PageF,
			PageG
		},
		data() {
			return {
				wrapMaskPositionLeft: -15,
				activeBgPositionLeft: 0,
				prevTabbarIndex: 0,
				currentTabbarIndex: 0,
				tabbarRectInfo: [],
				activeBgAnimation: {},
				tabbar: [{
						name: this.$t("HOME"),
						icon: 'tn-icon-home-fill',
						image: '/static/tabbar/tn-tabbar0.png'
					},
					{
						name: this.$t("EVENT"),
						icon: 'tn-icon-discover-fill',
						image: '/static/tabbar/tn-tabbar1.png'
					},
					{
						name: this.$t("Ranking List"),
						icon: 'tn-icon-mansion',
						image: '/static/tabbar/tn-tabbar2.png'
					},
					{
						name: this.$t("News"),
						icon: 'tn-icon-stack',
						image: '/static/tabbar/tn-tabbar3.png'
					},
					{
						name: this.$t("Personal Center"),
						icon: 'tn-icon-my-lack-fill',
						image: '/static/tabbar/tn-tabbar3.png'
					}
				],
				// 活动弹窗
				activityList: [],
				activityListShow: [],
				// 自定义底栏对应页面的加载情况
				tabberPageLoadFlag: [],
				radioGroupChangeValue: [],
			}
		},
		computed: {
			wrapStyle() {
				return {
					'-webkit-mask-position': `${this.wrapMaskPositionLeft}px -1px, 100%`
				}
			},
		},
		onLoad(options) {

			const index = Number(options.index || 0)
			// 根据底部tabbar菜单列表设置对应页面的加载情况
			this.tabberPageLoadFlag = this.tabbar.map((item, tabbar_index) => {
				return index === tabbar_index
			})
			this.changeTabbar(index);

		},
		onReady() {
			this.$nextTick(() => {
				this.getTabbarItemInfo();
				this.getPopupActivityListData();
			})
		},
		onShow() {

		},
		methods: {
			// 设置数组缓存
			setArrayStorage(key = "activityShow", data) {
				let datas = uni.getStorageSync(key) || [];
				if (datas.length >= 0) {
					datas.push(data);
				}
				uni.setStorageSync(key, datas || []);
			},
			radioGroupChange(data) {
				if (this.radioGroupChangeValue[data.index] == String(0)) {
					this.radioGroupChangeValue[data.index] = String(data.item.id);
				} else {
					this.radioGroupChangeValue[data.index] = String(0)
					this.setArrayStorage('activityShow', data.item.id);
				}
				this.activityListShow[data.index] = false;
				this.$forceUpdate();
			},
			// 获取活动弹窗数据
			getPopupActivityListData() {
				this.activityListShow = [];
				this.activityList = [];
				this.radioGroupChangeValue = [];
				let activityNoShow = uni.getStorageSync("activityShow") || []; // 隐藏活动； 
				this.$http.PopupActivityList().then(res => {
					if (res.activities) {
						this.activityList = res.activities;
						res.activities.forEach((item, index) => {
							this.radioGroupChangeValue.push(String(0));
							if (activityNoShow.includes(item.id)) {
								this.activityListShow.push(false);
							} else {
								this.activityListShow.push(true);
							}
							this.$forceUpdate();
						})
					}
				})
			},
			// 导航页面滚动到底部
			tabbarPageScrollLower(e) {
				if (this.currentTabbarIndex === 0) {
					this.$refs.pageA.getRandomData && this.$refs.pageA.getRandomData()
				}
			},

			// 切换导航页面
			_switchTabbarPage(index) {
				wx.vibrateShort();
				const selectPageFlag = this.tabberPageLoadFlag[index]
				if (selectPageFlag === undefined) {
					return
				}
				if (selectPageFlag === false) {
					this.tabberPageLoadFlag[index] = true
				}
			},


			// 获取底部元素的位置
			getTabbarItemInfo() {
				const view = uni.createSelectorQuery().in(this)
				for (let i = 0; i < this.tabbar.length; i++) {
					view.select('#tabbar_item_' + i).boundingClientRect()
				}
				view.exec(res => {
					if (!res.length) {
						setTimeout(() => {
							this.getTabbarItemInfo()
						}, 10)
						return
					}

					// 将信息存入数组中
					res.map((item) => {
						this.tabbarRectInfo.push({
							left: item.left,
							width: item.width
						})
					})
					this.updateHollowsPosition()
					this.updateActiveBgPosition(true)
					// console.log(this.tabbarRectInfo)
				})
			},
			// 更新凹陷位置
			updateHollowsPosition() {
				const {
					width,
					left
				} = this.tabbarRectInfo[this.currentTabbarIndex]
				// 计算掩模图片的宽高比
				// const imageRatio = 200 / 92
				// 计算定高的宽比
				const imageFixedHeightWidthRatioValue = 300 * (uni.upx2px(20) / 92)
				this.wrapMaskPositionLeft = left - ((imageFixedHeightWidthRatioValue - width) / 2)
			},
			// 更新激活时背景的位置
			updateActiveBgPosition(init = false) {
				const {
					width,
					left
				} = this.tabbarRectInfo[this.currentTabbarIndex]
				const oldActiveBgPositionLeft = this.activeBgPositionLeft
				this.activeBgPositionLeft = left + ((width - uni.upx2px(16)) / 2)
				if (!init) {
					const animation = uni.createAnimation({
						duration: 160,
						timingFunction: "linear"
					})
					animation.top(uni.upx2px(-60)).left(oldActiveBgPositionLeft + ((this.activeBgPositionLeft -
						oldActiveBgPositionLeft) / 2)).scale(1).step()
					animation.left(this.activeBgPositionLeft).top(uni.upx2px(-10)).scale(1).step()
					this.activeBgAnimation = animation.export()
				} else {
					const animation = uni.createAnimation({
						duration: 160,
						timingFunction: "linear"
					})
					animation.left(this.activeBgPositionLeft).top(uni.upx2px(-10)).step()
					this.activeBgAnimation = animation.export()
				}

			},
			// 修改当前选中的tabbar
			changeTabbar(index) {
				if (this.currentTabbarIndex === index) return
				this._switchTabbarPage(index)
				this.prevTabbarIndex = this.currentTabbarIndex
				this.currentTabbarIndex = index
				this.$nextTick(() => {
					this.updateHollowsPosition()
					this.updateActiveBgPosition()
					if (index == 0 && this.tabberPageLoadFlag[0] == true && index == 4 && this.tabberPageLoadFlag[
							4] == true) {
						this.$refs['pageA']?.getUserInfo();
					}
				})
			},


		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .tn-popup__content__center_box {
		background-color: transparent !important;
	}

	/*整体样式 */
	.index {
		width: 100%;
		height: 100vh;
		position: relative;

		.custom-tabbar-page {
			// width: 100%;
			height: calc(100vh - 10rpx);
			box-sizing: border-box;
			padding-bottom: 30rpx;
			padding-bottom: calc(30rpx + constant(safe-area-inset-bottom));
			padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
		}


		/* 底部导航 statr */
		.tabbar {
			width: 100%;
			height: 114rpx;
			height: calc(114rpx + constant(safe-area-inset-bottom));
			height: calc(114rpx + env(safe-area-inset-bottom));
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: transparent;
			z-index: 998;
			/* 图鸟温馨提醒，裁剪式也生效的阴影样式，不用box-shadow*/
			filter: drop-shadow(0rpx 0rpx 30rpx rgba(0, 0, 0, 0.08));

			&__bg {
				position: absolute;
				width: 100%;
				height: 100%;
				bottom: 0;
				left: 0;
				background-color: #232323;
				-webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 61.5'%3E%3Cpath d='M100 0H0c32.9 0 49.3 61.5 100 61.5S167.1 0 200 0H100z'/%3E%3C/svg%3E"), linear-gradient(#000, #000);
				-webkit-mask-size: auto 20rpx, cover;
				-webkit-mask-position: center top;
				-webkit-mask-repeat: no-repeat;
				-webkit-mask-composite: xor;
				/*只显示不重合的地方， chorem 、safari 支持*/
				z-index: -1;
				transition: 0.5s;
			}

			&__list {
				position: absolute;
				z-index: 999;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			&__item {
				height: 100%;
				width: 100%;
				flex: 1;
				text-align: center;
				position: relative;
				margin-top: 10rpx;

				&--active {
					.tabbar__item__icon {
						// top: 10rpx;
						color: #9c75eb;
					}

					.tabbar__item__image {
						top: -42rpx;
					}

					.tabbar__item__text {
						opacity: 1;
						color: #F8f8f8;
						font-size: 20rpx;
					}
				}

				&__icon {
					font-size: 48rpx;
					position: absolute;
					left: 0;
					right: 0;
					top: 22rpx;
					transition: 0.5s;
					color: #BDBDBD;
				}

				&__image {
					width: 58rpx;
					height: 58rpx;
					position: absolute;
					left: 0;
					right: 0;
					top: 20rpx;
					transition: 0.5s;
					margin: 0 auto;
				}

				&__text {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 20rpx;
					bottom: calc(20rpx + constant(safe-area-inset-bottom)*0.8);
					bottom: calc(20rpx + env(safe-area-inset-bottom)*0.8);
					transition: 0.5s;
					font-size: 20rpx;
					color: #BDBDBD;
				}
			}

			&__select-active-bg {
				position: absolute;
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background-color: rgb(156, 117, 235);
				border: 2rpx solid rgba(156, 117, 235, 0.5);
				// transition: 0.5s;
				z-index: -1;
				left: calc(64rpx);
				box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(254, 165, 0, 0.4);
				// box-shadow: inset 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.05);
				// box-shadow: 0rpx 10rpx 30rpx rgba(70,23,129, 0.07),
				//   0rpx -8rpx 40rpx rgba(255, 255, 255, 0.07),
				//   inset 0rpx -10rpx 10rpx rgba(70,23,129, 0.07),
				//   inset 0rpx 10rpx 20rpx rgba(255, 255, 255, 1);
				transition: box-shadow .2s ease-out;

				&--hide {
					top: calc(110rpx + 50rpx);
				}

				&--show {
					top: -54rpx;
				}
			}
		}

		/* 底部导航 end */


		/* 移动背景部分 start*/
		.bg-contaniner {
			position: fixed;
			top: -0rpx;
			left: -300rpx;
			--text-color: hsl(0 95% 60%);
			--bg-color: #F6F6F6;
			--bg-size: 200px;
			height: 100%;
			display: grid;
			place-items: center;
			place-content: center;
			overflow: hidden;
			background-color: var(--bg-color);
			z-index: -1;
		}

		.bg-contaniner::before {
			--size: 150vmax;
			content: "";
			inline-size: var(--size);
			block-size: var(--size);
			background-image: url("https://cdn.nlark.com/yuque/0/2022/png/280373/1663568736856-assets/web-upload/97cab67d-6f17-4c6e-a3f9-ac81961d571a.png");
			background-size: var(--bg-size);
			background-repeat: repeat;
			transform: rotate(45deg);
			opacity: 0.1;
			animation: bg 6s linear infinite;
		}

		@media (prefers-reduced-motion: reduce) {
			.bg-contaniner::before {
				animation-duration: 0s;
			}
		}

		@keyframes bg {
			to {
				background-position: 0 calc(var(--bg-size) * -1);
			}
		}

		/* 移动背景部分 end*/
	}

	/* 毛玻璃*/
	.dd-glass {
		width: 100%;
		backdrop-filter: blur(20rpx);
		-webkit-backdrop-filter: blur(20rpx);
	}
</style>