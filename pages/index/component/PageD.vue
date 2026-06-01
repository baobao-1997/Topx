<template>
	<view class="pagesD tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#16181d">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
				<view class="">
					<text class="tn-margin-left tn-text-bold tn-text-xl leaf-color tn-color-white">{{$t('News')}}</text>
				</view>
			</view>
		</tn-nav-bar>

		<view
			:style="{paddingTop: vuex_custom_bar_height+'px',height:`calc( 100vh - ${vuex_custom_bar_height }px )`,overflow:'hidden'}">
			<z-paging ref="paging" v-model="dataList" @query="queryList" style="height: 100%; " :fixed="false">
				<view class="item  tn-flex tn-flex-direction-column     tn-flex-row-center   "
					v-for="(item,index) in dataList" :key="index">
					<view class="message-bg tn-flex tn-flex-col-center" @click="tn('/homePages/article')">
						<view class="">
							<view v-if="item.msg_type==1"
								class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-color-white tn-bg-orangered">
								<view class="tn-icon-image-text-fill"></view>
							</view>
							<view v-else
								class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-color-white tn-bg-cyan">
								<view class="tn-icon-menu-fill"></view>
							</view>
						</view>
						<view class="tn-padding-left-sm" style="width: 62vw">
							<view class="tn-flex tn-flex-row-between tn-flex-col-between">
								<view class="justify-content-item">
									<text class="tn-text-lg">{{item.msg_header}}</text>
								</view>
							</view>
							<view class="tn-padding-top-xs tn-text-ellipsis">
								<text class="tn-color-gray tn-text-sm">{{item.msg_description}}</text>
							</view>
						</view>
						<view class="" style="width: 20vw;">
							<view class="tn-flex tn-flex-row-right tn-margin-bottom-xs tn-margin-top-xs">
								<text class="tn-color-gray tn-text-sm">{{setTimeData(item.created_at)}}</text>
							</view>
							<view class="tn-flex tn-flex-row-right tn-margin-top-xs">
								<!-- <tn-badge backgroundColor="#EA5E55" fontColor="tn-color-white" :radius="30"
									margin="10rpx 0rpx 10rpx 10rpx"><text>2</text></tn-badge> -->
							</view>
						</view>
					</view>
				</view>
			</z-paging>

			<view class="" v-if="false">
				<!-- <view class="message-bg tn-flex tn-flex-col-center" @click="tn('/homePages/application')">
					<view class="">
						<view
							class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-color-white tn-bg-cyan">
							<view class="tn-icon-menu-fill"></view>
						</view>
					</view>
					<view class="tn-padding-left-sm" style="width: 62vw">
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">
							<view class="justify-content-item">
								<text class="tn-text-lg">应用消息</text>
							</view>
						</view>
						<view class="tn-padding-top-xs tn-text-ellipsis">
							<text class="tn-color-gray tn-text-sm">新版来袭，确定不了解一下？</text>
						</view>
					</view>
					<view class="" style="width: 20vw;">
						<view class="tn-flex tn-flex-row-right tn-margin-bottom-xs tn-margin-top-xs">
							<text class="tn-color-gray tn-text-sm">18:00</text>
						</view>
						<view class="tn-flex tn-flex-row-right tn-margin-top-xs">
							<tn-badge backgroundColor="#EA5E55" fontColor="tn-color-white" :radius="30"
								margin="10rpx 0rpx 10rpx 10rpx"><text>1</text></tn-badge>
						</view>
					</view>
				</view>

				<view class="message-bg tn-flex tn-flex-col-center" @click="tn('/homePages/article')">
					<view class="">
						<view
							class="icon15__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-color-white tn-bg-orangered">
							<view class="tn-icon-image-text-fill"></view>
						</view>
					</view>
					<view class="tn-padding-left-sm" style="width: 62vw">
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">
							<view class="justify-content-item">
								<text class="tn-text-lg">行业资讯</text>
							</view>
						</view>
						<view class="tn-padding-top-xs tn-text-ellipsis">
							<text class="tn-color-gray tn-text-sm">开一局，说开就开</text>
						</view>
					</view>
					<view class="" style="width: 20vw;">
						<view class="tn-flex tn-flex-row-right tn-margin-bottom-xs tn-margin-top-xs">
							<text class="tn-color-gray tn-text-sm">12:29</text>
						</view>
						<view class="tn-flex tn-flex-row-right tn-margin-top-xs">
							<tn-badge backgroundColor="#EA5E55" fontColor="tn-color-white" :radius="30"
								margin="10rpx 0rpx 10rpx 10rpx"><text>2</text></tn-badge>
						</view>
					</view>
				</view> -->
				<view class="message-bg tn-flex tn-flex-col-center" v-for="(item,index) in message" :key="index"
					@click="tn('/homePages/chat')">
					<view class="">
						<view class="logo-pic">
							<view class="logo-image">
								<view class=""
									:style="'background-image:url(' + item.mainImage + ');width: 90rpx;height: 90rpx;background-size: cover;'">
								</view>
							</view>
						</view>
					</view>
					<view class="tn-padding-left-sm" style="width: 62vw">
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">
							<view class="justify-content-item">
								<text class="tn-text-lg">{{ item.msg_header }}</text>
							</view>

						</view>
						<view class="tn-padding-top-xs tn-text-ellipsis">
							<text class="tn-color-gray tn-text-sm">{{ item.msg_description }}</text>
						</view>
					</view>
					<view class="" style="width: 20vw;">
						<view class="tn-flex tn-flex-row-right tn-margin-bottom-xs tn-margin-top-xs">
							<text class="tn-color-gray tn-text-sm">{{ item.time }}</text>
						</view>
						<view class="tn-flex tn-flex-row-right tn-margin-top-xs">
							<!-- <tn-badge backgroundColor="#EA5E55" fontColor="tn-color-white" :radius="30" margin="10rpx 0rpx 10rpx 10rpx"><text>6</text></tn-badge> -->
						</view>
					</view>
				</view>

			</view>

		</view>

		<view class="tn-tabbar-height"></view>

	</view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		name: 'PageD',
		data() {
			return {
				dataList: [],
				message: [],

			}
		},
		onLoad() {

		},
		methods: {
			setTimeData(e) {
				return dayjs(e).format("DD/MM/YYYY");
			},
			queryList(pageNo, pageSize) {
				this.$http.MsgList({page:pageNo}).then(res => {
					// 1-促销活动 ，2-普通通知 消息类型
					if (res.records) {
						this.$refs.paging.complete(res.records);
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