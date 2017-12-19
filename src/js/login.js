
$(function () {
    $("#login").on("click",function () {
        if($("#uTel").val()!=''&&$("#uPwd").val()!=""){
            $.ajax({
                url : "http://127.0.0.1/Fruitday/server/login.php",
                type : "post",
                dataType : "json",
                data : $("#myform").serialize(),
                success : function(res){
                    console.log(res);
                    if(res[0].status == 1){
                        alert(res[0].msg);
                        // ?userInfo="+JSON.stringify(res[0].data);

                        $.cookie("userAccount", JSON.stringify(res[0].data), {expires : 7});

                        //localStorage 能够存储20m东西, 存储在浏览器里面,如果你不手动去清楚,永远不会被销毁

                        // window.localStorage.setItem("userInfo",JSON.stringify(res[0].data))
                        window.sessionStorage.setItem("userAccount",JSON.stringify(res[0].data));
                        window.location.href = "index.html";
                    }
                }
            })

        }else {
            alert("用户名或密码不能为空哦!")
        }
    })
})