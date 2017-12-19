<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/16 0016
 * Time: 下午 8:42
 */

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $conn = new mysqli("127.0.0.1", "root", "", "friutday");
    mysqli_query($conn, "set names utf8");

    $sql1 = "  SELECT * FROM goodslist WHERE g_id=".$_REQUEST["g_id"];

    $result = $conn->query($sql1);

    $resultArr = array();
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {
            $sql2 = "SELECT img_Path FROM goodsImgs WHERE g_id=".$row["g_id"];
            $result2 = $conn->query($sql2);
            $arrImgs = array();
            while ($row2 = $result2->fetch_assoc()) {
                array_push($arrImgs, $row2["img_Path"]);
            }
            $row["imgs"] = $arrImgs;
            array_push($resultArr, $row);
        }
    }
    print_r(json_encode($resultArr));

}