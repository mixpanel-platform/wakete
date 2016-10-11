<?php
namespace App\Classes;

class IPAPI {
    static $fields = 61439; // refer to http://ip-api.com/docs/api:returned_values#field_generator
	static $api_key = 'i8atR9rK7fRG87O';
	static $use_memcache = true;

    static $api = 'http://pro.ip-api.com/json/';
    public $status, $country, $countryCode, $region, $regionName, $city, $zip, $lat, $lon, $timezone, $isp, $org, $as, $query, $message, $reverse, $mobile, $proxy;
	
    public static function query($q) {
        $data = self::communicate($q);
        $result = new static;
        foreach($data as $key => $val) {
            $result->$key = $val;
        }
        return $result;
    }
 
    private static function communicate($q) {
		$url = self::$api.$q.'?key='.self::$api_key.'&fields='.self::$fields; // build URL
	
		if(self::$use_memcache) {
			$memcache = new Memcache;
			$memcache->connect('localhost', 11211) or die('could not connect to Memcache');
			$q_hash = md5('ipapi'.$url);
			if($result_array = $memcache->get($q_hash)) {
				return $result_array;
			}
		}

        if(is_callable('curl_init')) {
            $c = curl_init();
            curl_setopt($c, CURLOPT_URL, $url);
            curl_setopt($c, CURLOPT_HEADER, false);
            curl_setopt($c, CURLOPT_TIMEOUT, 30);
            curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
            $result_array = json_decode(curl_exec($c), true);
            curl_close($c);
        } else {
            $result_array = json_decode(file_get_contents($url), true);
        }

		if(self::$use_memcache) {
			$memcache->set($q_hash, $result_array, false, 86400);
		}

        return $result_array;
    }
}
 
 
// example
// $query = IPAPI::query($_SERVER['REMOTE_ADDR']);
// echo 'Country: '.$query->country;
// echo 'City: '.$query->city;
