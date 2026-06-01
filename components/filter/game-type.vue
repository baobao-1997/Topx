<template>
	<view v-if="openModal" class="wx-modal">
		<view class="wam__mask" @touchmove.prevent="" @tap.stop="closeModal"></view>

		<!-- 内容区域 -->
		<view class="wam__wrapper" style="color: #FFF;">
			<!-- 关闭按钮 -->
			<view class="wam__close-btn" @tap.stop="closeModal">
				<tn-button size="lg" shape="icon" backgroundColor="#00000000" fontColor="#AAAAAA">
					<text class="tn-icon-close"></text>
				</tn-button>
				<!-- <text class="tn-icon-close-fill tn-color-white"></text> -->
			</view>
			<view class="tn-margin-left tn-flex tn-flex-col-center">
				<view class="tn-text-bold tn-text-lg"> </view>
			</view>

			<view class="tn-margin-top-sm" style="border-top: 1rpx solid #16181D;">

				<scroll-view scroll-y="true" style="max-height: 55vh;">
					<view class="tn-margin-left tn-flex tn-flex-col-center tn-margin-top-sm">
						<view class="  tn-text-lg">搜索</view>
					</view>
					<view class="tn-flex tn-flex-wrap tn-padding-sm  "
						style="margin:10rpx 20rpx 0 20rpx;background-color: #1e1e1e;">
						<input type="text" placeholder="请输入关键词" v-model="formData.searchTerm" />
					</view>
					<view class="tn-margin-left tn-flex tn-flex-col-center tn-margin-top-sm">
						<view class="  tn-text-lg">Category</view>
					</view>
					<view class="tn-flex tn-flex-wrap tn-padding-top-sm" style="margin: 0 20rpx;">
						<view v-for="(item, index) in categoryList" :key="index"
							style="position: relative;z-index: 10;">
							<view :class="formData.category==item.name?'select_category':'select_item'"
								@click="setKeyData('category',item.name)"
								style="background-color: #1e1e1e;margin: 5rpx;padding:24rpx 12rpx;border-radius: 6rpx;width:226rpx;">
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
					<view class="tn-margin-left tn-flex tn-flex-col-center tn-margin-top-sm">
						<view class="  tn-text-lg">Provider</view>
					</view>
					<view class="tn-flex tn-flex-wrap tn-padding-top-sm" style="margin: 0 20rpx;">
						<view v-for="(item, index) in providerList" :key="index"
							style="position: relative;z-index: 10;">
							<view @click="setKeyData('provider',item.id)"
								:class="formData.provider==item.id?'select_provider':'select_item'"
								style="background-color: #1e1e1e;margin: 5rpx;padding:24rpx 0;border-radius: 6rpx;width:calc(100vw/3 - 24rpx);overflow: hidden;">
								<image :src="item.cover" style="width:100%;height: calc(80rpx);"></image>
							</view>
						</view>
					</view>

				</scroll-view>

				<!-- 悬浮按钮-->
				<view class="tn-flex tn-footerfixed" style="border-top: 1rpx solid #16181D;">
					<view class="tn-flex-1 justify-content-item tn-text-center">
						<tn-button backgroundColor="rgb(156, 117, 235) " padding="40rpx 0" width="100%" :fontSize="28"
							fontColor="#FFFFFF" shape="round" @click="Confirm">
							<text class="">Confirm</text>
						</tn-button>
					</view>
				</view>

				<view class="tn-tabbar-height"></view>


			</view>

		</view>
	</view>
</template>

<script>
	export default {
		options: {
			// 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
			virtualHost: true
		},
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				openModal: false,
				categoryList: [],
				providerList: [],
				formData: {
					searchTerm: "",
					category: "",
					provider: "all"
				}
			}
		},
		watch: {
			value: {
				handler(val) {
					this.openModal = val
				},
				immediate: true
			}
		},
		created() {
			this.getData();
			this.getData2();
		},
		methods: {
			setKeyData(key, val) {
				if (this.formData[key] == val) {
					this.formData[key] = "";
				} else {
					this.formData[key] = val;
				}
				this.$forceUpdate();
			},
			openModals() {
				this.value = true;
				// this.openModal = true;
			},
			Confirm() {
				this.$emit("confirm", this.formData);
			},
			getData2() {
				this.$http.GamesAll().then(res => {
					if (res.providers) {
						this.providerList = res.providers;
						console.log(this.providerList);
					}
				})
			},
			// 获取数据
			getData() {
				this.categoryList = uni.getStorageSync("categories") || [];

			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			// 关闭弹框
			closeModal() {
				this.value = false;
			},

		}
	}
</script>

<style lang="scss" scoped>
	/* 文字截取*/
	.clamp-text-1 {
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.select_item {
		border: 2rpx solid #1E1E1E;
	}

	.select_category,
	.select_provider {
		border: 2rpx solid rgb(156, 117, 235);
	}

	.select_category::after,
	.select_provider::after {
		content: " ";
		position: absolute;
		z-index: 999;
		top: 5rpx;
		right: 5rpx;
		background-image: url("@/static/type_select.png");
		background-repeat: no-repeat;
		background-size: 100%;
		width: 36rpx;
		height: 36rpx;
	}

	.clamp-text-2 {
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}


	.wx-modal {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99998 !important;

		view {
			box-sizing: border-box;
		}

		.image {
			width: 100%;
			height: 100%;
			border-radius: inherit;
		}

		.wam {
			z-index: 9999 !important;

			/* mask */
			&__mask {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				opacity: 0;
				animation: showMask 0.25s linear 0s forwards;
			}

			/* close-btn */
			&__close-btn {
				position: absolute;
				top: 20rpx;
				right: 10rpx;
				z-index: 99999;
				font-size: 40rpx;
			}

			/* wrapper */
			&__wrapper {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				background-color: #16181D;
				border-radius: 40rpx 40rpx 0rpx 0rpx;
				padding-top: 40rpx;
				// padding-bottom: 40rpx;
				// padding-bottom: calc(constant(safe-area-inset-bottom) + 40rpx);
				// padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);
				transform-origin: center bottom;
				transform: scaleY(0);
				animation: showWrapper 0.25s linear 0s forwards;
				z-index: 99999;
			}

		}
	}

	@keyframes showMask {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes showWrapper {
		0% {
			transform: scaleY(0);
			opacity: 0;
		}

		100% {
			transform: scaleY(1);
			opacity: 1;
		}
	}

	/* 底部悬浮按钮 start*/
	.tn-tabbar-height {
		min-height: 20rpx;
		height: calc(40rpx + env(safe-area-inset-bottom) / 2);
		height: calc(40rpx + constant(safe-area-inset-bottom));
	}

	.tn-footerfixed {
		width: 100%;
		margin-bottom: calc(env(safe-area-inset-bottom) - 20rpx);
		padding: 30rpx;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0);

	}

	/* 底部悬浮按钮 end*/

	/* 内容 start*/
	.real-content {
		// box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
		border-radius: 15rpx;
		// background-color: rgba(255, 255, 255, 1);
		margin: 10rpx 10rpx 30rpx 10rpx;
	}

	.image-real {
		height: 200rpx;
		font-size: 16rpx;
		font-weight: 300;
		position: relative;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.image-pic2 {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
		border-radius: 15rpx;
	}
</style>