<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/17 0017
 * Time: 下午 3:29
 */

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $conn = new mysqli("127.0.0.1", "root", "", "friutday");
    mysqli_query($conn, "set names utf8");

    //1.通过产品g_id与购买者的u_id进行判断,是否曾经购买过,如果买过,就一条记录
    // 1.1有记录,我们就做修改购买的数据与总金额  update

    //2.没有记录,就是没有购物
    //2.1 往购物车表里,添加一条新记录  insert


    $sql1 = " SELECT * FROM carts WHERE g_id =" . $_REQUEST["g_id"] . " AND  uid= " . $_REQUEST["uid"] . "	";

    $result = $conn->query($sql1);
    if ($result->num_rows > 0) {
        // 1.1有记录,我们就做修改购买的数据与总金额  update   c_num , g_id , u_id
        $sqlUpdate = " UPDATE carts SET c_num=c_num+" . $_REQUEST["c_num"] . " ,c_total=c_num*c_price ";
        $sqlUpdate .= " WHERE g_id =" . $_REQUEST["g_id"] . " AND uid = " . $_REQUEST["uid"];
        $updateResult = $conn->query($sqlUpdate);
        if ($updateResult == true) {
            print_r(json_encode(array("status" => 1, "msg" => "更新成功")));
        } else {
            print_r(json_encode(array("status" => 0, "msg" => "更新失败")));
        }
    } else {
        //2.1 往购物车表里,添加一条新记录  insert

       // $sqlInsert = "  INSERT INTO carts (g_id,uid,c_name,c_price,c_num,c_total,c_imgPath) ";
       // $sqlInsert .= " VALUES(" . $_REQUEST["g_id"] . "," . $_REQUEST["uid"] . ",'" . $_REQUEST["c_name"] . "'," . $_REQUEST["c_price"] . "," . $_REQUEST["c_num"] . ",'" . $_REQUEST["c_price"] * $_REQUEST["c_num"] . "," . $_REQUEST["c_imgPath"] . "')";

        $sqlInsert ="INSERT INTO carts (g_id,uid,c_name,c_price,c_num,c_total,c_imgPath)";
        $sqlInsert .="VALUES (".$_REQUEST["g_id"].",".$_REQUEST["uid"].",'". $_REQUEST["c_name"]."',".$_REQUEST["c_price"] .",". $_REQUEST["c_num"].",".$_REQUEST["c_price"] * $_REQUEST["c_num"].",'" . $_REQUEST["c_imgPath"] ."')";
        $insertResult = $conn->query($sqlInsert);

        if ($insertResult == true) {
            print_r(json_encode(array("status" => 1, "msg" => "插入成功")));
        } else {
            print_r(json_encode(array("status" => 0, "msg" => "插入失败")));
        }

    }

    //断开连接
    $conn->close();


}