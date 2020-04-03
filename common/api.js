import store from '../store/index';
export default {
// qq 951449465
	 //BASEURI: 'http://www.yjlive.cn/api/api/',
	// BASEURI:'http://localhost:8081/api/',
	// ESURI: 'http://localhost:8081/api/',
	// BASEURI:'http://101.132.195.75:8081/api/',
	// ESURI: 'http://101.132.195.75:8081/api/',
	BASEURI:'http://api.iele.co/api/api/',
	ESURI: 'http://192.168.1.169:8081/api/',
	h5Appid: 'wxb4660f37187c0b8e',

	es: {
		searchList: 'search',
	},
	/**
	 * 接口名称
	 */
	index: {
		submitLocaltion:'single/home/submitLocaltion',
		getAppletOpenId: 'applet/getAppletOpenId', // 获取openId
		getWxPhone: 'applet/getWxPhone', // 获取手机号

		appletLogin_by_weixin: 'applet/login_by_weixin1', // 登录(手机号:phone 密码:password)
		login: 'single/home/login', // 登录(手机号:phone 密码:password)
		appLogin : 'single/home/appLogin',
		simpleReg: 'single/home/simpleReg', // 登录(手机号:phone 密码:password)
		home: 'single/home/content', //首页展示
		home1: 'single/home/content1', //首页展示
		homeFlashPromotionList: 'single/home/homeFlashPromotionList', // 秒杀列表
		bannerList: 'single/home/bannerList', // 首页banner
		updatePassword: 'single/home/updatePassword', // 修改密码
		loginByCode: 'single/home/loginByCode', // 手机和验证码登录
		reg: 'single/home/reg', // 注册
		sendCodes: 'single/home/sms/codes', // 获取验证码
		acceptCoupon: 'single/sms/add', // 获取优惠券
		listMemberCoupon: 'single/sms/listMemberCoupon', // 优惠券列表
		couponList: 'single/home/couponList', //  可领取的优惠券
		userInfo: 'single/home/userInfo', //  用户信息

		groupActivityDetail: 'single/sms/group.activity.getdetial', // 查询团购详情信息
	    groupActivityList: 'single/sms/groupActivityList', // 查询商品团购列表
		logs: 'single/home/logs', //  记录日志

	},
	member: {
		storeList: 'single/user/store/list', // 查询学校列表
		storeDetail: 'single/user/storeDetail', // 查询拼团商品详情信息
		storeSampleDetail: 'single/user/store/detail', // 查询店铺详情信息
		schoolList: 'single/user/school/list', // 查询学校列表
		schoolDetail: 'single/user/schoolDetail', // 查询拼团商品详情信息
		getAreaByPid: 'single/user/getAreaByPid', // 根据pid查询区域
		bindSchool: 'single/user/bindSchool', // 会员绑定学校
		bindArea: 'single/user/bindArea', // 会员绑定区域
		applyStore:'single/user/applyStore', // 商户入驻

	},
	goods: {
		goodsPromoto: 'single/sms/detail', // 单个商品的优惠详情
		secskillDetail: 'single/pms/secskill/detail', // 查询秒杀商品详情信息
		groupGoodsDetail: 'single/pms/goodsGroup/detail', // 查询拼团商品详情信息
		groupGoodsList: 'single/pms/groupGoods/list', // 查询拼团商品列表
		groupHotGoodsList: 'single/pms/groupHotGoods/list', // 查询生效拼团商品列表
		giftDetail: 'single/pms/gift/detail', // 查询商品详情信息
		giftList: 'single/pms/gift/list', // 查询商品列表
		paiMaiDetail: 'single/pms/paimai/detail', // 查询商品详情信息
		updatePaiMai: 'single/pms/updatePaiMai', // 参与竞价
		typeGiftList: 'single/pms/typeGiftList', //查询商品类型下的商品列表
		addView: 'single/pms/addView', // 查询商品详情信息
		viewList: 'single/pms/viewList', // 查询商品列表

		goodsDetail: 'single/pms/goods/detail', // 查询商品详情信息
		goodsList: 'single/pms/goods/list', // 查询商品列表
		categoryList: 'single/pms/productCategory/list', // 查询商品分类列表
		createGoods: 'single/pms/createGoods', //创建商品
		brandList: 'single/pms/brand/list', // 根据条件查询所有品牌表列表
		consultList: 'single/pms/consult/list', // 取某个商品的评价
		categoryAndGoodsList: 'single/pms/categoryAndGoodsList/list', // 查询商品分类列表(带商品)
		typeGoodsList: 'single/pms/typeGoodsList', //查询商品类型下的商品列表
		typeList: 'single/pms/typeList', //查询商品类型下的商品列表

		getGoodsTypes: 'single/pms/getGoodsTypes', // 查询分类

		recommendBrand: 'single/pms/recommendBrand/list', // 查询首页推荐品牌
		newProductList: 'single/pms/newProductList/list', //查询首页新品
		hotProductList: 'single/pms/hotProductList/list', // 查询热销商品
		listCollect: 'collection/listCollect', // 显示关注列表
		deleteCollect: 'collection/delete', // 删除收藏中的某个商品
		favoriteSave: 'collection/favoriteSave', // 添加/商品收藏
		listAddress: 'address/list', // 显示所有收货地址
		deleteAddress: 'address/delete', // 删除
		addressSave: 'address/save', // 添加
		setDefaultAddress: 'address/address-set-default', // 设为默认地址
		getItemDefautl: 'address/getItemDefautl', // 显示默认收货地址

	},
	order: {
		addGroup: 'single/oms/addGroup', // 发起拼团
		acceptGroup: 'single/oms/acceptGroup', // 提交拼团
		orderList: 'single/oms/order/list', // 查询订单列表
		orderDetail: 'single/oms/detail', // 查询订单列表
		preGroupActivityOrder: 'single/oms/preGroupActivityOrder', // 预览订单团购
		preOrder: 'single/oms/submitPreview', // 预览订单
		closeOrder: 'single/oms/closeOrder', // 关闭订单
		bookOrder: 'single/oms/generateOrder', //  生成订单
		confimDelivery:'single/oms/confimDelivery',//确认收货
		applyRefund:'single/oms/applyRefund', // 申请退款
		logisticbyapi:'single/oms/logisticbyapi', // 查看物流
		orderevaluate:'single/oms/orderevaluate', //订单评价
		addCart: 'cart/addCart', // 添加商品到购物车
		cartList: 'cart/list', // 获取某个会员的购物车列表
		promotionCartList: 'cart/list/promotion', // 获取某个会员的购物车列表,包括促销信息
		updateQuantity: 'cart/update/quantity', //修改购物车中某个商品的数量
		deleteCart: 'cart/delete', // 删除购物车中的某个商品
		clearCart: 'cart/clear', // 清空购物车

		paymentlist: 'pay/paymentlist', // 查询订单列表
		allPay: 'pay/allPay', // 支付宝支付
		jifenPay: 'pay/jifenPay', // 余额支付
		balancePay: 'pay/balancePay', // 余额支付
		weixinAppletPay: 'pay/weixinAppletPay', // 微信小程序支付
		//支付宝
		aliAppPay: 'aliPay/appPay', // 支付宝app支付
		aliWapPay: 'aliPay/wapPay', // 支付宝支付
		wapPayNoSdk: 'aliPay/wapPayNoSdk', // 支付宝支付
		pcPay: 'aliPay/pcPay', // 支付宝支付
		aliPay: 'aliPay/tradePay', // 支付宝支付 String authCode,  String scene
		aliPrecreatePay: 'aliPay/tradePrecreatePay', // 支付宝扫码支付
		aliRefund: 'aliPay/tradePrecreatePay', // 支付宝退款
		//微信
		wapPay:'wxPay/wapPay', //微信H5 支付 注意：必须再web页面中发起支付且域名已添加到开发配置中
		webPay:'wxPay/webPay',//公众号支付
		scanCode1:'wxPay/scanCode1',//扫码支付模式一 已测试
		scanCode2:'wxPay/scanCode2',//扫码支付模式二 已测试
		appPay:'wxPay/appPay',//微信APP支付
		micropay:'wxPay/micropay',//微信刷卡支付
		miniAppPay:'wxPay/miniAppPay',//微信小程序支付
		refund:'wxPay/refund',//微信退款 String transactionId,String outTradeNo
		authCodeToOpenid:'wxPay/authCodeToOpenid',//openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取

		//银联支付
		frontConsume:'unionPay/frontConsume', //PC网关支付 B2C跟B2B查询区别就在于bizType的不同
		frontConsume2:'unionPay/frontConsume2',//B2B的网关支付 B2C跟B2B查询区别就在于bizType的不同
		wapConsume:'unionPay/wapConsume',//WAP支付 请在手机paymentlist端访问此action
		appConsume:'unionPay/appConsume',//APP支付获取tn
		frontrefund:'unionPay/refund',//

		//京东
		jdappPay:'JDPay/appPay', //App 支付
		saveOrder:'JDPay/saveOrder',//String payType PC H5 支付
		customerPay:'JDPay/customerPay',//商户二维码支付
		fkmPay:'JDPay/fkmPay',//刷卡支付 String token, String amount
		jdrefund:'JDPay/refund',//微信APP支付


	},
	cms: {
		subjectList: 'single/cms/subject/list', //  查询文章列表
		subjectCategoryList: 'single/cms/subjectCategory/list', //  查询文章分类列表
		subjectCommentList: 'single/cms/subjectComment/list', //  查询文章评论列表
		recommendSubjectList: 'single/cms/recommendSubjectList/list', //查询首页推荐文章
		topicList: 'single/cms/topic/list', //  查询专题列表
		topicDetail: 'single/cms/topic/detail', // 专题详情
		subjectDetail: 'single/cms/subject/detail', // 文章详情
		createSubject: 'single/cms/createSubject', // 创建文章
	},

	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get
	 * endpoint    接口方法名
	 * data		   所需传递参数
	 * load		   是否需要loading
	 */
	async apiCall(method, endpoint, data, load) {
		if (load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}

		let token = uni.getStorageSync('token') || '';
		let fullurl = this.BASEURI + endpoint;123
		var contentType = 'application/x-www-form-urlencoded';
	data.storeid=1;
	data.authorization595=token;
		//console.log(endpoint);
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				'storeid': 595,
				//'Content-Type': 'application/x-www-form-urlencoded',
				 'content-type': contentType,
				// 'authorization1': Authorization || ''
			},
		});
		if (load) {
			uni.hideLoading();
		}
	console.log(res);
	console.log(error);
		if (undefined==res||'undefined'==res){
			uni.navigateTo({
				url: `/pages/index/index`
			})
		}
		if (res.data.msg == 'User token expired!') {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: `/pages/public/login`
			})
		}
		if (res.data.msg == '请先登录' || res.data.code == 100) {
			console.log(res.data);
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: `/pages/public/login`
			})
		}

		if (res.data.code == 200) {
			return res.data.data;
		} else {
			console.log(res.data);
			if (res.data && res.data.msg){

				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				});
				this.$api.msg(res.data.msg);
			}

		}
	},
	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get
	 * endpoint    接口方法名
	 * data		   所需传递参数
	 * load		   是否需要loading
	 */
	async apiEsCall(method, endpoint, data, load) {
		if (!load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}

		let fullurl = this.ESURI + endpoint;
		//let fullurl = 'http://localhost:8085/api/' + endpoint;
		let Authorization = `${store.state.userInfo.tokenHead}${store.state.userInfo.token}`;
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				'storeid': 1,
				'Content-Type': 'application/x-www-form-urlencoded',
				// 'content-type': 'application/json',
				'Authorization': Authorization || ''
			},
		});
		console.log(error);
		if (!load) {
			uni.hideLoading();
		}
		return res;

	},
}