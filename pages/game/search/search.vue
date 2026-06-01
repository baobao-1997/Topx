<template>
	<view class="pagesD tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#16181d">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<view class="tn-margin-left" @tap.stop="goBack">
					<text class="tn-icon-left tn-color-white tn-margin-right-xs"></text>
					<text class="    tn-text-lg leaf-color tn-color-white">返回</text>
				</view>
			</view>
		</tn-nav-bar>
		<view class="tn-flex tn-flex-direction-column"
			:style="{paddingTop: vuex_custom_bar_height+'px',height:`calc( 100vh  )`,overflow:'hidden'}">
			<view class="tn-flex tn-margin-sm   tn-flex-col-center tn-flex-row-center"
				style=" border-radius: 20rpx;border:4rpx solid #232323;padding-left:24rpx;background-color: #232323;">
				<input v-model="formData.searchTerm" @confirm="search" type="text" placeholder="请输入关键词"
					style="width: 100%;color: #FFF;">
				<view @click="search"
					style="background-color: #16181D;width: 110rpx;height: 70rpx;border-radius: 20rpx;"
					class="tn-flex tn-flex-col-center tn-flex-row-center">
					<text class="tn-icon-search tn-text-lg tn-color-white"></text>
				</view>
			</view>
			<view class="tn-flex tn-flex-1 tn-flex-direction-column"
				style="padding:10rpx 20rpx;background-color: #232323;">
				<z-paging ref="paging" v-model="dataList" @query="queryList" style="height: 100%; " :fixed="false">
					<view class="  tn-flex tn-flex-wrap ">
						<block v-for="(item,index) in dataList">
							<view class="tn-flex" @click="goToGame(item.id)"
								style="width: calc(100vw  / 3  - 24rpx - 10rpx );height: calc( 100vw / 3 - 24rpx  ); margin: 10rpx;"
								:key="index">
								<lazy-image :src="item.cover" style="height: 100%;width: 100%;overflow: hidden; ">
								</lazy-image>
							</view>
						</block>
					</view>
				</z-paging>
			</view>
		</view>
	</view>
</template>

<script>
	import typeModel from '@/components/filter/game-type.vue';
	export default {
		components: {
			typeModel
		},
		data() {
			return {
				dataList: [],
				showVal: false,
				pageTitle: '',
				formData: {
					provider: 'all',
					category: "",
					searchTerm: "",
				},
			}
		},
		onLoad(params) {
			this.pageTitle = params.name;
			this.formData.category = params.name;
			this.formData.provider = params.provider;
			this.paramsData = params;
		},
		methods: {
			search() { 
				setTimeout(() => {
					this.$refs.paging.refresh();
				}, 50)
			},
			// open
			openModal() {
				this.showVal = true;
				this.$refs['typeModel'].openModals(); //关闭弹窗
			},
			confirm(e) {
				this.formData.searchTerm = e.searchTerm;
				setTimeout(() => {
					this.$refs.paging.refresh();
				}, 50)
			},
			queryList(pageNo, pageSize) {
				this.$http.gameList({
					numPerPage: pageSize + 10,
					page: pageNo,
					searchTerm: this.formData.searchTerm,
					category: "",
					provider: "all",
				}).then(res => {
					if (res.games) {
						this.$refs.paging.complete(res.games.data);
					} else {
						this.$refs.paging.complete([]);
					}
				}).catch((err) => {
					this.$refs.paging.complete(false);
				})
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pagesD {
		background-color: #16181d;
		height: 100vh;
		overflow: hidden;
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


	.message-bg {
		border-radius: 18rpx;
		margin: 20rpx 30rpx;
		padding: 20rpx;
		color: #FFF;
	}

	// 四个角渐变底色
	.message-fixed {
		position: fixed;
		top: 0;
		width: 100%;
		transition: all 0.25s ease-out;
		z-index: 100;
	}

	/* 图标容器1 start */
	.icon1 {
		&__item {
			width: 30%;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 100rpx;
				height: 100rpx;
				font-size: 60rpx;
				border-radius: 50%;
				margin-bottom: 18rpx;
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
					background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
				}
			}
		}
	}

	/* 图标容器15 start */
	.icon15 {
		&__item {
			width: 30%;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 90rpx;
				height: 90rpx;
				font-size: 60rpx;
				border-radius: 18rpx;
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

	/* 用户头像 start */
	.logo-image {
		width: 90rpx;
		height: 90rpx;
		position: relative;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: center;
		// border: 1rpx solid rgba(255,255,255,0.05);
		// box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 18rpx;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom));
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}
</style>