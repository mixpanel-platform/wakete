<?php

namespace App\Http\Middleware;
use App\Http\Controllers; 
use Cache;
use Closure;

class MongoSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $isAuthenticate = \App\Http\Controllers\FrontController::autenthication();
        if ( $isAuthenticate ) {
           return true;
        }else{
            return redirect()->guest('/');
        }

        return $next($request);
    }
}
