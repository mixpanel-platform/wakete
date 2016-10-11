<?php

namespace App\Http\Controllers\AdminController;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Mongoquent;
use Carbon\Carbon;

class PostsController extends Controller
{
    public function index()
    {
    	$posts = DB::connection('dbo')->collection('posts')->get();
    	return view('backend/posts/posts', [ 'posts' => $posts ]);
    }

    
    public function create(Request $Request)
    {
		$dataNewPost['id']          = $request->input('id');
		$dataNewPost['author']      = $request->input('author');
		$dataNewPost['id_category'] = $request->input('id_category');
		$dataNewPost['content']     = $request->input('content');
		$dataNewPost['created']     = $request->input('created');
		$dataNewPost['updated']     = $request->input('updated');

		$inserted = DB::connection('dbo')->collection('posts')->insert($dataNewPost);
        if ($inserted) {

            return redirect()->action('AdminController\PostsController@index');

        }
    }

    public function update($id)
    {

    	$categories = DB::connection('dbo')->collection('category_posts')->get();
    	$posts = DB::connection('dbo')->collection('posts')->whereRaw(['id'=> $id])->get();

		$lastId = $post[0]['id'];
    	return view('backend/posts/editPost', [ 
											'post'       => $post[0],
											'categories' => $categories, 
											]);
    }

    public function newPost(Request $Request)
    {
        $categories = DB::connection('dbo')->collection('category_posts')->get();
        $posts = DB::connection('dbo')->collection('posts')->get();
        $lastId = 0;
        foreach ($posts as $post) {
            $lastId = $post['id'];
        }
        return view('backend/posts/newPost', [ 
                                            'categories' => $categories, 
                                            'lastId' => $lastId
                                            ]);
    }

    public function updatePost(Request $Request)
    {
        $categories = DB::connection('dbo')->collection('category_posts')->get();

        $posts = DB::connection('dbo')->collection('posts')->whereRaw(['id'=> $id])->get();

        $posts[0]['id']          = $request->input('id');
        $posts[0]['author']      = $request->input('author');
        $posts[0]['id_category'] = $request->input('id_category');
        $posts[0]['content']     = $request->input('content');
        $posts[0]['created']     = $request->input('created');
        $posts[0]['updated']     = $request->input('updated');

        $updated = DB::connection('dbo')->collection('posts')->update(['id' => $posts[0]['id']], ['$set' => $posts]);
        if ($updated) {

            return redirect()->action('AdminController\PostsController@index');

        }
    }
}
