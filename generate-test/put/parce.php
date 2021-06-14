<?php

    set_time_limit(0);
    ini_set('memory_limit', '12800M');
    require_once('models/db.php');

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
    
    $site = file_get_contents('http://ecosystema.ru/07referats/slovgeo/index.htm');

    $result = array_map(function($e){return explode('"', $e)[0];},explode('href="',explode('</td>',explode('<table border="0" cellspacing="0" cellpadding="0">',$site)[1])[0]));
    unset($result[0], $result[1]);

    $db = new db;
    $rows = $db->get_build("INSERT INTO `questions` (`word`, `questions`, `thing`) VALUES (?, ?, 'geography')");

    foreach ($result as $value) {
        $res = strip_tags(explode('</p>',explode('<span itemprop="definition">', mb_convert_encoding(file_get_contents('http://ecosystema.ru/07referats/slovgeo/' . $value), 'UTF-8', 'windows-1251'))[1])[0]);
        $res = explode('—', delete_all_between('(', ')', $res));
        $res_f = ruucfirst(mb_strtolower(trim($res[0])));
        $res_s = ruucfirst(preg_replace('/\r\n|\r|\n/u',' ',trim(strtok($res[1], '.')).'.'));
        if(strlen(trim($res_f)) > 3 && strlen(trim($res_s)) > 30){
            file_put_contents('quet-geog.txt', $res_f . ' : ' . $res_s . "\n", FILE_APPEND);
            $db->build_request($rows, $res_f, $res_s);
        }
    }

    // $opts = array('http'=>array('header' => "User-Agent:MyAgent/1.0\r\n")); 
    // $context = stream_context_create($opts);
    // foreach(explode("\n",file_get_contents('geog-wiki.txt')) as $val){
    //     $json = json_decode(file_get_contents('https://ru.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=' . urlencode(trim($val)) . '&formatversion=2&exsentences=2&exlimit=1&explaintext=1',false,$context));
    //     $res_f = $json->query->pages[0]->title;
    //     $res_s = ruucfirst(trim(strtok(explode('—',delete_all_between('(', ')',$json->query->pages[0]->extract))[1], '.') . '.'));
    //     file_put_contents('quet-geog-wiki.txt', $res_f . ' : ' . $res_s . "\n", FILE_APPEND);
    //     $db->build_request($rows, $res_f, $res_s);
    // }