<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use DB;
use Mongoquent;

use Carbon\Carbon;
use Curl;
use Cache;
use App\Classes\IPAPI;
use App\Classes\ConfigClass;
use App\Classes\Mobile;
use Illuminate\Support\Facades\Cookie;
class FrontController extends Controller
{


    public function index(Request $request)
    {
        
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);

        /* Detectamos el tipo de dispositivo*/
        $mobile = new Mobile();
        if ( $mobile->isAndroidtablet() || $mobile->isIpad() || $mobile->isBlackberrytablet() ) { 
            /* Versión para tablets */
            $dispositivo = 1;
        }elseif ( $mobile->isMobile() ) {    
            /* Versión para móviles */
            $dispositivo = 2;
        } else{
            $dispositivo = 0;
        }

        /* Cargamos los parámetros GET que viene del anuncio de Google */
        $ref      = (isset($request->ref))?$request->ref:'55ae1a18830a0';
        $campaing = (isset($request->camp))?$request->camp: '';
        $ads      = (isset($request->a))?$request->a: '';

        /* Identificamos la landing que debemos enseñar */
        $landing = Curl::to('http://sponsorea.com/manager/control.php')->withData( [ 'ref' => $ref  ] )->get();

        /* Parseamos el resultado */
        $landing = json_decode($landing);

        /* Obtenemos el operador y la región */
        $dataIp = $this->getOperator();

