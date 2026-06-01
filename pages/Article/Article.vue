<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="true" :backTitle="$t('back')" :title="$t('details')" :bottomShadow="true"
			backgroundColor="#F6F6F600">
			<text class="tn-color-white"> </text>
		</tn-nav-bar>
		<!-- <view class="mine-fixed"></view> -->

		<view class="tn-color-white" :style="{paddingTop: vuex_custom_bar_height + 'px'}"
			style="z-index: 1 !important;position: relative;">
			<view class="tn-margin tn-text-center tn-text-xxl">
				{{title}}
			</view>
			<view class=" tn-margin tn-text-right">
				<text class="tn-text-right">{{time}}</text>
			</view>
			<view class="tn-margin">
				<mp-html :content="content"></mp-html>
			</view>
		</view>
		<view class="tn-tabbar-height"></view>

	</view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		data() {
			return {
				title: "",
				content: "",
				time: ""
			}
		},
		onLoad(e) {
			this.getData(e.id);
		},
		methods: {
			getData(id) {
				this.$http.activity({
					id
				}).then(res => {
					if (res.activities) {
						this.title = res.activities[0].activity_name
						this.content = res.activities[0].activity_description
						// this.time=dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #16181d;
	}

	/deep/ .tn-custom-nav-bar__bar__action {
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