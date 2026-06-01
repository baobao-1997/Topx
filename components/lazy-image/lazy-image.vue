<template>
	<view class="imgs">
		<view class="imgs  img-error" v-if="!show">
			<!-- <view><text class="tn-icon-loading icon" style="font-size: 64rpx;"></text></view> -->
			<view class="double-spinner"></view>
		</view>
		<image v-show="show" class="imgs borderRadius" :src="src" @load="imgLoad" @error="imgError"></image>
	</view>
</template>

<script>
	export default {
		name: "lazy-image",
		props: {
			src: {
				default: '',
				type: String,
			}
		},
		data() {
			return {
				show: false,
				IndexId: new Date().getTime(),
			};
		},
		methods: {
			// 加载失败
			imgError(e) {
				if (e.detail.errMsg) {
					this.show = false;
				}
			},
			// 图片加载
			imgLoad(e) {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imgs {
		width: 100% !important;
		height: 100% !important;
		overflow: hidden !important;
	}

	.borderRadius {
		border-radius: 10rpx;
	}

	.img-error {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		flex-direction: column;
		background-color: #303030;
		border-radius: 20rpx;
		color: #FFF;

	}

	.icon {
		transition: spin 0.5s ease;
	}

	.double-spinner {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		border: 6rpx solid transparent;
		border-top-color: #3498db;
		border-bottom-color: #3498db;
		animation: spin 0.8s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>