<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/18 0018
 * Time: 下午 4:24
 */


header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_REQUEST["c_id"])) {

    $c_id = $_REQUEST["c_id"];
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
    $sql = "DELETE FROM carts WHERE c_id = " . $c_id;
//5.执行sql,返回结果
    $result = $connection->query($sql);  // 相当于$connection.query()  -> 点出来的属性



    if ($result){
        print_r(json_encode(array("status"=>1,"msg"=>"删除成功")));
    }else{
        print_r(json_encode(array("status"=>0,"msg"=>"删除失败")));
    }
//6.断开与mysql的连接
    $connection->close();
}