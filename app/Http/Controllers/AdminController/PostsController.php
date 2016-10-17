<?php

namespace App\Http\Controllers\AdminController;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Mongoquent;
use Carbon\Carbon;
use Intervention\Image\Facades\Image;
use File;
use Curl;
class PostsController extends Controller
{
    public function index()
    {
      $dataPosts = array();
    	$posts = DB::connection('dbo')->collection('posts')->get();
        foreach ($posts as $post) {
            $category_posts = DB::connection('dbo')->collection('category_posts')->whereRaw(['id' => $post['id_category']])->get();
            $post['category'] = $category_posts[0];
            $dataPosts[] = $post;
        }

    	return view('backend/posts/posts', [ 'posts' => $dataPosts ]);
    }


    public function create(Request $request)
    {

        $dataNewPost['id']          = uniqid();
        $dataNewPost['title']       = $request->input('post_title');
        $dataNewPost['uri']         = str_replace(' ', '-', strtolower($request->input('post_title')));
        
        $dataNewPost['id_category'] = $request->input('id_category');
        $dataNewPost['content']     = $request->input('content');
        $dataNewPost['created']     = date('Y-m-d H:i:s');
        $dataNewPost['updated']     = date('Y-m-d H:i:s');

        /*Si la variable $request tiene imagen  */
        $file = $request->file('img_post');
        if ( $file ) {
            $image = Image::make($file->getRealPath());
            $mime = $image->mime();  //edited due to updated to 2.x
            // echo $mime;
            // die();
            if ($mime == 'image/jpeg')
                $extension = '.jpg';
            elseif ($mime == 'image/png')
                $extension = '.png';
            elseif ($mime == 'image/gif')
                $extension = '.gif';
            else
                $extension = '';
            $fullName = date('Y-m-d').'_'.str_replace(' ', '-', strtolower($dataNewPost['title'])).$extension;

            $pathToCreate = public_path()."/posts/uploads/";
            $pathDatabase = "/posts/uploads/";
            $image->save($pathToCreate.$fullName);

            $dataNewPost['img_post'] = $pathDatabase.$fullName;

        }else{
            $dataNewPost['img_post'] = '/posts/uploads/no-imagen.jpg';
        }


		$inserted = DB::connection('dbo')->collection('posts')->insert($dataNewPost);

        if ($inserted) {
            return redirect()->action('AdminController\PostsController@index');

        }
    }

    public function update($id)
    {

    	$categories = DB::connection('dbo')->collection('category_posts')->get();
    	$posts = DB::connection('dbo')->collection('posts')->whereRaw(['id'=> $id])->get();

    	return view('backend/posts/edit-post', [
											'post'       => $posts[0],
											'categories' => $categories,
											]);
    }

    public function delete($id)
    {

        $deleted = DB::connection('dbo')->collection('posts')->whereRaw(['id' => $id])->get();
        if ($deleted[0]['img_post'] != '/posts/uploads/no-imagen.jpg') {

            $file = substr(public_path().$deleted[0]['img_post'], 0, -4);

            if(file_exists($file)){
                File::delete($file);
            }
        }

        if (DB::connection('dbo')->collection('posts')->whereRaw(['id' => $id])->delete()) {
            return redirect()->action('AdminController\PostsController@index');
        }

    }

    public function newPost(Request $Request)
    {
        $categories = DB::connection('dbo')->collection('category_posts')->get();
        $posts = DB::connection('dbo')->collection('posts')->get();
        $lastId = 0;
        foreach ($posts as $post) {
            $lastId = $post['id'];
        }
        return view('backend/posts/post', [
                                            'categories' => $categories,
                                            'lastId'     => $lastId+1
                                            ]);
    }

    public function updatePost(Request $request)
    {
        $posts = DB::connection('dbo')->collection('posts')->whereRaw(['id' => $request->input('id_post') ])->get();
        unset($posts[0]['_id']);
        $posts[0]['title']       = $request->input('post_title');
        $posts[0]['uri']         = str_replace(' ', '-', strtolower($request->input('post_title')));
        $posts[0]['id_category'] = $request->input('id_category');
        $posts[0]['content']     = $request->input('content');
        $posts[0]['updated']     = date('Y-m-d H:i:s');


        $updated = DB::connection('dbo')->collection('posts')
                                        ->where('id', $request->input('id_post') )
                                        ->update($posts[0], ['set' => true]);
        if ($updated == 0) {

            return redirect()->action('AdminController\PostsController@index');
        }
    }


    static function getPostsByCategory($id_category)
    {
        $posts = DB::connection('dbo')->collection('posts')->whereRaw(['id_category'=> strval($id_category)])->get();
        return $posts;
    }

    public function importDataPosts()
    {
        /* -------------------------- CANCIONES --------------------------*/
        
        $response = json_decode(file_get_contents('https://wakete.com/posts.json'));   

        echo "<pre>";
        print_r($response);
        die();
    }
}
