<template>
	<view class="language" v-if="show">
		<view class="language_item">
			<view class="language_title">
				<view class="" style="flex: 1;display: flex;">
					<text>{{$t('select_language')}}</text>
				</view>
				<text class="tn-icon-close" @click="close_window"></text>
			</view>

			<scroll-view scroll-y="true" style="height:600rpx;">
				<view class="list_content">
					<view class="list_content_item" @click="selectLanguage(item)" v-for="item in list"
						:class="select_item_key.country_name==item.country_name?'list_content_item_select':''">
						<image :src="item.cover" style="width: 60rpx;height: 40rpx;"></image>
						<text class="list_content_item_title">{{item.country_name}}</text>
						<text class="list_content_item_code">{{item.phone_area_code}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="language_button" @click="close_window">
				{{$t("config")}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Language",
		data() {
			return {
				list: [],
				select_item_key: {
					country_name: ''
				},
				show: true,
			};
		},
		onShow() {
			this.select_item_key = uni.getStorageSync("country");
			this.getDataList();
		},
		methods: {
			// 关闭窗口
			close_window() {
				uni.navigateBack();
			},
			// 选择语音
			selectLanguage(item) {
				uni.setStorageSync("lang", item.language);
				uni.setStorageSync("country", item);
				this.select_item_key = item;
				this.$http.updateLanguage({
					language: item.language
				}).then(res => {
					uni.reLaunch({
						url: "/pages/index/index",
					})
				})
			},
			// 获取地区信息
			getDataList() {
				this.list = uni.getStorageSync("countries");
			}
		}
	}
</script>

<style lang="scss">
	.language_button {
		background-color: rgb(156, 117, 235);
		color: #FFF;
		padding: 32rpx;
		text-align: center;
	}

	.list_content_item_select {
		background-color: #5f4fd952;
		color: #FFF;
	}

	.list_content_item_code {
		color: #F8f8f8;
		font-weight: 700;
	}

	.language {
		background-color: #16181D;
		height: 100vh;
		width: 100vw;
		position: fixed;
		left: 0;
		z-index: 9999;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.language_item {
			width: 600rpx;
			border-radius: 18rpx;
			overflow: hidden;
			background-color: rgba(255, 255, 255, 0.06);
		}
	}

	.language_title {
		display: flex;
		flex: 1;
		font-weight: bold;
		justify-content: center;
		color: #5f4fd9;
		align-items: center;
		font-size: 32rpx;
		padding: 24rpx;
	}

	.list_content {
		padding: 24rpx 0;
		display: flex;
		flex-wrap: wrap;

	}

	.list_content_item_title {
		display: flex;
		flex: 1;
		padding-left: 24rpx;
	}

	.list_content_item {
		color: #FFF;
		width: calc(100% - 20rpx);
		justify-content: center;
		align-items: center;
		padding: 24rpx 12rpx;
		margin: 10rpx 10rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

		color: #f8f8f8;
		border-radius: 8rpx;
		border: 1rpx solid #5f4fd9;

	}

	.tn-icon-close {}
</style>