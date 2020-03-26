<template>
	<view class="content column">
		<view class="top bg-green column with-100 align-height">
			<text class="font-bold top-integral text-while">{{hotitem.integrals || 0}}</text>
			<view class="text-size-below-normal center-algin" style="margin-left: -40upx;">
				<image class="top-warn" src="/static/images/icon_sigh.png"></image>
				<text class="text-while">兑换余额</text>
			</view>
			<view class="top-bot row with-100">
				<view class="bill center-algin">
					<text class="text-while">积分明细</text>
				</view>
				<view class="bill center-algin">
					<text class="text-while">积分订单</text>
				</view>
				<view class="bill center-algin">
					<text class="text-while">积分等级</text>
				</view>
			</view>
		</view>
		
		<view class="with-100 margin-top-20 column">
			<view class="content-title padding-width-20 bg-white center-algin">
				<text class="">积分兑换商品</text>
			</view>
		</view>
		<view class="hot-goods-content bg-white">
			<view class="hot-goods-item" hover-class="hot-goods-item-hover" v-for="(item,index) in hotitem.data" :key="index"
			 :class="index % 2 === 2 ? 'no-border-right' : ''" @click="toGoods(item)" >
				<view class="items column padding-20">
					<view class="center-algin item-images">
						<image class="hot-goods-image" :mode="aspectFill" :src="item.img1"></image>
					</view>
					<view class="hot-goods-name ellipsis-oneline">{{item.name}}</view>
					<view class="row align-height hot-goods-price space-between-algin">
						<text class="text-grey text-size-mim">{{item.price}}积分</text>
						<text class="level text-size-24 text-green padding-width-15">{{item.levelName}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				hotitem: {
					data: [
						{img1: '/static/errorImage.jpg',name: '',price: '',levelName: ''},
						{img1: '/static/errorImage.jpg',name: '',price: '',levelName: ''},
						{img1: '/static/errorImage.jpg',name: '',price: '',levelName: ''},
						{img1: '/static/errorImage.jpg',name: '',price: '',levelName: ''},
					]
				}
			}
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
@import url("./home.css");
page{background-color: #F3F3F3;}
view {font-size: 30upx;line-height: 1.8;display: flex;}
.with-100{width: 100%;}
.row{flex-direction: row;}
.column {flex-direction: column;}
.text-size-max{font-size: 80upx;}
.center-algin{justify-content: center;align-items: center;}
.justify-center{justify-content: center;}
.justify-between{justify-content: space-between;}
.align-height{align-items: center;}
.bg-white{background: #FFFFFF;}
.bg-green {background: #F44142;}
.text-size-24 {font-size: 24upx;}
.text-size-mim {font-size: 26upx;}
.text-grey {color: #9B9B9B;}
.text-while{color: #FFFFFF;}
.font-bold{font-weight: bold;}
.text-size-below-normal {font-size: 28upx;}
.bottom-line{border-bottom: #EEEEEE solid 1upx}
.margin-bottom-20{margin-bottom: 20upx;}
.margin-top-20{margin-top: 20upx;}
.margin-width-20{margin:0 20upx;}
.padding-width-20{padding: 0 20upx;}
.content{width: 100%;}
</style>
