
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






















