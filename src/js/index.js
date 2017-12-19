

$(function () {
    //把数据库中的数据渲染出页面
    $.getJSON("http://127.0.0.1/Fruitday/server/goodslist.php").done(function(res){

        for(var index  in res){
            var data=res[index];
            //es6拼接字符串
            var lihtml=`<li>
            <div class="f-detail-img">
                <a href="productdetail.html?g_id=${data.g_id}"><img src="${data.imgs[0]}"></a>
                </div>
                <div class="f-detail-msg">
                <div class="f-detail-goods-msg">
                <p class="goods_intro">${data.g_name}</p>
                <span class="goods_price">¥${data.g_price}.00/16个</span>
                </div>
                <div class="goods_cart"></div>
            </div>
        </li>`;
            $(".f_addli").append(lihtml);
        }
    });
});

$(function () {

    //点击购物车图标弹出框显示
    $(document).on("click",".goods_cart",function () {
        var self=$(this);
        var num=0;
        var timer=0;
        timer=setInterval(function () {
            num++;
            if(num>=50){
                clearInterval(timer);
            }
            self.css("background-position","-513px "+(-num-240)+"px");
        },10);

        $(".shop_cartbox").show();
        $(".shop_cart").css("display","block");















        //点击关闭弹出框隐藏
        $(".shop_cartbox_close").on("click",function () {

            var num=0;
            var timer=0;
            timer=setInterval(function () {
                num++;
                if(num>=50){
                    clearInterval(timer);
                }
                self.css("background-position","-513px "+(-290+num)+"px");
            },10);

            $(".shop_cartbox").hide();
            $(".shop_cart").hide();
        });
        //点击继续购物弹出框隐藏
        $(".contiue").on("click",function () {

            var num=0;
            var timer=0;
            timer=setInterval(function () {
                num++;
                if(num>=50){
                    clearInterval(timer);
                }
                self.css("background-position","-513px "+(-290+num)+"px");
            },10);

            $(".shop_cartbox").hide();
            $(".shop_cart").hide();
        });
    });


    //点击去结算跳转到购物车页面
    $(".deal").on("click",function () {
        window.location.href="cart.html";
    });

});



//选择购买数量
$(function () {
    //-
    $(".num_desc").on("click",function () {
        $(".num_show").text($(".num_show").text()-1);
        if(parseInt($(".num_show").text())<2){
            $("#num_show").text("1");
        }
    });
    //+
    $(".num_add").on("click",function () {
        $(".num_show").text(parseInt($(".num_show").text())+1);
    })
});






















