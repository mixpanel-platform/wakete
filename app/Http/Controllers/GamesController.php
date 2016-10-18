<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Curl;
use Cache;
use DB;
use Mongoquent;
class GamesController extends Controller
{
    public function index()
    {
	    FrontController::autenthication();
	    $games = DB::connection('dbo')->collection('games')->get();

		return view('frontend/games/index', [ 
	                                            'leagues' => FootballController::getDataLeagues(), 
	                                            'games' => $games,
	                                            'newsCategories' =>AdminController\CategoryController::getCategories()
	                                            ]);
    }

    public function game($uri_games)
    {
		$path   = public_path()."/games/".$uri_games."/index.php";
		$pathFIles   = "/games/".$uri_games."/";
    	
    	return view('frontend/games/game', ['path_to_game' => $path, 'path' => $pathFIles]);
    }

}
