<?php

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if ($_SERVER["REQUEST_METHOD"]=="POST"){
//获取传入到后台的参数
    $g_id = $_REQUEST["g_id"];
    $c_name = $_REQUEST["c_name"];
    $c_price = $_REQUEST["c_price"];
    $c_num = $_REQUEST["c_num"];
    $uid=$_REQUEST["uid"];//谁的购物车
    $c_imgPath=$_REQUEST["c_imgPath"];


//1.准备 主机名称 用户名,密码,数据库的名称
    $localName = "127.0.0.1";  //主机名称
    $dbName = "root"; // 用户名
    $dbPwd = ""; // 密码
    $dataBase = "friutday";// 数据库的名称
//2.创建连接
    $connection = new mysqli($localName, $dbName, $dbPwd, $dataBase);
//3.设置连接的字符集  保证 你返回的数据 不是乱码
    mysqli_query($connection, "set names utf8");
//4.准备sql语句
    $sql1 = "SELECT * FROM carts WHERE g_id=". $g_id." AND uid=".$uid;
    $result = $connection->query($sql1);

    if ($result->num_rows > 0) {
        //已经有一条相同的数据,我们只需要更改数量即可(修改 update)

        $sqlUpate = "UPDATE carts SET c_num=". $c_num .",c_total=c_num *c_price WHERE g_id=". $g_id . " AND uid=".$uid;

        $updateStatus = $connection->query($sqlUpate);
        if ($updateStatus) {
            print_r(json_encode(array("status" => 1, "msg" => "修改完成")));
        } else {
            print_r(json_encode(array("status" => 0, "msg" => "修改失败")));
        }
    }




}


