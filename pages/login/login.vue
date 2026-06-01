<template>
	<view class="tn-safe-area-inset-bottom">
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#16181D">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<view class="custom-nav__logo" @click="tn">
					<view class="game-pic" style="background-image:url('/static/LOGO.png')">
						<view class="game-image ">
						</view>
					</view>
				</view>
			</view>
		</tn-nav-bar>
		<view class="" :style="{paddingTop: vuex_custom_bar_height + 10 + 'px'}">
			<view class="tn-text-center  tn-text-xl-xxl  tn-color-gray--dark tn-margin-xl">
				Welcome TopX
			</view>
			<view class="tn-flex tn-flex-1 tn-flex-col-center tn-flex-row-center tn-margin-xl">
				<view class="tn-flex"
					style="width: 380rpx;text-align: center;border: 2rpx solid #5F4FD9;border-radius: 10rpx;overflow: hidden;">
					<view @click="loginType=0" class=" tn-padding-sm tn-flex-1 tn-text-lg tn-text-center  "
						:class="loginType==0?'tn-bg-bluepurple tn-color-white':'tn-color-bluepurple'">
						登录
					</view>
					<view @click="loginType=1" class="tn-padding-sm tn-flex-1 tn-text-lg tn-text-center  tn-text-bold"
						:class="loginType==1?'tn-bg-bluepurple tn-color-white':'tn-color-bluepurple'" style="">
						注册
					</view>
				</view>
			</view>
			<!-- 登录 -->
			<view class=" tn-margin-right-xl  tn-margin-left-xl" v-show="loginType==0">
				<tn-form :model="LoginForm" ref="LoginForm" :errorType="['toast']">
					<view class="tn-input-box">
						<tn-form-item label="" prop="phone" style="padding:10rpx 0">
							<view class="input-left" @click="goToSlectLanguage" style="margin: 0;padding:0 8rpx;">
								<image :src="language.cover" style="width:50rpx;height:35rpx;"></image>
								<text
									class="  tn-text-xs tn-color-white tn-margin-left-xs">{{language.phone_area_code}}</text>
								<text class="tn-icon-down tn-text-xs tn-color-white tn-margin-left-xs"></text>
							</view>
							<tn-input v-model="LoginForm.phone" placeholder="请输入电话" :border="false" />
						</tn-form-item>
					</view>
					<view class="tn-input-box tn-margin-top-lg">
						<tn-form-item label="" prop="password" style="padding:10rpx 0">
							<tn-input type="password" :border="false" placeholder="请输入密码"
								v-model="LoginForm.password" />
						</tn-form-item>
					</view>
				</tn-form>
				<view class="tn-margin-top-sm tn-margin-left-sm tn-color-gray--dark">
					<text>忘记密码</text>
				</view>

				<view class="tn-margin-top-lg">
					<button class="tn-bg-bluepurple tn-color-black" @click="Login">登录</button>
				</view>
			</view>
			<!-- 注册 -->
			<view class=" tn-margin-right-xl  tn-margin-left-xl" v-show="loginType==1">

				<tn-form :model="RegisterForm" ref="RegisterForm" :errorType="['toast']">
					<view class="tn-input-box">
						<tn-form-item label="" prop="phone" style="padding:10rpx 0">
							<view class="input-left" @click="goToSlectLanguage" style="margin: 0;padding:0 8rpx;">
								<image :src="language.cover" style="width:40rpx;" mode="widthFix"></image>
								<text
									class="  tn-text-xs tn-color-white tn-margin-left-xs">{{language.phone_area_code}}</text>
								<text class="tn-icon-down tn-text-xs tn-color-white tn-margin-left-xs"></text>
							</view>
							<tn-input v-model="RegisterForm.phone" placeholder="请输入电话" :border="false" />
						</tn-form-item>
					</view>
					<view class="tn-input-box tn-margin-top-lg">
						<tn-form-item label="" prop="password" style="padding:10rpx 0">
							<tn-input type="password" :border="false" placeholder="请输入密码"
								v-model="RegisterForm.password" />
						</tn-form-item>
					</view>
				</tn-form>
				<!-- 协议 -->
				<view style="color: #FFF; margin-top: 30rpx;">
					<tn-checkbox-group>
						<tn-checkbox @change="checkboxChange " :iconSize="25" activeColor="#5F4FD9" name="agreement">
							<text class="tn-color-gray  ">我同意用户协议并确认我已年满18岁</text> </tn-checkbox>
						<tn-checkbox @change="checkboxChange " :iconSize="25" activeColor="#5F4FD9" name="term_a"><text
								class="tn-color-gray  ">我同意 条款和条件</text> </tn-checkbox>
					</tn-checkbox-group>
				</view>
				<view class="tn-margin-top-lg">
					<button class="tn-bg-bluepurple tn-color-black" @click="Register">注册</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				loginType: 0,
				language: {
					phone_area_code: "+254",
					cover: "https://pc.topx666888.com/livewire-tmp/kenniya.png"
				},
				// 登录
				LoginForm: {
					phone: "",
					password: "",
				},
				// 注册
				RegisterForm: {
					agreement: false,
					guest_id: "",
					password: "",
					phone: "",
					reference_code: "",
					register_country_id: "",
					spin_data: "",
					term_a: true,
				},
				rules: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}, {
						min: 5,
						message: '账号不能少于5个字',
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}, {
						min: 6,
						message: '密码不能少于5个字',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		onShow() {
			this.getCountry();
		},
		onReady() {
			this.$refs.LoginForm.setRules(this.rules);
			this.$refs.RegisterForm.setRules(this.rules);
		},
		methods: {
			// 获取语言缓存
			getCountry() {
				let countries = uni.getStorageSync("countries");
				let country = uni.getStorageSync("country");
				if (country) {
					this.language = country;
				} else {
					this.language = countries[0];
				}
			},
			checkboxChange(e) {
				this.RegisterForm[e.name] = e.value;
				this.$forceUpdate();
			},
			// 打开语言选择
			goToSlectLanguage() {
				uni.navigateTo({
					url: "/pages/language/language",
				})
			},
			tn(url) {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			// 登录
			Login() {
				this.$refs.LoginForm.validate((v) => {
					let reg = /['(']/g;
					if (v) {
						if (this.language && !reg.test(this.LoginForm.phone)) {
							this.LoginForm.phone =
								`(${Number(this.language.phone_area_code)})${this.LoginForm.phone}`
						}
						this.$http.Login(this.LoginForm).then(res => {
							if (res.access_token) {
								uni.setStorageSync("token", res.access_token);
								uni.setStorageSync("user", res.user);
								uni.reLaunch({
									url: "/pages/index/index",
								})
							}
						})
					}

				})
			},
			// 注册
			Register() {
				let reg = /['(']/g;
				this.$refs.RegisterForm.validate((v) => {
					if (v) {
						if (this.language && !reg.test(this.LoginForm.phone)) {
							this.LoginForm.phone =
								`(${Number(this.language.phone_area_code)})${this.LoginForm.phone}`
						}
						this.$http.Register(this.RegisterForm).then(res => {
							console.log(res);
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .uni-input-input {
		color: #FFF
	}

	/deep/ .tn-form-item--right__content {
		color: #FFF;
	}

	.tn-input-box {
		border: 1rpx solid #5F4FD9;
		border-radius: 16rpx;
		background-color: rgba(255, 255, 255, 0.05);
		padding: 0 24rpx
	}

	.input-item {
		background-color: rgba(153, 153, 153, 0.1);
		border: 2rpx solid rgba(153, 153, 153, 0.1);
		padding: 24rpx 10rpx;
		border-radius: 16rpx;
		justify-content: center;
		align-items: center;
	}

	.input-left {
		margin-right: 12rpx;
		border-radius: 2rpx;
		padding: 10rpx 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;

		.areacode {
			padding-left: 6rpx;
			display: flex;
			color: #FFF;
		}
	}

	.input-center {}

	.input-right {}

	page {
		background-color: #16181D;
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
</style>