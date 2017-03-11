var Strings = {
	// 页面通用参数
	"pagesize" : 10,
	"nosession" : 212,
	"NoSessionStr" : "您还未登录，请先登录！",
	//"servicePhone":"0755-22312150"
	"servicePhone":"136 3160 7598"
};

function nosession() {
	alert(Strings.NoSessionStr);
	window.location.href = '/index.html';
}

function isEmpty(str) {
	if (str == null || $.trim(str) == "") {
		return true;
	}
	return false;
}

function checkEmail(str) {
	var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}
function checkMobile(str) {
	var re = /^1\d{10}$/;
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}

function checkexist(account,callback,account,acctype,msg){
	// $.ajax({
	//  // url:''
	//  type : 'POST',
	//  dataType:'json',
	//  data : {
	//      data:account
	//  },
	//  success : function(data) {
	//      var resultdata = data;
	//      if (resultdata.code == 0) {
	//          alert("账号已存在");
	//          return;
	//      } else if (resultdata.code == 202) {
	//          callback(account,acctype,'',msg);
	//      } else {
	//          alert("账号输入有误，请重新输入");
	//      }
	//  }
	// });  
}
//判断数组是否有重复
function isRepeat(arr) {
	var hash = {};
	for ( var i in arr) {
		if (""!= arr[i] && hash[arr[i]])
			return true;
		hash[arr[i]] = true;
	}
	return false;
}


// 完善信息
function update() {
	var userName = $("#userName").val();
	if (isEmpty(userName)) {
		alert("用户名不能为空");
		return;
	}

	// 用户类别
	var userType = $("input[name='utype']:checked").val();

	// 发票抬头
	var patentName = $("#patentName").val();

	// 联系人
	var contactName = $("#contactName").val();
	if (isEmpty(contactName)) {
		alert("请填写联系人");
		$("#contactName").focus();
		return;
	}
	// 手机号码
	var contactMobile = $("#contactMobile").val();
	if (isEmpty(contactMobile)) {
		alert("请填写联系人手机号码");
		$("#contactMobile").focus();
		return;
	}
	if (!checkMobile(contactMobile)) {
		alert("联系人手机号码格式不正确");
		$("#contactMobile").focus();
		return;
	}
	// 邮箱地址
	var contactEmail = $("#contactEmail").val();
	if (isEmpty(contactEmail)) {
		alert("请填写电子邮箱地址");
		$("#contactEmail").focus();
		return;
	}
	if (!checkEmail(contactEmail)) {
		alert("电子邮箱地址格式不正确");
		$("#contactEmail").focus();
		return;
	}
	// 紧急联系人
	var emgContactName = $("#emgContactName").val();
	if (isEmpty(emgContactName)) {
		alert("请填写紧急联系人，避免人员或岗位变动带来的风险");
		return;
	}
	// 紧急联系人电话
	var emgContactMobile = $("#emgContactMobile").val();
	if (isEmpty(emgContactMobile)) {
		alert("请填写紧急联系人手机号码");
		$("#emgContactMobile").focus();
		return;
	}
	if (!checkMobile(emgContactMobile)) {
		alert("紧急联系人手机号码格式不正确");
		$("#emgContactMobile").focus();
		return;
	}

	var city = $("#city-picker").attr("data-code");
	var address = $("#address").val();
	if (city != "") {
		if (address == "") {
			alert("请填写账单地址详细信息");
			return;
		}
	}else{
		alert("请选择账单地址的省市信息");
	}

	var msgtype = $("input[name='msgtype']:checked").val();
	
	// $.ajax({
	//  // url: '',
	//  type: 'POST',
	//  dataType:'json',
	//  data: {
	//      userName: userName,
	//      userType: userType,
	//      patentName: patentName,
	//      contactName: contactName,
	//      contactMobile: contactMobile,
	//      contactEmail:contactEmail,
	//      emgContactName: emgContactName,
	//      emgContactMobile: emgContactMobile,
	//      msgtype: msgtype,
	//      city:city,
	//      address: address,
	//      msgtype:msgtype
	//  },
	//  success: function(data) {
	//      // to do
	//      window.location.reload();
	//  }
	// });
}


