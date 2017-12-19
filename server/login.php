<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/15 0015
 * Time: 下午 4:13
 */

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $uTel = $_POST["uTel"];//接受用户名
    $uPwd = $_POST["uPwd"];
    //如果用户名或密码有一个是空的,就不执行逻辑
    if (!empty($uTel) || !empty($uPwd)) {

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
        $sql = "SELECT * FROM userAccount WHERE uTel='".$uTel."' AND uPwd='".$uPwd ."'";
//5.执行sql,返回结果
        $result = $connection->query($sql);  // 相当于$connection.query()  -> 点出来的属性

        //返回了行数大于1,说明登录成功,有结果
        if ($result->num_rows >= 1){

            $rowsArr=$result->fetch_assoc(); // fetch_assoc() 相当遍历每一行,并且返回的是一个 数组
            $resultArr=array();//空的数组,用于返回所有的数据的一个 包裹
            $arr=array("status"=>1,"msg"=>"登录成功","data"=>$rowsArr); // 准备的真实数据
            array_push( $resultArr,$arr);//往包裹里添加真实的数据
            print_r(json_encode($resultArr));//把包裹返回到客户端

        }else{
            //用户名与密码没有匹配得上
            //登录失败
            $resultArr=array();
            $arr=array("status"=>0,"msg"=>"登录失败");
            array_push( $resultArr,$arr);
            print_r(json_encode( $resultArr));
        }

//6.断开与mysql的连接
        $connection->close();
    }
}
