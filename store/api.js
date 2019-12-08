var e = require("./siteinfo.js"),
	r = e.apiroot,
	t = {
		urlImage: r + "/api/location/",/*图片*/
		dict: r + "/sysDict/queryDict",/*数据字典*/
		uploadFile: r + "/api/upload",/*上传文件*/
		versionUpdate: r + "/automaticupgrade/versionUpdate",/*版本更新*/
		querylandLordInfo: r + "/sys/userinfo/querylandLordInfo",/*获取用户信息*/
		getCityId: r + "/cities/getCityId",/*获取城市ID*/
		login:{
			code: r + "/sys/smsmessage/getCode",/*获取验证码*/
			setLogin: r + "/sys/userinfo/login",/*登录*/
			setRegister: r + "/sys/userinfo/register",/*注册*/
		},
		find:{/*发现*/
			index: r + "/find/findArea",/*首页*/
			findAreaById: r + "/find/findAreaById?findId="/*详情*/
		},
		index:{/*首页*/
			houseSerachList: r + "/houseInfo/houseSerach",/*首页模糊搜索木屋推荐列表*/
			specificSerach: r + "/houseInfo/specificSerach",/*首页具体搜索木屋推荐列表*/
			advert: r + "/advertInfo/advertList",/*广告*/
			houseRecommend: r + "/houseInfo/houseRecommend",/*木屋推荐*/
			hotCity: r + "/targetRecommend/list",/*推荐城市*/
			targetRecommend: r + "/targetRecommend/info",/*推荐城市软文*/
			targetHouseList: r + "/houseInfo/target_recommend",/*推荐城市木屋推荐列表*/
			scenicSpot: r + "/scenicSpotManage/list",/*精选景点*/
			scenicSpotManage: r + "/scenicSpotManage/info",/*精选景点软文*/
			scenicHouseList: r + "/houseInfo/scenic_recommend",/*精选景点木屋推荐列表*/
			lowerPriceHouse: r + "/houseInfo/lowerPriceHouse",/*低价好房*/
			newHouse: r + "/houseInfo/newHouse",/*新房特惠*/
			themeRecommend: r + "/themeRecommend/list",/*特色主题*/
			themeInfo: r + "/themeRecommend/info",/*特色主题软文*/
			themeHouseList: r + "/houseInfo/theme_recommend",/*特色主题木屋推荐列表*/
			cityAll: r + "/recommendCity/list",/*全部城市列表*/
			recommendCity: r + "/recommendCity/recommendCityList",/*热门城市列表*/
			houseDetails: r + "/houseInfo/findHouseInfoById",/*木屋详情*/
			landlordHouseInfo: r + "/houseorderinfo/LandlordHouseInfo",/*房屋详情中点击房东头像进入详情*/
			houseFacility: r + "/houseInfo/queryFacilitiesValue",/*木屋详情全部设施*/
			houseListByCityId: r + "/houseInfo/houseListByCityId",/*木屋详情按CityId获取城市列表*/
			houseCalendar: r + "/houseCalendar/calendarDateByHouseId",/*根据houseId获取日历)*/
		},
		order:{/*房客订单*/
			commitOrder: r + "/houseorderinfo/commit",/*提交订单*/
			confirmCheckIn: r + "/houseorderinfo/houseOccupancy",/*确认入住*/
			houseCheckOut: r + "/houseorderinfo/houseCheckOut",/*退房*/
			orderCancel: r + "/houseorderinfo/orderCancel",/*取消订单*/
			refundPolicy: r + "/houseorderinfo/refundPolicy",/*退款规则*/
			landlordOrderInfo: r + "/houseorderinfo/LandlordOrderInfo",/*房东订单认证信息*/
		},
		friendInfo:{/*入住人*/
			addFriendInfo: r + "/friendinfo/save",/*新增入住人信息*/
			friendList: r + "/friendinfo/friendList",/*查询入住人列表*/
			friendDelete: r + "/friendinfo/delete",/*删除入住人*/
		},
		footprint:{/*历史足迹*/
			increaseFootprint: r + "/footprint/IncreaseFootprint",/*添加和修改历史足迹*/
			queryFootprintList: r + "/footprint/queryFootprintList",/*查询历史足迹*/
		},
		landlord:{/*房东房源*/
			publishHouse: r + "/houseInfo/publishHouse",/*发布房源获取houseId*/
			houseInfoOne: r + "/houseInfo/saveReleaseHouseInfoOne",/*房源发布1*/
			houseInfoTwo: r + "/houseInfo/saveReleaseHouseInfoTwo",/*房源发布2*/
			houseInfoThree: r + "/houseInfo/saveReleaseHouseInfoThree",/*房源发布3*/
			houseInfoFour: r + "/houseInfo/saveReleaseHouseInfoFour",/*房源发布4*/
			houseInfoFive: r + "/houseInfo/saveReleaseHouseInfoFive",/*房源发布5*/
			houseInfoSix: r + "/houseInfo/saveReleaseHouseInfoSix",/*房源发布6*/
			houseInfoSeven: r + "/houseInfo/saveReleaseHouseInfoSeven",/*房源发布7*/
			facilityList: r + "/sysDict/facilitiesValueList",/*全部设施*/
			clearList: r + "/sysDict/cleanTimeAndSheetsTimeList",/*多久打扫和多久更换字典值*/
			getProvinces: r + "/provinces/getProvinces",/*省*/
			getCities: r + "/cities/getCities",/*市*/
			getAreas: r + "/areas/getAreas",/*区*/
			houseInfoImg: r + "/houseInfo/auditEndImg?houseId=",/*审核页面图片*/
			auditHouseList: r + "/houseInfo/auditAndNoAuditHouseList",/*房源首页的列表*/
			upperOperation: r + "/houseInfo/upperOperation",/*房屋上架*/
			lowerOperation: r + "/houseInfo/lowerOperation",/*房屋下架*/
			submitAudit: r + "/houseInfo/submitAudit",/*提交审核*/
			backAudit: r + "/houseInfo/backAudit",/*审核撤回*/
			deleteHouse: r + "/houseInfo/deleteHouse",/*删除木屋*/
			deleteHouseImage: r + "/houseInfo/removePublishHouseImg",/*发布房屋删除图片*/
			updateHouseAuditStatus: r + "/houseInfo/updateHouseAuditStatus",/*修改房屋审核状态*/
			houseInfoChangePrice: r + "/houseInfo/houseInfoChangePrice",/*房源详情*/
			changeBasePrice: r + "/houseInfo/changeBasePrice",/*房源日历修改基础价*/
			changeFloatPrice: r + "/houseInfo/changeFloatPrice",/*房源日历修改浮动价*/
			changeHouseCloseStatus: r + "/houseInfo/changeHouseCloseStatus",/*房源日历修改房屋关闭状态*/
		},
		attestation:{/*房东认证*/
			queryPaymethod: r + "/paymethod/queryPaymethod",/*查询支付方式*/
			savePaymethod: r + "/paymethod/savePaymethod",/*保存支付方式*/
			queryPhone: r + "/sys/userinfo/queryPhone",/*查询账号手机号*/
			queryLandlordInfo: r + "/sys/userinfo/queryLandlordInfo",/*查询身份认证信息(头像,联系电话,昵称)*/
			addLandlordInfo: r + "/sys/userinfo/addLandlordInfo",/*保存身份认证信息(头像,联系电话,昵称)*/
			queryIdCardInfo: r + "/sys/userinfo/queryIdCardInfo",/*查询身份证信息*/
			uploadIdCardInfo: r + "/sys/userinfo/uploadIdCardInfo",/*上传身份证信息*/
			landLordInfo: r + "/sys/userinfo/landLordInfo",/*房东信息完善*/
			inspectInfo: r + "/sys/userinfo/userSwitchlandLord",/*查询房东信息*/
			checkUserAudit: r + "/sys/userinfo/checkUserAudit",/*检查房东是否认证*/
			queryAuthenstatus: r + "/landlordinfostatus/queryAuthenstatus",/*查询房东认证状态*/
		},
		crowdFunding:{/*众筹*/
			crowdsourcingList: r + "/crowdfundingmanage/crowdsourcingList",/*众筹一级列表查询*/
			crowdsourcingSeeMore: r + "/crowdfundingmanage/crowdsourcingSeeMore",/*众筹二级列表查询*/
			crowdsourcingDetails: r + "/crowdfundingmanage/crowdsourcingDetails",/*众筹详情*/
			investmentProgramme: r + "/crowdfundingprogramme/investmentProgramme",/*投资方案*/
			investmentProgrammeInfo: r + "/crowdfundingprogramme/investmentProgrammeInfo",/*方案详情*/
			subscription: r + "/crowdfundingprogramme/subscription",/*认购*/
			phoneAndEmail: r + "/sys/userinfo/phoneAndEmail",/*查询收件人邮箱*/
			sendOutEmail: r + "/sysemail/sendOutEmail",/*发送验证邮件*/ 
			authenEmail: r + "/sysemail/authenEmail",/*验证邮箱*/
			addressList: r + "/inputaddress/addressList",/*收件人地址列表*/
			addressSave: r + "/inputaddress/addressSave",/*新增收件人地址*/
			deleteAddress: r + "/inputaddress/deleteAddress",/*删除收件人地址*/
			confirmSubscription: r + "/crowdfundingmanage/confirmSubscription",/*确认认购*/
			crowdFundingPayOrder: r + "/payorder/crowdFundingPayOrder",/*众筹支付*/
			orderList: r + "/crowdfundingmanage/orderList",/*订单列表*/
			orderDetails: r + "/crowdfundingmanage/orderDetails",/*订单详情*/
		},
		smsmessage:{/*消息*/
			HomePageMessage: r + "/appmessage/queryUnreadNumber",/*消息未读个数*/
			queryHomePageMessage: r + "/appmessage/queryHomePageMessage",/*消息首页面查询*/
			signRedDot: r + "/appmessage/signRedDot",/*标记小红点*/	
			queryTypeMessage: r + "/appmessage/queryTypeMessage",/*获取消息列表（活动/订单通知*/
			addMessageAlreadyRead: r + "/appmessage/addMessageAlreadyRead",/*标记已读信息*/	
		},
		mainData:{/*编辑个人资料*/
			userPersonal: r + "/sys/userinfo/userPersonal",/* 编辑个人资料*/
			updateLandlordPersonal: r + "/sys/userinfo/updateLandlordPersonal",/*编辑房东资料*/					
			updateUserPersonal: r + "/sys/userinfo/updateUserPersonal",/*编辑用户资料*/				
		},
		setting:{/*我的设置*/
			phoneAndEmail: r + "/sys/userinfo/phoneAndEmail",/*查询手机号和邮箱*/
			getCode: r + "/sys/smsmessage/getCode",/*获取手机验证码*/
			updatePhone: r + "/sys/userinfo/updatePhone",/*更换手机号码*/
			sendOutEmail: r + "/sysemail/sendOutEmail",/*获取邮箱验证码*/
			authenEmail: r + "/sysemail/authenEmail",/*邮箱认证*/
			save: r + "/ideafeedback/save",/*意见反馈*/
		},
		operating:{/*经营概况*/
			cumulative: r + "/houseorderinfo/cumulative",/*经营概况首页*/  
			incomeDetails: r + "/houseorderinfo/incomeDetails",/*输入明细*/					
		},
		tenant:{/*用户订单*/
			submitData: r + "/houseorderinfo/submitData",/*发送客户入离时间*/     
			orderPriceDetail: r + "/houseorderinfo/orderPriceDetail",/*获取费用明细*/      
			commit: r + "/houseorderinfo/commit",/*提交订单*/					
			savePayOrder: r + "/payorder/savePayOrder",/*订单支付*/	
			userOrderPrompt: r + "/houseorderinfo/userOrderPrompt",/*用户订单提示查询*/
			orderList: r + "/houseorderinfo/orderList",/*订单列表*/
			orderDetail: r + "/houseorderinfo/orderDetail",/*订单详情*/
			
		},
		landlordData:{/*房东订单*/
			landLordOrderPrompt: r + "/houseorderinfo/landLordOrderPrompt",/*房东订单提示查询*/
			landLordOrder: r + "/houseorderinfo/landLordOrder",/*订单列表*/
			orderDetail: r + "/houseorderinfo/orderDetail",/*订单详情*/  
			orderConfirm: r + "/houseorderinfo/orderConfirm",/*取消/确认订单*/
			userOrderInfo: r + "/houseorderinfo/userOrderInfo",/*用户订单认证信息*/
		}
	};

module.exports = t;
