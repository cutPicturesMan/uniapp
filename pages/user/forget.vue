<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				忘记密码！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input
						type="number"
						:value="phone"
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="phone"
						@input="onKeyInput"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input
						type="mobile"
						value=""
						placeholder="8~24位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input
						type="mobile"
						value=""
						placeholder="8~24位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password
						data-key="confimpassword"
						@input="inputChange"
					/>
				</view>
				<view class="verificationBox" >
					<view class="verificationCon">
						<text class="verificationLeft">验证码</text>
						<input type="text" value="" @input="onKeyverification" placeholder="请输入验证码"  placeholder-style="font-size:26upx;color:#444444" class="verificationInput" />
					</view>
					<button type="primary" :disabled="getverifSwitch" class="button" @click="getverification">{{getConfirms}}</button>
				</view>


			</view>
			<button class="confirm-btn" @click="toRegister" :disabled="logining">重置密码</button>

		</view>
		<view class="register-section">
			已有账号?
			<text @click="toLogin">返回登录</text>
		</view>
	</view>
</template>

<script>
import Api from '@/common/api';
	import {
        mapMutations
    } from 'vuex';
	import eonfox from '@/components/eonfox/eonfox.js';
	import fns from '@/components/eonfox/fns.js';
	var ef = new eonfox();
	export default{
		data(){
			return {
				phone: '',
				password: '',
				confimpassword:'',//第二次输入密码
				logining: false,
				verifTime:0,//验证码时长
				getConfirms: '获取验证码',
				confirm:'',
				getverifSwitch:false,
				oauthid:''
			}
		},
		onLoad(){
			this.getStroges();
		},
		methods: {
			...mapMutations(['login']),
			getStroges(){
				try {
				    const value = uni.getStorageSync('oauth_id');
				    if (value) {
				        console.log(value);
						this.oauthid = value
				    }
				} catch (e) {
				    console.log(e)
				}
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			toLogin(){
				uni.redirectTo({
					url:'/pages/public/login'
				})
			},
			async toRegister(){
				var _this=this
				var phone=this.phone,password=this.password,confimpassword=this.confimpassword;
				if (!/^1\d{10}$/.test(phone)){
					uni.showToast({
						title:'手机号有误',
						icon:'none'
					})
				}else if (password.length < 8 ||password.length > 24||confimpassword.length < 8 ||confimpassword.length > 24) {
					uni.showToast({
						title:'密码长度为8~24个字符',
						icon:'none'
					})
				}
				else if(password!=confimpassword){
					uni.showToast({
						title:'两次输入的密码不一致，请检查修改',
						icon:'none'
					})
				}
				else if(_this.confirm==''){
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					});
				}
				else{
					var req={};
					req = {
					phone: this.phone,
					 password:this.password,
					 confimpassword:this.confimpassword,

					 authCode: this.confirm,

					  };

                      let data = await Api.apiCall('post', Api.member.resetPassword, req);
					uni.showToast({
                    									title: '重置成功',
                    									success() {
                    										_this.bind()
                    										setTimeout(function(){
                    										uni.reLaunch({
                    											url:'/pages/public/login'
                    											});
                    										},1000)
                    									}
                    								});
				}

			},
			onKeyInput: function(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},

			async getverification(){

				let _this = this;
				// 验证是否已进行验证码操作
				if(this.verifTime==0){
					if (!/^1[1234567890]\d{9}$/.test(this.phone)) {
						uni.showToast({
							title: '电话号码有误，请重新输入',
							icon: 'none'
						});
						this.phone = '';
						return;
					} else {
						_this.getverifSwitch=true
						this.verifTime=60;
						_this.getConfirms=this.verifTime
						//倒计时
						var timeInterval=setInterval(function(){
							_this.verifTime -- ;
							if(_this.verifTime<=0){
								//倒计时结束清除定时器
								clearInterval(timeInterval)
								_this.getConfirms='重新发送'
								_this.getverifSwitch=false
								return;
							}
							_this.getConfirms=_this.verifTime
						},1000)

						let params = { phone: this.phone};
                        			let data = await Api.apiCall('post', Api.index.sendCodes, params);
					}
				}else{
					uni.showToast({
						title: "请勿重复操作",
						icon: 'none'
					});
				}

			},
			onKeyverification: function(event) {
				this.confirm = event.target.value;
			},
			//绑定
			bind(){
				var _this=this
				console.log('oauth');
				uni.getStorage({
					key:'oauth',
					success(re) {
						if(re.data){
							_this.bind_()
						}
					}
				})
			},
			bind_(){
				console.log('bind');
				var _this=this
							// #ifdef MP-WEIXIN
							wx.login({
								success(res) {
									wx.getUserInfo({
										success(re) {
											re.code=res.code;
											console.log('re:',re);
											ef.submit({
												request:{s:['USERSELFBINDWEIXIN',['applet',re]]},
												callback(data){
													console.log(data);
													fns.unionid()
													return
												},
												error(err){
													fns.err('err',err)
												}
											})
										}
									})
								}
							})
							// #endif
							// #ifdef APP-PLUS
							uni.showToast({
								title:'正在绑定',
								icon:'loading'
							})
							console.log('oauto star');
							uni.login({
							  provider: 'weixin',
							  success: function (loginRes) {
								  console.log('loginres:',typeof loginRes);
								  if (loginRes.errMsg=='login:ok') {
											// 获取用户信息
											uni.showToast({
												title:'获取信息',
												icon:'loading'
											})
											uni.getUserInfo({
											  provider: 'weixin',
											  success: function (infoRes) {
												  uni.showToast({
												  	title:'获取成功',
												  	icon:'loading'
												  })
												  ef.submit({
												  	request:{s:['USERSELFBINDWEIXIN',['app',infoRes.userInfo]]},
												  	callback(data){
												  		console.log(data);
														console.log(JSON.stringify(data));
														fns.unionid()
												  	},
												  	error(err){
														console.log(err);
												  	}
												  })

												},
											  fail(err){
												  console.log(err);
											  }
											});
								  }else{
									 console.log(err);
								  }

							  },
							  fail(err) {
							  	console.log(err);
							  }

							});
							// #endif
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 55px;
		position:relative; 
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}


</style>
<style lang="stylus" ref="stylesheet/stylus">
	.verificationBox
		width 630upx
		height 80upx
		margin 20upx auto
		display flex
		align-items center
		justify-content center// 垂直居中
		flex-direction row
		.verificationCon
			height 100%
			width 65%
			background #f8f6fc
			display flex
			align-items center
			justify-content center// 垂直居中
			flex-direction row
			border-radius 10upx
			.verificationLeft
				width 200upx
				font-size 28upx
				font-weight 550
				text-align center
			.verificationInput
				display inline-block
		.button
			height 100%
			width 35%
			background #fa436a
			font-size 28upx
</style>
