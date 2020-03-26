<template>
	<view class="content" >
		<uni-password ref="secrity" @input="onInput" @confirm="onConfirms" @back="paymentPasswordBack" v-if="pay_pass_display">
			请输入6位支付密码
		</uni-password>
		<view  v-if="!h5Pay">
		<view class="status-contents">
			<view class="status top-view"></view>
		</view>
		<!-- 页面标题 -->
		<!-- #ifdef APP-PLUS -->
		<view class="title-box" @click="back">
			<uni-icon class="icon" type="arrowleft" size="28" color="#333"></uni-icon>
			<text class="title">购买积分</text>
		</view>
		<!-- #endif -->
		<!-- 中间部分 -->
		<view class="buy-box">
			<view class="pay-method">
				<text class="method">支付方式</text>
				<view class="wechat-pay" ><!-- @click="switcher_pay" -->
					
					<picker @change="bindPickerChange" :value="index" :range="array">
                        <view style="font-size:34upx; float: left;">{{array[index]}}</view>
						<uni-icon class="icon" type="arrowright" size="28" color="#333"></uni-icon>
                    </picker>
					
					<!-- <text>微信支付</text> -->
					<!-- <uni-icon class="icon" type="arrowright" size="28" color="#333"></uni-icon> -->
				</view>
			</view>
			<view class="buy-count">
				<text class="num">购买数量</text>
				<input type="number" v-model="credit_number" @input="money_" class="num_" placeholder=" " style="color: #444444;"/>
			</view>
			<view class="need-money">
				<text class="need">需付金额</text>
				<view class="input-box">
					<text>￥{{money}}</text>
					<!-- <input type="text" value="" :placeholder="''+"/> -->
				</view>
			</view>
			<text class="more">最少购买{{credit_min}}积分,本次最多可购买100000积分</text>
			
		</view>
		<button class="confirm-btn" @tap="pay" :disabled="isDisable">
			确认支付
		</button>

		</view>
		<!-- #ifdef H5 -->
		<view v-if="h5Pay">
		    <web-view :webview-styles="webviewStyles" :src="oauth2"></web-view>
		</view>
		<!-- #endif -->
		
	</view>
	
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	import eonfox from '@/components/eonfox/eonfox.js';
	import fns from '@/components/eonfox/fns.js';
	import uniPassword from '@/components/ku3gitxdx-payment-password/ku3gitxdx-payment-password.vue'
	var ef = new eonfox();
	export default {
		data() {
			return {
				test:'',
				code: '',
				credit_number: '', //积分数量
				credit_min:'',
				pay_method: 'weixinpay', //支付方式 weixinpay 微信支付、alipay 支付宝支付
				code2: '',
				rate: '',
				money: '',
				algorithm: 'ceil', //积分方式 ceil向上取整
				merchant_id: '',
				ratio_rmb:'',
				isDisable: false,
				b_credit:'',
				b_rmb:'',
				h5Pay:false,
				oauth2:'',
				array: ['微信','预付款',
				// #ifdef APP-PLUS
				'支付宝',
				// #endif
				],
				index:0,
				webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				pay_pass_display:false,
			};
		},
		onLoad() {
			this.load()
		},
		components: {
			uniIcon,
			eonfox,
			fns,
			uniPassword
			
		},
		methods: {
			bindPickerChange: function(e) {
           
            this.index = e.target.value
           },
			onInput(e) {
				//e.cancel = true;
				// console.log('onInput',e,e.cancel);
			},
			paymentPasswordBack(e){
				console.log("支付密码点击了返回，进来了",e);
				this.pay_pass_display=false;
			},
			onConfirms(e) {
				var _this=this
				let password = e.value;
				console.log('password',password,password.length);
				if(password.length!=6){
					fns.err('请正确输入密码')
				}else{
					// pay.shoppingCar(_this.order_id,'user_money',password,function(){
						fns.success('支付成功',function(){
							uni.showLoading({
								title:'支付中',
								success() {
									_this.imprest(password)

								}
							})
							
						})
					// })
				}
				// this.pay_pass_display=false
			},
			//调起预付款支付
			imprest(password){
				var _this=this;
				ef.submit({
					request:{	
							submit: ['APPLICATIONORDERSELFBUYMERCHANTCREDIT', [{
								merchant_id: _this.merchant_id, //商家id
								credit_number:_this.credit_number*100, //积分数量
								pay_method:'user_money', //支付方式 weixinpay 微信支付、alipay 支付宝支付
								pay_password:password
							}, ]]
					},
					callback(data){
						 uni.hideLoading();
						var res=fns.checkError(data,'submit',function(errno,error){
							uni.showToast({
								title:error,
								icon:'none',
								success() {
									_this.isDisable=false;
								}
							})
						})
						console.log('提交订单',res);
// 						_this.order_id=res.order_id;
// 						if(res.submit){
// 							_this.payy(res.submit,_this.pay_method)
// 						}
                        if(!res.submit.errno){
							uni.showToast({
									title:'购买成功',
									success() {
										_this.pay_pass_display=false
										uni.hideLoading();
								        setTimeout(function(){
											uni.navigateBack({
											delta:1
										})
										},1500)
									}
								})
						}
						
						
					},
					error(err){
						fns.err('提交订单失败',err,1)
					}
				})
			},
			payy(id,method){
				var _this=this
				 uni.hideLoading();
				console.log('pay()',id,method);
				switch (method){
					case 'user_money':
					uni.showToast({
						title:'请输入支付密码',success() {
							console.log('tj');
							_this.imprest()
// 							_this.order_id=id.shop_order_id,
// 							_this.order_method=method
						}
					})
						break;
					case 'alipay':
					fns.err('支付未完善')
						break;
					case 'weixinpay':
					fns.err('支付未完善')
						break;		
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			pay() {
				var _this = this
				
				if(!/^\d*\.{0,1}\d{0,1}$/.test(_this.credit_number) || _this.credit_number<=0 ||_this.credit_number<_this.credit_min){
					uni.showToast({
						title: '积分数量不合法',
						icon: 'none'
					})
					return;
				}
				
				console.log('开始',_this.isDisable);
				if (_this.isDisable == true) {
					uni.showToast({
						title: '请勿重复操作',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title:'加载中'
				})
				_this.isDisable = true;
				console.log("商家ID:", _this.merchant_id);
				if(_this.index==0){
					//微信小程序支付
					// #ifdef MP-WEIXIN
					_this.pay_mp_weixin()
					// #endif
	// 				// #ifdef H5
	// 				_this.pay_h5_weixin()
	// 				// #endif
					// #ifdef APP-PLUS
					_this.pay_app_weixin()
					// #endif
				}if(_this.index==1){
					 _this.payy();
					 _this.pay_pass_display=true
				}if(_this.index==2){
					_this.payAli();
				}
				
			},
			//支付宝支付
			payAli(){
				var _this=this;
				ef.submit({
					request: {
						s: ['APPLICATIONORDERSELFBUYMERCHANTCREDIT', [{
							merchant_id: _this.merchant_id, //商家id
							credit_number: _this.credit_number*100, //积分数量
							pay_method: 'alipay', //支付方式 weixinpay 微信支付、alipay 支付宝支付
							alipay_trade_type:'APP'
						}, ]]
					},
						callback(data){
							 uni.hideLoading();
							console.log('调起支付宝支付',data)
							fns.checkError(data,'s',function(errno,error){
								uni.showToast({
									title:error,
									icon:'none'
								})
								
							})
							var ali=data.data.s.data.alipay
							if(ali){
								uni.requestPayment({
										provider: 'alipay',
										orderInfo:ali,
										success: function (res) {
											console.log('success:' + JSON.stringify(res));
											uni.showToast({
												title:'支付成功',
												icon:'none',
												success() {
													setTimeout(function(){
														uni.navigateTo({
															url:'../../pagesA/integral/integral'
														});
													},1500)
												}
											});
										},
										fail: function (err) {
											console.log('fail:' + JSON.stringify(err));
										}
									});
							}
						},
						error(err){
							fns.err('提交订单失败',err,1)
						}
				
					
				})
			},
			pay_h5_weixin(){
				var _this=this
				_this.h5Pay=true
				var redirect_uri='',
				appid='wx23cc607b184d790e'
				_this.oauth2='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+redirect_uri+'&response_type=code&scope=SCOPE&state=STATE#wechat_redirect'
			},
			pay_mp_weixin(){
				var _this=this
				wx.login({
					//微信小程序登录获取code
					success(res) {
						_this.code = res.code;
						if (res.code) {
							//获取到code生成订单
							// 发起网络请求
							console.log('发起网络请求');
							ef.submit({
								request: {
									s: ['APPLICATIONORDERSELFBUYMERCHANTCREDIT', [{
										merchant_id: _this.merchant_id, //商家id
										weixin_login_code: res.code,
										credit_number: _this.credit_number*100, //积分数量
										pay_method: 'weixinpay', //支付方式 weixinpay 微信支付、alipay 支付宝支付
										weixin_trade_type: "JSAPI"
									}, ]]
								},
								callback: function(data) {
									 uni.hideLoading();
									_this.isDisable = true;
									console.log("商家", data);
									if (fns.checkError(data, "s", function(erron, error) {
										_this.isDisable = false;
											uni.showToast({
												title: error,
												icon: 'none'
											})
										})) {
										//7,已支付
										//发起支付
										console.log('发起支付', data.data.s.data);
										_this.requestPayment(data.data.s.data);
										//获取成功，无错误信息时
										_this.isDisable = false;
									}
								},
								error: function(err) {
									_this.isDisable = false;
									console.log('出错啦', err);
									uni.showToast({
										title: JSON.stringify(err),
										icon: 'none'
									})
								}
							})
						} else {
							_this.isDisable = false;
							console.log('登录失败！' + res.errMsg)
							uni.showToast({
								title: '登录失败！' + res.errMsg,
								icon: 'none'
							})
						}
					}
				})
			},
			pay_app_weixin(){
				var _this=this
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  console.log('loginres:',typeof loginRes);
					  if (loginRes.errMsg=='login:ok') {
								// 获取用户信息
								uni.getUserInfo({
								  provider: 'weixin',
								  success: function (infoRes) {
									 console.log('info'+JSON.stringify(infoRes.userInfo.openId));
									 console.log('发起网络请求');
									 ef.submit({
									 	request: {
									 		s: ['APPLICATIONORDERSELFBUYMERCHANTCREDIT', [{
									 			merchant_id: _this.merchant_id, //商家id
									 			weixin_login_openid: infoRes.userInfo.openId,
									 			credit_number: _this.credit_number*100, //积分数量
									 			pay_method: 'weixinpay', //支付方式 weixinpay 微信支付、alipay 支付宝支付
									 			weixin_trade_type: "APP"
									 		}, ]]
									 	},
									 	callback: function(data) {
											 uni.hideLoading();
									 		_this.isDisable = true;
											_this.test=JSON.stringify(data)
									 		console.log("商家"+ JSON.stringify(data));
									 		if (fns.checkError(data, "s", function(erron, error) {
												// _this.test='发起支付失败'
									 			_this.isDisable = false;
									 				uni.showToast({
									 					title: error,
									 					icon: 'none'
									 				})
									 			})) {
									 			//7,已支付
									 			//发起支付
												// _this.test=JSON.stringify(data.data.s.data)
									 			console.log('发起支付', data.data.s.data);
									 			_this.requestPayment(data.data.s.data);
									 			//获取成功，无错误信息时
									 			_this.isDisable = false;
									 		}
									 	},
									 	error: function(err) {
									 		_this.isDisable = false;
									 		console.log('出错啦', err);
									 		uni.showToast({
									 			title: JSON.stringify(err),
									 			icon: 'none'
									 		})
									 	}
									 })
									},
								  fail(err){
									 fns.err('err',err,1)
								  }
								});
					  }else{
						  fns.err('err','err',1)
					  }
				  },
				  fail(err) {
				  	fns.err('err','login',1)
				  }
				});
				return;
				console.log('支付开始');
				ef.submit({
					request: {
						s: ['APPLICATIONORDERSELFBUYMERCHANTCREDIT', [{
							merchant_id: _this.merchant_id, //商家id
							credit_number: _this.credit_number*100, //积分数量
							pay_method: 'weixinpay', //支付方式 weixinpay 微信支付、alipay 支付宝支付
							weixin_trade_type: "APP"
						}, ]]
					},
					callback: function(data) {
						_this.isDisable = true;
						console.log("订单获取回调", JSON.stringify(data));
						if (fns.checkError(data, "s", function(erron, error) {
							
							_this.isDisable = false;
								uni.showToast({
									title: error,
									icon: 'none'
								})
							})) {
							//7,已支付
							//发起支付
							console.log('发起支付(app)',JSON.stringify(data.data.s.data));
							_this.requestPayment(data.data.s.data);
							//获取成功，无错误信息时
							_this.isDisable = false;
						}
					},
					error: function(err) {
						_this.isDisable = false;
						console.log('出错啦', JSON.stringify(err));
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none'
						})
					}
				})
			},
			money_() {
				var _this = this
				console.log(_this)
				_this.money = fns.number_pre(_this.credit_number * _this.b_rmb/_this.b_credit, _this.algorithm)
			},
			requestPayment(wxArr) {
				var _this = this;
				_this.test='开始了'
				var _this = this;
					console.log('支付参数'+JSON.stringify(wxArr));
					console.log('调起支付');
					_this.test='调起支付'
				
				// #ifdef APP-PLUS
				var orderInfo = {
					appid:wxArr.appid,
					partnerid:wxArr.mch_id,//商户号
					prepayid:wxArr.prepay_id,//预支付交易会话ID
					package:'Sign=WXPay',//扩展字段,暂填写固定值Sign=WXPay
					noncestr:wxArr.nonce_str,//随机字符串
					timestamp:wxArr.time_stamp,//时间戳	
					sign:wxArr.pay_sign,//签名
				};
				// #endif
					_this.test='调起支付'
				uni.requestPayment({
					// #ifdef MP-WEIXIN
					provider: 'wxpay',
					timeStamp: String(wxArr.time_stamp),
					nonceStr: wxArr.nonce_str,
					package: 'prepay_id=' + wxArr.prepay_id,
					signType: wxArr.sign_type,
					paySign: wxArr.pay_sign,
					// #endif
					// #ifdef APP-PLUS
					provider:'wxpay',
					orderInfo: JSON.stringify(orderInfo),
					// #endif
					success: function(res) {
						_this.test='支付成功?'
						console.log('支付成功success:' , JSON.stringify(res));
						// return
						if (res.errMsg == 'requestPayment:ok') {
							_this.test='支付成功'
							//支付成功是进行订单查询
							var out_time = 0;
							uni.showToast({
								title: '正在查询支付结果',
								icon: 'loading'
							})
							var timeTn = setInterval(function() {
								out_time++;
								if (out_time <= 30) {
									_this.order_query(wxArr.order_id, function() {
										clearInterval(timeTn)
										uni.showToast({
											title: '购买成功',
											icon: 'none',
											success() {
												// return;
												setTimeout(function() {
													uni.hideToast();
													uni.navigateBack({
														delta:1
													})
												}, 1500)
											}
										})
										
									})
								} else {
									uni.showToast({
										title: '业务超时，如已支付，请稍后再个人页面查看是否到账',
										icon: 'none'
									})
									setTimeout(function() {
										uni.hideToast()
									}, 1500)
									clearInterval(timeTn);
								}
							}, 1000)
						} else {
							uni.showToast({
								title: '业务超时，如已支付，请稍后再个人页面查看是否到账',
								icon: 'none'
							})
							setTimeout(function() {
								uni.hideToast()
							}, 1500)
						}
					},
					fail: function(err) {
						_this.test='调用支付失败'+JSON.stringify(err)
						console.log('调用支付失败',JSON.stringify(err));
						return false;
					}
				});
			},
			switcher_pay: function() {
				uni.showToast({
					title: "暂不支持支付功能的切换"
				});
			},
			//支付结果查询
			order_query(order_id, fun) {
				console.log('正在查询');
				ef.submit({
					request: {
						s: ['APPLICATIONORDERSELFPAYSTATE', [{
							order_id: order_id
						}]]
					},
					callback: function(data) {
						// console.log('支付查询回调成功',data.data.s.data) ;return data.data.s.data;
						if (!data.errno && !data.data.s.errno) {
							//获取成功，无错误信息时
							if (data.data.s.data) {
								fun()
							} else {
			
								return 0;
							}
						} else {
							return 0;
						}
					},
					error: function(err) {
						return 0;
					}
				})
			},
			load(){
				var _this = this;
				ef.submit({
					request: {
						s: ['APPLICATIONCONFIG'],
						sj: ['MERCHANTSELF']
					},
					callback: function(data) {
						var fns_ = fns.checkError(data, ["s", "sj"], function(erron, error) {
							uni.showToast({
								title: error,
								icon: 'none'
							})
							return;
						});
						console.log('fns', fns_);
						if (fns_) {
							if (fns_.sj.length) {
								console.log("fns_.sj", fns_.sj);
								console.log("fns_.sj[0].id", fns_.sj[0].id);
								_this.merchant_id = fns_.sj[0].id;
							}
							if (fns_.s.rmb_buy_merchant_credit.state != 0) {
								_this.b_credit=fns_.s.rmb_buy_merchant_credit.ratio_credit
								_this.b_rmb=fns_.s.rmb_buy_merchant_credit.ratio_rmb
								_this.credit_min=fns_.s.rmb_buy_merchant_credit.ratio_credit / 100;
								_this.rate = (fns_.s.rmb_buy_merchant_credit.ratio_rmb / 100) / (fns_.s.rmb_buy_merchant_credit.ratio_credit/100);
								console.log('积分比例', _this.rate);
							} else {
								uni.showToast({
									title: '积分功能已关闭',
									icon: 'success'
								})
								return;
							}
				
						}
					},
					error: function() {
						uni.showToast({
							title: '错误',
							icon: 'none'
						})
					}
				})
			}

		}
	}
