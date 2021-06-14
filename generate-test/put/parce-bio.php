<?php

    set_time_limit(0);
    ini_set('memory_limit', '12800M');
    require_once('models/db.php');

    $db = new db;
    $rows = $db->get_build("INSERT INTO `questions` (`word`, `questions`, `thing`) VALUES (?, ?, 'biology')");

    function delete_all_between($beginning, $end, $string) {
        $beginningPos = strpos($string, $beginning);
        $endPos = strpos($string, $end);
        if ($beginningPos === false || $endPos === false) {
            return $string;
        }
    
        $textToDelete = substr($string, $beginningPos, ($endPos + strlen($end)) - $beginningPos);
    
        return str_replace($textToDelete, '', $string);
    }

    function ruucfirst($str) {
        $fc = mb_strtoupper(mb_substr($str, 0, 1));
        return $fc.mb_substr($str, 1);
    }

    // foreach(explode('<a href="', explode('</div>', explode('<div class="book_chapters">', file_get_contents('https://licey.net/free/6-biologiya/25-slovar_biologicheskih_terminov.html'))[1])[0]) as $val){
    //     $result = strip_tags(explode('</p>', explode('<p class="slovarP">', mb_convert_encoding(file_get_contents('https://licey.net/'.strtok($val, '">')), 'UTF-8', 'windows-1251'))[1])[0]) . "\n";
    //     $result = explode('&mdash;', delete_all_between('(', ')', $result));
    //     $res_f = ruucfirst(trim(mb_strtolower($result[0])));
    //     $res_s = ruucfirst(trim(strtok($result[1], '.')));
    //     if($res_s && $res_f){
    //         file_put_contents('quet-biol.txt', $res_f . ' : ' . $res_s . "\n", FILE_APPEND);
    //         $db->build_request($rows, $res_f, $res_s);
    //     }
    // }

    // foreach(explode("\n",file_get_contents('biol-word.txt')) as $value){
    //     if(trim($value)){
    //         $res = array_map('trim', explode('—', $value));
    //         file_put_contents('quet-biol-file.txt', $res[0] . ' : ' . ruucfirst($res[1]) . "\n", FILE_APPEND);
    //         $db->build_request($rows, $res[0], ruucfirst($res[1]));
    //     }
    // }