<?php 

    if(isset($_GET['token'])){
        require_once "models/get.php";
        $test = get::check_token($_GET['token']);
        if(!$test) header("location: index.php");
    }else header("location: index.php");

    include 'assets/doctype.html'; 
?>

    <style>
        body{
            margin-bottom: 6s0px;
        }
    </style>
    <section class="test_sec">
        <h4 style="text-align: center;">TOKEN: <?php echo $_GET['token'] ?></h4>
        <?php
            foreach (json_decode($test[0]['test'])[1] as $key => $value) {
                $quets = '';
                foreach (json_decode($test[0]['test'])[0][$key] as $keys => $val) $quets .= '<li '.($keys != 'correct' ?: 'style="color: #248277; text-decoration: underline;"').'>'.$val.'</li>';
                echo '<div class="test_block"><h3>'. ++$p .') '. $value->questions.'</h3><ol>'.$quets.'</ol></div><hr>';
            }
        ?>
    </section>

</body>
</html>