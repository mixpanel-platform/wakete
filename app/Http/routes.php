<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::auth();

// Frontend DBOroutes
Route::get('/', 'FrontController@index');
Route::get('/return', 'FrontController@returned');
Route::get('/thankyou', 'FrontController@thankyou');
Route::get('/catalog', 'FrontController@catalog');
Route::get('/help', 'FrontController@help');
Route::get('/terminos-condiciones', 'FrontController@legal');
Route::get('/compatibilidad', 'FrontController@compatibilidad');
Route::get('/privacidad', 'FrontController@privacidad');
Route::get('/cookies', 'FrontController@cookies');

Route::post('/log', 'FrontController@log');
Route::get('/dbo/login', 'FrontController@login');
Route::get('/dbo/register', 'FrontController@register');


//Landings routes
//
Route::get('/landing/{operator}/{num_landing}', 'LandingsController@view');




// Football routes
Route::get('/catalog/football', 'FootballController@index');
Route::get('/catalog/leagues', 'FootballController@leagues');
Route::get('/catalog/league/{league_name}', 'FootballController@league');
Route::get('/catalog/league/{league_name}/round/{round}', 'FootballController@round');
Route::get('/catalog/match/{match_id}', 'FootballController@match');
Route::get('/catalog/team/{league_name}/{alias_team}', 'FootballController@team');

// News routes
Route::get('/catalog/news/{uri_category}', 'NewsController@category');
Route::get('/catalog/article/{uri_post}', 'NewsController@post');


//Wallpapers
Route::get('/catalog/wallpapers/', 'WallpapersController@index');
Route::get('/catalog/wallpapers/{wallpaper}', 'WallpapersController@wallpapers');


//Music routes
Route::get('/catalog/music', 'MusicController@index');
Route::get('/catalog/music/{name_track}', 'MusicController@film');

//Film routes
Route::get('/catalog/film', 'FilmController@index');
Route::get('/catalog/film/{name_film}', 'FilmController@film');

//Games routes
Route::get('/catalog/games', 'GamesController@index');
Route::get('/catalog/games/{uri_game}', 'GamesController@game');

// ADMIN GROUP  routes
Route::get('/admin', 'AdminController\BackendController@login');
Route::get('/admin/login', 'AdminController\BackendController@login');
Route::get('/admin/register', 'AdminController\BackendController@register');

Route::get('/admin/dashboard', ['middleware' => 'auth','uses'=> 'AdminController\BackendController@dashboard']);


// Admin posts routes
Route::get('/admin/posts', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@index']);
Route::get('/admin/posts/new', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@newPost']);
Route::post('/admin/posts/create', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@create']);
Route::post('/admin/posts/update', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@updatePost']);
Route::get('/admin/posts/update/{id}', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@update']);
Route::get('/admin/posts/delete/{id}', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@delete']);
Route::get('/admin/posts/importData', ['middleware' => 'auth','uses'=> 'AdminController\PostsController@importDataPosts']);

// Admin categories routes
Route::get('/admin/category', ['middleware' => 'auth','uses'=> 'AdminController\CategoryController@index']);
Route::post('/admin/category/create', ['middleware' => 'auth','uses'=> 'AdminController\CategoryController@create']);
Route::get('/admin/category/delete/{id}', ['middleware' => 'auth','uses'=> 'AdminController\CategoryController@delete']);
