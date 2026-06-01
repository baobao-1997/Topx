<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#F6F6F600">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<!-- <view class="custom-nav__logo" @click="tn('')">
          <view class="tn-icon-tree leaf-color"></view>
        </view> -->
				<view class="">
					<text class="tn-margin-left tn-text-bold tn-text-xl leaf-color tn-color-white">我 的</text>
				</view>
			</view>
		</tn-nav-bar>

		<!-- 顶部渐变底色，需要的显示出来即可 -->
		<!-- <view class="mine-fixed"></view> -->

		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}"
			style="z-index: 1 !important;position: relative;">
			<!-- 图标logo/头像 -->
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin" v-if="user">
				<view class="justify-content-item">
					<view class="tn-flex tn-flex-col-center tn-flex-row-left">
						<view class="logo-pic">
							<view class="logo-image"
								style="background-image:url('https://resource.tuniaokj.com/images/flower/guye1.jpg');width: 110rpx;height: 110rpx;background-size: cover;overflow: hidden;">
							</view>
						</view>
						<view class="tn-padding-right">
							<view class="tn-padding-right tn-padding-left-sm">
								<text class="  tn-text-xl tn-text-bold tn-color-white">{{user.name}}</text>
								<!-- <text class=" tn-round tn-text-xs tn-bg-red tn-color-white tn-margin-left-sm"
									style="padding: 10rpx 20rpx;">
									未实名
								</text> -->
							</view>
							<view
								class="tn-padding-right tn-padding-top-sm tn-padding-left-sm tn-text-ellipsis tn-color-white">
								<text class="tn-color-gray--dark"> {{user.phone}}</text>
								<!-- <text class="tn-color-gray--dark tn-padding-left-xs tn-icon-qr-code"></text> -->
							</view>
						</view>

					</view>
				</view>
				<view class="justify-content-item">
					<view class="tn-icon-install tn-color-gray--dark" style="font-size: 50rpx;opacity: 0.5;">
					</view>
				</view>
			</view>

			<!-- 没有授权，则显示这个授权按钮-->
			<view class="tn-flex tn-flex-row-between" @click="tn('/pages/login/login')" v-else>
				<view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
					<tn-button shape="round" backgroundColor="#9c75eb" fontColor="#ffffff" padding="36rpx 0"
						width="40%">
						<text class="tn-icon-wechat tn-padding-right-xs tn-text-xl"></text>
						<text class="">{{$t('Login/Register')}}</text>
					</tn-button>
				</view>
			</view>

			<view class="tn-flex tn-flex-1 tn-color-white  "
				style="border-radius: 18rpx;margin: 20rpx 30rpx 20rpx 30rpx;background-color:rgba(153, 153, 153, 0.1);padding:24rpx 0;position: relative;overflow:hidden;">
				<text
					style="position:absolute;top: 0;left: 0;padding:4rpx 16rpx;border: 2rpx solid #9c75eb;background-color: #9c75eb;border-radius: 0 0 18rpx 0;font-size: 24rpx;">Deposit</text>
				<view
					class="tn-flex tn-flex-1 tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-margin-top-lg">
					<text class="tn-color-white  ">{{userDeposit.balance}}</text>
					<text class="tn-color-gray tn-margin-top-sm">{{$t('Deposit')}}</text>
				</view>
				<view
					class="tn-flex tn-flex-1  tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-margin-top-lg ">
					<text class="tn-color-white  ">{{userDeposit.balance_bonus_rollover}}</text>
					<text class="tn-color-gray tn-margin-top-sm">{{$t("Bonus")}}</text>
				</view>
				<view
					class="tn-flex tn-flex-1 tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-margin-top-lg">
					<text class="tn-color-white  ">{{userDeposit.balance_withdrawal}}</text>
					<text class="tn-color-gray tn-margin-top-sm">{{$t('Withdrawable')}}</text>
				</view>
			</view>
			<view class="tn-flex tn-flex-1 tn-color-white"
				style="border-radius: 18rpx;margin: 20rpx 30rpx 20rpx 30rpx;overflow: hidden; ">
				<view class="tn-flex-1 tn-flex-col-center tn-flex-row-center"
					style="position: relative; background-color:rgba(153, 153, 153, 0.1);overflow: hidden;"
					@click="goToRecharge">
					<view class="tn-flex tn-flex-direction-column"
						style="position: relative;left: 20rpx;height: 160rpx;top: 20rpx;">
						<text class="tn-text-bold tn-text-lg">{{$t('Recharge')}}</text>
						<text class="tn-text-sm"></text>
					</view>
					<image src="/static/yNxuAVAbRslSEty.webp"
						style="width: 180rpx;height: 140rpx;position:absolute;right: 0;bottom: 0;"></image>
				</view>
				<view style="width:10rpx;">

				</view>
				<view class="tn-flex-1 tn-flex-col-center tn-flex-row-center"
					style="position: relative; background-color:rgba(153, 153, 153, 0.1);overflow: hidden;"
					@click="goToWithdrawal">
					<view class="tn-flex tn-flex-direction-column"
						style="position: relative;left: 20rpx;height: 160rpx;top: 20rpx;">
						<text class="tn-text-bold tn-text-lg">{{$t('Withdrawal')}}</text>
						<text class="tn-text-sm"></text>
					</view>
					<image src="/static/act_agency.a51ae65e.webp"
						style="width: 180rpx;height: 140rpx;position:absolute;right: 0;bottom: 0;"></image>
				</view>
			</view>
			<!-- <view class="tn-flex tn-flex-row tn-padding-sm"> 
			</view> -->
			<!-- 更多信息-->
			<!-- 	<view class="     "
				style="border-radius: 18rpx;margin: 20rpx 30rpx 20rpx 30rpx;background-color: rgba(153, 153, 153, 0.1)">
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
					@click="copySource" style="">
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-icon-discover-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">充值记录</view>
						<view class="tn-color-gray tn-icon-right"></view>
					</view>
				</tn-list-cell>
			 <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
			 	@click="copySource" style="">
			 	<view class="tn-flex tn-flex-col-center">
			 		<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
			 			<view class="tn-icon-discover-fill"></view>
			 		</view>
			 		<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">提现记录</view>
			 		<view class="tn-color-gray tn-icon-right"></view>
			 	</view>
			 </tn-list-cell>
			 <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
			 	@click="copySource" style="">
			 	<view class="tn-flex tn-flex-col-center">
			 		<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
			 			<view class="tn-icon-discover-fill"></view>
			 		</view>
			 		<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">游戏记录</view>
			 		<view class="tn-color-gray tn-icon-right"></view>
			 	</view>
			 </tn-list-cell>
			</view> -->


			<view
				style="border-radius: 18rpx;margin: 20rpx 30rpx 20rpx 30rpx; background-color: rgba(153, 153, 153, 0.1)">
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
					@click="toPages('/pages/language/language')">
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-icon-discover-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">{{$t('Language')}}</view>
						<view class="tn-color-gray tn-icon-right"></view>
					</view>
				</tn-list-cell>
				<!-- 	<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
					@click="tn('/minePages/public')">
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-icon-bookmark-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">消息</view>
						<view class="tn-color-gray tn-icon-right"></view>
					</view>
				</tn-list-cell> -->
				<!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
					@click="tn('/minePages/public')">
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-icon-bookmark-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">{{$t('Collection')}}</view>
						<view class="tn-color-gray tn-icon-right"></view>
					</view>
				</tn-list-cell> -->
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx"
					@click="tn('/pages/MakeMoney/MakeMoney')">
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-icon-discover-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1 tn-text-lg">{{$t('MakeMoney')}}</view>
						<view class="tn-color-gray tn-icon-right"></view>
					</view>
				</tn-list-cell>
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" padding="26rpx 30rpx">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style  " open-type="contact">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
							<view class="tn-icon-service-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm tn-text-lg">{{$t('CustomerService')}}</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell>
			</view>
			<view class="tn-flex tn-flex-1">
				<button style=" color:  darkred;background-color: transparent;"
					@click="LogOut">{{$t('ExitLogin')}}</button>
			</view>
		</view>


		<tn-modal v-model="show1" :custom="true">
			<view class="custom-modal-content">
				<image @tap="previewQRCodeImage" src='https://resource.tuniaokj.com/images/advertise/qrcode.jpg'
					mode='aspectFill' style="width: 100%;"></image>
				<view class="tn-text-center tn-padding-top" @click="copyWechat">
					<text class="">我的好友码：10262008 </text>
					<text class="tn-color-blue--disabled tn-padding-left-xs tn-text-df tn-icon-copy"></text>
				</view>
				<!-- <view class="tn-text-center tn-padding-top tn-text-lg">点击上图，可识别微信二维码</view> -->

				<!-- 悬浮按钮-->
				<view class="tn-flex tn-padding">
					<view class="tn-flex-1 justify-content-item tn-text-center">
						<tn-button backgroundColor="#AFE558 " padding="40rpx 0" width="100%" :fontSize="28"
							fontColor="#FFFFFF" shape="round" @click="tn('')">
							<text class="">保存到相册</text>
						</tn-button>
					</view>
				</view>

			</view>
		</tn-modal>

		<view class="tn-tabbar-height"></view>

	</view>
</template>

<script>
	export default {
		name: 'PageE',
		data() {
			return {
				show1: false,
				user: null,
				userDeposit: {
					balance: "", //余额
					balance_bonus_rollover: "", //奖金
					balance_withdrawal: "", //可提现
				},
			}
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			// 退出登录
			LogOut(e) {
				uni.showModal({
					title: this.$t('LogOutInfo'),
					// icon:"none",
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync('user');
							uni.removeStorageSync('token');
							uni.reLaunch({
								url: "/pages/login/login?type=1"
							})
						}
					}
				})
			},
			// 获取钱包信息
			getWall() {
				this.$http.wall().then(res => {
					if (res && res.wallet) {
						for (let i in this.userDeposit) {
							this.userDeposit[i] = res.wallet[i];
						}
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
				}
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
	page {
		background-color: #16181d;
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