        /* Cargamos la configuración de site */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);

        /* Creamos copia de los datos del cliente en Memcached*/
        $clientRequest['ip']          = $_SERVER['REMOTE_ADDR'];
        $clientRequest['campaing']    = $campaing;
        $clientRequest['ads']         = $ads;
        $clientRequest['landing']     = $landing;
        $clientRequest['operador']    = $dataIp['operador'];
        $clientRequest['region']      = $dataIp['region'];
        $clientRequest['mozart']      = 1;
        $clientRequest['vista']       = $_SERVER['SERVER_NAME'];
        $clientRequest['dispositivo'] = $dispositivo;
        $clientRequest['ref']         = $ref;
        $clientRequest['coste']       = $config->coste[$dataIp['operador']];
        $clientRequest['terminos']    = $config->url[$dataIp['operador']];

        /* Guardamos el acceso del cliente para nuestras estadísticas*/
        $access = DB::connection('dbo')->collection('access')->insert($clientRequest);

        /* Guardamos los datos en cache/session*/
        $expiresAt = Carbon::now()->addDays(7);
        $cachedData = Cache::put($key, $clientRequest, $expiresAt);

        return view('frontend/mantenimiento');
        die();
        
        /* Redirigimos a Monsan para cargar la carta de pago */
        return redirect()->away('http://pagos.avp.monsan.net/api/Mozart/LoadingLandingPage/'.$config->key_Unified_Mozart.'/airtel='.$landing.';ms='.$landing.';orange='.$landing.'/12345');

    }

    public function returned(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest =  Cache::get($key); //$request->session()->get($key);

        /* Cargamos mas datos a la petición del cliente */
        $clientRequest['key']         = md5($_SERVER['REMOTE_ADDR']);
        $clientRequest['id_peticion'] = $request->requestId;
        $clientRequest['callId']      = $request->callId;
        $clientRequest['phone']       = $request->phone;

        switch ($request->action) {
            case 2:
                /*
                    2 - El usuario acaba de darse de alta
                */
                if($request->state == 1){

                    $clientRequest['suscription_data'] = date("Y-m-d");
                    $clientRequest['suscription_time'] = date("H:i:s"); 

                    /* Cookies en caso de necesitarlas */

                    $now = Carbon::now();
                    $expiresAt = Carbon::now()->addDays(7);
                    $diff = $now->diffInSeconds($expiresAt);
                    /**/
                    $response = new \Illuminate\Http\Response();
                    $response->withCookie('client', $clientRequest, $diff);
                    //$phone = $request->cookie('client');
                    // echo "<pre>";
                    // print_r( $phone );
                    // die();

                    /* Fin de las Cookies*/


                    $clientRequest['status'] = 1;

                    /* Guardamos el alta, lo redirigimos a la pagina de gracias*/
                    $suscription = DB::connection('dbo')->collection('clientes')->insert($clientRequest);

                    return redirect('/thankyou');
                }

            break;
            case 1:
            case 5:
                /*
                    1 - El usuario tiene una suscripción activa
                    5 - El usuario esta dado de baja pero esta en periodo de gracia
                */

                return redirect('/catalog');
            break; 

            case 4:
                redirect()->away('https://google.es');
            break;
            
        }
        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/landing', [ 
                                        'dataRequest' => $clientRequest,
                                        'view'        => $view[0],
                                        'config'      => $config,
                                        'action'      => $request->action,
                                        'state'       => $request->state,
                                    ]);

    }

    public function thankyou(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);

        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        /* Cargamos los datos del cliente desde la cache */
        $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client'); //$request->session()->get($key);

        /* Cargamos la los css de la vista por la que el cliente ha entrado */
        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/thankyou', [ 
                                        'dataRequest' => $clientRequest,
                                        'view'        => $view[0],
                                        'config'      => $config
                                    ]);
    }

    public function catalog(Request $request)
    {
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest[] = Cache::get($key); //$request->session()->get($key);
        if (empty($clientRequest)) {
            $clientRequest[] = $request->cookie('client');
        }
        // echo "<pre>";
        // print_r(Cache::get($key));
        // print_r($request->cookie('client'));
        // print_r($clientRequest);
        // die();

        /* Si no esta en la cache lo enviamos a logearse */
        if ( empty($clientRequest) ) {
            return redirect('/dbo/login');
        }else{
            /* Comprobamos que el cliente existe y esta dado de alta o esta en periodo de gracia*/
            $client = DB::connection('dbo')->collection('clientes')->whereRaw([
                                                                        //'phone' => $clientRequest['phone']
                                                                        'phone' => intval('622411066')
                                                                        ])->get();
            $client = $client[0];

            /* Obtenemos la diferencia en días para saber si esta en periodo de gracia */
            $now = Carbon::now();
            $date = $client['suscription_data']." ".$client['suscription_time'];
            $dateSuscription = Carbon::createFromFormat('Y-m-d H:i:s', $date);
            $diff = $dateSuscription->diffInDays($now);


            if ( ($client['status'] == 1) || ($client['status'] == 2 && $diff < 7 ) ) {
                $autenthicated =  true;
            }else{
                $autenthicated =  false;
            }
        }
        if ($autenthicated  === true) {
            /* Cargamos la vista principal del catalogo */
            $dataLeagues = FootballController::getDataLeagues();

            return view('frontend/catalog', [ 
                                        'leagues' => $dataLeagues,
                                        'newsCategories' => AdminController\CategoryController::getCategories(),
                                        ]);
            //return redirect('/catalog/football');
        }else{
            return redirect('/dbo/login');
        }
    }

    public function log(Request $request)
    {
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        $phone = $request->input('phone');
        $clients = DB::connection('dbo')->collection('clientes')->whereRaw([
                                                                        //'phone' => $clientRequest['phone']
                                                                        'phone' => intval($phone)
                                                                        ])->get();

        $clientRequest = $clients[0];
        unset($clientRequest['_id']);

        if ( isset($clients[0]) ) {
            $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
            $expiresAt = Carbon::now()->addDays(7);
            $cachedData = Cache::put($key, $clientRequest, $expiresAt);

            $now = Carbon::now();
            $diff = $now->diffInSeconds($expiresAt);
            /**/
            $response = new \Illuminate\Http\Response();
            $response->withCookie('client', $clientRequest, $diff);

            return redirect('/catalog');
        }else{
            return view('frontend/login', ['error' => 'No existe ningun usuario con ese número']);
        }
        
    }

    public function help(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest =  $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client'); //$request->session()->get($key);

        /* Comprobacion por cookies */
        /**/
        /**/
        /**/
        /* Fin Comprobacion por cookies */

        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/help', [ 
                                    'dataRequest' => $clientRequest,
                                    'view'        => $view[0],
                                    'config'      => $config,
                                ]);
    }

    public function legal(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest =  $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client'); //$request->session()->get($key);

        /* Comprobacion por cookies */
        /**/
        /**/
        /**/
        /* Fin Comprobacion por cookies */

        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/terms', [ 
                                    'dataRequest' => $clientRequest,
                                    'view'        => $view[0],
                                    'config'      => $config,
                                    'domain'      => $clientRequest['vista']
                                ]);
    }



    public function privacidad(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest = $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client'); //$request->session()->get($key);

        /* Comprobacion por cookies */
        /**/
        /**/
        /**/
        /* Fin Comprobacion por cookies */

        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/privacy', [ 
                                    'dataRequest' => $clientRequest,
                                    'view'        => $view[0],
                                    'config'      => $config,
                                    'domain'      => $clientRequest['vista']
                                ]);
    }


    public function cookies(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest = $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client');; //$request->session()->get($key);

        /* Comprobacion por cookies */
        /**/
        /**/
        /**/
        /* Fin Comprobacion por cookies */

        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/cookies', [ 
                                    'dataRequest' => $clientRequest,
                                    'view'        => $view[0],
                                    'config'      => $config,
                                    'domain'      => $clientRequest['vista']
                                ]);
    }

    public function compatibilidad(Request $request)
    {
        /* Cargamos la configuración del sitio */
        $config = new ConfigClass($_SERVER['SERVER_NAME']);
        /* Clave para guardar datos en Memcached */
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest = $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client'); //$request->session()->get($key);

        /* Comprobacion por cookies */
        /**/
        /**/
        /**/
        /* Fin Comprobacion por cookies */

        $view = DB::connection('dbo')->collection('vistas')->whereRaw([
                                                                        'operador' => $clientRequest['operador'],
                                                                        'landing' => 1,
                                                                        //'landing' => $clientRequest['landing'],
                                                                        ])->get();

        if (!isset($view[0]['button_text_color'])) {
            $view[0]['button_text_color'] = 'inherit';
        }
        if (!isset($view[0]['color_button_confirm'])) {
            $view[0]['color_button_confirm'] = 'inherit';
        }

        return view('dbo/compatibility', [ 
                                    'dataRequest' => $clientRequest,
                                    'view'        => $view[0],
                                    'config'      => $config,
                                ]);
    }


    static function autenthication(Request $request)
    {
        $key = md5($_SERVER['SERVER_NAME']."-".$_SERVER['REMOTE_ADDR']);
        
        $clientRequest = $clientRequest = (Cache::get($key))?Cache::get($key):$request->cookie('client'); //$request->session()->get($key);

        /* Si no esta en la cache lo enviamos a logearse */
        if ( empty($clientRequest) ) {
            return redirect('/login');
        }else{
            /* Comprobamos que el cliente existe y esta dado de alta o esta en periodo de gracia*/
            $client = DB::connection('dbo')->collection('clientes')->whereRaw([
                                                                        //'phone' => $clientRequest['phone']
                                                                        'phone' => 622411066
                                                                        ])->get();
            $client = $client[0];

            /* Obtenemos la diferencia en días para saber si esta en periodo de gracia */
            $now = Carbon::now();
            $date = $client['suscription_data']." ".$client['suscription_time'];
            $dateSuscription = Carbon::createFromFormat('Y-m-d H:i:s', $date);
            $diff = $dateSuscription->diffInDays($now);


            if ( ($client['status'] == 1) || ($client['status'] == 2 && $diff < 7 ) ) {
                return true;
            }else{
                return false;
            }
        }
    }

    public function getOperator()
    {

        while(true)
        {
            // $response = Curl::to("http://pro.ip-api.com/php/".$_SERVER['REMOTE_ADDR']."?key=i8atR9rK7fRG87O")->get();
            $response = Curl::to("http://pro.ip-api.com/php/47.60.36.105?key=i8atR9rK7fRG87O")->get();
            $response = unserialize($response);

            $region = $response['city'];

            if ( preg_match('/telefonica/i', $response['isp']) ){
                $operador = "movistar";
            } else if( preg_match('/Orange Espana/i', $response['isp']) || preg_match('/Orange  Espagne, S.A.Unipersonal/i', $response['isp']) ){
                $operador = "orange";
            } else if(preg_match('/XFERA Moviles S.A./i', $response['isp'])){
                $operador = "yoigo";
            } else if(preg_match('/Vodafone Spain/i', $response['isp'])){
                $operador = "vodafone";
            } else {
                $operador = "other";
            }

            if(!empty($operador)){
                break;
            }

        }

        $data['operador'] = $operador;
        $data['region']   = $region;
        $data['isp']      = $response['isp'];

        return $data;
    }

    public function login()
    {
        return view('frontend/login');
    }

    public function register()
    {
        return view('frontend/register');
    }

    public function phpconfig()
    {
       phpinfo();
       die();
    }
}
