import store from '../store/index';
export default {
// qq 951449465
	 //BASEURI: 'http://www.yjlive.cn/api/api/',
	// BASEURI:'http://localhost:8081/api/',
	// ESURI: 'http://localhost:8081/api/',
	// BASEURI:'http://101.132.195.75:8081/api/',
	// ESURI: 'http://101.132.195.75:8081/api/',
	BASEURI:'http://api.iele.co/app/api/',
	ESURI: 'http://api.iele.co/app/',
	h5Appid: 'wxb4660f37187c0b8e',

	es: {
		searchList: 'search',
	},
	/**
	 * 接口名称
	 */
	index: {
		submitLocaltion:'home/submitLocaltion',
		getAppletOpenId: 'applet/getAppletOpenId', // 获取openId
		getWxPhone: 'applet/getWxPhone', // 获取手机号

		appletLogin_by_weixin: 'applet/login_by_weixin1', // 登录(手机号:phone 密码:password)
		login: 'home/login', // 登录(手机号:phone 密码:password)
	    logout: 'home/logout', //
		appLogin : 'home/appLogin',
		simpleReg: 'home/simpleReg', // 登录(手机号:phone 密码:password)
		home: 'home/content', //首页展示
		home1: 'home/content1', //首页展示
		homeFlashPromotionList: 'home/homeFlashPromotionList', // 秒杀列表
		bannerList: 'home/bannerList', // 首页banner
		updatePassword: 'home/updatePassword', // 修改密码
		loginByCode: 'home/loginByCode', // 手机和验证码登录
		reg: 'home/reg', // 注册
		sendCodes: 'home/sms/codes', // 获取验证码
		acceptCoupon: 'sms/add', // 获取优惠券
		listMemberCoupon: 'sms/listMemberCoupon', // 优惠券列表
		couponList: 'home/couponList', //  优惠券
		selectNotRecive: 'home/selectNotRecive', //  可领取的优惠券
		userInfo: 'home/userInfo', //  用户信息
		userSampleInfo: 'home/userSampleInfo', //  用户信息
		groupActivityDetail: 'sms/group.activity.getdetial', // 查询团购详情信息
		groupActivityList: 'sms/groupActivityList', // 查询商品团购列表
		logs: 'home/logs', //  记录日志

	},
	member: {
		getInviteData: 'user/getInviteData',
		inviteUser: 'user/inviteUser',
		inviteMoney: 'user/inviteMoney',
		currentMember: 'user/currentMember',
		updateMember: 'user/updateMember',
		resetPassword: 'user/resetPassword',
		schoolList: 'user/school/list', // 查询学校列表
		schoolDetail: 'user/schoolDetail', // 查询拼团商品详情信息
		getAreaByPid: 'user/getAreaByPid', // 根据pid查询区域
		bindSchool: 'user/bindSchool', // 会员绑定学校
		bindArea: 'user/bindArea', // 会员绑定区域

		//这个暂时没有相关接口，这个用于以后多商户版本
		//applyStore: 'single/store/applyStore', // 商户入驻
		//storeDetail: 'single/store/detail', // 商户详情
		//storeDetail1: 'single/store/detail1', // 商户详情 带用户
		//store: 'single/store/home', // 商户主页
		//storeList: 'single/store/store/list', // 商户列表

	},
	// 整个模块全部去掉
	// build: {
	// 	getBuildNoticeByPage: 'single/build/getBuildNoticeByPage', // 所有社区和房间
	// 	getBuildWuyeCompanyByPage: 'single/build/getBuildWuyeCompanyByPage', // 所有社区和房间
	// 	groupList: 'single/build/groupList', // 所有社区和房间
	// 	communityList: 'single/build/communityList', // 所有社区和房间
	// 	floorList: 'single/build/floorList', // 所有社区和房间
	// 	allCommunity: 'single/build/allCommunity', // 所有社区和房间
	// 	bindCommunity: 'single/build/bindCommunity', // 绑定小区和房间
	// 	home: 'single/build/home', // 首页内容页信息展示
	// 	applyCommunity: 'single/build/applyCommunity', // 社区入驻


	// },
	goods: {
		goodsPromoto: 'sms/detail', // 单个商品的优惠详情
		secskillDetail: 'pms/secskill/detail', // 查询秒杀商品详情信息
		groupGoodsDetail: 'pms/goodsGroup/detail', // 查询拼团商品详情信息
		groupGoodsList: 'pms/groupGoods/list', // 查询拼团商品列表
		groupHotGoodsList: 'pms/groupHotGoods/list', // 查询生效拼团商品列表
		giftDetail: 'pms/gift/detail', // 查询商品详情信息
		giftList: 'pms/gift/list', // 查询商品列表
		//去掉拍卖
		//paiMaiDetail: 'pms/paimai/detail', // 查询商品详情信息
		//updatePaiMai: 'pms/updatePaiMai', // 参与竞价
		typeGiftList: 'pms/typeGiftList', //查询商品类型下的商品列表
		addView: 'pms/addView', // 查询商品详情信息
		viewList: 'pms/viewList', // 查询商品列表

		goodsDetail: 'pms/goods/detail', // 查询商品详情信息
		goodsList: 'pms/goods/list', // 查询商品列表
		categoryList: 'pms/productCategory/list', // 查询商品分类列表
		createGoods: 'pms/createGoods', //创建商品
		brandList: 'pms/brand/list', // 根据条件查询所有品牌表列表
		consultList: 'pms/consult/list', // 取某个商品的评价
		categoryAndGoodsList: 'pms/categoryAndGoodsList/list', // 查询商品分类列表(带商品)
		typeGoodsList: 'pms/typeGoodsList', //查询商品类型下的商品列表
		typeList: 'pms/typeList', //查询商品类型下的商品列表

		getGoodsTypes: 'pms/getGoodsTypes', // 查询分类

		recommendBrand: 'pms/recommendBrand/list', // 查询首页推荐品牌
		newProductList: 'pms/newProductList/list', //查询首页新品
		hotProductList: 'pms/hotProductList/list', // 查询热销商品
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
	 getRefundReason: 'oms/order/getRefundReason', // 查询售后原因
    	saveOmsOrderReturnApply: 'oms/saveOmsOrderReturnApply', // 添加售后
    	    aftersaleslist: 'oms/order/aftersaleslist', // 查询售后列表
        	aftersalesinfo: 'oms/aftersalesinfo', // 查询售后详情
		addGroup: 'oms/addGroup', // 发起拼团
		acceptGroup: 'oms/acceptGroup', // 提交拼团
		sampleOrderList: 'oms/sampleOrderList', // 查询订单列表
		orderList: 'oms/order/list', // 查询订单列表
		orderDetail: 'oms/detail', // 查询订单列表
		preGroupActivityOrder: 'oms/preGroupActivityOrder', // 预览订单团购
		bookOrder: 'oms/generateOrder', //  生成订单
		preOrder: 'oms/submitPreview', // 预览订单
		closeOrder: 'oms/closeOrder', // 关闭订单
		confimDelivery: 'oms/confimDelivery', //确认收货
		applyRefund: 'oms/applyRefund', // 申请退款
		logisticbyapi: 'oms/logisticbyapi', // 查看物流
		orderevaluate: 'oms/orderevaluate', //订单评价
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
		wapPay: 'wxPay/wapPay', //微信H5 支付 注意：必须再web页面中发起支付且域名已添加到开发配置中
		webPay: 'wxPay/webPay', //公众号支付
		scanCode1: 'wxPay/scanCode1', //扫码支付模式一 已测试
		scanCode2: 'wxPay/scanCode2', //扫码支付模式二 已测试
		appPay: 'wxPay/appPay', //微信APP支付
		micropay: 'wxPay/micropay', //微信刷卡支付
		miniAppPay: 'wxPay/miniAppPay', //微信小程序支付
		refund: 'wxPay/refund', //微信退款 String transactionId,String outTradeNo
		authCodeToOpenid: 'wxPay/authCodeToOpenid', //openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取

		//银联支付
		frontConsume: 'unionPay/frontConsume', //PC网关支付 B2C跟B2B查询区别就在于bizType的不同
		frontConsume2: 'unionPay/frontConsume2', //B2B的网关支付 B2C跟B2B查询区别就在于bizType的不同
		wapConsume: 'unionPay/wapConsume', //WAP支付 请在手机paymentlist端访问此action
		appConsume: 'unionPay/appConsume', //APP支付获取tn
		frontrefund: 'unionPay/refund', //

		//京东
		jdappPay: 'JDPay/appPay', //App 支付
		saveOrder: 'JDPay/saveOrder', //String payType PC H5 支付
		customerPay: 'JDPay/customerPay', //商户二维码支付
		fkmPay: 'JDPay/fkmPay', //刷卡支付 String token, String amount
		jdrefund: 'JDPay/refund', //微信APP支付


	},
	cms: {
		subjectList: 'cms/subject/list', //  查询文章列表
		subjectCategoryList: 'cms/subjectCategory/list', //  查询文章分类列表
		subjectCommentList: 'cms/subjectComment/list', //  查询文章评论列表
		recommendSubjectList: 'cms/recommendSubjectList/list', //查询首页推荐文章
		topicList: 'cms/topic/list', //  查询专题列表
		topicDetail: 'cms/topic/detail', // 专题详情
		subjectDetail: 'cms/subject/detail', // 文章详情
		createSubject: 'cms/createSubject', // 创建文章
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
		let fullurl = this.BASEURI + endpoint;
		var contentType = 'application/x-www-form-urlencoded';

		data.storeid=1;
    	data.authorization1=token;
		//console.log(endpoint);
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				'storeid': 1,
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
				// TODO wxapp下无$api方法
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