function bind(account,acctype,smscode,msg){
	// $.ajax({
	//  // url:''
	//  type : 'POST',
	//  dataType:'json',
	//  data: {
	//      account: account,
	//      type:acctype,
	//      smscode:smscode
	//  },
	//  success : function(data) {
	//      var resultdata = data;
	//      if (resultdata.code == Strings.nosession) {
	//          nosession();
	//          return false;
	//      }
	//      if (resultdata.code == 0) {
	//          alert(msg);
	//      } else {
	//          alert("绑定失败");
	//      }
	//  }
	// });
}

function bindacc() {
	var account;
	var acctype = $("#acctype").val();
	var email = $("#email").val();
	var msg;

	if (acctype == "1") {
		if (isEmpty(email) || !checkEmail(email)) {
			alert("邮箱格式不正确");
			$("#email").focus();
			return;
		}
		
		account = email;
		msg="邮件已发送，请登录邮箱验证完成账号绑定";
		
		checkexist(account,bind,account,acctype,msg);
	}
	
	var smscode;
	if (acctype == "0") {
		var mobile = $("#mobile").val();
		if (isEmpty(mobile) || !checkMobile(mobile)) {
			alert("手机号码格式不正确");
			$("#mobile").focus();
			return;
		}
		smscode = $("#smscode").val();
		if (isEmpty(smscode)) {
			alert("请输入短信验证码");
			$("#smscode").focus();
			return;
		}
		account =mobile;
		msg="绑定手机号码成功";

		bind(account,acctype,smscode,msg);
	}
}

var curCount = 0;
function sendsmscode(){
	if(curCount >0){
		return;
	}
	var phone=$("#mobile").val();
	if (isEmpty(phone) ) {
		alert("请输入手机号码");
		$("#mobile").focus();
		return;
	}
	if (!checkMobile(phone)) {
		alert("手机号码格式不正确");
		$("#mobile").focus();
		return;
	}
	//产生验证码
	// $.ajax({
	//  // url: '',
	//  type : 'POST',
	//  dataType:'json',
	//  data : {
	//      mobile: phone
	//  },
	//  success : function(data) {
	//      var resultdata = data;
	//      if (resultdata.code == 0) {
	//          myalert("验证码已发送");
	//          curCount=120;
	//          // 设置button效果，开始计时
	//          $("#sendCodemobile").attr("disabled", "disabled");
	//          $("#sendCodemobile").text("请在" + curCount + "秒内输入验证码");
	//          InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒执行一次
	//      } else {
	//          alert("验证码发送失败");
	//      }
	//  }
	// });
}

//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {
		window.clearInterval(InterValObj);// 停止计时器
		$("#sendCodemobile").removeAttr("disabled");// 启用按钮
		$("#sendCodemobile").text("重新发送验证码");
		code = ""; // 清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
	} else {
		curCount--;
		$("#sendCodemobile").attr("disabled", "disabled");
		$("#sendCodemobile").text("请在" + curCount + "秒后重新获取");
	}
}

function sendCodemobile(){
	var phone=$("#mobile").val();
	if (isEmpty(phone) ) {
		alert("请输入手机号码");
		$("#mobile").focus();
		return;
	}
	if (!checkMobile(phone)) {
		alert("手机号码格式不正确");
		$("#mobile").focus();
		return;
	}
	checkexist(phone,sendsmscode);
}


function modpwd() {
	var oldpwd = $("#oldpwd").val();
	if (isEmpty(oldpwd)) {
		alert("旧密码不能为空");
		return;
	}

	var newpwd = $("#newpwd").val();
	if (isEmpty(newpwd)) {
		alert("请输入新密码");
		return;
	}
	var confirmpwd = $("#confirmpwd").val();
	if (isEmpty(confirmpwd)) {
		alert("请确认新密码");
		return;
	}

	if (newpwd !== confirmpwd) {
		alert("两次输入的密码不一致，请重新输入");
		return;
	}

	// $.ajax({
	//  // url:'',
	//  type : 'POST',
	//  dataType : "json",
	//  data : {
	//      oldPwd: oldpwd,
	//      newPwd: newpwd
	//  },
	//  success : function(data) {
	//      var resultdata = data;
	//      if (resultdata.code == Strings.nosession) {
	//          nosession();
	//          return false;
	//      }
	//      if (resultdata.code == 0) {
	//          alert("密码修改成功");
	//          window.location.href = '/useraccount.html';
	//      } else {
	//          if (resultdata.code == 204) {
	//              alert("密码不正确");
	//          } else {
	//              alert("密码修改失败");
	//          }
	//      }
	//  }
	// });
}


