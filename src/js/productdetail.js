$(function () {
    //选择地址显示隐藏的地址
    $(".p_add_box").on("click",function () {
        $(".p_detail_add").show();
    });
    //显示选择的地址
    $(".p_detail_list>ul>li>a").on("click",function () {
        $(".p_add_chos").text($(this).text());
        $(".p_detail_add").hide();
    });
    //点击关闭隐藏
    $(".p_close").on("click",function () {
        $(".p_detail_add").hide();
    });
});

//选择购买数量
$(function () {
    //-
    $(".p_num_desc").on("click",function () {
        $("#p_num_show").text($("#p_num_show").text()-1);
        if(parseInt($("#p_num_show").text())<2){
           $("#p_num_show").text("1");
        }
    });
    //+
    $(".p_num_add").on("click",function () {
        $("#p_num_show").text(parseInt($("#p_num_show").text())+1);
    })
});

$(function () {
    //显示二维码
    $(".price_code").on("mouseenter",function () {
        $(".big_code").show();
    });
    $(".big_code").on("mouseleave",function () {
        $(".big_code").hide();
    })
});

$(function () {
    //点击购物车图标弹出框显示

    $(".add_to_car").on("click",function () {


        $(".shop_cartbox").show();
        $(".shop_cart").css("display","block");

        //点击关闭弹出框隐藏
        $(".shop_cartbox_close").on("click",function () {


            $(".shop_cartbox").hide();
            $(".shop_cart").hide();
        });
        //点击继续购物弹出框隐藏
        $(".contiue").on("click",function () {

            $(".shop_cartbox").hide();
            $(".shop_cart").hide();
        });

    });

});



$(function () {
    $(".p_main").click(function () {
        $(".p_comment").removeClass("bgc_white");
        $(".p_tips").show();
        $(".p_img").show();
        $(".p_comment_total").hide();
        $(".p_main").addClass("bgc_white");
    });

    $(".p_comment").on("click",function () {
        $(".p_main").removeClass("bgc_white");
        $(".p_comment_total").show();
        $(".p_tips").hide();
        $(".p_img").hide();
        $(".p_comment").addClass("bgc_white");
    })
});



