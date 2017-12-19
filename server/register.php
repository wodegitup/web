<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/15 0015
 * Time: 上午 10:51
 */

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $userTel=$_REQUEST["userTel"];
    $userPwd=$_REQUEST["userPwd"];

    if(!empty($userTel)&&!empty($userPwd)){
        $hostName="127.0.0.1";
        $dbName="root";
        $dbPwd="";
        $databaseName="friutday";

        $conn=new mysqli($hostName,$dbName,$dbPwd,$databaseName);

        mysqli_query($conn,"set names utf8");

        $sql="INSERT INTO userAccount (uTel,uPwd) VALUES ('".$userTel."','".$userPwd."')";

        $result=$conn->query($sql);
        if($result){
            $resultArr=array();
            $arr=array("status"=>1,"msg"=>"注册成功");
            array_push($resultArr,$arr);
            print_r(json_encode($resultArr));
        }else{
            $resultArr=array();
            $arr=array("status"=>0,"msg"=>"注册失败");
            array_push($resultArr,$arr);
            print_r(json_encode($resultArr));
        }

        $conn->close();
    }
}