function bindholder() {
	var obligee1 = $("#obligee1").val();
	var obligee2 = $("#obligee2").val();
	var obligee3 = $("#obligee3").val();
	var obligee4 = $("#obligee4").val();
	var obligee5 = $("#obligee5").val();
	var arr =new Array(obligee1,obligee2,obligee3,obligee4,obligee5);
	if(isRepeat(arr)){
		alert("专利权人重复");
		return;
	}
	var flag=true;
	for (var i = 0; i < arr.length; i++) {
		if (!isEmpty(arr[i])) {
			flag=false;
			break;
		}
	}
	if (flag) {
		alert("专利权名不能全为空");
		return;
	}
	
	$.toast("正在自动为您添加关注", 3000);

	// $.ajax({
	//  // url:''
	//  type : 'POST',
	//  data : {
	//      obligee1: obligee1,
	//      obligee2: obligee2,
	//      obligee3: obligee3,
	//      obligee4: obligee4,
	//      obligee5: obligee5
	//  },
	//  success : function(data) {
	//      var resultdata = data;
	//      if (resultdata.code == 0) {
	//          alert("绑定成功，自动关注专利"+resultdata.retData+"条，请于次日登录查看相关专利的最新状态");
	//          setTimeout(function(){
	//              window.location.href = '/.';
	//          },2000);
	//      } else if (211 == resultdata.code) {
	//          alert("专利权人不存在或未找到对应专利信息。");
	//      } else if (220 == resultdata.code) {
	//          alert("请检查需要绑定的专利权人。");
	//      } else {
	//          alert("绑定失败");
	//      }
	//  }
	// });
}


function sendEmail() {
	var account = $("#forgetMobile").val();

	// $.ajax({
	//  type: 'POST',
	//  dataType: 'json',
	//  url: '',
	//  data: {
	//      "account": account
	//  },
	//  success : function(data) {
	//  }
	// });
}


// find password
function forgetPwdStep1() {
	var type; 
	var userName = $('#forgetMobile');
	var userNameVal = userName.val();
	if (userNameVal ===""|| (!checkEmail(userNameVal) && !checkMobile(userNameVal))) {
		alert('请输入正确的手机号码或邮箱');
		userName.focus();
		return;
	}else if(checkEmail(userNameVal)){
		type = 1; //1为邮箱
	}else if(checkMobile(userNameVal)){
		type = 0; //0为手机
	}

	// $.ajax({
	//  type : 'POST',
	//  dataType:'json',
	//  url : '',
	//  data : {
	//      "userNameVal": userNameVal
	//  }
	//  success : function(data) {
	//      if (data.code == 0) {
				$('#step1').hide();
				if (type == 0) {
					$('#step2').show();
				}
				if (type == 1) {
					alert('系统已将密码重置激活链接发送至该邮箱，请登录查看！');
					sendEmail();
				}
			// } else if (data.code == 202) {
			//  alert('账号不存在,请重新输入');   
			// } else {
			//  alert("账号输入有误，请重新输入");
			// }
		// }
	// });
}

var timer;
function sendCode(id){
	var obj = $('#sendCode'+ id );
	
	var mobile = $('#'+id).val();
	if (mobile=="" || !checkMobile(mobile)) {
		alert("手机号码不正确");
		return;
	}
	obj.attr("disabled", 'disabled').addClass('disabled')
	var count = 60;
	 timer = setInterval(function() {
		if (count>0) {
			count--;
			obj.text(count + "秒后再试");
		}else{
			clearInterval(timer);
			obj.removeAttr("disabled").removeClass('disabled').text("验证码");
		}
		
	},1000);
	// $.ajax({
	//  type: 'POST',
	//  dataType: 'json',
	//  url: '',
	//  data: {
	//      "mobile": mobile
	//  },
	//  success: function(data) {
	//      if (data.code == 0) {
			//  alert("验证码已发送");
			// } else {
			//  alert("验证码发送失败");
			// }
	//  }
	// });
}


