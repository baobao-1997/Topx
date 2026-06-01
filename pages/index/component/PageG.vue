<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#16181D00">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<view class="">
					<text class="tn-margin-left tn-text-bold tn-text-xl leaf-color  " style="color: #FFF;">代 理</text>
				</view>
			</view>
		</tn-nav-bar>
		<view :style="{paddingTop: vuex_custom_bar_height + 'px' }" style="z-index: 1 !important;position: relative;">
			<view class=""
				style="position: relative;z-index: 1;background-image: url('/static/bg/bg1.webp');background-repeat: no-repeat;background-size:cover;margin:  0 24rpx;">
				<view class="title" style="position: relative;padding-top: 10rpx;">
					<text class="title-left" style="font-size: 1.2rem;color: #FFF;margin: 0 0 15rpx 15rpx;">BANGBET
						JACKPOT</text>
					<text class="title-right" style="position: absolute;right: 60rpx;top: 16rpx;color: #FFF;">ViewMore
						></text>
				</view>
				<view class="tn-flex tn-flex-col-center tn-flex-row-center tn-flex-direction-column">
					<view
						style=" background-image: url('/static/bg/SUPER_BG_active.adcfa0ae.webp');background-repeat: no-repeat;background-size:cover;width: 560rpx;height: 180rpx; display: flex;justify-content: center;align-items: center;">
						<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
							<view class="tn-text-xxl tn-margin-top-xs tn-padding-top-sm">
								<tn-count-scroll :value="100" :fontSize="52" :bold="true" fontColor="rgb(113, 8, 3)"
									:height="60"></tn-count-scroll>
							</view>
							<view class="tn-text-sm">
								<text style="color: #fff500;"> Must hit by 2,000,000</text>
								<text style="color: #fff500;"> Min bet 500</text>
							</view>
						</view>
					</view>
					<view class="tn-flex tn-flex-direction-row tn-flex-wrap">
						<view class="tn-flex tn-flex-direction-row " style="width: calc(50% - 20rpx);margin: 10rpx;"
							v-for="item in mokeData">
							<view class="tn-flex  tn-flex-direction-column  tn-flex-col-center tn-flex-row-center"
								style=" width:100%;height: 120rpx; background-image: url('/static/bg/Other_BG.b755abf5.png');background-repeat: no-repeat;background-size:cover;position: relative; ">
								<image :src="item.bg" mode="widthFix"
									style="width: 280rpx;position: absolute;top:-20rpx; z-index: 99;"></image>
								<text
									style="margin-top: 22rpx;font-weight: bold;font-size: 36rpx;">{{item.value}}</text>
								<view class="tn-flex tn-flex-direction-column tn-flex-col-center"
									style="color: #fff500;padding: 12rpx 32rpx;width: 100%; overflow: hidden;font-size:20rpx;">
									<view class="tn-flex">
										<text style="color: #FFF;">Must hit by </text>
										<text> {{item.Musthit}} </text>
									</view>
									<view class="tn-flex">
										<text style="color: #FFF;">Min bet </text>
										<text> {{item.Minbet}} </text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" style="width: 100%; padding: 20rpx 10rpx;">
						<scroll-view :scroll-x="true">
							<view style="white-space:nowrap;">
								<view class="" v-for="item in 20"
									style="display: inline-block;height: calc(100vw/4 + 30rpx);width: calc(100vw/4);margin: 0 12rpx;position: relative;">
									<lazyImageVue
										src="https://pc.topx666888.com/livewire-tmp/01HPQG18N8BPYJ54CATBR0Y0XN.png">
									</lazyImageVue>
									<view class="game-jp ">
										81263821
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>

			</view>
			<view class=""
				style="position: relative;z-index: 1;background-image: url('/static/bg/bg2.webp');background-repeat: no-repeat;background-size:cover;margin:  0 24rpx;margin-top: 32rpx;">
				<view class="title" style="position: relative;padding-top: 10rpx;">
					<text class="title-left" style="font-size: 1.2rem;color: #FFF;margin: 0 0 15rpx 15rpx;">BANGBET
						JACKPOT</text>
					<text class="title-right" style="position: absolute;right: 60rpx;top: 16rpx;color: #FFF;">ViewMore
						></text>
				</view>
				<view class="tn-flex tn-flex-col-center tn-flex-row-center tn-flex-direction-column">
					<view
						style="background-repeat: no-repeat; background-image: url('/static/bg/award_BG.a942a8ca.webp');background-size: 100% ;width: 98%;margin-top: 32rpx;">
						<view class="tn-flex " style="height: 88rpx;margin-top: 13rpx;">
							<view v-for="item in mokeData2"
								class="tn-flex tn-flex-1 tn-flex-col-center tn-flex-row-center tn-color-white">
								{{item.value}}
							</view>
						</view>
					</view>
					<view class="" style="width: 100%; padding: 20rpx 10rpx;">
						<scroll-view :scroll-x="true">
							<view style="white-space:nowrap;">
								<view class="" v-for="item in 20"
									style="display: inline-block;height: calc(100vw/4 + 30rpx);width: calc(100vw/4);margin: 0 12rpx;position: relative;">
									<lazyImageVue
										src="https://pc.topx666888.com/livewire-tmp/01HPQG18N8BPYJ54CATBR0Y0XN.png">
									</lazyImageVue>
									<view class="game-jp ">
										81263821
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class=""
				style="position: relative;z-index: 1;background-image: url('/static/bg/bg2.webp');background-repeat: no-repeat;background-size:cover;margin:  0 24rpx;margin-top: 32rpx;">
				<view class="title" style="position: relative;padding-top: 10rpx;">
					<view class="title-left tn-flex tn-flex-direction-column"
						style="font-size: 1.2rem;color: #FFF;margin: 0 0 20rpx 20rpx;">
						<text class="" style="font-size: 32rpx;margin-top: 20rpx;">EGT-Bell Link</text>
						<text>KSH 783,6217,3612</text>
					</view>
					<text class="title-right" style="position: absolute;right: 60rpx;top: 16rpx;color: gray;">ViewMore
						></text>
				</view>
				<view class="tn-flex tn-flex-col-center tn-flex-row-center tn-flex-direction-column">
					<view
						style="background-repeat: no-repeat; background-image: url('/static/bg/award_BG.a942a8ca.webp');background-size: 100% ;width: 98%;margin-top: 32rpx;">
						<view class="tn-flex " style="height: 88rpx;margin-top: 13rpx;">
							<view v-for="item in mokeData2"
								class="tn-flex tn-flex-1 tn-flex-col-center tn-flex-row-center tn-color-white">
								{{item.value}}
							</view>
						</view>
					</view>
					<view class="" style="width: 100%; padding: 20rpx 10rpx;">
						<scroll-view :scroll-x="true">
							<view style="white-space:nowrap;">
								<view class="" v-for="item in 20"
									style="display: inline-block;height: calc(100vw/4 + 30rpx);width: calc(100vw/4);margin: 0 12rpx;position: relative;">
									<lazyImageVue
										src="https://pc.topx666888.com/livewire-tmp/01HPQG18N8BPYJ54CATBR0Y0XN.png">
									</lazyImageVue>
									<view class="game-jp ">
										81263821
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="" style="margin: 24rpx;background-color: #2E3830;padding: 24rpx;border-radius: 20rpx;">
				<text class="tn-color-white tn-text-xxl">Jackpot Leader Board</text>
				<view class="tn-margin-top">
					<tn-tabs :list="tabList" activeColor="#2ee52e" inactiveColor="#eee" :isScroll="false"
						:current="current" name="tab-name" @change="change"></tn-tabs>
					<view class="" style="height: 60vh; ">
						<z-paging ref="paging" v-model="dataList" @query="queryList" style="height: 100%; "
							:fixed="false">
							<view class="item tn-flex tn-flex-row-center  tn-color-white  tn-margin-xs"
								style="width: 100%;" v-for="(item,index) in dataList" :key="index">
								<view class="tn-flex tn-flex-1 tn-flex-direction-column tn-flex-1"
									style="position: relative;overflow: hidden;">
									<view class="tn-flex tn-flex-1 tn-padding-sm"
										style="position: relative;z-index: 99;">
										<view class="tn-flex tn-flex-1 ">{{item.currency}}{{item.type}}-{{item.value}}
										</view>
										<view>{{item.phone}}</view>
									</view>
									<view class="tn-flex tn-flex-1 tn-padding-sm tn-color-gray">
										<view class="tn-flex tn-flex-1">{{item.time}} </view>
										<view>{{item.userName}}</view>
									</view>
									<view class="tn-bg" style=" position: absolute;
    width: 7.68rem;
    top: 0;
    height: 1.72rem;
    background: linear-gradient(90deg,#146a1b,rgba(20,106,27,0));
    border-radius: .32rem .32rem 0 0">

									</view>
								</view>
								<view>
									<image src="https://pc.topx666888.com/livewire-tmp/01HPQG18N8BPYJ54CATBR0Y0XN.png"
										mode="widthFix" style="width: 130rpx;"></image>
								</view>
							</view>
						</z-paging>
					</view>


				</view>
			</view>

		</view>
		<!-- 安全底部 -->
		<view class="tn-tabbar-height"></view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import lazyImageVue from '../../../components/lazy-image/lazy-image.vue';
	export default {
		components: {
			lazyImageVue
		},
		name: 'PageE',
		data() {
			return {
				current: 0,
				dataList: [{
					type: "Block",
					value: "321321",
					currency: "GHS",
					userName: "768***213",
					phone: "y378213***321",
					time: dayjs(new Date()).format("DD/MM/YYYY"),
				}],
				tabList: [{
					"tab-name": 'Daily'
				}, {
					"tab-name": 'Weekly'
				}, {
					"tab-name": 'Monthly'
				}],
				// moke
				mokeData: [{
					"bg": "/static/bg/1.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}, {
					"bg": "/static/bg/2.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}, {
					"bg": "/static/bg/3.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}, {
					"bg": "/static/bg/4.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}],
				mokeData2: [{
					"bg": "/static/bg/1.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}, {
					"bg": "/static/bg/2.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}, {
					"bg": "/static/bg/3.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}, {
					"bg": "/static/bg/4.png",
					"value": 124124,
					"Musthit": 8726,
					"Minbet": 312,
				}],
				show1: false,
				current: 0,

			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				let data = [];
				for (let i = 0; i <= 20; i++) {
					data.push({
						value: "",
						type: "Block",
						currency: "GHS",
						userName: "768***213",
						phone: "y378213***321",
						time: dayjs(new Date()).format("DD/MM/YYYY"),
					});
				}
				this.$refs.paging.complete(data);
				// this.$http.ActivityList({}).then(res => {
				// 	if (res.activities) {
				// 		this.$refs.paging.complete(res.activities);
				// 	} else {
				// 		this.$refs.paging.complete([]);
				// 	}
				// }).catch((err) => {
				// 	this.$refs.paging.complete(false);
				// })
			},
			change(index) {
				this.current = index;
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			// 跳转到图鸟UI
			navTuniaoUI() {
				uni.navigateToMiniProgram({
					appId: 'wxf3d81a452b88ff4b'
				})
			},

			//拨打固定电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "18219128888",
				});
			},


			// 复制id
			copyWechat() {
				wx.vibrateShort();
				uni.setClipboardData({
					data: "10262008",
				})
			},

			// 预览作者图片
			previewQRCodeImage() {
				wx.previewImage({
					urls: ['https://resource.tuniaokj.com/images/advertise/qrcode.jpg']
				})
			},

			// 弹出模态框1
			showModal(event) {
				this.openModal()
			},
			// 打开模态框
			openModal() {
				this.show1 = true
			},

			// 复制开源地址
			copySource() {
				wx.vibrateShort();
				uni.setClipboardData({
					data: "https://ext.dcloud.net.cn/publisher?id=356088",
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pagesE {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background-color: #16181D;
	}

	.item {
		border-radius: 20rpx;
		overflow: hidden;
		background-color: #1F2228FF;

		.item_img {
			width: 100%;
			height: 220rpx;
		}

		.item_img_bg {
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: cover;
		}
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__logo {
			margin: auto 5rpx;
			font-size: 50rpx;
			margin-right: 10rpx;
			margin-left: 30rpx;
			flex-basis: 5%;
		}
	}

	/* 自定义导航栏内容 end */

	.mine-fixed {
		position: fixed;
		// background: linear-gradient(90deg, #d8feda, #16181D);
		background: linear-gradient(90deg, #16181D, #16181D);
		top: 0;
		width: 100%;
		height: 450rpx;
		transition: all 0.25s ease-out;
		z-index: 0;
	}

	.mine-fixed:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 0;
		mask-image: linear-gradient(to bottom, transparent, black);
		background: linear-gradient(90deg, #16181D, #16181D);

	}

	/* 用户头像 start */
	.logo-image {
		width: 110rpx;
		height: 110rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border: 8rpx solid rgba(255, 255, 255, 0.6);
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 图标容器1 start */
	.icon1 {
		&__item {
			// width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 50rpx;
				height: 50rpx;
				font-size: 40rpx;
				border-radius: 50%;
				position: relative;
				z-index: 1;

				&::after {
					content: " ";
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0;
					border-radius: inherit;
					opacity: 1;
					transform: scale(1, 1);
					background-size: 100% 100%;
					// background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
				}
			}
		}
	}

	/* 图标容器1 end */

	.icon12 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 80rpx;
				height: 80rpx;
				font-size: 50rpx;
				// margin-bottom: 18rpx;
				position: relative;
				z-index: 1;

				&::after {
					content: " ";
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0;
					border-radius: inherit;
					opacity: 1;
					transform: scale(1, 1);
					background-size: 100% 100%;
					// background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg6.png);
				}
			}
		}
	}

	/* 图标容器13 start */
	.icon13 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 15rpx;
				height: 15rpx;
				font-size: 50rpx;
				border-radius: 50%;
				margin-bottom: 28rpx;
				position: relative;
				z-index: 1;

				&::after {
					content: " ";
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0;
					border-radius: inherit;
					opacity: 1;
					transform: scale(1, 1);
					background-size: 100% 100%;

				}
			}
		}
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom) / 2);
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}
</style>