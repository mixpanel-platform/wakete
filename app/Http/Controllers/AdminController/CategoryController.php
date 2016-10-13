<?php

namespace App\Http\Controllers\AdminController;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Mongoquent;
use Carbon\Carbon;
class CategoryController extends Controller
{
    public function index()
    {
    	$categories = DB::connection('dbo')->collection('category_posts')->get();
    	return view('backend/categories/category', [ 'categories' => $categories ]);
    }

    public function create(Request $request)
    {
        $dataNewCategory = [];
        $dataNewCategory['id'] = $request->input('id');
        $dataNewCategory['name'] = $request->input('name');
        $dataNewCategory['uri'] = str_replace(' ', '-', strtolower($request->input('name')));
        if ($request->input('id_parent') == 'none') {
            $dataNewCategory['type'] = 'parent';
            $dataNewCategory['id_parent'] = strval($request->input('id'));
        }else{
            $dataNewCategory['type'] = 'subcat';
            $dataNewCategory['id_parent'] = strval($request->input('id_parent'));

        }
        $dataNewCategory['created'] = date('Y-m-d H:i:s');
        $dataNewCategory['updated'] = date('Y-m-d H:i:s');

        $inserted = DB::connection('dbo')->collection('category_posts')->insert($dataNewCategory);
        if ($inserted) {

            // $categories = DB::connection('dbo')->collection('category_posts')->get();
            // return view('backend/categories/category', [ 'categories' => $categories ]);
            return redirect()->action('AdminController\CategoryController@index');
        }
    }

    public function delete($id)
    {
        $deleted = DB::connection('dbo')->collection('category_posts')->whereRaw(['id' => $id])->delete();
        if ($deleted) {
             return redirect()->action('AdminController\CategoryController@index');
        }
    }


    static function getCategories()
    {
        $dataCategories = array();

        $categories = DB::connection('dbo')->collection('category_posts')->whereRaw(['type' => 'parent'])->get();
        foreach ($categories as $category) {
            
            $subCategories = DB::connection('dbo')->collection('category_posts')->whereRaw([
                                                                                            'type'      => 'subcat',
                                                                                            'id_parent' => $category['id'],
                                                                                            ])->get();
            $dataSub = array();
            foreach ($subCategories as $subCat) {
                $subCat['count_posts'] = count(PostsController::getPostsByCategory($subCat['id']));
                $dataSub[] = $subCat;
                $category['subCategories'] = $dataSub;
            }
            $dataCategories[] = $category;
        }

        return $dataCategories;
    }
}
