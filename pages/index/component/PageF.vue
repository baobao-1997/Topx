<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#16181D00">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<view class="">
					<text class="tn-margin-left tn-text-bold tn-text-xl leaf-color  "
						style="color: #FFF;">{{$t('Popular activities')}}</text>
				</view>
			</view>
		</tn-nav-bar>
		<view :style="{paddingTop: vuex_custom_bar_height + 'px' }" style="z-index: 1 !important;position: relative;">
			<tn-tabs :list="list" :isScroll="true" :current="current" name="tab-name" @change="change"
				activeColor="#9c75eb" inactiveColor="#E6E6E6"></tn-tabs>
		</view>
		<view style="" class="tn-flex tn-flex-1  tn-color-white">
			<z-paging ref="paging" v-model="dataList" @query="queryList" style="height: 100%;" :fixed="false">
				<view class="item  tn-flex tn-flex-direction-column tn-margin-xl   tn-flex-row-center   "
					@click="toPages('/pages/Article/Article?id='+item.id)" v-for="(item,index) in dataList"
					:key="index">
					<view class="item_img">
						<view class="item_img_bg" :style="{backgroundImage:`url(${item.activity_picture})` }">
						</view>
					</view>
					<view class=" tn-flex tn-padding-sm  tn-flex-direction-column  ">
						<view
							class="tn-border-solid-bottom  tn-text-bold tn-text-left tn-text-xl tn-padding-bottom-xs ">
							<text class="">{{item.activity_name}}</text>
						</view>
						<view class="    tn-text-right tn-text-sm  tn-padding-xs tn-margin-top-xs ">
							<text class="tn-padding-sm"
								style="border-radius: 9999rpx; background-color: rgb(156, 117, 235);padding:12rpx 24rpx;color: #080808;">{{$t('ViewMore')}}</text>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<!-- 安全底部 -->
		<view class="tn-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		name: 'PageE',
		data() {
			return {
				show1: false,
				current: 0,
				list: [{
					"tab-name": this.$t('Popular activities'),
				}],
				dataList: []
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.$http.ActivityList({}).then(res => {
					if (res.activities) {
						this.$refs.paging.complete(res.activities);
					} else {
						this.$refs.paging.complete([]);
					}
				}).catch((err) => {
					this.$refs.paging.complete(false);
				})
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
		height: calc(100vh);
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