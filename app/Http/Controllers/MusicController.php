<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Carbon\Carbon ;
use Curl;

class MusicController extends Controller
{
    public function index()
    {
    	$songs = $this->getDataTracks();
    	

    	// $dataSongs = array();
    	// foreach ($songs->dataset as $singleSong) {
    	// 	if ( preg_match('/Attribution-NoDerivatives/i', $singleSong->license_title) ||
    	// 		 preg_match('/Public Domain Dedication/i', $singleSong->license_title)
    	// 		) {
    	// 		$dataSongs[] = $singleSong;
    	// 	}
    	// }

    	echo "<pre>";
    	print_r($songs);
    	die();
    	
    }

    static function getDataTracks()
    {
        /* -------------------------- CANCIONES --------------------------*/
        $response = Curl::to('https://freemusicarchive.org/api/get/tracks.json')
                ->withData( [
                                'api_key'     => 'H028T68A39DO4FV8',
                                'limit'     => '50',
                                'page'     => '50',
                                ] )
                ->get();
                
        
        $response = json_decode($response);     

        return $response;
    }
}
