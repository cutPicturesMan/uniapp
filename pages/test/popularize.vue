<!-- 我的推广 -->
<template>
	<view class="conter">
		<view class="abox">
			<text class="a" style="float: left;">已分享 {{ sharenumber }} 人</text>
			<text class="a" style="float: right; " @click="myQRcode()">查看我的分享码</text>
		</view>
		<view class="detail-box" v-for="(item,index) in list" :key='index'>
		<view class="box-img">
			<image :src="qiniu + item.image_id"></image>
		</view>
		<view class="box-title">
			<text v-if="item.nickname!=''">{{item.nickname}}</text>
			<text v-else>昵称未填写</text><br>
			<text style="margin-top:15upx;color: #666666; font-size: 23upx;">{{item.time}}</text>
		</view>
		
		<view class="box-number">
		<text> {{item.phone}}</text>
		</view>
	</view>
		<view class="imageContent" v-if="sharenumber==0">
			<view class="imageOne">
				<image src="http://mp.emshop.eonfox.com/zrhzstatic/muying/invite.png" mode=""></image>
				</view>
			<view class="imageTwo">...</view>
			<view class="imageOne">
				<image src="http://mp.emshop.eonfox.com/zrhzstatic/muying/order.png" mode=""></image>
				</view>
			<view class="imageTwo">...</view>
			<view class="imageOne">
				<image src="http://mp.emshop.eonfox.com/zrhzstatic/muying/earnings.png" mode=""></image>
			</view>
		</view>
		<view class="titleContent"  v-if="sharenumber==0">
			<view class="imageOne">
				邀请好友
				</view>
			<view class="imageTwo"></view>
			<view class="imageOne">
				好友下单
				</view>
			<view class="imageTwo"></view>
			<view class="imageOne">
				获得收益
			</view>
		</view>

		<uni-load-more v-if="sharenumber!=0" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import eonfox from '@/components/eonfox/eonfox.js';
import fns from '@/components/eonfox/fns.js';
var ef = new eonfox();
export default {
	data() {
		return {
			list: [],
			sharenumber: 0,
			qiniu: '',
			page: 1,
			loadingType: 0,
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			}
		};
	},
	// 			 onShow: function () {
	// 			  this.load(e);
	// 			},
	components: { uniLoadMore },
	onReachBottom() {
		if (this.loadingType !== 0) {
			return;
		}
		this.loadingType = 1;
		var _this = this;
		_this.page++;
		uni.showLoading({
			title: '正在加载',
			success() {
				ef.submit({
					request: {
						s: ['USERSELFSONLIST', [{ page: _this.page }]]
					},
					callback: function(data) {
						fns.success('加载完成', function() {
							console.log('more', data);
							var res = fns.checkError(data, 's', function(erron, error) {
								fns.err(error);
							});
							if (res.s.data && res.s.data.length) {
								console.log(res);
								var re = res.s.data;
								console.log('详细', _this.list);
								for (var i of re) {
									_this.list.push(i);
								}
								if (res.s.data.length < 10) {
									_this.loadingType = 2;
								} else {
									_this.loadingType = 0;
								}
							} else {
								_this.loadingType = 2;
							}
						});
					},
					error(err) {
						fns.err('err', err, 1);
					}
				});
			}
		});
	},
	onLoad: function() {
		var _this = this;
		ef.submit({
			request: {
				s: ['USERSELFSONLIST', [{ page: _this.page }]],
				sharenumber: ['USERSELFSONCOUNT'],
				config: ['APPLICATIONCONFIG'] //获取七牛云地址
			},
			callback: function(data) {
				var list = fns.checkError(data, 's', function(erron, error) {
					uni.showToast({
						title: data.data.s.error,
						icon: 'none'
					});
				});
				if (list.config && list.config.qiniu_domain) {
					_this.qiniu = list.config.qiniu_domain;
				}
				_this.list = list.s.data;
				if (list.s.data.length < 10) {
					_this.loadingType = 2;
				} else {
					_this.loadingType = 0;
				}
				console.log('列表', list);
				if (list.sharenumber) _this.sharenumber = list.sharenumber;
			},
			error: function(err) {
				fns.err('', err, 1);
			}
		});
	},

	methods: {
		myQRcode() {
			uni.navigateTo({
				url: '../../pagesB/QRCode/QRCode'
			});
		}
	}
};
</script>

<style>
.conter {
	width: 100%;
	height: auto;
	font-size: 28upx;
}
.abox {
	width: 96%;
	height: 80upx;
	background-color: #f29b87c4;
	line-height: 80upx;
	padding-left: 2%;
	padding-right: 2%;
}
.a {
	color: #fff;
	font-size: 32upx;
}
.detail-box {
	width: 98%;
	height: 75px;
	font-size: 15px;
	padding-left: 2%;
	border-bottom: 1px solid #eaeaea;
	display: flex;
	background-color: #fbfbfb;
}
.box-img {
	width: 17%;
	height: 60px;
	float: left;
	padding-top: 5px;
}
.box-title {
	width: 30%;
	height: 60px;
	float: left;
	padding-top: 20px;
	padding-left: 3%;
	color: #da6c3f;
	font-size: 30upx;
}
.box-number {
	width: 45%;
	float: left;
	height: 60px;
	line-height: 80px;
	text-align: center;
	color: #333333;
}
.box-label {
	position: absolute;
	width: 160upx;
	height: 40upx;
	border: #f1f1f3 1px solid;
	right: 5upx;
	text-align: center;
	border-radius: 8px;
	background-color: #f1f1f3;
	font-size: 23upx;
	line-height: 40upx;
}
.box-img image {
	width: 120rpx;
	height: 120rpx;
	border-radius: 100%;
}
.imageContent{
	width: 80%;
	height: 100upx;
	display: flex;
	padding-left: 14%;
	margin-top: 300upx;
}
.titleContent{
	width: 80%;
	height: 100upx;
	display: flex;
	padding-left: 14%;
	margin-top: 40upx;
	font-size: 26upx;
}
.imageOne{
	width: 120upx;
	height: 120upx;
	text-align: center;
	color: #DE7D67;
}
.imageOne image{
	width: 120upx;
	height: 120upx;
}
.imageTwo{
	width: 100upx;
	height: 100upx;
	line-height: 120upx;
	text-align: center;
	color:#f29b87c4 ;
}

</style>
