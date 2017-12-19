
$(function () {
    var flag1=false,flag2=false,flag3=false,flag4=false;

    //校验手机号是否合法和存在
    $("#userTel").on("blur",function () {
        var self=$(this);
        self.next().removeClass("isTrue");
        self.next().removeClass("isFalse");
        var reg=/^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/;
        if(reg.test($("#userTel").val())){
            var data=$("#regform").serialize();
            $.ajax({
                url:"http://127.0.0.1/Fruitday/server/isExitAccount.php",
                type:"post",
                dataType:"json",
                data:data,
                success:function (res) {
                    if(res){    //true表示数据表中该手机号码未存在
                        flag1=true;
                        self.next().addClass("isTrue");
                    }else {
                        self.next().addClass("isFalse");
                        flag1=false;

                    }
                }
            })
        }else {
            self.next().addClass("isFalse");
           // alert("您输入的用户名不正确,请重新输入!")
        }
    });
    //检验密码是否合法 只能输入6-20个字母、数字、下划线
    $("#userPwd").on("blur",function () {
        if($("#userPwd").val()!=""){
            var self=$(this);
            self.next().removeClass("isTrue");
            self.next().removeClass("isFalse");
            var reg=/^(\w){6,20}$/;
            if(reg.test($("#userPwd").val())){
                flag2=true;
                self.next().addClass("isTrue");
            }else {
                self.next().addClass("isFalse");
            }
        }else {
            self.next().addClass("isFalse");
        }
    });

    $("#userPwd1").on("blur",function () {
        $(this).next().removeClass("isTrue");
        $(this).next().removeClass("isFalse");
        if($(this).val()==$("#userPwd").val()){
            flag3=true;
            $(this).next().addClass("isTrue");
        }else {
            $(this).next().addClass("isFalse");
        }
    });
    $.idcode.setCode();   //加载生成验证码方法
    //检验验证码输入是否正确
    $("#Txtidcode").on("blur",function () {
        $(this).next().removeClass("isTrue");
        $(this).next().removeClass("isFalse");
        var IsBy = $.idcode.validateCode();  //调用返回值，返回值结果为true或者false
        if(IsBy){
            flag4=true;
            $(this).next().addClass("isTrue");
        }else {
            $(this).next().addClass("isFalse");
        }

    });

    $("#reg").on("click",function () {
        if(flag1&&flag2&&flag3&&flag4){
            var data=$("#regform").serialize();
            $.ajax({
                url:"http://127.0.0.1/Fruitday/server/register.php",
                type:"post",
                dataType:"json",
                data:data,
                success:function (res) {
                    if(res[0].status==1){

                        if(confirm("注册成功,马上登陆?")){
                            window.location.href="login.html";
                        }

                        $("#userTel").val("");
                        $("#userPwd").val("");
                        $("#userPwd1").val("");
                        $("#Txtidcode").val("");
                    }else {
                        alert(res[0].msg);
                    }
                }
            })
        }else {
            alert("您输入的信息有误,请重新输入")
        }

    })


});

























//   $(function () {
//     $.validator.addMethod("telType",function (val,ele) {
//         var reg=/^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\d{8}$/;
//         return reg.test(val);
//     });
//
//     $("#regform").validate({
//         rules:{
//             userTel:{
//                 remote:"http://127.0.0.1/Fruitday/server/isExitAccount.php",
//                 telType:true,
//                 rangelength:[11,11]
//             },
//             userPwd1:{
//                 equalTo:"#userPwd"
//             }
//         },
//         messages:{
//             userTel:{
//                 required:"手机号码不能为空!",
//                 remote:"该用户名已存在!",
//                 rangelength:"手机号码长度应为11位数"
//             },
//             userPwd:{
//                 required:"密码不能为空!",
//                 minlength:"密码最少为{0}位",
//                 maxlength:"密码最多为{0}位"
//             },
//             userPwd1:{
//                 equalTo:"两次输入的密码不一致,请重输!"
//             }
//         },
//         submitHandler:function () {
//             var data=$("#regform").serialize();
//             $.ajax({
//                 url:"http://127.0.0.1/Fruitday/server/register.php",
//                 type:"post",
//                 dataType:"json",
//                 data:data,
//                 success:function (res) {
//                     if(res[0].status==1){
//                         alert(res[0].msg);
//                     }else {
//                         alert(res[0].msg);
//                     }
//                 }
//             })
//         }
//     })
// });