$(function () {
    //渲染页面
    var gid = getUrlById();

    $.getJSON({
        url : "http://127.0.0.1/Fruitday/server/getGoodsById.php",
        data : {"g_id" : gid}
    }).done(function(res){

        for(var index in res){

            var data = res[index];

            // var liHTML=`<ul class="pgwSlider">
            // <li><img src="${data.imgs[0]}" ></li>
            //
            //     <li><img src="${data.imgs[1]}"></li>
            //
            //     <li><img src="${data.imgs[2]}"></li>
            //
            //     <li><img src="${data.imgs[3]}"></li>
            //    </ul>`;
            // $(".detail_pic").append(liHTML);

         var goodsdata=`<h4>${data.g_name}</h4>
            <p class="describe">${data.g_desrc}</p>
            <div class="price clearfix">
                <div class="price_box">
                <h5 class="p_name">果园价</h5>
                <span class="p_price" id="p_price">¥${data.g_price}.00</span>
            </div>
            <div class="price_code">
                <div class="big_code"><img src="images/api.png"></div>
                </div>
            </div>`;

        $(".detail_buy_msg").prepend(goodsdata);


        var nextway=`<button type="button" class="buy_now" data-info1='${JSON.stringify(data)}'>立即购买</button>
<button type="button" class="add_to_car" data-info='${JSON.stringify(data)}'>加入购物车</button>`;

            $(".btnbox").append(nextway);
        }
    });

    //
    $("body").on("click", ".add_to_car", function(){

        var dataInfo=$(this).data("info");// 当前点击的信息
        //1.如果cookie有值,而且当前是登录的状态
        //.需要把cookie里的内容,添加数据库中,之后,把cookie清楚
        //        if(已经登录){
        // // 往数据库走
        //            if(cookie里有没有数据,有){
        //               // cookie里的数据 appendTo(sql);
        //                // 移除 cookie里的数据
        //
        //            }
        //              //  获取当前的数控 appendTo(sql);
        //
        //
        //
        //        }else{
        //            // 没有登录,往cookie走
        //            //把添加的数据,添加到cookie中
        //        }


        if(IsLogin()){
            //登录,往数据走
            var cookieCart=JSON.parse($.cookie("carts")||'[]');
            console.log(cookieCart);

            if(cookieCart.length>0){
                //有值
                for(var i=0;i<cookieCart.length;i++){
                    //之前cookie里只有5个属性,因为 cookie没有等着情况使用,
                    // 现在登录了,就要把这个对象添加一个 登录者的id
                    cookieCart[i].uid= getUserInfo().uid;
                }
                // [ {g_id:1,num:10},{g_id:2,num:1}]
                //  要读取到当前的的登录者的ID

                for(var i=0;i<cookieCart.length;i++){

                    $.ajax({
                        url:"http://127.0.0.1/Fruitday/server/addCarts.php",
                        // { g_id:1,u_id:1,c_name:aaa,c_price:889,c_num:1:c_path:aaa.jpg}
                        type:"post",
                        data:cookieCart[i]
                    }).done(function(){

                        //不管cookie里有没有数据,都要把当前被点击的到的数据,添加到cookie中
                        var saveObj={
                            g_id:dataInfo.g_id,
                            uid:getUserInfo().uid,
                            c_name:dataInfo.g_name,
                            c_price:dataInfo.g_price,
                            c_imgPath:dataInfo.imgs[0],
                            c_num:$('#p_num_show').text(),
                        };
                        $.ajax({
                            url:"http://127.0.0.1/Fruitday/server/addCarts.php",
                            data:saveObj,
                            type:"post",
                            dataType:"json"
                        }).done(function(res){
                            console.log(res);
                        })

                    })
                }
                //for结束后,就情况cookie
                $.cookie("carts",null,{expires:-100});
            }else {
                //不管cookie里有没有数据,都要把当前被点击的到的数据,添加到cookie中
                var saveObj={
                    g_id:dataInfo.g_id,
                    uid:getUserInfo().uid,
                    c_name:dataInfo.g_name,
                    c_price:dataInfo.g_price,
                    c_imgPath:dataInfo.imgs[0],
                    c_num:$('#p_num_show').text()
                };

                $.ajax({
                    url:"http://127.0.0.1/Fruitday/server/addCarts.php",
                    data:saveObj,
                    type:"post",
                    dataType:"json"
                }).done(function(res){
                    console.log(res);
                })

            }

        } else {
            //未登录,往cookie走

            //$.cookie("carts",{},{expires:10})

            var cookieArr = JSON.parse($.cookie("carts")||'[]');
            var isCookie=true; //默认没有相同产品
            for(var i=0;i<cookieArr.length;i++){
                //拿到当前的产品
                // 1.先读取cookie中的数据,如果cookie中有同一个产品,修改数量.再保存到cookie中
                if(cookieArr[i].g_id==dataInfo.g_id){
                    cookieArr[i].c_num= $('#p_num_show').text();
                    isCookie=false;

                }
            }
            if(isCookie==true){
                //2. 读取cookie,如果没有相同的产品,就往cookie多加入一条记录
                var saveObj={
                    g_id:dataInfo.g_id,
                    c_name:dataInfo.g_name,
                    c_price:dataInfo.g_price,
                    c_imgPath:dataInfo.imgs[0],
                    c_num:$('#p_num_show').text()
                };

                cookieArr.push(saveObj)
            }
            $.cookie("carts",JSON.stringify(cookieArr),{expires:10})

        }
    });


        //点击去结算按钮,如果是已登录状态,则把当前页面的购买信息加到数据库中
    //如果未登录,则把当前信息加入到cookie中
    $("body").on("click", ".buy_now", function(){

        var dataInfo=$(this).data("info1");

        if(IsLogin()){
            //登录,往数据走
            var cookieCart=JSON.parse($.cookie("carts")||'[]');
            if(cookieCart.length>0){
                //有值
                for(var i=0;i<cookieCart.length;i++){
                    //之前cookie里只有5个属性,因为 cookie没有等着情况使用,
                    // 现在登录了,就要把这个对象添加一个 登录者的id
                    cookieCart[i].uid= getUserInfo().uid;
                }
                // [ {g_id:1,num:10},{g_id:2,num:1}]
                //  要读取到当前的的登录者的ID

                for(var i=0;i<cookieCart.length;i++){

                    $.ajax({
                        url:"http://127.0.0.1/Fruitday/server/addCarts.php",
                        // { g_id:1,u_id:1,c_name:aaa,c_price:889,c_num:1:c_path:aaa.jpg}
                        type:"post",
                        data:cookieCart[i]
                    }).done(function(){

                        //不管cookie里有没有数据,都要把当前被点击的到的数据,添加到cookie中
                        var saveObj={
                            g_id:dataInfo.g_id,
                            uid:getUserInfo().uid,
                            c_name:dataInfo.g_name,
                            c_price:dataInfo.g_price,
                            c_imgPath:dataInfo.imgs[0],
                            c_num:$('#p_num_show').text(),
                        };
                        $.ajax({
                            url:"http://127.0.0.1/Fruitday/server/addCarts.php",
                            data:saveObj,
                            type:"post",
                            dataType:"json"
                        }).done(function(res){
                            console.log(res);
                        })

                    })
                }
                //for结束后,就清空cookie
                $.cookie("carts",null,{expires:-100});
            }else {
                //不管cookie里有没有数据,都要把当前被点击的到的数据,添加到cookie中
                var saveObj={
                    g_id:dataInfo.g_id,
                    uid:getUserInfo().uid,
                    c_name:dataInfo.g_name,
                    c_price:dataInfo.g_price,
                    c_imgPath:dataInfo.imgs[0],
                    c_num:$('#p_num_show').text()
                };

                $.ajax({
                    url:"http://127.0.0.1/Fruitday/server/addCarts.php",
                    data:saveObj,
                    type:"post",
                    dataType:"json"
                }).done(function(res){
                    console.log(res);
                })

            }

        } else {
            //未登录,往cookie走

            //$.cookie("carts",{},{expires:10})

            var cookieArr = JSON.parse($.cookie("carts")||'[]');
            var isCookie=true; //默认没有相同产品
            for(var i=0;i<cookieArr.length;i++){
                //拿到当前的产品
                // 1.先读取cookie中的数据,如果cookie中有同一个产品,修改数量.再保存到cookie中
                if(cookieArr[i].g_id==dataInfo.g_id){
                    cookieArr[i].c_num= $('#p_num_show').text();
                    isCookie=false;

                }
            }
            if(isCookie==true){
                //2. 读取cookie,如果没有相同的产品,就往cookie多加入一条记录
                var saveObj={
                    g_id:dataInfo.g_id,
                    c_name:dataInfo.g_name,
                    c_price:dataInfo.g_price,
                    c_imgPath:dataInfo.imgs[0],
                    c_num:$('#p_num_show').text()
                };

                cookieArr.push(saveObj)
            }
            $.cookie("carts",JSON.stringify(cookieArr),{expires:10})

        }

    window.location.href="cart.html";

    })

});























