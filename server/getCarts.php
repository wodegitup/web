<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/18 0018
 * Time: 下午 2:17
 */
header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!empty($_REQUEST["uid"])) {
        //1准备 连接数据的一些参数
        $localName = "127.0.0.1";  //主机名称
        $dbName = "root"; // 用户名
        $dbPwd = ""; // 密码
        $dataBase = "friutday";// 数据库的名称
//2.创建连接
        $conn = new mysqli($localName, $dbName, $dbPwd, $dataBase);
//3.设置连接的字符集
        mysqli_query($conn, "set  names utf8");
//4.准备sql语句
        $sql1 = "SELECT * FROM carts WHERE uid=" . $_REQUEST["uid"];
//5.执行sql语句
        $result = $conn->query($sql1);

        $resultArr = array();
        if ($result->num_rows > 0) {
            while ($next = $result->fetch_assoc()) {
                array_push($resultArr, $next);
            }
        }
        print_r(json_encode($resultArr));


    }
}
