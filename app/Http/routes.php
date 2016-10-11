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

Route::post('/log', 'FrontController@log');

Route::get('/dbo/login', 'FrontController@login');
Route::get('/dbo/register', 'FrontController@register');

// Football routes
// Route::group(['middleware' => 'mongoSession'], function () {
	Route::get('/catalog/football', 'FootballController@index');
	Route::get('/catalog/leagues', 'FootballController@leagues');
	Route::get('/catalog/league/{league_name}', 'FootballController@league');
	Route::get('/catalog/league/{league_name}/round/{round}', 'FootballController@round');
	Route::get('/catalog/match/{match_id}', 'FootballController@match');
	Route::get('/catalog/team/{league_name}/{alias_team}', 'FootballController@team');
// });



// Another Routes
Route::get('/phpconfig', 'FrontController@phpconfig');



// ADMIN routes
Route::get('/admin/login', 'AdminController\BackendController@login');
Route::get('/admin/register', 'AdminController\BackendController@register');

Route::get('/admin', 'AdminController\BackendController@dashboard');
Route::get('/admin/dashboard', 'AdminController\BackendController@dashboard');
// Admin posts routes
Route::get('/admin/post', 'AdminController\PostsController@index');
Route::post('/admin/post/new', 'AdminController\PostsController@newPost');
Route::post('/admin/post/create', 'AdminController\PostsController@create');
Route::get('/admin/post/update/{id}', 'AdminController\PostsController@update');
Route::get('/admin/post/delete/{id}', 'AdminController\PostsController@delete');

// Admin posts routes
Route::get('/admin/category', 'AdminController\CategoryController@index');
Route::post('/admin/category/create', 'AdminController\CategoryController@create');
Route::get('/admin/category/delete/{id}', 'AdminController\CategoryController@delete');