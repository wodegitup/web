$(function () {
    var gid = getUrlById();
    var dataInfo=$(this).data("info1");

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
                    console.log(JSON.stringify(res[i]));
                    var cartsdata=`<div id="cartsbox" class="f_cart_detailmsg clearfix" data-cart=${JSON.stringify(res[i])}>
                        <div class="f_miniImg">
                            <a href="#"><img src="${res[i].c_imgPath}"></a>
                        </div>
                        <div class="f_fruit_name">
                            <a href="#">${res[i].c_name}</a>
                        </div>
                        <div class="f_size"><span>礼篮</span></div>
                        <div class="f_price">
                            <span id="f_nowprice2">${res[i].c_price}</span>
                        </div>
                        <div class="f_num">
                            <span class="f_num_desc">-</span>
                            <span class="f_num_show" id="f_num_show2">${res[i].c_num}</span>
                            <span class="f_num_add">+</span>
                        </div>
                        <div class="f_total_price">
                            <span>${res[i].c_total}</span>
                        </div>
                        <div class="f_opra">
                            <a href="javascript:;" id="del_carts" onclick='javascript:del(this,${res[i].c_id})'>删除</a>
                        </div>
                    </div>`;

                     $(".carts_detail").append(cartsdata);

                     all+=parseInt(res[i].c_num);
                    countprice+=parseInt(res[i].c_total);

                }
                $(".f_total_num").text(all);
                $(".count_money").text(countprice);
                //数量-
                $(document).on("click",".f_num_desc", function(){

                    $(this).next().text(parseInt($(this).next().text())-1);
                    $(this).parent().next().children().text(parseInt($(this).next().text())*parseInt($(this).parent().prev().children().text()));
                    $(".f_total_num").text(parseInt($(".f_total_num").text())-1);
                    $(".count_money").text(parseInt($(".count_money").text())-parseInt($(this).parent().prev().children().text()));

                    var num=$(this).next().text();

                    //同步到数据库中

                    var saveCart=$(this).parents("#cartsbox").data("cart");
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
                //数量+
                $(document).on("click",".f_num_add", function(){
                    $(this).prev().text(parseInt($(this).prev().text())+1);
                    $(this).parent().next().children().text(parseInt($(this).prev().text())*parseInt($(this).parent().prev().children().text()));
                    $(".f_total_num").text(parseInt($(".f_total_num").text())+1);
                    $(".count_money").text(parseInt($(".count_money").text())+parseInt($(this).parent().prev().children().text()));
                    var num=$(this).prev().text();
                    //同步到数据库中
                    var saveCart=$(this).parents("#cartsbox").data("cart");
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


    }else {
        var cookieArr = JSON.parse($.cookie("carts")||'[]');
        var num=0;
        var totalprice=0;
        for(var i=0;i<cookieArr.length;i++){
            //把cookie中的数据渲染到页面中
          //  console.log(JSON.stringify(cookieArr[i]));
            var cartsdata=`<div id="cartsbox" class="f_cart_detailmsg clearfix" data-cart=${JSON.stringify(cookieArr[i])}>
                        <div class="f_miniImg">
                            <a href="#"><img src="${cookieArr[i].c_imgPath}"></a>
                        </div>
                        <div class="f_fruit_name">
                            <a href="#">${cookieArr[i].c_name}</a>
                        </div>
                        <div class="f_size"><span>礼篮</span></div>
                        <div class="f_price">
                            <span id="f_nowprice2">${cookieArr[i].c_price}</span>
                        </div>
                        <div class="f_num">
                            <span class="f_num_desc">-</span>
                            <span class="f_num_show" id="f_num_show2">${cookieArr[i].c_num}</span>
                            <span class="f_num_add">+</span>
                        </div>
                        <div class="f_total_price">
                            <span class="cur_totalprice">${cookieArr[i].c_num*cookieArr[i].c_price}</span>
                        </div>
                        <div class="f_opra">
                            <a href="#" id="del_carts" onclick='javascript:del(this,${cookieArr[i].g_id})'>删除</a>
                        </div>
                    </div>`;

            $(".carts_detail").append(cartsdata);

            num+=parseInt(cookieArr[i].c_num);
            totalprice+=cookieArr[i].c_num*cookieArr[i].c_price
        }
        $(".f_total_num").text(num);
        $(".count_money").text(totalprice);


        //数量-
        $(".f_num").on("click",".f_num_desc",function () {
            $(this).next().text($(this).next().text()-1);
            if(parseInt($(this).next().text())<=1){
                $(this).next().text("1");
            }
            $(this).parent().next().children().text(parseInt($(this).next().text())*parseInt($(this).parent().prev().children().text()));
            $(".f_total_num").text(parseInt($(".f_total_num").text())-1);
            $(".count_money").text(parseInt($(".count_money").text())-parseInt($(this).parent().prev().children().text()));
        });
        //数量+
        $(".f_num").on("click",".f_num_add",function () {
            $(this).prev().text(parseInt($(this).prev().text())+1);
            $(this).parent().next().children().text(parseInt($(this).prev().text())*parseInt($(this).parent().prev().children().text()));
            $(".f_total_num").text(parseInt($(".f_total_num").text())+1);
            $(".count_money").text(parseInt($(".count_money").text())+parseInt($(this).parent().prev().children().text()));
        });

    }


});

function del(obj,num){
    console.log(num)
    var cookieArr = JSON.parse($.cookie("carts")||'[]');
    if(confirm("您确定要删除吗?")){
        //删除1. 视觉效果
        $(obj).parents("#cartsbox").remove();
        //num
        //ele.text(ele.text()-num)

        //删除2. 数据库
        $.ajax({
            url:"http://127.0.0.1/Fruitday/server/deleteCarts.php",
            data:{
                c_id:num
            },
            dataType:"json",
            type:"post",
            success:function(res){
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
            if(cookieArr[i].g_id==$(obj).parents("#cartsbox").data("cart").g_id){
                cookieArr.splice(i,1);	//删除
                console.log(cookieArr);
                $.cookie("carts",JSON.stringify(cookieArr),10);

            }
        }
    }

}