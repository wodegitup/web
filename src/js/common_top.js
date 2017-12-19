

$(function () {
    //选择城市
    $(".user-address").on("mouseenter",function () {
        $(".hotcity").show();
    });
    $(".user-address").on("mouseleave",function () {
        $(".hotcity").hide();
    });
    $(".hotcity").on("mouseleave",function () {
        $(".hotcity").hide();
    });
    
    //显示当前选中的城市
    $(".subhotcity").children("a").on("click",function () {
        $(".city").text($(this).text());
        $(".hotcity").hide();
    });
    $(".detail_city>li>a").on("click",function () {
        $(".city").text($(this).text());
        $(".hotcity").hide();
    });

    
    

    //果园公告
    $(".gygg").on("mouseenter",function () {
        $(".f-common-notice").show();
    });
    $(".gygg").on("mouseleave",function () {
        $(".f-common-notice").hide();
    });
    $(".f-common-notice").on("mouseleave",function () {
        $(".f-common-notice").hide();
    });

    //手机果园
    $(".phonegg").on("mouseenter",function () {
        $(".f-common-topcode").show();
    });
    $(".phonegg").on("mouseleave",function () {
        $(".f-common-topcode").hide();
    });
    $(".f-common-topcode").on("mouseleave",function () {
        $(".f-common-topcode").hide();
    });

    //标题下方横线
    $(".nav_ul").children("li").children("a").on("click",function () {
        $(this).parent("li").siblings().children("a").children("em").removeClass("nav_bottom");
        $(this).children("em").addClass("nav_bottom");
    })

    //回到顶部
    $(".backtop").on("click",function () {
        $("html,body").animate({scrollTop:0},500);
    })

    //搜索处隐藏显示
    $("#keyword-search").on("click",function () {
       $(".subsearch").fadeIn("normal").show();

    });
    //把选中的值传到input搜索框中
    $(".subsearch>ul>li>a").on("click",function () {
        $("#keyword-search").val($(this).text());
        $(".subsearch").fadeOut("normal").css("display","none");
    });
    //光标消失时隐藏
    $(document).on("click",function (e) {
        if($(e.target).attr("id")=="keyword-search"){
            return false;
        }
        $(".subsearch").fadeOut("normal").css("display","none");
    });


    //点击购物车图标时,购物车内的信息显示
    $(".minicart").on("click",function () {
        if($(this).attr("class")=="minicart"){
            $(this).addClass("bgc_yellow");
            $(".cart_list").show();


        }else {
            $(this).removeClass("bgc_yellow");
            $(".cart_list").hide();
        }

    });


});
$(function () {
    //小图显示购物车信息
    var gid = getUrlById();
    var loginInfo = JSON.parse(window.sessionStorage.getItem("userAccount") || '{}');

    if(IsLogin()){
        $.ajax({
            url : "http://127.0.0.1/Fruitday/server/getCarts.php",
            type : "get",
            dataType : "json",
            data : {uid : loginInfo.uid,
                    g_id:gid
                },
            success : function(res){
                var all=0;
                var countprice=0;
                for(var i = 0; i < res.length; i++){
                    var lihtml=`<li class="clearfix" id="minli" data-cart=${JSON.stringify(res[i])}>
                                    <div class="goods_img">
                                        <img src="${res[i].c_imgPath}">
                                    </div>
                                    <div class="goods_msg">
                                        <p class="goods_msg_tit">${res[i].c_name}</p>
                                        <span class="goods_price_num">¥<b>${res[i].c_price}</b>/ 礼篮</span>
                                        <div class="goods_numchos">
                                            <span class="num_desc">-</span>
                                            <span class="num_show">${res[i].c_num}</span>
                                            <span class="num_add">+</span>
                                        </div>
                                        <span class="li_del" onclick='javascript:del(this,${res[i].c_id})'>删除</span>
                                    </div>
                                </li>`;
                    $(".cartul").append(lihtml);

                    all+=parseInt(res[i].c_num);
                    countprice+=parseInt(res[i].c_total);

                }
                $(".cart_num").text(all);
                $(".cart_countprice").text(countprice);
                $("#sum-goods").text($(".cart_num").text());
                //数量-
                $(document).on("click",".num_desc", function(){
                    $(this).next().text(parseInt($(this).next().text())-1);
                    $(this).parent().next().children().text(parseInt($(this).next().text())*parseInt($(this).parent().prev().children().text()));
                    $(".cart_num").text(parseInt($(".cart_num").text())-1);
                    $(".cart_countprice").text(parseInt($(".cart_countprice").text())-parseInt($(this).parent().prev().children().text()));
                    $("#sum-goods").text($(".cart_num").text());
                    var num=$(this).next().text();

                    //同步到数据库中

                    var saveCart=$(this).parents("#minli").data("cart");
                    console.log(saveCart);
                    $.ajax({
                        url:"http://127.0.0.1/Fruitday/server/updateCarts.php",
                        type:"post",
                        dataType:"json",
                        data:{
                            g_id:saveCart.g_id,
                            c_name:saveCart.c_name,
                            c_price:saveCart.c_price,
                            c_num:num,
                            uid:saveCart.uid,
                            c_imgPath:saveCart.c_imgPath
                        }
                    })
                });
                //数量+
                $(document).on("click",".num_add", function(){
                    $(this).prev().text(parseInt($(this).prev().text())+1);
                    $(this).parent().next().children().text(parseInt($(this).prev().text())*parseInt($(this).parent().prev().children().text()));
                    $(".cart_num").text(parseInt($(".cart_num").text())+1);
                    $(".cart_countprice").text(parseInt($(".cart_countprice").text())+parseInt($(this).parent().prev().children().text()));
                    $("#sum-goods").text($(".cart_num").text());
                    var num=$(this).prev().text();
                    //同步到数据库中
                    var saveCart=$(this).parents("#minli").data("cart");
                    console.log(saveCart);
                    $.ajax({
                        url:"http://127.0.0.1/Fruitday/server/updateCarts.php",
                        type:"post",
                        dataType:"json",
                        data:{
                            g_id:saveCart.g_id,
                            c_name:saveCart.c_name,
                            c_price:saveCart.c_price,
                            c_num:num,
                            uid:saveCart.uid,
                            c_imgPath:saveCart.c_imgPath,
                        }
                    })
                });
            }
        })

        //登录后把登录注册隐藏,并把用户名显示在顶部
        $(".tologin").hide();
        $(".loginmsg").show();
        var strAccount=sessionStorage.getItem("userAccount");
        var dataInfo=JSON.parse(strAccount);
        $("#username").text(dataInfo.uTel);


    }else {
        var cookieArr = JSON.parse($.cookie("carts")||'[]');
        var num=0;
        var totalprice=0;
        for(var i=0;i<cookieArr.length;i++){
            //把cookie中的数据渲染到页面中
            console.log(JSON.stringify(cookieArr[i]));
            var lihtml=`<li id="minli" class="clearfix" data-cart=${JSON.stringify(cookieArr[i])}>
                                    <div class="goods_img">
                                        <img src="${cookieArr[i].c_imgPath}">
                                    </div>
                                    <div class="goods_msg">
                                        <p class="goods_msg_tit">${cookieArr[i].c_name}</p>
                                        <span class="goods_price_num">¥<b>${cookieArr[i].c_price}</b>/ 礼篮</span>
                                        <div class="goods_numchos">
                                            <span class="num_desc">-</span>
                                            <span class="num_show">${cookieArr[i].c_num}</span>
                                            <span class="num_add">+</span>
                                        </div>
                                        <span class="li_del" onclick='javascript:del(this,${cookieArr[i].g_id})'>删除</span>
                                    </div>
                                </li>`;
            $(".cartul").append(lihtml);

            num+=parseInt(cookieArr[i].c_num);
            totalprice+=cookieArr[i].c_num*cookieArr[i].c_price
        }
        $(".cart_num").text(num);
        $(".cart_countprice").text(totalprice);
        $("#sum-goods").text($(".cart_num").text());

        //数量-
        $(document).on("click",".num_desc",function () {
            $(this).next().text($(this).next().text()-1);
            if(parseInt($(this).next().text())<=1){
                $(this).next().text("1");
            }
            $(".cart_num").text(parseInt($(".cart_num").text())-1);
            $(".cart_countprice").text(parseInt($(".cart_countprice").text())-parseInt($(this).parent().prev().children().text()));
            $("#sum-goods").text($(".cart_num").text());
        });
        //数量+
        $(document).on("click",".num_add",function () {
            $(this).prev().text(parseInt($(this).prev().text())+1);
            $(".cart_num").text(parseInt($(".cart_num").text())+1);
            $(".cart_countprice").text(parseInt($(".cart_countprice").text())+parseInt($(this).parent().prev().children().text()));
            $("#sum-goods").text($(".cart_num").text());
        });
    }






});


function del(obj,num){
    var cookieArr = JSON.parse($.cookie("carts")||'[]');
    if(confirm("您确定要删除吗?")){
        //删除1. 视觉效果
        $(obj).parents("#minli").remove();

        //删除2. 数据库

        $.ajax({
            url:"http://127.0.0.1/Fruitday/server/deleteCarts.php",
            data:{
                c_id:num
            },
            dataType:"json",
            type:"post",
            success:function(res){
                console.log(res.status);
                if(res.status==1){
                    //成功
                    alert(res.msg)
                }else{
                    alert(res.msg)
                }
            }
        })

        //删除cookie
        for(var i=0; i<cookieArr.length; i++){
            if(cookieArr[i].g_id==$(obj).parents("#minli").data("cart").g_id){
                cookieArr.splice(i,1);	//删除
                $.cookie("carts",JSON.stringify(cookieArr));

            }
        }


    }

}