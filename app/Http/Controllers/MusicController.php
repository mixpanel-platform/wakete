<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Carbon\Carbon ;
use Curl;
use Cache;
use DB;
use Mongoquent;
class MusicController extends Controller
{
    public function index()
    {
        FrontController::autenthication();
        $songs = DB::connection('dbo')->collection('music')->get();
        $categoriesSongs = $this->getDataTracksCategories($songs);

    	return view('frontend/music/index', [ 
                                                'leagues' => FootballController::getDataLeagues(), 
                                                'songs' => $songs,
                                                'categories' => $categoriesSongs,
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
    }

    public function track($name_track)
    {
        $name = str_replace('-', ' ', $name_track);
        $song = DB::connection('dbo')->collection('music')->whereRaw(['track_title' => $name])->get();

        return view('frontend/music/track', [ 
                                                'leagues' => FootballController::getDataLeagues(), 
                                                'song' => $song[0],
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
        
    }

    static function getDataTracksCategories($songs)
    {
        $dataCategoriesSongs = array();
        foreach ($songs as $song) {
            if (isset($song['track_genres'])) {
                foreach ($song['track_genres'] as $cat) {
                    if (!in_array($cat['genre_title'], $dataCategoriesSongs)) {
                        $catetory = strtolower(str_replace(' ', '_', $cat['genre_title']));
                        $dataCategoriesSongs[$catetory] = $cat['genre_title'];
                    }
                }
            }           
        }
        return $dataCategoriesSongs;
    }


    static function getDataTracks($page)
    {
        $dataSongs = array();
        /* -------------------------- CANCIONES --------------------------*/
        for ($i=0; $i < $page; $i++) { 
        
            $response = file_get_contents('https://freemusicarchive.org/api/get/tracks.json?api_key=H028T68A39DO4FV8&limit=1000&page='.$page);
            $response = json_decode($response, true);

            foreach ($response['dataset'] as $singleSong) {
                if ( preg_match('/Attribution-NoDerivatives/i', $singleSong['license_title']) ||
                    preg_match('/Attribution-ShareAlike/i', $singleSong['license_title']) ||
                    preg_match('/Public Domain Dedication/i', $singleSong['license_title'])
                    ) {

                		$inserted = DB::connection('dbo')->collection('music')
                										->whereRaw(['track_id' => strval($singleSong['track_id'])])
                										->get();
                		if ( count($inserted) <= 0 ) {
                		   DB::connection('dbo')->collection('music')->insert($singleSong);
                		}
                }
            }
        }        
          

        return $dataSongs;
    }

    static function getFilterData()
    {
       $songs = DB::connection('dbo')->collection('music')->get();
       foreach ($songs as $key => $song) {
            $inserted = DB::connection('dbo')->collection('songs')->whereRaw(['track_id' => $song['track_id']])->get();
            if ( count($inserted) == 0 ) {
               DB::connection('dbo')->collection('songs')->insert($song);
            }
       }
    }
}
