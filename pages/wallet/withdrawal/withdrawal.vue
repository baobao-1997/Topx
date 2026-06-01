<template>
	<view class="pagesE tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="true" :backTitle="$t('back')" :title="$t('MakeMoney')" :bottomShadow="true"
			backgroundColor="#F6F6F600">
			<text class="tn-color-white">{{$t('Withdrawal')}}</text>
		</tn-nav-bar>
		<view class="mine-fixed"></view>

		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}"
			style="z-index: 1 !important;position: relative;">
			<view class="tn-padding-sm tn-margin-sm tn-color-white  "
				style="background-color: #181818;border-radius: 20rpx ;">
				<view class="  tn-padding-sm">
					<text class=" tn-flex tn-margin-bottom-sm ">{{$t('Wallet')}}</text>
					<view class="tn-flex" style="border: 2rpx solid #5F4FD9 ;width: max-content;">
						<view class="tn-flex tn-padding-sm    " @click="type=0"
							:class="type==0?'tn-bg-bluepurple tn-color-white':''">
							{{$t('Savings account')}}
						</view>
						<view class="tn-flex tn-padding-sm    " @click="type=1"
							:class="type==1?'tn-bg-bluepurple tn-color-white':''">
							{{$t('Cash account')}}
						</view>
					</view>
				</view>
				<view class="  tn-padding-sm" style="border-bottom: 1rpx solid rgba(255,255,255,0.08);">
					<text class="tn-flex tn-margin-bottom-sm">{{$t('Cardholders name')}}</text>
					<view>
						<input type="text" v-model="formData.customer_name"
							:placeholder="$t('Enter the name of the account holder')">
					</view>
				</view>

				<view class="  tn-padding-sm" style="border-bottom: 1rpx solid rgba(255,255,255,0.08);">
					<text class="tn-flex tn-margin-bottom-sm">{{$t('Bank code')}}</text>
					<view class="tn-flex tn-flex-nowrap" style="position: relative;">
						<view class="tn-flex tn-flex-1">
							<input type="text" v-model="bank_name" :placeholder="$t('Please select the bank code')">
						</view>
						<view @click="show=true" style="background-color:#5F4FD9;padding:10rpx;border-radius: 10rpx; ">
							<text class="tn-icon-menu-square-select tn-text-lg"></text>
							<text>{{$t('Please select')}}</text>
						</view>
					</view>
				</view>

				<view class="  tn-padding-sm" style="border-bottom: 1rpx solid rgba(255,255,255,0.08);">
					<text class="tn-flex tn-margin-bottom-sm">{{$t('Bank account')}}</text>
					<view>
						<input type="text" v-model="formData.amount"
							:placeholder="$t('Please fill in your bank card account')">
					</view>
				</view>
				<view class="  tn-padding-sm" style="border-bottom: 1rpx solid rgba(255,255,255,0.08);">
					<text class="tn-flex tn-margin-bottom-sm"> {{$t('Amount')}}</text>
					<view>
						<input type="text" v-model="formData.account_number"
							:placeholder="$t('Please fill in the amount')">
					</view>
				</view>
				<view class="  tn-padding-sm">
					<view>{{$t("Available")}}：{{wallet.currency}}{{wallet.balance_withdrawal}}</view>
				</view>
				<view style="width: 100%;text-align: right;color: #5F4FD9;" class="tn-margin-top tn-text-lg"
					@click="setAcceptTerms">
					<text class="tn-icon-success-circle-fill " v-if="formData.accept_terms"></text>
					<text class="tn-icon-success-circle   " v-else></text>
					<text>{{$t('Agree to the transfer agreement')}}</text>
				</view>
				<view>
					<button style="background-color: #5F4FD9;color: #FFF;margin-top: 60rpx;"
						@click="Submit">{{$t('config')}}</button>
				</view>
			</view>

		</view>
		<view class="tn-tabbar-height"></view>
		<tn-popup v-model="show" mode="bottom" :closeBtn="true">
			<view style="background-color: #181818;padding-top: 60rpx;">
				<view v-for="item in bankCodeList" @click="setItemCode(item)"
					style="border-bottom: 2rpx solid #5F4FD92A;padding:32rpx 24rpx;color: #FFF;">
					<text class="tn-icon-circle-fill" v-if="formData.bank_code==item.code"></text>
					<text class="tn-icon-circle " v-else></text>
					<text> {{item.name}} </text>
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
				show: false,
				type: 0,
				user: null,
				wallet: null,
				bankCodeList: [],
				bank_name: "",
				formData: {
					"amount": "", //金额
					"bank_code": '', //银行编码
					"account_number": "", //卡号
					"customer_name": "", //持卡人名字
					"accept_terms": true //同意转帐
				},
			}
		},
		mounted() {
			this.getUserInfo();
			// 编码
			this.$http.bankCodeList().then(res => {
				this.bankCodeList = res || [];
			});
		},
		methods: {
			setItemCode(item) {
				this.formData.bank_code = item.code;
				this.bank_name = item.name;
				this.show = false;
				this.$forceUpdate();
			},
			setAcceptTerms() {
				this.formData.accept_terms = !this.formData.accept_terms;
				this.$forceUpdate();
			},
			//提交/
			Submit() {

				// 
				for (let i in this.formData) { 
					if (!this.formData[i]) {
						uni.showToast({
							title: `Please enter ` + i,
							icon: "none"
						})
						return;
					} 
				}

				if (this.type == 0) {
					this.$http.inpaysWithdrawal(this.formData).then(res => { 
						console.log("res::",res)
					}).catch(err=>{
						console.log(err);
					})
				} else {
					this.$http.inpayslotterywithdrawal(this.formData).then(res => { 
						 console.log("res::",res)
					}).catch(err=>{
						console.log(err);
					})
				}
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