<?php

    require_once('db.php');

    class get{

        private static function shuffle_assoc($array) { 
            foreach ($array as $list) {
                if (!is_array($list)) return $list; 
          
                $keys = array_keys($list); 
                shuffle($keys); 
                $random = array(); 
                foreach ($keys as $key) $random[$key] = $list[$key]; 
                $result[] = $random; 
            }
            return $result;
        } 

        public static function all($thing){
            $db = new db;
            $rows = $db->get_build("SELECT * FROM `questions` WHERE `thing` = ?");
            $value = $db->build_request($rows, $thing);
            return $value;
        }

        public static function check_token($token){
            $db = new db;
            $rows = $db->get_build("SELECT * FROM `test` WHERE `token` = ?");
            $value = $db->build_request($rows, $token);
            return $value ?: false;
        }

        public static function create($thing, $count){

            if ($thing && $count) {
                $db = new db;
                $rows = $db->get_build("SELECT `word`,`questions` FROM `questions` WHERE `thing` = ? ORDER BY RAND() LIMIT ?");
                $value = $db->build_request($rows, $thing, [$count * 4, PDO::PARAM_INT]);
    
                if($value){
                    $p = 0;
                    for($i=0;$i<count($value);$i++){
                        if($i%4==0){
                            $result[++$p]['correct'] = $value[$i]['word'];
                            $result_quest[] = $value[$i];
                        }else{
                            $result[$p][] = $value[$i]['word'];
                        }
                    }
        
                    $token = '';
                    for ($i=0; $i < 4; $i++) { 
                        $token .= bin2hex(random_bytes(3)).'-';
                    }
                    $token = trim($token,'-');
        
                    $rows = $db->get_build("INSERT INTO `test` (`test`, `token`) VALUES (?, ?);");
                    $value = $db->build_request($rows, json_encode([self::shuffle_assoc($result), $result_quest]), $token);
        
                    return $token;
                }
            }
            
            return false;
        }

    }