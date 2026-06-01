<template>
	<view class="pagesA tn-safe-area-inset-bottom">
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#F6F6F600">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left tn-color-white">

				<view class="custom-nav__logo" @tap.stop="goBack">
					<view class="tn-icon-left leaf-color tn-text-bold"></view>
				</view>
				<view class="" @tap.stop="goBack">
					<text class="  tn-text-bold tn-text-xl leaf-color tn-shadow-blue"> 返回</text>
				</view>
				<view class="tn-flex tn-flex-1">

				</view>
				<view @tap.stop="goToRecharge">
					<text class="tn-icon-pay-fill"></text>
					<text class="  tn-text-bold tn-text-xl leaf-color  tn-padding-right ">充值</text>
				</view>
			</view>
		</tn-nav-bar>
		<web-view :src="gameUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gameUrl: "",
			};
		},
		onLoad(params) {
			// 判断是否已经登录
			let LoginUser=uni.getStorageSync("user");
			if(LoginUser){
				this.getGameInfo(params);
			}else{
				uni.showToast({
					title:"请登录后游玩",
					icon:"none",
					success() {
						uni.reLaunch({
							url:"/pages/login/login",
						})
					}
				})
			}
		},
		methods: {
			
			// 返回
			goBack(e) {
				
				uni.navigateBack();
			},
			// 获取游戏信息
			getGameInfo(params) {
				this.$http.gamesSingle({
					id: params.gameId
				}).then(res => {
					if (res.gameUrl) {
						this.gameUrl = res.gameUrl;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #16181d;
	}

	/* 自定义导航栏内容 start */
	.custom-nav {
		width: 100%;

		&__logo {
			padding-left: 15rpx;
		}
	}
</style>