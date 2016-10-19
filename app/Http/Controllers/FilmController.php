<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Curl;
use Cache;
use DB;
use Mongoquent;
use App\Classes\Mobile;
use File;
class FilmController extends Controller
{
    public function index()
    {
    	FrontController::autenthication();

        $mobile = new Mobile();

        if ( !$mobile->isMobile() ) {
            $films = DB::connection('dbo')->collection('films')->get();

            return view('frontend/film/index', [ 
                                                'leagues' => FootballController::getDataLeagues(), 
                                                'films' => $films,
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
        }else{
            return view('frontend/film/device-no-authorized', [ 
                                                'leagues' => FootballController::getDataLeagues(),
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
        }
        
    }

    public function film($name_film)
    {
		FrontController::autenthication();
        $mobile = new Mobile();

        if ( !$mobile->isMobile() ) {
    	    $film = DB::connection('dbo')->collection('films')->whereRaw(['nombre' => str_replace('-', ' ', $name_film)])->get();

    		return view('frontend/film/film', [ 
    	                                            'leagues' => FootballController::getDataLeagues(), 
    	                                            'film' => $film[0],
    	                                            'newsCategories' =>AdminController\CategoryController::getCategories()
    	                                            ]);
        }else{
            return view('frontend/film/device-no-authorized', [ 
                                                'leagues' => FootballController::getDataLeagues(),
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
        }
    }

}
