<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use Mongoquent;

use Carbon\Carbon;
use Curl;
use Cache;
use App\Classes\ConfigClass;

class LandingsController extends Controller
{
    public function view(Request $request, $operator, $num_landing)
    {
    	$config = new ConfigClass($_SERVER['SERVER_NAME']);
    	$clientRequest = DB::connection('dbo')->collection('clientes')->whereRaw([
                                                                        'phone' => 622411066, // numero seteado para pruebas
                                                                        ])->get();
    	$view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest[0]['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/views', [ 
                                        'dataRequest' => $clientRequest[0],
                                        'view'        => $view[0],
                                        'config'      => $config,
                                        'state'        => 2,
                                        'action'        => 2,

                                    ]);
    }
}
