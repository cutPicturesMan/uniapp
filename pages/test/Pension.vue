<template>
	<view>
		<view class="status-contents">
			<view class="status top-view"></view>
		</view>
		<view class="myWallet">
			<view class="myWalletTitle">
				<!-- #ifdef APP-PLUS -->
				<view class="backBtn" @click="back">
					<uni-icon type="back" size="30" class="back"  color="#fff"></uni-icon>
				</view>
				<!-- #endif -->
				<text class="myWalletTitleText">养老资金</text>
			</view>
			<view class="quotaBox">
				<text class="money">{{PensionMoney}}</text>
				<text class="allMoney">收益总额</text>
				<view class="recharge" @click="withdrawal">
					<image src="http://rs.eonfox.cc/clzy/static/moneyW.png" class="rechargeImg"></image>
					<text class="rechargeText">提现</text>
				</view>
			</view>
			<view class="detailedBox">
				<view class="detailed">
					<text class="detailedLfet">账单明细</text>
					<view class="detailedRight">
						<image src="http://rs.eonfox.cc/clzy/static/Arrow_right02.png" class="detailedRightImg"></image>
					</view>
				</view>
			</view>
			<view class="detailedBox">
				<view class="detailed">
					<text class="detailedLfet">转账到预付款</text>
					<view class="detailedRight">
						<image src="http://rs.eonfox.cc/clzy/static/Arrow_right02.png" class="detailedRightImg"></image>
					</view>
				</view><view class="detailed">
					<text class="detailedLfet">捐赠到扶贫账户</text>
					<view class="detailedRight">
						<image src="http://rs.eonfox.cc/clzy/static/Arrow_right02.png" class="detailedRightImg"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	import fns from '@/components/eonfox/fns.js';
	import eonfox from '@/components/eonfox/eonfox.js';
	var ef = new eonfox();
	export default {
		data() {
			return {
				PensionMoney:''
			};
		},
		onShow: function () 
		 {
			console.log('onshow');
			this.load();
		},
		methods:{
			back(){
				uni.navigateBack({
					delta: 1
				});
			},
			load(){
				var that=this;
				ef.submit({
					request: {
						s: ['USERMONEYSELFEARNING']
					},
					callback: function(data){
						console.log('养老金',data);
							if(data.data.s.errno==0){
								that.PensionMoney=data.data.s.data;
							}
						
					},
					 error: function(err){
					    console.log("出错啦", err);
						uni.showToast({
									title:'error:'+err,
									icon:'none'
									});
					},
				});
				
				
// 				uni.navigateTo({
// 					url: '../cash-certification/cash-certification'
// 				})
			}
		},
		components:{
			uniIcon
		}
	}
</script>

<style scoped>
	.status-contents{
		height: var(--status-bar-height);
		background:#FF5252;
	}
	.top-view{
		width: 100%;
		position: fixed;
		top: 0;
	}
	.status{
		height:var(--status-bar-height);
	}
</style>
<style  scoped lang="stylus" ref="stylesheet/stylus">
	.myWallet
		.myWalletTitle
			color #fff
			text-align center
			background #FF5252
			height 50px
			position relative
			.backBtn
				position absolute
				top 0
				left 3px
				height 50px
				width 50px
				display inline-block
				display flex
				justify-content center  
				align-items center       
				flex-direction row
			.myWalletTitleText
				line-height 50px
		.quotaBox
			width 100%
			height 167px
			background #FF5252
			display flex
			justify-content center  
			align-items center       
			flex-direction column
			color #fff
			font-weight 600
			position relative
			.money
				font-size 36px
			.allMoney
				margin-top 10px
				margin-bottom 50px
			.recharge
				position absolute
				bottom 0
				background rgba(255,255,255,0.5)
				width 100%
				text-align center
				display flex
				justify-content center  
				align-items center       
				flex-direction row
				height 44px
				.rechargeImg
					width 35px
					height 35px 
				.rechargeText
					margin-left 10px
		.detailedBox
			height 60px
			width 100%
			background #F5F5F5
			position relative
			.detailed
				height 44px
				background #fff
				position absolute
				top 8px
				border-bottom 1px solid #F5F5F5
				position relative
				.detailedLfet
					color #101010
					line-height 44px
					float left
					font-size 30upx
					margin-left 10px
				.detailedRight
					width 44px
					position absolute
					right 20px
					top 10px
					float right
					text-align right
					.detailedRightImg
						width 20px
						height 20px
		.payMode
			color #101010
			.payModeTitle
				height 55px
				width 100%
				text-align center
				font-size 28upx
				line-height 55px
				border-bottom 1px solid #F5F5F5
			.alipay
				height 50px
				border-bottom 1px solid #F5F5F5
				line-height 50px
				background #EBEBEB
				.payImg
					height 20px
					width 20px 
					margin 0 20px
				.selectedImgBox
					display inline-block
					width calc(100% - 130px)
					height 50px
					text-align right
					
					.blackImg
						width 20px
						height 20px
						margin-top 15px
			.WeChat
				height 50px
				border-bottom 1px solid #F5F5F5
				line-height 50px
				.payImg
					height 20px
					width 20px 
					margin 0 20px
					
</style>
