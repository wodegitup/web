<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/15 0015
 * Time: 上午 11:32
 */
header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");
$userTel=$_REQUEST["userTel"];
//1.准备 主机名称 用户名,密码,数据库的名称
$localName="127.0.0.1";  //主机名称
$dbName="root"; // 用户名
$dbPwd=""; // 密码
$dataBase="friutday";// 数据库的名称
//2.创建连接
$connection=new mysqli($localName,$dbName,$dbPwd,$dataBase);
//3.设置连接的字符集  保证 你返回的数据 不是乱码
mysqli_query( $connection,"set names utf8");
//4.准备sql语句
$sql="SELECT * FROM userAccount WHERE uTel='".$userTel."'";
//5.执行sql,返回结果
$result=$connection->query($sql);  // 相当于$connection.query()  -> 点出来的属性
if ($result->num_rows>=1)
{
    //该用户名已经存在
    print_r("false");
}else{
    //该用户名不存在
    print_r("true");
}
//6.断开与mysql的连接
$connection->close();