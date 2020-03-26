<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">欢迎回来！</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" v-model="phone" placeholder="请输入手机号码" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="password" placeholder="请输入密码" v-model="password" @confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<!-- #ifdef H5 -->
			<button v-if="isWeiXin==1" class="confirm-btn" @click="wechatH5Login" :disabled="logining">微信授权登录</button>
			<!-- #endif -->
			<view class="forget-section">忘记密码?</view>
			
			
			<!-- #ifdef MP-WEIXIN -->
			<button class="confirm-btn" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信登录</button>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<button class="confirm-btn" type="primary" open-type="getUserInfo" @click="getuserinfoh5appwx" withCredentials="true">微信登录</button>
			<!-- #endif -->
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Api from '@/common/api';
import store from '@/store/index';
export default {
	data() {
		return {
			phone: '13146587722',
			password: '123456',
			isWeiXin:0,

			logining: false
		};
	},
	onLoad() {
		let isWeiXin = this.$common.isWeiXinBrowser()
		if (isWeiXin) {
			this.isWeiXin=1
		}
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	methods: {
		...mapMutations(['login']),
		inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
		navBack() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		toRegist() {
			uni.navigateTo({
				url: '/pages/public/reg'
			});
		},
		wechatH5Login() {

			const that = this
			let href = window.location.origin
			let page = that.$api.prePage()
			let prePath = '/pages/index/index'
			if (page) {
				prePath = page.__page__.path
			}

			window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
					+ 'appid=' + Api.h5Appid + '&redirect_uri=' + escape(href) + '&response_type=code&scope=snsapi_userinfo&state=mallplus#wechat_redirect'
		},
		wxGetUserInfo: function(res) {
			if (!res.detail.iv) {
				uni.showToast({
					title: '您取消了授权,登录失败',
					icon: 'none'
				});
				return false;
			}
			// this.login(res.detail.rawData);
			const that = this;
			let datas = '';
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					wx.request({
						url: Api.BASEURI + Api.index.appletLogin_by_weixin,
						data: {
							code: loginRes.code,
							userInfo: res.detail.rawData,
							cloudID: res.detail.cloudID,
							encrypted_data: res.detail.encryptedData,
							iv: res.detail.iv,
							source:2,
							signature: res.detail.signature
						},
						method: 'post',
						success: function(info) {
							datas=info;
							uni.setStorageSync('userInfo', info.data);
							uni.setStorageSync('token', info.data.tokenHead+info.data.token);

							uni.switchTab({
								url: '/pages/index/index'
							});
						},
						fail: function(e) {
							console.log(e);
						}
					});
				}
			});
			console.log(datas)
			//this.$db.set('userInfos', datas.data.data.userInfo);
			//this.$db.set('token', datas.data.data.tokenHead+info.data.data.token);
		},
		 appLogin() {
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log(res.provider);
					//支持微信、qq和微博等
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log('-------获取openid(unionid)-----');
								console.log(JSON.stringify(loginRes));
								// 获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									success: function(info) {
										console.log('-------获取微信用户所有-----');
										console.log(JSON.stringify(info.userInfo));
										let logparams1 = { logs: JSON.stringify(info.userInfo) };
										Api.apiCall('get', Api.index.logs, logparams1);
  // 与服务器交互将数据提交到服务端数据库
                                    uni.request({
                                        url: Api.BASEURI + Api.index.appLogin,
                                        method: 'POST',
                                        header: {'content-type' : "application/x-www-form-urlencoded"},
                                        data: {
                                         sex : info.userInfo.gender,
                                          city   : info.userInfo.country+'-'+info.userInfo.province+'-'+info.userInfo.city,
                                           source:1,
                                            openid : info.userInfo.openId,
											unionid: info.userInfo.openId,
                                            nickname   : info.userInfo.nickName,
                                            headimgurl   : info.userInfo.avatarUrl,
                                        },
                                        success: res => {
                                            console.log(JSON.stringify(res));

                                            // 登录成功 记录会员信息到本地
                                            if(res){
												uni.setStorageSync('userInfo', res.data.userInfo);
												uni.setStorageSync('token', res.data.tokenHead+res.data.token);
                                                				uni.switchTab({
                                                					url: '/pages/index/index'
                                                				});

                                            }else{
                                                uni.showToast({title:res.data});
                                            }
                                        },
                                        fail: (e) => {
                                            console.log(JSON.stringify(e));
                                        }
                                    });
										 let logparams = { logs: JSON.stringify(info.userInfo) };
										  Api.apiCall('get', Api.index.logs, logparams);
									}
								});
							}
						});
					}
				}
			});
		},
		async toLogin() {
			let phoneReg = /^1[1-9][0-9]\d{8}$/;
			try {
				if (this.phone == '') {
					throw '请填写手机号';
				}
				if (!phoneReg.test(this.phone)) {
					throw '手机号格式有误';
				}
				if (this.password == '') {
					throw '请填写密码';
				}
			} catch (err) {
				this.$api.msg(err);
				return;
			}
			this.logining = false;
			let params = { phone: this.phone, password: this.password };
			let data = await Api.apiCall('post', Api.index.login, params);
			//this.logining = false;
			if (data) {

				console.log(data);

				uni.setStorageSync('userInfo', data.userInfo);
				uni.setStorageSync('token', data.tokenHead+data.token);
				uni.switchTab({
					url: '/pages/index/index'
				});

			}

		},
		 getuserinfoh5appwx() {
			uni.login({
                        success: (res) => {
                            // res 对象格式

                            uni.getUserInfo({
                                success: (info) => {

                                    // 与服务器交互将数据提交到服务端数据库
                                    uni.request({
                                        url: Api.BASEURI + Api.index.appLogin,
                                        method: 'POST',
                                        header: {'content-type' : "application/x-www-form-urlencoded"},
                                        data: {
                                         sex : info.userInfo.gender,
                                          city   : info.userInfo.country+'-'+info.userInfo.province+'-'+info.userInfo.city,

                                           source:1,
											unionid : info.userInfo.openId,
                                            openid : info.userInfo.openId,
                                            nickname   : info.userInfo.nickName,
                                            headimgurl   : info.userInfo.avatarUrl,
                                        },
                                        success: res => {
                                            console.log(JSON.stringify(res.data.data));

                                            // 登录成功 记录会员信息到本地
                                            if(res){
												console.log(res);

												uni.setStorageSync('userInfo', res.data.userInfo);
												uni.setStorageSync('token', res.data.tokenHead+res.data.token);

                                                				uni.switchTab({
                                                					url: '/pages/index/index'
                                                				});

                                            }else{
                                                uni.showToast({title:res.data});
                                            }
                                        },
                                        fail: (e) => {
                                            console.log(JSON.stringify(e));
                                        }
                                    });
                                },
                                fail: () => {
                                    uni.showToast({title:"微信登录授权失败"});
                                }
                            })
                        },
                        fail: () => {
                            uni.showToast({title:"微信登录授权失败"});
                            uni.hideLoading();
                        }
                    })
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.container {
	padding-top: 115px;
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #fff;
}
.wrapper {
	position: relative;
	z-index: 90;
	background: #fff;
	padding-bottom: 40upx;
}
.back-btn {
	position: absolute;
	left: 40upx;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 40upx;
	font-size: 40upx;
	color: $font-color-dark;
}
.left-top-sign {
	font-size: 120upx;
	color: $page-color-base;
	position: relative;
	left: -16upx;
}
.right-top-sign {
	position: absolute;
	top: 80upx;
	right: -30upx;
	z-index: 95;
	&:before,
	&:after {
		display: block;
		content: '';
		width: 400upx;
		height: 80upx;
		background: #b4f3e2;
	}
	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}
	&:after {
		position: absolute;
		right: -198upx;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}
.left-bottom-sign {
	position: absolute;
	left: -270upx;
	bottom: -320upx;
	border: 100upx solid #d0d1fd;
	border-radius: 50%;
	padding: 180upx;
}
.welcome {
	position: relative;
	left: 50upx;
	top: -90upx;
	font-size: 46upx;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.input-content {
	padding: 0 60upx;
}
.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30upx;
	background: $page-color-light;
	height: 120upx;
	border-radius: 4px;
	margin-bottom: 50upx;
	&:last-child {
		margin-bottom: 0;
	}
	.tit {
		height: 50upx;
		line-height: 56upx;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
	}
	input {
		height: 60upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		width: 100%;
	}
}

.confirm-btn {
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 70upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
	&:after {
		border-radius: 100px;
	}
}
.forget-section {
	font-size: $font-sm + 2upx;
	color: $font-color-spec;
	text-align: center;
	margin-top: 40upx;
}
.register-section {
	position: absolute;
	left: 0;
	bottom: 50upx;
	width: 100%;
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	text-align: center;
	text {
		color: $font-color-spec;
		margin-left: 10upx;
	}
}
</style>