function forgetPwdStep2() {
	var vcode = $('#forgetVcode').val();
	if (vcode=='') {
		alert('请输入验证码');
		return;
	}
	// 校验验证码
	// $.ajax({
	//  type: 'POST',
	//  dataType: 'json',
	//  url: '',
	//  data: {
	//      "vcode": vcode
	//  }
	//  success: function(data) {
	//      if (data.code == 0) {
				$("#step2").hide();
				clearInterval(timer);
				$('#sendCodeforgetMobile').removeAttr("disabled").removeClass('disabled').text("验证码");
				$("#step3").show();
	//      } else {
	//          alert("校验码输入错误");
	//      }
	//  }
	// });
}

function forgetPwdStep3() {
	var resetPwd1 = $("#resetPwd1").val();
	var resetPwd2 = $("#resetPwd2").val();
	var account = $("#forgetMobile").val();
	if (resetPwd1 == "") {
		alert("输入新密码");
		return;
	}
	if (resetPwd1 == "") {
		alert("请再次输入密码");
		return;
	}
	if (resetPwd1 != resetPwd2) {
		alert("两次输入密码不一致");
		return;
	}
	
	// $.ajax({
	//  type: 'POST',
	//  dataType: 'json',
	//  url: '',
	//  data: {
	//      "newPwd": resetPwd2,
	//      "account": account
	//  },
	//  success : function(data) {
	//      if (data.code == 0) {
				alert("密码重置成功");
	//      } else {
	//          alert("密码重置失败");
	//      }
	//  }
	// });
}

// login 
function login() {
	var userName = $("#userName").val();
	if (userName == "") {
		alert("请输入手机或邮箱");
		$("#userName").focus();
		return;
	}
	else if ( !checkEmail(userName) && !checkMobile(userName)) {
		alert("手机或邮箱格式非法");
		$("#userName").focus();
		return;
	}
	var userPassword = $("#userPwd").val();
	if (userPassword == "") {
		alert("请输入密码");
		$("#userPwd").focus();
		return;
	}

// 	$.ajax({
// 		type: 'POST',
// 		dataType: 'json',
// 		url: '',
// 		data: {
// 		"account": userName,
// 		"passwd": userPassword
// 		},
// 		success : function(data) {

// 		}
// 	});
}


// register
function reg() {
	var mobile = $("#mobile").val();
	var vcode = $("#vcode").val();
	var pwd = $("#passwordMobile").val();
	var pwd2 = $("#passwordMobile2").val();
	var utype = $("input[name='utype']:checked").val();

	if (mobile == "") {
		alert("请输入手机号码");
		$("#mobile").focus();
		return;
	}else if(!checkMobile(mobile)){
		alert("手机号码格式非法");
		return;
	}

	if (vcode == "") {
		alert("请输入验证码");
		$("#vcode").focus();
		return;
	}

	if (pwd =="") {
		alert("请输入密码");
		$("#passwordMobile").focus();
		return;
	}
	if (pwd.length < 6 || pwd.length > 16) {
		alert("密码长度要求在6-16位");
		$("#passwordMobile").focus();
		return;
	}
	if (pwd2 =="") {
		alert("请再次输入密码");
		$("#passwordMobile2").focus();
		return;
	}
	if (pwd2.length < 6 || pwd2.length > 16) {
		alert("密码长度要求在6-16位");
		$("#passwordMobile2").focus();
		return;
	}
	if(pwd !== pwd2){
		alert("两次输入的密码不一致");
		$("#passwordMobile2").focus();
		return;
	}

	if ($("#fwtk").is(':checked') == false) {
		alert("请阅读服务条款，并同意该条款");
		return;
	}


	// $.ajax({
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	url: '', 
	// 	data : {
	// 		"mobile":mobile,
	// 		"password":pwd,
	// 		"vcode":vcode, 
	// 		"utype": utype
	// 	},
	// 	success : function(data) {
	// });

}


