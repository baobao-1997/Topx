<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="true" :backTitle="$t('back')" :title="$t('MakeMoney')" :bottomShadow="true" backgroundColor="#F6F6F600">
			
		</tn-nav-bar>

		<!-- 顶部渐变底色，需要的显示出来即可 -->
		<!-- <view class="mine-fixed"></view> -->

		<view class="tn-color-white" :style="{paddingTop: vuex_custom_bar_height + 'px'}"
			style="z-index: 1 !important;position: relative;">
			<view class="" v-if="user">
				<view class="tn-flex tn-margin tn-flex-col-center tn-flex-row-center"
					style="background-color: rgba(255,255,255,0.08);padding: 24rpx;border-radius: 20rpx;">
					<image src="/static/undraw_young-man-avatar_wgbd.png"
						style="height:  100rpx;width:  100rpx;border-radius: 50%;"></image>
					<view class="tn-flex tn-flex-1 tn-flex-direction-column tn-margin-left">
						<text class="tn-text-lg">{{user.name}}</text>
						<text class="tn-text-sm tn-color-gray tn-margin-top-sm">{{user.phone}}</text>
					</view>
					<view>
						<button size="sm" type="primary"
							style="background-color: blueviolet;padding: 0 32rpx;margin: 0;height: 60rpx;line-height: 60rpx;font-size: 32rpx;">{{$t('Withdrawal')}}</button>
					</view>
				</view>
			</view>
			<view class=" tn-margin-top-lg">
				<view class="  tn-margin    "
					style="background-color: rgba(255,255,255,0.08);padding: 24rpx;border-radius: 20rpx;width: calc(100% - 48rpx);">
					<!-- 二维码 -->
					<view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center tn-flex-1">
						<view
							style="background-color: rgba(255,255,255,1);padding: 32rpx;border-radius: 20rpx ;overflow:hidden;">
							<canvas id="qrcode" canvas-id="qrcode" style="width:160px;height:160px;"></canvas>
						</view>
					</view>
					<view
						style="background-color: rgba(255,255,255,0.06);color: gray;padding:32rpx 24rpx  ;border-radius: 20rpx;"
						class="  tn-flex tn-margin-top-lg tn-flex-col-center tn-flex-row-center">
						<view class="tn-flex tn-flex-1 tn-color-white">
							<text>{{urlPath}}</text>
						</view>
						<text class="tn-icon-copy tn-color-white tn-text-lg" @click="copyUrl"></text>
					</view>
				</view>
			</view>
			<view class=" tn-margin-top-lg">
				<view class="  tn-margin   tn-flex "
					style="background-color: rgba(255,255,255,0.08);padding: 24rpx;border-radius: 20rpx;width: calc(100% - 48rpx);">
					<view class="tn-flex-1 tn-flex-col-center tn-flex-row-center tn-flex tn-flex-direction-column">
						<text class="tn-text-xxl tn-margin-bottom-xs">0</text>
						<text>{{$t('Total number of invitations')}}</text>
					</view>
					<view class="tn-flex-1 tn-flex-col-center tn-flex-row-center tn-flex tn-flex-direction-column">
						<text class="tn-text-xxl tn-margin-bottom-xs">0</text>
						<text>{{$t('Todays invitation')}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="tn-tabbar-height"></view>

	</view>
</template>

<script>
	import UQRCode from 'uqrcodejs'
	export default {
		name: 'PageE',
		data() {
			return {
				payLoadUrl: 'https://uqrcode.cn/doc',
				qrcodeTempPath: '',
				show1: false,
				user: null,
				userDeposit: null,
				urlPath: ""
			}
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			// 复制地址
			copyUrl() {
				uni.setClipboardData({
					data: this.urlPath,
					success(e) {
						uni.showToast({
							title: "成功",
							icon: "none",
						})
					}
				})
			},
			createQrCode() {
				const qr = new UQRCode()
				qr.data = this.payLoadUrl
				qr.size = 160
				qr.make()
				const ctx = uni.createCanvasContext('qrcode', this)
				qr.canvasContext = ctx
				qr.drawCanvas()
			},
			previewQrcode() {
				if (this.qrcodeTempPath) {
					uni.previewImage({
						urls: [this.qrcodeTempPath]
					})
					return
				}
				uni.canvasToTempFilePath({
					canvasId: 'qrcode',
					success: res => {
						this.qrcodeTempPath = res.tempFilePath
						uni.previewImage({
							urls: [res.tempFilePath]
						})
					}
				}, this)
			},
			// 获取钱包信息 
			getWall() {
				this.$http.wall().then(res => {
					if (res && res.wallet) {
						this.userDeposit = res.wallet;
					}
				})
			},
			// 获取用户信息
			getUserInfo() {
				this.user = uni.getStorageSync("user");
				if (this.user == null) {
					uni.navigateTo({
						url: "/pages/login/login?type=1",
					})
				} else {
					this.getWall();
					this.createQrCode();
					this.urlPath = this.$config.BaseURL + 'register?code=' + this.user.inviter_code;
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #16181d;
	}
	/deep/ .tn-custom-nav-bar__bar__action{
		color: #FFF !important;
	}
	.pagesE {
		// max-height: 100vh;
		background-color: #16181d;
	}

	/deep/ .tn-list-cell {
		background-color: transparent !important;
		color: #eee !important;
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
		// background: linear-gradient(90deg, #d8feda, #F6F6F6);
		background: linear-gradient(120deg, #5F4FD9, #16181d);
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
		background: linear-gradient(90deg, #16181D, #16181d);

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
			// background-color: #FFFFFF;
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
			// background-color: #FFFFFF;
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
			// background-color: #FFFFFF;
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