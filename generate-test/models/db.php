<?php

    class db{

        public function __construct(){
           
            $this->db_type = 'mysql';
            $this->host = 'localhost';
            $this->port = 3307;
            $this->dbname = 'base_of_questions';
            $this->login = 'mysql';
            $this->password = 'mysql';

        }

        protected function connect_pdo(){
            return new \PDO("{$this->db_type}:host={$this->host};port={$this->port};dbname={$this->dbname}", $this->login, $this->password);
        }

		public function get_build($rows){
			return $this->connect_pdo()->prepare($rows);
		}

		public static function build_request($rows, ...$array){
			$rows->setFetchMode(\PDO::FETCH_ASSOC);
            $value = [];
			foreach($array as $key => $arr)
				if (is_array($arr) && is_int($key))
					if (count($arr) == 2) 
						$rows->bindValue($key+1, $arr[0], $arr[1]); else throw new \PDOException('Ошибка в указании параметров!');
				else $rows->bindValue($key+1, $arr);
			$rows->execute();
			foreach ($rows as $row) $value[] = $row;
			return $value ?: false;
		}
    }