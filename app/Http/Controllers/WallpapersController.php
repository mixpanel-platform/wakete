<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use File;
class WallpapersController extends Controller
{
    public function index(Request $request)
    {
    	FrontController::autenthication();
    	$url = public_path()."/wallpapers";
    	$folders = $directories = array_map('basename', File::directories($url)); ;

		return view('frontend/wallpapers/index', [ 
                                                'leagues' => FootballController::getDataLeagues(), 
                                                'wallpapers' => $folders,
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
    }

    public function wallpapers(Request $request, $wallpaper)
    {
    	FrontController::autenthication();
    	$directory = public_path()."/wallpapers/".$wallpaper;
    	$files = File::allFiles($directory);
    	$dataWallpapers[$wallpaper] = $files;

    	// echo "<pre>";
    	// print_r($dataWallpapers);
    	// die();

		return view('frontend/wallpapers/wallpaper', [ 
                                                'leagues' => FootballController::getDataLeagues(), 
                                                'wallpapers' => $dataWallpapers,
                                                'category' => $wallpaper,
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
    }
}
