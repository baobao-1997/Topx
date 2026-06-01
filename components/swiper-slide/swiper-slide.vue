<template>
	<view style="width: 100%;" class="max-swiper-12">
		<block v-if="list.length>0 ">
			<swiper :indicator-dots="false" :autoplay="false" :next-margin="itemMargin[current]" class="dynamic-swiper"
				:style="{height:rowsHeight[current]+'px'}" :current="current" @change="swiperChang">
				<swiper-item class="swiper-item" v-for="item in list">
					<view
						style="width:calc( 33.33333% - 12rpx);margin: 6rpx;display: inline-block;vertical-align: top; "
						v-for="val in item" @click="goToGame(val.id)">
						<view style="width: 100%;border-radius: 10rpx;overflow: hidden;">
							<image :src="val.cover" mode="widthFix" style="width: 100%;"></image>
						</view>
						<view style="width: 100%;overflow: hidden;padding: 0 8rpx;">
							<text
								style="color: #FFF;text-align: left;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display: block;">{{val.game_name}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</block>
	</view>
</template>

<script>
	export default {
		name: "swiper-slide",
		props: {
			DataList: {
				default: [],
				type: Array,
			},
			leng: {
				default: 9,
				type: Number,
			}
		},
		data() {
			return {
				itemMargin: ['0', '0', '0', '0', '0'],
				current: 0,
				// 动态高度
				rowsHeight: [370, 370, 370, 370, 370, 370, 370],
				list: [],
			};
		},
		mounted() {
			this.setList();
			this.$nextTick(() => {
				setTimeout(() => {
					this.setRowHeight();
				}, 50)
			})
		},
		methods: {
			swiperChang(index) {
				let {
					current
				} = index.detail;
				this.current = Number(current);
			},
			setList() {
				this.list = this.chunk(this.DataList, this.leng);

			},
			chunk(array, size) {
				const chunkCount = Math.ceil(array.length / size);
				return Array.from({
						length: chunkCount
					}, (_, index) =>
					array.slice(index * size, (index + 1) * size)
				);
			},
			// 动态计算高度 传入长度
			setRowHeight(len) {
				var that = this;
				// 获取节点信息
				const query = uni.createSelectorQuery().in(this);
				query.select('.max-swiper-12').boundingClientRect(data => {
					if (data) {
						let itemWidth = (data.width / 3) - uni.upx2px(10);
						let itemHeight = 0;
						let imgWidth = itemWidth; //图片宽度
						let imgHeight = itemWidth; //图片高度 
						let othenHeight = 60
						that.list.forEach((item, index) => {
							let Num = 1
							if (item.length <= 3) {
								Num = 1
							}
							if (item.length > 3 && item.length <= 6) {
								Num = 2
							}
							if (item.length > 6) {
								Num = 3
							}
							if (item.length >= 9) {
								that.itemMargin[index] = '40px';
							} else {
								that.itemMargin[index] = '0px';
								othenHeight = 80
							}
							that.rowsHeight[index] = itemWidth * Num + othenHeight;
							this.$forceUpdate();
						})
					}
				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dynamic-swiper {
		transition: all 0.3s ease-in 0s;
	}
</style>