</script>

<style>
	.status-contents {
		height: var(--status-bar-height);
		background-color: #f4f3f3;
	}

	.top-view {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.status {
		height: var(--status-bar-height);
	}
</style>


<style scoped lang="stylus" ref="stylesheet/stylus">
	.content
		width 100%
		// overflow hidden
		.title-box
			width 100%
			height 60px
			color #333
			font-size 18px
			line-height 60px
			background-color #f4f3f3
			.icon
				width 40%
		.buy-box
			width 100%
			height 320px
			background-color #fff
			.pay-method
				width 95%
				height 18%
				margin 0 auto
				font-size 14px
				display flex
				justify-content center   // 水平居中
				align-items center       // 垂直居中
				flex-direction row
				border-bottom 1px solid #ccc
				.method
					flex 4
					display flex
					align-items center 
					color #444444
					text-align left !important
					height 100%
				.wechat-pay
					width 210upx
					display flex
					align-items center 
					height 100%
					text-align right !important
			.buy-count
				width 95%
				height 37%
				color #ccc
				margin 0 auto
				font-size 14px
				display flex
				justify-content center   // 水平居中
				align-items center       // 垂直居中
				flex-direction column
				border-bottom 1px solid #ccc
				text-align left !important
				
				.num
					width 100%
					height 30%
					line-height 40px
					display block
					color #444444
				.num_
					width 100%
					height 70%
					line-height 110px
					font-size 28px
					display block
			.need-money
				width 95%
				height 35%
				margin 0 auto
				font-size 14px
				color #444444
				display flex
				justify-content center   // 水平居中
				align-items center       // 垂直居中
				flex-direction column
				border-bottom 1px solid #ccc
				text-align left !important
				.need
					width 100%
					height 30%
					line-height 40px
				.input-box
					width 100%
					height 70%
					line-height 110px
					font-size 28px
					display flex
					justify-content center   // 水平居中
					align-items center       // 垂直居中
					flex-direction row
					input
						padding 10px 0
						background-color #EEE8E8
						padding-left 10px
			.more
				display block
				width 95%
				color #444444
				font-size 14px
				margin 0 auto
		.confirm-btn
			width 95%
			height 55px
			color #fff
			margin 0 auto
			display flex
			justify-content center   // 水平居中
			align-items center
			background-color #F8A0A0
			border-radius 4px

</style>
