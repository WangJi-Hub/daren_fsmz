//index.js
//获取应用实例
const app = getApp()
let config = wx.getStorageSync('config');

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	routerYdj: function() { //月登记
		wx.navigateTo({
			url: '/pages/monthreg/list/list'
		})
	},
/* 	//重要通知列表
	getZytz: function() {
		let _this = this;
		wx.request({
			url: `${config.host}getXcxNoticeWrlist.do`,
			data: {
				pageIndex: 0,
				pageSize: 5
			},
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			success: function(res) {
				_this.setData({
					zytzlist: res.data
				});
			},
			fail: function(err) {}
		});
	}, */
	//自动登录
	autoLogin: function() {
		let _this = this;
		wx.login({
			success(res) {
				
				wx.request({
					url:`${config.host}xcxVerifyByOpenid.do`,
					data:{
						openid:res.code
					},
					header:{
						"content-type": "application/x-www-form-urlencoded"
					},
					method:'POST',
					success:function(res){
						console.log(res);
					}
				})
				
				
				
				/*if (res.code) {
					//通过openid自动登录
					wx.request({
						url: `${config.host}xcxLoginByOpenid.do`,
						data: {
							code: res.code
						},
						header: {
							"content-type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						success: function(res) {
							//wx.request不是直接向服务器请求，而是通过微信中转，所以每次都是一个新请求
							//首次向服务器请求后保存sessionid，之后请求需要放入header中，保证session不变
							wx.removeStorageSync('sessionid');
							wx.setStorageSync("sessionid", 'JSESSIONID=' + res.data.sessionid);

							if (res.data.result == '1') { //登录成功
								_this.setData({
									username: res.data.user.username
								});
								_this.setData({
									photo: res.data.user.headpic
								});
								//加载业务统计
								_this.setData({
									dtj: res.data.count.wtj
								});
								_this.setData({
									shz: res.data.count.shz
								});
								_this.setData({
									ybh: res.data.count.ybh
								});
								_this.setData({
									ybl: res.data.count.ybl
								});
								// 已经授权，可以直接调用 getUserInfo 获取头像昵称
								wx.getUserInfo({
									success: function(res) {
										var userInfo = res.userInfo
										var nickName = userInfo.nickName
										var avatarUrl = userInfo.avatarUrl
										var gender = userInfo.gender //性别 0：未知、1：男、2：女
										var province = userInfo.province
										var city = userInfo.city
										var country = userInfo.country
										_this.setData({
											photo: avatarUrl
										});
										//更新用户头像
										wx.request({
											url: `${config.host}updateHeadpicToUser.do`,
											data: {
												headpic: avatarUrl
											},
											header: {
												'content-type': 'application/x-www-form-urlencoded',
												'Cookie': wx.getStorageSync("sessionid")
											},
											method: 'POST',
											success: function(res) {}
										});
									}
								});
							} else { //用户未登录，跳转登录
								wx.navigateTo({
									url: '/pages/login/login',
								});
							}
						},
						fail: function(err) {}
					})
				} else {
					wx.showToast({
						title: '登录失败！' + res.errMsg,
						icon: 'none',
						duration: 2000
					});
				}*/
			}
		});
	},
	//监听页面显示 不能用onLoad，返回时页面数据不会刷新
	onShow: function(options) {
		this.autoLogin()
	},
	//监听页面初次渲染完成
	onReady: function() {
		//this.getZytz()
	},
	// 页面销毁时执行
	onUnload: function() {
		//wx.navigateTo({ url: '/pages/index/index' });
	}
})
