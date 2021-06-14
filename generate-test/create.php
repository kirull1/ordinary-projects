<?php

    require_once "models/get.php";

    $token = get::create($_POST['things'], $_POST['range']);

    if($token){
        header("Location: test.php?token=$token");
    }else header("location: index.php");
