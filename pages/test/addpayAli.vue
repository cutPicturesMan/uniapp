<template>
	<view class="content">
		<view class="informationBox">
			<view class="infor-title">
				<text>支付宝账号:</text>
			</view>
			<view class="infor-input">
				<input type="text" value="" @input="inpID" placeholder="请输入邮箱或手机号" />
			</view>
		</view>
		<view class="informationBox">
			<view class="infor-title">
				<text>真实姓名:</text>
			</view>
			<view class="infor-input">
				<input type="text" value="" @input="inpName"  placeholder="请输入真实姓名"/>
			</view>
		</view>
		<view class="affirmBut">
			<button type="primary" @click="next()">确认</button>
		</view>
	</view>
</template>

<script>
	import fns from '@/components/eonfox/fns.js';
	import eonfox from '@/components/eonfox/eonfox.js';
	var ef = new eonfox();
	export default {
		data() {
			return {
				ID:'',
				name:''
			};
		},
		
		methods:{
			inpID:function(event){
				var that=this;
				that.ID = event.detail.value;
			},
			inpName:function(event){
				var that=this;
				that.name = event.detail.value;
			},
			next(){
				var that=this;
				ef.submit({
						request: {
							u:['USERSELFCONFIGALIPAY',[{account:that.ID,realname:that.name}]]
						},
						callback: function(data){
							console.log("用户支付宝信息",data);
							var ulist=fns.checkError(data,'u',function(errno,error){
								 uni.showToast({
								 	title:error,
									icon:'none'
								 })
							})
							
							if(ulist.u){
								uni.showToast({
									title:'保存成功',
									icon:'none'
								})
								setTimeout(function (){
									uni.navigateTo({
										url:'../../pagesA/myPurse/myPurse'
									})
								},3000);
							}
						},
						 error: function(err){
								 console.log("出错啦", err);
						},
					});
			}
		}
		
	}
</script>

<style>
	.content{
		width:100%;
		height: 750upx;
	}
	.informationBox{
		width:100%;
		padding: 5upx;
		height: 80upx;
		line-height: 80upx;
		border-bottom: #eee 1px solid;
		font-size:28upx;
	}
	.infor-title{
		float: left;
		width: 25%;
		height: 80upx;
		text-align: right;
	}
	.infor-input{
		padding-left: 10upx;
		width: 70%;
		height: 50upx;
		float: left;
	}
	.infor-input input{
		width: 100%;
		float: left;
		height: 80upx;
		line-height: 80upx;
	}
	.affirmBut{
		width: 95%;
		height: 60upx;
		margin-top: 120upx;
		margin-left: 2.5%;
	}
</style>
