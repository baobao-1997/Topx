<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="true" :backTitle="$t('back')" :title="$t('Recharge')" :bottomShadow="true"
			backgroundColor="#F6F6F600">
			<text class="tn-color-white">{{$t('Recharge')}}</text>
		</tn-nav-bar>
		<view class="mine-fixed"></view>

		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}"
			style="z-index: 1 !important;position: relative;">
			<view class="tn-padding-sm tn-margin-sm tn-color-white   "
				style="background-color: #181818;border-radius: 20rpx ;">

				<view class="  tn-padding-lg tn-flex tn-flex-1 tn-flex-col-center tn-flex-row-center"
					style="background-color: rgba(255,255,255,0.05);border-radius: 20rpx;">
					<text class="tn-text-lg tn-margin-right">{{$t('Total balance')}} </text>
					<text class="tn-text-lg tn-flex tn-flex-1"> {{wallet.balance}}</text>
					<text class="tn-icon-right"></text>
				</view>

				<view class="tn-margin-top-lg  tn-padding-lg tn-flex tn-flex-1  tn-flex-direction-column "
					style="background-color: rgba(255,255,255,0.05);border-radius: 20rpx;">
					<text class="tn-text-lg tn-margin-right">{{$t('Recommended recharge')}} </text>
					<view class="tn-flex tn-flex-1 tn-flex-wrap tn-margin-top-lg">
						<view class="tn-flex wallItem" :class="formData.amount==item?'wallItemActivate':''"
							@click="setItemCode(item)" v-for="item  in wallList">
							<text class="tn-flex tn-flex-1 tn-flex-col-center tn-flex-row-center">{{item}}</text>
						</view>
					</view>
				</view>

				<view class="tn-margin-top-lg  tn-padding-lg tn-flex tn-flex-1  tn-flex-direction-column "
					style="background-color: rgba(255,255,255,0.05);border-radius: 20rpx;">
					<view class="tn-flex tn-flex-1 tn-text-lg tn-margin-right ">
						<text class="tn-flex tn-flex-1">{{$t('Currency')}}</text>
						<view class="tn-flex tn-flex-col-center " @click="show=true"
							style="padding: 10rpx  24rpx;color:#FFF; background-color: rgba(255,255,255,0.2);border-radius: 10rpx; ">
							<text>{{listItem}}</text>
							<text class="tn-icon-down"></text>
						</view>
					</view>
					<view class="tn-flex tn-flex-1 tn-flex-wrap tn-margin-top-lg">
						<view class=" tn-flex-1 tn-flex tn-flex-col-center tn-flex-row-center"
							style="border: 4rpx solid #5F4FD9; color: #5F4FD9;padding: 24rpx ;border-radius: 10rpx;">
							<text>{{$t('Amount')}}</text>
							<view
								class="tn-flex tn-flex-1 tn-flex-col-center tn-flex-row-center tn-padding-left-sm tn-padding-right-sm">
								<input type="text" :placeholder="$t('Please fill in the amount')"
									style="font-size: 26rpx;color: #FFF;width: 100%;" v-model="formData.amount" />
							</view>
							<!-- <text class="tn-icon-down"></text> -->
						</view>
					</view>
				</view>

				<view>
					<button style="background-color: #5F4FD9;color: #FFF;margin-top: 60rpx;"
						@click="Submit">{{$t('config')}}</button>
				</view>
			</view>

		</view>
		<view class="tn-tabbar-height"></view>

		<tn-popup v-model="web1" mode="bottom" :closeBtn="true">
			<view style="background-color: #181818;padding-top: 70rpx;height: 70vh;">
				<web-view :webview-styles="{borderWidth:'0px'}" :src="qrcodeLink" style="width: 100%;height: 100%;"
					:fullscreen="false"></web-view>
			</view>
		</tn-popup>


		<tn-popup v-model="show" mode="bottom" :closeBtn="true">
			<view style="background-color: #181818;padding-top: 60rpx;">
				<view v-for="item in list" @click="setItemCode(item)"
					style="border-bottom: 2rpx solid #5F4FD92A;padding:32rpx 24rpx;color: #FFF;">
					<text class="tn-icon-circle-fill" v-if="listItem==item"></text>
					<text class="tn-icon-circle " v-else></text>
					<text> {{item}} </text>
				</view>
				<view class="tn-tabbar-height"></view>
			</view>
		</tn-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrcodeLink: '',
				show: false,
				web1: false,
				list: ['GH$'],
				listItem: 'GH$',
				type: 0,
				user: null,
				wallet: null,
				bankCodeList: [],
				wallList: [100, 200, 500, 1000, 2000, 5000, 10000, 50000, 100000],
				bank_name: "",
				formData: {
					"amount": "500", //金额 
				},
			}
		},
		mounted() {
			this.getUserInfo();
			this.$http.bankCodeList().then(res => {
				this.bankCodeList = res || [];
			});
		},
		methods: {
			setItemCode(item) {
				this.formData.amount = item;
				this.$forceUpdate();
			},
			//提交/
			Submit() { 
				for (let i in this.formData) {
					if (!this.formData[i]) {
						uni.showToast({
							title: `Please enter ` + i,
							icon: "none"
						})
						return;
					}
				}
				this.loadingIndex = uni.showLoading({
					title: "Loading",
				})
				this.$http.inpaysQrcode(this.formData).then(res => {
					if (res.data.status) {
						that.qrcodeLink = res.data.qrcode;
						this.web1 = true;
					}else{
						this.web1 = false;
					}
					uni.hideLoading(this.loadingIndex);
				}).catch(err => {
					console.log(err);
					uni.hideLoading(this.loadingIndex);
				})
			},
			// 获取钱包信息 
			getWall() {
				this.$http.wall().then(res => {
					if (res && res.wallet) {
						this.wallet = res.wallet;
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

	/deep/ iframe {
		border: 0rpx !important;
	}

	.wallItem {
		width: calc(25% - 20rpx);
		padding: 32rpx 0;
		background-color: rgba(255, 255, 255, 0.2);
		margin: 10rpx;
		border-radius: 10rpx;
	}

	.wallItemActivate {
		background-color: rgb(95, 79, 217) !important;
		color: #FFF !important;
	}

	.color {
		color: rgb(95, 79, 217);
	}

	.bg-color {
		background-color: rgb(95, 79, 217);
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