<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use Mongoquent;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function category(Request $request, $uri_category)
    {
        if ($uri_category == 'pokemon-go') {
            $category = DB::connection('dbo')->collection('category_posts')->where('uri','=', $uri_category)->get();
            $categories = DB::connection('dbo')->collection('category_posts')->where('id_parent','=', $category[0]['id'])->get();
            foreach ($categories as $key => $cat) {
                if ($cat['name'] == 'Pokemon GO') {
                    unset($categories[$key]);
                }
            }

            return view('frontend/news/index', [ 
                                                        'categories' => $categories,
                                                        'leagues' => FootballController::getDataLeagues(),
                                                        'newsCategories' => AdminController\CategoryController::getCategories()
                                                        ]);
        }else{
            $category = DB::connection('dbo')->collection('category_posts')->where('uri','=', $uri_category)->get();
            $posts = AdminController\PostsController::getPostsByCategory($category[0]['id']);

            return view('frontend/news/category', [ 
                                                        'category' => $category[0]['name'],
                                                        'posts' => $posts,
                                                        'leagues' => FootballController::getDataLeagues(),
                                                        'newsCategories' => AdminController\CategoryController::getCategories()
                                                        ]);
        }
    	
    }

    public function post(Request $request, $uri_post)
    {
    	$posts = DB::connection('dbo')->collection('posts')->whereRaw(['uri' => $uri_post])->get();

    	$relatedPost = DB::connection('dbo')->collection('posts')->whereRaw([
    																		'id' => ['$ne' => $posts[0]['id']],
    																		'id_category' => $posts[0]['id_category'],
    																	])->take(4)->get();
		return view('frontend/news/post', [ 
													'post' => $posts[0],
													'relatedPost' => $relatedPost,
													'leagues' => FootballController::getDataLeagues(),
													'newsCategories' => AdminController\CategoryController::getCategories()
													]);
    }
}
